import premiumUsersRouter from './premiumUsers.js'
import usersRouter from './users.js'
import codingProblemsRouter from './codingProblems.js'
// Main API Routes
// Defines all API endpoints for the admin backend

import express from 'express'
import AuthMiddleware from '../middleware/auth.js'
import adminService from '../services/adminService.js'

const router = express.Router()

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// System status endpoint
router.get('/status', AuthMiddleware.isAuthenticated, async (req, res) => {
  try {
    const healthCheck = await adminService.performHealthCheck()
    res.json(healthCheck)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get system status'
    })
  }
})

// Dashboard data endpoint
router.get('/dashboard', AuthMiddleware.isAdmin, async (req, res) => {
  try {
    const dashboardData = await adminService.getDashboardData()
    res.json(dashboardData)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get dashboard data'
    })
  }
})

// Real-time metrics endpoint
router.get('/metrics', AuthMiddleware.isAdmin, async (req, res) => {
  try {
    const metrics = await adminService.getRealTimeMetrics()
    res.json(metrics)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get metrics'
    })
  }
})

// ==================== USER MANAGEMENT ROUTES ====================

// Get all users
router.get('/users', AuthMiddleware.isAdmin, async (req, res) => {
  try {
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 50,
      search: req.query.search || '',
      year: req.query.year || '',
      specialization: req.query.specialization || '',
      status: req.query.status || '',
      sortBy: req.query.sortBy || 'createdAt',
      sortOrder: req.query.sortOrder || 'desc'
    }

    const result = await adminService.getAllUsers(options)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    })
  }
})

// Get user by ID
router.get('/users/:id', AuthMiddleware.isAuthenticated, async (req, res) => {
  try {
    const result = await adminService.getUserById(req.params.id)

    // Check if user can access this data
    if (!req.isAdmin && req.user.uid !== req.params.id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      })
    }

    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user'
    })
  }
})

// Update user
router.put('/users/:id', AuthMiddleware.hasPermission('user.write'), async (req, res) => {
  try {
    // Check permissions
    if (!req.isAdmin && req.user.uid !== req.params.id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      })
    }

    const result = await adminService.updateUser(req.params.id, req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update user'
    })
  }
})

// Delete user
router.delete('/users/:id', AuthMiddleware.isAdmin, async (req, res) => {
  try {
    const result = await adminService.deleteUser(req.params.id)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete user'
    })
  }
})

// Search users
router.get('/users/search/:term', AuthMiddleware.isAuthenticated, async (req, res) => {
  try {
    const filters = req.query
    const result = await adminService.searchUsers(req.params.term, filters)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to search users'
    })
  }
})

// Export users
router.get('/users/export/:format', AuthMiddleware.isAdmin, async (req, res) => {
  try {
    const format = req.params.format
    const filters = req.query

    const result = await adminService.exportUsers(format, filters)

    if (result.success) {
      if (format === 'csv') {
        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`)
        res.send(result.data)
      } else {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`)
        res.send(JSON.stringify(result.data, null, 2))
      }
    } else {
      res.status(500).json(result)
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to export users'
    })
  }
})

// Bulk update users
router.post('/users/bulk-update', AuthMiddleware.isAdmin, async (req, res) => {
  try {
    const { userIds, updateData } = req.body

    if (!userIds || !Array.isArray(userIds) || !updateData) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request data'
      })
    }

    const result = await adminService.bulkUpdateUsers(userIds, updateData)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to bulk update users'
    })
  }
})

// ==================== CONTENT MANAGEMENT ROUTES ====================

// Generic content CRUD
router.post('/content/:type', AuthMiddleware.hasPermission('content.write'), async (req, res) => {
  try {
    const result = await adminService.createContent(req.params.type, req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Failed to create ${req.params.type}`
    })
  }
})

router.get('/content/:type', AuthMiddleware.isAuthenticated, async (req, res) => {
  try {
    const options = req.query
    const result = await adminService.getAllContent(req.params.type, options)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Failed to fetch ${req.params.type}`
    })
  }
})

router.put('/content/:type/:id', AuthMiddleware.hasPermission('content.write'), async (req, res) => {
  try {
    const result = await adminService.updateContent(req.params.type, req.params.id, req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Failed to update ${req.params.type}`
    })
  }
})

router.delete('/content/:type/:id', AuthMiddleware.hasPermission('content.delete'), async (req, res) => {
  try {
    const result = await adminService.deleteContent(req.params.type, req.params.id)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Failed to delete ${req.params.type}`
    })
  }
})

// Specific content endpoints
router.get('/events/upcoming', AuthMiddleware.isAuthenticated, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10
    const result = await adminService.getUpcomingEvents(limit)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch upcoming events'
    })
  }
})

router.get('/announcements/active', AuthMiddleware.isAuthenticated, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20
    const result = await adminService.getActiveAnnouncements(limit)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch active announcements'
    })
  }
})

router.get('/deadlines/upcoming', AuthMiddleware.isAuthenticated, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10
    const result = await adminService.getUpcomingDeadlines(limit)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch upcoming deadlines'
    })
  }
})

router.get('/syllabus/:specialization/:year/:semester', AuthMiddleware.isAuthenticated, async (req, res) => {
  try {
    const { specialization, year, semester } = req.params
    const result = await adminService.getSyllabusBySpecialization(specialization, year, semester)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch syllabus'
    })
  }
})

// ==================== ACADEMIC MANAGEMENT ROUTES ====================

// Grades management
router.post('/grades', AuthMiddleware.hasPermission('academic.write'), async (req, res) => {
  try {
    const result = await adminService.createGrade(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create grade'
    })
  }
})

router.get('/grades/:studentId', AuthMiddleware.isAuthenticated, async (req, res) => {
  try {
    // Check permissions
    if (!req.isAdmin && req.user.uid !== req.params.studentId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      })
    }

    const options = req.query
    const result = await adminService.getStudentGrades(req.params.studentId, options)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch grades'
    })
  }
})

router.put('/grades/:id', AuthMiddleware.hasPermission('academic.write'), async (req, res) => {
  try {
    const result = await adminService.updateGrade(req.params.id, req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update grade'
    })
  }
})

router.get('/grades/:studentId/gpa', AuthMiddleware.isAuthenticated, async (req, res) => {
  try {
    // Check permissions
    if (!req.isAdmin && req.user.uid !== req.params.studentId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      })
    }

    const year = req.query.year
    const semester = req.query.semester
    const result = await adminService.calculateGPA(req.params.studentId, year, semester)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to calculate GPA'
    })
  }
})

// Attendance management
router.post('/attendance', AuthMiddleware.hasPermission('academic.write'), async (req, res) => {
  try {
    const result = await adminService.createAttendance(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create attendance'
    })
  }
})

router.get('/attendance/:studentId', AuthMiddleware.isAuthenticated, async (req, res) => {
  try {
    // Check permissions
    if (!req.isAdmin && req.user.uid !== req.params.studentId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      })
    }

    const options = req.query
    const result = await adminService.getStudentAttendance(req.params.studentId, options)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch attendance'
    })
  }
})

router.put('/attendance/:id', AuthMiddleware.hasPermission('academic.write'), async (req, res) => {
  try {
    const result = await adminService.updateAttendance(req.params.id, req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update attendance'
    })
  }
})

router.get('/attendance/:studentId/percentage', AuthMiddleware.isAuthenticated, async (req, res) => {
  try {
    // Check permissions
    if (!req.isAdmin && req.user.uid !== req.params.studentId) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      })
    }

    const subject = req.query.subject
    const month = req.query.month
    const year = req.query.year
    const result = await adminService.calculateAttendancePercentage(req.params.studentId, subject, month, year)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to calculate attendance percentage'
    })
  }
})

router.post('/attendance/bulk', AuthMiddleware.hasPermission('academic.write'), async (req, res) => {
  try {
    const attendanceRecords = req.body.records
    if (!attendanceRecords || !Array.isArray(attendanceRecords)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid attendance records'
      })
    }

    const result = await adminService.bulkCreateAttendance(attendanceRecords)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to bulk create attendance'
    })
  }
})

// Academic statistics
router.get('/academic/stats', AuthMiddleware.isAdmin, async (req, res) => {
  try {
    const options = req.query
    const result = await adminService.getAcademicStatistics(options)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get academic statistics'
    })
  }
})

// ==================== ANALYTICS ROUTES ====================

// System overview
router.get('/analytics/overview', AuthMiddleware.isAdmin, async (req, res) => {
  try {
    const result = await adminService.getSystemOverview()
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get system overview'
    })
  }
})

// User analytics
router.get('/analytics/users', AuthMiddleware.isAdmin, async (req, res) => {
  try {
    const result = await adminService.getUserAnalytics()
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get user analytics'
    })
  }
})

// Content analytics
router.get('/analytics/content', AuthMiddleware.isAdmin, async (req, res) => {
  try {
    const result = await adminService.getContentAnalytics()
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get content analytics'
    })
  }
})

// Academic analytics
router.get('/analytics/academic', AuthMiddleware.isAdmin, async (req, res) => {
  try {
    const result = await adminService.getAcademicAnalytics()
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get academic analytics'
    })
  }
})

// Generate reports
router.get('/reports/:type', AuthMiddleware.isAdmin, async (req, res) => {
  try {
    const { type } = req.params
    const options = req.query

    const result = await adminService.generateReport(type, options)

    if (result.success) {
      if (options.format === 'csv') {
        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`)
        res.send(result.data)
      } else {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`)
        res.send(JSON.stringify(result.data, null, 2))
      }
    } else {
      res.status(500).json(result)
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate report'
    })
  }
})

// Custom queries
router.post('/analytics/query', AuthMiddleware.isAdmin, async (req, res) => {
  try {
    const { collection, filters, aggregations } = req.body

    if (!collection) {
      return res.status(400).json({
        success: false,
        error: 'Collection name is required'
      })
    }

    const result = await adminService.runCustomQuery(collection, filters, aggregations)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to run custom query'
    })
  }
})

// ==================== SYSTEM MANAGEMENT ROUTES ====================

// Backup operations
router.post('/backup', AuthMiddleware.isAdmin, async (req, res) => {
  try {
    const options = req.body
    const result = await adminService.createBackup(options)

    if (result.success) {
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`)
      res.send(JSON.stringify(result.data, null, 2))
    } else {
      res.status(500).json(result)
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create backup'
    })
  }
})

// Restore operations
router.post('/restore', AuthMiddleware.isAdmin, async (req, res) => {
  try {
    const backupData = req.body

    if (!backupData) {
      return res.status(400).json({
        success: false,
        error: 'Backup data is required'
      })
    }

    const result = await adminService.restoreBackup(backupData)
    res.json(result)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to restore backup'
    })
  }
})

// System configuration (placeholder)
router.get('/config', AuthMiddleware.isAdmin, async (req, res) => {
  try {
    // In a real system, this would fetch from a config collection
    const config = {
      systemName: 'LTSU Student Portal',
      version: '1.0.0',
      maintenance: false,
      features: {
        userRegistration: true,
        adminDashboard: true,
        analytics: true,
        backup: true
      }
    }

    res.json({
      success: true,
      data: config
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get system configuration'
    })
  }
})

// ==================== PASSWORD RESET ROUTES ====================

// Request password reset
router.post('/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      })
    }

    // Check if user exists
    const userController = (await import('../controllers/userControllerLocal.js')).default
    const users = userController.getAllUsers()
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'No account found with this email address'
      })
    }

    // Generate reset token (simple for demo - in production use JWT)
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const resetExpires = Date.now() + (15 * 60 * 1000) // 15 minutes

    // Store reset token temporarily (in production, use database)
    global.resetTokens = global.resetTokens || {}
    global.resetTokens[resetToken] = {
      email: email,
      expiresAt: resetExpires
    }

    // Send password reset email
    const nodemailer = (await import('nodemailer')).default

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'LTSU Student Portal - Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px;">
          <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; margin: 0; font-size: 28px;">LTSU Student Portal</h1>
              <p style="color: #6b7280; margin: 5px 0;">Password Reset</p>
            </div>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">Hello,</p>
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">You have requested to reset your password for your LTSU Student Portal account. Click the button below to reset your password:</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">Reset Password</a>
            </div>

            <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin: 20px 0;">
              <p style="color: #92400e; margin: 0; font-size: 14px; font-weight: 500;">
                ⚠️ This link will expire in <strong>15 minutes</strong> for security reasons.
              </p>
            </div>

            <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
              If you didn't request this password reset, please ignore this email. Your account security is important to us.
            </p>

            <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <span style="word-break: break-all; color: #2563eb;">${resetLink}</span>
            </p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

            <div style="text-align: center;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                Best regards,<br>
                <strong>LTSU Student Portal Team</strong>
              </p>
              <p style="color: #9ca3af; font-size: 11px; margin: 10px 0 0 0;">
                This is an automated message. Please do not reply to this email.
              </p>
            </div>
          </div>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)

    console.log(`✅ Password reset email sent to ${email}`)

    res.json({
      success: true,
      message: 'Password reset link sent to your email'
    })

  } catch (error) {
    console.error('Password reset error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to send password reset email. Please try again.'
    })
  }
})

// Reset password with token
router.post('/auth/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Token and new password are required'
      })
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 8 characters long'
      })
    }

    // Check if token exists and is valid
    const resetData = global.resetTokens?.[token]
    if (!resetData) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired reset token'
      })
    }

    if (Date.now() > resetData.expiresAt) {
      delete global.resetTokens[token]
      return res.status(400).json({
        success: false,
        error: 'Reset token has expired'
      })
    }

    // Hash new password
    const bcrypt = (await import('bcryptjs')).default
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds)

    // Update user password
    const userController = (await import('../controllers/userControllerLocal.js')).default
    const users = userController.getAllUsers()
    const userIndex = users.findIndex(u => u.email.toLowerCase() === resetData.email.toLowerCase())

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }

    users[userIndex].password = hashedPassword
    users[userIndex].updatedAt = new Date().toISOString()

    if (userController.saveAllUsers(users)) {
      // Clean up token
      delete global.resetTokens[token]

      res.json({
        success: true,
        message: 'Password reset successfully'
      })
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to update password'
      })
    }

  } catch (error) {
    console.error('Reset password error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to reset password. Please try again.'
    })
  }
})

// ==================== EMAIL VERIFICATION ROUTES ====================

// Send email verification
router.post('/auth/send-verification', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      })
    }

    // Check if user exists
    const userController = (await import('../controllers/userControllerLocal.js')).default
    const users = userController.getAllUsers()
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }

    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        error: 'Email is already verified'
      })
    }

    // Generate verification token
    const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const verificationExpires = Date.now() + (24 * 60 * 60 * 1000) // 24 hours

    // Store verification token temporarily
    global.verificationTokens = global.verificationTokens || {}
    global.verificationTokens[verificationToken] = {
      email: email,
      expiresAt: verificationExpires
    }

    // Send verification email
    const nodemailer = (await import('nodemailer')).default

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    const verificationLink = `http://localhost:5173/verify-email?token=${verificationToken}`

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'LTSU Student Portal - Verify Your Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px;">
          <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; margin: 0; font-size: 28px;">LTSU Student Portal</h1>
              <p style="color: #6b7280; margin: 5px 0;">Email Verification</p>
            </div>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">Hello ${user.firstName},</p>
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">Welcome to LTSU Student Portal! To complete your account setup and start accessing all features, please verify your email address by clicking the button below:</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationLink}" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">Verify Email Address</a>
            </div>

            <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin: 20px 0;">
              <p style="color: #92400e; margin: 0; font-size: 14px; font-weight: 500;">
                ⚠️ This verification link will expire in <strong>24 hours</strong>.
              </p>
            </div>

            <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
              Once verified, you'll have full access to:
            </p>
            <ul style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 10px 0;">
              <li>📚 Course materials and resources</li>
              <li>📊 Academic progress tracking</li>
              <li>🎯 Career guidance and opportunities</li>
              <li>👥 Student community features</li>
            </ul>

            <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <span style="word-break: break-all; color: #2563eb;">${verificationLink}</span>
            </p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

            <div style="text-align: center;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                Best regards,<br>
                <strong>LTSU Student Portal Team</strong>
              </p>
              <p style="color: #9ca3af; font-size: 11px; margin: 10px 0 0 0;">
                This is an automated message. Please do not reply to this email.
              </p>
            </div>
          </div>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)

    console.log(`✅ Verification email sent to ${email}`)

    res.json({
      success: true,
      message: 'Verification email sent successfully'
    })

  } catch (error) {
    console.error('Email verification error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to send verification email. Please try again.'
    })
  }
})

// Verify email with token
router.post('/auth/verify-email', async (req, res) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({
        success: false,
        error: 'Verification token is required'
      })
    }

    // Check if token exists and is valid
    const verificationData = global.verificationTokens?.[token]
    if (!verificationData) {
      return res.status(400).json({
        success: false,
        error: 'Invalid verification token'
      })
    }

    if (Date.now() > verificationData.expiresAt) {
      delete global.verificationTokens[token]
      return res.status(400).json({
        success: false,
        error: 'Verification token has expired'
      })
    }

    // Update user email verification status
    const userController = (await import('../controllers/userControllerLocal.js')).default
    const users = userController.getAllUsers()
    const userIndex = users.findIndex(u => u.email.toLowerCase() === verificationData.email.toLowerCase())

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }

    users[userIndex].emailVerified = true
    users[userIndex].updatedAt = new Date().toISOString()

    if (userController.saveAllUsers(users)) {
      // Clean up token
      delete global.verificationTokens[token]

      res.json({
        success: true,
        message: 'Email verified successfully! You can now log in.'
      })
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to verify email'
      })
    }

  } catch (error) {
    console.error('Verify email error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to verify email. Please try again.'
    })
  }
})

// ==================== OTP EMAIL ROUTES ====================

// Send OTP to email
router.post('/auth/send-otp', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      })
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Store OTP temporarily (in production, use Redis or database)
    // For demo, we'll use a simple in-memory store
    global.otpStore = global.otpStore || {}
    global.otpStore[email] = {
      otp: otp,
      expiresAt: Date.now() + (5 * 60 * 1000) // 5 minutes
    }

    // Send real email with OTP using nodemailer
    const nodemailer = (await import('nodemailer')).default

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'LTSU Student Portal - Email Verification OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px;">
          <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; margin: 0; font-size: 28px;">LTSU Student Portal</h1>
              <p style="color: #6b7280; margin: 5px 0;">Email Verification</p>
            </div>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">Hello,</p>
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">Thank you for registering with LTSU Student Portal. To complete your account verification, please use the following One-Time Password (OTP):</p>

            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 25px; text-align: center; margin: 30px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h1 style="margin: 0; font-size: 36px; letter-spacing: 8px; font-weight: bold;">${otp}</h1>
              <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Valid for 5 minutes</p>
            </div>

            <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin: 20px 0;">
              <p style="color: #92400e; margin: 0; font-size: 14px; font-weight: 500;">
                ⚠️ This OTP will expire in <strong>5 minutes</strong> for security reasons.
              </p>
            </div>

            <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
              If you didn't request this verification code, please ignore this email. Your account security is important to us.
            </p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

            <div style="text-align: center;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                Best regards,<br>
                <strong>LTSU Student Portal Team</strong>
              </p>
              <p style="color: #9ca3af; font-size: 11px; margin: 10px 0 0 0;">
                This is an automated message. Please do not reply to this email.
              </p>
            </div>
          </div>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)

    console.log(`✅ Real OTP email sent to ${email}`)

    res.json({
      success: true,
      message: 'OTP sent successfully to your email'
    })

  } catch (error) {
    console.error('OTP send error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to send OTP. Please try again.'
    })
  }
})

// Verify OTP
router.post('/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Email and OTP are required'
      })
    }

    const storedOtp = global.otpStore?.[email]

    if (!storedOtp) {
      return res.status(400).json({
        success: false,
        error: 'OTP not found or expired. Please request a new one.'
      })
    }

    if (Date.now() > storedOtp.expiresAt) {
      delete global.otpStore[email]
      return res.status(400).json({
        success: false,
        error: 'OTP has expired. Please request a new one.'
      })
    }

    if (storedOtp.otp !== otp) {
      return res.status(400).json({
        success: false,
        error: 'Invalid OTP. Please check and try again.'
      })
    }

    // OTP verified successfully
    delete global.otpStore[email]

    res.json({
      success: true,
      message: 'Email verified successfully!'
    })

  } catch (error) {
    console.error('OTP verification error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to verify OTP. Please try again.'
    })
  }
})

// ==================== PREMIUM USERS ROUTES ====================

// Mount premium users router
router.use('/premium', premiumUsersRouter)

// ==================== CODING PROBLEMS ROUTES ====================

// Mount coding problems router
router.use('/coding-problems', codingProblemsRouter)

// ==================== REGULAR USERS ROUTES ====================

// Mount regular users router
router.use('/users', usersRouter)

// ==================== UTILITY ROUTES ====================

// Clear cache (placeholder)
router.post('/cache/clear', AuthMiddleware.isAdmin, async (req, res) => {
  try {
    // In a real system, this would clear various caches
    res.json({
      success: true,
      message: 'Cache cleared successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to clear cache'
    })
  }
})

// System logs (placeholder)
router.get('/logs', AuthMiddleware.isAdmin, async (req, res) => {
  try {
    // In a real system, this would fetch from a logs collection
    const logs = [
      {
        timestamp: new Date().toISOString(),
        level: 'info',
        message: 'System started successfully',
        source: 'system'
      }
    ]

    res.json({
      success: true,
      data: logs
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch logs'
    })
  }
})

export default router