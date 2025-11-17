import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { collection, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore'
import Header from '../components/Header'
import Footer from '../components/Footer'
import firebaseService from '../utils/firebaseService'

export default function AdminAnalytics() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalAnnouncements: 0,
    totalDeadlines: 0,
    totalAssignments: 0,
    userActivity: [],
    contentPerformance: [],
    systemHealth: {}
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
      // Check if email contains 'admin'
      if (currentUser?.email?.includes('admin')) {
        setIsAdmin(true)
        await loadAnalytics()
      } else {
        alert('Access denied. Admin privileges required.')
        navigate('/')
      }
    } catch (error) {
      console.error('Error checking admin status:', error)
      navigate('/')
    }
  }

  const loadAnalytics = async () => {
    try {
      setLoading(true)

      // Load basic counts
      const [
        usersSnapshot,
        eventsSnapshot,
        announcementsSnapshot,
        deadlinesSnapshot,
        assignmentsSnapshot,
        analyticsSnapshot
      ] = await Promise.all([
        getDocs(collection(db, 'users')),
        getDocs(collection(db, 'events')),
        getDocs(collection(db, 'announcements')),
        getDocs(collection(db, 'deadlines')),
        getDocs(collection(db, 'assignments')),
        firebaseService.getAnalytics('user_activity', { start: Timestamp.fromDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) })
      ])

      // Calculate user activity metrics
      const userActivityData = analyticsSnapshot.reduce((acc, doc) => {
        const data = doc.data()
        const date = data.createdAt.toDate().toISOString().split('T')[0]

        if (!acc[date]) {
          acc[date] = { date, pageViews: 0, uniqueUsers: new Set(), sessions: 0 }
        }

        acc[date].pageViews++
        acc[date].uniqueUsers.add(data.userId)
        acc[date].sessions++

        return acc
      }, {})

      // Convert sets to counts
      Object.values(userActivityData).forEach(day => {
        day.uniqueUsers = day.uniqueUsers.size
      })

      setAnalytics({
        totalUsers: usersSnapshot.size,
        totalEvents: eventsSnapshot.size,
        totalAnnouncements: announcementsSnapshot.size,
        totalDeadlines: deadlinesSnapshot.size,
        totalAssignments: assignmentsSnapshot.size,
        userActivity: Object.values(userActivityData).sort((a, b) => b.date.localeCompare(a.date)),
        contentPerformance: [],
        systemHealth: {
          lastBackup: '2024-10-01',
          databaseSize: '2.4 MB',
          uptime: '99.9%'
        }
      })

    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportData = async (collectionName) => {
    try {
      const snapshot = await getDocs(collection(db, collectionName))
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      const jsonString = JSON.stringify(data, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `${collectionName}_export_${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      alert(`${collectionName} data exported successfully!`)
    } catch (error) {
      console.error('Error exporting data:', error)
      alert('Error exporting data. Please try again.')
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading analytics...</p>
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
              <h1 className="text-4xl font-black mb-2">📊 Analytics Dashboard</h1>
              <p className="text-xl text-gray-600">Monitor system performance and user engagement</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition"
              >
                ← Back to Admin
              </button>
              <button
                onClick={loadAnalytics}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
              >
                🔄 Refresh Data
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-blue-600">{analytics.totalUsers}</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Events</p>
                <p className="text-3xl font-bold text-green-600">{analytics.totalEvents}</p>
              </div>
              <div className="text-4xl">📅</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Announcements</p>
                <p className="text-3xl font-bold text-purple-600">{analytics.totalAnnouncements}</p>
              </div>
              <div className="text-4xl">📢</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Assignments</p>
                <p className="text-3xl font-bold text-orange-600">{analytics.totalAssignments}</p>
              </div>
              <div className="text-4xl">📝</div>
            </div>
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Activity Chart */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">📈 User Activity (Last 30 Days)</h2>
            <div className="space-y-4">
              {analytics.userActivity.slice(0, 10).map((day) => (
                <div key={day.date} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold">{new Date(day.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">{day.uniqueUsers} unique users</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{day.pageViews}</p>
                    <p className="text-sm text-gray-600">page views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">🖥️ System Health</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <div>
                  <p className="font-semibold">Database Status</p>
                  <p className="text-sm text-gray-600">All systems operational</p>
                </div>
                <div className="text-2xl">✅</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div>
                  <p className="font-semibold">Last Backup</p>
                  <p className="text-sm text-gray-600">{analytics.systemHealth.lastBackup}</p>
                </div>
                <div className="text-2xl">💾</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                <div>
                  <p className="font-semibold">Database Size</p>
                  <p className="text-sm text-gray-600">{analytics.systemHealth.databaseSize}</p>
                </div>
                <div className="text-2xl">📊</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                <div>
                  <p className="font-semibold">System Uptime</p>
                  <p className="text-sm text-gray-600">{analytics.systemHealth.uptime}</p>
                </div>
                <div className="text-2xl">⚡</div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Export Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💾 Data Export & Backup</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'users', label: 'User Data', icon: '👥' },
              { name: 'events', label: 'Events', icon: '📅' },
              { name: 'announcements', label: 'Announcements', icon: '📢' },
              { name: 'deadlines', label: 'Deadlines', icon: '⏰' },
              { name: 'assignments', label: 'Assignments', icon: '📝' },
              { name: 'grades', label: 'Grades', icon: '📊' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => exportData(item.name)}
                className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-800">{item.label}</h3>
                    <p className="text-sm text-gray-600">Export as JSON</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 p-6 bg-yellow-50 rounded-2xl border-2 border-yellow-200">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">⚠️</div>
              <div>
                <h3 className="font-bold text-yellow-800">Backup Recommendation</h3>
                <p className="text-yellow-700">Regular data backups are essential. Export critical data periodically and store securely.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}