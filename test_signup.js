// Test signup functionality
import authService from './frontend/src/utils/authService.js'
import './frontend/src/firebase.js' // Ensure Firebase is initialized

async function testSignup() {
  try {
    console.log('🧪 Testing signup functionality...')

    const testUser = {
      email: `test${Date.now()}@example.com`,
      password: 'TestPass123!',
      fullName: 'Test User',
      phone: '+919876543210',
      rollNo: `TEST${Date.now()}`,
      gender: 'Male',
      branch: 'BTech CSE IBM',
      specialization: 'AI & ML'
    }

    console.log('📝 Attempting to register user:', testUser.email)

    const result = await authService.register(testUser)

    console.log('✅ Signup result:', result)

    if (result.success) {
      console.log('🎉 Signup successful!')
      console.log('User ID:', result.user.uid)
      console.log('Email verification required before login')
    } else {
      console.log('❌ Signup failed:', result.error)
    }

  } catch (error) {
    console.error('❌ Signup test failed:', error.message)
    console.error('Stack:', error.stack)
  }
}

testSignup()