import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { doc, getDoc, updateDoc, collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'
import Header from '../components/Header'
import Footer from '../components/Footer'
import firebaseService from '../utils/firebaseService'

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')

  // Form states
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: ''
    }
  })

  const [academicInfo, setAcademicInfo] = useState({
    studentId: '',
    enrollmentYear: '',
    currentYear: '',
    currentSemester: '',
    specialization: '',
    department: ''
  })

  // Academic data states
  const [grades, setGrades] = useState([])
  const [attendance, setAttendance] = useState([])
  const [assignments, setAssignments] = useState([])
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        await loadUserData(currentUser.uid)
      } else {
        navigate('/auth/login')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  const loadUserData = async (userId) => {
    try {
      setLoading(true)

      // Load user profile
      const profileData = await firebaseService.getUserProfile(userId)
      if (profileData) {
        setUserData(profileData)

        // Populate form data
        setPersonalInfo({
          firstName: profileData.firstName || '',
          lastName: profileData.lastName || '',
          dateOfBirth: profileData.dateOfBirth?.toDate?.()?.toISOString().split('T')[0] || '',
          gender: profileData.gender || '',
          phoneNumber: profileData.phoneNumber || '',
          address: profileData.address || {
            street: '',
            city: '',
            state: '',
            pincode: '',
            country: ''
          }
        })

        setAcademicInfo({
          studentId: profileData.studentId || '',
          enrollmentYear: profileData.enrollmentYear || '',
          currentYear: profileData.currentYear || '',
          currentSemester: profileData.currentSemester || '',
          specialization: profileData.specialization || '',
          department: profileData.department || ''
        })
      }

      // Load academic data
      await Promise.all([
        loadGrades(userId),
        loadAttendance(userId),
        loadAssignments(userId),
        loadNotifications(userId)
      ])

    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadGrades = async (userId) => {
    try {
      const gradesData = await firebaseService.getStudentGrades(userId)
      setGrades(gradesData)
    } catch (error) {
      console.error('Error loading grades:', error)
    }
  }

  const loadAttendance = async (userId) => {
    try {
      const attendanceData = await firebaseService.getStudentAttendance(userId)
      setAttendance(attendanceData)
    } catch (error) {
      console.error('Error loading attendance:', error)
    }
  }

  const loadAssignments = async (userId) => {
    try {
      const assignmentsData = await firebaseService.getAssignments(null, userId)
      setAssignments(assignmentsData)
    } catch (error) {
      console.error('Error loading assignments:', error)
    }
  }

  const loadNotifications = async (userId) => {
    try {
      const notificationsData = await firebaseService.getUserNotifications(userId)
      setNotifications(notificationsData)
    } catch (error) {
      console.error('Error loading notifications:', error)
    }
  }

  const handlePersonalInfoUpdate = async (e) => {
    e.preventDefault()
    if (!user) return

    try {
      setSaving(true)
      await firebaseService.updateUserProfile(user.uid, {
        ...personalInfo,
        displayName: `${personalInfo.firstName} ${personalInfo.lastName}`.trim()
      })

      // Update Firebase Auth display name
      await updateProfile(user, {
        displayName: `${personalInfo.firstName} ${personalInfo.lastName}`.trim()
      })

      alert('Personal information updated successfully!')
      await loadUserData(user.uid)
    } catch (error) {
      console.error('Error updating personal info:', error)
      alert('Error updating personal information. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleAcademicInfoUpdate = async (e) => {
    e.preventDefault()
    if (!user) return

    try {
      setSaving(true)
      await firebaseService.updateUserProfile(user.uid, academicInfo)
      alert('Academic information updated successfully!')
      await loadUserData(user.uid)
    } catch (error) {
      console.error('Error updating academic info:', error)
      alert('Error updating academic information. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file || !user) return

    // Validate file size (max 200KB for ultra-fast upload)
    if (file.size > 200 * 1024) {
      showToast('File size must be less than 200KB', 'error')
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file', 'error')
      return
    }

    try {
      setSaving(true)

      // Show immediate feedback - update UI first
      const profileImg = document.querySelector('img[alt="Profile"]')
      if (profileImg) {
        // Create a temporary preview using FileReader
        const reader = new FileReader()
        reader.onload = (e) => {
          profileImg.src = e.target.result
        }
        reader.readAsDataURL(file)
      }

      // Ultra-fast upload - direct Firebase Storage
      const storageRef = ref(storage, `profile-photos/${user.uid}/${Date.now()}`)
      const uploadTask = uploadBytes(storageRef, file, { contentType: file.type })

      // Wait for upload and get URL simultaneously
      const [snapshot] = await Promise.all([uploadTask])
      const downloadURL = await getDownloadURL(snapshot.ref)

      // Update profile and auth in parallel
      await Promise.all([
        firebaseService.updateUserProfile(user.uid, { photoURL: downloadURL }),
        updateProfile(user, { photoURL: downloadURL })
      ])

      // Update image source immediately
      if (profileImg) {
        profileImg.src = downloadURL
      }

      showToast('✅ Done!', 'success')

    } catch (error) {
      console.error('Upload error:', error)
      showToast('❌ Failed', 'error')

      // Revert immediately
      const profileImg = document.querySelector('img[alt="Profile"]')
      if (profileImg) {
        profileImg.src = user?.photoURL || userData?.photoURL || '/default-avatar.png'
      }
    } finally {
      setSaving(false)
    }
  }

  // Ultra-fast toast notification function
  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div')
    toast.className = `fixed top-4 right-4 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in font-medium`
    toast.textContent = message
    document.body.appendChild(toast)
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast)
      }
    }, 2000)
  }

  const markNotificationAsRead = async (notificationId) => {
    try {
      await firebaseService.markNotificationAsRead(notificationId)
      await loadNotifications(user?.uid)
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const calculateCGPA = () => {
    if (grades.length === 0) return 0

    const totalCredits = grades.reduce((sum, grade) => sum + (grade.credits || 0), 0)
    const weightedSum = grades.reduce((sum, grade) => sum + (grade.gradePoint * grade.credits), 0)

    return totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : 0
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center overflow-hidden">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Profile...</h2>
          <p className="text-gray-600">Please wait while we load your information</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden overflow-x-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Header user={user} />

      <div className="container mx-auto px-6 py-8 max-w-7xl relative z-10">
        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 mb-8 animate-fade-in border border-white/20">
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <img
                src={user?.photoURL || userData?.photoURL || '/default-avatar.png'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white/30 shadow-xl group-hover:border-blue-400 transition-all duration-300"
              />
              <label className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-3 cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={saving}
                  multiple={false}
                />
              </label>
              {saving && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {userData?.firstName && userData?.lastName
                  ? `${userData.firstName} ${userData.lastName}`
                  : user?.displayName || user?.email}
              </h1>
              <p className="text-white/80">{userData?.studentId || 'Student'}</p>
              <div className="flex items-center space-x-4 mt-4">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white/30">
                  🎓 Year {userData?.currentYear || 'N/A'}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white/30">
                  💼 {userData?.specialization || 'Specialization'}
                </span>
                <button
                  onClick={() => navigate('/premium-benefits')}
                  className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-sm font-bold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-yellow-400"
                >
                  ⭐ Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-4 shadow-2xl border border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { id: 'personal', label: '👤 Personal Info', desc: 'Update your details' },
                { id: 'academic', label: '🎓 Academic Info', desc: 'Education details' },
                { id: 'grades', label: '📊 Grades', desc: 'Academic performance' },
                { id: 'attendance', label: '📅 Attendance', desc: 'Class attendance' },
                { id: 'assignments', label: '📝 Assignments', desc: 'Tasks & submissions' },
                { id: 'notifications', label: '🔔 Notifications', desc: 'Important updates' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl animate-pulse border border-blue-400'
                      : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:shadow-lg'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{tab.label.split(' ')[0]}</div>
                    <div className="text-sm font-semibold">{tab.label.split(' ').slice(1).join(' ')}</div>
                    <div className={`text-xs mt-1 ${activeTab === tab.id ? 'text-blue-100' : 'text-white/70'}`}>
                      {tab.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 animate-slide-up border border-white/20">
          {activeTab === 'personal' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">👤 Personal Information</h2>
              <form onSubmit={handlePersonalInfoUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">First Name</label>
                    <input
                      type="text"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Last Name</label>
                    <input
                      type="text"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={personalInfo.dateOfBirth}
                      onChange={(e) => setPersonalInfo({...personalInfo, dateOfBirth: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Gender</label>
                    <select
                      value={personalInfo.gender}
                      onChange={(e) => setPersonalInfo({...personalInfo, gender: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white focus:border-blue-400 focus:outline-none"
                    >
                      <option value="" className="bg-gray-800">Select Gender</option>
                      <option value="Male" className="bg-gray-800">Male</option>
                      <option value="Female" className="bg-gray-800">Female</option>
                      <option value="Other" className="bg-gray-800">Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={personalInfo.phoneNumber}
                      onChange={(e) => setPersonalInfo({...personalInfo, phoneNumber: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:outline-none"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div className="border-t border-white/20 pt-6">
                  <h3 className="text-xl font-bold mb-4 text-white">Address Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-white mb-2">Street Address</label>
                      <input
                        type="text"
                        value={personalInfo.address.street}
                        onChange={(e) => setPersonalInfo({
                          ...personalInfo,
                          address: {...personalInfo.address, street: e.target.value}
                        })}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">City</label>
                      <input
                        type="text"
                        value={personalInfo.address.city}
                        onChange={(e) => setPersonalInfo({
                          ...personalInfo,
                          address: {...personalInfo.address, city: e.target.value}
                        })}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">State</label>
                      <input
                        type="text"
                        value={personalInfo.address.state}
                        onChange={(e) => setPersonalInfo({
                          ...personalInfo,
                          address: {...personalInfo.address, state: e.target.value}
                        })}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Pincode</label>
                      <input
                        type="text"
                        value={personalInfo.address.pincode}
                        onChange={(e) => setPersonalInfo({
                          ...personalInfo,
                          address: {...personalInfo.address, pincode: e.target.value}
                        })}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Country</label>
                      <input
                        type="text"
                        value={personalInfo.address.country}
                        onChange={(e) => setPersonalInfo({
                          ...personalInfo,
                          address: {...personalInfo.address, country: e.target.value}
                        })}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:outline-none"
                        defaultValue="India"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 border border-blue-400"
                  >
                    {saving ? 'Saving...' : '💾 Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'academic' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">🎓 Academic Information</h2>
              <form onSubmit={handleAcademicInfoUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Student ID</label>
                    <input
                      type="text"
                      value={academicInfo.studentId}
                      onChange={(e) => setAcademicInfo({...academicInfo, studentId: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:outline-none"
                      placeholder="CS123456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Enrollment Year</label>
                    <input
                      type="number"
                      value={academicInfo.enrollmentYear}
                      onChange={(e) => setAcademicInfo({...academicInfo, enrollmentYear: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:outline-none"
                      placeholder="2021"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Current Year</label>
                    <select
                      value={academicInfo.currentYear}
                      onChange={(e) => setAcademicInfo({...academicInfo, currentYear: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white focus:border-blue-400 focus:outline-none"
                    >
                      <option value="" className="bg-gray-800">Select Year</option>
                      <option value="1" className="bg-gray-800">1st Year</option>
                      <option value="2" className="bg-gray-800">2nd Year</option>
                      <option value="3" className="bg-gray-800">3rd Year</option>
                      <option value="4" className="bg-gray-800">4th Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Current Semester</label>
                    <select
                      value={academicInfo.currentSemester}
                      onChange={(e) => setAcademicInfo({...academicInfo, currentSemester: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white focus:border-blue-400 focus:outline-none"
                    >
                      <option value="" className="bg-gray-800">Select Semester</option>
                      {academicInfo.currentYear === '1' && (
                        <>
                          <option value="1" className="bg-gray-800">1st Semester</option>
                          <option value="2" className="bg-gray-800">2nd Semester</option>
                        </>
                      )}
                      {academicInfo.currentYear === '2' && (
                        <>
                          <option value="3" className="bg-gray-800">3rd Semester</option>
                          <option value="4" className="bg-gray-800">4th Semester</option>
                        </>
                      )}
                      {academicInfo.currentYear === '3' && (
                        <>
                          <option value="5" className="bg-gray-800">5th Semester</option>
                          <option value="6" className="bg-gray-800">6th Semester</option>
                        </>
                      )}
                      {academicInfo.currentYear === '4' && (
                        <>
                          <option value="7" className="bg-gray-800">7th Semester</option>
                          <option value="8" className="bg-gray-800">8th Semester</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Specialization</label>
                    <select
                      value={academicInfo.specialization}
                      onChange={(e) => setAcademicInfo({...academicInfo, specialization: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white focus:border-blue-400 focus:outline-none"
                    >
                      <option value="" className="bg-gray-800">Select Specialization</option>
                      <option value="AIML" className="bg-gray-800">AI & ML</option>
                      <option value="DS" className="bg-gray-800">Data Science</option>
                      <option value="IOT" className="bg-gray-800">IoT</option>
                      <option value="Cyber Security" className="bg-gray-800">Cyber Security</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Department</label>
                    <input
                      type="text"
                      value={academicInfo.department}
                      onChange={(e) => setAcademicInfo({...academicInfo, department: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:outline-none"
                      placeholder="Computer Science"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 border border-green-400"
                  >
                    {saving ? 'Saving...' : '💾 Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'grades' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">📊 Academic Performance</h2>

              {/* CGPA Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-center">
                  <div className="text-3xl font-bold">{calculateCGPA()}</div>
                  <div className="text-sm opacity-90">Current CGPA</div>
                </div>
                <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl text-center">
                  <div className="text-3xl font-bold">{grades.length}</div>
                  <div className="text-sm opacity-90">Subjects Graded</div>
                </div>
                <div className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl text-center">
                  <div className="text-3xl font-bold">{grades.reduce((sum, g) => sum + (g.credits || 0), 0)}</div>
                  <div className="text-sm opacity-90">Total Credits</div>
                </div>
                <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl text-center">
                  <div className="text-3xl font-bold">{userData?.currentYear || 'N/A'}</div>
                  <div className="text-sm opacity-90">Current Year</div>
                </div>
              </div>

              {/* Grades List */}
              <div className="space-y-4">
                {grades.length > 0 ? grades.map((grade) => (
                  <div key={grade.id} className="p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl border-2 border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">{grade.subjectName}</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-600">Semester {grade.semester}, Year {grade.year}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            grade.grade === 'A+' || grade.grade === 'A' ? 'bg-green-100 text-green-800' :
                            grade.grade === 'B+' || grade.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                            grade.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            Grade: {grade.grade} ({grade.gradePoint} GP)
                          </span>
                          <span className="text-sm text-gray-600">Credits: {grade.credits}</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span>Internal: {grade.internalMarks}/40</span>
                          <span>External: {grade.externalMarks}/60</span>
                          <span>Total: {grade.totalMarks}/100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-xl font-bold mb-2">No Grades Available</h3>
                    <p className="text-gray-600">Your academic grades will appear here once they are published.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">📅 Attendance Records</h2>

              {/* Attendance Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {attendance.map((record) => (
                  <div key={record.id} className="p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl border-2 border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{record.subjectName}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Classes:</span>
                        <span className="font-semibold">{record.totalClasses}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Attended:</span>
                        <span className="font-semibold text-green-600">{record.attendedClasses}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Percentage:</span>
                        <span className={`font-semibold ${
                          record.attendancePercentage >= 85 ? 'text-green-600' :
                          record.attendancePercentage >= 75 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {record.attendancePercentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {attendance.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-xl font-bold mb-2">No Attendance Records</h3>
                  <p className="text-gray-600">Your attendance records will appear here.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'assignments' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">📝 Assignments</h2>

              <div className="space-y-4">
                {assignments.length > 0 ? assignments.map((assignment) => (
                  <div key={assignment.id} className="p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl border-2 border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">{assignment.title}</h3>
                        <p className="text-gray-600 mt-1">{assignment.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-600">{assignment.subjectName}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            assignment.studentSubmission ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {assignment.studentSubmission ? 'Submitted' : 'Pending'}
                          </span>
                          <span className="text-sm text-gray-600">
                            Due: {new Date(assignment.dueDate.toDate()).toLocaleDateString()}
                          </span>
                        </div>
                        {assignment.studentSubmission && (
                          <div className="mt-2 text-sm text-green-600">
                            Submitted on: {new Date(assignment.studentSubmission.submittedAt.toDate()).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-bold mb-2">No Assignments</h3>
                    <p className="text-gray-600">Your assignments will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">🔔 Notifications</h2>

              <div className="space-y-4">
                {notifications.length > 0 ? notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      notification.isRead
                        ? 'bg-gray-50 border-gray-200'
                        : 'bg-blue-50 border-blue-300 shadow-md'
                    }`}
                    onClick={() => !notification.isRead && markNotificationAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                          {notification.title}
                        </h3>
                        <p className={`mt-1 ${notification.isRead ? 'text-gray-600' : 'text-gray-800'}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-500">
                            {new Date(notification.createdAt.toDate()).toLocaleDateString()}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                            notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {notification.priority}
                          </span>
                        </div>
                      </div>
                      {!notification.isRead && (
                        <div className="w-3 h-3 bg-blue-600 rounded-full ml-4"></div>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔔</div>
                    <h3 className="text-xl font-bold mb-2">No Notifications</h3>
                    <p className="text-gray-600">You're all caught up!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
