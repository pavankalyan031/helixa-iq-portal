// Test authentication system
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from './frontend/src/firebase.js'

async function testAuth() {
  try {
    console.log('Testing Firebase Authentication...')
    
    // Test account credentials
    const testEmail = 'test@ltsu.edu'
    const testPassword = 'TestPass123!'
    
    try {
      // Try to sign in first
      console.log('Attempting to sign in...')
      const signInResult = await signInWithEmailAndPassword(auth, testEmail, testPassword)
      console.log('✅ User signed in successfully:', signInResult.user.email)
    } catch (signInError) {
      console.log('Sign in failed, trying to create user...')
      
      // If sign in fails, create new user
      try {
        const signUpResult = await createUserWithEmailAndPassword(auth, testEmail, testPassword)
        console.log('✅ User created successfully:', signUpResult.user.email)
        
        // Send email verification
        await sendEmailVerification(signUpResult.user)
        console.log('✅ Email verification sent')
        
      } catch (signUpError) {
        console.error('❌ User creation failed:', signUpError.message)
        return
      }
    }
    
    console.log('🎉 Authentication test completed successfully!')
    
  } catch (error) {
    console.error('❌ Authentication test failed:', error)
  }
}

testAuth()