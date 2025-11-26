import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PremiumUserAuth.css'

const PremiumUserRegister = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    studentId: '',
    college: '',
    year: '',
    semester: '',
    subscriptionType: 'basic',
    planPrice: 199,
    planDuration: '6months',
    upiId: '',
    transactionId: '',
    paymentMethod: 'upi'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 199,
      duration: '6months',
      features: [
        'Access to basic courses',
        'Progress tracking',
        'Email support',
        'Mobile app access'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 299,
      duration: '1year',
      features: [
        'Access to all courses',
        'Live classes',
        'Certificate of completion',
        'Priority support',
        'Offline downloads',
        'Advanced analytics'
      ]
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Update plan details when plan selection changes
    if (name === 'subscriptionType') {
      const selectedPlan = plans.find(plan => plan.id === value)
      if (selectedPlan) {
        setFormData(prev => ({
          ...prev,
          [name]: value,
          planPrice: selectedPlan.price,
          planDuration: selectedPlan.duration
        }))
      }
    }
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) return 'First name is required'
    if (!formData.lastName.trim()) return 'Last name is required'
    if (!formData.email.trim()) return 'Email is required'
    if (!formData.password.trim()) return 'Password is required'
    if (!formData.phoneNumber.trim()) return 'Phone number is required'
    if (!formData.college.trim()) return 'College name is required'
    if (!formData.upiId.trim()) return 'UPI ID is required for premium subscription'
    if (!formData.transactionId.trim()) return 'Transaction ID is required'
    
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match'
    }
    
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters'
    }

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
      const response = await fetch('http://localhost:3001/api/premium/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('Registration successful! Please check your email for verification.')
        setTimeout(() => {
          navigate('/premium-login', { 
            state: { 
              email: formData.email,
              message: 'Registration successful! Please login to access your premium account.' 
            }
          })
        }, 2000)
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

  return (
    <div className="premium-auth-container">
      <div className="premium-auth-card">
        <div className="auth-header">
          <div className="logo-section">
            <img src="/assets/images/ltsu-custom-logo.png" alt="LTSU" className="auth-logo" />
            <div className="auth-title">
              <h1>LTSU Premium</h1>
              <p>Learning Management System Registration</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {/* Personal Information */}
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number *</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="form-section">
            <h3>Academic Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="studentId">Student ID *</label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="college">College/University *</label>
                <input
                  type="text"
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="year">Current Year</label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="semester">Current Semester</label>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
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
          </div>

          {/* Plan Selection */}
          <div className="form-section">
            <h3>Choose Your Plan</h3>
            <div className="plans-grid">
              {plans.map(plan => (
                <div
                  key={plan.id}
                  className={`plan-card ${formData.subscriptionType === plan.id ? 'selected' : ''}`}
                  onClick={() => handleInputChange({ target: { name: 'subscriptionType', value: plan.id } })}
                >
                  <div className="plan-header">
                    <h4>{plan.name}</h4>
                    <div className="plan-price">
                      <span className="currency">₹</span>
                      <span className="amount">{plan.price}</span>
                      <span className="period">
                        {plan.duration === '1year' ? '/year' : '/6 months'}
                      </span>
                    </div>
                  </div>
                  <ul className="plan-features">
                    {plan.features.map((feature, index) => (
                      <li key={index}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Information */}
          <div className="form-section">
            <h3>Payment Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="upiId">UPI ID *</label>
                <input
                  type="text"
                  id="upiId"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleInputChange}
                  placeholder="example@upi"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="transactionId">Transaction ID *</label>
                <input
                  type="text"
                  id="transactionId"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  placeholder="Enter transaction ID from payment"
                  required
                />
              </div>
            </div>

            <div className="payment-info">
              <div className="payment-details">
                <h4>Payment Details</h4>
                <p><strong>Amount:</strong> ₹{formData.planPrice}</p>
                <p><strong>UPI ID:</strong> ltsu@paytm</p>
                <p><strong>Note:</strong> Use your registered UPI ID for payment</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register for Premium Access'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <a href="/premium-login">Login here</a></p>
          <p>Back to <a href="/">LTSU Student Portal</a></p>
        </div>
      </div>
    </div>
  )
}

export default PremiumUserRegister