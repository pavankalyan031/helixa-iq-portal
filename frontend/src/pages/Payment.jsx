import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

const Payment = ({ user }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const planType = searchParams.get('plan') || 'semester'
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    transactionId: '',
    countryCode: '+91'
  })
  
  const [selectedUPI, setSelectedUPI] = useState(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1) // 1: Form, 2: Payment, 3: Verification, 4: Success
  const [errors, setErrors] = useState({})
  const [userData, setUserData] = useState(null)

  const planDetails = {
    semester: {
      name: 'Semester Plan',
      price: 199,
      period: '6 months',
      features: [
        'All premium features',
        '6 months access',
        'Student-friendly pricing',
        'Email support'
      ]
    },
    annual: {
      name: 'Annual Plan',
      price: 299,
      period: '1 year',
      features: [
        'All Semester features',
        'Complete year access',
        'Best value for students',
        'Priority support'
      ]
    }
  }

  const upiApps = [
    { name: 'PhonePe', icon: '/assets/images/phonepe-logo-clean.png', color: 'from-purple-500 to-indigo-600', package: 'com.phonepe.app' },
    { name: 'GPay', icon: '/assets/images/gpay-logo.png', color: 'from-green-500 to-teal-600', package: 'com.google.android.apps.nfc.payments' }
  ]

  const currentPlan = planDetails[planType]

  // Get user data for validation
  useEffect(() => {
    if (user && user.email) {
      setFormData(prev => ({ ...prev, email: user.email }))
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    // Phone number validation
    if (name === 'phone') {
      // Only allow digits and limit to 10
      const digits = value.replace(/\D/g, '').slice(0, 10)
      setFormData({ ...formData, [name]: digits })
      return
    }

    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (formData.phone.length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits'
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    // Check if email matches user's current email
    if (user && formData.email !== user.email) {
      newErrors.email = 'Email must match your account email'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    setStep(2)
  }

  const handleUPISelect = (app) => {
    setSelectedUPI(app)
    setStep(3)
  }

  const openUPIApp = (amount) => {
    const upiString = `upi://pay?pa=kalyan9391@ybl&pn=LTSU Premium&am=${amount}&cu=INR&tn=LTSU Premium Subscription`
    
    // Try to open the UPI app
    window.location.href = upiString
    
    // Also create a popup for manual copy if deep linking fails
    const popup = window.open('', 'upipayment', 'width=400,height=300')
    popup.document.write(`
      <html>
        <head><title>UPI Payment</title></head>
        <body style="font-family: Arial; padding: 20px; background: #1a1a1a; color: white;">
          <h2>UPI Payment Instructions</h2>
          <p><strong>UPI ID:</strong> kalyan9391@ybl</p>
          <p><strong>Amount:</strong> ₹${amount}</p>
          <p><strong>App:</strong> ${selectedUPI?.name}</p>
          <button onclick="window.close()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
        </body>
      </html>
    `)
  }

  const verifyTransaction = async () => {
    if (!formData.transactionId) {
      alert('Please enter the transaction ID')
      return
    }

    setIsVerifying(true)
    
    try {
      // Simulate real transaction verification
      // In a real implementation, you would call a backend API
      // to verify the transaction against UPI logs
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // For demo, we'll simulate verification
      // In real app, this would check against actual payment gateway
      const isValid = formData.transactionId.toUpperCase().includes('TXN') || 
                     formData.transactionId.length >= 8
      
      if (!isValid) {
        throw new Error('Transaction not found')
      }

      // Update user premium status
      const userRef = doc(db, 'users', user.uid)
      await updateDoc(userRef, {
        isPremium: true,
        premiumPlan: planType,
        premiumStartDate: new Date(),
        premiumExpiryDate: planType === 'semester' 
          ? new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000) // 6 months
          : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        paymentMethod: 'UPI',
        upiApp: selectedUPI?.name,
        transactionId: formData.transactionId,
        paymentDate: new Date(),
        lmsAccess: true
      })

      setIsVerifying(false)
      setIsSubmitting(true)
      
      // Show success and redirect to LMS portal
      setTimeout(() => {
        // Store payment success in localStorage
        localStorage.setItem('ltsu_payment_success', JSON.stringify({
          plan: currentPlan.name,
          amount: currentPlan.price,
          transactionId: formData.transactionId,
          timestamp: new Date().toISOString(),
          userName: formData.name // Store user name from form
        }))
        
        // Redirect to LMS portal
        navigate('/lms-portal')
      }, 2000)
      
    } catch (error) {
      console.error('Payment verification failed:', error)
      setIsVerifying(false)
      alert('Payment verification failed. Please check your transaction ID and try again.')
    }
  }

  const changePlan = () => {
    const newPlan = planType === 'semester' ? 'annual' : 'semester'
    navigate(`/payment?plan=${newPlan}`)
    setStep(1) // Reset to form step
  }

  const renderStep1 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-2xl rounded-3xl p-8 border border-gray-600">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Complete Your Information</h2>
          <p className="text-gray-300">Step 1 of 3 - Basic Details</p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
            <div className="flex">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
                className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-l-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="+91">+91 (India)</option>
              </select>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="flex-1 px-4 py-3 bg-gray-700/50 border border-l-0 border-gray-600 rounded-r-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
                required
              />
            </div>
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
              required
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            <p className="text-gray-400 text-xs mt-1">Must match your account email address</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your account password"
              required
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            <p className="text-gray-400 text-xs mt-1">Must match your account password</p>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-2xl rounded-3xl p-8 border border-gray-600">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Select Payment Method</h2>
          <p className="text-gray-300">Step 2 of 3 - Choose UPI App</p>
        </div>

        <div className="bg-gray-700/50 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-2">Selected Plan</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300">{currentPlan.name}</p>
              <p className="text-2xl font-bold text-yellow-400">₹{currentPlan.price} <span className="text-sm text-gray-400">/ {currentPlan.period}</span></p>
            </div>
            <button
              onClick={changePlan}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium px-4 py-2 border border-blue-400 rounded-lg hover:bg-blue-400/20 transition-colors"
            >
              Change Plan
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {upiApps.map((app) => (
            <button
              key={app.name}
              onClick={() => handleUPISelect(app)}
              className={`p-8 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                selectedUPI?.name === app.name
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
              }`}
            >
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${app.color} flex items-center justify-center shadow-lg p-2 overflow-hidden`}>
                <img
                  src={app.icon}
                  alt={`${app.name} logo`}
                  className="w-14 h-14 object-contain filter drop-shadow-sm"
                  style={{ imageRendering: 'crisp-edges', objectFit: 'contain' }}
                />
              </div>
              <h3 className="text-white font-semibold text-center text-lg">{app.name}</h3>
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
          <p className="text-blue-200 text-sm text-center">
            💡 You will be directed to your selected UPI app to complete the payment
          </p>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-2xl rounded-3xl p-8 border border-gray-600">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Complete Payment</h2>
          <p className="text-gray-300">Step 3 of 3 - Enter Transaction Details</p>
        </div>

        <div className="bg-gray-700/50 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Payment Instructions</h3>
          <div className="space-y-3 text-gray-300">
            <p>1. Click the payment button below to open {selectedUPI?.name}</p>
            <p>2. Send ₹{currentPlan.price} to UPI ID: <span className="text-yellow-400 font-mono">kalyan9391@ybl</span></p>
            <p>3. Copy the transaction ID from the payment confirmation</p>
            <p>4. Enter the transaction ID below for verification</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${selectedUPI?.color} flex items-center justify-center shadow-lg p-3 overflow-hidden`}>
              <img
                src={selectedUPI?.icon}
                alt={`${selectedUPI?.name} logo`}
                className="w-18 h-18 object-contain filter drop-shadow-sm"
                style={{ imageRendering: 'crisp-edges', objectFit: 'contain' }}
              />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white text-center mb-2">Pay ₹{currentPlan.price}</h3>
          <p className="text-center text-gray-300 mb-2">via {selectedUPI?.name}</p>
          <p className="text-center text-yellow-400 font-mono text-lg">kalyan9391@ybl</p>
          
          <button
            onClick={() => openUPIApp(currentPlan.price)}
            className={`w-full mt-6 px-6 py-4 bg-gradient-to-r ${selectedUPI?.color} text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
          >
            Open {selectedUPI?.name} to Pay ₹{currentPlan.price}
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Transaction ID *</label>
            <input
              type="text"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter transaction ID (e.g., TXN123456789)"
              required
            />
            <p className="text-xs text-gray-400 mt-1">Check your {selectedUPI?.name} transaction history for the ID</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(2)}
              className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Back
            </button>
            <button
              onClick={verifyTransaction}
              disabled={isVerifying || isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? 'Verifying...' : isSubmitting ? 'Processing...' : 'Verify & Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-2xl rounded-3xl p-8 border border-gray-600 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-bold text-white mb-4">Payment Successful!</h2>
        <p className="text-gray-300 mb-6">
          Welcome to LTSU Premium! Redirecting to your LMS portal...
        </p>
        
        <div className="bg-gray-700/50 rounded-2xl p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Payment Summary</h3>
          <div className="text-left space-y-2 text-gray-300">
            <p>Plan: {currentPlan.name}</p>
            <p>Amount: ₹{currentPlan.price}</p>
            <p>UPI App: {selectedUPI?.name}</p>
            <p>Transaction ID: {formData.transactionId}</p>
          </div>
        </div>

        <div className="animate-pulse text-yellow-400">
          Redirecting to your LMS portal...
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto p-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/premium-benefits')}
            className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Premium
          </button>
          
          <h1 className="text-4xl font-bold text-white mb-2">Secure Payment</h1>
          <p className="text-gray-300">Complete your premium upgrade</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((stepNum) => (
            <React.Fragment key={stepNum}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
              }`}>
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step > stepNum ? 'bg-blue-600' : 'bg-gray-600'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Content */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>
    </div>
  )
}

export default Payment