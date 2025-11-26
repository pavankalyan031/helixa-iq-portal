import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'

// WhatsApp contact component
const WhatsAppContact = ({ phoneNumber = '+919391485316', message = "Hi, I am looking for academic guidance and would like to connect with an advisor.", className = "" }) => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`px-4 py-2 bg-green-500/20 text-white rounded hover:bg-green-600/30 border border-green-400/30 backdrop-blur-sm ${className}`}
    >
      💬 Contact via WhatsApp
    </button>
  )
}

const years = [
  { id:1, name: 'First Year', semesters: ['1st Semester','2nd Semester'] },
  { id:2, name: 'Second Year', semesters: ['3rd Semester','4th Semester'] },
  { id:3, name: 'Third Year', semesters: ['5th Semester','6th Semester'] },
  { id:4, name: 'Fourth Year', semesters: ['7th Semester','8th Semester'] }
]

const specializations = ['AIML','DS','IOT','Cyber Security']
const subjects = ['Data Structures','Operating Systems','DBMS','Computer Networks','AI Basics']

export default function Home({user}){
  const navigate = useNavigate()
  const [openYear, setOpenYear] = React.useState(null)
  const [openSemester, setOpenSemester] = React.useState(null)
  const [openSpec, setOpenSpec] = React.useState(null)
  const [userData, setUserData] = React.useState(null)
  const [uploading, setUploading] = React.useState(false)

  // Dynamic content states
  const [events, setEvents] = React.useState([])
  const [announcements, setAnnouncements] = React.useState([])
  const [deadlines, setDeadlines] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  // Events carousel state
  const [currentEventIndex, setCurrentEventIndex] = React.useState(0)
  const eventsPerPage = 3

  React.useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            setUserData(userDoc.data())
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
    }
    fetchUserData()
  }, [user])

  // Load dynamic content from Firebase
  React.useEffect(() => {
    const loadDynamicContent = async () => {
      try {
        setLoading(true)
        console.log('🔄 Loading dynamic content from Firebase...')

        // Load events
        console.log('📅 Loading events...')
        try {
          console.log('🔍 Creating events query...')
          const eventsQuery = query(collection(db, 'events'), orderBy('createdAt', 'desc'))
          console.log('📡 Executing query...')
          const eventsSnapshot = await getDocs(eventsQuery)
          console.log('📦 Got snapshot with', eventsSnapshot.size, 'documents')

          const eventsData = eventsSnapshot.docs.map(doc => {
            const data = doc.data()
            console.log('📋 Document:', doc.id, data)
            return { id: doc.id, ...data }
          })

          console.log('✅ Events loaded:', eventsData.length, 'events')
          console.log('📋 Final events data:', eventsData)

          if (eventsData.length > 0) {
            console.log('🎯 Setting Firebase events in state - SUCCESS!')
            setEvents(eventsData)
            console.log('📋 Events state should now be:', eventsData)
          } else {
            console.log('⚠️ No events found in Firebase, using fallback')
            throw new Error('No events in Firebase')
          }
        } catch (eventsError) {
          console.error('❌ Events query failed:', eventsError)
          console.error('❌ Error details:', eventsError.message)
          console.error('❌ Error stack:', eventsError.stack)
          throw eventsError // Re-throw to trigger fallback
        }

        // Load announcements
        console.log('📢 Loading announcements...')
        const announcementsQuery = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'), limit(3))
        const announcementsSnapshot = await getDocs(announcementsQuery)
        const announcementsData = announcementsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        console.log('✅ Announcements loaded:', announcementsData.length, 'announcements')
        setAnnouncements(announcementsData)

        // Load deadlines
        console.log('⏰ Loading deadlines...')
        const deadlinesQuery = query(collection(db, 'deadlines'), orderBy('dueDate', 'asc'), limit(2))
        const deadlinesSnapshot = await getDocs(deadlinesQuery)
        const deadlinesData = deadlinesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        console.log('✅ Deadlines loaded:', deadlinesData.length, 'deadlines')
        setDeadlines(deadlinesData)

        console.log('🎉 All Firebase data loaded successfully!')

      } catch (error) {
        console.error('❌ Error loading dynamic content:', error)
        console.log('🔄 Falling back to default data...')

        // Fallback to default data if Firebase fails
        setEvents([
          { title: 'Tech Talk: AI in Education', description: 'Explore how artificial intelligence is transforming educational methodologies', date: '2024-03-15', type: 'academic' },
          { title: 'Career Fair', description: 'Connect with top companies and discover exciting career opportunities', date: '2024-04-05', type: 'academic' },
          { title: 'Cultural Fest', description: 'Celebrate diversity through music, dance, and cultural performances', date: '2024-04-20', type: 'cultural' }
        ])
        setAnnouncements([
          { title: 'Mid-term Exam Schedule', content: 'Available now - Check your email', type: 'academic', priority: 'high' },
          { title: 'New Course Registration', content: 'Opens next week', type: 'academic', priority: 'medium' },
          { title: 'Scholarship Applications', content: 'Deadline: March 30', type: 'general', priority: 'high' }
        ])
        setDeadlines([
          { title: 'Data Structures Assignment', description: 'Submit your data structures assignment', dueDate: '2024-03-20', priority: 'high' },
          { title: 'AI Project Proposal', description: 'Submit your AI project proposal', dueDate: '2024-03-25', priority: 'medium' }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadDynamicContent()
  }, [])

  const getGenderEmoji = (gender) => {
    switch (gender) {
      case 'Male': return '👨‍💻'
      case 'Female': return '👩‍💻'
      default: return '👨‍🎓'
    }
  }

  async function handleFile(e){
    const file = e.target.files[0]
    if(!file) return
    setUploading(true)
    const storageRef = ref(storage, 'avatars/' + user.uid + '/' + file.name)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    await updateProfile(user, { photoURL: url })
    setUploading(false)
    window.location.reload()
  }

  // Events carousel navigation
  const nextEvents = () => {
    setCurrentEventIndex((prevIndex) =>
      (prevIndex + eventsPerPage) >= events.length ? 0 : prevIndex + eventsPerPage
    )
  }

  const prevEvents = () => {
    setCurrentEventIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, events.length - eventsPerPage) : Math.max(0, prevIndex - eventsPerPage)
    )
  }

  // Get current events to display
  const currentEvents = events.slice(currentEventIndex, currentEventIndex + eventsPerPage)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      <Header user={user}/>
      <div className="container mx-auto p-6">
        <main>
          <section id="dashboard" className="mb-8">
            <div className="mb-8 p-8 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl text-center border border-white/20 animate-fade-in relative z-10">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>

              <div className="relative z-10">
                <div className="text-6xl mb-4 text-white animate-pulse">
                  {userData?.gender ? getGenderEmoji(userData.gender) : '🎓'}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  Welcome back, <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">{user?.displayName || user?.email}</span>!
                </h1>
                <p className="text-lg text-white/90 font-medium">
                  🚀 Ready to excel in your academic journey?
                </p>
              </div>
            </div>

            <div className="p-6 bg-white/10 backdrop-blur-2xl text-white rounded-2xl shadow-xl mb-6 animate-slide-up border border-white/20 relative z-10">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2 text-center">Academic Progress</h2>
                <p className="text-white/90 text-center">Navigate through your educational journey with interactive exploration</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {years.map((y, index) => {
                const yearEmojis = ['🎓', '🌱', '🚀', '🎯'];
                return (
                  <div key={y.id} className="p-6 bg-white rounded-lg shadow-lg transform hover:-translate-y-1 transition">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{yearEmojis[index]}</div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{y.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">Track your progress through semesters and specializations in {y.name.toLowerCase()}.</p>
                      <button onClick={()=> navigate(`/year/${y.id}`)} className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition shadow-lg">
                        Explore Journey ✨
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-6 bg-white/10 backdrop-blur-2xl rounded-lg shadow-lg border border-white/20 relative z-10">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg"></div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 text-white">Recent Announcements</h3>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-3 bg-gray-50 rounded animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : announcements.length > 0 ? (
                <ul className="space-y-3">
                  {announcements.map((announcement) => (
                    <li key={announcement.id} className={`p-3 border-l-4 rounded backdrop-blur-sm ${
                      announcement.priority === 'high' ? 'bg-yellow-500/20 border-yellow-400 text-white' :
                      announcement.priority === 'medium' ? 'bg-blue-500/20 border-blue-400 text-white' :
                      'bg-green-500/20 border-green-400 text-white'
                    }`}>
                      <div className="font-semibold text-sm">{announcement.title}</div>
                      <div className="text-xs text-white/80">{announcement.content}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-4 text-white/70">
                  <div className="text-2xl mb-2">📢</div>
                  <p>No announcements available</p>
                </div>
              )}
              </div>
            </div>

            <div className="mt-8 p-6 bg-white/10 backdrop-blur-2xl rounded-lg shadow-lg border border-white/20 relative z-10">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg"></div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 text-white">Upcoming Deadlines</h3>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2].map(i => (
                    <div key={i} className="p-3 border rounded animate-pulse">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : deadlines.length > 0 ? (
                <ul className="space-y-3">
                  {deadlines.map((deadline) => (
                    <li key={deadline.id} className="flex justify-between items-center p-3 border border-white/20 rounded backdrop-blur-sm bg-white/10">
                      <div>
                        <div className="font-semibold text-sm text-white">{deadline.title}</div>
                        <div className="text-xs text-white/80">Due: {new Date(deadline.dueDate).toLocaleDateString()}</div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        deadline.priority === 'high' ? 'bg-red-500/20 text-red-200 border border-red-400/30' :
                        deadline.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-200 border border-yellow-400/30' :
                        'bg-green-500/20 text-green-200 border border-green-400/30'
                      }`}>
                        {deadline.priority}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-4 text-white/70">
                  <div className="text-2xl mb-2">⏰</div>
                  <p>No upcoming deadlines</p>
                </div>
              )}
              </div>
            </div>
          </section>

          <section id="services" className="mb-8">
            <div className="p-6 bg-white/10 backdrop-blur-2xl text-white rounded-2xl shadow-xl mb-6 animate-slide-up border border-white/20 relative z-10">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-2 text-center">🎓 Student Services</h3>
                <p className="text-white/90 text-center">Access essential academic and administrative services</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-xl p-8 border border-white/20 animate-fade-in relative z-10">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg text-center hover:shadow-lg transition border border-white/20">
                <div className="text-3xl mb-2 text-white">📊</div>
                <h4 className="font-semibold mb-2 text-white">View Attendance</h4>
                <button onClick={() => alert('Attendance: 92%')} className="px-4 py-2 bg-blue-500/20 text-white rounded hover:bg-blue-600/30 border border-blue-400/30 backdrop-blur-sm">Check</button>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg text-center hover:shadow-lg transition border border-white/20">
                <div className="text-3xl mb-2 text-white">📅</div>
                <h4 className="font-semibold mb-2 text-white">Timetable</h4>
                <button onClick={() => navigate('/timetable')} className="px-4 py-2 bg-green-500/20 text-white rounded hover:bg-green-600/30 border border-green-400/30 backdrop-blur-sm">View</button>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg text-center hover:shadow-lg transition border border-white/20">
                <div className="text-3xl mb-2 text-white">📈</div>
                <h4 className="font-semibold mb-2 text-white">Grades</h4>
                <button onClick={() => alert('Current GPA: 8.5')} className="px-4 py-2 bg-purple-500/20 text-white rounded hover:bg-purple-600/30 border border-purple-400/30 backdrop-blur-sm">View</button>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg text-center hover:shadow-lg transition border border-white/20">
              <div className="text-3xl mb-2 text-white">💬</div>
              <h4 className="font-semibold mb-2 text-white">Contact Advisor</h4>
              <WhatsAppContact />
            </div>
            </div>
            </div>
          </section>

          <section id="courses" className="mb-8">
            <div className="p-6 bg-white/10 backdrop-blur-2xl text-white rounded-2xl shadow-xl mb-6 animate-slide-up border border-white/20 relative z-10">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-2 text-center">📚 Courses & Tutorials</h3>
                <p className="text-white/90 text-center">Enhance your skills with comprehensive learning resources</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-xl p-8 border border-white/20 animate-fade-in relative z-10">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg text-center transform hover:scale-105 transition border border-white/20">
                  <div className="text-4xl mb-4 text-white">🐍</div>
                  <h4 className="font-bold text-xl text-white mb-3">Python Full Course</h4>
                  <p className="text-white/80 text-sm mb-4">Master Python programming from basics to advanced concepts</p>
                  <button onClick={() => navigate('/python-courses')} className="inline-block px-6 py-3 bg-blue-500/20 text-white rounded-lg font-semibold hover:bg-blue-600/30 border border-blue-400/30 backdrop-blur-sm transition">
                    Explore Courses
                  </button>
                </div>
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg text-center transform hover:scale-105 transition border border-white/20">
                  <div className="text-4xl mb-4 text-white">💻</div>
                  <h4 className="font-bold text-xl text-white mb-3">Full Stack Development</h4>
                  <p className="text-white/80 text-sm mb-4">Build complete web applications with modern technologies</p>
                  <button onClick={() => navigate('/fullstack-courses')} className="inline-block px-6 py-3 bg-purple-500/20 text-white rounded-lg font-semibold hover:bg-purple-600/30 border border-purple-400/30 backdrop-blur-sm transition">
                    Explore Courses
                  </button>
                </div>
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg text-center transform hover:scale-105 transition border border-white/20">
                  <div className="text-4xl mb-4 text-white">📊</div>
                  <h4 className="font-bold text-xl text-white mb-3">DSA Crash Course</h4>
                  <p className="text-white/80 text-sm mb-4">Master Data Structures and Algorithms for technical interviews</p>
                  <button onClick={() => navigate('/dsa-courses')} className="inline-block px-6 py-3 bg-green-500/20 text-white rounded-lg font-semibold hover:bg-green-600/30 border border-green-400/30 backdrop-blur-sm transition">
                    Explore Courses
                  </button>
                </div>
              </div>

              {/* Premium Access Section */}
              <div className="mt-8 p-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-2xl rounded-3xl shadow-2xl border border-yellow-400/30 text-center">
                <div className="text-6xl mb-4">⭐</div>
                <h3 className="text-3xl font-bold text-white mb-4">Helixa IQ Portal Access</h3>
                <p className="text-white/90 text-lg mb-6">
                  Get access to advanced courses, career services, mentorship, and exclusive opportunities
                </p>
                
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => navigate('/premium-benefits')}
                    className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    ⭐ Upgrade Now
                  </button>
                  
                  <div className="text-white/70">or</div>
                  
                  <button
                    onClick={() => navigate('/premium-login', { 
                      state: { 
                        fromStudentPortal: true,
                        message: 'Welcome back! Please login to access your premium Helixa IQ Portal.'
                      }
                    })}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    🎓 Login to Helixa IQ Portal
                  </button>
                </div>
                
                <div className="mt-4 p-4 bg-white/10 rounded-lg border border-white/20">
                  <p className="text-white/90 text-sm">
                    💡 <strong>Already a premium member?</strong> Use the Helixa IQ Portal login above to access your courses, progress tracking, and premium features.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="events" className="mb-8">
            <div className="p-6 bg-white/10 backdrop-blur-2xl text-white rounded-2xl shadow-xl mb-6 animate-slide-up border border-white/20 relative z-10">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

              <div className="relative z-10">
                <h4 className="text-3xl font-bold mb-2 text-center">🎉 Upcoming Events of LTSU</h4>
                <p className="text-white/90 text-center">Join exciting events and expand your horizons</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-xl p-8 border border-white/20 animate-fade-in relative z-10">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-6 bg-white rounded-xl shadow-lg text-center animate-pulse">
                      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : events.length > 0 ? (
                <div className="relative">
                  {/* Navigation Arrows */}
                  {events.length > eventsPerPage && (
                    <>
                      <button
                        onClick={prevEvents}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 text-blue-600 hover:text-blue-800"
                        aria-label="Previous events"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextEvents}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 text-blue-600 hover:text-blue-800"
                        aria-label="Next events"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Events Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-12">
                    {currentEvents.map((event) => (
                      <div key={event.id || event.title} className="p-6 bg-white rounded-xl shadow-lg text-center transform hover:scale-105 transition">
                        <div className="text-4xl mb-4">
                          {event.type === 'academic' ? '🤖' : event.type === 'cultural' ? '🎭' : event.type === 'sports' ? '⚽' : '🎯'}
                        </div>
                        <h4 className="font-bold text-xl text-gray-800 mb-3">{event.title}</h4>
                        <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                          event.type === 'academic' ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800' :
                          event.type === 'cultural' ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800' :
                          event.type === 'sports' ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800' :
                          'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800'
                        }`}>
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pagination Dots */}
                  {events.length > eventsPerPage && (
                    <div className="flex justify-center mt-6 space-x-2">
                      {Array.from({ length: Math.ceil(events.length / eventsPerPage) }, (_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentEventIndex(i * eventsPerPage)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            Math.floor(currentEventIndex / eventsPerPage) === i
                              ? 'bg-blue-600'
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Go to events page ${i + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-xl font-bold mb-2">No Upcoming Events</h3>
                  <p className="text-gray-600">Check back later for exciting events and activities!</p>
                </div>
              )}
            </div>
          </section>

          <section id="hackathons" className="mb-8">
            <div className="p-6 bg-white/10 backdrop-blur-2xl text-white rounded-2xl shadow-xl mb-6 animate-slide-up border border-white/20 relative z-10">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-2 text-center">🚀 Hackathons & Competitions</h3>
                <p className="text-white/90 text-center">Discover exciting hackathons and coding competitions from top platforms</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-xl p-8 border border-white/20 animate-fade-in relative z-10">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 border border-white/20">
                  <div className="text-center mb-4">
                    <img src="/assets/images/Devnovate.jpg" alt="Devnovate" className="w-16 h-16 mx-auto mb-3 object-contain" />
                    <h4 className="font-bold text-lg text-white mb-2">Devnovate</h4>
                    <p className="text-white/80 text-sm mb-4">Innovation and entrepreneurship focused competitions</p>
                    <a href="https://devnovate.co/" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-green-500/20 text-white rounded-lg font-semibold hover:bg-green-600/30 border border-green-400/30 backdrop-blur-sm transition">
                      Visit Platform
                    </a>
                  </div>
                </div>

                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 border border-white/20">
                  <div className="text-center mb-4">
                    <img src="/assets/images/Devpost.jpg" alt="Devpost" className="w-16 h-16 mx-auto mb-3 object-contain" />
                    <h4 className="font-bold text-lg text-white mb-2">Devpost</h4>
                    <p className="text-white/80 text-sm mb-4">Global hackathon platform with diverse challenges</p>
                    <a href="https://devpost.com/" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-blue-500/20 text-white rounded-lg font-semibold hover:bg-blue-600/30 border border-blue-400/30 backdrop-blur-sm transition">
                      Visit Platform
                    </a>
                  </div>
                </div>

                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 border border-white/20">
                  <div className="text-center mb-4">
                    <img src="/assets/images/SIH2.png" alt="Smart India Hackathon" className="w-16 h-16 mx-auto mb-3 object-contain" />
                    <h4 className="font-bold text-lg text-white mb-2">Smart India Hackathon</h4>
                    <p className="text-white/80 text-sm mb-4">Government-backed innovation challenge for students</p>
                    <a href="https://www.sih.gov.in/" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-orange-500/20 text-white rounded-lg font-semibold hover:bg-orange-600/30 border border-orange-400/30 backdrop-blur-sm transition">
                      Visit Platform
                    </a>
                  </div>
                </div>

                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 border border-white/20">
                  <div className="text-center mb-4">
                    <img src="/assets/images/Unstop.jpg" alt="Unstop" className="w-16 h-16 mx-auto mb-3 object-contain" />
                    <h4 className="font-bold text-lg text-white mb-2">Unstop</h4>
                    <p className="text-white/80 text-sm mb-4">Comprehensive platform for hackathons and competitions</p>
                    <a href="https://unstop.com/" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-purple-500/20 text-white rounded-lg font-semibold hover:bg-purple-600/30 border border-purple-400/30 backdrop-blur-sm transition">
                      Visit Platform
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="mb-8">
            <div className="p-8 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/20 animate-fade-in relative z-10">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-4xl font-bold text-white mb-4">About LTSU Student & Helixa IQ Portal</h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6"></div>
                </div>
                <div className="max-w-4xl mx-auto text-center mb-8">
                  <p className="text-white/90 text-xl leading-relaxed mb-6">
                    LTSU Student Portal is your comprehensive digital companion for academic excellence. Created by dedicated 3rd-year students <strong className="text-blue-400">Vairagade Pavan Kalyan (AI & ML)</strong> and <strong className="text-purple-400">Satish (Data Science)</strong>, this platform empowers students with seamless access to resources, fosters collaborative learning, and builds a vibrant educational community.
                  </p>
                  <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                    <p className="text-white/90 text-lg italic font-medium">
                      "Learning is not just about acquiring knowledge, but about transforming lives. Together, we create opportunities for growth, innovation, and success."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </div>
  )
}
