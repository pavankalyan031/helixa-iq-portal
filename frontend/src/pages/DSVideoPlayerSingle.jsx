import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const DSVideoPlayerSingle = () => {
  const navigate = useNavigate()
  const { videoId } = useParams()

  // Video data based on videoId
  const videoData = {
    1: {
      title: "Data Science Full Course",
      embedId: "gDZ6czwuQ18",
      duration: "2:30:00"
    },
    2: {
      title: "Data Analytics",
      embedId: "VaSjiJMrq24",
      duration: "1:45:00"
    },
    3: {
      title: "Python",
      embedId: "ERCMXc8x7mc",
      duration: "2:15:00"
    },
    4: {
      title: "Python for Data Science – Full Course for Beginners",
      embedId: "CMEWVn1uZpQ",
      duration: "3:00:00"
    },
    5: {
      title: "SQL",
      embedId: "yE6tIle64tU",
      duration: "1:30:00"
    },
    6: {
      title: "Power BI",
      embedId: "UXhGRVTndQA",
      duration: "2:00:00"
    },
    7: {
      title: "Tableau",
      embedId: "K3pXnbniUcM",
      duration: "1:50:00"
    },
    8: {
      title: "Excel",
      embedId: "7lU-pz_wBXY",
      duration: "1:40:00"
    },
    9: {
      title: "Machine Learning",
      embedId: "i_LwzRVP7bg",
      duration: "2:20:00"
    },
    10: {
      title: "MongoDB",
      embedId: "M1dKYQ7GsTg",
      duration: "1:35:00"
    },
    12: {
      title: "Business Analytics",
      embedId: "6zI7kNKniEE",
      duration: "1:55:00"
    }
  }

  const currentVideo = videoData[videoId]

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Video Not Found</h1>
          <button
            onClick={() => navigate('/ds-practice')}
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
                onClick={() => navigate('/ds-practice')}
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
                <h1 className="text-lg font-bold text-white">📊 Data Science Video</h1>
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
            <h2 className="text-2xl font-bold text-white">{currentVideo.title}</h2>
          </div>

          {/* Video Player */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
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
        </div>
      </div>
    </div>
  )
}

export default DSVideoPlayerSingle