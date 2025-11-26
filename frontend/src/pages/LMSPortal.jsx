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
                      Helixa IQ Premium User
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
                
                {/* <button className="w-full flex items-center space-x-3 px-3 py-3 text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
                  <span className="text-lg">📋</span>
                  <span className="font-medium">View Profile</span>
                </button> */}
                
                <button className="w-full flex items-center space-x-3 px-3 py-3 text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
                  <span className="text-lg">🔔</span>
                  <span className="font-medium">Notifications</span>
                </button>
                
                <div className="border-t border-gray-700 my-2"></div>
                
                <div className="px-3 py-2">
                  <p className="text-gray-400 text-xs mb-3">Connect with me</p>
                  <div className="flex space-x-3">
                    <a
                      href="https://github.com/pavankalyan031"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
                    >
                      <span className="text-sm">📱</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/pavankalyan031"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
                    >
                      <span className="text-sm">💼</span>
                    </a>
                    <a
                      href="https://www.helixatechnologies.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
                    >
                      <span className="text-sm">🌐</span>
                    </a>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 my-2"></div>
                
                {/* <button className="w-full flex items-center space-x-3 px-3 py-3 text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
                  <span className="text-lg">⚙️</span>
                  <span className="font-medium">Settings</span>
                </button> */}
                
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
              <h3 className="text-white font-bold">Helixa IQ Portal</h3>
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
  const [showDSAOptions, setShowDSAOptions] = useState(false)
  const [alumniActiveTabs, setAlumniActiveTabs] = useState({})

  useEffect(() => {
    const checkLMSAccess = async () => {
      try {
        // Check if we have premium user data from login
        const storedUser = localStorage.getItem('helixa_premium_user')

        if (storedUser) {
          const userData = JSON.parse(storedUser)
          setPremiumUser(userData)

          // Set user display name
          if (userData.firstName || userData.lastName) {
            setUserDisplayName(`${userData.firstName || ''} ${userData.lastName || ''}`.trim())
          } else {
            setUserDisplayName(userData.email?.split('@')[0] || 'Premium User')
          }

          setLoading(false)
          return
        }

        // If no premium user data, check Firebase auth
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setCurrentUser(user)
            setUserDisplayName(user.displayName || user.email?.split('@')[0] || 'User')
          } else {
            setAccessDenied(true)
          }
          setLoading(false)
        })

        return () => unsubscribe()
      } catch (error) {
        console.error('Error checking LMS access:', error)
        setAccessDenied(true)
        setLoading(false)
      }
    }

    checkLMSAccess()
  }, [navigate])

  const handleLogout = async () => {
    try {
      // Clear premium user data
      localStorage.removeItem('helixa_premium_user')
      localStorage.removeItem('helixa_payment_success')
      
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
          <div className="text-white text-xl">Loading Helixa IQ Portal...</div>
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
            You need premium access to use the Helixa IQ Portal. Please register or login with your premium credentials.
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
    { id: 'freelancing', label: 'Freelancing Work', icon: '💰' },
    { id: 'tech-trends', label: 'Emerging Tech Trends', icon: '🚀' },
    { id: 'top-performers', label: 'Top Performers', icon: '🥇' },
    { id: 'alumni', label: 'Alumni Support', icon: '🤝' },
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
        <h1 className="text-2xl font-bold mb-2">Welcome back, {userDisplayName || currentUser.displayName || 'Student'}!👋</h1>
        <p className="text-blue-100">Continue your learning journey with Helixa IQ Portal</p>
      </div>

      {/* Stats Cards
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
      </div> */}

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
                  <span>{course.solved || 0}/{course.total || 102} Problems solved</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.total ? ((course.solved || 0) / course.total) * 100 : 0}%` }}
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

  const placementCourses = [
    {
      id: 0,
      title: 'Aptitude Round Cheat Sheet',
      instructor: 'Complete aptitude practice problems',
      progress: 0,
      nextClass: 'Flexible Schedule',
      duration: 'Self-paced',
      students: 102,
      icon: '🧮',
      isAptitude: true,
      subtopics: [
        { id: 'average', title: 'Average', subtitle: 'Average problems for quantitative aptitude.', problems: 24 },
        { id: 'timeDistance', title: 'Time & Distance', subtitle: 'Core speed-time-distance patterns and practice.', problems: 16 },
        { id: 'timeWork', title: 'Time & Work', subtitle: 'Work-efficiency, combined work, and related patterns.', problems: 16 },
        { id: 'profitLoss', title: 'Profit & Loss', subtitle: 'Core profit, loss, discount, and related scenarios.', problems: 20 },
        { id: 'interest', title: 'Simple Interest & Compound Interest', subtitle: 'Interest computations and comparisons.', problems: 28 },
        { id: 'ratioProportion', title: 'Ratio & Proportion', subtitle: 'Ratios, proportions, mixtures, and distributions.', problems: 20 },
        { id: 'probability', title: 'Probability', subtitle: 'Fundamentals and applied probability questions.', problems: 8 },
        { id: 'hcfLcm', title: 'HCF & LCM', subtitle: 'Greatest common divisor and least common multiple problems.', problems: 20 },
        { id: 'ages', title: 'Ages', subtitle: 'Age problems including ratios and timelines.', problems: 16 },
        { id: 'permutationsCombinations', title: 'Permutations & Combinations', subtitle: 'Counting techniques with permutations and combinations.', problems: 8 }
      ]
    },
    {
      id: 1,
      title: 'Data Structures & Algorithms',
      instructor: 'Dr. Rajesh Kumar',
      progress: 60,
      nextClass: 'Tomorrow, 10:00 AM',
      duration: '3 months',
      students: 2156,
      icon: '📊'
    },
    {
      id: 2,
      title: 'Full Stack Development',
      instructor: 'Sarah Johnson',
      progress: 45,
      nextClass: 'Friday, 2:00 PM',
      duration: '4 months',
      students: 1834,
      icon: '💻'
    },
    {
      id: 3,
      title: 'Programming Fundamentals',
      instructor: 'Mike Chen',
      progress: 80,
      nextClass: 'Today, 4:00 PM',
      duration: '2 months',
      students: 3241,
      icon: '💡'
    },
    {
      id: 4,
      title: 'Artificial Intelligence',
      instructor: 'Dr. Priya Sharma',
      progress: 30,
      nextClass: 'Monday, 11:00 AM',
      duration: '5 months',
      students: 1456,
      icon: '🤖'
    },
    {
      id: 5,
      title: 'Machine Learning',
      instructor: 'Dr. Alex Thompson',
      progress: 25,
      nextClass: 'Wednesday, 1:00 PM',
      duration: '4 months',
      students: 1234,
      icon: '🧠'
    },
    {
      id: 6,
      title: 'Data Science',
      instructor: 'Dr. Emily Davis',
      progress: 50,
      nextClass: 'Thursday, 3:00 PM',
      duration: '4 months',
      students: 1876,
      icon: '📈'
    }
  ]


  const renderPlacement = () => (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Placement Preparation Kit</h2>
      <div className="mb-6">
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-2">🎯 Placement Ready Courses</h3>
          <p className="text-blue-100 text-sm">Master the skills employers are looking for with our industry-aligned curriculum.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {placementCourses.map(course => (
          <div key={course.id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-white mb-1">{course.title}</h3>
                <p className="text-gray-400 text-sm">by {course.instructor}</p>
              </div>
              <div className="text-2xl ml-2">{course.icon}</div>
            </div>

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

            <div className="space-y-1 text-sm text-gray-300 mb-4">
              <p>📅 Next: {course.nextClass}</p>
              <p>⏱️ Duration: {course.duration}</p>
              <p>👥 Students: {course.students.toLocaleString()}</p>
            </div>

            <button
              onClick={() => course.id === 0 ? navigate('/master-coding-sheet?topic=aptitude') : course.id === 1 ? setShowDSAOptions(true) : course.id === 2 ? navigate('/fullstack-practice') : course.id === 3 ? navigate('/programming-language-selection') : course.id === 4 ? navigate('/ai-practice') : course.id === 5 ? navigate('/ml-practice') : course.id === 6 ? navigate('/ds-practice') : navigate('/master-coding-sheet')}
              className="w-full px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              Practice
            </button>
          </div>
        ))}
      </div>
    </div>
  )
  const renderInternships = () => (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Internships and Job Openings</h2>
      <div className="mb-6">
        <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-2">🎯 Find Your Dream Internship or Job</h3>
          <p className="text-indigo-100 text-sm">Discover curated internship and job opportunities from top companies worldwide, including tech giants, startups, and global organizations.</p>
        </div>
      </div>

      {/* Top Free Platforms */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="text-green-400 mr-2">🌟</span>
          Top Free Platforms for Internships & Job Openings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="https://www.linkedin.com/jobs/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">LinkedIn Jobs</h3>
              <span className="text-2xl">💼</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Global Jobs & Internships</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Find Opportunities
            </div>
          </a>

          <a
            href="https://internshala.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Internshala</h3>
              <span className="text-2xl">🇮🇳</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Best for Internships in India</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Apply Now
            </div>
          </a>

          <a
            href="https://www.glassdoor.com/Job/index.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Glassdoor</h3>
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Jobs, Internships & Company Reviews</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Browse Jobs
            </div>
          </a>

          <a
            href="https://www.indeed.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Indeed</h3>
              <span className="text-2xl">🔍</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">World's #1 Job Platform</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Search Jobs
            </div>
          </a>

          <a
            href="https://www.naukri.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Naukri.com</h3>
              <span className="text-2xl">📋</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Jobs & Internships (India)</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Find Jobs
            </div>
          </a>

          <a
            href="https://wellfound.com/jobs"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Wellfound</h3>
              <span className="text-2xl">🚀</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Startup Jobs Worldwide</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Startup Jobs
            </div>
          </a>

          <a
            href="https://careers.google.com/students/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Google Careers</h3>
              <span className="text-2xl">🔤</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Internships & Full-Time Roles</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Apply to Google
            </div>
          </a>

          <a
            href="https://jobs.careers.microsoft.com/global/en/students-and-graduates"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Microsoft Careers</h3>
              <span className="text-2xl">🪟</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Internships + Graduate Roles</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Microsoft Jobs
            </div>
          </a>

          <a
            href="https://www.amazon.jobs/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Amazon Jobs</h3>
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Internships + SDE Roles</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Amazon Careers
            </div>
          </a>

          <a
            href="https://www.metacareers.com/jobs/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Meta Careers</h3>
              <span className="text-2xl">📘</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Internships & New Grad Roles</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Meta Jobs
            </div>
          </a>
        </div>
      </div>

      {/* Tech-Specific Platforms */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="text-blue-400 mr-2">🧠</span>
          Tech-Specific Internship Platforms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="https://www.kaggle.com/jobs"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Kaggle</h3>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Data Science & ML Internships</p>
            <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
              DS/ML Jobs
            </div>
          </a>

          <a
            href="https://github.com/community/jobs"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">GitHub Jobs</h3>
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Community Job Boards</p>
            <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
              Developer Jobs
            </div>
          </a>

          <a
            href="https://stackoverflow.com/jobs"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">StackOverflow Jobs</h3>
              <span className="text-2xl">💻</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">For Developers</p>
            <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
              Dev Jobs
            </div>
          </a>
        </div>
      </div>

      {/* Student Internship Portals */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="text-purple-400 mr-2">🎓</span>
          Student Internship Portals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="https://nextstep.tcs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">TCS CareerNext</h3>
              <span className="text-2xl">🏢</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Internships & Graduate Roles</p>
            <div className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm text-center hover:bg-purple-700 transition-colors">
              TCS Careers
            </div>
          </a>

          <a
            href="https://careers.wipro.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Wipro Careers</h3>
              <span className="text-2xl">💼</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Internship/Graduate Hiring</p>
            <div className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm text-center hover:bg-purple-700 transition-colors">
              Wipro Jobs
            </div>
          </a>

          <a
            href="https://www.ibm.com/employment/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">IBM Career Portal</h3>
              <span className="text-2xl">🌐</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Extreme Blue Internships</p>
            <div className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm text-center hover:bg-purple-700 transition-colors">
              IBM Careers
            </div>
          </a>
        </div>
      </div>

      {/* Global Opportunities */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="text-orange-400 mr-2">🌐</span>
          Global Opportunities for Students
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="https://careers.un.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-orange-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">UN Careers</h3>
              <span className="text-2xl">🇺🇳</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Internships Worldwide</p>
            <div className="w-full px-3 py-2 bg-orange-600 text-white rounded-lg text-sm text-center hover:bg-orange-700 transition-colors">
              UN Internships
            </div>
          </a>

          <a
            href="https://www.oecd.org/careers/internship-programme/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-orange-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">OECD Internship</h3>
              <span className="text-2xl">🏛️</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">OECD Internship Programme</p>
            <div className="w-full px-3 py-2 bg-orange-600 text-white rounded-lg text-sm text-center hover:bg-orange-700 transition-colors">
              OECD Careers
            </div>
          </a>

          <a
            href="https://www.nato.int/cps/en/natolive/71013.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-orange-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">NATO Internship</h3>
              <span className="text-2xl">🛡️</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">NATO Internship Programme</p>
            <div className="w-full px-3 py-2 bg-orange-600 text-white rounded-lg text-sm text-center hover:bg-orange-700 transition-colors">
              NATO Careers
            </div>
          </a>
        </div>
      </div>

      {/* Remote Internship Platforms */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="text-teal-400 mr-2">💼</span>
          Remote Internship Platforms (Global)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="https://www.theforage.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-teal-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Forage</h3>
              <span className="text-2xl">🌱</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Virtual Internships (FREE)</p>
            <div className="w-full px-3 py-2 bg-teal-600 text-white rounded-lg text-sm text-center hover:bg-teal-700 transition-colors">
              Virtual Internships
            </div>
          </a>

          <a
            href="https://remoteok.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-teal-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">RemoteOK</h3>
              <span className="text-2xl">🏠</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Remote Jobs Worldwide</p>
            <div className="w-full px-3 py-2 bg-teal-600 text-white rounded-lg text-sm text-center hover:bg-teal-700 transition-colors">
              Remote Jobs
            </div>
          </a>

          <a
            href="https://weworkremotely.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-teal-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">WeWorkRemotely</h3>
              <span className="text-2xl">💻</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Remote Hiring Board</p>
            <div className="w-full px-3 py-2 bg-teal-600 text-white rounded-lg text-sm text-center hover:bg-teal-700 transition-colors">
              Remote Work
            </div>
          </a>
        </div>
      </div>

      {/* Bonus Platforms */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="text-pink-400 mr-2">🚀</span>
          Bonus: High-Quality Curated Opportunities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="https://www.internships.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-pink-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Internships.com</h3>
              <span className="text-2xl">🎯</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Dedicated internship portal</p>
            <div className="w-full px-3 py-2 bg-pink-600 text-white rounded-lg text-sm text-center hover:bg-pink-700 transition-colors">
              Find Internships
            </div>
          </a>

          <a
            href="https://www.hirect.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-pink-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Hirect</h3>
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Direct Chat with Recruiters</p>
            <div className="w-full px-3 py-2 bg-pink-600 text-white rounded-lg text-sm text-center hover:bg-pink-700 transition-colors">
              Connect Now
            </div>
          </a>

          <a
            href="https://unstop.com/internships"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-pink-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Unstop</h3>
              <span className="text-2xl">🏆</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Competitions + Internships</p>
            <div className="w-full px-3 py-2 bg-pink-600 text-white rounded-lg text-sm text-center hover:bg-pink-700 transition-colors">
              Compete & Apply
            </div>
          </a>
        </div>
      </div>
    </div>
  )
  const renderResume = () => (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">ATS Resume Building</h2>
      <div className="mb-6">
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-2">📄 Best ATS Resume Templates</h3>
          <p className="text-blue-100 text-sm">Choose from top-rated ATS-optimized resume builders to create professional resumes that pass automated screening systems.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <a
          href="https://novoresume.com/resume-templates?utm_source=chatgpt.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">NovoResume</h3>
            <span className="text-2xl">📝</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Professional ATS-optimized resume templates with modern designs.</p>
          <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
            Visit NovoResume
          </div>
        </a>

        <a
          href="https://www.jobscan.co/resume-templates/ats-templates?utm_source=chatgpt.com#showcase_cta2"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Jobscan</h3>
            <span className="text-2xl">🔍</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">ATS-friendly resume templates with optimization tools.</p>
          <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
            Visit Jobscan
          </div>
        </a>

        <a
          href="https://flowcv.com/resume-templates?utm_source=chatgpt.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">FlowCV</h3>
            <span className="text-2xl">🎨</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Creative and ATS-compatible resume builder with modern templates.</p>
          <div className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm text-center hover:bg-purple-700 transition-colors">
            Visit FlowCV
          </div>
        </a>

        <a
          href="https://resume.io/resume-templates?utm_source=chatgpt.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-orange-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Resume.io</h3>
            <span className="text-2xl">⭐</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Professional resume templates optimized for ATS systems.</p>
          <div className="w-full px-3 py-2 bg-orange-600 text-white rounded-lg text-sm text-center hover:bg-orange-700 transition-colors">
            Visit Resume.io
          </div>
        </a>
      </div>
    </div>
  )
  const renderProjects = () => (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Project Ideas (Industry Level)</h2>
      <div className="mb-6">
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-2">💡 Real-World, Industry-Ready Project Ideas</h3>
          <p className="text-blue-100 text-sm">Discover impactful project ideas inspired by real industry use cases to build a strong and job-ready project portfolio.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          href="/pdfs/4th-semester-works/AI Integrated 50+ Projects (Industry Level).pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
        >
          <h3 className="text-base font-semibold text-white mb-3">AI Integrated 50+ Projects (Industry Level)</h3>
          <p className="text-gray-400 text-sm mb-4">Comprehensive collection of AI-integrated industry-level projects.</p>
          <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center">
            View Projects
          </div>
        </a>

        <a
          href="/pdfs/4th-semester-works/No - AI Integrated 50+ Projects (Industry Level).pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
        >
          <h3 className="text-base font-semibold text-white mb-3">No - AI Integrated 50+ Projects (Industry Level)</h3>
          <p className="text-gray-400 text-sm mb-4">Traditional industry-level projects without AI integration, focusing on core technologies.</p>
          <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center">
            View Projects
          </div>
        </a>

        <a
          href="/pdfs/4th-semester-works/(AI & DS & IOT & CS & Core) 50+ Projects (Industry Level).pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-colors block cursor-pointer"
        >
          <h3 className="text-base font-semibold text-white mb-3">(AI & DS & IOT & CS & Core) 50+ Projects (Industry Level)</h3>
          <p className="text-gray-400 text-sm mb-4">Collection covering AI, Data Science, IoT, CS, and core technologies.</p>
          <div className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm text-center">
            View Projects
          </div>
        </a>
      </div>
    </div>
  )
  const renderHackathons = () => (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Hackathons Live</h2>
      <div className="mb-6">
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-2">🏆 Active Hackathons & Coding Competitions</h3>
          <p className="text-purple-100 text-sm">Participate in live hackathons, coding contests, and challenges to build your portfolio and win prizes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          href="https://devpost.com/hackathons"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Devpost</h3>
            <span className="text-2xl">🏆</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">World's #1 Hackathon Platform</p>
          <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
            View Hackathons
          </div>
        </a>

        <a
          href="https://www.hackerearth.com/challenges/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">HackerEarth</h3>
            <span className="text-2xl">💻</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Ongoing Hackathons + Hiring Challenges</p>
          <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
            View Challenges
          </div>
        </a>

        <a
          href="https://www.codechef.com/contests"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-orange-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">CodeChef</h3>
            <span className="text-2xl">🍳</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Monthly Contests + Long Challenges (Free)</p>
          <div className="w-full px-3 py-2 bg-orange-600 text-white rounded-lg text-sm text-center hover:bg-orange-700 transition-colors">
            View Contests
          </div>
        </a>

        <a
          href="https://www.kaggle.com/competitions"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Kaggle</h3>
            <span className="text-2xl">📊</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">ML/DS Competitions (Free Entry)</p>
          <div className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm text-center hover:bg-purple-700 transition-colors">
            View Competitions
          </div>
        </a>

        <a
          href="https://leetcode.com/contest/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-yellow-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">LeetCode</h3>
            <span className="text-2xl">💡</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Weekly & Biweekly Contests</p>
          <div className="w-full px-3 py-2 bg-yellow-600 text-white rounded-lg text-sm text-center hover:bg-yellow-700 transition-colors">
            View Contests
          </div>
        </a>

        <a
          href="https://www.hackathons.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-pink-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Hackathons.com</h3>
            <span className="text-2xl">🌍</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Everywhere Hackathon Listings</p>
          <div className="w-full px-3 py-2 bg-pink-600 text-white rounded-lg text-sm text-center hover:bg-pink-700 transition-colors">
            View Listings
          </div>
        </a>

        <a
          href="https://mlh.io/seasons"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-indigo-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">MLH</h3>
            <span className="text-2xl">🎓</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Student Hackathons Worldwide</p>
          <div className="w-full px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm text-center hover:bg-indigo-700 transition-colors">
            View Seasons
          </div>
        </a>

        <a
          href="https://gitcoin.co/hackathons"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-teal-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Gitcoin</h3>
            <span className="text-2xl">🌐</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Open Source Bounties & Web3 Hackathons</p>
          <div className="w-full px-3 py-2 bg-teal-600 text-white rounded-lg text-sm text-center hover:bg-teal-700 transition-colors">
            View Hackathons
          </div>
        </a>

        <a
          href="https://www.topcoder.com/challenges"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-red-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">TopCoder</h3>
            <span className="text-2xl">🏃</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">SRMs + Marathon Matches</p>
          <div className="w-full px-3 py-2 bg-red-600 text-white rounded-lg text-sm text-center hover:bg-red-700 transition-colors">
            View Challenges
          </div>
        </a>

        <a
          href="https://taikah.com/hackathons"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-cyan-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">TAIKAH</h3>
            <span className="text-2xl">🤖</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">AI/ML & Coding Hackathons (New platform)</p>
          <div className="w-full px-3 py-2 bg-cyan-600 text-white rounded-lg text-sm text-center hover:bg-cyan-700 transition-colors">
            View Hackathons
          </div>
        </a>

        <a
          href="https://unstop.com/hackathons"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-lime-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Unstop</h3>
            <span className="text-2xl">🇮🇳</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">India's largest Hackathon Portal</p>
          <div className="w-full px-3 py-2 bg-lime-600 text-white rounded-lg text-sm text-center hover:bg-lime-700 transition-colors">
            View Hackathons
          </div>
        </a>

        <a
          href="https://angelhack.com/hackathons/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-rose-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">AngelHack</h3>
            <span className="text-2xl">👼</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Global Hackathon Community</p>
          <div className="w-full px-3 py-2 bg-rose-600 text-white rounded-lg text-sm text-center hover:bg-rose-700 transition-colors">
            View Hackathons
          </div>
        </a>

        <a
          href="https://developer.microsoft.com/en-us/reactor/events/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-400 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Microsoft Reactor</h3>
            <span className="text-2xl">☁️</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Cloud/AI Hack Events (Hiring-focused)</p>
          <div className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg text-sm text-center hover:bg-blue-600 transition-colors">
            View Events
          </div>
        </a>

        <a
          href="https://gdg.community.dev/events/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-400 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">GDG</h3>
            <span className="text-2xl">🌟</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Local Hackathons (Hiring-focused)</p>
          <div className="w-full px-3 py-2 bg-green-500 text-white rounded-lg text-sm text-center hover:bg-green-600 transition-colors">
            View Events
          </div>
        </a>

        <a
          href="https://aws.amazon.com/events/hackathons/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-orange-400 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">AWS Hackathons</h3>
            <span className="text-2xl">⚡</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Cloud & Serverless Competitions (Hiring-focused)</p>
          <div className="w-full px-3 py-2 bg-orange-500 text-white rounded-lg text-sm text-center hover:bg-orange-600 transition-colors">
            View Hackathons
          </div>
        </a>
      </div>
    </div>
  )
  const renderInterviews = () => (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Mock Interviews Prep</h2>
      <div className="mb-6">
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-2">🎭 AI-Powered Mock Interview Practice</h3>
          <p className="text-green-100 text-sm">Practice mock interviews with AI-powered feedback, real-time evaluation, and personalized coaching to ace your next interview.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          href="https://grow.google/certificates/interview-warmup/?utm_source=chatgpt.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Google Interview Warmup</h3>
            <span className="text-2xl">🎯</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Practice interviews with Google's AI-powered platform</p>
          <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
            Start Practice
          </div>
        </a>

        <a
          href="https://www.finalroundai.com/ai-mock-interview?utm_source=chatgpt.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Final Round AI</h3>
            <span className="text-2xl">🤖</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">AI-powered mock interviews with detailed feedback</p>
          <div className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm text-center hover:bg-purple-700 transition-colors">
            Try AI Interview
          </div>
        </a>

        <a
          href="https://himalayas.app/ai-interview?utm_source=chatgpt.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Himalayas</h3>
            <span className="text-2xl">🏔️</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">AI interview practice for job seekers</p>
          <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
            Start Interview
          </div>
        </a>

        <a
          href="https://freemockinterview.com/?utm_source=chatgpt.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-orange-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Free Mock Interview</h3>
            <span className="text-2xl">💬</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Free mock interview practice platform</p>
          <div className="w-full px-3 py-2 bg-orange-600 text-white rounded-lg text-sm text-center hover:bg-orange-700 transition-colors">
            Practice Free
          </div>
        </a>

        <a
          href="https://www.tryexponent.com/practice?utm_source=chatgpt.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-red-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Exponent</h3>
            <span className="text-2xl">📈</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Practice coding interviews with real engineers</p>
          <div className="w-full px-3 py-2 bg-red-600 text-white rounded-lg text-sm text-center hover:bg-red-700 transition-colors">
            Start Practice
          </div>
        </a>

        <a
          href="https://remasto.com/?utm_source=chatgpt.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-teal-500 transition-colors block cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Remasto</h3>
            <span className="text-2xl">🎪</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Mock interview platform for comprehensive practice</p>
          <div className="w-full px-3 py-2 bg-teal-600 text-white rounded-lg text-sm text-center hover:bg-teal-700 transition-colors">
            Begin Practice
          </div>
        </a>
      </div>
    </div>
  )
  const renderFreelancing = () => (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Freelancing Work</h2>
      <div className="mb-6">
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-2">💰 Start Your Freelancing Journey</h3>
          <p className="text-yellow-100 text-sm">Find freelance opportunities, build your skills, and create a portfolio to land high-paying projects.</p>
        </div>
      </div>

      {/* Top FREE Freelancing Platforms */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="text-green-400 mr-2">🎯</span>
          Top FREE Freelancing Platforms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="https://www.upwork.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Upwork</h3>
              <span className="text-2xl">💼</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">World's Biggest Freelancing Marketplace</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Start Freelancing
            </div>
          </a>

          <a
            href="https://www.fiverr.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Fiverr</h3>
              <span className="text-2xl">🎨</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Gig-based Freelancing Platform</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Find Gigs
            </div>
          </a>

          <a
            href="https://www.freelancer.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Freelancer.com</h3>
              <span className="text-2xl">🌐</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Global Freelance Marketplace</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Browse Projects
            </div>
          </a>

          <a
            href="https://www.peopleperhour.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">PeoplePerHour</h3>
              <span className="text-2xl">⏰</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">High-quality Freelance Projects</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Find Work
            </div>
          </a>

          <a
            href="https://www.guru.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Guru</h3>
              <span className="text-2xl">👨‍💻</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Freelancing for Developers, Designers, Writers</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Get Started
            </div>
          </a>

          <a
            href="https://www.toptal.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Toptal</h3>
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Premium Freelance Network (High Paying)</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Apply Now
            </div>
          </a>

          <a
            href="https://www.truelancer.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Truelancer</h3>
              <span className="text-2xl">🇮🇳</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Great for Indian Freelancers</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Join Now
            </div>
          </a>

          <a
            href="https://www.workana.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Workana</h3>
              <span className="text-2xl">🚀</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Freelance Projects for Beginners</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Start Here
            </div>
          </a>

          <a
            href="https://www.flexjobs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">FlexJobs</h3>
              <span className="text-2xl">🏠</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Remote & Freelance Job Board</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Find Remote Work
            </div>
          </a>

          <a
            href="https://arc.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Arc.dev</h3>
              <span className="text-2xl">⚡</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Freelance Remote Jobs for Developers</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Developer Jobs
            </div>
          </a>
        </div>
      </div>

      {/* Free Learning Platforms */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="text-blue-400 mr-2">📚</span>
          Free Learning Platforms to Build Freelancing Skills
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="https://www.coursera.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Coursera</h3>
              <span className="text-2xl">🎓</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Courses on Freelancing, Business, Marketing</p>
            <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
              Learn Skills
            </div>
          </a>

          <a
            href="https://www.youtube.com/results?search_query=freelancing+for+beginners"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">YouTube</h3>
              <span className="text-2xl">📺</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Complete Freelancing Tutorials</p>
            <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
              Watch Tutorials
            </div>
          </a>

          <a
            href="https://www.udemy.com/courses/free/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Udemy Free</h3>
              <span className="text-2xl">🆓</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Freelancing Basics Courses</p>
            <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
              Free Courses
            </div>
          </a>

          <a
            href="https://academy.hubspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">HubSpot Academy</h3>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Free Business & Client Management Courses</p>
            <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
              Business Skills
            </div>
          </a>

          <a
            href="https://www.skillshare.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Skillshare</h3>
              <span className="text-2xl">🎨</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Freelancing, Branding, Client Skills</p>
            <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
              Start Learning
            </div>
          </a>
        </div>
      </div>

      {/* Bonus Platforms */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="text-purple-400 mr-2">🌟</span>
          Bonus Platforms to Build Portfolio + Earn Money
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">GitHub</h3>
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Showcase your projects (essential for technical freelancing)</p>
            <div className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm text-center hover:bg-purple-700 transition-colors">
              Build Portfolio
            </div>
          </a>

          <a
            href="https://www.behance.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Behance</h3>
              <span className="text-2xl">🎨</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Portfolio for UI/UX, designers, creatives</p>
            <div className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm text-center hover:bg-purple-700 transition-colors">
              Showcase Work
            </div>
          </a>

          <a
            href="https://dribbble.com/jobs"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Dribbble</h3>
              <span className="text-2xl">💎</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Portfolio + freelance design jobs</p>
            <div className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm text-center hover:bg-purple-700 transition-colors">
              Design Jobs
            </div>
          </a>
        </div>
      </div>
    </div>
  )
  const renderTechTrends = () => (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Emerging Tech Trends</h2>
      <div className="mb-6">
        <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-2">🚀 Future-Ready Technologies</h3>
          <p className="text-cyan-100 text-sm">Master cutting-edge technologies with curated video tutorials and comprehensive notes to stay ahead in your career.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Gen AI</h3>
            <span className="text-2xl">🤖</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Generative AI fundamentals and applications</p>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/gen-ai-video-player')}
              className="w-full px-3 py-2 bg-red-600 text-white rounded-lg text-sm text-center hover:bg-red-700 transition-colors block"
            >
              📹 Watch Video
            </button>
            <a
              href="https://www.geeksforgeeks.org/batch/skill-up-generative-ai?tab=Chapters"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors block"
            >
              📚 View Notes
            </a>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Agentic AI</h3>
            <span className="text-2xl">🧠</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">AI agents and autonomous systems</p>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/agentic-ai-video-player')}
              className="w-full px-3 py-2 bg-red-600 text-white rounded-lg text-sm text-center hover:bg-red-700 transition-colors block"
            >
              📹 Watch Video
            </button>
            <a
              href="https://www.geeksforgeeks.org/batch/skill-up-agentic-ai?tab=Chapters"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors block"
            >
              📚 View Notes
            </a>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">DevOps</h3>
            <span className="text-2xl">⚙️</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Development and operations integration</p>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/devops-video-player')}
              className="w-full px-3 py-2 bg-red-600 text-white rounded-lg text-sm text-center hover:bg-red-700 transition-colors block"
            >
              📹 Watch Video
            </button>
            <a
              href="https://www.geeksforgeeks.org/batch/skill-up-devops?tab=Chapters"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors block"
            >
              📚 View Notes
            </a>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
           <div className="flex items-center justify-between mb-3">
             <h3 className="text-base font-semibold text-white">N8N</h3>
             <span className="text-2xl">🔗</span>
           </div>
           <p className="text-gray-400 text-sm mb-4">Workflow automation platform</p>
           <div className="space-y-2">
             <button
               onClick={() => navigate('/n8n-video-player')}
               className="w-full px-3 py-2 bg-red-600 text-white rounded-lg text-sm text-center hover:bg-red-700 transition-colors block"
             >
               📹 Watch Video
             </button>
             <a
               href="/pdfs/4th-semester-works/The Ultimate n8n Starter Kit (2025).pdf"
               target="_blank"
               rel="noopener noreferrer"
               className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors block"
             >
               📚 View Notes
             </a>
           </div>
         </div>

        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
           <div className="flex items-center justify-between mb-3">
             <h3 className="text-base font-semibold text-white">Langchain</h3>
             <span className="text-2xl">⛓️</span>
           </div>
           <p className="text-gray-400 text-sm mb-4">LLM application development framework</p>
           <div className="space-y-2">
             <button
               onClick={() => navigate('/langchain-video-player')}
               className="w-full px-3 py-2 bg-red-600 text-white rounded-lg text-sm text-center hover:bg-red-700 transition-colors block"
             >
               📹 Watch Video
             </button>
             <a
               href="https://www.geeksforgeeks.org/artificial-intelligence/introduction-to-langchain/"
               target="_blank"
               rel="noopener noreferrer"
               className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors block"
             >
               📚 View Notes
             </a>
           </div>
         </div>

        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Git & GitHub</h3>
            <span className="text-2xl">📦</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Version control and collaboration</p>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/git-github-video-player')}
              className="w-full px-3 py-2 bg-red-600 text-white rounded-lg text-sm text-center hover:bg-red-700 transition-colors block"
            >
              📹 Watch Video
            </button>
            <a
              href="https://www.geeksforgeeks.org/batch/skill-up-git?tab=Chapters"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors block"
            >
              📚 View Notes
            </a>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">SQL</h3>
            <span className="text-2xl">🗄️</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Database querying and management</p>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/sql-video-player')}
              className="w-full px-3 py-2 bg-red-600 text-white rounded-lg text-sm text-center hover:bg-red-700 transition-colors block"
            >
              📹 Watch Video
            </button>
            <a
              href="/pdfs/4th-semester-works/SQL_handwritten_note.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors block"
            >
              📚 View Notes
            </a>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Linux</h3>
            <span className="text-2xl">🐧</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Operating system fundamentals</p>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/linux-video-player')}
              className="w-full px-3 py-2 bg-red-600 text-white rounded-lg text-sm text-center hover:bg-red-700 transition-colors block"
            >
              📹 Watch Video
            </button>
            <a
              href="https://www.geeksforgeeks.org/batch/skill-up-linux?tab=Chapters"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors block"
            >
              📚 View Notes
            </a>
          </div>
        </div>
      </div>
    </div>
  )
  const renderTopPerformers = () => renderSection('top-performers', 'Top Performers', 'Celebrating our top-performing students and their achievements.')
  const handleAlumniTabChange = (batchYear, specialization) => {
    setAlumniActiveTabs(prev => ({
      ...prev,
      [batchYear]: specialization
    }))
  }

  const renderAlumni = () => {

    // Sample alumni data - in a real app, this would come from an API
    const alumniData = {
      2022: {
        'AI & ML': [
          
        ],
        'Data Science': [
          
        ],
        'IOT': [
          
        ],
        'Cyber Security': [
          
        ],
        'Core CS': [
          
        ]
      },
      2023: {
        'AI & ML': [
          { id: 1, name: 'Pavan Kalyan', email: 'vairagadepavan123@gmail.com', company: 'Helixa Technologies', linkedin: 'https://linkedin.com/in/pavankalyan031' },
          { id: 2, name: 'Vivek Singh', email: 'viveksingh123@gmail.com', company: 'AISECT', linkedin: 'https://www.linkedin.com/in/vivek-singh-a77502319/' }
        ],
        'Data Science': [
          { id: 1, name: 'Dhamodhar', email: 'dhamodhar123@gmail.com', company: 'Easy4Naukri', linkedin: 'https://www.linkedin.com/in/dhamodhar-ganganipalli-9b6a262b9/' },
          { id: 2, name: 'Bhanu Prakash', email: 'bhanuprakash123@gmail.com', company: 'AISECT', linkedin: 'https://linkedin.com/in/bhanuprakash' }
        ],
        'IOT': [
          { id: 1, name: 'Anup Kumar', email: 'anupkumar123@gmail.com', company: 'ABC', linkedin: 'https://linkedin.com/in/anupkumar' },
          { id: 2, name: 'Ankit Singh', email: 'ankitsingh123@gmail.com', company: 'ABC', linkedin: 'https://linkedin.com/in/ankitsingh' }
        ],
        'Cyber Security': [
          { id: 1, name: 'Rajveer Kushwaha', email: 'rajveer123@gmail.com', company: 'Check Point', linkedin: 'https://linkedin.com/in/rajveer' }
        ],
        'Core CS': [
          
        ]
      },
      2024: {
        'AI & ML': [
          
        ],
        'Data Science': [
          
        ],
        'IOT': [
          
        ],
        'Cyber Security': [
          
        ],
        'Core CS': [
          
        ]
      },
      2025: {
        'AI & ML': [
          
        ],
        'Data Science': [
          
        ],
        'IOT': [
          
        ],
        'Cyber Security': [
          
        ],
        'Core CS': [
          
        ]
      }
    }

    const specializations = ['AI & ML', 'Data Science', 'IOT', 'Cyber Security', 'Core CS']

    return (
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Alumni Support</h2>
        <div className="mb-6">
          <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">🤝 Connect with Successful Alumni</h3>
            <p className="text-emerald-100 text-sm">Get career guidance, job references, and mentorship from our accomplished alumni working at top companies worldwide.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[2025, 2024, 2023, 2022].map(batchYear => (
            <div key={batchYear} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Batch {batchYear}</h3>
                <span className="text-2xl">🎓</span>
              </div>

              {/* Specialization Tabs */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {specializations.map(spec => (
                    <button
                      key={spec}
                      onClick={() => handleAlumniTabChange(batchYear, spec)}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        alumniActiveTabs[batchYear] === spec
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>

              {/* Alumni Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 px-2 text-gray-400 font-medium">Sr.No</th>
                      <th className="text-left py-2 px-2 text-gray-400 font-medium">Name</th>
                      <th className="text-left py-2 px-2 text-gray-400 font-medium">Batch Year</th>
                      <th className="text-left py-2 px-2 text-gray-400 font-medium">Specialization</th>
                      <th className="text-left py-2 px-2 text-gray-400 font-medium">Email ID</th>
                      <th className="text-left py-2 px-2 text-gray-400 font-medium">Current Working Company</th>
                      <th className="text-left py-2 px-2 text-gray-400 font-medium">LinkedIn Profile Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alumniData[batchYear]?.[alumniActiveTabs[batchYear] || 'AI & ML']?.map(alumni => (
                      <tr key={alumni.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                        <td className="py-3 px-2 text-gray-300">{alumni.id}</td>
                        <td className="py-3 px-2 text-white font-medium">{alumni.name}</td>
                        <td className="py-3 px-2 text-gray-300">{batchYear}</td>
                        <td className="py-3 px-2 text-blue-400">{alumniActiveTabs[batchYear] || 'AI & ML'}</td>
                        <td className="py-3 px-2 text-blue-400"><a href={`mailto:${alumni.email}`} className="hover:text-blue-300">{alumni.email}</a></td>
                        <td className="py-3 px-2 text-green-400">{alumni.company}</td>
                        <td className="py-3 px-2 text-blue-400"><a href={alumni.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">View Profile</a></td>
                      </tr>
                    )) || (
                      <tr>
                        <td colSpan="7" className="py-4 px-2 text-center text-gray-500">
                          No alumni data available for this specialization
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-xs text-gray-400">
                Click on specialization tabs to view alumni from different fields
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
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
      case 'freelancing': return renderFreelancing()
      case 'tech-trends': return renderTechTrends()
      case 'top-performers': return renderTopPerformers()
      case 'alumni': return renderAlumni()
      case 'support': return renderSupport()
      default: return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header - Fixed at top, not scrollable */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-30 flex-shrink-0">
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
                  alt="Helixa IQ Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Helixa IQ Portal</h1>
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

      {/* Main Content Area - Scrollable below header */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-72 bg-gray-800 border-r border-gray-700 flex-shrink-0">
          <nav className="p-3 h-full overflow-y-auto">
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

        {/* Main Content - Only this area scrolls */}
        <div className="flex-1 p-4 overflow-y-auto">
          {renderContent()}
        </div>
      </div>

      {/* DSA Options Modal */}
      {showDSAOptions && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-600 rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Data Structures & Algorithms</h2>
                <p className="text-gray-400">Choose your preferred programming language</p>
              </div>
              <button
                onClick={() => setShowDSAOptions(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Programming Language Options */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">📚 Learn DSA with Programming Languages</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">🐍</span>
                    <div>
                      <h4 className="text-white font-medium">DSA with Python</h4>
                      <p className="text-gray-400 text-sm">Beginner-friendly syntax</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>✅ Easy to learn</p>
                    <p>✅ Rich libraries</p>
                    <p>✅ Great for interviews</p>
                  </div>
                  <button className="w-full mt-3 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Start Python DSA
                  </button>
                </div>

                <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 hover:border-green-500 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <h4 className="text-white font-medium">DSA with C++</h4>
                      <p className="text-gray-400 text-sm">Industry standard</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>✅ High performance</p>
                    <p>✅ Memory control</p>
                    <p>✅ FAANG favorite</p>
                  </div>
                  <button className="w-full mt-3 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    Start C++ DSA
                  </button>
                </div>

                <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 hover:border-orange-500 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">☕</span>
                    <div>
                      <h4 className="text-white font-medium">DSA with Java</h4>
                      <p className="text-gray-400 text-sm">Object-oriented approach</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>✅ Platform independent</p>
                    <p>✅ Strong OOP concepts</p>
                    <p>✅ Enterprise ready</p>
                  </div>
                  <button className="w-full mt-3 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">
                    Start Java DSA
                  </button>
                </div>
              </div>
            </div>

            {/* Master Coding Button */}
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('/master-coding-sheet')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🎯 Master Coding — 413 problems, exact patterns to ace your interviews
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LMSPortal