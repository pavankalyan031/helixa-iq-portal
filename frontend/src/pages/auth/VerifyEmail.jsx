import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import authService from '../../utils/authService'

export default function VerifyEmail(){
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(true)
  const [err, setErr] = React.useState('')
  const [success, setSuccess] = React.useState(false)

  const token = searchParams.get('token')

  React.useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setErr('Invalid verification link. Please check your email for the correct link.')
        setLoading(false)
        return
      }

      try {
        const result = await authService.verifyEmail(token)
        setSuccess(true)
        console.log('Email verification successful:', result)

        // Redirect to login after success
        setTimeout(() => {
          navigate('/login')
        }, 3000)

      } catch (e) {
        console.error('Email verification error:', e)
        setErr(e.message || 'Failed to verify email. The link may be expired or invalid.')
      } finally {
        setLoading(false)
      }
    }

    verifyEmail()
  }, [token, navigate])

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
              Email Verification
            </h2>
            <p className="text-white/90 text-lg">
              Verifying your email address
            </p>
          </div>

          <div className="space-y-6 relative z-10">
            {loading && (
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-white/90 text-lg">Verifying your email...</p>
              </div>
            )}

            {err && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl p-6 text-center">
                <div className="text-6xl mb-4">❌</div>
                <p className="text-red-200 text-sm font-medium mb-4">{err}</p>
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-2 bg-blue-500/20 text-blue-200 rounded-lg font-medium hover:bg-blue-600/30 border border-blue-400/30 transition-all duration-200"
                >
                  Back to Login
                </button>
              </div>
            )}

            {success && (
              <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-6 text-center">
                <div className="text-6xl mb-4">✅</div>
                <div className="flex items-center justify-center gap-2 text-green-200 text-lg font-medium mb-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Email verified successfully!
                </div>
                <p className="text-green-200/80 text-sm mb-4">You can now log in to your account.</p>
                <p className="text-white/70 text-xs">Redirecting to login page...</p>
              </div>
            )}
          </div>

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