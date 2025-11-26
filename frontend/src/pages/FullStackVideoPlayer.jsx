import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const FullStackVideoPlayer = () => {
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
          list: 'PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w',
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

  // Complete Sigma Web Development Course playlist: https://youtube.com/playlist?list=PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w
  const videos = [
    { title: 'Installing VS Code & How Websites Work | Sigma Web Development Course - Tutorial #1', duration: '31:20' },
    { title: 'Your First HTML Website | Sigma Web Development Course - Tutorial #2', duration: '28:31' },
    { title: 'Basic Structure of an HTML Website | Sigma Web Development Course - Tutorial #3', duration: '11:12' },
    { id: '19:34', title: 'Heading, Paragraphs and Links | Sigma Web Development Course - Tutorial #4', duration: '19:34' },
    { id: '18:20', title: 'Image, Lists, and Tables in HTML | Sigma Web Development Course - Tutorial #5', duration: '18:20' },
    { id: '13:16', title: 'SEO and Core Web Vitals in HTML | Sigma Web Development Course - Tutorial #6', duration: '13:16' },
    { id: '14:53', title: 'Forms and input tags in HTML | Sigma Web Development Course - Tutorial #7', duration: '14:53' },
    { id: '10:52', title: 'Inline & Block Elements in HTML | Sigma Web Development Course - Tutorial #8', duration: '10:52' },
    { id: '10:57', title: 'Id & Classes in HTML | Sigma Web Development Course - Tutorial #9', duration: '10:57' },
    { id: '14:48', title: 'Video, Audio & Media in HTML | Sigma Web Development Course - Tutorial #10', duration: '14:48' },
    { id: '10:42', title: 'Semantic Tags in HTML | Sigma Web Development Course - Tutorial #11', duration: '10:42' },
    { id: '3:41', title: 'Exercise 1 - Pure HTML Media Player | Sigma Web Development Course - Tutorial #12', duration: '3:41' },
    { id: '9:21', title: 'Entities, Code tag and more on HTML | Sigma Web Development Course - Tutorial #13', duration: '9:21' },
    { id: '9:14', title: 'Introduction to CSS | Sigma Web Development Course - Tutorial #14', duration: '9:14' },
    { id: '11:04', title: 'Inline, Internal & External CSS | Sigma Web Development Course - Tutorial #15', duration: '11:04' },
    { id: '7:19', title: 'Exercise 1 - Solution & Shoutouts | Sigma Web Development Course - Tutorial #16', duration: '7:19' },
    { id: '14:00', title: 'CSS Selectors MasterClass | Sigma Web Development Course - Tutorial #17', duration: '14:00' },
    { id: '17:41', title: 'CSS Box Model - Margin, Padding & Borders | Sigma Web Development Course - Tutorial #18', duration: '17:41' },
    { id: '32:08', title: 'CSS Fonts, Text & Color Properties | Sigma Web Development Course - Tutorial #19', duration: '32:08' },
    { id: '4:19', title: 'Exercise 2 - CSS Challenge | Sigma Web Development Course - Tutorial #20', duration: '4:19' },
    { id: '20:07', title: 'CSS Specificity & Cascade | Sigma Web Development Course - Tutorial #21', duration: '20:07' },
    { id: '26:24', title: 'CSS Sizing Units - px, rem, em, vh, vw, % & more | Sigma Web Development Course - Tutorial #22', duration: '26:24' },
    { id: '12:08', title: 'CSS Display Property | Sigma Web Development Course - Tutorial #23', duration: '12:08' },
    { id: '13:10', title: 'CSS Shadows and Outlines | Sigma Web Development Course - Tutorial #24', duration: '13:10' },
    { id: '9:52', title: 'Styling Lists using CSS | Sigma Web Development Course - Tutorial #25', duration: '9:52' },
    { id: '8:21', title: 'CSS Overflow Property | Sigma Web Development Course - Tutorial #26', duration: '8:21' },
    { id: '10:16', title: 'Exercise 2 - Solutions and Shoutouts | Sigma Web Development Course - Tutorial #27', duration: '10:16' },
    { id: '24:05', title: 'CSS Position Property | Sigma Web Development Course - Tutorial #28', duration: '24:05' },
    { id: '6:18', title: 'Exercise 3 - Design this Card | Sigma Web Development Course - Tutorial #29', duration: '6:18' },
    { id: '13:20', title: 'CSS Variables | Sigma Web Development Course - Tutorial #30', duration: '13:20' },
    { id: '11:37', title: 'CSS Media Queries | Sigma Web Development Course - Tutorial #31', duration: '11:37' },
    { id: '19:48', title: 'Exercise 3 - Solution | Sigma Web Development Course - Tutorial #32', duration: '19:48' },
    { id: '2:33', title: 'Exercise 4 - Multi Color Website | Sigma Web Development Course - Tutorial #33', duration: '2:33' },
    { id: '10:42', title: 'CSS Float & Clear | Sigma Web Development Course - Tutorial #34', duration: '10:42' },
    { id: '13:24', title: 'More on CSS Selectors | Sigma Web Development Course - Tutorial #35', duration: '13:24' },
    { id: '13:45', title: 'Exercise 4 - Solution & Shoutouts | Sigma Web Development Course - Tutorial #36', duration: '13:45' },
    { id: '7:16', title: 'CSS Exercise 5 - Design this Layout | Sigma Web Development Course - Tutorial #37', duration: '7:16' },
    { id: '27:58', title: 'CSS Flexbox - Ultimate MasterClass | Sigma Web Development Course - Tutorial #38', duration: '27:58' },
    { id: '32:12', title: 'CSS Grid - Ultimate MasterClass | Sigma Web Development Course - Tutorial #39', duration: '32:12' },
    { id: '15:50', title: 'Exercise 5 - Solution & Shoutouts | Sigma Web Development Course - Tutorial #40', duration: '15:50' },
    { id: '3:21', title: 'Exercise 6 - Navbar using Flexbox | Sigma Web Development Course - Tutorial #41', duration: '3:21' },
    { id: '11:22', title: 'CSS Transforms MasterClass | Sigma Web Development Course - Tutorial #42', duration: '11:22' },
    { id: '20:27', title: 'Exercise 6 - Solution & Shoutouts | Sigma Web Development Course - Tutorial #43', duration: '20:27' },
    { id: '5:41', title: 'Exercise 7 - Design the Grid | Sigma Web Development Course - Tutorial #44', duration: '5:41' },
    { id: '13:33', title: 'CSS Transition Property | Sigma Web Development Course - Tutorial #45', duration: '13:33' },
    { id: '17:57', title: 'CSS Animations | Sigma Web Development Course - Tutorial #46', duration: '17:57' },
    { id: '38:39', title: 'Exercise 7 - Solution & Shoutouts | Sigma Web Development Course - Tutorial #47', duration: '38:39' },
    { id: '4:44', title: 'Exercise 8 - Bounce Animation | Sigma Web Development Course - Tutorial #48', duration: '4:44' },
    { id: '15:25', title: 'CSS Object-fit and Object-cover | Sigma Web Development Course - Tutorial #49', duration: '15:25' },
    { id: '9:06', title: 'CSS Filters | Sigma Web Development Course - Tutorial #50', duration: '9:06' },
    { id: '7:20', title: 'Exercise 8: Solution & Shoutouts | Sigma Web Development Course - Tutorial #51', duration: '7:20' },
    { id: '27:20', title: 'Figma Basics in One Video | Sigma Web Development Course - Tutorial #52', duration: '27:20' },
    { id: '1:57:23', title: 'Netflix Clone Using HTML & CSS | Sigma Web Development Course - Tutorial #53', duration: '1:57:23' },
    { id: '20:23', title: 'Introduction to JavaScript & Installing Node.js | Sigma Web Development Course - Tutorial #54', duration: '20:23' },
    { id: '20:20', title: 'JavaScript Variables, Data Types & Objects | Sigma Web Development Course - Tutorial #55', duration: '20:20' },
    { id: '24:24', title: 'JavaScript Conditionals: if, else if, else ladder | Sigma Web Development Course - Tutorial #56', duration: '24:24' },
    { id: '16:01', title: 'JavaScript Loops | Sigma Web Development Course - Tutorial #57', duration: '16:01' },
    { id: '12:26', title: 'JavaScript Functions | Sigma Web Development Course - Tutorial #58', duration: '12:26' },
    { id: '5:31', title: 'Exercise 9 - Faulty Calculator | Sigma Web Development Course - Tutorial #59', duration: '5:31' },
    { id: '18:02', title: 'JavaScript Strings | Sigma Web Development Course - Tutorial #60', duration: '18:02' },
    { id: '10:54', title: 'JavaScript Exercise 9 - Solution & Shoutouts | Sigma Web Development Course - Tutorial #61', duration: '10:54' },
    { id: '3:58', title: 'JavaScript Exercise 10 - Business Name Generator | Sigma Web Development Course - Tutorial #62', duration: '3:58' },
    { id: '30:52', title: 'JavaScript Arrays | Sigma Web Development Course - Tutorial #63', duration: '30:52' },
    { id: '11:28', title: 'JavaScript Exercise 10 - Solution | Sigma Web Development Course - Tutorial #64', duration: '11:28' },
    { id: '3:23', title: 'JavaScript Exercise 11 - Calculate the Factorial | Sigma Web Development Course - Tutorial #65', duration: '3:23' },
    { id: '8:51', title: 'Document Object Model in JavaScript | Sigma Web Development Course - Tutorial #66', duration: '8:51' },
    { id: '18:56', title: 'JavaScript DOM - Children, Parent & Sibling Nodes | Sigma Web Development Course - Tutorial #67', duration: '18:56' },
    { id: '18:15', title: 'JavaScript - Selecting by Ids, Classes, and More | Sigma Web Development Course - Tutorial #68', duration: '18:15' },
    { id: '11:52', title: 'JavaScript Exercise 11 - Solution & Shoutouts | Sigma Web Development Course - Tutorial #69', duration: '11:52' },
    { id: '3:54', title: 'JavaScript Exercise 12 - Color the Boxes | Sigma Web Development Course - Tutorial #70', duration: '3:54' },
    { id: '23:48', title: 'Inserting and Removing Elements using JavaScript | Sigma Web Development Course - Tutorial #71', duration: '23:48' },
    { id: '17:27', title: 'JavaScript Exercise 12 - Solution & Shoutouts | Sigma Web Development Course - Tutorial #72', duration: '17:27' },
    { id: '6:14', title: 'JavaScript Exercise 13 - Dynamic Website Builder | Sigma Web Development Course - Tutorial #73', duration: '6:14' },
    { id: '27:51', title: 'Events, Event Bubbling, setInterval & setTimeout | Sigma Web Development Course - Tutorial #74', duration: '27:51' },
    { id: '32:24', title: 'JavaScript Callbacks & Promises | Sigma Web Development Course - Tutorial #75', duration: '32:24' },
    { id: '23:41', title: 'Async/Await & Fetch API in JavaScript with Examples | Sigma Web Development Course - Tutorial #76', duration: '23:41' },
    { id: '24:13', title: 'JavaScript Exercise 13 - Solution & Shoutouts | Sigma Web Development Course - Tutorial #77', duration: '24:13' },
    { id: '3:58', title: 'JavaScript Exercise 14 - Hacker\'s Terminal | Sigma Web Development Course - Tutorial #78', duration: '3:58' },
    { id: '15:59', title: 'JavaScript try catch & Error Handling | Sigma Web Development Course - Tutorial #79', duration: '15:59' },
    { id: '20:43', title: 'Classes & Objects - Object Oriented Programming in Js | Sigma Web Development Course - Tutorial #80', duration: '20:43' },
    { id: '18:41', title: 'JavaScript Exercise 14 - Solution & Shoutouts | Sigma Web Development Course - Tutorial #81', duration: '18:41' },
    { id: '14:23', title: 'Advanced JavaScript | Sigma Web Development Course - Tutorial #82', duration: '14:23' },
    { id: '21:08', title: 'JavaScript Interview Questions | Sigma Web Development Course - Tutorial #83', duration: '21:08' },
    { id: '5:35:39', title: 'Spotify Clone using HTML, CSS & JavaScript | Sigma Web Development Course - Tutorial #84', duration: '5:35:39' },
    { id: '17:20', title: 'Backend, Node.js & npm | Sigma Web Development Course - Tutorial #85', duration: '17:20' },
    { id: '17:46', title: 'CommonJs Vs EcmaScript Modules | Sigma Web Development Course - Tutorial #86', duration: '17:46' },
    { id: '17:32', title: 'Working with Files: fs and path Modules | Sigma Web Development Course - Tutorial #87', duration: '17:32' },
    { id: '20:39', title: 'Introduction to Express Js | Sigma Web Development Course - Tutorial #88', duration: '20:39' },
    { id: '27:55', title: 'Response, Request and Routers in Express | Sigma Web Development Course - Tutorial #89', duration: '27:55' },
    { id: '19:05', title: 'Middlewares in Express Js | Sigma Web Development Course - Tutorial #90', duration: '19:05' },
    { id: '4:53', title: 'Exercise 15 - Clear the Clutter | Sigma Web Development Course - Tutorial #91', duration: '4:53' },
    { id: '21:28', title: 'ejs Template Engine in Express | Sigma Web Development Course - Tutorial #92', duration: '21:28' },
    { id: '17:33', title: 'Exercise 15 - Solution & Shoutouts | Sigma Web Development Course - Tutorial #93', duration: '17:33' },
    { id: '24:33', title: 'Installing MongoDB & MongoDB Compass | Sigma Web Development Course - Tutorial #94', duration: '24:33' },
    { id: '17:21', title: 'CRUD Operations in MongoDB | Sigma Web Development Course - Tutorial #95', duration: '17:21' },
    { id: '23:19', title: 'Installing Mongoose & Using it with Express | Sigma Web Development Course - Tutorial #96', duration: '23:19' },
    { id: '5:42', title: 'Exercise 16 - Dummy Data Generator | Sigma Web Development Course - Tutorial #97', duration: '5:42' },
    { id: '33:58', title: 'Tailwind CSS in one Video | Sigma Web Development Course - Tutorial #98', duration: '33:58' },
    { id: '22:44', title: 'Exercise 16 - Solution & Shoutouts | Sigma Web Development Course - Tutorial #99', duration: '22:44' },
    { id: '3:14', title: 'Exercise 17 - Design This Layout | Sigma Web Development Course - Tutorial #100', duration: '3:14' },
    { id: '2:27:49', title: 'X.com (Twitter) Clone using Tailwind CSS | Sigma Web Development Course - Tutorial #101', duration: '2:27:49' },
    { id: '11:49', title: 'Exercise 17 - Solution & Shoutouts | Sigma Web Development Course - Tutorial #102', duration: '11:49' },
    { id: '38:08', title: 'What is Hosting? Where to Host? Which Hosting? | Sigma Web Development Course - Tutorial #103', duration: '38:08' },
    { id: '24:06', title: 'Hosting an Express App on Ubuntu VPS using Hostinger | Sigma Web Development Course - Tutorial #104', duration: '24:06' },
    { id: '40:38', title: 'Introduction to React & Why use React? | Sigma Web Development Course - Tutorial #105', duration: '40:38' },
    { id: '26:53', title: 'Components, Props and JSX in React | Sigma Web Development Course - Tutorial #106', duration: '26:53' },
    { id: '11:19', title: 'Hooks & State in React | Sigma Web Development Course - Tutorial #107', duration: '11:19' },
    { id: '26:06', title: 'The useEffect Hook in React | Sigma Web Development Course - Tutorial #108', duration: '26:06' },
    { id: '14:44', title: 'The useRef Hook in React | Sigma Web Development Course - Tutorial #109', duration: '14:44' },
    { id: '19:06', title: 'Conditional Rendering & Rendering Lists in React | Sigma Web Development Course - Tutorial #110', duration: '19:06' },
    { id: '6:11', title: 'Exercise 18 - Display the Cards | Sigma Web Development Course - Tutorial #111', duration: '6:11' },
    { id: '16:35', title: 'Handling Events in React | Sigma Web Development Course - Tutorial #112', duration: '16:35' },
    { id: '13:19', title: 'Exercise 18 - Solution & Shoutouts | Sigma Web Development Course - Tutorial #113', duration: '13:19' },
    { id: '1:21:55', title: 'TodoList App using React, Tailwind & React Icons | Sigma Web Development Course - Tutorial #114', duration: '1:21:55' },
    { id: '17:00', title: 'React Router: Routing in React | Sigma Web Development Course - Tutorial #115', duration: '17:00' },
    { id: '16:17', title: 'The useContext hook in React | Sigma Web Development Course - Tutorial #116', duration: '16:17' },
    { id: '14:49', title: 'The useMemo hook in React | Sigma Web Development Course - Tutorial #117', duration: '14:49' },
    { id: '14:00', title: 'The useCallback hook in React | Sigma Web Development Course - Tutorial #118', duration: '14:00' },
    { id: '31:29', title: 'Handling Forms + Connecting React to Express Backend | Sigma Web Development Course - Tutorial #119', duration: '31:29' },
    { id: '19:37', title: 'Learn Redux in One video | Sigma Web Development Course - Tutorial #120', duration: '19:37' },
    { id: '12:25', title: 'Introduction to Next.js & File based routing | Sigma Web Development Course - Tutorial #121', duration: '12:25' },
    { id: '11:12', title: 'Server Components in Next.js | Sigma Web Development Course - Tutorial #122', duration: '11:12' },
    { id: '20:37', title: 'Script, Link & Image components in Next.js | Sigma Web Development Course - Tutorial #123', duration: '20:37' },
    { id: '7:48', title: 'Creating APIs in Next.js | Sigma Web Development Course - Tutorial #124', duration: '7:48' },
    { id: '13:16', title: 'Server Actions in Next.js | Sigma Web Development Course - Tutorial #125', duration: '13:16' },
    { id: '10:18', title: 'Middleware in Next.js | Sigma Web Development Course - Tutorial #126', duration: '10:18' },
    { id: '14:04', title: 'Auth.js - Authentication in Next.js | Sigma Web Development Course - Tutorial #127', duration: '14:04' },
    { id: '9:51', title: 'Dynamic Routes in Next.js | Sigma Web Development Course - Tutorial #128', duration: '9:51' },
    { id: '12:34', title: 'Layouts in Next.js | Sigma Web Development Course - Tutorial #129', duration: '12:34' },
    { id: '2:28:15', title: 'React Project: Password Manager using React, Tailwind, MongoDB & Express | Sigma WebD Tutorial #130', duration: '2:28:15' },
    { id: '4:49:02', title: 'Project GetMeAChai - Patreon Clone in Next.js | Sigma Web Development Course - Tutorial #131', duration: '4:49:02' },
    { id: '12:50', title: 'Understanding next/navigation module in Next.js | Sigma Web Development Course - Tutorial #132', duration: '12:50' },
    { id: '14:18', title: 'SSR, SSG & ISR in Next.js | Sigma Web Development Course - Tutorial #133', duration: '14:18' },
    { id: '11:15', title: 'Environment Variables in Next.js | Sigma Web Development Course - Tutorial #134', duration: '11:15' },
    { id: '8:34', title: 'Styled JSX and other ways to Style in Next.js | Sigma Web Development Course - Tutorial #135', duration: '8:34' },
    { id: '56:16', title: '[Project] Let\'s Build a Url Shortener in Next.js 15 | Sigma Web Development Course - Tutorial #136', duration: '56:16' },
    { id: '1:53:49', title: '[Project] Let\'s Build a LinkTree Clone in Next.js 15 | Sigma Web Development Course - Tutorial #137', duration: '1:53:49' },
    { id: '18:58', title: 'Deploying our Next.js App to Vercel | Sigma Web Development Course - Tutorial #138', duration: '18:58' },
    { id: '8:27', title: 'My Last Video | Sigma Web Development Course - Tutorial #139', duration: '8:27' }
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
                onClick={() => navigate('/fullstack-practice')}
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
                <h1 className="text-lg font-bold text-white">Full Stack Video Courses</h1>
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
                    {videos[currentVideoIndex]?.title || 'Full Stack Development Tutorial'}
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
                  id="youtube-player"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Playlist */}
        <div className={`${isFullscreen ? 'w-full bg-gray-800 p-6' : 'w-1/2 bg-gray-800 border-l border-gray-700 p-6'} overflow-y-auto`}>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Course Playlist</h2>
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

export default FullStackVideoPlayer