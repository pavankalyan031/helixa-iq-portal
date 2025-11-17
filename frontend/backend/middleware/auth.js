// Authentication Middleware
// Handles admin authentication and authorization

import { auth } from '../config/firebase.js'

class AuthMiddleware {
  // Check if user is authenticated
  static isAuthenticated(req, res, next) {
    const user = auth.currentUser

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
        code: 'AUTH_REQUIRED'
      })
    }

    req.user = user
    next()
  }

  // Check if user is admin
  static isAdmin(req, res, next) {
    const user = auth.currentUser

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
        code: 'AUTH_REQUIRED'
      })
    }

    if (!user.email || !user.email.includes('admin')) {
      return res.status(403).json({
        success: false,
        error: 'Admin privileges required',
        code: 'ADMIN_REQUIRED'
      })
    }

    req.user = user
    req.isAdmin = true
    next()
  }

  // Check specific permissions
  static hasPermission(permission) {
    return (req, res, next) => {
      const user = auth.currentUser

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required',
          code: 'AUTH_REQUIRED'
        })
      }

      const isAdmin = user.email && user.email.includes('admin')

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

      req.user = user
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

  // Session validation
  static validateSession(req, res, next) {
    const user = auth.currentUser

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Session expired',
        code: 'SESSION_EXPIRED'
      })
    }

    // Check if token is still valid
    user.getIdToken().then(token => {
      // In a real app, you might validate the token with Firebase Admin SDK
      req.token = token
      next()
    }).catch(error => {
      res.status(401).json({
        success: false,
        error: 'Invalid session',
        code: 'INVALID_SESSION'
      })
    })
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