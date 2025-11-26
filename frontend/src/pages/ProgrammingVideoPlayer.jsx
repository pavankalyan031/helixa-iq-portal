
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProgrammingVideoPlayer = () => {
  const navigate = useNavigate()
  const [currentVideoId, setCurrentVideoId] = useState('PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y')

  // Playlist videos for DBMS
  const playlistVideos = [
    {
      id: 'PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y',
      title: 'Introduction to DBMS',
      duration: '15:30',
      isPlaying: true
    },
    {
      id: 'video2',
      title: 'Database Models',
      duration: '20:45',
      isPlaying: false
    },
    {
      id: 'video3',
      title: 'SQL Basics',
      duration: '25:10',
      isPlaying: false
    },
    {
      id: 'video4',
      title: 'Normalization',
      duration: '18:20',
      isPlaying: false
    },
    {
      id: 'video5',
      title: 'Transactions & Concurrency',
      duration: '22:15',
      isPlaying: false
    }
  ]

  const handleVideoSelect = (videoId) => {
    setCurrentVideoId(videoId)
    // Update playing status
    playlistVideos.forEach(video => {
      video.isPlaying = video.id === videoId
    })
  }

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
              <h1 className="text-lg font-bold text-white">DBMS Video Player</h1>
              <p className="text-gray-400 text-xs">Programming Fundamentals</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Video Player Section */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Database Management System (DBMS)</h2>
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/videoseries?list=${currentVideoId}`}
                  title="DBMS Course"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Video Description */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">About This Course</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Learn Database Management Systems from basics to advanced concepts. This comprehensive playlist covers
                database design, SQL, normalization, transactions, and more. Perfect for understanding how databases work
                and how to manage data effectively.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs">Database Design</span>
                <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-xs">SQL</span>
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs">Normalization</span>
                <span className="px-3 py-1 bg-orange-600/20 text-orange-400 rounded-full text-xs">Transactions</span>
              </div>
            </div>
