// Create demo user directly in database
import { collection, addDoc } from 'firebase/firestore'
import { db } from './config/firebase.js'
import bcrypt from 'bcryptjs'

async function createDemoUser() {
  try {
    console.log('Creating demo user...')
    
    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash('Pavan@123', saltRounds)
    
    const userData = {
      firstName: 'Pavan',
      lastName: 'Kalyan',
      fullName: 'Pavan Kalyan',
      email: 'pavankalyan182005@gmail.com',
      password: hashedPassword,
      phoneNumber: '+919876543210',
      studentId: 'PAVAN2024',
      college: 'LTSU Engineering College',
      year: '4',
      semester: '8',
      avatar: '/assets/images/default-avatar.png',
      subscriptionType: 'premium',
      planPrice: 299,
      planDuration: 'yearly',
      paymentStatus: 'completed',
      upiId: 'pavankalyan@ybl',
      transactionId: 'DEMO123456789',
      paymentMethod: 'gpay',
      subscriptionStart: new Date(),
      subscriptionEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      autoRenew: false,
      lmsAccess: true,
      allowedCourses: [],
      progress: {},
      certificates: [],
      status: 'active',
      emailVerified: true,
      phoneVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: null,
      loginAttempts: 0,
      lockedUntil: null
    }
    
    const docRef = await addDoc(collection(db, 'premium_users'), userData)
    
    console.log('✅ Demo user created successfully!')
    console.log('User ID:', docRef.id)
    console.log('Email: pavankalyan182005@gmail.com')
    console.log('Password: Pavan@123')
    
    return {
      success: true,
      userId: docRef.id,
      email: 'pavankalyan182005@gmail.com',
      password: 'Pavan@123'
    }
  } catch (error) {
    console.error('Error creating demo user:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createDemoUser().then(result => {
    console.log('Demo user creation result:', result)
    process.exit(0)
  })
}

export default createDemoUser