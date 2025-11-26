// Helixa IQ Portal - Backend Server
// Main server file for the admin backend system

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import AuthMiddleware from './middleware/auth.js'
import apiRoutes from './routes/api.js'

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 3002

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}))

// Compression middleware
app.use(compression())

// Logging middleware
app.use(morgan('combined'))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Request logging
app.use(AuthMiddleware.logRequest)

// Health check endpoint (no auth required)
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend API is healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  })
})

// API routes
app.use('/api', apiRoutes)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
    code: 'NOT_FOUND'
  })
})

// Error handling middleware
app.use(AuthMiddleware.errorHandler)

// Global error handler
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})

// Start server with port fallback
const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(` LTSU STudent Portal Backend Server running on port ${port}`)
    console.log(` Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(` API Base URL: http://localhost:${port}/api`)
    console.log(` Health Check: http://localhost:${port}/api/health`)
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying port ${port + 1}...`)
      startServer(port + 1)
    } else {
      console.error('Server error:', err)
      process.exit(1)
    }
  })

  return server
}

const server = startServer(parseInt(PORT))

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  server.close(() => {
    console.log('Process terminated')
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully')
  server.close(() => {
    console.log('Process terminated')
  })
})

export default app