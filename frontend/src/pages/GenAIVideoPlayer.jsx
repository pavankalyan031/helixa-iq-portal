import React from 'react'
import { useNavigate } from 'react-router-dom'

const GenAIVideoPlayer = () => {
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
              <h1 className="text-lg font-bold text-white">🤖 Gen AI Video Course</h1>
              <p className="text-gray-400 text-xs">Helixa IQ Portal</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="h-[calc(100vh-80px)] flex justify-center">
        {/* Video Player Section */}
        <div className="w-full max-w-4xl bg-gray-900 p-6">
          <div className="h-full">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 h-full flex flex-col">
              {/* Video Title */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Generative AI Fundamentals and Applications
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Complete course covering Generative AI fundamentals, applications, and practical implementations
                </p>
              </div>

              {/* Video Player */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-3xl">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/mEsleV16qdo"
                      title="Generative AI Fundamentals and Applications"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenAIVideoPlayer