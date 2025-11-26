import React from 'react'
import { useNavigate } from 'react-router-dom'

const JavaProgramming = () => {
  const navigate = useNavigate()

  const resources = [
    {
      id: 'video',
      title: 'Video Course',
      icon: '🎥',
      description: 'Watch comprehensive Java programming tutorials',
      action: () => navigate('/programming-video-java'),
      color: 'blue'
    },
    {
      id: 'notes',
      title: 'Study Notes',
      icon: '📚',
      description: 'Access detailed Java programming notes and documentation',
      action: () => window.open('https://www.geeksforgeeks.org/batch/skill-up-java?tab=Chapters', '_blank'),
      color: 'green'
    },
    {
      id: 'cheatsheet',
      title: 'Cheatsheet',
      icon: '📄',
      description: 'Quick reference guide for Java programming',
      action: () => alert('Cheatsheet coming soon!'),
      color: 'purple'
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-600 hover:bg-blue-700 border-blue-500',
      green: 'bg-green-600 hover:bg-green-700 border-green-500',
      purple: 'bg-purple-600 hover:bg-purple-700 border-purple-500'
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
              onClick={() => navigate('/programming-language-selection')}
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
              <h1 className="text-lg font-bold text-white">☕ Java Programming</h1>
              <p className="text-gray-400 text-xs">Helixa IQ Portal</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-orange-600 to-red-700 rounded-2xl p-8 text-white text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">☕ Java Programming Fundamentals</h1>
            <p className="text-orange-100 text-lg">Learn Java programming with object-oriented concepts and applications</p>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div
                key={resource.id}
                onClick={resource.action}
                className={`bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-${resource.color}-500 transition-all duration-200 cursor-pointer group`}
              >
                <div className="text-center">
                  <div className={`w-20 h-20 ${resource.color === 'blue' ? 'bg-blue-600/20' : resource.color === 'green' ? 'bg-green-600/20' : 'bg-purple-600/20'} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <span className="text-4xl">{resource.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {resource.description}
                  </p>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getColorClasses(resource.color)} text-white`}>
                    {resource.id === 'video' ? '▶️ Watch' : resource.id === 'notes' ? '📖 Read' : '📋 View'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JavaProgramming