import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './PremiumUserAuth.css'

const PremiumUserLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Check if there's a message from registration or state passed from Student Portal
  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message)
    }
    if (location.state?.email) {
      setFormData(prev => ({
        ...prev,
        email: location.state.email
      }))
    }
  }, [location.state])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.email.trim()) return 'Email is required'
    if (!formData.password.trim()) return 'Password is required'
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address'
    }
    
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:3001/api/premium/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        // Store user data and token
        localStorage.setItem('lms_user', JSON.stringify(data.data.user))
        localStorage.setItem('lms_token', data.data.token)
        
        setSuccess('Login successful! Redirecting to LMS Portal...')
        setTimeout(() => {
          navigate('/lms-portal', { 
            state: { 
              user: data.data.user,
              token: data.data.token
            }
          })
        }, 1500)
      } else {
        setError(data.error || 'Login failed. Please check your credentials.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCheckAccess = async () => {
    if (!formData.email.trim()) {
      setError('Please enter your email address to check access')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:3001/api/premium/check-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.email })
      })

      const data = await response.json()

      if (data.success) {
        if (data.canAccess) {
          setSuccess('Great! You have active premium access. Please enter your password to login.')
        } else {
          setError(data.reason || 'Premium access not found. Please register for premium access.')
        }
      } else {
        setError(data.error || 'Could not verify access status')
      }
    } catch (error) {
      console.error('Access check error:', error)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="premium-auth-container">
      <div className="premium-auth-card">
        <div className="auth-header">
          <div className="logo-section">
            <img src="/assets/images/ltsu-custom-logo.png" alt="LTSU" className="auth-logo" />
            <div className="auth-title">
              <h1>LTSU Premium</h1>
              <p>Learning Management System Login</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-section">
            <h3>Login to Your Premium Account</h3>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your registered email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="login-actions">
              <button
                type="button"
                className="check-access-btn"
                onClick={handleCheckAccess}
                disabled={loading || !formData.email.trim()}
              >
                Check Premium Access
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login to LMS Portal'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have a premium account? <a href="/premium-register">Register here</a></p>
          <p>Back to <a href="/">LTSU Student Portal</a></p>
          
          {location.state?.fromStudentPortal && (
            <div className="student-portal-notice">
              <p><strong>📚 Direct Access from Student Portal</strong></p>
              <p>You're being redirected to the premium LMS portal after successful payment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PremiumUserLogin