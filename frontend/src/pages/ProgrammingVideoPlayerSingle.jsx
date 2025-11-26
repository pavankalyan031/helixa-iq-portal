import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProgrammingVideoPlayerSingle = () => {
  const navigate = useNavigate()
  const { videoId } = useParams()

  // Video data based on videoId
  const videoData = {
    1: {
      title: "Introduction to Programming",
      embedId: "dQw4w9WgXcQ", // Placeholder - replace with actual video
      duration: "45:00"
    },
    2: {
      title: "Variables and Data Types",
      embedId: "dQw4w9WgXcQ", // Placeholder - replace with actual video
      duration: "35:00"
    },
    3: {
      title: "Control Structures - Loops and Conditionals",
      embedId: "dQw4w9WgXcQ", // Placeholder - replace with actual video
      duration: "50:00"
    },
    4: {
      title: "Functions and Modular Programming",
      embedId: "dQw4w9WgXcQ", // Placeholder - replace with actual video
      duration: "40:00"
    },
    5: {
      title: "Arrays and Strings",
      embedId: "dQw4w9WgXcQ", // Placeholder - replace with actual video
      duration: "45:00"
    },
    6: {
      title: "Object-Oriented Programming Basics",
      embedId: "dQw4w9WgXcQ", // Placeholder - replace with actual video
      duration: "55:00"
    },
    7: {
      title: "File Handling and I/O Operations",
      embedId: "dQw4w9WgXcQ", // Placeholder - replace with actual video
      duration: "35:00"
    },
    8: {
      title: "Error Handling and Debugging",
      embedId: "dQw4w9WgXcQ", // Placeholder - replace with actual video
      duration: "40:00"
    },
    9: {
      title: "Data Structures Fundamentals",
      embedId: "dQw4w9WgXcQ", // Placeholder - replace with actual video
      duration: "50:00"
    },
    10: {
      title: "Algorithms Basics",
      embedId: "dQw4w9WgXcQ", // Placeholder - replace with actual video
      duration: "45:00"
    },
    11: {
      title: "Programming Best Practices",
      embedId: "dQw4w9WgXcQ", // Placeholder - replace with actual video
      duration: "30:00"
    },
    12: {
      title: "Project Development Workflow",
      embedId: "dQw4w9WgXcQ", // Placeholder - replace with actual video
      duration: "35:00"
    }
  }

  const currentVideo = videoData[videoId]

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Video Not Found</h1>
          <button
            onClick={() => navigate('/programming-practice')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Practice
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
          <div className="flex items-center justify-between">
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
                <h1 className="text-lg font-bold text-white">💻 Programming Fundamentals Video</h1>
                <p className="text-gray-400 text-xs">Helixa IQ Portal</p>
              </div>
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

          {/* Additional Resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/programming-practice')}
              className="p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors"
            >
              <div className="text-center">
                <span className="text-2xl mb-2 block">📚</span>
                <h3 className="text-white font-medium">More Programming Resources</h3>
                <p className="text-gray-400 text-sm">Explore additional courses and notes</p>
              </div>
            </button>

            <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
              <div className="text-center">
                <span className="text-2xl mb-2 block">📝</span>
                <h3 className="text-white font-medium">Take Notes</h3>
                <p className="text-gray-400 text-sm">Jot down important concepts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgrammingVideoPlayerSingle