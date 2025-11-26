import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import authService from '../../utils/authService'

export default function ResetPassword(){
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [form, setForm] = React.useState({
    password: '',
    confirm: ''
  })
  const [loading, setLoading] = React.useState(false)
  const [err, setErr] = React.useState('')
  const [success, setSuccess] = React.useState(false)

  const token = searchParams.get('token')

  React.useEffect(() => {
    if (!token) {
      setErr('Invalid reset link. Please request a new password reset.')
    }
  }, [token])

  const validatePassword = (password) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long'
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter'
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter'
    }
    if (!hasNumbers) {
      return 'Password must contain at least one number'
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character'
    }
    return null
  }

  async function handleSubmit(e){
    e.preventDefault()
    setErr('')

    if (!token) {
      setErr('Invalid reset link.')
      return
    }

    const passwordError = validatePassword(form.password)
    if (passwordError) {
      setErr(passwordError)
      return
    }

    if (form.password !== form.confirm) {
      setErr('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      await authService.resetPasswordWithToken(token, form.password)
      setSuccess(true)

      // Redirect to login after success
      setTimeout(() => {
        navigate('/login')
      }, 3000)

    } catch (e) {
      console.error('Password reset error:', e)
      setErr(e.message || 'Failed to reset password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-md w-full space-y-8 animate-fade-in relative z-10 mx-4">
        {/* Glass morphism card */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border-4 border-white/20 relative overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>

          <div className="text-center mb-8 relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <img src="/assets/images/logo.png" alt="LTSU" className="w-12 h-12 rounded-full"/>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 animate-slide-up">
              Reset Password
            </h2>
            <p className="text-white/90 text-lg">
              Enter your new password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {err && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl p-4 text-center">
                <p className="text-red-200 text-sm font-medium">{err}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-4">
                <div className="flex items-center gap-2 text-green-200 text-sm font-medium">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Password reset successfully! Redirecting to login page...
                </div>
              </div>
            )}

            {!success && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">New Password</label>
                  <input
                    required
                    type="password"
                    placeholder="Enter new password (min 8 chars)"
                    value={form.password}
                    onChange={e=>setForm({...form, password:e.target.value})}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 disabled:opacity-50"
                  />
                  <div className="mt-2 text-xs text-white/70">
                    Must include: uppercase, lowercase, number, special character, minimum 8 characters
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Confirm New Password</label>
                  <input
                    required
                    type="password"
                    placeholder="Confirm new password"
                    value={form.confirm}
                    onChange={e=>setForm({...form, confirm:e.target.value})}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !token}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Resetting Password...
                    </div>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </>
            )}

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                Back to <span className="text-blue-400 hover:text-blue-300 font-semibold">Login</span>
              </button>
            </div>
          </form>

          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-6 right-6 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-6 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-6 right-4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}