import React from 'react'
import { useNavigate } from 'react-router-dom'

const DSPractice = () => {
  const navigate = useNavigate()

  const resources = [
    // Video Courses (1-12)
    {
      id: 1,
      title: "Data Science Full Course",
      type: "video",
      icon: "📊",
      color: "blue",
      action: () => navigate('/ds-video/1')
    },
    {
      id: 2,
      title: "Data Analytics",
      type: "video",
      icon: "📈",
      color: "green",
      action: () => navigate('/ds-video/2')
    },
    {
      id: 3,
      title: "Python",
      type: "video",
      icon: "🐍",
      color: "yellow",
      action: () => navigate('/ds-video/3')
    },
    {
      id: 4,
      title: "Python for Data Science – Full Course for Beginners",
      type: "video",
      icon: "🐍",
      color: "blue",
      action: () => navigate('/ds-video/4')
    },
    {
      id: 5,
      title: "SQL",
      type: "video",
      icon: "🗄️",
      color: "purple",
      action: () => navigate('/ds-video/5')
    },
    {
      id: 6,
      title: "Power BI",
      type: "video",
      icon: "📊",
      color: "orange",
      action: () => navigate('/ds-video/6')
    },
    {
      id: 7,
      title: "Tableau",
      type: "video",
      icon: "📊",
      color: "blue",
      action: () => navigate('/ds-video/7')
    },
    {
      id: 8,
      title: "Excel",
      type: "video",
      icon: "📊",
      color: "green",
      action: () => navigate('/ds-video/8')
    },
    {
      id: 9,
      title: "Machine Learning",
      type: "video",
      icon: "🧠",
      color: "purple",
      action: () => navigate('/ds-video/9')
    },
    {
      id: 10,
      title: "MongoDB",
      type: "video",
      icon: "🍃",
      color: "green",
      action: () => navigate('/ds-video/10')
    },
    {
      id: 11,
      title: "DBMS (Database Management System)",
      type: "playlist",
      icon: "🗄️",
      color: "blue",
      action: () => navigate('/ds-video-player')
    },
    {
      id: 12,
      title: "Business Analytics",
      type: "video",
      icon: "💼",
      color: "orange",
      action: () => navigate('/ds-video/12')
    },
    // Notes (13-17)
    {
      id: 13,
      title: "Complete Machine Learning & Data Science",
      type: "notes",
      icon: "📚",
      color: "blue",
      action: () => window.open('https://www.geeksforgeeks.org/batch/ds-16?tab=Chapters', '_blank')
    },
    {
      id: 14,
      title: "Data Analytics",
      type: "notes",
      icon: "📈",
      color: "green",
      action: () => window.open('https://www.geeksforgeeks.org/batch/da-skill-up?tab=Chapters', '_blank')
    },
    {
      id: 15,
      title: "MS Excel and Google Spreadsheets",
      type: "notes",
      icon: "📊",
      color: "orange",
      action: () => window.open('https://www.geeksforgeeks.org/batch/skill-up-ms-excel-and-google-spreadsheets?tab=Chapters', '_blank')
    },
    {
      id: 16,
      title: "Python",
      type: "notes",
      icon: "🐍",
      color: "yellow",
      action: () => window.open('https://www.geeksforgeeks.org/batch/skill-up-python?tab=Chapters', '_blank')
    },
    {
      id: 17,
      title: "Engineering Mathematics",
      type: "notes",
      icon: "🔢",
      color: "purple",
      action: () => window.open('https://www.geeksforgeeks.org/batch/skill-up-engineering-mathematics?tab=Chapters', '_blank')
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-600 hover:bg-blue-700 border-blue-500',
      green: 'bg-green-600 hover:bg-green-700 border-green-500',
      yellow: 'bg-yellow-600 hover:bg-yellow-700 border-yellow-500',
      purple: 'bg-purple-600 hover:bg-purple-700 border-purple-500',
      orange: 'bg-orange-600 hover:bg-orange-700 border-orange-500'
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/lms-portal')}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
              <h1 className="text-lg font-bold text-white">Data Science Practice</h1>
              <p className="text-gray-400 text-xs">Helixa IQ Portal</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Data Science Practice Resources</h1>
            <p className="text-blue-100 text-lg">Choose from comprehensive video courses and detailed study materials</p>
          </div>

          {/* Video Courses Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-blue-400 mr-3">🎥</span>
              Video Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {resources.slice(0, 12).map((resource) => (
                <div
                  key={resource.id}
                  onClick={resource.action}
                  className={`bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-${resource.color}-500 transition-all duration-200 cursor-pointer group`}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 ${resource.type === 'playlist' ? 'bg-gradient-to-br from-blue-600 to-purple-600' : `bg-${resource.color}-600/20`} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <span className="text-3xl">{resource.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3 leading-tight">
                      {resource.title}
                    </h3>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      resource.type === 'playlist'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : `bg-${resource.color}-600 text-white`
                    }`}>
                      {resource.type === 'playlist' ? '🎵 Playlist' : '▶️ Video'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-green-400 mr-3">📚</span>
              Study Notes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {resources.slice(12).map((resource) => (
                <div
                  key={resource.id}
                  onClick={resource.action}
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-200 cursor-pointer group"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-3xl">{resource.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3 leading-tight">
                      {resource.title}
                    </h3>
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                      📖 Notes
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DSPractice