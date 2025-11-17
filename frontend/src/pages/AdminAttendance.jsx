import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore'
import Header from '../components/Header'
import Footer from '../components/Footer'
import firebaseService from '../utils/firebaseService'

export default function AdminAttendance() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [attendance, setAttendance] = useState([])
  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])

  // Form states
  const [attendanceForm, setAttendanceForm] = useState({
    studentId: '',
    subjectId: '',
    subjectName: '',
    semester: '1',
    year: '1',
    academicYear: '2024-25',
    totalClasses: '',
    attendedClasses: '',
    records: []
  })

  // Filters
  const [filters, setFilters] = useState({
    studentId: '',
    semester: '',
    year: '',
    subjectId: ''
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        await checkAdminStatus(currentUser)
      } else {
        navigate('/auth/login')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  const checkAdminStatus = async (currentUser) => {
    try {
      if (currentUser?.email?.includes('admin')) {
        setIsAdmin(true)
        await loadData()
      } else {
        alert('Access denied. Admin privileges required.')
        navigate('/')
      }
    } catch (error) {
      console.error('Error checking admin status:', error)
      navigate('/')
    }
  }

  const loadData = async () => {
    try {
      setLoading(true)

      // Load attendance with filters
      let attendanceQuery = collection(db, 'attendance')

      if (filters.studentId) {
        attendanceQuery = query(attendanceQuery, where('studentId', '==', filters.studentId))
      }
      if (filters.semester) {
        attendanceQuery = query(attendanceQuery, where('semester', '==', parseInt(filters.semester)))
      }
      if (filters.year) {
        attendanceQuery = query(attendanceQuery, where('year', '==', parseInt(filters.year)))
      }
      if (filters.subjectId) {
        attendanceQuery = query(attendanceQuery, where('subjectId', '==', filters.subjectId))
      }

      attendanceQuery = query(attendanceQuery, orderBy('createdAt', 'desc'))

      const attendanceSnapshot = await getDocs(attendanceQuery)
      const attendanceData = attendanceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      // Load students
      const studentsSnapshot = await getDocs(collection(db, 'users'))
      const studentsData = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      // Load subjects
      const subjectsSnapshot = await getDocs(collection(db, 'subjects'))
      const subjectsData = subjectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      setAttendance(attendanceData)
      setStudents(studentsData)
      setSubjects(subjectsData)

    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAdmin) {
      loadData()
    }
  }, [filters, isAdmin])

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault()

    try {
      const totalClasses = parseInt(attendanceForm.totalClasses)
      const attendedClasses = parseInt(attendanceForm.attendedClasses)
      const attendancePercentage = totalClasses > 0 ? ((attendedClasses / totalClasses) * 100).toFixed(2) : 0

      const attendanceData = {
        ...attendanceForm,
        totalClasses,
        attendedClasses,
        attendancePercentage: parseFloat(attendancePercentage),
        semester: parseInt(attendanceForm.semester),
        year: parseInt(attendanceForm.year)
      }

      await firebaseService.updateAttendance('new', attendanceData)

      setAttendanceForm({
        studentId: '',
        subjectId: '',
        subjectName: '',
        semester: '1',
        year: '1',
        academicYear: '2024-25',
        totalClasses: '',
        attendedClasses: '',
        records: []
      })

      alert('Attendance record added successfully!')
      await loadData()
    } catch (error) {
      console.error('Error adding attendance:', error)
      alert('Error adding attendance record. Please try again.')
    }
  }

  const updateAttendance = async (attendanceId, updatedData) => {
    try {
      await firebaseService.updateAttendance(attendanceId, updatedData)
      await loadData()
    } catch (error) {
      console.error('Error updating attendance:', error)
    }
  }

  const deleteAttendance = async (attendanceId) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      try {
        await deleteDoc(doc(db, 'attendance', attendanceId))
        await loadData()
      } catch (error) {
        console.error('Error deleting attendance:', error)
      }
    }
  }

  const getStudentName = (studentId) => {
    const student = students.find(s => s.uid === studentId)
    return student ? `${student.firstName || ''} ${student.lastName || ''}`.trim() || student.displayName || student.email : 'Unknown Student'
  }

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId)
    return subject ? subject.name : 'Unknown Subject'
  }

  const getAttendanceColor = (percentage) => {
    if (percentage >= 85) return 'text-green-600 bg-green-100'
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading attendance...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header user={user} />

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black mb-2">📅 Attendance Management</h1>
              <p className="text-xl text-gray-600">Track and manage student attendance records</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition"
              >
                ← Back to Admin
              </button>
              <button
                onClick={loadData}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">🔍 Filter Attendance Records</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={filters.studentId}
              onChange={(e) => setFilters({...filters, studentId: e.target.value})}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
            >
              <option value="">All Students</option>
              {students.map(student => (
                <option key={student.uid} value={student.uid}>
                  {student.firstName} {student.lastName} ({student.studentId})
                </option>
              ))}
            </select>

            <select
              value={filters.semester}
              onChange={(e) => setFilters({...filters, semester: e.target.value})}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
            >
              <option value="">All Semesters</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>

            <select
              value={filters.year}
              onChange={(e) => setFilters({...filters, year: e.target.value})}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
            >
              <option value="">All Years</option>
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>
              <option value="4">Year 4</option>
            </select>

            <select
              value={filters.subjectId}
              onChange={(e) => setFilters({...filters, subjectId: e.target.value})}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
            >
              <option value="">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Attendance Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">➕ Add Attendance Record</h2>
          <form onSubmit={handleAttendanceSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <select
                value={attendanceForm.studentId}
                onChange={(e) => setAttendanceForm({...attendanceForm, studentId: e.target.value})}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">Select Student</option>
                {students.map(student => (
                  <option key={student.uid} value={student.uid}>
                    {student.firstName} {student.lastName} ({student.studentId})
                  </option>
                ))}
              </select>

              <select
                value={attendanceForm.subjectId}
                onChange={(e) => {
                  const subject = subjects.find(s => s.id === e.target.value)
                  setAttendanceForm({
                    ...attendanceForm,
                    subjectId: e.target.value,
                    subjectName: subject ? subject.name : ''
                  })
                }}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>

              <select
                value={attendanceForm.semester}
                onChange={(e) => setAttendanceForm({...attendanceForm, semester: e.target.value})}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
              </select>

              <select
                value={attendanceForm.year}
                onChange={(e) => setAttendanceForm({...attendanceForm, year: e.target.value})}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
              </select>

              <input
                type="text"
                placeholder="Academic Year (e.g., 2024-25)"
                value={attendanceForm.academicYear}
                onChange={(e) => setAttendanceForm({...attendanceForm, academicYear: e.target.value})}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                required
              />

              <input
                type="number"
                placeholder="Total Classes"
                value={attendanceForm.totalClasses}
                onChange={(e) => setAttendanceForm({...attendanceForm, totalClasses: e.target.value})}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                min="1"
                required
              />

              <input
                type="number"
                placeholder="Attended Classes"
                value={attendanceForm.attendedClasses}
                onChange={(e) => setAttendanceForm({...attendanceForm, attendedClasses: e.target.value})}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                min="0"
                required
              />

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                >
                  ➕ Add Attendance
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Attendance List */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">📋 Attendance Records ({attendance.length})</h2>

          <div className="space-y-4">
            {attendance.length > 0 ? attendance.map((record) => (
              <div key={record.id} className="p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <h3 className="font-bold text-gray-800">{getStudentName(record.studentId)}</h3>
                    <p className="text-sm text-gray-600">ID: {record.studentId}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800">{record.subjectName}</h4>
                    <p className="text-sm text-gray-600">Sem {record.semester}, Year {record.year}</p>
                    <p className="text-sm text-gray-600">{record.academicYear}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Total Classes</p>
                        <p className="font-bold">{record.totalClasses}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Attended</p>
                        <p className="font-bold text-green-600">{record.attendedClasses}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <span className={`inline-block px-4 py-2 rounded-full text-lg font-bold ${getAttendanceColor(record.attendancePercentage)}`}>
                        {record.attendancePercentage}%
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        {record.attendancePercentage >= 85 ? 'Excellent' :
                         record.attendancePercentage >= 75 ? 'Good' :
                         'Needs Improvement'}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateAttendance(record.id, { ...record, attendedClasses: record.attendedClasses + 1 })}
                        className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        title="Mark present"
                      >
                        ✅
                      </button>
                      <button
                        onClick={() => updateAttendance(record.id, { ...record, totalClasses: record.totalClasses + 1 })}
                        className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        title="Add class"
                      >
                        ➕
                      </button>
                      <button
                        onClick={() => deleteAttendance(record.id)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-bold mb-2">No Attendance Records</h3>
                <p className="text-gray-600">Add attendance records using the form above.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}