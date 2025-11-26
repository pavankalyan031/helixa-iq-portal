// Regular User Management Controller (Local Database Version)
// Handles all regular user operations using local JSON file storage

import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class UserControllerLocal {
  constructor() {
    this.dataDir = path.join(__dirname, '../data')
    this.usersFile = path.join(this.dataDir, 'users.json')

    // Ensure data directory exists
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true })
    }

    // Initialize users file if it doesn't exist
    if (!fs.existsSync(this.usersFile)) {
      fs.writeFileSync(this.usersFile, JSON.stringify([], null, 2))
    }
  }

  // Get all users
  getAllUsers() {
    try {
      const data = fs.readFileSync(this.usersFile, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      console.error('Error reading users file:', error)
      return []
    }
  }

  // Save all users
  saveAllUsers(users) {
    try {
      fs.writeFileSync(this.usersFile, JSON.stringify(users, null, 2))
      return true
    } catch (error) {
      console.error('Error writing users file:', error)
      return false
    }
  }

  // Generate a simple ID
  generateId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  // Register new regular user
  async register(userData) {
    try {
      // Validate required fields
      if (!userData.email || !userData.password || !userData.fullName || !userData.rollNo || !userData.gender || !userData.branch || !userData.specialization) {
        return {
          success: false,
          error: 'Missing required fields: email, password, fullName, rollNo, gender, branch, and specialization are required'
        }
      }

      // Check if user already exists
      const existingUser = this.userExists(userData.email)
      if (existingUser) {
        return {
          success: false,
          error: 'User with this email already exists'
        }
      }

      // Hash password
      const saltRounds = 12
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds)

      // Split full name
      const nameParts = userData.fullName.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      // Prepare user data
      const newUser = {
        id: this.generateId(),
        uid: userData.uid || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Use provided uid or generate
        firstName: firstName,
        lastName: lastName,
        fullName: userData.fullName,
        phoneNumber: userData.phone,
        email: userData.email,
        password: hashedPassword,
        studentId: userData.rollNo,
        gender: userData.gender,
        department: userData.branch,
        specialization: userData.specialization,
        avatar: '/assets/images/default-avatar.png',

        // Account status
        status: 'active',
        emailVerified: false, // Will be updated by Firebase
        phoneVerified: false,
        lastLogin: null,
        loginAttempts: 0,

        // Timestamps
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      // Add to database
      const users = this.getAllUsers()
      users.push(newUser)

      if (this.saveAllUsers(users)) {
        const userData = { ...newUser }
        delete userData.password // Remove sensitive data from response

        return {
          success: true,
          message: 'User registered successfully',
          data: {
            userId: userData.id,
            ...userData
          }
        }
      } else {
        return {
          success: false,
          error: 'Failed to register user'
        }
      }
    } catch (error) {
      console.error('Error registering user:', error)
      return {
        success: false,
        error: 'Failed to register user',
        details: error.message
      }
    }
  }

  // Authenticate user
  async login(email, password) {
    try {
      // Find user by email
      const users = this.getAllUsers()
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())

      if (!user) {
        return {
          success: false,
          error: 'Invalid email or password'
        }
      }

      // Note: Email verification is now handled by Firebase Auth
      // We still check password for backward compatibility

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) {
        return {
          success: false,
          error: 'Invalid email or password'
        }
      }

      // Update last login
      user.lastLogin = new Date().toISOString()
      user.loginAttempts = 0
      user.updatedAt = new Date().toISOString()

      if (this.saveAllUsers(users)) {
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
      } else {
        return {
          success: false,
          error: 'Failed to update login time'
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

  // Find user by email
  findUserByEmail(email) {
    try {
      const users = this.getAllUsers()
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())

      if (user) {
        return { success: true, data: user }
      } else {
        return { success: false, error: 'User not found' }
      }
    } catch (error) {
      console.error('Error finding user by email:', error)
      return { success: false, error: error.message }
    }
  }

  // Find user by ID
  findUserById(id) {
    try {
      const users = this.getAllUsers()
      const user = users.find(u => u.id === id)

      if (user) {
        return { success: true, data: user }
      } else {
        return { success: false, error: 'User not found' }
      }
    } catch (error) {
      console.error('Error finding user by ID:', error)
      return { success: false, error: error.message }
    }
  }

  // Update user
  updateUser(id, updateData) {
    try {
      const users = this.getAllUsers()
      const userIndex = users.findIndex(u => u.id === id)

      if (userIndex === -1) {
        return { success: false, error: 'User not found' }
      }

      // Remove sensitive fields from update data
      const cleanUpdateData = { ...updateData }
      delete cleanUpdateData.password
      delete cleanUpdateData.uid

      users[userIndex] = {
        ...users[userIndex],
        ...cleanUpdateData,
        updatedAt: new Date().toISOString()
      }

      if (this.saveAllUsers(users)) {
        return { success: true, data: users[userIndex] }
      } else {
        return { success: false, error: 'Failed to update user' }
      }
    } catch (error) {
      console.error('Error updating user:', error)
      return { success: false, error: error.message }
    }
  }

  // Check if user exists by email
  userExists(email) {
    const result = this.findUserByEmail(email)
    return result.success
  }

  // Get user statistics
  getStatistics() {
    try {
      const users = this.getAllUsers()
      const total = users.length
      const active = users.filter(u => u.status === 'active').length

      return {
        total,
        active,
        recent: users.filter(u => {
          const createdAt = new Date(u.createdAt)
          const oneWeekAgo = new Date()
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
          return createdAt > oneWeekAgo
        }).length
      }
    } catch (error) {
      console.error('Error getting statistics:', error)
      return { total: 0, active: 0, recent: 0 }
    }
  }
}

export default new UserControllerLocal()