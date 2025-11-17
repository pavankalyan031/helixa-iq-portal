// Analytics Controller
// Handles system analytics, reporting, and monitoring

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore'
import { db } from '../config/firebase.js'

class AnalyticsController {
  constructor() {
    this.collections = {
      users: 'users',
      events: 'events',
      announcements: 'announcements',
      grades: 'grades',
      attendance: 'attendance',
      analytics: 'analytics'
    }
  }

  // System Overview Analytics
  async getSystemOverview() {
    try {
      const overview = {
        users: {},
        content: {},
        academic: {},
        system: {}
      }

      // User statistics
      const users = await this.getUserAnalytics()
      overview.users = users.success ? users.data : {}

      // Content statistics
      const content = await this.getContentAnalytics()
      overview.content = content.success ? content.data : {}

      // Academic statistics
      const academic = await this.getAcademicAnalytics()
      overview.academic = academic.success ? academic.data : {}

      // System health
      overview.system = await this.getSystemHealth()

      return {
        success: true,
        data: overview,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      console.error('Error getting system overview:', error)
      return { success: false, error: error.message }
    }
  }

  // User Analytics
  async getUserAnalytics() {
    try {
      const usersSnapshot = await getDocs(collection(db, this.collections.users))
      const users = usersSnapshot.docs.map(doc => doc.data())

      const analytics = {
        total: users.length,
        active: users.filter(u => u.status === 'active').length,
        inactive: users.filter(u => u.status === 'inactive').length,
        byYear: {},
        bySpecialization: {},
        byDepartment: {},
        recentRegistrations: 0,
        growth: {}
      }

      // Group by year
      users.forEach(user => {
        const year = user.currentYear || 'Not Set'
        analytics.byYear[year] = (analytics.byYear[year] || 0) + 1
      })

      // Group by specialization
      users.forEach(user => {
        const spec = user.specialization || 'Not Set'
        analytics.bySpecialization[spec] = (analytics.bySpecialization[spec] || 0) + 1
      })

      // Group by department
      users.forEach(user => {
        const dept = user.department || 'Not Set'
        analytics.byDepartment[dept] = (analytics.byDepartment[dept] || 0) + 1
      })

      // Recent registrations (last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      analytics.recentRegistrations = users.filter(user => {
        const createdAt = user.createdAt?.toDate?.() || new Date(user.createdAt)
        return createdAt >= thirtyDaysAgo
      }).length

      // Growth calculation (simplified)
      analytics.growth = {
        thisMonth: analytics.recentRegistrations,
        lastMonth: Math.floor(analytics.recentRegistrations * 0.8), // Mock data
        percentage: analytics.recentRegistrations > 0 ? '+15%' : '0%'
      }

      return {
        success: true,
        data: analytics
      }
    } catch (error) {
      console.error('Error getting user analytics:', error)
      return { success: false, error: error.message }
    }
  }

  // Content Analytics
  async getContentAnalytics() {
    try {
      const analytics = {}

      // Get counts for each content type
      for (const [key, collectionName] of Object.entries(this.collections)) {
        if (key !== 'users' && key !== 'grades' && key !== 'attendance' && key !== 'analytics') {
          try {
            const snapshot = await getDocs(collection(db, collectionName))
            const items = snapshot.docs.map(doc => doc.data())

            analytics[key] = {
              total: items.length,
              active: items.filter(item => item.status === 'active').length,
              inactive: items.filter(item => item.status === 'inactive').length,
              recent: items.filter(item => {
                const createdAt = item.createdAt?.toDate?.() || new Date(item.createdAt)
                const sevenDaysAgo = new Date()
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
                return createdAt >= sevenDaysAgo
              }).length
            }
          } catch (error) {
            console.error(`Error getting ${key} analytics:`, error)
            analytics[key] = { total: 0, active: 0, inactive: 0, recent: 0 }
          }
        }
      }

      return {
        success: true,
        data: analytics
      }
    } catch (error) {
      console.error('Error getting content analytics:', error)
      return { success: false, error: error.message }
    }
  }

  // Academic Analytics
  async getAcademicAnalytics() {
    try {
      // Grades analytics
      const gradesSnapshot = await getDocs(collection(db, this.collections.grades))
      const grades = gradesSnapshot.docs.map(doc => doc.data())

      // Attendance analytics
      const attendanceSnapshot = await getDocs(collection(db, this.collections.attendance))
      const attendance = attendanceSnapshot.docs.map(doc => doc.data())

      const analytics = {
        grades: {
          total: grades.length,
          averageGPA: 0,
          gradeDistribution: {},
          topPerformers: 0
        },
        attendance: {
          total: attendance.length,
          averageRate: 0,
          presentCount: attendance.filter(a => a.status === 'present').length,
          absentCount: attendance.filter(a => a.status === 'absent').length
        }
      }

      // Grade distribution
      grades.forEach(grade => {
        analytics.grades.gradeDistribution[grade.grade] = (analytics.grades.gradeDistribution[grade.grade] || 0) + 1
      })

      // Calculate average attendance rate
      if (attendance.length > 0) {
        analytics.attendance.averageRate = ((analytics.attendance.presentCount / attendance.length) * 100).toFixed(2)
      }

      // Calculate average GPA (simplified)
      const uniqueStudents = [...new Set(grades.map(g => g.studentId))]
      if (uniqueStudents.length > 0) {
        let totalGPA = 0
        let studentCount = 0

        for (const studentId of uniqueStudents) {
          const studentGrades = grades.filter(g => g.studentId === studentId)
          if (studentGrades.length > 0) {
            const studentGPA = this.calculateStudentGPA(studentGrades)
            if (studentGPA > 0) {
              totalGPA += studentGPA
              studentCount++
            }
          }
        }

        analytics.grades.averageGPA = studentCount > 0 ? (totalGPA / studentCount).toFixed(2) : 0
        analytics.grades.topPerformers = Math.floor(studentCount * 0.1) // Top 10%
      }

      return {
        success: true,
        data: analytics
      }
    } catch (error) {
      console.error('Error getting academic analytics:', error)
      return { success: false, error: error.message }
    }
  }

  // Helper method to calculate student GPA
  calculateStudentGPA(grades) {
    const gradePoints = {
      'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5,
      'D': 4, 'F': 0, 'O': 10, 'E': 9
    }

    let totalPoints = 0
    let totalCredits = 0

    grades.forEach(grade => {
      const points = gradePoints[grade.grade] || 0
      const credits = grade.credits || 0
      totalPoints += points * credits
      totalCredits += credits
    })

    return totalCredits > 0 ? totalPoints / totalCredits : 0
  }

  // System Health Monitoring
  async getSystemHealth() {
    try {
      const health = {
        status: 'healthy',
        uptime: '99.9%',
        responseTime: '< 100ms',
        errorRate: '0.1%',
        lastBackup: new Date().toISOString(),
        storage: {
          used: '2.3 GB',
          available: '47.7 GB',
          usage: '4.6%'
        },
        performance: {
          cpu: '15%',
          memory: '45%',
          disk: '23%'
        }
      }

      // In a real system, you would check actual system metrics
      // For now, returning mock healthy status

      return health
    } catch (error) {
      console.error('Error getting system health:', error)
      return {
        status: 'error',
        error: error.message
      }
    }
  }

  // User Engagement Analytics
  async getUserEngagement() {
    try {
      const engagement = {
        dailyActiveUsers: 0,
        weeklyActiveUsers: 0,
        monthlyActiveUsers: 0,
        sessionDuration: '12m 34s',
        pageViews: 0,
        popularPages: [],
        bounceRate: '35%'
      }

      // In a real system, you would track user sessions and page views
      // For now, returning mock data

      return {
        success: true,
        data: engagement
      }
    } catch (error) {
      console.error('Error getting user engagement:', error)
      return { success: false, error: error.message }
    }
  }

  // Content Performance Analytics
  async getContentPerformance() {
    try {
      const performance = {
        events: {
          totalViews: 0,
          averageEngagement: '78%',
          topEvents: []
        },
        announcements: {
          totalReads: 0,
          clickThroughRate: '45%',
          popularTopics: []
        },
        syllabus: {
          downloads: 0,
          averageRating: 4.2,
          mostViewed: []
        }
      }

      // In a real system, you would track content interactions
      // For now, returning mock data

      return {
        success: true,
        data: performance
      }
    } catch (error) {
      console.error('Error getting content performance:', error)
      return { success: false, error: error.message }
    }
  }

  // Generate Reports
  async generateReport(type, options = {}) {
    try {
      const { startDate, endDate, format = 'json' } = options

      let reportData = {}

      switch (type) {
        case 'user-activity':
          reportData = await this.getUserAnalytics()
          break
        case 'content-performance':
          reportData = await this.getContentPerformance()
          break
        case 'academic-performance':
          reportData = await this.getAcademicAnalytics()
          break
        case 'system-overview':
          reportData = await this.getSystemOverview()
          break
        default:
          return { success: false, error: 'Invalid report type' }
      }

      if (!reportData.success) {
        return reportData
      }

      // Add report metadata
      const report = {
        type,
        generatedAt: new Date().toISOString(),
        dateRange: { startDate, endDate },
        data: reportData.data
      }

      if (format === 'csv') {
        // Convert to CSV format
        const csvData = this.convertReportToCSV(report)
        return {
          success: true,
          data: csvData,
          format: 'csv',
          filename: `${type}_report_${new Date().toISOString().split('T')[0]}.csv`
        }
      }

      return {
        success: true,
        data: report,
        format: 'json',
        filename: `${type}_report_${new Date().toISOString().split('T')[0]}.json`
      }
    } catch (error) {
      console.error('Error generating report:', error)
      return { success: false, error: error.message }
    }
  }

  // Real-time Monitoring
  async getRealTimeMetrics() {
    try {
      const metrics = {
        activeUsers: Math.floor(Math.random() * 50) + 10, // Mock data
        currentSessions: Math.floor(Math.random() * 30) + 5,
        requestsPerMinute: Math.floor(Math.random() * 100) + 50,
        errorRate: (Math.random() * 2).toFixed(2) + '%',
        responseTime: Math.floor(Math.random() * 50) + 20 + 'ms',
        timestamp: new Date().toISOString()
      }

      return {
        success: true,
        data: metrics
      }
    } catch (error) {
      console.error('Error getting real-time metrics:', error)
      return { success: false, error: error.message }
    }
  }

  // Helper method to convert report to CSV
  convertReportToCSV(report) {
    // This is a simplified CSV conversion
    // In a real system, you would have more sophisticated CSV generation
    const rows = []

    // Add header
    rows.push(['Report Type', 'Generated At', 'Date Range Start', 'Date Range End'])
    rows.push([
      report.type,
      report.generatedAt,
      report.dateRange?.startDate || '',
      report.dateRange?.endDate || ''
    ])

    // Add data section
    rows.push([])
    rows.push(['Data'])

    // Flatten the data object for CSV
    const flattenData = (obj, prefix = '') => {
      const result = []
      for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          result.push(...flattenData(value, newKey))
        } else {
          result.push([newKey, String(value)])
        }
      }
      return result
    }

    const dataRows = flattenData(report.data)
    rows.push(...dataRows)

    return rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
  }

  // Custom Analytics Queries
  async runCustomQuery(collectionName, filters = {}, aggregations = {}) {
    try {
      let queryRef = collection(db, collectionName)

      // Apply filters
      Object.entries(filters).forEach(([field, condition]) => {
        if (condition.operator && condition.value !== undefined) {
          switch (condition.operator) {
            case '==':
              queryRef = query(queryRef, where(field, '==', condition.value))
              break
            case '>':
              queryRef = query(queryRef, where(field, '>', condition.value))
              break
            case '<':
              queryRef = query(queryRef, where(field, '<', condition.value))
              break
            case '>=':
              queryRef = query(queryRef, where(field, '>=', condition.value))
              break
            case '<=':
              queryRef = query(queryRef, where(field, '<=', condition.value))
              break
          }
        }
      })

      // Apply limit
      if (filters.limit) {
        queryRef = query(queryRef, limit(filters.limit))
      }

      // Apply sorting
      if (filters.sortBy) {
        const sortOrder = filters.sortOrder === 'desc' ? 'desc' : 'asc'
        queryRef = query(queryRef, orderBy(filters.sortBy, sortOrder))
      }

      const snapshot = await getDocs(queryRef)
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      // Apply aggregations
      let result = data
      if (aggregations.groupBy) {
        const grouped = {}
        data.forEach(item => {
          const key = item[aggregations.groupBy]
          if (!grouped[key]) grouped[key] = []
          grouped[key].push(item)
        })

        if (aggregations.count) {
          result = Object.entries(grouped).map(([key, items]) => ({
            [aggregations.groupBy]: key,
            count: items.length
          }))
        } else {
          result = grouped
        }
      }

      return {
        success: true,
        data: result,
        total: data.length
      }
    } catch (error) {
      console.error('Error running custom query:', error)
      return { success: false, error: error.message }
    }
  }
}

export default new AnalyticsController()