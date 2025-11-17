// User Model
// Defines the structure and validation for user data

class User {
  constructor(data = {}) {
    this.uid = data.uid || ''
    this.firstName = data.firstName || ''
    this.lastName = data.lastName || ''
    this.fullName = data.fullName || ''
    this.phoneNumber = data.phoneNumber || ''
    this.email = data.email || ''
    this.studentId = data.studentId || ''
    this.gender = data.gender || ''
    this.department = data.department || ''
    this.specialization = data.specialization || ''
    this.currentYear = data.currentYear || null
    this.currentSemester = data.currentSemester || null
    this.enrollmentYear = data.enrollmentYear || null
    this.status = data.status || 'active'
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()

    // Address information
    this.address = data.address || {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: ''
    }

    // Academic records
    this.academicRecords = data.academicRecords || {
      gpa: null,
      totalCredits: 0,
      completedSubjects: []
    }
  }

  // Validation methods
  validate() {
    const errors = []

    if (!this.firstName.trim()) errors.push('First name is required')
    if (!this.lastName.trim()) errors.push('Last name is required')
    if (!this.email.trim()) errors.push('Email is required')
    if (!this.studentId.trim()) errors.push('Student ID is required')
    if (!this.phoneNumber.trim()) errors.push('Phone number is required')
    if (!this.department) errors.push('Department is required')
    if (!this.specialization) errors.push('Specialization is required')

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

    // Student ID validation
    if (this.studentId && this.studentId.length < 5) {
      errors.push('Student ID must be at least 5 characters')
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

  // Get display name (first name only for UI)
  getDisplayName() {
    return this.firstName || this.fullName || 'Unknown User'
  }

  // Check if user is active
  isActive() {
    return this.status === 'active'
  }

  // Get user role (based on email or other criteria)
  getRole() {
    if (this.email && this.email.includes('admin')) {
      return 'admin'
    }
    return 'student'
  }

  // Get academic progress summary
  getAcademicSummary() {
    return {
      currentYear: this.currentYear,
      currentSemester: this.currentSemester,
      specialization: this.specialization,
      gpa: this.academicRecords.gpa,
      totalCredits: this.academicRecords.totalCredits,
      completedSubjects: this.academicRecords.completedSubjects.length
    }
  }

  // Update academic records
  updateAcademicRecords(records) {
    this.academicRecords = {
      ...this.academicRecords,
      ...records
    }
    this.updatedAt = new Date()
  }

  // Update address
  updateAddress(address) {
    this.address = {
      ...this.address,
      ...address
    }
    this.updatedAt = new Date()
  }

  // Change status
  changeStatus(newStatus) {
    const validStatuses = ['active', 'inactive', 'suspended']
    if (validStatuses.includes(newStatus)) {
      this.status = newStatus
      this.updatedAt = new Date()
      return true
    }
    return false
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
      studentId: this.studentId,
      gender: this.gender,
      department: this.department,
      specialization: this.specialization,
      currentYear: this.currentYear,
      currentSemester: this.currentSemester,
      enrollmentYear: this.enrollmentYear,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      address: this.address,
      academicRecords: this.academicRecords
    }
  }

  // From JSON for database retrieval
  static fromJSON(data) {
    return new User(data)
  }

  // Create user from Firebase Auth user
  static fromFirebaseUser(firebaseUser, additionalData = {}) {
    return new User({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      fullName: firebaseUser.displayName || '',
      ...additionalData
    })
  }

  // Get searchable fields for admin search
  getSearchableFields() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.fullName,
      email: this.email,
      studentId: this.studentId,
      phoneNumber: this.phoneNumber
    }
  }

  // Get filterable fields for admin filtering
  getFilterableFields() {
    return {
      currentYear: this.currentYear,
      currentSemester: this.currentSemester,
      specialization: this.specialization,
      department: this.department,
      status: this.status,
      gender: this.gender
    }
  }

  // Calculate age (if date of birth is available)
  getAge() {
    // Assuming dateOfBirth might be added later
    if (this.dateOfBirth) {
      const today = new Date()
      const birthDate = new Date(this.dateOfBirth)
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }

      return age
    }
    return null
  }

  // Get enrollment duration in years
  getEnrollmentDuration() {
    if (this.enrollmentYear) {
      const currentYear = new Date().getFullYear()
      return currentYear - this.enrollmentYear
    }
    return 0
  }

  // Check if user is eligible for graduation (simplified logic)
  isEligibleForGraduation() {
    // Simplified logic - in real system, this would be more complex
    return this.currentYear === 4 &&
           this.academicRecords.totalCredits >= 160 &&
           this.academicRecords.gpa >= 5.0
  }

  // Get user statistics for analytics
  static getUserStatistics(users) {
    const stats = {
      total: users.length,
      active: users.filter(u => u.isActive()).length,
      inactive: users.filter(u => !u.isActive()).length,
      byYear: {},
      bySpecialization: {},
      byDepartment: {},
      byGender: {},
      averageGPA: 0,
      averageCredits: 0
    }

    let totalGPA = 0
    let totalCredits = 0
    let gpaCount = 0
    let creditsCount = 0

    users.forEach(user => {
      // Group by year
      const year = user.currentYear || 'Not Set'
      stats.byYear[year] = (stats.byYear[year] || 0) + 1

      // Group by specialization
      const spec = user.specialization || 'Not Set'
      stats.bySpecialization[spec] = (stats.bySpecialization[spec] || 0) + 1

      // Group by department
      const dept = user.department || 'Not Set'
      stats.byDepartment[dept] = (stats.byDepartment[dept] || 0) + 1

      // Group by gender
      const gender = user.gender || 'Not Set'
      stats.byGender[gender] = (stats.byGender[gender] || 0) + 1

      // Calculate averages
      if (user.academicRecords.gpa) {
        totalGPA += user.academicRecords.gpa
        gpaCount++
      }

      if (user.academicRecords.totalCredits) {
        totalCredits += user.academicRecords.totalCredits
        creditsCount++
      }
    })

    stats.averageGPA = gpaCount > 0 ? (totalGPA / gpaCount).toFixed(2) : 0
    stats.averageCredits = creditsCount > 0 ? (totalCredits / creditsCount).toFixed(0) : 0

    return stats
  }
}

export default User