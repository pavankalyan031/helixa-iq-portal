import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'

const WhatsAppContact = ({ phoneNumber = '+919391485316' }) => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi, I am looking for guidance with my course studies and would like to connect with an advisor.")
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
    >
      <span>💬</span>
      <span>Contact via WhatsApp</span>
    </button>
  )
}

const ProfileDropdown = ({ user, userDisplayName, onNavigateToPortal, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
          {(userDisplayName || user.displayName || user.email || 'U').charAt(0).toUpperCase()}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-white font-medium text-sm">{userDisplayName || user.displayName || 'Premium User'}</p>
          <p className="text-gray-400 text-xs">{user.email}</p>
        </div>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {(userDisplayName || user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{userDisplayName || user.displayName || 'Premium User'}</h3>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                  <div className="mt-2">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full font-medium">
                      LTSU Premium Member
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2">
              <div className="space-y-1">
                <button
                  onClick={() => {
                    onNavigateToPortal()
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-3 text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
                >
                  <span className="text-lg">🏠</span>
                  <span className="font-medium">LTSU Student Portal</span>
                </button>
                
                <div className="border-t border-gray-700 my-2"></div>
                
                <button className="w-full flex items-center space-x-3 px-3 py-3 text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
                  <span className="text-lg">📋</span>
                  <span className="font-medium">View Profile</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 px-3 py-3 text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
                  <span className="text-lg">🔔</span>
                  <span className="font-medium">Notifications</span>
                </button>
                
                <div className="border-t border-gray-700 my-2"></div>
                
                <div className="px-3 py-2">
                  <p className="text-gray-400 text-xs mb-3">Connect with me</p>
                  <div className="flex space-x-3">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
                    >
                      <span className="text-sm">📱</span>
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
                    >
                      <span className="text-sm">💼</span>
                    </a>
                    <button className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors">
                      <span className="text-sm">📄</span>
                    </button>
                    <button className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors">
                      <span className="text-sm">🌐</span>
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 my-2"></div>
                
                <button className="w-full flex items-center space-x-3 px-3 py-3 text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
                  <span className="text-lg">⚙️</span>
                  <span className="font-medium">Settings</span>
                </button>
                
                <button
                  onClick={() => {
                    onLogout()
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-3 text-left text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-lg transition-colors"
                >
                  <span className="text-lg">🚪</span>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const MobileMenu = ({ isOpen, onClose, menuItems, activeSection, onSectionChange }) => {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed top-0 left-0 w-80 h-full bg-gray-800 border-r border-gray-700 z-50 overflow-y-auto">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              👤
            </div>
            <div>
              <h3 className="text-white font-bold">LTSU Premium</h3>
              <p className="text-gray-400 text-sm">Learning Management System</p>
            </div>
          </div>
        </div>
        
        <nav className="p-3">
          <ul className="space-y-1">
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onSectionChange(item.id)
                    onClose()
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

const LMSPortal = ({ user }) => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [premiumUser, setPremiumUser] = useState(null)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [userDisplayName, setUserDisplayName] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [accessDenied, setAccessDenied] = useState(false)

  useEffect(() => {
    const checkLMSAccess = async () => {
      try {
        // Check if we have premium user data from login
        const storedUser = localStorage.getItem('ltsu_premium_user')
        
        if (!storedUser) {
          setAccessDenied(true)
          setLoading(false)
          return
        }

        const userData = JSON.parse(storedUser)
        setPremiumUser(userData)
        
        // Set user display name
        if (userData.firstName || userData.lastName) {
          setUserDisplayName(`${userData.firstName || ''} ${userData.lastName || ''}`.trim())
        } else {
          setUserDisplayName(userData.email?.split('@')[0] || 'Premium User')
        }

        setLoading(false)
      } catch (error) {
        console.error('Error checking LMS access:', error)
        setAccessDenied(true)
        setLoading(false)
      }
    }

    checkLMSAccess()

    // Listen for auth state changes (for Firebase auth)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If no Firebase user, check if we have premium user data
        checkLMSAccess()
      } else {
        setCurrentUser(user)
      }
    })

    return () => unsubscribe()
  }, [navigate])

  const handleLogout = async () => {
    try {
      // Clear premium user data
      localStorage.removeItem('ltsu_premium_user')
      localStorage.removeItem('ltsu_payment_success')
      
      // Sign out from Firebase if logged in
      try {
        await signOut(auth)
      } catch (firebaseError) {
        // Ignore Firebase sign out errors
        console.log('Firebase sign out (ignored):', firebaseError)
      }
      
      navigate('/premium-login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleNavigateToPortal = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading LMS Portal...</div>
        </div>
      </div>
    )
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-400 text-3xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">
            You need premium access to use the LMS Portal. Please register or login with your premium credentials.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/premium-login')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Login to Premium
            </button>
            <button
              onClick={() => navigate('/premium-benefits')}
              className="w-full border border-gray-600 text-gray-300 font-medium py-3 px-6 rounded-lg hover:border-gray-500 transition-all duration-200"
            >
              Register for Premium
            </button>
          </div>
        </div>
      </div>
    )
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'placement', label: 'Placement Preparation Kit', icon: '🎯' },
    { id: 'internships', label: 'Internships and Job Openings', icon: '💼' },
    { id: 'resume', label: 'ATS Resume Building', icon: '📄' },
    { id: 'projects', label: 'Project Ideas (Industry Level)', icon: '💡' },
    { id: 'hackathons', label: 'Hackathons Live', icon: '🏆' },
    { id: 'interviews', label: 'Mock Interviews Prep', icon: '🎭' },
    { id: 'certifications', label: 'Certification Courses', icon: '🎓' },
    { id: 'freelancing', label: 'Freelancing Work', icon: '💰' },
    { id: 'tech-trends', label: 'Emerging Tech Trends', icon: '🚀' },
    { id: 'basic-courses', label: 'Basic Courses for Students', icon: '📚' },
    { id: 'top-performers', label: 'Top Performers Winner', icon: '🥇' },
    { id: 'alumni', label: 'Alumni Support', icon: '🤝' },
    { id: 'progress', label: 'Progress Live', icon: '📈' },
    { id: 'support', label: 'Support', icon: '💬' }
  ]

  const courses = [
    {
      id: 1,
      title: 'Advanced Python Programming',
      instructor: 'Dr. Sarah Johnson',
      progress: 75,
      nextClass: 'Today, 3:00 PM',
      duration: '6 months',
      students: 1247
    },
    {
      id: 2,
      title: 'Full Stack Web Development',
      instructor: 'Mark Thompson',
      progress: 45,
      nextClass: 'Tomorrow, 10:00 AM',
      duration: '8 months',
      students: 892
    },
    {
      id: 3,
      title: 'Data Science & Machine Learning',
      instructor: 'Dr. Emily Chen',
      progress: 20,
      nextClass: 'Friday, 2:00 PM',
      duration: '10 months',
      students: 1563
    }
  ]

  const recentActivities = [
    { time: '2 hours ago', activity: 'Completed Module 5: Advanced Functions', course: 'Python Programming' },
    { time: '1 day ago', activity: 'Submitted Assignment 3: Database Design', course: 'Web Development' },
    { time: '2 days ago', activity: 'Attended Live Session: ML Algorithms', course: 'Data Science' },
    { time: '3 days ago', activity: 'Downloaded Course Materials: Week 4', course: 'Python Programming' }
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {userDisplayName || currentUser.displayName || 'Student'}! 👋</h1>
        <p className="text-blue-100">Continue your learning journey with LTSU Premium</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Courses</p>
              <p className="text-xl font-bold text-white">{courses.length}</p>
            </div>
            <div className="text-2xl">📚</div>
          </div>
        </div>
        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Completion</p>
              <p className="text-xl font-bold text-white">47%</p>
            </div>
            <div className="text-2xl">📈</div>
          </div>
        </div>
        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Hours Learned</p>
              <p className="text-xl font-bold text-white">127</p>
            </div>
            <div className="text-2xl">⏱️</div>
          </div>
        </div>
        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Certifications</p>
              <p className="text-xl font-bold text-white">2</p>
            </div>
            <div className="text-2xl">🏆</div>
          </div>
        </div>
      </div>

      {/* My Courses */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map(course => (
            <div key={course.id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors">
              <h3 className="text-base font-semibold text-white mb-2">{course.title}</h3>
              <p className="text-gray-400 text-sm mb-3">by {course.instructor}</p>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-1 text-sm text-gray-300">
                <p>📅 Next: {course.nextClass}</p>
                <p>⏱️ Duration: {course.duration}</p>
                <p>👥 Students: {course.students.toLocaleString()}</p>
              </div>

              <button className="w-full mt-3 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSection = (sectionId, title, content) => (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">{title}</h2>
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
        <p className="text-gray-300 text-sm">{content}</p>
      </div>
    </div>
  )

  const renderPlacement = () => renderSection('placement', 'Placement Preparation Kit', 'Comprehensive placement preparation resources including aptitude tests, coding challenges, and interview preparation materials.')
  const renderInternships = () => renderSection('internships', 'Internships and Job Openings', 'Curated internship opportunities and job openings from top companies worldwide.')
  const renderResume = () => renderSection('resume', 'ATS Resume Building', 'Build ATS-optimized resumes that get you noticed by employers and pass automated screening.')
  const renderProjects = () => renderSection('projects', 'Project Ideas (Industry Level)', 'Industry-level project ideas with complete implementation guides and source code.')
  const renderHackathons = () => renderSection('hackathons', 'Hackathons Live', 'Active hackathons, coding competitions, and challenges to showcase your skills.')
  const renderInterviews = () => renderSection('interviews', 'Mock Interviews Prep', 'Practice mock interviews with AI-powered feedback and real-time evaluation.')
  const renderCertifications = () => renderSection('certifications', 'Certification Courses', 'Industry-recognized certification courses from leading technology companies.')
  const renderFreelancing = () => renderSection('freelancing', 'Freelancing Work', 'Find freelance opportunities and learn how to build a successful freelancing career.')
  const renderTechTrends = () => renderSection('tech-trends', 'Emerging Tech Trends', 'Stay updated with the latest technology trends and future career opportunities.')
  const renderBasicCourses = () => renderSection('basic-courses', 'Basic Courses for Students', 'Foundational courses designed specifically for students to build strong fundamentals.')
  const renderTopPerformers = () => renderSection('top-performers', 'Top Performers Winner', 'Celebrating our top-performing students and their achievements.')
  const renderAlumni = () => renderSection('alumni', 'Alumni Support', 'Connect with successful alumni and get career guidance from industry experts.')
  const renderProgressLive = () => renderSection('progress', 'Progress Live', 'Real-time progress tracking and analytics to monitor your learning journey.')
  
  const renderCourses = () => (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">All Courses</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{course.title}</h3>
                <p className="text-gray-400">by {course.instructor}</p>
              </div>
              <div className="text-3xl">🎓</div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Overall Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-4">
              <div>
                <p className="text-gray-400">Next Class</p>
                <p>{course.nextClass}</p>
              </div>
              <div>
                <p className="text-gray-400">Duration</p>
                <p>{course.duration}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View Course
              </button>
              <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors">
                📖
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderProgress = () => (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Learning Progress</h2>
      
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
          <h3 className="text-base font-semibold text-white mb-2">Weekly Goal</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">12/15 hours</span>
            <span className="text-green-400 text-sm">80%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
          <h3 className="text-base font-semibold text-white mb-2">Monthly Streak</h3>
          <div className="text-2xl font-bold text-yellow-400">23 days</div>
          <p className="text-gray-400 text-xs">Keep it up! 🔥</p>
        </div>
        
        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
          <h3 className="text-base font-semibold text-white mb-2">Certificates</h3>
          <div className="text-2xl font-bold text-blue-400">2 earned</div>
          <p className="text-gray-400 text-xs">1 pending</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
        <h3 className="text-base font-semibold text-white mb-3">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-700/50 rounded-lg">
              <div className="text-lg">✅</div>
              <div className="flex-1">
                <p className="text-white text-sm">{activity.activity}</p>
                <p className="text-gray-400 text-xs">{activity.course}</p>
                <p className="text-gray-500 text-xs">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSupport = () => (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Support & Help</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Contact Support</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📧</span>
              <div>
                <p className="text-white">Email Support</p>
                <p className="text-gray-400 text-sm">info.studentportalofficial@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">💬</span>
              <div>
                <p className="text-white">Live Chat</p>
                <p className="text-gray-400 text-sm">Available 9 AM - 6 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📞</span>
              <div>
                <p className="text-white">Phone Support</p>
                <p className="text-gray-400 text-sm">+91 9391485316</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <div className="border-b border-gray-700 pb-3">
              <h4 className="text-white font-medium mb-2">Course Support</h4>
              <p className="text-sm text-gray-400">Get help with course content and assignments</p>
            </div>
            <div className="border-b border-gray-700 pb-3">
              <h4 className="text-white font-medium mb-2">Technical Help</h4>
              <p className="text-sm text-gray-400">Report bugs or technical issues</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Academic Guidance</h4>
              <p className="text-sm text-gray-400">Connect with advisors for career guidance</p>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Contact Section */}
      <div className="mt-6 bg-gradient-to-r from-green-600/20 to-green-500/20 p-6 rounded-xl border border-green-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">💬</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">WhatsApp Support</h3>
              <p className="text-green-100 text-sm">Get instant help via WhatsApp - Available 9 AM to 6 PM</p>
            </div>
          </div>
          <WhatsAppContact />
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return renderDashboard()
      case 'courses': return renderCourses()
      case 'placement': return renderPlacement()
      case 'internships': return renderInternships()
      case 'resume': return renderResume()
      case 'projects': return renderProjects()
      case 'hackathons': return renderHackathons()
      case 'interviews': return renderInterviews()
      case 'certifications': return renderCertifications()
      case 'freelancing': return renderFreelancing()
      case 'tech-trends': return renderTechTrends()
      case 'basic-courses': return renderBasicCourses()
      case 'top-performers': return renderTopPerformers()
      case 'alumni': return renderAlumni()
      case 'progress': return renderProgressLive()
      case 'support': return renderSupport()
      default: return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-30">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand - Left Side */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-blue-500 shadow-lg">
                <img
                  src="/assets/images/ltsu-custom-logo.png"
                  alt="LTSU Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">LTSU Premium</h1>
                <p className="text-gray-400 text-xs">Learning Management System</p>
              </div>
            </div>

            {/* User Profile - Right Side */}
            <div className="flex items-center space-x-4">
              {/* Desktop notifications and profile */}
              <div className="hidden md:flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <span className="text-lg">🔔</span>
                </button>
              </div>
              
              <ProfileDropdown
                user={premiumUser || currentUser}
                userDisplayName={userDisplayName}
                onNavigateToPortal={handleNavigateToPortal}
                onLogout={handleLogout}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-72 bg-gray-800 min-h-screen border-r border-gray-700">
          <nav className="p-3 h-screen overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          menuItems={menuItems}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content */}
        <div className="flex-1 p-4 h-screen overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default LMSPortal