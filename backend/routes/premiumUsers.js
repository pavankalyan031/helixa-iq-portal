import express from 'express'
import PremiumUserController from '../controllers/premiumUserControllerLocal.js'

const router = express.Router()

// ==================== PREMIUM USER AUTHENTICATION ROUTES ====================

// Register new premium user
router.post('/register', async (req, res) => {
  try {
    const result = await PremiumUserController.register(req.body)
    res.status(result.success ? 201 : 400).json(result)
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error during registration'
    })
  }
})

// Login premium user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      })
    }

    const result = await PremiumUserController.login(email, password)
    res.status(result.success ? 200 : 401).json(result)
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error during login'
    })
  }
})

// Check premium access (quick validation)
router.post('/check-access', async (req, res) => {
  try {
    const { email } = req.body
    
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      })
    }

    const result = await PremiumUserController.canAccessLMS(email)
    res.status(result.success ? 200 : 400).json(result)
  } catch (error) {
    console.error('Access check error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error during access check'
    })
  }
})

// ==================== PREMIUM USER MANAGEMENT ROUTES ====================

// Get all premium users (Admin only)
router.get('/users', async (req, res) => {
  try {
    const options = req.query
    const result = await PremiumUserController.getAllUsers(options)
    res.status(result.success ? 200 : 400).json(result)
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    })
  }
})

// Get user statistics (Admin only)
router.get('/stats', async (req, res) => {
  try {
    const result = await PremiumUserController.getUserStatistics()
    res.status(result.success ? 200 : 400).json(result)
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    })
  }
})

// Get user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const result = await PremiumUserController.getUserById(req.params.id)
    res.status(result.success ? 200 : 404).json(result)
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user'
    })
  }
})

// Update user progress
router.put('/users/:id/progress', async (req, res) => {
  try {
    const { courseId, progressData } = req.body
    const result = await PremiumUserController.updateProgress(req.params.id, courseId, progressData)
    res.status(result.success ? 200 : 400).json(result)
  } catch (error) {
    console.error('Update progress error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update progress'
    })
  }
})

// Update user profile
router.put('/users/:id', async (req, res) => {
  try {
    const result = await PremiumUserController.updateUser(req.params.id, req.body)
    res.status(result.success ? 200 : 400).json(result)
  } catch (error) {
    console.error('Update user error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update user'
    })
  }
})

// Delete user (Admin only)
router.delete('/users/:id', async (req, res) => {
  try {
    const result = await PremiumUserController.deleteUser(req.params.id)
    res.status(result.success ? 200 : 400).json(result)
  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to delete user'
    })
  }
})

// Search premium users
router.get('/search', async (req, res) => {
  try {
    const { term, ...filters } = req.query
    const result = await PremiumUserController.searchUsers(term, filters)
    res.status(result.success ? 200 : 400).json(result)
  } catch (error) {
    console.error('Search users error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to search users'
    })
  }
})

// ==================== ADMIN ROUTES (Protected) ====================

// Admin stats (Admin only)
router.get('/admin/stats', async (req, res) => {
  try {
    // In a real implementation, add admin authentication middleware
    const result = await PremiumUserController.getUserStatistics()
    res.status(result.success ? 200 : 400).json(result)
  } catch (error) {
    console.error('Admin stats error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch admin statistics'
    })
  }
})

export default router