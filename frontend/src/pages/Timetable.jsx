import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Timetable({user}){
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Loading Timetable...</h2>
          <p className="text-gray-300">Please wait while we load your academic resources</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header user={user}/>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-8 p-8 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg shadow-lg animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 animate-pulse">📅 Academic Timetable & Calendar</h1>
          <p className="text-xl">Access important dates, schedules, and academic resources</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl shadow-xl animate-slide-up hover:shadow-2xl transition-all duration-300 border border-gray-600">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 animate-bounce">📋</div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">Date Sheet MST-I</h2>
              <p className="text-gray-300">USET September 2025</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => window.open('/date-sheet.pdf', '_blank')}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                👁️ View
              </button>
              <a
                href="/date-sheet.pdf"
                download="Date Sheet MST-I USET September 2025.pdf"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
              >
                📥 Download
              </a>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl shadow-xl animate-slide-up hover:shadow-2xl transition-all duration-300 border border-gray-600">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 animate-bounce">📅</div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">Academic Calendar</h2>
              <p className="text-gray-300">July-December 2025</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => window.open('/academic-calendar.pdf', '_blank')}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                👁️ View
              </button>
              <a
                href="/academic-calendar.pdf"
                download="Academic Calendar (July-Dec 2025).pdf"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white font-semibold rounded-lg hover:from-pink-700 hover:to-pink-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
              >
                📥 Download
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl shadow-lg animate-fade-in border border-gray-600">
          <h3 className="text-2xl font-bold text-gray-100 mb-6 text-center">📚 Additional Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-800 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-gray-600">
              <div className="text-4xl mb-4 animate-pulse">⏰</div>
              <h4 className="font-semibold text-lg mb-2 text-gray-100">Class Schedule</h4>
              <p className="text-gray-300 text-sm">Daily timetable and room allocations</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-gray-600">
              <div className="text-4xl mb-4 animate-pulse">📝</div>
              <h4 className="font-semibold text-lg mb-2 text-gray-100">Exam Schedule</h4>
              <p className="text-gray-300 text-sm">Important exam dates and timings</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-gray-600">
              <div className="text-4xl mb-4 animate-pulse">🎯</div>
              <h4 className="font-semibold text-lg mb-2 text-gray-100">Academic Events</h4>
              <p className="text-gray-300 text-sm">Workshops, seminars, and special events</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}