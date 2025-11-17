// Backend Firebase Configuration
// Separate Firebase config for backend API server

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Firebase configuration - same as frontend
const firebaseConfig = {
  apiKey: "AIzaSyCrJ12QLlmQ0QMaE9XDfOK0d4SHJkJ8kaY",
  authDomain: "lstu-student-portal.firebaseapp.com",
  projectId: "lstu-student-portal",
  storageBucket: "lstu-student-portal.firebasestorage.app",
  messagingSenderId: "213785339707",
  appId: "1:213785339707:web:9a98d88ae593f014dcb91e",
  measurementId: "G-E16S2FJ6PD"
}

// Initialize Firebase for backend
const app = initializeApp(firebaseConfig, 'backend-server')
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Test connection
export const testConnection = async () => {
  try {
    const testDoc = await db.collection('users').limit(1).get()
    return { success: true, message: 'Firebase connection successful' }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export default {
  app,
  auth,
  db,
  storage,
  testConnection
}