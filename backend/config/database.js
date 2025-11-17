// Database Configuration
// Firebase and additional database configurations

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

// Database collections configuration
export const COLLECTIONS = {
  USERS: 'users',
  EVENTS: 'events',
  ANNOUNCEMENTS: 'announcements',
  DEADLINES: 'deadlines',
  SUBJECTS: 'subjects',
  SYLLABUS: 'syllabus',
  GRADES: 'grades',
  ATTENDANCE: 'attendance',
  ACADEMIC_RECORDS: 'academicRecords',
  ANALYTICS: 'analytics',
  ADMIN_USERS: 'adminUsers',
  SYSTEM_CONFIG: 'systemConfig',
  AUDIT_LOGS: 'auditLogs',
  BACKUPS: 'backups'
}

// Database connection status
export const checkConnection = async () => {
  try {
    // Simple connection test
    const testQuery = await db.collection(COLLECTIONS.USERS).limit(1).get()
    return {
      connected: true,
      message: 'Database connection successful'
    }
  } catch (error) {
    return {
      connected: false,
      error: error.message
    }
  }
}

// Database indexes (for complex queries)
export const DATABASE_INDEXES = [
  // User indexes
  `${COLLECTIONS.USERS} (currentYear, specialization)`,
  `${COLLECTIONS.USERS} (status, createdAt desc)`,
  `${COLLECTIONS.USERS} (email)`,

  // Content indexes
  `${COLLECTIONS.EVENTS} (date desc, status)`,
  `${COLLECTIONS.ANNOUNCEMENTS} (createdAt desc, status)`,
  `${COLLECTIONS.DEADLINES} (dueDate asc, status)`,

  // Academic indexes
  `${COLLECTIONS.GRADES} (studentId, year, semester)`,
  `${COLLECTIONS.ATTENDANCE} (studentId, date desc)`,
  `${COLLECTIONS.SYLLABUS} (specialization, year, semester)`
]

// Database backup configuration
export const BACKUP_CONFIG = {
  COLLECTIONS_TO_BACKUP: [
    COLLECTIONS.USERS,
    COLLECTIONS.EVENTS,
    COLLECTIONS.ANNOUNCEMENTS,
    COLLECTIONS.DEADLINES,
    COLLECTIONS.SUBJECTS,
    COLLECTIONS.SYLLABUS,
    COLLECTIONS.GRADES,
    COLLECTIONS.ATTENDANCE,
    COLLECTIONS.ACADEMIC_RECORDS
  ],
  EXCLUDE_COLLECTIONS: [
    COLLECTIONS.AUDIT_LOGS, // Too large, separate backup
    COLLECTIONS.ANALYTICS   // Can be regenerated
  ],
  RETENTION_DAYS: process.env.BACKUP_RETENTION_DAYS || 30
}

// Database security rules reference
export const SECURITY_RULES = {
  // Users can read/write their own data
  users: {
    read: 'auth != null && (auth.uid == resource.id || auth.token.email.contains("admin"))',
    write: 'auth != null && (auth.uid == resource.id || auth.token.email.contains("admin"))'
  },

  // Only admins can manage content
  content: {
    read: 'auth != null',
    write: 'auth != null && auth.token.email.contains("admin")'
  },

  // Academic data access rules
  academic: {
    read: 'auth != null && (auth.uid == resource.data.studentId || auth.token.email.contains("admin"))',
    write: 'auth != null && auth.token.email.contains("admin")'
  }
}

export default {
  app,
  db,
  auth,
  storage,
  COLLECTIONS,
  checkConnection,
  DATABASE_INDEXES,
  BACKUP_CONFIG,
  SECURITY_RULES
}