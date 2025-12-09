import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const JavaDSAVideoPlayer = () => {
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
          list: 'PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ',
          index: currentVideoIndex,
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: (event) => {
            console.log('Java DSA player ready')
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
      console.log('Switching to Java DSA video index:', currentVideoIndex)
      player.playVideoAt(currentVideoIndex)
    }
  }, [currentVideoIndex, player])

  // Complete Java + DSA + Interview Preparation Course videos
  const videos = [
    { title: "Best Data Structures & Algorithms (DSA) Course - Clear Any FAANG Interview!", duration: "16:20" },
    { title: "Java vs C++ for Data Structures & Algorithms", duration: "11:15" },
    { title: "How I Cleared My Google Interviews - Use LeetCode Effectively!", duration: "15:44" },
    { title: "Complete Git and GitHub Tutorial", duration: "1:12:40" },
    { title: "Introduction to Programming - Types of Languages, Memory Management", duration: "39:02" },
    { title: "Flow of Program - Flowcharts & Pseudocode", duration: "27:02" },
    { title: "Introduction to Java - Architecture & Installation", duration: "28:26" },
    { title: "First Java Program - Input/Output, Debugging and Datatypes", duration: "1:32:23" },
    { title: "Conditionals and Loops + Calculator Program", duration: "1:02:35" },
    { title: "Switch Statements + Nested Case in Java", duration: "26:11" },
    { title: "Functions / Methods in Java", duration: "1:30:31" },
    { title: "Introduction to Arrays and ArrayList in Java", duration: "1:45:53" },
    { title: "Linear Search Algorithm - Theory + Code + Questions", duration: "1:15:44" },
    { title: "Binary Search Algorithm - Theory + Code", duration: "58:16" },
    { title: "Binary Search Interview Questions - Google, Facebook, Amazon", duration: "4:01:46" },
    { title: "Binary Search in 2D Arrays", duration: "58:57" },
    { title: "Bubble Sort Algorithm - Theory + Code", duration: "46:37" },
    { title: "Selection Sort Algorithm - Theory + Code", duration: "18:49" },
    { title: "Insertion Sort Algorithm - Theory + Code", duration: "30:40" },
    { title: "Cycle Sort - Amazon, Google, Microsoft Interview Questions", duration: "1:35:32" },
    { title: "Strings and StringBuilder in Java", duration: "1:27:29" },
    { title: "Solve Any Pattern Question With This Trick!", duration: "57:20" },
    { title: "Introduction to Recursion - Learn In The Best Way", duration: "1:55:49" },
    { title: "Time and Space Complexity COMPLETE Tutorial - What is Big O?", duration: "2:28:24" },
    { title: "Bitwise Operators + Number Systems - Maths for DSA", duration: "2:17:09" },
    { title: "Maths for Data Structures & Algorithms", duration: "1:54:54" },
    { title: "Recursion - Level 1 Questions (Theory + Code + Tips)", duration: "1:13:22" },
    { title: "Recursion - Array Questions (Theory + Code + Tips)", duration: "1:18:48" },
    { title: "Recursion - Pattern Questions + Bubble Sort + Selection Sort", duration: "34:35" },
    { title: "Merge Sort Using Recursion (Theory + Complexity + Code)", duration: "49:47" },
    { title: "Quick Sort Using Recursion (Theory + Complexity + Code)", duration: "42:14" },
    { title: "Recursion Subset, Subsequence, String Questions", duration: "1:23:56" },
    { title: "Recursion - Permutations (Theory + Code + Tips)", duration: "25:22" },
    { title: "Recursion Google, Amazon Questions: Dice Throw & Letter Combinations of a Phone Number", duration: "38:36" },
    { title: "Backtracking Introduction + Maze Problems - Theory + Code + Tips", duration: "1:28:10" },
    { title: "N-Queens, N-Knights, Sudoku Solver (LeetCode) - Backtracking Questions", duration: "1:19:26" },
    { title: "OOP 1 | Introduction & Concepts - Classes, Objects, Constructors, Keywords", duration: "1:42:27" },
    { title: "OOP 2 | Packages, Static, Singleton Class, In-built Methods", duration: "1:19:13" },
    { title: "OOP 3 | Principles - Inheritance, Polymorphism, Encapsulation, Abstraction", duration: "2:12:51" },
    { title: "OOP 4 | Access Control, In-built Packages, Object Class", duration: "50:45" },
    { title: "OOP 5 | Abstract Classes, Interfaces, Annotations", duration: "1:10:42" },
    { title: "OOP 6 | Generics, Custom ArrayList, Lambda Expressions, Exception Handling, Object Cloning", duration: "1:31:53" },
    { title: "OOP 7 | Collections Framework, Vector Class, Enums in Java", duration: "26:40" },
    { title: "Linked List Tutorial - Singly + Doubly + Circular (Theory + Code + Implementation)", duration: "1:55:57" },
    { title: "Linked List Interview Questions - Google, Facebook, Amazon, Microsoft", duration: "3:08:11" },
    { title: "Stacks and Queues Complete Tutorial - Theory + Implementation + Types (Dynamic, Circular)", duration: "1:30:47" },
    { title: "Stacks and Queues Interview Questions - Google, Facebook, Amazon, Microsoft", duration: "2:24:21" },
    { title: "Tic Tac Toe Java Game in Under 15 Minutes", duration: "17:16" },
    { title: "Binary Trees Tutorial - Introduction + Traversals + Code | Binary Search Trees (BST)", duration: "2:52:43" },
    { title: "AVL Trees Tutorial | Self Balancing Binary Search Trees", duration: "1:06:14" },
    { title: "Segment Trees Tutorial | Range Queries | Interview Questions", duration: "1:13:23" },
    { title: "StringBuffer in Java | Data Formatting | Working With Large Data", duration: "36:21" },
    { title: "BigInteger & BigDecimal - Handling Large Numbers in Java", duration: "34:57" },
    { title: "File Handling in Java Complete Course", duration: "1:01:04" },
    { title: "Binary Tree Questions for Technical Interviews - Google, Facebook, Amazon, Microsoft", duration: "5:01:51" },
    { title: "Introduction to Heap Data Structure + Priority Queue + Heapsort Tutorial", duration: "1:11:07" },
    { title: "Introduction to HashMap & HashTable in Java", duration: "1:39:46" },
    { title: "Karp-Rabin String Matching Algorithm | Substring Search Pattern", duration: "24:01" },
    { title: "Count Sort Algorithm - Theory + Code", duration: "20:44" },
    { title: "Radix Sort Algorithm - Theory + Code", duration: "31:22" },
    { title: "Huffman Coding Greedy Algorithm | Text Compression", duration: "49:26" },
    { title: "Easily Solve Range Query Interview Problems with Square Root Decomposition/Mo's Algorithm", duration: "39:17" },
    { title: "Binary Tree from Preorder & Inorder Traversal - Advance Tree Questions", duration: "28:12" },
    { title: "Vertical Order Traversal of a Binary Tree - Google Interview Question", duration: "22:29" },
    { title: "Word Ladder - LeetCode Hard - Google Phone Screen Interview Question", duration: "17:45" },
    { title: "Two Sum IV - Google, Amazon, Facebook Interview Question", duration: "8:38" },
    { title: "Kth Smallest Element in a BST - Google, Amazon, Facebook Interview Question", duration: "14:22" },
    { title: "Convert Binary Tree to Doubly Linked List - FAANG Interview Question", duration: "10:36" },
    { title: "Correct Binary Tree That Has Two Nodes Swapped - FAANG Interview Question", duration: "10:32" }
  ]

  const handleVideoSelect = (videoIndex) => {
    console.log('Switching to Java DSA video index:', videoIndex)
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
                onClick={() => navigate('/java-dsa-videos')}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-orange-500 shadow-lg">
                <img
                  src="/assets/images/ltsu-custom-logo.png"
                  alt="Helixa IQ Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">☕ Java DSA Video Player</h1>
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
                    {videos[currentVideoIndex]?.title || 'Java DSA Tutorial'}
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
                  id="java-dsa-video-player"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Playlist */}
        <div className={`${isFullscreen ? 'w-full bg-gray-800 p-6' : 'w-1/2 bg-gray-800 border-l border-gray-700 p-6'} overflow-y-auto`}>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Java + DSA Course Playlist</h2>
            <p className="text-gray-400 text-sm">Select a video to start watching</p>
          </div>

          <div className={`space-y-3 ${isFullscreen ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : ''}`}>
            {videos.map((video, index) => (
              <div
                key={index}
                onClick={() => handleVideoSelect(index)}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  index === currentVideoIndex
                    ? 'bg-orange-600/20 border-orange-500'
                    : watchedVideos.has(index)
                    ? 'bg-green-600/10 border-green-500'
                    : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === currentVideoIndex
                      ? 'bg-orange-600 text-white'
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
                    <div className="text-orange-400">
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
              <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <p className="text-gray-400 text-xs">{watchedVideos.size} of {videos.length} videos completed ({Math.round(progressPercentage)}%)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JavaDSAVideoPlayer