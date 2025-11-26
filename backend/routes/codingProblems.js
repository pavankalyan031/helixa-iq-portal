// Coding Problems API Routes
// Handles all coding problem related endpoints

import express from 'express'
import codingProblemService from '../services/codingProblemService.js'

const router = express.Router()

// ==================== CODING PROBLEMS ROUTES ====================

// Get all problems for a specific topic
router.get('/topic/:topicId', async (req, res) => {
  try {
    const { topicId } = req.params
    const result = await codingProblemService.getProblemsByTopic(topicId)

    if (result.success) {
      res.json(result)
    } else {
      res.status(404).json(result)
    }
  } catch (error) {
    console.error('Error fetching problems by topic:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Get all problems for a specific section
router.get('/section/:sectionId', async (req, res) => {
  try {
    const { sectionId } = req.params
    const result = await codingProblemService.getProblemsBySection(sectionId)

    if (result.success) {
      res.json(result)
    } else {
      res.status(404).json(result)
    }
  } catch (error) {
    console.error('Error fetching problems by section:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Get problem by ID
router.get('/:problemId', async (req, res) => {
  try {
    const { problemId } = req.params
    const result = await codingProblemService.getProblemById(problemId)

    if (result.success) {
      res.json(result)
    } else {
      res.status(404).json(result)
    }
  } catch (error) {
    console.error('Error fetching problem:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Add new problem
router.post('/', async (req, res) => {
  try {
    const result = await codingProblemService.addProblem(req.body)

    if (result.success) {
      res.status(201).json(result)
    } else {
      res.status(400).json(result)
    }
  } catch (error) {
    console.error('Error adding problem:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Bulk import problems (for grindgram.in data)
router.post('/bulk-import', async (req, res) => {
  try {
    const { problems } = req.body

    if (!problems || !Array.isArray(problems)) {
      return res.status(400).json({
        success: false,
        error: 'Problems array is required'
      })
    }

    const result = await codingProblemService.bulkImportProblems(problems)

    if (result.success) {
      res.status(201).json(result)
    } else {
      res.status(400).json(result)
    }
  } catch (error) {
    console.error('Error bulk importing problems:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Update problem
router.put('/:problemId', async (req, res) => {
  try {
    const { problemId } = req.params
    const result = await codingProblemService.updateProblem(problemId, req.body)

    if (result.success) {
      res.json(result)
    } else {
      res.status(404).json(result)
    }
  } catch (error) {
    console.error('Error updating problem:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Delete problem
router.delete('/:problemId', async (req, res) => {
  try {
    const { problemId } = req.params
    const result = await codingProblemService.deleteProblem(problemId)

    if (result.success) {
      res.json(result)
    } else {
      res.status(404).json(result)
    }
  } catch (error) {
    console.error('Error deleting problem:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Search problems
router.get('/search', async (req, res) => {
  try {
    const { q: query, difficulty, topicId, sectionId } = req.query
    const filters = { difficulty, topicId, sectionId }

    const result = await codingProblemService.searchProblems(query, filters)

    if (result.success) {
      res.json(result)
    } else {
      res.status(400).json(result)
    }
  } catch (error) {
    console.error('Error searching problems:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

// Get problem statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const result = await codingProblemService.getProblemStats()

    if (result.success) {
      res.json(result)
    } else {
      res.status(500).json(result)
    }
  } catch (error) {
    console.error('Error getting problem stats:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

export default router