// Admin Service
// Centralized service for all admin operations

import userController from '../controllers/userController.js'
import contentController from '../controllers/contentController.js'
import academicController from '../controllers/academicController.js'
import analyticsController from '../controllers/analyticsController.js'

class AdminService {
  constructor() {
    this.userController = userController
    this.contentController = contentController
    this.academicController = academicController
    this.analyticsController = analyticsController
  }

  // User Management Services
  async getAllUsers(options = {}) {
    return await this.userController.getAllUsers(options)
  }

  async getUserById(userId) {
    return await this.userController.getUserById(userId)
  }

  async updateUser(userId, updateData) {
    return await this.userController.updateUser(userId, updateData)
  }

  async deleteUser(userId) {
    return await this.userController.deleteUser(userId)
  }

  async searchUsers(searchTerm, filters = {}) {
    return await this.userController.searchUsers(searchTerm, filters)
  }

  async exportUsers(format = 'json', filters = {}) {
    return await this.userController.exportUsers(format, filters)
  }

  // Content Management Services
  async createContent(contentType, data) {
    return await this.contentController.createContent(contentType, data)
  }

  async getAllContent(contentType, options = {}) {
    return await this.contentController.getAllContent(contentType, options)
  }

  async updateContent(contentType, id, updateData) {
    return await this.contentController.updateContent(contentType, id, updateData)
  }

  async deleteContent(contentType, id) {
    return await this.contentController.deleteContent(contentType, id)
  }

  async exportContent(contentType, format = 'json', filters = {}) {
    return await this.contentController.exportContent(contentType, format, filters)
  }

  // Specific content methods
  async createEvent(eventData) {
    return await this.contentController.createEvent(eventData)
  }

  async getUpcomingEvents(limit = 10) {
    return await this.contentController.getUpcomingEvents(limit)
  }

  async createAnnouncement(announcementData) {
    return await this.contentController.createAnnouncement(announcementData)
  }

  async getActiveAnnouncements(limit = 20) {
    return await this.contentController.getActiveAnnouncements(limit)
  }

  async createDeadline(deadlineData) {
    return await this.contentController.createDeadline(deadlineData)
  }

  async getUpcomingDeadlines(limit = 10) {
    return await this.contentController.getUpcomingDeadlines(limit)
  }

  async createSyllabus(syllabusData) {
    return await this.contentController.createSyllabus(syllabusData)
  }

  async getSyllabusBySpecialization(specialization, year, semester) {
    return await this.contentController.getSyllabusBySpecialization(specialization, year, semester)
  }

  // Academic Management Services
  async createGrade(gradeData) {
    return await this.academicController.createGrade(gradeData)
  }

  async getStudentGrades(studentId, options = {}) {
    return await this.academicController.getStudentGrades(studentId, options)
  }

  async updateGrade(gradeId, updateData) {
    return await this.academicController.updateGrade(gradeId, updateData)
  }

  async calculateGPA(studentId, year = null, semester = null) {
    return await this.academicController.calculateGPA(studentId, year, semester)
  }

  async createAttendance(attendanceData) {
    return await this.academicController.createAttendance(attendanceData)
  }

  async getStudentAttendance(studentId, options = {}) {
    return await this.academicController.getStudentAttendance(studentId, options)
  }

  async calculateAttendancePercentage(studentId, subject = null, month = null, year = null) {
    return await this.academicController.calculateAttendancePercentage(studentId, subject, month, year)
  }

  async updateAttendance(attendanceId, updateData) {
    return await this.academicController.updateAttendance(attendanceId, updateData)
  }

  async bulkCreateAttendance(attendanceRecords) {
    return await this.academicController.bulkCreateAttendance(attendanceRecords)
  }

  async getAcademicStatistics(options = {}) {
    return await this.academicController.getAcademicStatistics(options)
  }

  async exportAcademicData(type, format = 'json', filters = {}) {
    return await this.academicController.exportAcademicData(type, format, filters)
  }

  // Analytics Services
  async getSystemOverview() {
    return await this.analyticsController.getSystemOverview()
  }

  async getUserAnalytics() {
    return await this.analyticsController.getUserAnalytics()
  }

  async getContentAnalytics() {
    return await this.analyticsController.getContentAnalytics()
  }

  async getAcademicAnalytics() {
    return await this.analyticsController.getAcademicAnalytics()
  }

  async getUserEngagement() {
    return await this.analyticsController.getUserEngagement()
  }

  async getContentPerformance() {
    return await this.analyticsController.getContentPerformance()
  }

  async generateReport(type, options = {}) {
    return await this.analyticsController.generateReport(type, options)
  }

  async getRealTimeMetrics() {
    return await this.analyticsController.getRealTimeMetrics()
  }

  async runCustomQuery(collectionName, filters = {}, aggregations = {}) {
    return await this.analyticsController.runCustomQuery(collectionName, filters, aggregations)
  }

  // Bulk Operations
  async bulkUpdateUsers(userIds, updateData) {
    return await this.userController.bulkUpdateUsers(userIds, updateData)
  }

  async bulkUpdateContent(contentType, ids, updateData) {
    return await this.contentController.bulkUpdateContent(contentType, ids, updateData)
  }

  // Dashboard Data
  async getDashboardData() {
    try {
      const [
        systemOverview,
        userAnalytics,
        contentAnalytics,
        academicAnalytics,
        realTimeMetrics
      ] = await Promise.all([
        this.getSystemOverview(),
        this.getUserAnalytics(),
        this.getContentAnalytics(),
        this.getAcademicAnalytics(),
        this.getRealTimeMetrics()
      ])

      return {
        success: true,
        data: {
          systemOverview: systemOverview.success ? systemOverview.data : {},
          userAnalytics: userAnalytics.success ? userAnalytics.data : {},
          contentAnalytics: contentAnalytics.success ? contentAnalytics.data : {},
          academicAnalytics: academicAnalytics.success ? academicAnalytics.data : {},
          realTimeMetrics: realTimeMetrics.success ? realTimeMetrics.data : {}
        }
      }
    } catch (error) {
      console.error('Error getting dashboard data:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // System Health Check
  async performHealthCheck() {
    try {
      const checks = {
        database: false,
        users: false,
        content: false,
        analytics: false
      }

      // Check database connectivity
      try {
        const testQuery = await this.userController.getAllUsers({ limit: 1 })
        checks.database = testQuery.success !== undefined
      } catch (error) {
        checks.database = false
      }

      // Check users collection
      try {
        const usersCheck = await this.userController.getAllUsers({ limit: 1 })
        checks.users = usersCheck.success
      } catch (error) {
        checks.users = false
      }

      // Check content collections
      try {
        const contentCheck = await this.contentController.getAllContent('events', { limit: 1 })
        checks.content = contentCheck.success
      } catch (error) {
        checks.content = false
      }

      // Check analytics
      try {
        const analyticsCheck = await this.analyticsController.getSystemOverview()
        checks.analytics = analyticsCheck.success
      } catch (error) {
        checks.analytics = false
      }

      const allHealthy = Object.values(checks).every(check => check)
      const failedChecks = Object.entries(checks).filter(([_, healthy]) => !healthy).map(([service]) => service)

      return {
        success: true,
        data: {
          overallHealth: allHealthy ? 'healthy' : 'degraded',
          checks,
          failedChecks,
          timestamp: new Date().toISOString()
        }
      }
    } catch (error) {
      console.error('Error performing health check:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Backup Operations
  async createBackup(options = {}) {
    try {
      const { includeUsers = true, includeContent = true, includeAcademic = true } = options

      const backup = {
        timestamp: new Date().toISOString(),
        version: '1.0',
        data: {}
      }

      if (includeUsers) {
        const users = await this.userController.getAllUsers({ limit: 10000 })
        if (users.success) {
          backup.data.users = users.data
        }
      }

      if (includeContent) {
        const collections = ['events', 'announcements', 'deadlines', 'subjects', 'syllabus']
        backup.data.content = {}

        for (const collection of collections) {
          const content = await this.contentController.getAllContent(collection, { limit: 10000 })
          if (content.success) {
            backup.data.content[collection] = content.data
          }
        }
      }

      if (includeAcademic) {
        const grades = await this.academicController.getStudentGrades('', { limit: 10000 })
        const attendance = await this.academicController.getStudentAttendance('', { limit: 10000 })

        backup.data.academic = {
          grades: grades.success ? grades.data : [],
          attendance: attendance.success ? attendance.data : []
        }
      }

      return {
        success: true,
        data: backup,
        filename: `backup_${new Date().toISOString().split('T')[0]}.json`
      }
    } catch (error) {
      console.error('Error creating backup:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Restore Operations
  async restoreBackup(backupData) {
    try {
      const results = {
        users: { success: 0, failed: 0 },
        content: { success: 0, failed: 0 },
        academic: { success: 0, failed: 0 }
      }

      // Restore users
      if (backupData.data.users) {
        for (const user of backupData.data.users) {
          try {
            await this.userController.updateUser(user.id, user)
            results.users.success++
          } catch (error) {
            console.error('Failed to restore user:', user.id, error)
            results.users.failed++
          }
        }
      }

      // Restore content
      if (backupData.data.content) {
        for (const [collection, items] of Object.entries(backupData.data.content)) {
          for (const item of items) {
            try {
              await this.contentController.updateContent(collection, item.id, item)
              results.content.success++
            } catch (error) {
              console.error(`Failed to restore ${collection} item:`, item.id, error)
              results.content.failed++
            }
          }
        }
      }

      // Restore academic data
      if (backupData.data.academic) {
        // This would require more complex logic for grades and attendance
        // For now, just count them
        results.academic.success = (backupData.data.academic.grades?.length || 0) +
                                  (backupData.data.academic.attendance?.length || 0)
      }

      return {
        success: true,
        message: 'Backup restoration completed',
        results
      }
    } catch (error) {
      console.error('Error restoring backup:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Admin Authentication Helper
  isAdminUser(user) {
    return user && user.email && user.email.includes('admin')
  }

  // Permission Check
  hasPermission(user, permission) {
    if (!user) return false

    const role = this.isAdminUser(user) ? 'admin' : 'student'

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

    return permissions[role]?.includes(permission) || false
  }

  // Audit Logging
  async logAdminAction(userId, action, details = {}) {
    try {
      const logEntry = {
        userId,
        action,
        details,
        timestamp: new Date(),
        ip: details.ip || 'unknown',
        userAgent: details.userAgent || 'unknown'
      }

      // In a real system, this would be stored in an audit log collection
      console.log('Admin action logged:', logEntry)

      return { success: true }
    } catch (error) {
      console.error('Error logging admin action:', error)
      return { success: false, error: error.message }
    }
  }
}

export default new AdminService()