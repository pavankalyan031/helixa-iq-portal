import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { initializeSampleUsers } from '../utils/initializeSampleUsers'

export default function AdminUsers() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [showUserDetails, setShowUserDetails] = useState(false)

  // Filters
  const [filters, setFilters] = useState({
    search: '',
    year: '',
    specialization: ''
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
        await loadUsers()
      } else {
        alert('Access denied. Admin privileges required.')
        navigate('/')
      }
    } catch (error) {
      console.error('Error checking admin status:', error)
      navigate('/')
    }
  }

  const loadUsers = async () => {
    try {
      setLoading(true)
      const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'))
      const usersSnapshot = await getDocs(usersQuery)
      const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      setUsers(usersData)
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = !filters.search ||
      user.firstName?.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email?.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.studentId?.toLowerCase().includes(filters.search.toLowerCase())

    const matchesYear = !filters.year || user.currentYear === filters.year
    const matchesSpecialization = !filters.specialization || user.specialization === filters.specialization

    return matchesSearch && matchesYear && matchesSpecialization
  })

  const viewUserDetails = (user) => {
    setSelectedUser(user)
    setShowUserDetails(true)
  }

  const updateUser = async (userId, updatedData) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        ...updatedData,
        updatedAt: new Date()
      })
      await loadUsers()
      alert('User updated successfully!')
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Error updating user. Please try again.')
    }
  }

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'users', userId))
        await loadUsers()
        alert('User deleted successfully!')
      } catch (error) {
        console.error('Error deleting user:', error)
        alert('Error deleting user. Please try again.')
      }
    }
  }

  const getSpecializationColor = (specialization) => {
    const colors = {
      'AIML': 'bg-blue-100 text-blue-800',
      'DS': 'bg-green-100 text-green-800',
      'IOT': 'bg-purple-100 text-purple-800',
      'Cyber Security': 'bg-red-100 text-red-800'
    }
    return colors[specialization] || 'bg-gray-100 text-gray-800'
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
          <p>Loading users...</p>
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
              <h1 className="text-4xl font-black mb-2">👥 User Management</h1>
              <p className="text-xl text-gray-600">View and manage all registered users</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition"
              >
                ← Back to Admin
              </button>
              <button
                onClick={loadUsers}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
              >
                🔄 Refresh
              </button>
              <button
                onClick={async () => {
                  if (window.confirm('This will create sample users for testing. Continue?')) {
                    await initializeSampleUsers()
                    await loadUsers()
                  }
                }}
                className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                title="Create sample users for testing"
              >
                🎯 Add Sample Users
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">🔍 Filter Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search by name, email, or student ID..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
            />

            <select
              value={filters.year}
              onChange={(e) => setFilters({...filters, year: e.target.value})}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
            >
              <option value="">All Years</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>

            <select
              value={filters.specialization}
              onChange={(e) => setFilters({...filters, specialization: e.target.value})}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
            >
              <option value="">All Specializations</option>
              <option value="AIML">AI & ML</option>
              <option value="DS">Data Science</option>
              <option value="IOT">IoT</option>
              <option value="Cyber Security">Cyber Security</option>
            </select>

            <div className="flex items-center">
              <span className="text-lg font-bold text-blue-600">{filteredUsers.length}</span>
              <span className="text-gray-600 ml-2">users found</span>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">📋 Registered Users ({filteredUsers.length})</h2>

          <div className="space-y-4">
            {filteredUsers.length > 0 ? filteredUsers.map((user) => (
              <div key={user.id} className="p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  {/* User Info */}
                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-4">
                      <img
                        src={user.photoURL || '/default-avatar.png'}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.displayName || 'No Name'}
                        </h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-600">ID: {user.studentId || 'Not Set'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Info */}
                  <div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Year: {user.currentYear || 'N/A'}</p>
                      <p className="text-sm text-gray-600">Sem: {user.currentSemester || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Specialization */}
                  <div>
                    {user.specialization ? (
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getSpecializationColor(user.specialization)}`}>
                        {user.specialization}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">Not Set</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => viewUserDetails(user)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      👁️ View
                    </button>
                    <button
                      onClick={() => updateUser(user.id, { ...user, status: user.status === 'active' ? 'inactive' : 'active' })}
                      className={`px-4 py-2 rounded-lg transition ${
                        user.status === 'active'
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {user.status === 'active' ? '🚫 Deactivate' : '✅ Activate'}
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-bold mb-2">No Users Found</h3>
                <p className="text-gray-600">Try adjusting your filters or check back later.</p>
              </div>
            )}
          </div>
        </div>

        {/* User Details Modal */}
        {showUserDetails && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-800">👤 User Details</h2>
                  <button
                    onClick={() => setShowUserDetails(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Profile Picture & Basic Info */}
                  <div className="text-center">
                    <img
                      src={selectedUser.photoURL || '/default-avatar.png'}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 mx-auto mb-4"
                    />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {selectedUser.firstName && selectedUser.lastName ? `${selectedUser.firstName} ${selectedUser.lastName}` : selectedUser.displayName || 'No Name'}
                    </h3>
                    <p className="text-gray-600 mb-2">{selectedUser.email}</p>
                    <div className="flex justify-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${getSpecializationColor(selectedUser.specialization)}`}>
                        {selectedUser.specialization || 'No Specialization'}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-bold">
                        Year {selectedUser.currentYear || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Detailed Information */}
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h4 className="text-xl font-bold mb-4 text-gray-800">📋 Personal Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Student ID:</span>
                          <span className="font-semibold">{selectedUser.studentId || 'Not Set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-semibold">{selectedUser.phoneNumber || 'Not Set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gender:</span>
                          <span className="font-semibold">{selectedUser.gender || 'Not Set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date of Birth:</span>
                          <span className="font-semibold">
                            {selectedUser.dateOfBirth ? new Date(selectedUser.dateOfBirth.toDate()).toLocaleDateString() : 'Not Set'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Academic Information */}
                    <div>
                      <h4 className="text-xl font-bold mb-4 text-gray-800">🎓 Academic Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Enrollment Year:</span>
                          <span className="font-semibold">{selectedUser.enrollmentYear || 'Not Set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current Year:</span>
                          <span className="font-semibold">{selectedUser.currentYear || 'Not Set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current Semester:</span>
                          <span className="font-semibold">{selectedUser.currentSemester || 'Not Set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Department:</span>
                          <span className="font-semibold">{selectedUser.department || 'Not Set'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Address Information */}
                    {selectedUser.address && (
                      <div>
                        <h4 className="text-xl font-bold mb-4 text-gray-800">🏠 Address Information</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Street:</span>
                            <span className="font-semibold">{selectedUser.address.street || 'Not Set'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">City:</span>
                            <span className="font-semibold">{selectedUser.address.city || 'Not Set'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">State:</span>
                            <span className="font-semibold">{selectedUser.address.state || 'Not Set'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Pincode:</span>
                            <span className="font-semibold">{selectedUser.address.pincode || 'Not Set'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Country:</span>
                            <span className="font-semibold">{selectedUser.address.country || 'Not Set'}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Account Information */}
                    <div>
                      <h4 className="text-xl font-bold mb-4 text-gray-800">⚙️ Account Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`font-semibold ${selectedUser.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                            {selectedUser.status || 'active'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Created:</span>
                          <span className="font-semibold">
                            {selectedUser.createdAt ? new Date(selectedUser.createdAt.toDate()).toLocaleDateString() : 'Unknown'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Updated:</span>
                          <span className="font-semibold">
                            {selectedUser.updatedAt ? new Date(selectedUser.updatedAt.toDate()).toLocaleDateString() : 'Never'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => setShowUserDetails(false)}
                    className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}