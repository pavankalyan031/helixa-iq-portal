import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const LangchainVideoPlayer = () => {
  const navigate = useNavigate()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [watchedVideos, setWatchedVideos] = useState(new Set([0])) // Track watched videos by index
  const [player, setPlayer] = useState(null)
  const playerRef = useRef(null)

  // Load YouTube IFrame Player API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        createPlayer()
      }
    } else {
      createPlayer()
    }

    function createPlayer() {
      const newPlayer = new window.YT.Player(playerRef.current, {
        height: '100%',
        width: '100%',
        playerVars: {
          listType: 'playlist',
          list: 'PLeo1K3hjS3uu0N_0W6giDXzZIcB07Ng_F',
          index: currentVideoIndex,
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: (event) => {
            console.log('YouTube player ready')
            setPlayer(event.target)
            // Load the specific video index
            event.target.playVideoAt(currentVideoIndex)
          },
          onStateChange: (event) => {
            // Mark video as watched when it starts playing
            if (event.data === window.YT.PlayerState.PLAYING) {
              setWatchedVideos(prev => new Set([...prev, currentVideoIndex]))
            }
          }
        }
      })
    }
  }, [])

  // Update player when video index changes
  useEffect(() => {
    if (player && player.playVideoAt) {
      console.log('Switching to video index:', currentVideoIndex)
      player.playVideoAt(currentVideoIndex)
    }
  }, [currentVideoIndex, player])

  // Langchain Course playlist videos
  const videos = [
    { title: 'LangChain Crash Course For Beginners | LangChain Tutorial', duration: '46:07' },
    { title: 'Vector Database Explained | What is Vector Database?', duration: '6:52' },
    { title: 'End to End Gen AI Project Using Langchain, OpenAI in Finance Domain', duration: '1:14:34' },
    { title: 'LLM Project | End to End Gen AI Project Using LangChain, Google Palm In Ed-Tech Industry', duration: '44:00' },
    { title: 'LLM Project | End to end Gen AI project Using Langchain, Google Palm in Retail Industry', duration: '51:00' },
    { title: 'LLM Projects | LLM and GenAI Projects For Beginners', duration: '5:12' },
    { title: 'Gen AI Project Using Llama3.1 | End to End Gen AI Project', duration: '40:51' }
  ]

  const handleVideoSelect = (videoIndex) => {
    console.log('Switching to video index:', videoIndex)
    setCurrentVideoIndex(videoIndex)
    // Mark video as watched
    setWatchedVideos(prev => new Set([...prev, videoIndex]))
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const progressPercentage = (watchedVideos.size / videos.length) * 100

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
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
                <h1 className="text-lg font-bold text-white">⛓️ Langchain Video Course</h1>
                <p className="text-gray-400 text-xs">Helixa IQ Portal</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className={`h-[calc(100vh-80px)] ${isFullscreen ? 'flex flex-col' : 'flex'}`}>
        {/* Video Player Section */}
        <div className={`${isFullscreen ? 'w-full' : 'w-1/2'} bg-gray-900 p-6`}>
          <div className="h-full">
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 h-full">
              {/* Video Controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-white">
                  <h3 className="text-lg font-semibold">
                    {videos[currentVideoIndex]?.title || 'Langchain Tutorial'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Duration: {videos[currentVideoIndex]?.duration || 'N/A'}
                  </p>
                </div>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-gray-400 hover:text-white transition-colors bg-gray-700 rounded-lg"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                >
                  {isFullscreen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3l-7 7m0 0l7 7m-7-7h7m-7 7v7m7-7H3m7 7l-7-7m7 7V3m0 7H3" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <div
                  ref={playerRef}
                  className="w-full h-full"
                  id="youtube-player-langchain"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Playlist */}
        <div className={`${isFullscreen ? 'w-full bg-gray-800 p-6' : 'w-1/2 bg-gray-800 border-l border-gray-700 p-6'} overflow-y-auto`}>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Langchain Course Playlist</h2>
            <p className="text-gray-400 text-sm">Select a video to start watching</p>
          </div>

          <div className={`space-y-3 ${isFullscreen ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : ''}`}>
            {videos.map((video, index) => (
              <div
                key={index}
                onClick={() => handleVideoSelect(index)}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  index === currentVideoIndex
                    ? 'bg-blue-600/20 border-blue-500'
                    : watchedVideos.has(index)
                    ? 'bg-green-600/10 border-green-500'
                    : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === currentVideoIndex
                      ? 'bg-blue-600 text-white'
                      : watchedVideos.has(index)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium truncate ${
                      index === currentVideoIndex ? 'text-white' : 'text-gray-300'
                    }`}>
                      {video.title}
                    </h4>
                    <p className="text-gray-500 text-xs mt-1">
                      Duration: {video.duration}
                    </p>
                    {watchedVideos.has(index) && index !== currentVideoIndex && (
                      <div className="flex items-center mt-1">
                        <svg className="w-3 h-3 text-green-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-400 text-xs">Watched</span>
                      </div>
                    )}
                  </div>
                  {index === currentVideoIndex && (
                    <div className="text-blue-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-700/30 rounded-lg border border-gray-600">
            <h3 className="text-white font-medium mb-2">Course Progress</h3>
            <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <p className="text-gray-400 text-xs">{watchedVideos.size} of {videos.length} videos completed ({Math.round(progressPercentage)}%)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LangchainVideoPlayer