import express from 'express'
import UserControllerLocal from '../controllers/userControllerLocal.js'

const router = express.Router()

// ==================== REGULAR USER AUTHENTICATION ROUTES ====================

// Register new regular user
router.post('/register', async (req, res) => {
  try {
    const result = await UserControllerLocal.register(req.body)
    res.status(result.success ? 201 : 400).json(result)
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error during registration'
    })
  }
})

// Login regular user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      })
    }

    const result = await UserControllerLocal.login(email, password)
    res.status(result.success ? 200 : 401).json(result)
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error during login'
    })
  }
})

// ==================== REGULAR USER MANAGEMENT ROUTES ====================

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await UserControllerLocal.findUserById(req.params.id)
    res.status(result.success ? 200 : 404).json(result)
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user'
    })
  }
})

// Update user
router.put('/:id', async (req, res) => {
  try {
    const result = await UserControllerLocal.updateUser(req.params.id, req.body)
    res.status(result.success ? 200 : 400).json(result)
  } catch (error) {
    console.error('Update user error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update user'
    })
  }
})

// Get user statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = UserControllerLocal.getStatistics()
    res.status(200).json({
      success: true,
      data: stats
    })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    })
  }
})

export default router