import React, { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function PremiumUpgrade({ user, onClose }) {
  const [selectedPlan, setSelectedPlan] = useState('monthly')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })
  const [upiId, setUpiId] = useState('')

  const plans = {
    monthly: {
      name: 'Monthly Plan',
      price: 499,
      originalPrice: 499,
      period: 'month',
      features: [
        'Placement Preparation Kit',
        'Internships and Job Openings',
        'ATS Resume Building',
        'Project Ideas (Industry Level)',
        'Alumni Support',
        'Mock Interviews',
        'Certification Courses',
        'Freelancing Work (Earn While Learning)',
        'Emerging Tech Trends',
        'Basic Courses for Students',
        'Top Performers Winner'
      ]
    },
    annual: {
      name: 'Annual Plan',
      price: 4999,
      originalPrice: 5988,
      period: 'year',
      savings: 'Save 30%',
      features: [
        'Everything in Monthly Plan',
        'Advanced AI Tutoring Sessions',
        'Premium Course Library (React, Node.js, ML, Cloud)',
        'Unlimited 1-on-1 Mentorship',
        'Unlimited Resume Reviews',
        'Job Placement Assistance',
        'Advanced Analytics Dashboard',
        'VIP Community Access',
        'Priority Support 24/7',
        'Exclusive Webinars & Workshops'
      ]
    }
  }

  const handleUpgrade = async () => {
    console.log('Starting premium upgrade process...')
    console.log('User object:', user)

    // Check if user is authenticated
    if (!user) {
      alert('❌ You must be logged in to upgrade to premium.')
      console.error('User is not authenticated')
      return
    }

    if (!user.uid) {
      alert('❌ User authentication error. Please log out and log back in.')
      console.error('User object missing uid:', user)
      return
    }

    console.log('User authenticated with UID:', user.uid)

    // Validate payment details
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
        alert('❌ Please fill in all card details.')
        return
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId) {
        alert('❌ Please enter your UPI ID.')
        return
      }
    }

    setIsProcessing(true)
    try {
      console.log('Processing payment...')

      // Simulate payment processing with more realistic timing
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Simulate payment success (in real app, this would be actual payment processing)
      const paymentSuccess = Math.random() > 0.1 // 90% success rate for demo

      if (!paymentSuccess) {
        throw new Error('Payment failed')
      }

      console.log('Payment successful, updating Firestore...')

      // Update user premium status in Firebase
      const userRef = doc(db, 'users', user.uid)
      const updateData = {
        isPremium: true,
        premiumPlan: selectedPlan,
        premiumStartDate: new Date(),
        premiumExpiryDate: selectedPlan === 'monthly'
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        paymentMethod: paymentMethod,
        paymentDate: new Date(),
        updatedAt: new Date().toISOString()
      }

      console.log('Update data:', updateData)
      console.log('User reference:', userRef)

      await updateDoc(userRef, updateData)

      console.log('Firestore update successful!')

      // Show success message with details
      const planName = selectedPlan === 'monthly' ? 'Monthly Plan' : 'Annual Plan'
      const amount = selectedPlan === 'monthly' ? '₹499' : '₹4,999'

      alert(`🎉 Payment Successful!\n\nWelcome to LTSU Premium!\n\nPlan: ${planName}\nAmount: ${amount}\nPayment Method: ${paymentMethod.toUpperCase()}\n\nYour premium features are now unlocked. Enjoy your enhanced learning experience!`)

      onClose()
      window.location.reload() // Refresh to show premium features
    } catch (error) {
      console.error('Error upgrading to premium:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)

      // Provide more specific error messages
      if (error.code === 'permission-denied') {
        alert('❌ Permission denied. Please make sure you are logged in and try again.')
      } else if (error.code === 'unavailable') {
        alert('❌ Network error. Please check your internet connection and try again.')
      } else if (error.code === 'not-found') {
        alert('❌ User profile not found. Please contact support.')
      } else if (error.code === 'auth/network-request-failed') {
        alert('❌ Network connection failed. Please check your internet connection and try again.')
      } else if (error.code === 'auth/user-not-found') {
        alert('❌ User account not found. Please log out and log back in.')
      } else {
        alert(`❌ Payment failed: ${error.message}\n\nPlease check your payment details and try again, or contact support at info.studentportalofficial@gmail.com`)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl max-w-4xl w-full mx-4 border border-white/30">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">⭐</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Upgrade to Helixa IQ Portal</h2>
          <p className="text-gray-600 text-lg">Unlock your full potential with advanced learning tools</p>
        </div>

        {/* Plan Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                selectedPlan === key
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPlan(key)}
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                {plan.savings && (
                  <span className="inline-block bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold mt-2">
                    {plan.savings}
                  </span>
                )}
              </div>

              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-gray-800">₹{plan.price.toLocaleString()}</span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>
                {plan.originalPrice !== plan.price && (
                  <div className="text-sm text-gray-500 line-through">
                    ₹{plan.originalPrice.toLocaleString()}
                  </div>
                )}
              </div>

              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">💳 Choose Payment Method</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                paymentMethod === 'card'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">💳</span>
              <span className="text-sm font-medium">Credit/Debit Card</span>
            </button>
            <button
              onClick={() => setPaymentMethod('upi')}
              className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                paymentMethod === 'upi'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">📱</span>
              <span className="text-sm font-medium">UPI</span>
            </button>
            <button
              onClick={() => setPaymentMethod('netbanking')}
              className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                paymentMethod === 'netbanking'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">🏦</span>
              <span className="text-sm font-medium">Net Banking</span>
            </button>
          </div>

          {/* Payment Form */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 Popular UPI apps: Google Pay, PhonePe, Paytm, Amazon Pay
                </p>
              </div>
            </div>
          )}

          {paymentMethod === 'netbanking' && (
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  🏦 You will be redirected to your bank's secure login page to complete the payment.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select Bank</option>
                  <option>SBI</option>
                  <option>HDFC</option>
                  <option>ICICI</option>
                  <option>Axis Bank</option>
                  <option>Other Banks</option>
                </select>
                <div className="flex items-center text-sm text-gray-600">
                  🔒 256-bit SSL encryption
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Maybe Later
          </button>
          <button
            onClick={handleUpgrade}
            disabled={isProcessing}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                🚀 Upgrade Now
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          🔒 Secure payment • 30-day money-back guarantee • Cancel anytime
        </div>
      </div>
    </div>
  )
}