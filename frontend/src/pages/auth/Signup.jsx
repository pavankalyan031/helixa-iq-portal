import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../../utils/authService'

export default function Signup(){
  const [form, setForm] = React.useState({
    fullName:'', 
    phone:'', 
    email:'', 
    password:'', 
    confirm:'' , 
    gender:'', 
    branch:'', 
    specialization:'', 
    rollNo:'', 
    countryCode:'+91'
  })
  const [accountCreated, setAccountCreated] = React.useState(false)
  const [err, setErr] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [showCountryPopup, setShowCountryPopup] = React.useState(false)
  const [emailVerificationSent, setEmailVerificationSent] = React.useState(false)
  const navigate = useNavigate()

  const getSpecializationOptions = () => {
    if (form.branch === 'BTech CSE IBM') {
      return ['AI & ML', 'Data Science', 'IOT', 'Cyber Security']
    } else if (form.branch === 'BTech Core') {
      return ['ME', 'EC', 'EE', 'Computer Science (Core)']
    }
    return []
  }

  // Password validation function
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
    return null // Valid password
  }

  async function handleSubmit(e){
    e.preventDefault()
    setErr('')
    setLoading(true)

    // Validate password strength
    const passwordError = validatePassword(form.password)
    if (passwordError) {
      setErr(passwordError)
      setLoading(false)
      return
    }

    if(form.password !== form.confirm){
      setErr('Passwords do not match')
      setLoading(false)
      return
    }

    // Validate Indian phone number (10 digits)
    if (form.countryCode === '+91' && form.phone.length !== 10) {
      setErr('Please enter a valid 10-digit Indian phone number')
      setLoading(false)
      return
    }

    try{
      const userData = {
        email: form.email,
        password: form.password,
        fullName: form.fullName,
        phone: form.countryCode + form.phone,
        rollNo: form.rollNo,
        gender: form.gender,
        branch: form.branch,
        specialization: form.specialization
      }

      const result = await authService.register(userData)

      setAccountCreated(true)
      console.log('Registration successful:', result)

      // Send verification email
      try {
        await authService.sendEmailVerification(userData.email)
        console.log('Verification email sent')
      } catch (verificationError) {
        console.error('Failed to send verification email:', verificationError)
        // Don't block registration if verification email fails
      }

      // Show success message and redirect to login after delay
      setTimeout(() => {
        navigate('/login')
      }, 3000)

    }catch(e){
      console.error('Signup error:', e)
      setErr(e.message || 'Failed to create account. Please try again.')
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
      <div className="max-w-2xl w-full space-y-8 animate-fade-in relative z-10 mx-8">
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
              Join LTSU Portal
            </h2>
            <p className="text-white/90 text-lg">
              Create Your Student Account
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
              </div>
            )}

            {accountCreated && (
              <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-4">
                <div className="flex items-center gap-2 text-green-200 text-sm font-medium">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Account created successfully! Redirecting to login page...
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
                  <input
                    required
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={e=>setForm({...form, fullName:e.target.value})}
                    disabled={loading || emailVerificationSent}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 disabled:opacity-50"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-white mb-2">Phone Number</label>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => setShowCountryPopup(!showCountryPopup)}
                      disabled={loading || accountCreated}
                      className="px-3 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-l-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 min-w-[120px] text-left disabled:opacity-50"
                    >
                      {form.countryCode === '+91' ? '🇮🇳 +91' : 'Select Country'}
                    </button>
                    <input
                      required
                      type="tel"
                      placeholder="Enter 10-digit phone number"
                      value={form.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '') // Only allow digits
                        if (value.length <= 10) { // Limit to 10 digits for India
                          setForm({...form, phone: value})
                        }
                      }}
                      maxLength="10"
                      pattern="[0-9]{10}"
                      disabled={loading || emailVerificationSent}
                      className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border-l-0 border border-white/20 rounded-r-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 disabled:opacity-50"
                    />
                  </div>

                  {/* Country Selection Popup */}
                  {showCountryPopup && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-black/90 backdrop-blur-2xl rounded-2xl shadow-2xl p-3 border border-white/20 w-64 max-h-80 overflow-hidden">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-base font-bold text-white">Select Country</h3>
                        <button
                          onClick={() => setShowCountryPopup(false)}
                          className="text-white/70 hover:text-white text-lg"
                        >
                          ×
                        </button>
                      </div>
                      <div className="max-h-64 overflow-y-auto space-y-1">
                        <div
                          onClick={() => { setForm({...form, countryCode:'+91'}); setShowCountryPopup(false); }}
                          className="flex items-center p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-all duration-200"
                        >
                          <span className="text-lg mr-2">🇮🇳</span>
                          <span className="text-white text-sm font-medium">IN +91</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={e=>setForm({...form, email:e.target.value})}
                    disabled={loading || emailVerificationSent}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 disabled:opacity-50"
                  />
                  <div className="mt-2 text-xs text-white/70">
                    A verification link will be sent to this email after signup
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Roll Number</label>
                  <input
                    required
                    placeholder="Enter your roll number"
                    value={form.rollNo}
                    onChange={e=>setForm({...form, rollNo:e.target.value})}
                    disabled={loading || emailVerificationSent}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Gender</label>
                  <select
                    required
                    value={form.gender}
                    onChange={e=>setForm({...form, gender:e.target.value})}
                    disabled={loading || emailVerificationSent}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 disabled:opacity-50"
                  >
                    <option value="" className="bg-gray-800">Select gender</option>
                    <option value="Male" className="bg-gray-800">Male</option>
                    <option value="Female" className="bg-gray-800">Female</option>
                    <option value="Other" className="bg-gray-800">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Branch</label>
                  <select
                    required
                    value={form.branch}
                    onChange={e=>setForm({...form, branch:e.target.value, specialization:''})}
                    disabled={loading || emailVerificationSent}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 disabled:opacity-50"
                  >
                    <option value="" className="bg-gray-800">Select branch</option>
                    <option value="BTech CSE IBM" className="bg-gray-800">BTech CSE IBM</option>
                    <option value="BTech Core" className="bg-gray-800">BTech Core</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Specialization</label>
                  <select
                    required
                    value={form.specialization}
                    onChange={e=>setForm({...form, specialization:e.target.value})}
                    disabled={loading || emailVerificationSent}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 disabled:opacity-50"
                  >
                    <option value="" className="bg-gray-800">Select specialization</option>
                    {getSpecializationOptions().map(spec => (
                      <option key={spec} value={spec} className="bg-gray-800">{spec}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Password</label>
                    <input
                      required
                      type="password"
                      placeholder="Create strong password (min 8 chars)"
                      value={form.password}
                      onChange={e=>setForm({...form, password:e.target.value})}
                      disabled={loading || emailVerificationSent}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 disabled:opacity-50"
                    />
                    <div className="mt-2 text-xs text-white/70">
                      Must include: uppercase, lowercase, number, special character, minimum 8 characters
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Confirm Password</label>
                    <input
                      required
                      type="password"
                      placeholder="Confirm password"
                      value={form.confirm}
                      onChange={e=>setForm({...form, confirm:e.target.value})}
                      disabled={loading || emailVerificationSent}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || accountCreated}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : accountCreated ? (
                'Account Created Successfully'
              ) : (
                'Create Account'
              )}
            </button>

            <div className="text-center">
              <Link to="/login" className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200">
                Already have an account? <span className="text-blue-400 hover:text-blue-300 font-semibold">Sign in</span>
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
