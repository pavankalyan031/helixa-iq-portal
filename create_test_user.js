// Create a test user and test the authentication flow
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

// Firebase configuration (same as frontend)
const firebaseConfig = {
  apiKey: "AIzaSyCrJ12QLlmQ0QMaE9XDfOK0d4SHJkJ8kaY",
  authDomain: "lstu-student-portal.firebaseapp.com",
  projectId: "lstu-student-portal",
  storageBucket: "lstu-student-portal.firebasestorage.app",
  messagingSenderId: "213785339707",
  appId: "1:213785339707:web:9a98d88ae593f014dcb91e",
  measurementId: "G-E16S2FJ6PD"
}

const app = initializeApp(firebaseConfig, 'test-app')
const auth = getAuth(app)
const db = getFirestore(app)

async function createTestUser() {
  try {
    console.log('🚀 Creating test user...')
    
    // Test user credentials
    const testEmail = 'student@ltsu.edu'
    const testPassword = 'Student123!'
    const fullName = 'Test Student'
    
    let user
    
    try {
      // Try to sign in first
      console.log('📧 Attempting to sign in...')
      const signInResult = await signInWithEmailAndPassword(auth, testEmail, testPassword)
      user = signInResult.user
      console.log('✅ User signed in successfully')
    } catch (signInError) {
      console.log('🔐 Sign in failed, creating new user...')
      
      // If sign in fails, create new user
      try {
        const signUpResult = await createUserWithEmailAndPassword(auth, testEmail, testPassword)
        user = signUpResult.user
        console.log('✅ User created successfully:', user.email)
        
        // Split full name
        const nameParts = fullName.trim().split(' ')
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || ''
        
        // Prepare user data for Firestore
        const userData = {
          uid: user.uid,
          firstName: firstName,
          lastName: lastName,
          fullName: fullName,
          email: testEmail,
          phoneNumber: '+919876543210',
          studentId: 'TEST2024',
          gender: 'Male',
          department: 'BTech CSE IBM',
          specialization: 'Data Science',
          currentYear: '3',
          currentSemester: '6',
          enrollmentYear: '2022',
          status: 'active',
          emailVerified: user.emailVerified,
          createdAt: new Date(),
          updatedAt: new Date(),
          address: {
            street: '',
            city: '',
            state: '',
            pincode: '',
            country: 'India'
          },
          academicRecords: {
            gpa: 8.5,
            totalCredits: 120,
            completedSubjects: ['DSA', 'DBMS', 'OS', 'CN']
          }
        }
        
        // Save user data to Firestore
        await setDoc(doc(db, 'users', user.uid), userData)
        console.log('✅ User data saved to Firestore')
        
      } catch (signUpError) {
        console.error('❌ User creation failed:', signUpError.message)
        return
      }
    }
    
    // Test API connection
    console.log('🔗 Testing API connection...')
    const response = await fetch('http://localhost:3002/api/health')
    const healthData = await response.json()
    console.log('✅ API Health Check:', healthData)
    
    // Sign out
    await signOut(auth)
    console.log('🚪 User signed out')
    
    console.log('🎉 Test user creation completed successfully!')
    console.log('📋 Test credentials:')
    console.log('   Email: student@ltsu.edu')
    console.log('   Password: Student123!')
    
  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

// Run the test
createTestUser()