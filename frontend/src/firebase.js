// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrJ12QLlmQ0QMaE9XDfOK0d4SHJkJ8kaY",
  authDomain: "lstu-student-portal.firebaseapp.com",
  projectId: "lstu-student-portal",
  storageBucket: "lstu-student-portal.firebasestorage.app",
  messagingSenderId: "213785339707",
  appId: "1:213785339707:web:9a98d88ae593f014dcb91e",
  measurementId: "G-E16S2FJ6PD"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const analytics = getAnalytics(app)
