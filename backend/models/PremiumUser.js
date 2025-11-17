// Premium User Model
// Extended User model for LMS Portal premium users

class PremiumUser {
  constructor(data = {}) {
    this.uid = data.uid || ''
    this.firstName = data.firstName || ''
    this.lastName = data.lastName || ''
    this.fullName = data.fullName || ''
    this.phoneNumber = data.phoneNumber || ''
    this.email = data.email || ''
    this.password = data.password || '' // In production, this should be hashed
    this.studentId = data.studentId || ''
    this.college = data.college || ''
    this.year = data.year || ''
    this.semester = data.semester || ''
    this.avatar = data.avatar || '/assets/images/default-avatar.png'
    
    // Premium subscription details
    this.subscriptionType = data.subscriptionType || 'none' // 'none', 'basic', 'premium', 'enterprise'
    this.planPrice = data.planPrice || 0 // 199, 299, etc.
    this.planDuration = data.planDuration || 'monthly' // 'monthly', 'yearly'
    this.paymentStatus = data.paymentStatus || 'pending' // 'pending', 'completed', 'failed', 'refunded'
    
    // Payment information
    this.upiId = data.upiId || ''
    this.transactionId = data.transactionId || ''
    this.paymentDate = data.paymentDate || null
    this.paymentMethod = data.paymentMethod || '' // 'upi', 'card', 'netbanking', etc.
    this.paymentProof = data.paymentProof || '' // URL to payment screenshot
    
    // Subscription management
    this.subscriptionStart = data.subscriptionStart || null
    this.subscriptionEnd = data.subscriptionEnd || null
    this.autoRenew = data.autoRenew || false
    this.usesRemaining = data.usesRemaining || null // For limited usage plans
    
    // LMS specific data
    this.lmsAccess = data.lmsAccess || false
    this.allowedCourses = data.allowedCourses || []
    this.progress = data.progress || {}
    this.certificates = data.certificates || []
    
    // Account status
    this.status = data.status || 'active' // 'active', 'inactive', 'suspended', 'banned'
    this.emailVerified = data.emailVerified || false
    this.phoneVerified = data.phoneVerified || false
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
    this.lastLogin = data.lastLogin || null
    this.loginAttempts = data.loginAttempts || 0
    this.lockedUntil = data.lockedUntil || null
  }

  // Validation methods
  validate() {
    const errors = []

    if (!this.firstName.trim()) errors.push('First name is required')
    if (!this.lastName.trim()) errors.push('Last name is required')
    if (!this.email.trim()) errors.push('Email is required')
    if (!this.phoneNumber.trim()) errors.push('Phone number is required')
    if (!this.password.trim()) errors.push('Password is required')
    if (!this.college.trim()) errors.push('College name is required')
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (this.email && !emailRegex.test(this.email)) {
      errors.push('Invalid email format')
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
    if (this.phoneNumber && !phoneRegex.test(this.phoneNumber)) {
      errors.push('Invalid phone number format')
    }

    // Password validation
    if (this.password && this.password.length < 6) {
      errors.push('Password must be at least 6 characters')
    }

    // UPI validation for premium users
    if (this.subscriptionType !== 'none' && !this.upiId.trim()) {
      errors.push('UPI ID is required for premium subscription')
    }

    // Transaction ID validation for premium users
    if (this.subscriptionType !== 'none' && !this.transactionId.trim()) {
      errors.push('Transaction ID is required for premium subscription')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Get full name
  getFullName() {
    return `${this.firstName} ${this.lastName}`.trim()
  }

  // Check if user has active premium subscription
  hasActiveSubscription() {
    if (this.subscriptionType === 'none') return false
    if (this.paymentStatus !== 'completed') return false
    if (!this.subscriptionEnd) return false
    
    const now = new Date()
    const endDate = new Date(this.subscriptionEnd)
    return now <= endDate
  }

  // Check if user can access LMS
  canAccessLMS() {
    return this.hasActiveSubscription() && this.lmsAccess && this.status === 'active'
  }

  // Get subscription status
  getSubscriptionStatus() {
    if (!this.hasActiveSubscription()) {
      return 'expired'
    }

    const now = new Date()
    const endDate = new Date(this.subscriptionEnd)
    const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24))

    if (daysLeft <= 0) return 'expired'
    if (daysLeft <= 7) return 'expiring_soon'
    return 'active'
  }

  // Check if email is verified
  isEmailVerified() {
    return this.emailVerified
  }

  // Check if phone is verified
  isPhoneVerified() {
    return this.phoneVerified
  }

  // Account lockout check
  isLocked() {
    if (!this.lockedUntil) return false
    return new Date() < new Date(this.lockedUntil)
  }

  // Login attempt tracking
  recordLoginAttempt(success = false) {
    if (success) {
      this.loginAttempts = 0
      this.lockedUntil = null
      this.lastLogin = new Date()
    } else {
      this.loginAttempts += 1
      if (this.loginAttempts >= 5) {
        this.lockedUntil = new Date(Date.now() + 30 * 60 * 1000) // Lock for 30 minutes
      }
    }
    this.updatedAt = new Date()
  }

  // Update subscription
  updateSubscription(subscriptionData) {
    this.subscriptionType = subscriptionData.subscriptionType || this.subscriptionType
    this.planPrice = subscriptionData.planPrice || this.planPrice
    this.planDuration = subscriptionData.planDuration || this.planDuration
    this.paymentStatus = subscriptionData.paymentStatus || this.paymentStatus
    this.upiId = subscriptionData.upiId || this.upiId
    this.transactionId = subscriptionData.transactionId || this.transactionId
    this.paymentDate = subscriptionData.paymentDate || this.paymentDate
    this.paymentMethod = subscriptionData.paymentMethod || this.paymentMethod
    this.paymentProof = subscriptionData.paymentProof || this.paymentProof
    
    if (subscriptionData.subscriptionStart) {
      this.subscriptionStart = subscriptionData.subscriptionStart
      // Calculate end date based on duration
      const startDate = new Date(subscriptionData.subscriptionStart)
      if (this.planDuration === 'monthly') {
        this.subscriptionEnd = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate())
      } else if (this.planDuration === 'yearly') {
        this.subscriptionEnd = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate())
      }
    }
    
    this.lmsAccess = this.hasActiveSubscription()
    this.updatedAt = new Date()
  }

  // Update progress
  updateProgress(courseId, progressData) {
    this.progress = this.progress || {}
    this.progress[courseId] = {
      ...this.progress[courseId],
      ...progressData,
      lastUpdated: new Date()
    }
    this.updatedAt = new Date()
  }

  // Add certificate
  addCertificate(certificateData) {
    this.certificates = this.certificates || []
    this.certificates.push({
      id: certificateData.id,
      courseName: certificateData.courseName,
      completedDate: new Date(),
      certificateUrl: certificateData.certificateUrl,
      ...certificateData
    })
    this.updatedAt = new Date()
  }

  // To JSON for database storage
  toJSON() {
    return {
      uid: this.uid,
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.fullName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      password: this.password,
      studentId: this.studentId,
      college: this.college,
      year: this.year,
      semester: this.semester,
      avatar: this.avatar,
      subscriptionType: this.subscriptionType,
      planPrice: this.planPrice,
      planDuration: this.planDuration,
      paymentStatus: this.paymentStatus,
      upiId: this.upiId,
      transactionId: this.transactionId,
      paymentDate: this.paymentDate,
      paymentMethod: this.paymentMethod,
      paymentProof: this.paymentProof,
      subscriptionStart: this.subscriptionStart,
      subscriptionEnd: this.subscriptionEnd,
      autoRenew: this.autoRenew,
      usesRemaining: this.usesRemaining,
      lmsAccess: this.lmsAccess,
      allowedCourses: this.allowedCourses,
      progress: this.progress,
      certificates: this.certificates,
      status: this.status,
      emailVerified: this.emailVerified,
      phoneVerified: this.phoneVerified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      lastLogin: this.lastLogin,
      loginAttempts: this.loginAttempts,
      lockedUntil: this.lockedUntil
    }
  }

  // From JSON for database retrieval
  static fromJSON(data) {
    return new PremiumUser(data)
  }

  // Create from registration form
  static fromRegistrationForm(formData) {
    return new PremiumUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      studentId: formData.studentId,
      college: formData.college,
      year: formData.year,
      semester: formData.semester,
      upiId: formData.upiId,
      transactionId: formData.transactionId,
      paymentMethod: formData.paymentMethod,
      subscriptionType: formData.subscriptionType,
      planPrice: formData.planPrice,
      planDuration: formData.planDuration,
      paymentStatus: formData.paymentStatus || 'completed',
      lmsAccess: formData.lmsAccess || true
    })
  }

  // Get display data (without sensitive information)
  getPublicData() {
    const publicData = this.toJSON()
    delete publicData.password
    delete publicData.transactionId
    delete publicData.upiId
    delete publicData.paymentProof
    return publicData
  }

  // Search methods
  getSearchableFields() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.fullName,
      email: this.email,
      studentId: this.studentId,
      phoneNumber: this.phoneNumber,
      college: this.college
    }
  }

  // Statistics methods
  static getUserStatistics(users) {
    const stats = {
      total: users.length,
      active: users.filter(u => u.status === 'active').length,
      premium: users.filter(u => u.subscriptionType !== 'none').length,
      bySubscription: {},
      byCollege: {},
      recentRegistrations: 0,
      expiringSubscriptions: 0
    }

    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    users.forEach(user => {
      // Group by subscription type
      const subType = user.subscriptionType || 'none'
      stats.bySubscription[subType] = (stats.bySubscription[subType] || 0) + 1

      // Group by college
      const college = user.college || 'Not Set'
      stats.byCollege[college] = (stats.byCollege[college] || 0) + 1

      // Recent registrations
      const createdAt = user.createdAt?.toDate?.() || new Date(user.createdAt)
      if (createdAt > oneWeekAgo) {
        stats.recentRegistrations++
      }

      // Expiring subscriptions
      if (user.subscriptionEnd) {
        const endDate = user.subscriptionEnd?.toDate?.() || new Date(user.subscriptionEnd)
        const daysLeft = Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24))
        if (daysLeft <= 7 && daysLeft > 0) {
          stats.expiringSubscriptions++
        }
      }
    })

    return stats
  }
}

export default PremiumUser