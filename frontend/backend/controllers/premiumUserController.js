// Premium User Management Controller
// Handles all premium user operations for Helixa IQ Portal

import { 
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'
import { db } from '../config/firebase.js'
import PremiumUser from '../models/PremiumUser.js'
import bcrypt from 'bcryptjs'

class PremiumUserController {
  constructor() {
    this.collection = 'premium_users'
  }

  // Register new premium user
  async register(userData) {
    try {
      const premiumUser = PremiumUser.fromRegistrationForm(userData)
      
      // Validate user data
      const validation = premiumUser.validate()
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Validation failed',
          details: validation.errors
        }
      }

      // Check if user already exists
      const existingUser = await this.getUserByEmail(premiumUser.email)
      if (existingUser.success) {
        return {
          success: false,
          error: 'User with this email already exists'
        }
      }

      // Hash password
      const saltRounds = 12
      const hashedPassword = await bcrypt.hash(premiumUser.password, saltRounds)
      premiumUser.password = hashedPassword

      // Set subscription start date if payment is completed
      if (premiumUser.paymentStatus === 'completed') {
        premiumUser.subscriptionStart = new Date()
        const startDate = new Date()
        if (premiumUser.planDuration === 'monthly') {
          premiumUser.subscriptionEnd = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate())
        } else if (premiumUser.planDuration === 'yearly') {
          premiumUser.subscriptionEnd = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate())
        }
        premiumUser.lmsAccess = true
      }

      // Add to database
      const userRef = await addDoc(collection(db, this.collection), premiumUser.toJSON())

      return {
        success: true,
        message: 'Premium user registered successfully',
        data: {
          userId: userRef.id,
          ...premiumUser.getPublicData()
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
      const userResult = await this.getUserByEmail(email)
      if (!userResult.success) {
        return {
          success: false,
          error: 'Invalid email or password'
        }
      }

      const user = new PremiumUser(userResult.data)
      
      // Check if account is locked
      if (user.isLocked()) {
        return {
          success: false,
          error: 'Account is temporarily locked due to multiple failed login attempts'
        }
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password)
      user.recordLoginAttempt(isValidPassword)

      if (!isValidPassword) {
        // Update failed login attempt
        await this.updateUser(userResult.data.id, {
          loginAttempts: user.loginAttempts,
          lockedUntil: user.lockedUntil
        })
        
        return {
          success: false,
          error: 'Invalid email or password'
        }
      }

      // Update last login
      await this.updateUser(userResult.data.id, {
        lastLogin: new Date(),
        loginAttempts: 0,
        lockedUntil: null
      })

      return {
        success: true,
        message: 'Login successful',
        data: {
          id: userResult.data.id,
          ...user.getPublicData()
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
      const q = query(
        collection(db, this.collection),
        where('email', '==', email),
        limit(1)
      )
      
      const snapshot = await getDocs(q)
      if (snapshot.empty) {
        return {
          success: false,
          error: 'User not found'
        }
      }

      const doc = snapshot.docs[0]
      return {
        success: true,
        data: {
          id: doc.id,
          ...doc.data()
        }
      }
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
      const userDoc = await getDoc(doc(db, this.collection, userId))

      if (userDoc.exists()) {
        return {
          success: true,
          data: {
            id: userDoc.id,
            ...userDoc.data()
          }
        }
      } else {
        return {
          success: false,
          error: 'User not found'
        }
      }
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
      const userRef = doc(db, this.collection, userId)

      // Add update timestamp
      const updatedData = {
        ...updateData,
        updatedAt: new Date()
      }

      await updateDoc(userRef, updatedData)

      return {
        success: true,
        message: 'User updated successfully',
        data: updatedData
      }
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
        limit: pageLimit = 50,
        search = '',
        year = '',
        specialization = '',
        status = '',
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = options

      let queryRef = collection(db, this.collection)

      // Apply filters
      if (search) {
        // Simple text search on name fields
        queryRef = query(queryRef, where('firstName', '>=', search))
      }

      if (year) {
        queryRef = query(queryRef, where('year', '==', year))
      }

      if (specialization) {
        queryRef = query(queryRef, where('specialization', '==', specialization))
      }

      if (status) {
        queryRef = query(queryRef, where('status', '==', status))
      }

      // Apply sorting
      const sortDirection = sortOrder === 'desc' ? 'desc' : 'asc'
      queryRef = query(queryRef, orderBy(sortBy, sortDirection))

      // Apply pagination
      if (pageLimit > 0) {
        queryRef = query(queryRef, limit(pageLimit))
      }

      const snapshot = await getDocs(queryRef)
      const users = snapshot.docs.map(doc => {
        const userData = doc.data()
        delete userData.password // Remove sensitive data
        return {
          id: doc.id,
          ...userData
        }
      })

      return {
        success: true,
        data: users,
        total: users.length,
        page,
        limit: pageLimit
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
      const users = await this.getAllUsers({ limit: 1000 })

      if (!users.success) {
        return users
      }

      const stats = PremiumUser.getUserStatistics(users.data)
      
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
      const userResult = await this.getUserByEmail(email)
      if (!userResult.success) {
        return {
          success: false,
          canAccess: false,
          reason: 'User not found'
        }
      }

      const user = new PremiumUser(userResult.data)
      
      return {
        success: true,
        canAccess: user.canAccessLMS(),
        user: user.getPublicData(),
        subscriptionStatus: user.getSubscriptionStatus()
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
      const userResult = await this.getUserById(userId)
      if (!userResult.success) {
        return userResult
      }

      const user = new PremiumUser(userResult.data)
      user.updateProgress(courseId, progressData)

      const userRef = doc(db, this.collection, userId)
      await updateDoc(userRef, { 
        progress: user.progress,
        updatedAt: new Date()
      })

      return {
        success: true,
        message: 'Progress updated successfully'
      }
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
      await deleteDoc(doc(db, this.collection, userId))

      return {
        success: true,
        message: 'User deleted successfully'
      }
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