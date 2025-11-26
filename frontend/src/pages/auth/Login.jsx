import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../../utils/authService'

export default function Login(){
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [rememberMe, setRememberMe] = React.useState(false)
  const [err, setErr] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [verificationRequired, setVerificationRequired] = React.useState(false)
  const [resendLoading, setResendLoading] = React.useState(false)
  const navigate = useNavigate()

  // Load remember me preference on component mount
  React.useEffect(() => {
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true'
    setRememberMe(savedRememberMe)
  }, [])

  const handleForgotPassword = async () => {
    if (!email) {
      setErr('Please enter your email address first.')
      return
    }
    setLoading(true)
    setErr('')
    try {
      await authService.resetPassword(email)
      alert('Password reset link sent to your email!')
    } catch (e) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e){
    e.preventDefault()
    setErr('')
    setLoading(true)
    setVerificationRequired(false)

    try{
      const result = await authService.login(email, password)

      // Handle remember me functionality - only save preference, not credentials
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true')
      } else {
        localStorage.removeItem('rememberMe')
        localStorage.removeItem('rememberedEmail')
        localStorage.removeItem('rememberedPassword')
      }

      // Check if user is admin
      if (authService.isAdmin()) {
        navigate('/admin/dashboard')
      } else {
        navigate('/')
      }

      console.log('Login successful:', result)
    }catch(e){
      console.error('Login error:', e)

      // Check if email verification is required
      if (e.message && e.message.includes('verify your email')) {
        setVerificationRequired(true)
        setErr('Please verify your email address before logging in. Check your email for the verification link.')
      } else {
        setErr(e.message || 'Invalid credentials or not allowed.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResendVerification = async () => {
    if (!email) {
      setErr('Please enter your email address first.')
      return
    }

    setResendLoading(true)
    setErr('')

    try {
      await authService.sendEmailVerification(email)
      setErr('Verification email sent! Please check your inbox.')
    } catch (e) {
      setErr(e.message || 'Failed to send verification email.')
    } finally {
      setResendLoading(false)
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

      <div className="max-w-lg w-full space-y-8 animate-fade-in relative z-10 mx-4">
        {/* Glass morphism card */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border-4 border-white/20 relative overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>

          <div className="text-center mb-8 relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/30">
                <img src="/assets/images/logo.png" alt="LTSU" className="w-12 h-12 rounded-full"/>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 animate-slide-up">
              Welcome Back
            </h2>
            <p className="text-white/90 text-lg">
              Sign in to LTSU Student Portal
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-white/70 text-sm font-medium">Learn • Share • Grow</span>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {err && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl p-4 text-center">
                <p className="text-red-200 text-sm font-medium">{err}</p>
                {verificationRequired && (
                  <button
                    onClick={handleResendVerification}
                    disabled={resendLoading}
                    className="mt-3 px-4 py-2 bg-blue-500/20 text-blue-200 rounded-lg font-medium hover:bg-blue-600/30 border border-blue-400/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {resendLoading ? 'Sending...' : 'Resend Verification Email'}
                  </button>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Password</label>
                <input
                  required
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 disabled:opacity-50"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                  className="mr-2 accent-blue-400 disabled:opacity-50"
                />
                <span className="text-sm text-white/80 font-medium group-hover:text-white transition-colors">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                className="text-sm text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Forgot password?
              </button>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="text-center">
              <Link to="/signup" className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200">
                Don't have an account? <span className="text-blue-400 hover:text-blue-300 font-semibold">Create one</span>
              </Link>
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
