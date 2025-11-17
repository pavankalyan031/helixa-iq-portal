import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore'
import { initializeFirebaseData, clearFirebaseData } from '../utils/initializeFirebaseData'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [activeTab, setActiveTab] = useState('events')

  // Data states
  const [events, setEvents] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [deadlines, setDeadlines] = useState([])
  const [subjects, setSubjects] = useState([])

  // Form states
  const [eventForm, setEventForm] = useState({ title: '', description: '', date: '', type: 'academic' })
  const [announcementForm, setAnnouncementForm] = useState({ title: '', content: '', type: 'general', priority: 'normal' })
  const [deadlineForm, setDeadlineForm] = useState({ title: '', description: '', dueDate: '', priority: 'medium' })
  const [subjectForm, setSubjectForm] = useState({
    name: '',
    semester: '1st Semester',
    year: '1',
    specialization: 'AIML',
    academicYear: '2024-25',
    description: ''
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed:', currentUser?.email)
      if (currentUser) {
        setUser(currentUser)
        // Check if user is admin
        checkAdminStatus(currentUser)
      } else {
        console.log('No user found, redirecting to login')
        navigate('/auth/login')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  const checkAdminStatus = async (currentUser) => {
    console.log('Checking admin status for:', currentUser?.email)

    // TEMPORARY: Allow all authenticated users for testing
    // TODO: Remove this after testing and restore proper admin checks
    if (currentUser) {
      console.log('✅ TEMP: Admin access granted for testing')
      setIsAdmin(true)
      loadData()
      return
    }

    try {
      // Check if email contains 'admin' (simplest approach)
      if (currentUser?.email?.includes('admin')) {
        console.log('✅ Admin access granted via email check')
        setIsAdmin(true)
        loadData()
        return
      }

      // Alternative: Check adminUsers collection
      try {
        console.log('Checking adminUsers collection...')
        const adminQuery = query(collection(db, 'adminUsers'))
        const adminSnapshot = await getDocs(adminQuery)
        const isAdminUser = adminSnapshot.docs.some(doc => doc.data().email === currentUser?.email)

        if (isAdminUser) {
          console.log('✅ Admin access granted via collection check')
          setIsAdmin(true)
          loadData()
          return
        }
      } catch (adminError) {
        console.log('Admin collection check failed:', adminError)
      }

      // If neither check passes
      console.log('❌ Admin access denied')
      alert(`Access denied. Admin privileges required.\n\nYour email: ${currentUser?.email}\n\nPlease use an email containing "admin".`)
      navigate('/')
    } catch (error) {
      console.error('Error checking admin status:', error)
      // Fallback: allow if email contains admin
      if (currentUser?.email?.includes('admin')) {
        console.log('✅ Admin access granted via fallback')
        setIsAdmin(true)
        loadData()
      } else {
        alert('Access denied. Admin privileges required.')
        navigate('/')
      }
    }
  }

  const loadData = async () => {
    try {
      // Load events
      const eventsQuery = query(collection(db, 'events'), orderBy('date', 'desc'))
      const eventsSnapshot = await getDocs(eventsQuery)
      setEvents(eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

      // Load announcements
      const announcementsQuery = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'))
      const announcementsSnapshot = await getDocs(announcementsQuery)
      setAnnouncements(announcementsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

      // Load deadlines
      const deadlinesQuery = query(collection(db, 'deadlines'), orderBy('dueDate', 'asc'))
      const deadlinesSnapshot = await getDocs(deadlinesQuery)
      setDeadlines(deadlinesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

      // Load subjects
      const subjectsQuery = query(collection(db, 'subjects'), orderBy('name', 'asc'))
      const subjectsSnapshot = await getDocs(subjectsQuery)
      setSubjects(subjectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // CRUD Operations for Events
  const addEvent = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'events'), {
        ...eventForm,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      setEventForm({ title: '', description: '', date: '', type: 'academic' })
      loadData()
    } catch (error) {
      console.error('Error adding event:', error)
    }
  }

  const updateEvent = async (id, updatedData) => {
    try {
      await updateDoc(doc(db, 'events', id), {
        ...updatedData,
        updatedAt: new Date()
      })
      loadData()
    } catch (error) {
      console.error('Error updating event:', error)
    }
  }

  const deleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteDoc(doc(db, 'events', id))
        loadData()
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    }
  }

  // CRUD Operations for Announcements
  const addAnnouncement = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'announcements'), {
        ...announcementForm,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      setAnnouncementForm({ title: '', content: '', type: 'general', priority: 'normal' })
      loadData()
    } catch (error) {
      console.error('Error adding announcement:', error)
    }
  }

  const updateAnnouncement = async (id, updatedData) => {
    try {
      await updateDoc(doc(db, 'announcements', id), {
        ...updatedData,
        updatedAt: new Date()
      })
      loadData()
    } catch (error) {
      console.error('Error updating announcement:', error)
    }
  }

  const deleteAnnouncement = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await deleteDoc(doc(db, 'announcements', id))
        loadData()
      } catch (error) {
        console.error('Error deleting announcement:', error)
      }
    }
  }

  // CRUD Operations for Deadlines
  const addDeadline = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'deadlines'), {
        ...deadlineForm,
        updatedAt: new Date()
      })
      setDeadlineForm({ title: '', description: '', dueDate: '', priority: 'medium' })
      loadData()
    } catch (error) {
      console.error('Error adding deadline:', error)
    }
  }

  const updateDeadline = async (id, updatedData) => {
    try {
      await updateDoc(doc(db, 'deadlines', id), {
        ...updatedData,
        updatedAt: new Date()
      })
      loadData()
    } catch (error) {
      console.error('Error updating deadline:', error)
    }
  }

  const deleteDeadline = async (id) => {
    if (window.confirm('Are you sure you want to delete this deadline?')) {
      try {
        await deleteDoc(doc(db, 'deadlines', id))
        loadData()
      } catch (error) {
        console.error('Error deleting deadline:', error)
      }
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header user={user} />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black mb-2">🎛️ Admin Dashboard</h1>
              <p className="text-xl text-blue-100">Manage your website content dynamically</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/admin/analytics')}
                className="px-6 py-3 bg-purple-500/20 backdrop-blur-sm rounded-xl hover:bg-purple-600/30 transition-all duration-300 text-purple-100 border border-purple-400/30"
                title="View analytics and system metrics"
              >
                📊 Analytics
              </button>
              <button
                onClick={() => navigate('/admin/grades')}
                className="px-6 py-3 bg-green-500/20 backdrop-blur-sm rounded-xl hover:bg-green-600/30 transition-all duration-300 text-green-100 border border-green-400/30"
                title="Manage student grades and academic performance"
              >
                📈 Grades
              </button>
              <button
                onClick={() => navigate('/admin/attendance')}
                className="px-6 py-3 bg-orange-500/20 backdrop-blur-sm rounded-xl hover:bg-orange-600/30 transition-all duration-300 text-orange-100 border border-orange-400/30"
                title="Manage student attendance records"
              >
                📅 Attendance
              </button>
              <button
                onClick={() => navigate('/admin/users')}
                className="px-6 py-3 bg-indigo-500/20 backdrop-blur-sm rounded-xl hover:bg-indigo-600/30 transition-all duration-300 text-indigo-100 border border-indigo-400/30"
                title="View and manage all registered users"
              >
                👥 Users
              </button>
              <button
                onClick={initializeFirebaseData}
                className="px-6 py-3 bg-green-500/20 backdrop-blur-sm rounded-xl hover:bg-green-600/30 transition-all duration-300 text-green-100 border border-green-400/30"
                title="Initialize Firebase with sample data"
              >
                🚀 Init Data
              </button>
              <button
                onClick={clearFirebaseData}
                className="px-6 py-3 bg-red-500/20 backdrop-blur-sm rounded-xl hover:bg-red-600/30 transition-all duration-300 text-red-100 border border-red-400/30"
                title="Clear all Firebase data"
              >
                🗑️ Clear Data
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-2 bg-white rounded-2xl p-2 shadow-xl">
            {[
              { id: 'events', label: '📅 Events', count: events.length },
              { id: 'announcements', label: '📢 Announcements', count: announcements.length },
              { id: 'deadlines', label: '⏰ Deadlines', count: deadlines.length },
              { id: 'subjects', label: '📚 Subjects', count: subjects.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {activeTab === 'events' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">📅 Manage Events</h2>

              {/* Add Event Form */}
              <form onSubmit={addEvent} className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200">
                <h3 className="text-xl font-bold mb-4">Add New Event</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Event Title"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                    className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                    required
                  />
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                    className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                    required
                  />
                  <select
                    value={eventForm.type}
                    onChange={(e) => setEventForm({...eventForm, type: e.target.value})}
                    className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="academic">Academic</option>
                    <option value="cultural">Cultural</option>
                    <option value="sports">Sports</option>
                    <option value="technical">Technical</option>
                  </select>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                  >
                    ➕ Add Event
                  </button>
                </div>
                <textarea
                  placeholder="Event Description"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                  className="w-full mt-4 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                  rows="3"
                  required
                />
              </form>

              {/* Events List */}
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                        <p className="text-gray-600 mt-1">{event.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-500">📅 {event.date}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            event.type === 'academic' ? 'bg-blue-100 text-blue-800' :
                            event.type === 'cultural' ? 'bg-purple-100 text-purple-800' :
                            event.type === 'sports' ? 'bg-green-100 text-green-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {event.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateEvent(event.id, { ...event, title: event.title + ' (Updated)' })}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">📢 Manage Announcements</h2>

              {/* Add Announcement Form */}
              <form onSubmit={addAnnouncement} className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
                <h3 className="text-xl font-bold mb-4">Add New Announcement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Announcement Title"
                    value={announcementForm.title}
                    onChange={(e) => setAnnouncementForm({...announcementForm, title: e.target.value})}
                    className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                    required
                  />
                  <select
                    value={announcementForm.type}
                    onChange={(e) => setAnnouncementForm({...announcementForm, type: e.target.value})}
                    className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                  >
                    <option value="general">General</option>
                    <option value="academic">Academic</option>
                    <option value="exam">Exam</option>
                    <option value="event">Event</option>
                  </select>
                  <select
                    value={announcementForm.priority}
                    onChange={(e) => setAnnouncementForm({...announcementForm, priority: e.target.value})}
                    className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                  >
                    <option value="low">Low Priority</option>
                    <option value="normal">Normal Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                  >
                    ➕ Add Announcement
                  </button>
                </div>
                <textarea
                  placeholder="Announcement Content"
                  value={announcementForm.content}
                  onChange={(e) => setAnnouncementForm({...announcementForm, content: e.target.value})}
                  className="w-full mt-4 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                  rows="3"
                  required
                />
              </form>

              {/* Announcements List */}
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    announcement.priority === 'high' ? 'bg-red-50 border-red-200' :
                    announcement.priority === 'normal' ? 'bg-blue-50 border-blue-200' :
                    'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{announcement.title}</h3>
                        <p className="text-gray-600 mt-1">{announcement.content}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            announcement.type === 'academic' ? 'bg-blue-100 text-blue-800' :
                            announcement.type === 'exam' ? 'bg-red-100 text-red-800' :
                            announcement.type === 'event' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {announcement.type}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                            announcement.priority === 'normal' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {announcement.priority} priority
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateAnnouncement(announcement.id, { ...announcement, title: announcement.title + ' (Updated)' })}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteAnnouncement(announcement.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'deadlines' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">⏰ Manage Deadlines</h2>

              {/* Add Deadline Form */}
              <form onSubmit={addDeadline} className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200">
                <h3 className="text-xl font-bold mb-4">Add New Deadline</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Deadline Title"
                    value={deadlineForm.title}
                    onChange={(e) => setDeadlineForm({...deadlineForm, title: e.target.value})}
                    className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                    required
                  />
                  <input
                    type="date"
                    value={deadlineForm.dueDate}
                    onChange={(e) => setDeadlineForm({...deadlineForm, dueDate: e.target.value})}
                    className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                    required
                  />
                  <select
                    value={deadlineForm.priority}
                    onChange={(e) => setDeadlineForm({...deadlineForm, priority: e.target.value})}
                    className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300"
                  >
                    ➕ Add Deadline
                  </button>
                </div>
                <textarea
                  placeholder="Deadline Description"
                  value={deadlineForm.description}
                  onChange={(e) => setDeadlineForm({...deadlineForm, description: e.target.value})}
                  className="w-full mt-4 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none"
                  rows="3"
                  required
                />
              </form>

              {/* Deadlines List */}
              <div className="space-y-4">
                {deadlines.map((deadline) => (
                  <div key={deadline.id} className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    deadline.priority === 'high' ? 'bg-red-50 border-red-200' :
                    deadline.priority === 'medium' ? 'bg-orange-50 border-orange-200' :
                    'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{deadline.title}</h3>
                        <p className="text-gray-600 mt-1">{deadline.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-500">📅 Due: {new Date(deadline.dueDate).toLocaleDateString()}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            deadline.priority === 'high' ? 'bg-red-100 text-red-800' :
                            deadline.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {deadline.priority} priority
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateDeadline(deadline.id, { ...deadline, title: deadline.title + ' (Updated)' })}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteDeadline(deadline.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'subjects' && (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">📚 Manage Subjects</h2>
              {/* Add similar CRUD interface for subjects */}
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
                <p className="text-gray-600">Subjects management interface will be implemented next.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}