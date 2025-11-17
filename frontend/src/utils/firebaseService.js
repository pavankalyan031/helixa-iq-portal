import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { db, storage } from '../firebase';
import { COLLECTIONS } from './databaseSchema';

/**
 * Enhanced Firebase Service for LTSU Student Portal
 * Comprehensive backend operations for all data management
 */

class FirebaseService {
  constructor() {
    this.db = db;
    this.storage = storage;
  }

  // ============================================================================
  // USER MANAGEMENT
  // ============================================================================

  /**
   * Get user profile data
   */
  async getUserProfile(userId) {
    try {
      const userDoc = await getDoc(doc(this.db, COLLECTIONS.USERS, userId));
      if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(userId, profileData) {
    try {
      const userRef = doc(this.db, COLLECTIONS.USERS, userId);
      await updateDoc(userRef, {
        ...profileData,
        updatedAt: Timestamp.now()
      });
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  /**
   * Create user profile
   */
  async createUserProfile(userId, profileData) {
    try {
      const userRef = doc(this.db, COLLECTIONS.USERS, userId);
      await updateDoc(userRef, {
        ...profileData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return true;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  }

  // ============================================================================
  // ACADEMIC DATA MANAGEMENT
  // ============================================================================

  /**
   * Get student grades
   */
  async getStudentGrades(studentId, semester = null, year = null) {
    try {
      let q = query(
        collection(this.db, COLLECTIONS.GRADES),
        where('studentId', '==', studentId),
        orderBy('semester', 'desc'),
        orderBy('year', 'desc')
      );

      if (semester) {
        q = query(q, where('semester', '==', semester));
      }
      if (year) {
        q = query(q, where('year', '==', year));
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting student grades:', error);
      throw error;
    }
  }

  /**
   * Add student grade
   */
  async addStudentGrade(gradeData) {
    try {
      const docRef = await addDoc(collection(this.db, COLLECTIONS.GRADES), {
        ...gradeData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding student grade:', error);
      throw error;
    }
  }

  /**
   * Get student attendance
   */
  async getStudentAttendance(studentId, subjectId = null) {
    try {
      let q = query(
        collection(this.db, COLLECTIONS.ATTENDANCE),
        where('studentId', '==', studentId),
        orderBy('semester', 'desc')
      );

      if (subjectId) {
        q = query(q, where('subjectId', '==', subjectId));
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting student attendance:', error);
      throw error;
    }
  }

  /**
   * Update attendance record
   */
  async updateAttendance(attendanceId, attendanceData) {
    try {
      const attendanceRef = doc(this.db, COLLECTIONS.ATTENDANCE, attendanceId);
      await updateDoc(attendanceRef, {
        ...attendanceData,
        lastUpdated: Timestamp.now()
      });
      return true;
    } catch (error) {
      console.error('Error updating attendance:', error);
      throw error;
    }
  }

  /**
   * Get assignments for a subject
   */
  async getAssignments(subjectId = null, studentId = null) {
    try {
      let q = query(
        collection(this.db, COLLECTIONS.ASSIGNMENTS),
        orderBy('dueDate', 'asc')
      );

      if (subjectId) {
        q = query(q, where('subjectId', '==', subjectId));
      }

      const snapshot = await getDocs(q);
      let assignments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Filter by student submissions if studentId provided
      if (studentId) {
        assignments = assignments.map(assignment => ({
          ...assignment,
          studentSubmission: assignment.submissions?.find(sub => sub.studentId === studentId)
        }));
      }

      return assignments;
    } catch (error) {
      console.error('Error getting assignments:', error);
      throw error;
    }
  }

  /**
   * Submit assignment
   */
  async submitAssignment(assignmentId, studentId, submissionData) {
    try {
      const assignmentRef = doc(this.db, COLLECTIONS.ASSIGNMENTS, assignmentId);
      const assignmentDoc = await getDoc(assignmentRef);

      if (!assignmentDoc.exists()) {
        throw new Error('Assignment not found');
      }

      const assignment = assignmentDoc.data();
      const submissions = assignment.submissions || [];

      // Remove existing submission if any
      const filteredSubmissions = submissions.filter(sub => sub.studentId !== studentId);

      // Add new submission
      const newSubmission = {
        studentId,
        submittedAt: Timestamp.now(),
        ...submissionData
      };

      await updateDoc(assignmentRef, {
        submissions: [...filteredSubmissions, newSubmission],
        updatedAt: Timestamp.now()
      });

      return true;
    } catch (error) {
      console.error('Error submitting assignment:', error);
      throw error;
    }
  }

  // ============================================================================
  // CONTENT MANAGEMENT
  // ============================================================================

  /**
   * Get events with pagination
   */
  async getEvents(limitCount = null) {
    try {
      let q = query(
        collection(this.db, COLLECTIONS.EVENTS),
        orderBy('createdAt', 'desc')
      );

      if (limitCount) {
        q = query(q, limit(limitCount));
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting events:', error);
      throw error;
    }
  }

  /**
   * Add event
   */
  async addEvent(eventData) {
    try {
      const docRef = await addDoc(collection(this.db, COLLECTIONS.EVENTS), {
        ...eventData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  }

  /**
   * Get announcements
   */
  async getAnnouncements(limitCount = 10) {
    try {
      const q = query(
        collection(this.db, COLLECTIONS.ANNOUNCEMENTS),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting announcements:', error);
      throw error;
    }
  }

  /**
   * Get deadlines
   */
  async getDeadlines(limitCount = 5) {
    try {
      const q = query(
        collection(this.db, COLLECTIONS.DEADLINES),
        orderBy('dueDate', 'asc'),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting deadlines:', error);
      throw error;
    }
  }

  // ============================================================================
  // NOTIFICATION SYSTEM
  // ============================================================================

  /**
   * Get user notifications
   */
  async getUserNotifications(userId, limitCount = 20) {
    try {
      const q = query(
        collection(this.db, COLLECTIONS.NOTIFICATIONS),
        where('userId', 'in', [userId, 'all']),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting notifications:', error);
      throw error;
    }
  }

  /**
   * Mark notification as read
   */
  async markNotificationAsRead(notificationId) {
    try {
      const notificationRef = doc(this.db, COLLECTIONS.NOTIFICATIONS, notificationId);
      await updateDoc(notificationRef, {
        isRead: true,
        readAt: Timestamp.now()
      });
      return true;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  /**
   * Send notification to user
   */
  async sendNotification(userId, notificationData) {
    try {
      const docRef = await addDoc(collection(this.db, COLLECTIONS.NOTIFICATIONS), {
        userId,
        ...notificationData,
        isRead: false,
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }

  /**
   * Send broadcast notification
   */
  async sendBroadcastNotification(notificationData) {
    try {
      const docRef = await addDoc(collection(this.db, COLLECTIONS.NOTIFICATIONS), {
        userId: 'all',
        ...notificationData,
        isRead: false,
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error sending broadcast notification:', error);
      throw error;
    }
  }

  // ============================================================================
  // FILE UPLOAD SYSTEM
  // ============================================================================

  /**
   * Upload file to Firebase Storage
   */
  async uploadFile(file, path, metadata = {}) {
    try {
      const storageRef = ref(this.storage, path);
      const uploadResult = await uploadBytes(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(uploadResult.ref);

      return {
        url: downloadURL,
        path: uploadResult.ref.fullPath,
        size: file.size,
        type: file.type,
        name: file.name
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  /**
   * Delete file from Firebase Storage
   */
  async deleteFile(path) {
    try {
      const fileRef = ref(this.storage, path);
      await deleteObject(fileRef);
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  // ============================================================================
  // ANALYTICS & LOGGING
  // ============================================================================

  /**
   * Log user activity
   */
  async logUserActivity(userId, activityData) {
    try {
      await addDoc(collection(this.db, COLLECTIONS.ANALYTICS), {
        type: 'user_activity',
        userId,
        ...activityData,
        createdAt: Timestamp.now()
      });
      return true;
    } catch (error) {
      console.error('Error logging user activity:', error);
      // Don't throw error for logging failures
      return false;
    }
  }

  /**
   * Log system event
   */
  async logSystemEvent(level, category, message, details = {}) {
    try {
      await addDoc(collection(this.db, COLLECTIONS.SYSTEM_LOGS), {
        level,
        category,
        message,
        details,
        timestamp: Timestamp.now()
      });
      return true;
    } catch (error) {
      console.error('Error logging system event:', error);
      return false;
    }
  }

  /**
   * Get analytics data
   */
  async getAnalytics(type, dateRange = null) {
    try {
      let q = query(
        collection(this.db, COLLECTIONS.ANALYTICS),
        where('type', '==', type),
        orderBy('createdAt', 'desc')
      );

      if (dateRange) {
        q = query(q, where('createdAt', '>=', dateRange.start));
        if (dateRange.end) {
          q = query(q, where('createdAt', '<=', dateRange.end));
        }
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting analytics:', error);
      throw error;
    }
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Real-time listener for collection
   */
  subscribeToCollection(collectionName, callback, filters = {}) {
    try {
      let q = collection(this.db, collectionName);

      // Apply filters
      Object.keys(filters).forEach(key => {
        q = query(q, where(key, '==', filters[key]));
      });

      // Add ordering
      q = query(q, orderBy('createdAt', 'desc'));

      return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(data);
      });
    } catch (error) {
      console.error('Error subscribing to collection:', error);
      throw error;
    }
  }

  /**
   * Batch operations
   */
  async batchUpdate(updates) {
    try {
      const batch = [];
      // Note: Firestore batch operations would go here
      // For now, we'll do individual updates
      for (const update of updates) {
        const { collection: col, id, data } = update;
        const docRef = doc(this.db, col, id);
        await updateDoc(docRef, { ...data, updatedAt: Timestamp.now() });
      }
      return true;
    } catch (error) {
      console.error('Error in batch update:', error);
      throw error;
    }
  }

  /**
   * Search functionality
   */
  async search(collectionName, searchField, searchTerm, limitCount = 10) {
    try {
      // Note: Firestore doesn't support full-text search natively
      // This is a basic implementation - for production, consider Algolia or ElasticSearch
      const q = query(
        collection(this.db, collectionName),
        orderBy(searchField),
        limit(limitCount * 2) // Get more to filter
      );

      const snapshot = await getDocs(q);
      const results = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(item =>
          item[searchField]?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, limitCount);

      return results;
    } catch (error) {
      console.error('Error searching:', error);
      throw error;
    }
  }
}

// Create singleton instance
const firebaseService = new FirebaseService();

export default firebaseService;