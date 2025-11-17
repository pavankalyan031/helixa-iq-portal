/**
 * LTSU Student Portal - Firebase Database Schema
 * Comprehensive backend system for dynamic data management
 */

// Database Collections Schema
export const COLLECTIONS = {
  // User Management
  USERS: 'users',
  ADMIN_USERS: 'adminUsers',

  // Academic Data
  GRADES: 'grades',
  ATTENDANCE: 'attendance',
  ASSIGNMENTS: 'assignments',
  COURSES: 'courses',
  SUBJECTS: 'subjects',
  TIMETABLES: 'timetables',

  // Content Management
  EVENTS: 'events',
  ANNOUNCEMENTS: 'announcements',
  DEADLINES: 'deadlines',
  RESOURCES: 'resources',

  // Communication
  NOTIFICATIONS: 'notifications',
  MESSAGES: 'messages',

  // Analytics & System
  ANALYTICS: 'analytics',
  SYSTEM_LOGS: 'systemLogs',
  BACKUPS: 'backups'
};

// User Profile Schema
export const USER_SCHEMA = {
  // Basic Info
  uid: 'string', // Firebase Auth UID
  email: 'string',
  displayName: 'string',
  photoURL: 'string',

  // Personal Information
  firstName: 'string',
  lastName: 'string',
  dateOfBirth: 'timestamp',
  gender: 'string', // 'Male', 'Female', 'Other'
  phoneNumber: 'string',
  address: 'object', // { street, city, state, pincode, country }

  // Academic Information
  studentId: 'string',
  enrollmentYear: 'number',
  currentYear: 'number', // 1, 2, 3, 4
  currentSemester: 'number', // 1, 2
  specialization: 'string', // 'AIML', 'DS', 'IOT', 'Cyber Security'
  department: 'string',

  // Academic Performance
  cgpa: 'number',
  totalCredits: 'number',
  completedCredits: 'number',

  // System Metadata
  role: 'string', // 'student', 'admin', 'faculty'
  isActive: 'boolean',
  lastLogin: 'timestamp',
  createdAt: 'timestamp',
  updatedAt: 'timestamp',

  // Preferences
  preferences: 'object', // { theme, notifications, language }
  settings: 'object' // { privacy, visibility }
};

// Grades Schema
export const GRADE_SCHEMA = {
  studentId: 'string',
  subjectId: 'string',
  subjectName: 'string',
  semester: 'number',
  year: 'number',
  academicYear: 'string', // '2024-25'

  // Grade Components
  internalMarks: 'number', // Out of 40
  externalMarks: 'number', // Out of 60
  totalMarks: 'number', // Out of 100
  grade: 'string', // 'A+', 'A', 'B+', 'B', 'C', 'F'
  gradePoint: 'number', // 10, 9, 8, 7, 6, 5, 0
  credits: 'number',

  // Assessment Details
  assessments: 'array', // [{ type: 'quiz', marks: 10, maxMarks: 10, date }]
  attendance: 'number', // Percentage

  // Metadata
  facultyId: 'string',
  facultyName: 'string',
  examDate: 'timestamp',
  resultDate: 'timestamp',
  createdAt: 'timestamp',
  updatedAt: 'timestamp'
};

// Attendance Schema
export const ATTENDANCE_SCHEMA = {
  studentId: 'string',
  subjectId: 'string',
  subjectName: 'string',
  semester: 'number',
  year: 'number',
  academicYear: 'string',

  // Attendance Data
  totalClasses: 'number',
  attendedClasses: 'number',
  attendancePercentage: 'number',

  // Detailed Records
  records: 'array', // [{ date, status: 'present/absent', type: 'theory/practical' }]

  // Monthly Summary
  monthlyData: 'object', // { '2024-10': { total: 20, attended: 18 } }

  // Metadata
  facultyId: 'string',
  lastUpdated: 'timestamp',
  createdAt: 'timestamp'
};

// Assignment Schema
export const ASSIGNMENT_SCHEMA = {
  id: 'string',
  title: 'string',
  description: 'string',
  subjectId: 'string',
  subjectName: 'string',
  semester: 'number',
  year: 'number',

  // Assignment Details
  type: 'string', // 'homework', 'project', 'lab', 'quiz'
  totalMarks: 'number',
  dueDate: 'timestamp',
  submissionDate: 'timestamp',

  // File Requirements
  allowedFormats: 'array', // ['pdf', 'docx', 'zip']
  maxFileSize: 'number', // in MB
  instructions: 'string',

  // Submissions
  submissions: 'array', // [{ studentId, submittedAt, fileUrl, marks, feedback }]

  // Status
  status: 'string', // 'active', 'closed', 'graded'
  isMandatory: 'boolean',

  // Metadata
  facultyId: 'string',
  facultyName: 'string',
  createdAt: 'timestamp',
  updatedAt: 'timestamp'
};

// Course Schema
export const COURSE_SCHEMA = {
  id: 'string',
  name: 'string',
  code: 'string',
  description: 'string',

  // Course Details
  semester: 'number',
  year: 'number',
  specialization: 'string',
  department: 'string',

  // Academic Info
  credits: 'number',
  hoursPerWeek: 'number',
  type: 'string', // 'theory', 'practical', 'both'

  // Content
  syllabus: 'object', // Detailed syllabus structure
  objectives: 'array',
  outcomes: 'array',

  // Resources
  materials: 'array', // [{ title, type, url }]
  textbooks: 'array',
  references: 'array',

  // Faculty
  facultyId: 'string',
  facultyName: 'string',

  // Metadata
  isActive: 'boolean',
  createdAt: 'timestamp',
  updatedAt: 'timestamp'
};

// Notification Schema
export const NOTIFICATION_SCHEMA = {
  id: 'string',
  userId: 'string', // 'all' for broadcast notifications
  title: 'string',
  message: 'string',
  type: 'string', // 'announcement', 'deadline', 'grade', 'assignment', 'event'

  // Notification Details
  priority: 'string', // 'low', 'medium', 'high', 'urgent'
  category: 'string', // 'academic', 'administrative', 'general'

  // Actions
  actionUrl: 'string', // Link to relevant page
  actionText: 'string', // Button text

  // Status
  isRead: 'boolean',
  readAt: 'timestamp',

  // Metadata
  senderId: 'string',
  senderName: 'string',
  createdAt: 'timestamp',
  expiresAt: 'timestamp'
};

// Analytics Schema
export const ANALYTICS_SCHEMA = {
  id: 'string',
  type: 'string', // 'user_activity', 'content_performance', 'system_usage'
  date: 'timestamp',

  // Data
  metrics: 'object', // { pageViews, uniqueUsers, sessionDuration, etc. }
  dimensions: 'object', // { userId, page, action, etc. }

  // Context
  userId: 'string',
  sessionId: 'string',
  userAgent: 'string',
  ipAddress: 'string',

  // Metadata
  createdAt: 'timestamp'
};

// System Logs Schema
export const SYSTEM_LOG_SCHEMA = {
  id: 'string',
  level: 'string', // 'info', 'warning', 'error', 'critical'
  category: 'string', // 'auth', 'database', 'api', 'user_action'

  // Log Details
  message: 'string',
  details: 'object', // Additional context
  stackTrace: 'string',

  // Context
  userId: 'string',
  action: 'string',
  resource: 'string',

  // System Info
  userAgent: 'string',
  ipAddress: 'string',
  timestamp: 'timestamp'
};

// Database Indexes (for Firestore performance)
export const DATABASE_INDEXES = [
  // User queries
  { collection: 'users', fields: ['email'] },
  { collection: 'users', fields: ['studentId'] },
  { collection: 'users', fields: ['role'] },

  // Academic queries
  { collection: 'grades', fields: ['studentId', 'semester', 'year'] },
  { collection: 'attendance', fields: ['studentId', 'subjectId'] },
  { collection: 'assignments', fields: ['subjectId', 'dueDate'] },

  // Content queries
  { collection: 'events', fields: ['date'] },
  { collection: 'announcements', fields: ['createdAt'] },
  { collection: 'deadlines', fields: ['dueDate'] },

  // Notification queries
  { collection: 'notifications', fields: ['userId', 'createdAt'] },
  { collection: 'notifications', fields: ['type', 'createdAt'] }
];

// Security Rules Template
export const FIRESTORE_SECURITY_RULES = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    function isAdmin() {
      return isAuthenticated() &&
             exists(/databases/$(database)/documents/adminUsers/$(request.auth.uid));
    }

    function isStudent() {
      return isAuthenticated() &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'student';
    }

    function isFaculty() {
      return isAuthenticated() &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'faculty';
    }

    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId) || isAdmin();
      allow update: if isOwner(userId) || isAdmin();
    }

    // Admin users
    match /adminUsers/{userId} {
      allow read, write: if isAuthenticated();
    }

    // Academic data - students can read their own, faculty/admin can manage
    match /grades/{gradeId} {
      allow read: if isOwner(resource.data.studentId) || isFaculty() || isAdmin();
      allow write: if isFaculty() || isAdmin();
    }

    match /attendance/{attendanceId} {
      allow read: if isOwner(resource.data.studentId) || isFaculty() || isAdmin();
      allow write: if isFaculty() || isAdmin();
    }

    match /assignments/{assignmentId} {
      allow read: if isAuthenticated();
      allow write: if isFaculty() || isAdmin();
    }

    // Public content
    match /events/{eventId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /announcements/{announcementId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /deadlines/{deadlineId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /courses/{courseId} {
      allow read: if true;
      allow write: if isFaculty() || isAdmin();
    }

    // Notifications
    match /notifications/{notificationId} {
      allow read: if isOwner(resource.data.userId) || resource.data.userId == 'all';
      allow write: if isAdmin() || isFaculty();
    }

    // System collections
    match /analytics/{analyticId} {
      allow read, write: if isAdmin();
    }

    match /systemLogs/{logId} {
      allow read, write: if isAdmin();
    }
  }
}
`;

// Data Validation Rules
export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phoneNumber: /^\+?[\d\s\-\(\)]+$/,
  studentId: /^[A-Z]{2}\d{6}$/, // Example: CS123456
  grade: /^[A-F][+-]?$/,
  percentage: /^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/
};

// API Response Templates
export const API_RESPONSES = {
  SUCCESS: {
    status: 'success',
    message: 'Operation completed successfully'
  },
  ERROR: {
    status: 'error',
    message: 'An error occurred'
  },
  UNAUTHORIZED: {
    status: 'error',
    message: 'Unauthorized access'
  },
  NOT_FOUND: {
    status: 'error',
    message: 'Resource not found'
  },
  VALIDATION_ERROR: {
    status: 'error',
    message: 'Validation failed',
    errors: []
  }
};

export default {
  COLLECTIONS,
  USER_SCHEMA,
  GRADE_SCHEMA,
  ATTENDANCE_SCHEMA,
  ASSIGNMENT_SCHEMA,
  COURSE_SCHEMA,
  NOTIFICATION_SCHEMA,
  ANALYTICS_SCHEMA,
  SYSTEM_LOG_SCHEMA,
  DATABASE_INDEXES,
  FIRESTORE_SECURITY_RULES,
  VALIDATION_RULES,
  API_RESPONSES
};