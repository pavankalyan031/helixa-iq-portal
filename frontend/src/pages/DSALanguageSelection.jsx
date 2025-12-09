import React from 'react'
import { useNavigate } from 'react-router-dom'

const DSALanguageSelection = ({ user }) => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header - Helixa IQ Portal branding */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-30">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand - Left Side */}
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
                <h1 className="text-lg font-bold text-white">Data Structures & Algorithms</h1>
                <p className="text-gray-400 text-xs">Helixa IQ Portal</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8 p-8 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl shadow-2xl">
          <h1 className="text-4xl font-bold mb-2">📊 Data Structures & Algorithms</h1>
          <p className="text-blue-100 text-lg">Choose your preferred programming language to master DSA</p>
        </div>

        {/* Programming Language Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">📚 Learn DSA with Programming Languages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Python */}
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 rounded-xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🐍</div>
                <h3 className="text-2xl font-bold text-white mb-2">DSA with Python</h3>
                <p className="text-blue-200 text-lg">Beginner-friendly syntax</p>
              </div>

              <div className="space-y-3 text-sm text-gray-300 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>Easy to learn</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>Rich libraries</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>Great for interviews</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => navigate('/python-dsa-video-player')}
                  className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  ▶️ Watch in Player
                </button>
              </div>
            </div>

            {/* C++ */}
            <div className="bg-gradient-to-br from-green-600/20 to-green-700/20 rounded-xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold text-white mb-2">DSA with C++</h3>
                <p className="text-green-200 text-lg">Industry standard</p>
              </div>

              <div className="space-y-3 text-sm text-gray-300 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>High performance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>Memory control</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>FAANG favorite</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => navigate('/cpp-video-player')}
                  className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  ▶️ Watch in Player
                </button>
              </div>
            </div>

            {/* Java */}
            <div className="bg-gradient-to-br from-orange-600/20 to-orange-700/20 rounded-xl p-6 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">☕</div>
                <h3 className="text-2xl font-bold text-white mb-2">DSA with Java</h3>
                <p className="text-orange-200 text-lg">Object-oriented approach</p>
              </div>

              <div className="space-y-3 text-sm text-gray-300 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>Platform independent</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>Strong OOP concepts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span>Enterprise ready</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => navigate('/java-dsa-video-player')}
                  className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  ▶️ Watch in Player
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Master Coding Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-8 border border-purple-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">🎯 Master Coding</h2>
            <p className="text-purple-200 text-lg mb-6">413 problems, exact patterns to ace your interviews</p>
            <button
              onClick={() => navigate('/master-coding-sheet')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Practicing Now 🚀
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DSALanguageSelection