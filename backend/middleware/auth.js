// Authentication Middleware
// Handles Firebase token validation and authorization for backend API

import admin from 'firebase-admin'
import { db } from '../config/firebase.js'

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: 'lstu-student-portal'
  })
}

class AuthMiddleware {
  // Verify Firebase ID Token
  static async verifyToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization || req.headers.Authorization

      if (!authHeader) {
        return res.status(401).json({
          success: false,
          error: 'Authorization header is required',
          code: 'AUTH_HEADER_REQUIRED'
        })
      }

      // Check if token is in format "Bearer <token>"
      const token = authHeader.startsWith('Bearer ') 
        ? authHeader.substring(7) 
        : authHeader

      if (!token) {
        return res.status(401).json({
          success: false,
          error: 'Bearer token is required',
          code: 'BEARER_TOKEN_REQUIRED'
        })
      }

      // Verify the token
      const decodedToken = await admin.auth().verifyIdToken(token)
      
      // Get user data from Firestore
      const userDoc = await db.collection('users').doc(decodedToken.uid).get()
      
      if (!userDoc.exists) {
        return res.status(401).json({
          success: false,
          error: 'User not found in database',
          code: 'USER_NOT_FOUND'
        })
      }

      // Attach user info to request
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
        ...userDoc.data()
      }
      
      next()
    } catch (error) {
      console.error('Token verification failed:', error)
      
      let errorMessage = 'Invalid or expired token'
      let errorCode = 'INVALID_TOKEN'

      if (error.code === 'auth/id-token-expired') {
        errorMessage = 'Token has expired'
        errorCode = 'TOKEN_EXPIRED'
      } else if (error.code === 'auth/id-token-revoked') {
        errorMessage = 'Token has been revoked'
        errorCode = 'TOKEN_REVOKED'
      } else if (error.code === 'auth/invalid-id-token') {
        errorMessage = 'Invalid token format'
        errorCode = 'INVALID_TOKEN_FORMAT'
      }

      return res.status(401).json({
        success: false,
        error: errorMessage,
        code: errorCode
      })
    }
  }

  // Check if user is authenticated
  static isAuthenticated(req, res, next) {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
        code: 'AUTH_REQUIRED'
      })
    }

    next()
  }

  // Check if user is admin
  static isAdmin(req, res, next) {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
        code: 'AUTH_REQUIRED'
      })
    }

    // Check if email contains 'admin' or user has admin role
    const isAdmin = req.user.email?.includes('admin') || 
                   req.user.role === 'admin' || 
                   req.user.isAdmin === true

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        error: 'Admin privileges required',
        code: 'ADMIN_REQUIRED'
      })
    }

    req.isAdmin = true
    next()
  }

  // Check specific permissions
  static hasPermission(permission) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required',
          code: 'AUTH_REQUIRED'
        })
      }

      const isAdmin = req.user.email?.includes('admin') || 
                     req.user.role === 'admin' || 
                     req.user.isAdmin === true

      // Define permissions
      const permissions = {
        admin: [
          'user.read', 'user.write', 'user.delete',
          'content.read', 'content.write', 'content.delete',
          'academic.read', 'academic.write', 'academic.delete',
          'analytics.read', 'system.admin'
        ],
        student: [
          'user.read.own', 'content.read',
          'academic.read.own', 'academic.write.own'
        ]
      }

      const userRole = isAdmin ? 'admin' : 'student'
      const userPermissions = permissions[userRole] || []

      if (!userPermissions.includes(permission)) {
        return res.status(403).json({
          success: false,
          error: 'Insufficient permissions',
          code: 'PERMISSION_DENIED',
          required: permission
        })
      }

      req.isAdmin = isAdmin
      next()
    }
  }

  // Rate limiting (simplified)
  static rateLimit(options = {}) {
    const { windowMs = 15 * 60 * 1000, max = 100 } = options // 15 minutes, 100 requests
    const requests = new Map()

    return (req, res, next) => {
      const key = req.user?.uid || req.ip || 'anonymous'
      const now = Date.now()
      const windowStart = now - windowMs

      // Clean old requests
      for (const [k, timestamps] of requests.entries()) {
        requests.set(k, timestamps.filter(timestamp => timestamp > windowStart))
        if (requests.get(k).length === 0) {
          requests.delete(k)
        }
      }

      // Check current requests
      const userRequests = requests.get(key) || []
      if (userRequests.length >= max) {
        return res.status(429).json({
          success: false,
          error: 'Too many requests',
          code: 'RATE_LIMIT_EXCEEDED'
        })
      }

      // Add current request
      userRequests.push(now)
      requests.set(key, userRequests)

      next()
    }
  }

  // Request logging
  static logRequest(req, res, next) {
    const timestamp = new Date().toISOString()
    const userId = req.user?.uid || 'anonymous'
    const method = req.method
    const url = req.url
    const ip = req.ip || req.connection.remoteAddress

    console.log(`[${timestamp}] ${method} ${url} - User: ${userId} - IP: ${ip}`)

    next()
  }

  // Error handling
  static errorHandler(err, req, res, next) {
    console.error('Middleware error:', err)

    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'

    res.status(statusCode).json({
      success: false,
      error: message,
      code: err.code || 'INTERNAL_ERROR'
    })
  }

  // CORS handling
  static corsHandler(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if (req.method === 'OPTIONS') {
      res.sendStatus(200)
    } else {
      next()
    }
  }

  // Request validation
  static validateRequest(schema) {
    return (req, res, next) => {
      try {
        // Basic validation - in a real app, use a validation library like Joi
        const { body } = req

        if (schema.required) {
          for (const field of schema.required) {
            if (!body[field]) {
              return res.status(400).json({
                success: false,
                error: `Missing required field: ${field}`,
                code: 'VALIDATION_ERROR'
              })
            }
          }
        }

        if (schema.email && body.email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(body.email)) {
            return res.status(400).json({
              success: false,
              error: 'Invalid email format',
              code: 'VALIDATION_ERROR'
            })
          }
        }

        if (schema.minLength) {
          for (const [field, minLen] of Object.entries(schema.minLength)) {
            if (body[field] && body[field].length < minLen) {
              return res.status(400).json({
                success: false,
                error: `Field ${field} must be at least ${minLen} characters`,
                code: 'VALIDATION_ERROR'
              })
            }
          }
        }

        next()
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Validation error',
          code: 'VALIDATION_FAILED'
        })
      }
    }
  }

  // Check user status
  static checkUserStatus(req, res, next) {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
        code: 'AUTH_REQUIRED'
      })
    }

    // Check if user is active
    if (req.user.status && req.user.status !== 'active') {
      return res.status(403).json({
        success: false,
        error: 'Account is not active. Please contact support.',
        code: 'ACCOUNT_INACTIVE'
      })
    }

    // Check if email is verified
    if (!req.user.emailVerified && !req.user.email_verified) {
      return res.status(403).json({
        success: false,
        error: 'Email verification required',
        code: 'EMAIL_VERIFICATION_REQUIRED'
      })
    }

    next()
  }

  // Audit logging
  static auditLog(action) {
    return (req, res, next) => {
      const originalSend = res.send

      res.send = function(data) {
        // Log the action after response is sent
        const userId = req.user?.uid || 'anonymous'
        const timestamp = new Date().toISOString()
        const details = {
          action,
          method: req.method,
          url: req.url,
          userAgent: req.get('User-Agent'),
          ip: req.ip || req.connection.remoteAddress,
          statusCode: res.statusCode,
          success: res.statusCode < 400
        }

        console.log(`AUDIT [${timestamp}] User: ${userId} - Action: ${action} - Status: ${res.statusCode}`)

        // In a real app, save to audit log collection
        // adminService.logAdminAction(userId, action, details)

        originalSend.call(this, data)
      }

      next()
    }
  }
}

export default AuthMiddleware