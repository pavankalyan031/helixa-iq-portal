// Premium User Management Controller (Local Database Version)
// Handles all premium user operations using local JSON file storage

import bcrypt from 'bcryptjs'
import localDatabase from '../utils/localDatabase.js'

class PremiumUserController {
  constructor() {
    this.db = localDatabase
  }

  // Register new premium user
  async register(userData) {
    try {
      // Validate required fields
      if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
        return {
          success: false,
          error: 'Missing required fields: firstName, lastName, email, and password are required'
        }
      }

      // Check if user already exists
      const existingUser = this.db.userExists(userData.email)
      if (existingUser) {
        return {
          success: false,
          error: 'User with this email already exists'
        }
      }

      // Hash password
      const saltRounds = 12
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds)

      // Prepare user data
      const newUser = {
        uid: `premium_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        fullName: `${userData.firstName} ${userData.lastName}`,
        phoneNumber: userData.phoneNumber || '',
        email: userData.email,
        password: hashedPassword,
        studentId: userData.studentId || '',
        college: userData.college || '',
        year: userData.year || '',
        semester: userData.semester || '',
        avatar: '/assets/images/default-avatar.png',
        
        // Premium subscription details
        subscriptionType: userData.subscriptionType || 'basic',
        planPrice: userData.planPrice || 199,
        planDuration: userData.planDuration || 'monthly',
        paymentStatus: userData.paymentStatus || 'completed',
        
        // Payment information
        upiId: userData.upiId || '',
        transactionId: userData.transactionId || '',
        paymentDate: userData.paymentDate || new Date().toISOString(),
        paymentMethod: userData.paymentMethod || 'upi',
        
        // LMS access
        lmsAccess: true,
        allowedCourses: [],
        progress: {},
        certificates: [],
        
        // Account status
        status: 'active',
        emailVerified: false,
        phoneVerified: false,
        lastLogin: null,
        loginAttempts: 0
      }

      // Add to database
      const result = this.db.addUser(newUser)
      
      if (result.success) {
        const userData = result.data
        delete userData.password // Remove sensitive data from response
        
        return {
          success: true,
          message: 'Premium user registered successfully',
          data: {
            userId: userData.id,
            ...userData
          }
        }
      } else {
        return {
          success: false,
          error: result.error || 'Failed to register user'
        }
      }
    } catch (error) {
      console.error('Error registering premium user:', error)
      return {
        success: false,
        error: 'Failed to register user',
        details: error.message
      }
    }
  }

  // Authenticate premium user
  async login(email, password) {
    try {
      // Find user by email
      const userResult = this.db.findUserByEmail(email)
      
      if (!userResult.success) {
        return {
          success: false,
          error: 'Invalid email or password'
        }
      }

      const user = userResult.data
      
      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password)
      
      if (!isValidPassword) {
        return {
          success: false,
          error: 'Invalid email or password'
        }
      }

      // Update last login
      const updateResult = this.db.updateUser(user.id, {
        lastLogin: new Date().toISOString(),
        loginAttempts: 0
      })

      // Remove sensitive data from response
      const userData = { ...user }
      delete userData.password

      return {
        success: true,
        message: 'Login successful',
        data: {
          id: userData.id,
          ...userData
        }
      }
    } catch (error) {
      console.error('Error during login:', error)
      return {
        success: false,
        error: 'Login failed',
        details: error.message
      }
    }
  }

  // Get user by email
  async getUserByEmail(email) {
    try {
      const result = this.db.findUserByEmail(email)
      return result
    } catch (error) {
      console.error('Error fetching user by email:', error)
      return {
        success: false,
        error: 'Failed to fetch user'
      }
    }
  }

  // Get user by ID
  async getUserById(userId) {
    try {
      const result = this.db.findUserById(userId)
      return result
    } catch (error) {
      console.error('Error fetching user:', error)
      return {
        success: false,
        error: 'Failed to fetch user'
      }
    }
  }

  // Update user
  async updateUser(userId, updateData) {
    try {
      // Remove sensitive fields from update data
      const cleanUpdateData = { ...updateData }
      delete cleanUpdateData.password
      delete cleanUpdateData.uid
      
      const result = this.db.updateUser(userId, cleanUpdateData)
      return result
    } catch (error) {
      console.error('Error updating user:', error)
      return {
        success: false,
        error: 'Failed to update user'
      }
    }
  }

  // Get all users with pagination and filters
  async getAllUsers(options = {}) {
    try {
      const {
        page = 1,
        limit = 50,
        search = '',
        status = ''
      } = options

      let users = this.db.getAllUsers()

      // Apply search filter
      if (search) {
        users = users.filter(user => 
          user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.college.toLowerCase().includes(search.toLowerCase())
        )
      }

      // Apply status filter
      if (status) {
        users = users.filter(user => user.status === status)
      }

      // Remove sensitive data
      users = users.map(user => {
        const { password, ...userData } = user
        return userData
      })

      // Apply pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedUsers = users.slice(startIndex, endIndex)

      return {
        success: true,
        data: paginatedUsers,
        total: users.length,
        page,
        limit
      }
    } catch (error) {
      console.error('Error fetching premium users:', error)
      return {
        success: false,
        error: 'Failed to fetch users',
        data: []
      }
    }
  }

  // Get user statistics
  async getUserStatistics() {
    try {
      const stats = this.db.getStatistics()
      
      return {
        success: true,
        data: stats
      }
    } catch (error) {
      console.error('Error getting user statistics:', error)
      return {
        success: false,
        error: 'Failed to get statistics'
      }
    }
  }

  // Check if user can access LMS (for quick validation)
  async canAccessLMS(email) {
    try {
      const userResult = this.getUserByEmail(email)
      
      if (!userResult.success) {
        return {
          success: false,
          canAccess: false,
          reason: 'User not found'
        }
      }

      const user = userResult.data
      
      return {
        success: true,
        canAccess: user.lmsAccess && user.status === 'active',
        user: user,
        subscriptionStatus: user.paymentStatus === 'completed' ? 'active' : 'inactive'
      }
    } catch (error) {
      console.error('Error checking LMS access:', error)
      return {
        success: false,
        canAccess: false,
        reason: 'Error checking access'
      }
    }
  }

  // Update user progress
  async updateProgress(userId, courseId, progressData) {
    try {
      const userResult = this.getUserById(userId)
      if (!userResult.success) {
        return userResult
      }

      const user = userResult.data
      user.progress = user.progress || {}
      user.progress[courseId] = {
        ...user.progress[courseId],
        ...progressData,
        lastUpdated: new Date().toISOString()
      }

      const result = this.updateUser(userId, { progress: user.progress })
      return result
    } catch (error) {
      console.error('Error updating progress:', error)
      return {
        success: false,
        error: 'Failed to update progress'
      }
    }
  }

  // Delete user
  async deleteUser(userId) {
    try {
      const result = this.db.deleteUser(userId)
      return result
    } catch (error) {
      console.error('Error deleting user:', error)
      return {
        success: false,
        error: 'Failed to delete user'
      }
    }
  }
}

export default new PremiumUserController()