import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const CppVideoPlayer = () => {
  const navigate = useNavigate()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [watchedVideos, setWatchedVideos] = useState(new Set([0])) // Track watched videos by index
  const playerRef = useRef(null)
  const [player, setPlayer] = useState(null)

  // Complete Jenny's Lectures C++ Course videos
  const videos = [
    { title: "Lec 00: C++ complete course | Content Overview | C++ tutorials for Beginners", duration: "8:54" },
    { title: "Lec 1: How to Install and Set Visual Studio Code and MinGW Compiler for C and C++ | C++ Tutorials", duration: "27:47" },
    { title: "Lec 2: What is Object Oriented Programming (OOP) | POP vs OOP | C++ Tutorials for Beginners", duration: "15:36" },
    { title: "Lec 3: OOPs Concepts in C++ | Object Oriented Programming Pillars | C++ Tutorials for Beginners", duration: "29:30" },
    { title: "Lec 4: Introduction to C++ Programming | C++ Tutorials for Beginners", duration: "10:01" },
    { title: "Lec 5: Features of C++ Programming Language | C++ Tutorials for Beginners", duration: "17:42" },
    { title: "Lec 6: History of C++ | C++ Tutorials for Beginners", duration: "11:54" },
    { title: "Lec 7: Basic Structure of a C++ Program | C++ Tutorials for Beginners", duration: "27:06" },
    { title: "Lec 8: Variables and Constants in C++ | C++ Tutorials for Beginners", duration: "24:04" },
    { title: "Lec 9: Keywords and Identifiers in C++ | C++ Tutorials for Beginners", duration: "15:50" },
    { title: "Lec 10: DataTypes with Type Modifiers in C++ - part 1| int Data Type | C++ Tutorials for Beginners", duration: "25:36" },
    { title: "Lec 11: Data Types in C++ - part 2 | float Data Type | C++ Tutorials for Beginners", duration: "25:52" },
    { title: "Lec 12: Data Types in C++ - part 3 | char Data Type | C++ Tutorials for Beginners", duration: "18:58" },
    { title: "Lec 13: Wide Character (wchar_t) Data Type in C++ |C++ Tutorials for Beginners", duration: "15:31" },
    { title: "Lec14: bool and void Data Types in C++ | C++ Tutorials for beginners", duration: "18:44" },
    { title: "Lec 15: Input and Output in C++ | C++ Tutorials for Beginners", duration: "18:49" },
    { title: "Lec 16: Operators in C++ Programming- part1 | Arithmetic and Relational| C++ Tutorials for Beginners", duration: "22:33" },
    { title: "Lec 17: Operators in C++ Programming - part2| Logical and Bitwise |C++ Tutorials for Beginners", duration: "21:29" },
    { title: "Lec 18: Operators in C++ - Part3 | Assignment and Miscellaneous operators", duration: "14:46" },
    { title: "Lec 19: Operators Precedence and Associativity in C++ - part 1 | C++ Tutorials for Beginners", duration: "19:26" },
    { title: "Lec 20: Operators Precedence and Associativity in C++ - part2 | C++ Tutorials for Beginners", duration: "19:51" },
    { title: "Lec 21: C++ Control Structures - part 1 | if statement | C++ Tutorials for Beginners", duration: "25:54" },
    { title: "Lec 22: C++ Control Structures -part 2 | if else Statement | C++ Tutorials for Beginners", duration: "18:26" },
    { title: "Lec 23: C++ Control Structures -part3 | else if ladder Statements | C++ Tutorials for Beginners", duration: "15:19" },
    { title: "Lec 24: C++ Control Structures - part4 | Nested if and Nested if else | C++ Tutorials for Beginners", duration: "15:47" },
    { title: "Lec 25: Switch Case statement in C++ Programming| C++ Tutorials for Beginners", duration: "25:02" },
    { title: "Lec 26: Introduction to Loops in C++ | C++ Tutorials for Beginners", duration: "15:22" },
    { title: "Lec 27: Loops in C++ | for loop in detail | C++ Tutorials for Beginners", duration: "18:16" },
    { title: "Lec 28: Properties of for loop in C++ | C++ Tutorials for Beginners", duration: "21:58" },
    { title: "Lec 29: Coding Exercise with Solution for beginners in C++ | Exercise #1", duration: "9:48" },
    { title: "Lec 30: While Loop in C++ | C++ Tutorials for Beginners", duration: "19:23" },
    { title: "Lec 31: Coding Exercise for Beginners with Solution | While Loop in C++ | part2", duration: "14:41" },
    { title: "Lec 32 do-while Loop in C++ | C++ Tutorials for Beginners", duration: "21:22" },
    { title: "Lec 33: Coding Exercise for Beginners with Solution | do-while loop in C++", duration: "23:09" },
    { title: "Range based for loop in C++ | C++ Tutorials for Beginners #lec34", duration: "18:27" },
    { title: "Coding Exercise for Beginners with Solution | Range Based for loop in C++ | C++ for beginners #lec35", duration: "8:02" },
    { title: "break statement in C++ | C++ Tutorials for Beginners #lec36", duration: "22:22" },
    { title: "continue statement in C++ | C++ Tutorials for Beginners #lec37", duration: "15:08" },
    { title: "Coding Exercise for Beginners with Solution | C++ for Beginners #lec38", duration: "4:41" },
    { title: "Infinite Loop in C++ | C++ Tutorials for Beginners #lec39", duration: "10:54" },
    { title: "C++ Nested Loops | Need of Nested Loop| C++ Tutorials for Beginners #lec40", duration: "13:11" },
    { title: "Coding Exercise for Beginners with Solution | C++ for Beginners #lec41", duration: "10:08" },
    { title: "Introduction to Arrays in C++ | C++ Tutorials for Beginners #lec42", duration: "23:36" },
    { title: "Memory Representation and Accessing Array Elements | C++Tutorials for Beginners #lec43", duration: "26:17" },
    { title: "Coding Exercise on Arrays | LeetCode Problems with Solution | C++ Tutorials for Beginners #lec44", duration: "36:01" },
    { title: "Introduction to 2D (Two Dimensional) Arrays in c++ | c++ Tutorials for Beginners #lec45", duration: "27:24" },
    { title: "Addressing in One Dimensional Array | 1D Array| C++ Placement Course #lec46", duration: "6:18" },
    { title: "Memory Representation of 2D Array| How to access Array elements| c++ for Beginners #lec47", duration: "8:43" },
    { title: "2D Arrays | Addressing in 2D (Two Dimensional) Array | C++ Course #lec48", duration: "21:37" },
    { title: "Coding Exercise for beginners in Solution | 2D Arrays | C++ Tutorials for Beginners #lec49", duration: "6:13" },
    { title: "Vectors in C++ STL |Part 1 | STL for Beginners| C++ Tutorials for Beginners #lec50", duration: "30:37" },
    { title: "How to Access and Modify Vector Elements |Vectors Part 2 | C++ Tutorials for Beginners #lec51", duration: "10:38" },
    { title: "Vectors in C++ | Part 3| Iterators and Modifiers in Vectors| STL for Beginners #lec52", duration: "36:17" },
    { title: "Coding Exercises on Vectors with Solution | STL Vectors| C++ Tutorials for Beginners #lec53", duration: "12:29" },
    { title: "Pairs in C++ | Vectors and Pairs | STL for Beginners #lec54", duration: "19:45" },
    { title: "Vector of Pairs in C++ | STL for Beginners | C++ Complete Course #lecture55", duration: "15:46" },
    { title: "Coding Exercise on Vector of Pairs | STL in C++ |#lec56", duration: "6:40" },
    { title: "Vector of Vectors & Array of Vectors in C++ | STL in C++ | C++ Placement Course #lecture57", duration: "29:12" },
    { title: "Introduction to Strings in C++ | part 1| C style Strings | C++ Placement Course #lecture58", duration: "24:34" },
    { title: "C++ Strings Introduction | getline function | part 2| C++ placement Course #lecture59", duration: "22:25" },
    { title: "C++ Strings Member functions | Part 3| C++ Placement Course #lecture60", duration: "19:52" },
    { title: "Coding Exercise on Strings with Solution| C++ Placement Course #lecture61", duration: "9:22" },
    { title: "Coding Exercise on Strings with Solution | Substitution Cipher | C++ Placement Course #lecture62", duration: "20:14" },
    { title: "Solving Pyramid Pattern Question | C++ Placement Course #lecture63", duration: "22:49" },
    { title: "Functions in C++ | Introduction to Functions | C++ Placement Course | Lecture 64", duration: "40:10" },
    { title: "Call by Value & Call by Reference in C++ | C++ Placement Course | Lecture 65", duration: "27:57" },
    { title: "Default Arguments in C++ | C++ Placement Course| Lecture 66", duration: "17:01" },
    { title: "Function Overloading in C++ | C++ Placement Course | Lecture 67", duration: "25:19" },
    { title: "Practice Problems on Functions | Lecture 68 | C++ Placement Course", duration: "19:28" },
    { title: "Coding Exercise on Functions | Practice Questions with Answers | C++ Placement Course| lecture 69", duration: "8:56" },
    { title: "Passing an Array to a Function in C++ | C++ Placement Course | Lecture 70", duration: "19:56" },
    { title: "Coding Exercise on Passing Array to a Function | C++ Placement Course | lecture 71", duration: "13:18" },
    { title: "How Function Call Works | What is Call Stack | C++ Programming Course | Lecture72", duration: "12:13" },
    { title: "Inline Functions in C++ | C++ Programming Course | Lecture 73", duration: "8:31" },
    { title: "Recursion & Recursive Functions in C++ | C++ Programming Course for Beginners | Lecture74", duration: "25:56" },
    { title: "Coding Exercise on Recursion with Solution | C++ Placement Course | lecture 75", duration: "11:04" },
    { title: "Coding Exercise on Recursion with Solution | C++ Placement Course | lecture 76", duration: "7:52" },
    { title: "What to Object Oriented Programming | POP vs OOP | C++ Programming Course for Beginners| Lecture77", duration: "15:11" },
    { title: "Classes and Objects in C++ | OOP Concepts | C++ Programming Course for Beginners | Lecture78", duration: "22:05" },
    { title: "Accessing Class Members using Objects in C++ | Debugging C++ Program in VS Code | Lecture79", duration: "18:42" },
    { title: "Coding Exercise on OOPs with Solution | C++ Placement Course | Lecture 80", duration: "10:11" },
    { title: "Access specifiers in C++ | Public Private Protected access specifiers in C++ programming #lecture 84", duration: "13:46" },
    { title: "How to implement Class Methods in C++ | C++ Course for Beginners | Lecture 85", duration: "25:58" }
  ]

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
          list: 'PLdo5W4Nhv31YU5Wx1dopka58teWP9aCee',
          index: currentVideoIndex,
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: (event) => {
            console.log('C++ player ready')
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
      console.log('Switching to C++ video index:', currentVideoIndex)
      player.playVideoAt(currentVideoIndex)
    }
  }, [currentVideoIndex, player])

  const handleVideoSelect = (videoIndex) => {
    console.log('Switching to C++ video index:', videoIndex)
    setCurrentVideoIndex(videoIndex)
    // Mark video as watched
    setWatchedVideos(prev => new Set([...prev, videoIndex]))
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/cpp-practice')}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-green-500 shadow-lg">
              <img
                src="/assets/images/ltsu-custom-logo.png"
                alt="Helixa IQ Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">⚡ C++ Video Course</h1>
              <p className="text-gray-400 text-xs">Helixa IQ Portal</p>
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
                    {videos[currentVideoIndex]?.title || 'C++ Programming Tutorial'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Duration: {videos[currentVideoIndex]?.duration || 'N/A'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
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
              </div>

              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <div
                  ref={playerRef}
                  className="w-full h-full"
                  id="cpp-video-player"
                ></div>
              </div>

            </div>
          </div>
        </div>

        {/* Video Playlist */}
        <div className={`${isFullscreen ? 'w-full bg-gray-800 p-6' : 'w-1/2 bg-gray-800 border-l border-gray-700 p-6'} overflow-y-auto`}>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Course Playlist</h2>
            <p className="text-gray-400 text-sm">C++ Programming Tutorials</p>
          </div>

          <div className="space-y-2 mb-6">
            {videos.map((video, index) => (
              <div
                key={index}
                onClick={() => handleVideoSelect(index)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  index === currentVideoIndex
                    ? 'bg-green-600/20 border-green-500'
                    : watchedVideos.has(index)
                    ? 'bg-blue-600/10 border-blue-500'
                    : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === currentVideoIndex
                      ? 'bg-green-600 text-white'
                      : watchedVideos.has(index)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-xs font-medium truncate ${
                      index === currentVideoIndex ? 'text-white' : 'text-gray-300'
                    }`}>
                      {video.title}
                    </h4>
                    <p className="text-gray-500 text-xs mt-1">
                      {video.duration}
                    </p>
                    {watchedVideos.has(index) && index !== currentVideoIndex && (
                      <div className="flex items-center mt-1">
                        <svg className="w-3 h-3 text-blue-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-blue-400 text-xs">Watched</span>
                      </div>
                    )}
                  </div>
                  {index === currentVideoIndex && (
                    <div className="text-green-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-700/30 rounded-lg border border-gray-600">
            <h3 className="text-white font-medium mb-2">📊 Course Progress</h3>
            <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(watchedVideos.size / videos.length) * 100}%` }}></div>
            </div>
            <p className="text-gray-400 text-xs">{watchedVideos.size} of {videos.length} videos completed</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CppVideoPlayer