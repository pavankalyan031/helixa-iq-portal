// Authentication Service
// Handles Firebase authentication and token management

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification as firebaseSendEmailVerification,
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

  // Login with email and password (using Firebase Auth)
  async login(email, password) {
    try {
      console.log('🔐 LOGIN ATTEMPT:', { email, timestamp: new Date().toISOString() })

      // Login with Firebase Auth
      console.log('📧 Attempting Firebase authentication...')
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user
      console.log('✅ Firebase auth successful:', {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified,
        displayName: firebaseUser.displayName
      })

      // Check if email is verified
      if (!firebaseUser.emailVerified) {
        console.log('❌ EMAIL NOT VERIFIED - Signing out user')
        // Sign out the user since email is not verified
        await signOut(auth)
        throw new Error('Please verify your email address before logging in. Check your email for the verification link.')
      }
      console.log('✅ Email verified, proceeding with login...')

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
      let userData = null

      if (userDoc.exists()) {
        userData = { id: userDoc.id, ...userDoc.data() }
      } else {
        // Fallback to backend if not in Firestore
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })

        const result = await response.json()

        if (!result.success) {
          await signOut(auth)
          throw new Error(result.error || 'Login failed')
        }

        userData = result.data
      }

      // Update last login in Firestore
      const userRef = doc(db, 'users', firebaseUser.uid)
      await updateDoc(userRef, {
        lastLogin: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })

      return {
        success: true,
        user: userData
      }
    } catch (error) {
      console.error('Login error:', error)
      throw new Error(error.message || 'Login failed. Please check your credentials.')
    }
  }

  // Register new user (using Firebase Auth + local backend sync)
  async register(userData) {
    try {
      const { email, password, fullName, phone, rollNo, gender, branch, specialization } = userData
      console.log('📝 REGISTRATION ATTEMPT:', { email, fullName, rollNo, timestamp: new Date().toISOString() })

      // Validate required fields
      if (!email || !password || !fullName || !rollNo || !gender || !branch || !specialization) {
        console.log('❌ VALIDATION FAILED: Missing required fields')
        throw new Error('All required fields must be filled')
      }
      console.log('✅ Validation passed')

      // Create user with Firebase Auth
      console.log('🔥 Creating Firebase user...')
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user
      console.log('✅ Firebase user created:', {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified
      })

      // Send email verification
      console.log('📧 Sending email verification...')
      await firebaseSendEmailVerification(firebaseUser)
      console.log('✅ Email verification sent')

      // Split full name
      const nameParts = fullName.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      // Prepare user data for both Firebase and backend
      const userDataToStore = {
        uid: firebaseUser.uid,
        firstName: firstName,
        lastName: lastName,
        fullName: fullName,
        phoneNumber: phone,
        email: email,
        studentId: rollNo,
        gender: gender,
        department: branch,
        specialization: specialization,
        avatar: '/assets/images/default-avatar.png',
        status: 'active',
        emailVerified: false, // Will be updated when verified
        phoneVerified: false,
        lastLogin: null,
        loginAttempts: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      // Store in Firebase Firestore
      const userRef = doc(db, 'users', firebaseUser.uid)
      await setDoc(userRef, userDataToStore)

      // Also store in local backend
      const backendUserData = {
        email: email,
        password: password, // Backend will hash it
        fullName: fullName,
        phone: phone,
        rollNo: rollNo,
        gender: gender,
        branch: branch,
        specialization: specialization,
        uid: firebaseUser.uid
      }

      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(backendUserData)
      })

      const result = await response.json()

      if (!result.success) {
        // If backend fails, delete Firebase user
        await firebaseUser.delete()
        throw new Error(result.error || 'Registration failed')
      }

      return {
        success: true,
        message: 'Account created successfully! Please check your email to verify your account.',
        user: {
          uid: firebaseUser.uid,
          ...userDataToStore
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      throw new Error(error.message || 'Registration failed. Please try again.')
    }
  }

  // Send password reset email (using Firebase Auth)
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email)
      return {
        success: true,
        message: 'Password reset link sent to your email. Please check your inbox.'
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

  // Send email verification (using Firebase Auth)
  async sendEmailVerification(email = null) {
    try {
      const user = this.getCurrentUser()
      if (!user) {
        throw new Error('No authenticated user found')
      }

      await firebaseSendEmailVerification(user)
      return {
        success: true,
        message: 'Verification email sent successfully'
      }
    } catch (error) {
      console.error('Email verification error:', error)
      throw new Error(error.message || 'Failed to send verification email.')
    }
  }



  // Resend email verification
  async resendEmailVerification() {
    try {
      const user = this.getCurrentUser()
      if (!user) {
        throw new Error('No authenticated user found')
      }

      await firebaseSendEmailVerification(user)
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
        lastLogin: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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
        const userData = { id: userDoc.id, ...userDoc.data() }

        // Update email verification status if it changed
        const firebaseUser = this.getCurrentUser()
        if (firebaseUser && userData.emailVerified !== firebaseUser.emailVerified) {
          await updateDoc(doc(db, 'users', userId), {
            emailVerified: firebaseUser.emailVerified,
            updatedAt: new Date().toISOString()
          })
          userData.emailVerified = firebaseUser.emailVerified
        }

        return {
          success: true,
          data: userData
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

  // Update user profile in Firestore and backend
  async updateUserProfile(updateData) {
    try {
      const user = this.getCurrentUser()
      if (!user) {
        throw new Error('No authenticated user found')
      }

      const userRef = doc(db, 'users', user.uid)
      const updatedData = {
        ...updateData,
        updatedAt: new Date().toISOString()
      }

      // Update in Firestore
      await updateDoc(userRef, updatedData)

      // Also update in backend
      const response = await fetch(`/api/users/${user.uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })

      const result = await response.json()
      if (!result.success) {
        console.warn('Failed to update backend:', result.error)
        // Don't throw error, Firestore update succeeded
      }

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
  sendEmailVerification,
  resendEmailVerification,
  getCurrentUser,
  getCurrentUserToken,
  updateUserProfile,
  getUserData,
  apiRequest,
  getAllUsers,
  isAdmin
} = authService