// Content Management Controller
// Handles all content-related operations (events, announcements, syllabus, etc.)

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore'
import { db } from '../config/firebase.js'

class ContentController {
  constructor() {
    this.collections = {
      events: 'events',
      announcements: 'announcements',
      deadlines: 'deadlines',
      subjects: 'subjects',
      syllabus: 'syllabus'
    }
  }

  // Generic CRUD operations for any content type
  async createContent(contentType, data) {
    try {
      if (!this.collections[contentType]) {
        return { success: false, error: 'Invalid content type' }
      }

      const contentData = {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        status: data.status || 'active'
      }

      const docRef = await addDoc(collection(db, this.collections[contentType]), contentData)

      return {
        success: true,
        message: `${contentType} created successfully`,
        data: { id: docRef.id, ...contentData }
      }
    } catch (error) {
      console.error(`Error creating ${contentType}:`, error)
      return { success: false, error: error.message }
    }
  }

  async getAllContent(contentType, options = {}) {
    try {
      if (!this.collections[contentType]) {
        return { success: false, error: 'Invalid content type' }
      }

      const {
        limit: pageLimit = 50,
        status = '',
        category = '',
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = options

      let queryRef = collection(db, this.collections[contentType])

      // Apply filters
      if (status) {
        queryRef = query(queryRef, where('status', '==', status))
      }

      if (category && contentType === 'events') {
        queryRef = query(queryRef, where('category', '==', category))
      }

      // Apply sorting
      const sortDirection = sortOrder === 'desc' ? 'desc' : 'asc'
      queryRef = query(queryRef, orderBy(sortBy, sortDirection))

      // Apply limit
      if (pageLimit > 0) {
        queryRef = query(queryRef, limit(pageLimit))
      }

      const snapshot = await getDocs(queryRef)
      const content = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt
      }))

      return {
        success: true,
        data: content,
        total: content.length
      }
    } catch (error) {
      console.error(`Error fetching ${contentType}:`, error)
      return { success: false, error: error.message }
    }
  }

  async getContentById(contentType, id) {
    try {
      if (!this.collections[contentType]) {
        return { success: false, error: 'Invalid content type' }
      }

      const docSnap = await getDoc(doc(db, this.collections[contentType], id))

      if (docSnap.exists()) {
        const data = docSnap.data()
        return {
          success: true,
          data: {
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || data.createdAt,
            updatedAt: data.updatedAt?.toDate?.() || data.updatedAt
          }
        }
      } else {
        return { success: false, error: 'Content not found' }
      }
    } catch (error) {
      console.error(`Error fetching ${contentType}:`, error)
      return { success: false, error: error.message }
    }
  }

  async updateContent(contentType, id, updateData) {
    try {
      if (!this.collections[contentType]) {
        return { success: false, error: 'Invalid content type' }
      }

      const contentRef = doc(db, this.collections[contentType], id)
      const updatedData = {
        ...updateData,
        updatedAt: Timestamp.now()
      }

      await updateDoc(contentRef, updatedData)

      return {
        success: true,
        message: `${contentType} updated successfully`,
        data: updatedData
      }
    } catch (error) {
      console.error(`Error updating ${contentType}:`, error)
      return { success: false, error: error.message }
    }
  }

  async deleteContent(contentType, id) {
    try {
      if (!this.collections[contentType]) {
        return { success: false, error: 'Invalid content type' }
      }

      await deleteDoc(doc(db, this.collections[contentType], id))

      return {
        success: true,
        message: `${contentType} deleted successfully`
      }
    } catch (error) {
      console.error(`Error deleting ${contentType}:`, error)
      return { success: false, error: error.message }
    }
  }

  // Specific methods for different content types

  // Events Management
  async createEvent(eventData) {
    return this.createContent('events', {
      ...eventData,
      type: 'event'
    })
  }

  async getUpcomingEvents(limit = 10) {
    try {
      const events = await this.getAllContent('events', {
        status: 'active',
        limit,
        sortBy: 'date',
        sortOrder: 'asc'
      })

      if (events.success) {
        // Filter for upcoming events
        const now = new Date()
        events.data = events.data.filter(event => {
          const eventDate = event.date?.toDate?.() || new Date(event.date)
          return eventDate >= now
        })
      }

      return events
    } catch (error) {
      console.error('Error fetching upcoming events:', error)
      return { success: false, error: error.message }
    }
  }

  // Announcements Management
  async createAnnouncement(announcementData) {
    return this.createContent('announcements', {
      ...announcementData,
      type: 'announcement',
      priority: announcementData.priority || 'normal'
    })
  }

  async getActiveAnnouncements(limit = 20) {
    return this.getAllContent('announcements', {
      status: 'active',
      limit,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    })
  }

  // Deadlines Management
  async createDeadline(deadlineData) {
    return this.createContent('deadlines', {
      ...deadlineData,
      type: 'deadline'
    })
  }

  async getUpcomingDeadlines(limit = 10) {
    try {
      const deadlines = await this.getAllContent('deadlines', {
        status: 'active',
        limit,
        sortBy: 'dueDate',
        sortOrder: 'asc'
      })

      if (deadlines.success) {
        // Filter for upcoming deadlines
        const now = new Date()
        deadlines.data = deadlines.data.filter(deadline => {
          const dueDate = deadline.dueDate?.toDate?.() || new Date(deadline.dueDate)
          return dueDate >= now
        })
      }

      return deadlines
    } catch (error) {
      console.error('Error fetching upcoming deadlines:', error)
      return { success: false, error: error.message }
    }
  }

  // Syllabus Management
  async createSyllabus(syllabusData) {
    return this.createContent('syllabus', {
      ...syllabusData,
      type: 'syllabus'
    })
  }

  async getSyllabusBySpecialization(specialization, year, semester) {
    try {
      const syllabusQuery = query(
        collection(db, this.collections.syllabus),
        where('specialization', '==', specialization),
        where('year', '==', year),
        where('semester', '==', semester),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
      )

      const snapshot = await getDocs(syllabusQuery)
      const syllabus = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt
      }))

      return {
        success: true,
        data: syllabus,
        total: syllabus.length
      }
    } catch (error) {
      console.error('Error fetching syllabus:', error)
      return { success: false, error: error.message }
    }
  }

  // Subjects Management
  async createSubject(subjectData) {
    return this.createContent('subjects', {
      ...subjectData,
      type: 'subject'
    })
  }

  async getSubjectsByYearAndSemester(year, semester) {
    try {
      const subjectsQuery = query(
        collection(db, this.collections.subjects),
        where('year', '==', year),
        where('semester', '==', semester),
        where('status', '==', 'active'),
        orderBy('code', 'asc')
      )

      const snapshot = await getDocs(subjectsQuery)
      const subjects = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return {
        success: true,
        data: subjects,
        total: subjects.length
      }
    } catch (error) {
      console.error('Error fetching subjects:', error)
      return { success: false, error: error.message }
    }
  }

  // Bulk operations
  async bulkUpdateContent(contentType, ids, updateData) {
    try {
      const results = []

      for (const id of ids) {
        const result = await this.updateContent(contentType, id, updateData)
        results.push({
          id,
          success: result.success,
          error: result.error
        })
      }

      const successful = results.filter(r => r.success).length
      const failed = results.filter(r => !r.success).length

      return {
        success: true,
        message: `Updated ${successful} ${contentType}, ${failed} failed`,
        results
      }
    } catch (error) {
      console.error(`Error in bulk update for ${contentType}:`, error)
      return { success: false, error: error.message }
    }
  }

  // Content statistics
  async getContentStatistics() {
    try {
      const stats = {}

      for (const [key, collectionName] of Object.entries(this.collections)) {
        const content = await this.getAllContent(key, { limit: 1000 })
        if (content.success) {
          stats[key] = {
            total: content.data.length,
            active: content.data.filter(item => item.status === 'active').length,
            inactive: content.data.filter(item => item.status === 'inactive').length
          }
        }
      }

      return {
        success: true,
        data: stats
      }
    } catch (error) {
      console.error('Error getting content statistics:', error)
      return { success: false, error: error.message }
    }
  }

  // Export content
  async exportContent(contentType, format = 'json', filters = {}) {
    try {
      const content = await this.getAllContent(contentType, { ...filters, limit: 10000 })

      if (!content.success) {
        return content
      }

      if (format === 'csv') {
        const csvData = this.convertToCSV(content.data)
        return {
          success: true,
          data: csvData,
          format: 'csv',
          filename: `${contentType}_export_${new Date().toISOString().split('T')[0]}.csv`
        }
      }

      return {
        success: true,
        data: content.data,
        format: 'json',
        filename: `${contentType}_export_${new Date().toISOString().split('T')[0]}.json`
      }
    } catch (error) {
      console.error(`Error exporting ${contentType}:`, error)
      return { success: false, error: error.message }
    }
  }

  // Helper method to convert data to CSV
  convertToCSV(data) {
    if (!data || data.length === 0) return ''

    // Get all unique keys from the data
    const headers = [...new Set(data.flatMap(item => Object.keys(item)))]

    const csvRows = [headers.join(',')]

    data.forEach(item => {
      const row = headers.map(header => {
        const value = item[header]
        if (value === null || value === undefined) return ''
        if (typeof value === 'object' && value.toDate) return value.toDate().toISOString()
        return String(value)
      })
      csvRows.push(row.map(field => `"${field}"`).join(','))
    })

    return csvRows.join('\n')
  }
}

export default new ContentController()