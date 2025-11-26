// Local File-based Database for Demo
// Simulates a database using JSON files for demonstration purposes

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class LocalDatabase {
  constructor() {
    // Use import.meta.url for more reliable path resolution in ES modules
    const currentDir = path.dirname(fileURLToPath(import.meta.url))
    this.dataDir = path.join(currentDir, '../data')
    this.usersFile = path.join(this.dataDir, 'premium_users.json')

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

  // Add a new user
  addUser(userData) {
    try {
      const users = this.getAllUsers()
      const newUser = {
        id: this.generateId(),
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      users.push(newUser)
      
      if (this.saveAllUsers(users)) {
        return { success: true, data: newUser }
      } else {
        return { success: false, error: 'Failed to save user' }
      }
    } catch (error) {
      console.error('Error adding user:', error)
      return { success: false, error: error.message }
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
      
      users[userIndex] = {
        ...users[userIndex],
        ...updateData,
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

  // Delete user
  deleteUser(id) {
    try {
      const users = this.getAllUsers()
      const filteredUsers = users.filter(u => u.id !== id)
      
      if (filteredUsers.length === users.length) {
        return { success: false, error: 'User not found' }
      }
      
      if (this.saveAllUsers(filteredUsers)) {
        return { success: true, message: 'User deleted successfully' }
      } else {
        return { success: false, error: 'Failed to delete user' }
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      return { success: false, error: error.message }
    }
  }

  // Check if user exists by email
  userExists(email) {
    const result = this.findUserByEmail(email)
    return result.success
  }

  // Generate a simple ID
  generateId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  // Get user statistics
  getStatistics() {
    try {
      const users = this.getAllUsers()
      const total = users.length
      const active = users.filter(u => u.status === 'active').length
      const premium = users.filter(u => u.subscriptionType !== 'none').length
      
      return {
        total,
        active,
        premium,
        recent: users.filter(u => {
          const createdAt = new Date(u.createdAt)
          const oneWeekAgo = new Date()
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
          return createdAt > oneWeekAgo
        }).length
      }
    } catch (error) {
      console.error('Error getting statistics:', error)
      return { total: 0, active: 0, premium: 0, recent: 0 }
    }
  }
}

export default new LocalDatabase()