import React from 'react'
import { useNavigate } from 'react-router-dom'

const DSACppVideos = () => {
  const navigate = useNavigate()

  const cppDSAVideos = [
    { id: 1, title: "Lecture 1: Intro to Programming & Flowcharts", duration: "57:54", link: "https://youtube.com/watch?v=VIDEO_ID_1" },
    { id: 2, title: "Lecture 2: Write Your First Program in C++", duration: "56:00", link: "https://youtube.com/watch?v=VIDEO_ID_2" },
    { id: 3, title: "Lecture 3: If-Else, While loop & Lots of Patterns (Part-1)", duration: "55:52", link: "https://youtube.com/watch?v=VIDEO_ID_3" },
    { id: 4, title: "Lecture 4: Solving Pattern Questions (Part-2)", duration: "1:03:58", link: "https://youtube.com/watch?v=VIDEO_ID_4" },
    { id: 5, title: "Lecture 5: Bitwise Operators, For Loops, Operator Precedence & Variable Scoping", duration: "1:15:44", link: "https://youtube.com/watch?v=VIDEO_ID_5" }
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/lms-portal')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Complete C++ Placement DSA Course</h1>
                <p className="text-gray-400">Complete C++ DSA Course - 149 Videos</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/lms-portal')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Portal
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">⚡ Complete C++ Placement DSA Course</h3>
            <p className="text-green-100 text-sm">Complete Data Structures & Algorithms course in C++ with 149 detailed video tutorials for placement preparation.</p>
          </div>
        </div>

        {/* Videos List */}
        <div className="grid grid-cols-1 gap-4">
          {cppDSAVideos.map((video) => (
            <div key={video.id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <span className="text-2xl mr-3 text-gray-300">#{video.id}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{video.title}</h3>
                    <span className="inline-block px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm">
                      {video.duration}
                    </span>
                  </div>
                </div>
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Watch Video ▶️
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
            Load More Videos
          </button>
        </div>
      </div>
    </div>
  )
}

export default DSACppVideos