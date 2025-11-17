// Firebase Admin Configuration
// Using Firebase Admin SDK for server-side operations

import admin from 'firebase-admin'

// Firebase Admin configuration using service account
// Note: In production, you should use environment variables
const serviceAccount = {
  type: "service_account",
  project_id: "lstu-student-portal",
  private_key_id: "1",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-xxx@lstu-student-portal.iam.gserviceaccount.com",
  client_id: "123456789",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxx%40lstu-student-portal.iam.gserviceaccount.com"
}

// Initialize Firebase Admin SDK
try {
  if (!admin.apps.length) {
    // For development, use application default credentials
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: 'lstu-student-portal'
    })
  }
} catch (error) {
  console.error('Firebase Admin initialization error:', error)
  
  // Fallback: Initialize without admin SDK for basic operations
  console.log('Initializing Firebase Admin with basic configuration...')
  try {
    admin.initializeApp()
  } catch (fallbackError) {
    console.error('Fallback initialization failed:', fallbackError)
  }
}

export default admin