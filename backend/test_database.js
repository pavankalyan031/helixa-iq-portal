// Test script to debug database operations

import localDatabase from './utils/localDatabase.js'

async function testDatabase() {
  console.log('Testing database operations...')
  
  // Test getting all users
  const allUsers = localDatabase.getAllUsers()
  console.log('Total users:', allUsers.length)
  
  if (allUsers.length > 0) {
    console.log('First user:', allUsers[0].email)
    
    // Test finding user by email
    const testEmail = allUsers[0].email
    const userByEmail = localDatabase.findUserByEmail(testEmail)
    console.log('Find by email result:', userByEmail)
  }
}

testDatabase().catch(console.error)