import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CppVideoPlayerSingle = () => {
  const navigate = useNavigate()
  const { videoId } = useParams()

  // Video data based on videoId - these are placeholder IDs, need actual YouTube video IDs
  const videoData = {
    1: {
      title: "Lec 00: C++ complete course | Content Overview | C++ tutorials for Beginners",
      embedId: "placeholder-video-id-1", // Replace with actual video ID
      duration: "8:54"
    },
    2: {
      title: "Lec 1: How to Install and Set Visual Studio Code and MinGW Compiler for C and C++ | C++ Tutorials",
      embedId: "placeholder-video-id-2", // Replace with actual video ID
      duration: "27:47"
    },
    3: {
      title: "Lec 2: What is Object Oriented Programming (OOP) | POP vs OOP | C++ Tutorials for Beginners",
      embedId: "placeholder-video-id-3", // Replace with actual video ID
      duration: "15:36"
    },
    // Add all 83 videos here with actual YouTube video IDs
    83: {
      title: "How to implement Class Methods in C++ | C++ Course for Beginners | Lecture 85",
      embedId: "placeholder-video-id-83", // Replace with actual video ID
      duration: "25:58"
    }
  }

  const currentVideo = videoData[videoId]

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Video Not Found</h1>
          <button
            onClick={() => navigate('/programming-video-cpp')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to C++ Course
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/programming-video-cpp')}
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
              <h1 className="text-lg font-bold text-white">⚡ C++ Video Player</h1>
              <p className="text-gray-400 text-xs">Helixa IQ Portal</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Video Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">{currentVideo.title}</h2>
            <p className="text-gray-400">Duration: {currentVideo.duration}</p>
          </div>

          {/* Video Player */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mb-6">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentVideo.embedId}`}
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/programming-video-cpp')}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Back to Course
            </button>
            <div className="text-gray-400 text-sm">
              Lecture {videoId} of 83
            </div>
            {parseInt(videoId) < 83 && (
              <button
                onClick={() => navigate(`/cpp-video/${parseInt(videoId) + 1}`)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next Lecture →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CppVideoPlayerSingle