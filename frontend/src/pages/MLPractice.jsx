import React from 'react'
import { useNavigate } from 'react-router-dom'

const MLPractice = () => {
  const navigate = useNavigate()

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
              <h1 className="text-lg font-bold text-white">Machine Learning Practice</h1>
              <p className="text-gray-400 text-xs">Helixa IQ Portal</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Machine Learning Practice</h1>
            <p className="text-blue-100 text-lg">Choose your learning resource to get started</p>
          </div>

          {/* Three Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Video Courses */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎥</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Video Courses</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Watch comprehensive video tutorials with interactive playlist
                </p>
                <button
                  onClick={() => navigate('/ml-video-player')}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Start Watching
                </button>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Notes</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Detailed study materials and documentation
                </p>
                <a
                  href="https://www.geeksforgeeks.org/batch/ds-16?tab=Chapters"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium inline-block text-center"
                >
                  View Notes
                </a>
              </div>
            </div>

            {/* Cheatsheet */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📋</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Cheatsheet</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Quick reference guides and shortcuts
                </p>
                <a
                  href="https://github.com/WesMantovani/Machine-Learning-Specialization-Coursera-Notes?tab=readme-ov-file"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium inline-block text-center"
                >
                  View Cheatsheet
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MLPractice