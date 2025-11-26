import React, { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'

// Country codes data (same as signup page)
const countryCodes = [
  { code: '+91', flag: '🇮🇳', name: 'IN' },
  { code: '+1', flag: '🇺🇸', name: 'US' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+61', flag: '🇦🇺', name: 'AU' },
  { code: '+81', flag: '🇯🇵', name: 'JP' },
  { code: '+86', flag: '🇨🇳', name: 'CN' },
  { code: '+49', flag: '🇩🇪', name: 'DE' },
  { code: '+33', flag: '🇫🇷', name: 'FR' },
  { code: '+39', flag: '🇮🇹', name: 'IT' },
  { code: '+7', flag: '🇷🇺', name: 'RU' },
  { code: '+55', flag: '🇧🇷', name: 'BR' },
  { code: '+52', flag: '🇲🇽', name: 'MX' },
  { code: '+27', flag: '🇿🇦', name: 'ZA' },
  { code: '+82', flag: '🇰🇷', name: 'KR' },
  { code: '+65', flag: '🇸🇬', name: 'SG' },
  { code: '+60', flag: '🇲🇾', name: 'MY' },
  { code: '+63', flag: '🇵🇭', name: 'PH' },
  { code: '+66', flag: '🇹🇭', name: 'TH' },
  { code: '+84', flag: '🇻🇳', name: 'VN' },
  { code: '+62', flag: '🇮🇩', name: 'ID' },
  { code: '+20', flag: '🇪🇬', name: 'EG' },
  { code: '+234', flag: '🇳🇬', name: 'NG' },
  { code: '+254', flag: '🇰🇪', name: 'KE' },
  { code: '+971', flag: '🇦🇪', name: 'AE' },
  { code: '+966', flag: '🇸🇦', name: 'SA' },
  { code: '+90', flag: '🇹🇷', name: 'TR' },
  { code: '+48', flag: '🇵🇱', name: 'PL' },
  { code: '+31', flag: '🇳🇱', name: 'NL' },
  { code: '+46', flag: '🇸🇪', name: 'SE' },
  { code: '+47', flag: '🇳🇴', name: 'NO' },
  { code: '+45', flag: '🇩🇰', name: 'DK' },
  { code: '+41', flag: '🇨🇭', name: 'CH' },
  { code: '+43', flag: '🇦🇹', name: 'AT' },
  { code: '+32', flag: '🇧🇪', name: 'BE' },
  { code: '+34', flag: '🇪🇸', name: 'ES' }
]

const PaymentFlow = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const selectedPlan = searchParams.get('plan') || 'semester'
  
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    fullName: '',
    phoneNumber: '',
    countryCode: '+91',
    email: '',
    password: '',
    
    // Step 2: Academic Information
    studentId: '',
    college: '',
    currentYear: '',
    currentSemester: '',
    
    // Step 3: Payment Method
    paymentMethod: '',
    
    // Step 4: Transaction Details
    transactionId: '',
    upiId: '',
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showCountryPopup, setShowCountryPopup] = useState(false)
  const [showPaymentPopup, setShowPaymentPopup] = useState(false)

  const planData = {
    semester: {
      name: 'Semester Plan',
      price: 199,
      duration: '6 months',
      upiId: 'kalyan9391@ybl'
    },
    annual: {
      name: 'Annual Plan',
      price: 299,
      duration: '1 year',
      upiId: 'kalyan9391@ybl'
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Auto-select semester based on year
    if (name === 'currentYear') {
      const year = parseInt(value)
      let semester = ''
      if (year === 1) {
        semester = '2' // 1st year shows 1st and 2nd semester, default to 2
      } else if (year === 2) {
        semester = '4' // 2nd year shows 3rd and 4th semester, default to 4
      } else if (year === 3) {
        semester = '6' // 3rd year shows 5th and 6th semester, default to 6
      } else if (year === 4) {
        semester = '8' // 4th year shows 7th and 8th semester, default to 8
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        currentSemester: semester
      }))
    }
  }

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.fullName || !formData.phoneNumber || !formData.email || !formData.password) {
          setError('All fields are required')
          return false
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          setError('Please enter a valid email address')
          return false
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters')
          return false
        }
        break
      case 2:
        if (!formData.studentId || !formData.college || !formData.currentYear || !formData.currentSemester) {
          setError('All academic information is required')
          return false
        }
        break
      case 3:
        if (!formData.paymentMethod) {
          setError('Please select a payment method')
          return false
        }
        break
      case 4:
        if (!formData.transactionId) {
          setError('Please enter the transaction ID')
          return false
        }
        break
    }
    setError('')
    return true
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    setError('')
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) return

    setLoading(true)
    setError('')

    try {
      // Combine all form data
      const nameParts = formData.fullName.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || firstName // Use firstName as lastName if only one name provided

      const registrationData = {
        firstName: firstName,
        lastName: lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.countryCode + formData.phoneNumber, // Combine country code with phone number
        studentId: formData.studentId,
        college: formData.college,
        year: formData.currentYear,
        semester: formData.currentSemester,
        subscriptionType: selectedPlan === 'semester' ? 'basic' : 'premium',
        planPrice: planData[selectedPlan].price,
        planDuration: selectedPlan === 'semester' ? 'monthly' : 'yearly',
        upiId: formData.upiId || planData[selectedPlan].upiId,
        transactionId: formData.transactionId,
        paymentMethod: formData.paymentMethod,
        paymentStatus: 'completed', // Change to completed for now
        lmsAccess: true // Grant immediate access
      }

      console.log('Sending registration data:', registrationData)

      const response = await fetch('http://localhost:3001/api/premium/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('Registration successful! Redirecting to LMS portal...')
        setTimeout(() => {
          // Direct navigation to LMS portal for immediate access
          const userData = {
            id: data.data?.userId,
            firstName: registrationData.firstName,
            lastName: registrationData.lastName,
            email: registrationData.email,
            lmsAccess: true,
            subscriptionType: registrationData.subscriptionType,
            planPrice: registrationData.planPrice
          }
          
          // Store user data for LMS access
          localStorage.setItem('helixa_premium_user', JSON.stringify(userData))
          
          navigate('/lms-portal', {
            state: {
              user: userData,
              message: 'Welcome to LTSU Premium LMS! Your account has been activated.'
            }
          })
        }, 1500)
      } else {
        setError(data.error || 'Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const openPaymentPopup = () => {
    setShowPaymentPopup(true)
  }

  const renderPaymentPopup = () => {
    if (!showPaymentPopup) return null
    
    const plan = planData[selectedPlan]
    const upiUrl = formData.paymentMethod === 'phonepe' 
      ? `upi://pay?pa=${plan.upiId}&pn=LTSU&am=${plan.price}&cu=INR&tn=LTSU%20Premium%20Payment`
      : `https://pay.google.com/gp/p/pid?pa=${plan.upiId}&pn=LTSU&am=${plan.price}&cu=INR&tn=LTSU%20Premium%20Payment`

    const handleOpenApp = () => {
      window.open(upiUrl, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes')
    }

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gray-800 border border-gray-600 rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              {formData.paymentMethod === 'phonepe' ? (
                <span className="text-white font-bold text-xl">P</span>
              ) : (
                <span className="text-white font-bold text-xl">G</span>
              )}
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Open {formData.paymentMethod === 'phonepe' ? 'PhonePe' : 'GPay'}
            </h3>
            <p className="text-gray-400">Pay ₹{plan.price} to {plan.upiId}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleOpenApp}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Open {formData.paymentMethod === 'phonepe' ? 'PhonePe' : 'GPay'} App
            </button>
            
            <button
              onClick={() => setShowPaymentPopup(false)}
              className="w-full bg-gray-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-700 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep >= step 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-600 text-gray-300'
          }`}>
            {currentStep > step ? '✓' : step}
          </div>
          {step < 4 && (
            <div className={`w-12 h-1 mx-2 ${
              currentStep > step ? 'bg-blue-600' : 'bg-gray-600'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Complete Your Information</h2>
        <p className="text-gray-400">Step 1 of 3 - Basic Details</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
        <div className="flex">
          <button
            type="button"
            onClick={() => setShowCountryPopup(!showCountryPopup)}
            className="px-3 py-3 bg-gray-700/50 border border-gray-600 rounded-l-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-w-[120px] text-left"
          >
            {countryCodes.find(c => c.code === formData.countryCode)?.flag} {formData.countryCode}
          </button>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '') // Only allow digits
              const maxLength = formData.countryCode === '+91' ? 10 : 15
              if (value.length <= maxLength) {
                setFormData(prev => ({ ...prev, phoneNumber: value }))
              }
            }}
            placeholder={formData.countryCode === '+91' ? "Enter 10-digit number" : "Enter phone number"}
            className="flex-1 px-4 py-3 bg-gray-700/50 border-l-0 border border-gray-600 rounded-r-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            required
          />
        </div>

        {/* Country Selection Popup */}
        {showCountryPopup && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl p-3 w-64 max-h-80 overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-bold text-white">Select Country</h3>
              <button
                onClick={() => setShowCountryPopup(false)}
                className="text-white/70 hover:text-white text-lg"
              >
                ×
              </button>
            </div>
            <div className="space-y-1">
              {/* All countries in one scrollable list */}
              <div className="max-h-64 overflow-y-auto space-y-1">
                {countryCodes.map((country) => (
                  <div
                    key={country.code}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, countryCode: country.code, phoneNumber: '' }))
                      setShowCountryPopup(false)
                    }}
                    className="flex items-center p-2 hover:bg-gray-700 rounded-lg cursor-pointer transition-all duration-200"
                  >
                    <span className="text-lg mr-2">{country.flag}</span>
                    <span className="text-white text-sm font-medium">{country.name} {country.code}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email address"
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Password *</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your account password"
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Academic Information</h2>
        <p className="text-gray-400">Step 2 of 3 - Student Details</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Student ID *</label>
        <input
          type="text"
          name="studentId"
          value={formData.studentId}
          onChange={handleInputChange}
          placeholder="Enter your student ID"
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">College/University *</label>
        <input
          type="text"
          name="college"
          value={formData.college}
          onChange={handleInputChange}
          placeholder="Enter your college/university name"
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Current Year *</label>
        <select
          name="currentYear"
          value={formData.currentYear}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Current Semester *</label>
        <select
          name="currentSemester"
          value={formData.currentSemester}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Semester</option>
          <option value="1">1st Semester</option>
          <option value="2">2nd Semester</option>
          <option value="3">3rd Semester</option>
          <option value="4">4th Semester</option>
          <option value="5">5th Semester</option>
          <option value="6">6th Semester</option>
          <option value="7">7th Semester</option>
          <option value="8">8th Semester</option>
        </select>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Select Payment Method</h2>
        <p className="text-gray-400">Step 3 of 3 - Choose UPI App</p>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-medium">Selected Plan</h3>
          <button
            onClick={() => navigate('/premium-benefits')}
            className="text-blue-400 text-sm hover:text-blue-300"
          >
            Change Plan
          </button>
        </div>
        <div className="text-gray-300">
          <p className="font-medium">{planData[selectedPlan].name}</p>
          <p className="text-lg font-bold text-white">₹{planData[selectedPlan].price} / {planData[selectedPlan].duration}</p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-gray-400">💡 You will be directed to your selected UPI app to complete the payment</p>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'phonepe' }))}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              formData.paymentMethod === 'phonepe'
                ? 'border-blue-500 bg-blue-500/20'
                : 'border-gray-600 hover:border-gray-500'
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-white font-medium">PhonePe</span>
            </div>
          </button>

          <button
            onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'gpay' }))}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              formData.paymentMethod === 'gpay'
                ? 'border-blue-500 bg-blue-500/20'
                : 'border-gray-600 hover:border-gray-500'
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-white font-medium">GPay</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => {
    const plan = planData[selectedPlan]

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">Complete Payment</h2>
          <p className="text-gray-400">Step 3 of 3 - Enter Transaction Details</p>
        </div>

        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-4">
          <h3 className="text-white font-medium mb-3">Payment Instructions</h3>
          <ol className="text-sm text-gray-300 space-y-2">
            <li>1. Click the payment button below to open {formData.paymentMethod === 'phonepe' ? 'PhonePe' : 'GPay'}</li>
            <li>2. Send ₹{plan.price} to UPI ID: <strong className="text-white">{plan.upiId}</strong></li>
            <li>3. Copy the transaction ID from the payment confirmation</li>
            <li>4. Enter the transaction ID below for verification</li>
          </ol>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            {formData.paymentMethod === 'phonepe' ? (
              <span className="text-white font-bold text-xl">P</span>
            ) : (
              <span className="text-white font-bold text-xl">G</span>
            )}
          </div>
          
          <h3 className="text-white font-semibold text-lg mb-2">Pay ₹{plan.price} via {formData.paymentMethod === 'phonepe' ? 'PhonePe' : 'GPay'}</h3>
          <p className="text-gray-400 text-sm mb-4">{plan.upiId}</p>
          
          <button
            onClick={openPaymentPopup}
            className="inline-block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Open {formData.paymentMethod === 'phonepe' ? 'PhonePe' : 'GPay'} to Pay ₹{plan.price}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Transaction ID *</label>
          <input
            type="text"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleInputChange}
            placeholder="Enter transaction ID (e.g., TXN123456789)"
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-xs text-gray-400 mt-1">Check your {formData.paymentMethod === 'phonepe' ? 'PhonePe' : 'GPay'} transaction history for the ID</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/premium-benefits" className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200 mb-6">
            ← Back to Premium
          </Link>
          
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-blue-500 shadow-lg">
              <img
                src="/assets/images/ltsu-custom-logo.png"
                alt="LTSU Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Secure Payment</h1>
          <p className="text-gray-400">Complete your premium upgrade</p>
        </div>

        {/* Progress Steps */}
        {renderStepIndicator()}

        {/* Form Card */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
              <p className="text-green-300 text-sm">{success}</p>
            </div>
          )}

          <div className="min-h-[400px]">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                Back
              </button>
            )}
            
            <div className="flex-1"></div>
            
            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
              >
                Continue to Payment
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || !formData.transactionId}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Verify & Submit'}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Payment Popup */}
      {renderPaymentPopup()}
    </div>
  )
}

export default PaymentFlow