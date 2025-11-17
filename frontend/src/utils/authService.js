// Authentication Service
// Handles Firebase authentication and token management

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import { auth, db } from '../firebase'
import { config } from './config'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'

class AuthService {
  constructor() {
    this.currentUser = null
    this.authStateListeners = []
    
    // Set up auth state listener
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user
      this.notifyListeners(user)
    })
  }

  // Subscribe to auth state changes
  onAuthStateChange(callback) {
    this.authStateListeners.push(callback)
    return () => {
      this.authStateListeners = this.authStateListeners.filter(cb => cb !== callback)
    }
  }

  // Notify all listeners of auth state changes
  notifyListeners(user) {
    this.authStateListeners.forEach(callback => callback(user))
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser || auth.currentUser
  }

  // Get current user ID token
  async getCurrentUserToken() {
    const user = this.getCurrentUser()
    if (user) {
      return await user.getIdToken()
    }
    return null
  }

  // Login with email and password
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Check if email is verified
      if (!user.emailVerified) {
        await signOut(auth) // Sign out if email not verified
        throw new Error('Please verify your email before logging in. Check your email for the verification link.')
      }

      // Update user status to active in Firestore
      await this.updateUserStatus(user.uid, 'active')

      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      throw new Error(error.message || 'Login failed. Please check your credentials.')
    }
  }

  // Register new user
  async register(userData) {
    try {
      const { email, password, fullName, phone, rollNo, gender, branch, specialization } = userData

      // Validate required fields
      if (!email || !password || !fullName || !rollNo || !gender || !branch || !specialization) {
        throw new Error('All required fields must be filled')
      }

      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Update user profile
      await updateProfile(user, { displayName: fullName })

      // Split full name
      const nameParts = fullName.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      // Prepare user data for Firestore
      const firestoreUserData = {
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        fullName: fullName,
        phoneNumber: phone,
        email: email,
        studentId: rollNo,
        gender: gender,
        department: branch,
        specialization: specialization,
        currentYear: null,
        currentSemester: null,
        enrollmentYear: null,
        status: 'pending_verification', // Changed to pending until email is verified
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        // Address placeholder
        address: {
          street: '',
          city: '',
          state: '',
          pincode: '',
          country: ''
        },
        // Academic records placeholders
        academicRecords: {
          gpa: null,
          totalCredits: 0,
          completedSubjects: []
        }
      }

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), firestoreUserData)

      // Send email verification
      await sendEmailVerification(user)

      return {
        success: true,
        message: 'Account created successfully! Please check your email to verify your account.',
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      throw new Error(error.message || 'Registration failed. Please try again.')
    }
  }

  // Send password reset email
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email)
      return {
        success: true,
        message: 'Password reset email sent. Please check your inbox.'
      }
    } catch (error) {
      console.error('Password reset error:', error)
      throw new Error(error.message || 'Failed to send password reset email.')
    }
  }

  // Logout
  async logout() {
    try {
      await signOut(auth)
      return {
        success: true,
        message: 'Logged out successfully'
      }
    } catch (error) {
      console.error('Logout error:', error)
      throw new Error(error.message || 'Logout failed.')
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getCurrentUser()
  }

  // Check if user email is verified
  isEmailVerified() {
    const user = this.getCurrentUser()
    return user ? user.emailVerified : false
  }

  // Resend email verification
  async resendEmailVerification() {
    try {
      const user = this.getCurrentUser()
      if (!user) {
        throw new Error('No authenticated user found')
      }

      await sendEmailVerification(user)
      return {
        success: true,
        message: 'Verification email sent. Please check your inbox.'
      }
    } catch (error) {
      console.error('Resend verification error:', error)
      throw new Error(error.message || 'Failed to send verification email.')
    }
  }

  // Update user status in Firestore
  async updateUserStatus(uid, status) {
    try {
      const userRef = doc(db, 'users', uid)
      await updateDoc(userRef, {
        status: status,
        lastLogin: new Date(),
        updatedAt: new Date()
      })
      return { success: true }
    } catch (error) {
      console.error('Update user status error:', error)
      return { success: false, error: error.message }
    }
  }

  // Get user data from Firestore
  async getUserData(uid = null) {
    try {
      const userId = uid || this.getCurrentUser()?.uid
      if (!userId) {
        throw new Error('No user ID provided')
      }

      const userDoc = await getDoc(doc(db, 'users', userId))
      if (userDoc.exists()) {
        return {
          success: true,
          data: { id: userDoc.id, ...userDoc.data() }
        }
      } else {
        return {
          success: false,
          error: 'User not found'
        }
      }
    } catch (error) {
      console.error('Get user data error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Update user profile in Firestore
  async updateUserProfile(updateData) {
    try {
      const user = this.getCurrentUser()
      if (!user) {
        throw new Error('No authenticated user found')
      }

      const userRef = doc(db, 'users', user.uid)
      const updatedData = {
        ...updateData,
        updatedAt: new Date()
      }

      await updateDoc(userRef, updatedData)
      return {
        success: true,
        message: 'Profile updated successfully'
      }
    } catch (error) {
      console.error('Update profile error:', error)
      throw new Error(error.message || 'Failed to update profile.')
    }
  }

  // Make authenticated API requests
  async apiRequest(url, options = {}) {
    try {
      const token = await this.getCurrentUserToken()
      if (!token) {
        throw new Error('No authentication token available')
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API request error:', error)
      throw error
    }
  }

  // Get all users (admin function)
  async getAllUsers(options = {}) {
    try {
      const queryParams = new URLSearchParams(options).toString()
      const url = `/api/users${queryParams ? '?' + queryParams : ''}`
      return await this.apiRequest(url)
    } catch (error) {
      console.error('Get all users error:', error)
      return {
        success: false,
        error: error.message,
        data: []
      }
    }
  }

  // Check if current user is admin
  isAdmin() {
    const user = this.getCurrentUser()
    return user && (user.email?.includes('admin') || user.email?.endsWith('@ltsu.edu'))
  }
}

// Create and export a singleton instance
const authService = new AuthService()
export default authService

// Export individual methods for convenience
export const {
  login,
  register,
  resetPassword,
  logout,
  isAuthenticated,
  isEmailVerified,
  resendEmailVerification,
  getCurrentUser,
  getCurrentUserToken,
  updateUserProfile,
  getUserData,
  apiRequest,
  getAllUsers,
  isAdmin
} = authService