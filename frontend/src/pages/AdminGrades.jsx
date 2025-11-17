import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore'
import Header from '../components/Header'
import Footer from '../components/Footer'
import firebaseService from '../utils/firebaseService'

export default function AdminGrades() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [grades, setGrades] = useState([])
  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])

  // Form states
  const [gradeForm, setGradeForm] = useState({
    studentId: '',
    subjectId: '',
    subjectName: '',
    semester: '1',
    year: '1',
    academicYear: '2024-25',
    internalMarks: '',
    externalMarks: '',
    grade: '',
    credits: ''
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

      // Load grades with filters
      let gradesQuery = collection(db, 'grades')

      if (filters.studentId) {
        gradesQuery = query(gradesQuery, where('studentId', '==', filters.studentId))
      }
      if (filters.semester) {
        gradesQuery = query(gradesQuery, where('semester', '==', parseInt(filters.semester)))
      }
      if (filters.year) {
        gradesQuery = query(gradesQuery, where('year', '==', parseInt(filters.year)))
      }
      if (filters.subjectId) {
        gradesQuery = query(gradesQuery, where('subjectId', '==', filters.subjectId))
      }

      gradesQuery = query(gradesQuery, orderBy('createdAt', 'desc'))

      const gradesSnapshot = await getDocs(gradesQuery)
      const gradesData = gradesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      // Load students
      const studentsSnapshot = await getDocs(collection(db, 'users'))
      const studentsData = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      // Load subjects
      const subjectsSnapshot = await getDocs(collection(db, 'subjects'))
      const subjectsData = subjectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      setGrades(gradesData)
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

  const calculateGrade = (internalMarks, externalMarks) => {
    const total = parseFloat(internalMarks || 0) + parseFloat(externalMarks || 0)
    if (total >= 90) return 'A+'
    if (total >= 80) return 'A'
    if (total >= 70) return 'B+'
    if (total >= 60) return 'B'
    if (total >= 50) return 'C'
    return 'F'
  }

  const calculateGradePoint = (grade) => {
    const gradePoints = { 'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C': 6, 'F': 0 }
    return gradePoints[grade] || 0
  }

  const handleGradeSubmit = async (e) => {
    e.preventDefault()

    try {
      const internalMarks = parseFloat(gradeForm.internalMarks)
      const externalMarks = parseFloat(gradeForm.externalMarks)
      const totalMarks = internalMarks + externalMarks
      const grade = calculateGrade(internalMarks, externalMarks)
      const gradePoint = calculateGradePoint(grade)

      const gradeData = {
        ...gradeForm,
        internalMarks,
        externalMarks,
        totalMarks,
        grade,
        gradePoint,
        credits: parseFloat(gradeForm.credits),
        semester: parseInt(gradeForm.semester),
        year: parseInt(gradeForm.year)
      }

      await firebaseService.addStudentGrade(gradeData)

      setGradeForm({
        studentId: '',
        subjectId: '',
        subjectName: '',
        semester: '1',
        year: '1',
        academicYear: '2024-25',
        internalMarks: '',
        externalMarks: '',
        grade: '',
        credits: ''
      })

      alert('Grade added successfully!')
      await loadData()
    } catch (error) {
      console.error('Error adding grade:', error)
      alert('Error adding grade. Please try again.')
    }
  }

  const updateGrade = async (gradeId, updatedData) => {
    try {
      await updateDoc(doc(db, 'grades', gradeId), {
        ...updatedData,
        updatedAt: new Date()
      })
      await loadData()
    } catch (error) {
      console.error('Error updating grade:', error)
    }
  }

  const deleteGrade = async (gradeId) => {
    if (window.confirm('Are you sure you want to delete this grade?')) {
      try {
        await deleteDoc(doc(db, 'grades', gradeId))
        await loadData()
      } catch (error) {
        console.error('Error deleting grade:', error)
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
          <p>Loading grades...</p>
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
              <h1 className="text-4xl font-black mb-2">📊 Grades Management</h1>
              <p className="text-xl text-gray-600">Manage student academic performance and grades</p>
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
          <h2 className="text-2xl font-bold mb-4">🔍 Filter Grades</h2>
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

        {/* Add Grade Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">➕ Add New Grade</h2>
          <form onSubmit={handleGradeSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <select
                value={gradeForm.studentId}
                onChange={(e) => setGradeForm({...gradeForm, studentId: e.target.value})}
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
                value={gradeForm.subjectId}
                onChange={(e) => {
                  const subject = subjects.find(s => s.id === e.target.value)
                  setGradeForm({
                    ...gradeForm,
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
                value={gradeForm.semester}
                onChange={(e) => setGradeForm({...gradeForm, semester: e.target.value})}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
              </select>

              <select
                value={gradeForm.year}
                onChange={(e) => setGradeForm({...gradeForm, year: e.target.value})}
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
                value={gradeForm.academicYear}
                onChange={(e) => setGradeForm({...gradeForm, academicYear: e.target.value})}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                required
              />

              <input
                type="number"
                placeholder="Credits"
                value={gradeForm.credits}
                onChange={(e) => setGradeForm({...gradeForm, credits: e.target.value})}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                min="1"
                max="6"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Internal Marks (40)</label>
                <input
                  type="number"
                  value={gradeForm.internalMarks}
                  onChange={(e) => setGradeForm({...gradeForm, internalMarks: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                  min="0"
                  max="40"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">External Marks (60)</label>
                <input
                  type="number"
                  value={gradeForm.externalMarks}
                  onChange={(e) => setGradeForm({...gradeForm, externalMarks: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                  min="0"
                  max="60"
                  required
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                >
                  ➕ Add Grade
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Grades List */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">📋 Grades List ({grades.length})</h2>

          <div className="space-y-4">
            {grades.length > 0 ? grades.map((grade) => (
              <div key={grade.id} className="p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <h3 className="font-bold text-gray-800">{getStudentName(grade.studentId)}</h3>
                    <p className="text-sm text-gray-600">ID: {grade.studentId}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800">{grade.subjectName}</h4>
                    <p className="text-sm text-gray-600">Sem {grade.semester}, Year {grade.year}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Internal</p>
                        <p className="font-bold">{grade.internalMarks}/40</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">External</p>
                        <p className="font-bold">{grade.externalMarks}/60</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="font-bold">{grade.totalMarks}/100</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <span className={`inline-block px-4 py-2 rounded-full text-lg font-bold ${
                        grade.grade === 'A+' || grade.grade === 'A' ? 'bg-green-100 text-green-800' :
                        grade.grade === 'B+' || grade.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                        grade.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {grade.grade} ({grade.gradePoint} GP)
                      </span>
                      <p className="text-sm text-gray-600 mt-1">{grade.credits} Credits</p>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateGrade(grade.id, { ...grade, grade: grade.grade === 'A+' ? 'A' : 'A+' })}
                        className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteGrade(grade.id)}
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
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-2">No Grades Found</h3>
                <p className="text-gray-600">Add grades using the form above.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}