// Academic Management Controller
// Handles grades, attendance, and academic performance data

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

class AcademicController {
  constructor() {
    this.collections = {
      grades: 'grades',
      attendance: 'attendance',
      academicRecords: 'academicRecords'
    }
  }

  // Grades Management
  async createGrade(gradeData) {
    try {
      const gradeDoc = {
        ...gradeData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        status: gradeData.status || 'active'
      }

      const docRef = await addDoc(collection(db, this.collections.grades), gradeDoc)

      return {
        success: true,
        message: 'Grade created successfully',
        data: { id: docRef.id, ...gradeDoc }
      }
    } catch (error) {
      console.error('Error creating grade:', error)
      return { success: false, error: error.message }
    }
  }

  async getStudentGrades(studentId, options = {}) {
    try {
      const { year, semester, subject } = options

      let queryRef = query(
        collection(db, this.collections.grades),
        where('studentId', '==', studentId),
        orderBy('createdAt', 'desc')
      )

      if (year) {
        queryRef = query(queryRef, where('year', '==', year))
      }

      if (semester) {
        queryRef = query(queryRef, where('semester', '==', semester))
      }

      if (subject) {
        queryRef = query(queryRef, where('subjectCode', '==', subject))
      }

      const snapshot = await getDocs(queryRef)
      const grades = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt
      }))

      return {
        success: true,
        data: grades,
        total: grades.length
      }
    } catch (error) {
      console.error('Error fetching student grades:', error)
      return { success: false, error: error.message }
    }
  }

  async updateGrade(gradeId, updateData) {
    try {
      const gradeRef = doc(db, this.collections.grades, gradeId)
      const updatedData = {
        ...updateData,
        updatedAt: Timestamp.now()
      }

      await updateDoc(gradeRef, updatedData)

      return {
        success: true,
        message: 'Grade updated successfully',
        data: updatedData
      }
    } catch (error) {
      console.error('Error updating grade:', error)
      return { success: false, error: error.message }
    }
  }

  async calculateGPA(studentId, year = null, semester = null) {
    try {
      const grades = await this.getStudentGrades(studentId, { year, semester })

      if (!grades.success || grades.data.length === 0) {
        return { success: true, gpa: 0, totalCredits: 0, message: 'No grades found' }
      }

      let totalPoints = 0
      let totalCredits = 0

      grades.data.forEach(grade => {
        const credits = grade.credits || 0
        const gradePoint = this.gradeToPoint(grade.grade)

        totalPoints += gradePoint * credits
        totalCredits += credits
      })

      const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0

      return {
        success: true,
        gpa: parseFloat(gpa),
        totalCredits,
        totalSubjects: grades.data.length
      }
    } catch (error) {
      console.error('Error calculating GPA:', error)
      return { success: false, error: error.message }
    }
  }

  // Helper method to convert grade to points
  gradeToPoint(grade) {
    const gradeMap = {
      'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5,
      'D': 4, 'F': 0, 'O': 10, 'E': 9, 'A-': 8.5, 'B-': 7.5, 'C-': 5.5
    }
    return gradeMap[grade] || 0
  }

  // Attendance Management
  async createAttendance(attendanceData) {
    try {
      const attendanceDoc = {
        ...attendanceData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        status: attendanceData.status || 'present'
      }

      const docRef = await addDoc(collection(db, this.collections.attendance), attendanceDoc)

      return {
        success: true,
        message: 'Attendance recorded successfully',
        data: { id: docRef.id, ...attendanceDoc }
      }
    } catch (error) {
      console.error('Error creating attendance:', error)
      return { success: false, error: error.message }
    }
  }

  async getStudentAttendance(studentId, options = {}) {
    try {
      const { subject, month, year } = options

      let queryRef = query(
        collection(db, this.collections.attendance),
        where('studentId', '==', studentId),
        orderBy('date', 'desc')
      )

      if (subject) {
        queryRef = query(queryRef, where('subjectCode', '==', subject))
      }

      const snapshot = await getDocs(queryRef)
      let attendance = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate?.() || doc.data().date
      }))

      // Filter by month/year if specified
      if (month || year) {
        attendance = attendance.filter(record => {
          const recordDate = new Date(record.date)
          const recordMonth = recordDate.getMonth() + 1
          const recordYear = recordDate.getFullYear()

          return (!month || recordMonth === parseInt(month)) &&
                 (!year || recordYear === parseInt(year))
        })
      }

      return {
        success: true,
        data: attendance,
        total: attendance.length
      }
    } catch (error) {
      console.error('Error fetching student attendance:', error)
      return { success: false, error: error.message }
    }
  }

  async calculateAttendancePercentage(studentId, subject = null, month = null, year = null) {
    try {
      const attendance = await this.getStudentAttendance(studentId, { subject, month, year })

      if (!attendance.success) {
        return attendance
      }

      const totalClasses = attendance.data.length
      const presentClasses = attendance.data.filter(record => record.status === 'present').length
      const percentage = totalClasses > 0 ? ((presentClasses / totalClasses) * 100).toFixed(2) : 0

      return {
        success: true,
        percentage: parseFloat(percentage),
        totalClasses,
        presentClasses,
        absentClasses: totalClasses - presentClasses
      }
    } catch (error) {
      console.error('Error calculating attendance percentage:', error)
      return { success: false, error: error.message }
    }
  }

  async updateAttendance(attendanceId, updateData) {
    try {
      const attendanceRef = doc(db, this.collections.attendance, attendanceId)
      const updatedData = {
        ...updateData,
        updatedAt: Timestamp.now()
      }

      await updateDoc(attendanceRef, updatedData)

      return {
        success: true,
        message: 'Attendance updated successfully',
        data: updatedData
      }
    } catch (error) {
      console.error('Error updating attendance:', error)
      return { success: false, error: error.message }
    }
  }

  // Bulk attendance operations
  async bulkCreateAttendance(attendanceRecords) {
    try {
      const results = []

      for (const record of attendanceRecords) {
        const result = await this.createAttendance(record)
        results.push({
          studentId: record.studentId,
          success: result.success,
          error: result.error,
          id: result.data?.id
        })
      }

      const successful = results.filter(r => r.success).length
      const failed = results.filter(r => !r.success).length

      return {
        success: true,
        message: `Created attendance for ${successful} students, ${failed} failed`,
        results
      }
    } catch (error) {
      console.error('Error in bulk attendance creation:', error)
      return { success: false, error: error.message }
    }
  }

  // Academic Records Management
  async createAcademicRecord(recordData) {
    try {
      const recordDoc = {
        ...recordData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      }

      const docRef = await addDoc(collection(db, this.collections.academicRecords), recordDoc)

      return {
        success: true,
        message: 'Academic record created successfully',
        data: { id: docRef.id, ...recordDoc }
      }
    } catch (error) {
      console.error('Error creating academic record:', error)
      return { success: false, error: error.message }
    }
  }

  async getStudentAcademicRecord(studentId) {
    try {
      const queryRef = query(
        collection(db, this.collections.academicRecords),
        where('studentId', '==', studentId),
        orderBy('year', 'desc'),
        orderBy('semester', 'desc')
      )

      const snapshot = await getDocs(queryRef)
      const records = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return {
        success: true,
        data: records,
        total: records.length
      }
    } catch (error) {
      console.error('Error fetching academic records:', error)
      return { success: false, error: error.message }
    }
  }

  async updateAcademicRecord(recordId, updateData) {
    try {
      const recordRef = doc(db, this.collections.academicRecords, recordId)
      const updatedData = {
        ...updateData,
        updatedAt: Timestamp.now()
      }

      await updateDoc(recordRef, updatedData)

      return {
        success: true,
        message: 'Academic record updated successfully',
        data: updatedData
      }
    } catch (error) {
      console.error('Error updating academic record:', error)
      return { success: false, error: error.message }
    }
  }

  // Analytics and Reporting
  async getAcademicStatistics(options = {}) {
    try {
      const { year, semester, department } = options

      // Get all grades
      let gradesQuery = collection(db, this.collections.grades)
      if (year) {
        gradesQuery = query(gradesQuery, where('year', '==', year))
      }
      if (semester) {
        gradesQuery = query(gradesQuery, where('semester', '==', semester))
      }

      const gradesSnapshot = await getDocs(gradesQuery)
      const grades = gradesSnapshot.docs.map(doc => doc.data())

      // Get all attendance
      let attendanceQuery = collection(db, this.collections.attendance)
      if (year) {
        attendanceQuery = query(attendanceQuery, where('year', '==', year))
      }
      if (semester) {
        attendanceQuery = query(attendanceQuery, where('semester', '==', semester))
      }

      const attendanceSnapshot = await getDocs(attendanceQuery)
      const attendance = attendanceSnapshot.docs.map(doc => doc.data())

      // Calculate statistics
      const stats = {
        totalStudents: new Set(grades.map(g => g.studentId)).size,
        totalGrades: grades.length,
        totalAttendance: attendance.length,
        gradeDistribution: {},
        attendanceRate: 0,
        averageGPA: 0
      }

      // Grade distribution
      grades.forEach(grade => {
        stats.gradeDistribution[grade.grade] = (stats.gradeDistribution[grade.grade] || 0) + 1
      })

      // Attendance rate
      if (attendance.length > 0) {
        const presentCount = attendance.filter(a => a.status === 'present').length
        stats.attendanceRate = ((presentCount / attendance.length) * 100).toFixed(2)
      }

      // Average GPA calculation
      const studentGPAs = []
      const students = [...new Set(grades.map(g => g.studentId))]

      for (const studentId of students) {
        const studentGrades = grades.filter(g => g.studentId === studentId)
        if (studentGrades.length > 0) {
          const gpa = await this.calculateGPA(studentId, year, semester)
          if (gpa.success) {
            studentGPAs.push(gpa.gpa)
          }
        }
      }

      if (studentGPAs.length > 0) {
        stats.averageGPA = (studentGPAs.reduce((sum, gpa) => sum + gpa, 0) / studentGPAs.length).toFixed(2)
      }

      return {
        success: true,
        data: stats
      }
    } catch (error) {
      console.error('Error getting academic statistics:', error)
      return { success: false, error: error.message }
    }
  }

  // Export academic data
  async exportAcademicData(type, format = 'json', filters = {}) {
    try {
      let data = []

      if (type === 'grades') {
        const grades = await this.getStudentGrades(filters.studentId, filters)
        if (grades.success) data = grades.data
      } else if (type === 'attendance') {
        const attendance = await this.getStudentAttendance(filters.studentId, filters)
        if (attendance.success) data = attendance.data
      } else if (type === 'records') {
        const records = await this.getStudentAcademicRecord(filters.studentId)
        if (records.success) data = records.data
      }

      if (format === 'csv') {
        const csvData = this.convertToCSV(data)
        return {
          success: true,
          data: csvData,
          format: 'csv',
          filename: `${type}_export_${new Date().toISOString().split('T')[0]}.csv`
        }
      }

      return {
        success: true,
        data,
        format: 'json',
        filename: `${type}_export_${new Date().toISOString().split('T')[0]}.json`
      }
    } catch (error) {
      console.error(`Error exporting ${type}:`, error)
      return { success: false, error: error.message }
    }
  }

  // Helper method to convert data to CSV
  convertToCSV(data) {
    if (!data || data.length === 0) return ''

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

export default new AcademicController()