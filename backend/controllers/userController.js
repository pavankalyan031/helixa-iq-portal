// User Management Controller
// Handles all user-related operations for admin backend

import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'
import { db } from '../config/firebase.js'

class UserController {
  constructor() {
    this.collection = 'users'
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
        // Note: Firestore doesn't support full-text search natively
        // This is a simplified version - in production, use Algolia or ElasticSearch
        queryRef = query(queryRef,
          where('firstName', '>=', search),
          where('firstName', '<=', search + '\uf8ff')
        )
      }

      if (year) {
        queryRef = query(queryRef, where('currentYear', '==', year))
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
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return {
        success: true,
        data: users,
        total: users.length,
        page,
        limit: pageLimit
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      return {
        success: false,
        error: error.message,
        data: []
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
        error: error.message
      }
    }
  }

  // Update user profile
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
        error: error.message
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
        error: error.message
      }
    }
  }

  // Bulk update users
  async bulkUpdateUsers(userIds, updateData) {
    try {
      const results = []

      for (const userId of userIds) {
        const result = await this.updateUser(userId, updateData)
        results.push({
          userId,
          success: result.success,
          error: result.error
        })
      }

      const successful = results.filter(r => r.success).length
      const failed = results.filter(r => !r.success).length

      return {
        success: true,
        message: `Updated ${successful} users, ${failed} failed`,
        results
      }
    } catch (error) {
      console.error('Error in bulk update:', error)
      return {
        success: false,
        error: error.message
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

      const stats = {
        total: users.data.length,
        active: users.data.filter(u => u.status === 'active').length,
        inactive: users.data.filter(u => u.status === 'inactive').length,
        byYear: {},
        bySpecialization: {},
        byDepartment: {},
        recentRegistrations: users.data.filter(u => {
          const createdAt = u.createdAt?.toDate?.() || new Date(u.createdAt)
          const weekAgo = new Date()
          weekAgo.setDate(weekAgo.getDate() - 7)
          return createdAt > weekAgo
        }).length
      }

      // Group by year
      users.data.forEach(user => {
        const year = user.currentYear || 'Not Set'
        stats.byYear[year] = (stats.byYear[year] || 0) + 1
      })

      // Group by specialization
      users.data.forEach(user => {
        const spec = user.specialization || 'Not Set'
        stats.bySpecialization[spec] = (stats.bySpecialization[spec] || 0) + 1
      })

      // Group by department
      users.data.forEach(user => {
        const dept = user.department || 'Not Set'
        stats.byDepartment[dept] = (stats.byDepartment[dept] || 0) + 1
      })

      return {
        success: true,
        data: stats
      }
    } catch (error) {
      console.error('Error getting user statistics:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Search users with advanced filters
  async searchUsers(searchTerm, filters = {}) {
    try {
      // This is a simplified search - in production, use a search service
      const allUsers = await this.getAllUsers({ limit: 1000 })

      if (!allUsers.success) {
        return allUsers
      }

      let filteredUsers = allUsers.data

      // Apply search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        filteredUsers = filteredUsers.filter(user =>
          user.firstName?.toLowerCase().includes(term) ||
          user.lastName?.toLowerCase().includes(term) ||
          user.email?.toLowerCase().includes(term) ||
          user.studentId?.toLowerCase().includes(term) ||
          user.phoneNumber?.includes(searchTerm)
        )
      }

      // Apply additional filters
      if (filters.year) {
        filteredUsers = filteredUsers.filter(user => user.currentYear === filters.year)
      }

      if (filters.specialization) {
        filteredUsers = filteredUsers.filter(user => user.specialization === filters.specialization)
      }

      if (filters.status) {
        filteredUsers = filteredUsers.filter(user => user.status === filters.status)
      }

      return {
        success: true,
        data: filteredUsers,
        total: filteredUsers.length,
        searchTerm,
        filters
      }
    } catch (error) {
      console.error('Error searching users:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Export users data
  async exportUsers(format = 'json', filters = {}) {
    try {
      const users = await this.getAllUsers({ ...filters, limit: 10000 })

      if (!users.success) {
        return users
      }

      if (format === 'csv') {
        // Convert to CSV format
        const csvData = this.convertToCSV(users.data)
        return {
          success: true,
          data: csvData,
          format: 'csv',
          filename: `users_export_${new Date().toISOString().split('T')[0]}.csv`
        }
      }

      // Default JSON format
      return {
        success: true,
        data: users.data,
        format: 'json',
        filename: `users_export_${new Date().toISOString().split('T')[0]}.json`
      }
    } catch (error) {
      console.error('Error exporting users:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Helper method to convert data to CSV
  convertToCSV(data) {
    if (!data || data.length === 0) return ''

    const headers = [
      'ID', 'First Name', 'Last Name', 'Email', 'Student ID', 'Phone',
      'Gender', 'Department', 'Specialization', 'Current Year', 'Current Semester',
      'Status', 'Created At', 'Updated At'
    ]

    const csvRows = [headers.join(',')]

    data.forEach(user => {
      const row = [
        user.id || '',
        user.firstName || '',
        user.lastName || '',
        user.email || '',
        user.studentId || '',
        user.phoneNumber || '',
        user.gender || '',
        user.department || '',
        user.specialization || '',
        user.currentYear || '',
        user.currentSemester || '',
        user.status || 'active',
        user.createdAt?.toDate?.()?.toISOString() || user.createdAt || '',
        user.updatedAt?.toDate?.()?.toISOString() || user.updatedAt || ''
      ]
      csvRows.push(row.map(field => `"${field}"`).join(','))
    })

    return csvRows.join('\n')
  }
}

export default new UserController()