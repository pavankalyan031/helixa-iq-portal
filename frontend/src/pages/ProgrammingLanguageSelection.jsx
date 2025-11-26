import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProgrammingLanguageSelection = () => {
  const navigate = useNavigate()

  const languages = [
    {
      id: 'python',
      name: 'Python',
      icon: '🐍',
      description: 'Learn Python programming with comprehensive tutorials, notes, and exercises.',
      buttonText: 'Start Python',
      path: '/python-programming'
    },
    {
      id: 'cpp',
      name: 'C++',
      icon: '⚡',
      description: 'Master C++ programming with in-depth tutorials and practical examples.',
      buttonText: 'Start C++',
      path: '/cpp-programming'
    },
    {
      id: 'java',
      name: 'Java',
      icon: '☕',
      description: 'Learn Java programming with object-oriented concepts and applications.',
      buttonText: 'Start Java',
      path: '/java-programming'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/programming-practice')}
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
              <h1 className="text-lg font-bold text-white">Programming Fundamentals</h1>
              <p className="text-gray-400 text-xs">Helixa IQ Portal</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Programming Fundamentals</h1>
            <p className="text-xl text-gray-300">Choose your preferred programming language to get started</p>
          </div>

          {/* Language Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {languages.map((lang) => (
              <div
                key={lang.id}
                className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {lang.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">{lang.name}</h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">{lang.description}</p>
                  <button
                    onClick={() => navigate(lang.path)}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {lang.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgrammingLanguageSelection