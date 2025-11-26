import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { config } from '../../utils/config'

const PremiumLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [verificationLoading, setVerificationLoading] = useState(false)

  // Get message from location state (if redirected from registration)
  const message = location.state?.message || ''

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Premium access verification function
  const handleVerifyPremium = async () => {
    if (!formData.email) {
      setError('Please enter your email address first')
      return
    }

    setVerificationLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`${config.API_BASE_URL}/premium/check-access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.email })
      })

      const data = await response.json()

      if (data.success && data.canAccess) {
        setSuccess('🎉 Premium access confirmed! You can now login to access your Helixa IQ Portal.')
      } else {
        setError('❌ Premium access not found. Please register or upgrade your premium plan to access the Helixa IQ Portal.')
      }
    } catch (error) {
      console.error('Error checking premium access:', error)
      setError(`❌ Network error: ${error.message}. Please check your connection and try again.`)
    } finally {
      setVerificationLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${config.API_BASE_URL}/premium/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('Login successful! Redirecting to Helixa IQ Portal...')
        // Store user data and redirect
        localStorage.setItem('ltsu_premium_user', JSON.stringify(data.data))
        setTimeout(() => {
          navigate('/lms-portal', {
            state: {
              user: data.data,
              message: 'Welcome to Helixa IQ Portal!'
            }
          })
        }, 1500)
      } else {
        setError(data.error || 'Invalid email or password')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError(`Network error: ${error.message}. Please check your connection and try again.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-blue-500 shadow-2xl">
              <img
                src="/assets/images/ltsu-custom-logo.png"
                alt="LTSU Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Helixa IQ Portal</h1>
          <p className="text-gray-400 text-lg">Portal Login</p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800/50 backdrop-blur-xl border-4 border-blue-500/30 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">Welcome back!</h2>
            <p className="text-gray-400 text-sm">Please login to access your premium Helixa IQ Portal.</p>
          </div>

          {message && (
            <div className="mb-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 text-sm">{message}</p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <p className="text-green-300 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="jivos84441@fergetic.com"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Premium Access Verification Section */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-3">Need to verify your premium access?</p>
                <button
                  type="button"
                  onClick={handleVerifyPremium}
                  disabled={verificationLoading || !formData.email}
                  className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl mb-4"
                >
                  {verificationLoading ? 'Verifying...' : 'Check Premium Access'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              {loading ? 'Logging in...' : 'Login to Helixa IQ Portal'}
            </button>
          </form>

          {/* Registration and Navigation Links */}
          <div className="mt-6 pt-6 border-t border-gray-700 text-center space-y-3">
            <p className="text-sm text-gray-400">
              Don't have a premium account?{' '}
              <Link to="/premium-benefits" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">
                Register here
              </Link>
            </p>
            <Link
              to="/"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 text-sm"
            >
              ← Back to LTSU Student Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PremiumLogin