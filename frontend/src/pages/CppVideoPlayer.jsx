import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const CppVideoPlayer = () => {
  const navigate = useNavigate()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [watchedVideos, setWatchedVideos] = useState(new Set([0])) // Track watched videos by index
  const playerRef = useRef(null)
  const [player, setPlayer] = useState(null)

  // Complete C++ Placement DSA Course videos
  const videos = [
    { title: "Lecture 1: Intro to Programming & Flowcharts", duration: "57:54" },
    { title: "Lecture 2: Write Your First Program in C++", duration: "56:00" },
    { title: "Lecture 3: If-Else, While loop & Lots of Patterns (Part-1)", duration: "55:52" },
    { title: "Lecture 4: Solving Pattern Questions (Part-2)", duration: "1:03:58" },
    { title: "Lecture 5: Bitwise Operators, For Loops, Operator Precedence & Variable Scoping", duration: "1:15:44" },
    { title: "Lecture 6: Binary & Decimal Number System", duration: "35:15" },
    { title: "Lecture 7: LeetCode Problem Solving Session", duration: "42:43" },
    { title: "Lecture 8: Switch Statement & Functions", duration: "1:24:59" },
    { title: "Lecture 9: Introduction to Arrays in C++", duration: "1:29:54" },
    { title: "Lecture 10: Solving LeetCode/CodeStudio Questions [Arrays]", duration: "1:34:54" },
    { title: "Lecture 11:Time & Space Complexity || How to avoid Time Limit Exceeded [TLE]", duration: "29:12" },
    { title: "Lecture 12: Binary Search Explained in 1 Video [Theory + Code]", duration: "38:41" },
    { title: "Lecture 13: Binary Search Interview Questions [Google, Amazon, Microsoft] || ProblemSet - 1", duration: "41:33" },
    { title: "Lecture14: Binary Search Interview Questions [Google, Amazon, Microsoft] || ProblemSet - 2", duration: "55:35" },
    { title: "Lecture 15: Book Allocation Problem || Aggressive Cows Problem || Binary Search Advanced Problems", duration: "1:05:13" },
    { title: "Lecture16: Selection Sort [Theory + Code] || C++ Placement Series", duration: "34:29" },
    { title: "CodeHelp Weekly Contest 1 is LIVE || Game starts Now", duration: "2:13" },
    { title: "Lecture 17: BUBBLE SORT in 1 Video [Theory + Optimised Code] || Best/Worst Case Complexity", duration: "31:52" },
    { title: "Lecture 18: INSERTION SORT in 1 Video [Theory + Code] || Best/Worst Case Complexity", duration: "34:04" },
    { title: "Lecture19: C++ STL in 1 Video (Re-Uploaded)", duration: "1:01:51" },
    { title: "Lecture 20: Solving LeetCode/CodeStudio Questions [Arrays]", duration: "35:38" },
    { title: "Lecture21: Solving LeetCode/CodeStudio Questions [Arrays]", duration: "33:32" },
    { title: "CodeHelp Weekly Contest 2 is LIVE || Contest 1 Results announced", duration: "3:22" },
    { title: "Lecture22: All about Char Arrays, Strings & solving LeetCode Questions", duration: "1:53:20" },
    { title: "Lecture 23: Introduction to 2D Arrays in C++ || LeetCode Questions", duration: "1:30:36" },
    { title: "Lecture 24: Basic Maths for DSA || Sieve || Modular Arithmetics || Euclid's Algorithm", duration: "44:08" },
    { title: "DSA Placement course || Phase-1 Completed", duration: "0:55" },
    { title: "Lecture 25: Pointers in C++ || Part-1 || DSA Placement Course - Love Babbar", duration: "44:11" },
    { title: "Lecture 26: Pointers in C++ || Part-2 || DSA Placement Course - Love Babbar", duration: "1:03:59" },
    { title: "Lecture27: Double Pointers in C++ || Pointers Practice MCQs", duration: "52:52" },
    { title: "Lecture28: Reference Variable | Static vs Dynamic Memory | Part-1", duration: "47:12" },
    { title: "Lecture29: Dynamic Memory Allocation of 2D Arrays", duration: "22:53" },
    { title: "Lecture30: Macros, Global Variables, Inline Functions & Default Args", duration: "39:23" },
    { title: "Lecture 31: Learning Recursion the Best Way! | 10 Day Recursion Challenge", duration: "37:36" },
    { title: "Lecture32: Understanding Recursion the easiest way || Day-2 || 10 Day Recursion Challenge", duration: "45:16" },
    { title: "Lecture33: Recursion and Binary Search | Day-3 | 10 Days Recursion Challenge", duration: "43:14" },
    { title: "Lecture34: Recursion with Strings | Day-4 | 10 Day Recursion Challenge", duration: "36:49" },
    { title: "Lecture35: Merge Sort using Recursion | Day-5 | 10 Day Recursion Challenge", duration: "24:23" },
    { title: "CodeHelp Weekly Contest 3 is LIVE || Contest 1 & 2 Gifts Sent !!", duration: "2:32" },
    { title: "Lecture36: Quick Sort using Recursion | Day-6 | 10 Day Recursion Challenge", duration: "37:55" },
    { title: "Lecture37: Recursion - Subsets / Subsequences of String [Theory + Code]", duration: "27:25" },
    { title: "Lecture38: Phone Keypad Problem Recursion || C++ Placement Course", duration: "30:42" },
    { title: "Lecture39: Permutations of a String || C++ Placement Course", duration: "21:50" },
    { title: "Lecture40: Rat in a Maze Problem || C++ Placement Course 2022", duration: "37:31" },
    { title: "Lecture 41: Time & Space Complexity of Recursive Algorithms || C++ Placement Course", duration: "49:23" },
    { title: "Lecture 42: OOPs Concepts in C++ || Part-1", duration: "1:29:14" },
    { title: "Lecture 43 : 4 Pillars of OOPs Concept -Inheritance, Polymorphism, Encapsulation & Abstraction", duration: "1:35:29" },
    { title: "Lecture 44: Linked List & its types - Singly, Doubly, Circular etc.", duration: "2:21:18" },
    { title: "Lecture 45: Linked List Questions: Reverse LL and find Middle of LL", duration: "52:40" },
    { title: "CodeHelp Weekly Contest 4 is LIVE || Contest Editorial/Solutions", duration: "3:35" },
    { title: "Lecture 46: Linked List Questions: Reverse LL in \"K group\" && Check LL is Circular or not", duration: "40:08" },
    { title: "Lecture47: Detect & Remove Loop in Linked List [Approach Discussion + Optimised Implementation]", duration: "50:36" },
    { title: "Lecture 48: Remove Duplicates from a Sorted/UnSorted Linked List", duration: "27:25" },
    { title: "Lecture 49: Merge 2 Sorted Linked Lists || Sort 0s, 1s and 2s in Linked List", duration: "58:44" },
    { title: "Lecture 50: Check Palindrome in Linked List || C++ Placement Course", duration: "22:38" },
    { title: "Lecture 51: Add 2 Numbers represented by Linked Lists || C++ Placement Course", duration: "26:24" },
    { title: "Lecture 52: Clone a Linked List with Random Pointers || C++ Placement Course", duration: "55:08" },
    { title: "Lecture 53: Merge Sort in Linked List [ Theory + Implementation ]", duration: "27:49" },
    { title: "Lecture 54: Introduction to Stacks [Theory + Implementation] || C++ Placement Course", duration: "43:11" },
    { title: "Lecture 55: Stack Interview Questions || Placement Series by Love Babbar", duration: "1:35:53" },
    { title: "Lecture 56: Largest Rectangular Area in Histogram [Optimised Approach]", duration: "28:31" },
    { title: "Lecture 57: Stack - Celebrity Problem && Max Rectangle in Binary Matrix with all 1's", duration: "43:54" },
    { title: "Lecture 58: \"N\" Stacks in an Array || Stack Hard Question", duration: "37:48" },
    { title: "Lecture 59: Design Special Stack Problem || C++ Placement Course", duration: "29:29" },
    { title: "Lecture 60: Queues in C++ [STL + Implementation + Types of Queues ]", duration: "1:05:02" },
    { title: "Lecture 61: Queue FAANG Interview Questions || Placement Series by Love Babbar", duration: "2:23:55" },
    { title: "Lecture 62: Binary Trees & its Representation || Different types of Traversals", duration: "55:06" },
    { title: "CodeHelp Weekly Contest 5 is LIVE || Contest Editorial/Solutions", duration: "2:24" },
    { title: "Lecture 63: Binary Tree FAANG Interview Questions || Part-1", duration: "1:01:05" },
    { title: "Lecture 64: Binary Tree FAANG Interview Questions || Part-2", duration: "1:11:31" },
    { title: "Lecture 65: Binary Tree FAANG Interview Questions || Part-3", duration: "59:15" },
    { title: "Lecture 66: Construct a Binary Tree from InOrder/PreOrder/PostOrder Traversal", duration: "36:35" },
    { title: "Lecture 67: Minimum Time to BURN the Entire Binary Tree || C++ Placement Series", duration: "28:28" },
    { title: "Lecture 68: Morris Traversal || Flatten a Binary tree to Linked List || C++ Placement Series", duration: "31:54" },
    { title: "Lecture 69: Binary Search Tree & its Implementation || Insertion, Deletion & Searching a Node", duration: "1:05:47" },
    { title: "Lecture 70: Binary SearchTree FAANG Interview Questions || Part-1", duration: "37:55" },
    { title: "Lecture 71: Binary SearchTree FAANG Interview Questions || Part-2", duration: "48:19" },
    { title: "Lecture 72: Merge 2 Binary Search Trees || C++ Placement Series", duration: "45:58" },
    { title: "Lecture 73: Largest BST in a Binary Tree || C++ Placement Series", duration: "23:09" },
    { title: "Lecture 74: Heaps in C++ || Heap Sort || Insertion/Deletion in Heap || Priority Queue STL", duration: "1:04:56" },
    { title: "Lecture 75: Heaps in C++ || Interview Questions || Part - 1", duration: "1:08:00" },
    { title: "CodeHelp Weekly Contest 6 is LIVE || MacBook Giveaway Coming Soon", duration: "2:51" },
    { title: "Lecture 76: Heaps in C++ || Interview Questions || Part - 2", duration: "50:01" },
    { title: "Lecture 77: Heaps Hard Interview Questions || Part - 3", duration: "1:05:15" },
    { title: "Lecture 78: Hashmaps in C++ || C++ Placement Series", duration: "1:03:27" },
    { title: "CodeHelp Weekly Contest 7 is LIVE", duration: "1:20" },
    { title: "Lecture 79: Trie & its Implementation || C++ Placement Series", duration: "48:20" },
    { title: "Lecture 80: Longest Common Prefix Problem || Tries || C++ Placement Series", duration: "20:17" },
    { title: "Lecture 81: Implement a Phone Directory Using Trie || C++ Placement Series", duration: "27:04" },
    { title: "Lecture 82: Rat in Maze Problem || Backtracking Day 1 || C++ Placement Series", duration: "31:37" },
    { title: "Lecture 83: N-Queen Problem || Backtracking Day 2 || C++ Placement Series", duration: "31:04" },
    { title: "Lecture 84: Sudoku Solver Problem || Backtracking Day 3 || C++ Placement Series", duration: "23:10" },
    { title: "Lecture 85: Introduction to Graphs || Creation and Implementation", duration: "33:29" },
    { title: "Lecture 86: BFS Traversal in Graph || C++ Placement Series", duration: "23:39" },
    { title: "Lecture 87: DFS Traversal in Graph || C++ Placement Series", duration: "14:18" },
    { title: "Lecture 88: Cycle Detection in Undirected Graphs || Using BFS and DFS", duration: "32:03" },
    { title: "Lecture 89: Cycle Detection in Directed Graphs || Placement Series", duration: "18:30" },
    { title: "Lecture 90: Topological Sort ( Using DFS ) || Placement Series", duration: "20:09" },
    { title: "Lecture 91: Topological Sort ( Using Kahn's Algorithm ) || Placement Series", duration: "17:02" },
    { title: "CodeHelp Weekly Contest 9 is LIVE || C++ Placement Series", duration: "2:35" },
    { title: "Lecture 92: Cycle Detection in Directed Graph || Using BFS", duration: "8:23" },
    { title: "Lecture 93: Shortest Path in Undirected Graphs || C++ Placement Series", duration: "19:53" },
    { title: "Lecture 94: Shortest Path in Directed Acyclic Graphs || C++ Placement Series", duration: "34:09" },
    { title: "Lecture 95: Dijkstra's Algorithm || C++ Placement Series", duration: "35:55" },
    { title: "Lecture 96: Minimum Spanning Tree || Prim's Algorithm", duration: "33:04" },
    { title: "Lecture 97: Kruskal's Algorithm || Disjoint Set || Union by Rank & Path Compression", duration: "40:31" },
    { title: "Lecture 98: Bridges in a Graph || C++ Placement Series", duration: "25:13" },
    { title: "Lecture 99: Articulation Points in Graphs || C++ Placement Series", duration: "29:52" },
    { title: "Lecture 100: Kosaraju's Algorithm for Strongly Connected Components || C++ Placement Series", duration: "21:43" },
    { title: "Lecture 101: Bellman Ford Algorithm || C++ Placement Series", duration: "22:06" },
    { title: "Lecture 102: Introduction to Dynamic Programming | Memoization | Tabulation | Space Optimisation", duration: "37:21" },
    { title: "Lecture 103: Minimum Cost Climbing Stairs || DP Series", duration: "34:28" },
    { title: "Lecture 104: Minimum Number of Coins || DP Series", duration: "30:36" },
    { title: "Lecture 105: Maximum Sum of Non-Adjacent Elements || DP Series", duration: "20:33" },
    { title: "Lecture 106: House Robbery Problem || DP Series", duration: "11:33" },
    { title: "Lecture 107: Cut Rod into Segments of X, Y, Z || DP Series", duration: "24:39" },
    { title: "Lecture 108: Count derangements || DP Series", duration: "26:35" },
    { title: "Lecture 109: Painting Fence Algorithm || DP Series", duration: "25:03" },
    { title: "Lecture 110: 0/1 KnapSack Problem || learn 2-D DP Concept || DP Series", duration: "51:19" },
    { title: "Lecture 111: Combination Sum IV Problem || DP Series", duration: "17:45" },
    { title: "Lecture 112: Perfect Squares Problem || DP Series", duration: "20:38" },
    { title: "Lecture 113: Minimum Cost for Tickets || Part-1 || DP Series", duration: "26:17" },
    { title: "Lecture 114: Minimum Cost for Tickets || Part-2 || DP Series", duration: "17:45" },
    { title: "Lecture 115: Largest Square area in Matrix || DP Series", duration: "27:31" },
    { title: "Lecture 116: Min Score Triangulation of Polygon || DP Series", duration: "26:08" },
    { title: "Lecture 117: Minimum Sideways Jump LeetCode || 2D-DP || DP Series", duration: "50:31" },
    { title: "Lecture 118: Reducing Dishes LeetCode || 2D-DP || DP Series", duration: "27:27" },
    { title: "Lecture 119: Longest Increasing Subsequence + Russian Doll LeetCode || DP + Binary Search", duration: "46:24" },
    { title: "Lecture 120: Maximum Height by Stacking Cuboid || DP Series", duration: "16:10" },
    { title: "Lecture 121: Pizza with 3n Slices || 2D - DP || DP Series", duration: "27:31" },
    { title: "Lecture 122: Number of Dice Rolls with Target Sum || DP Series", duration: "33:19" },
    { title: "Lecture 123: Partition Equal Subset Sum || DP Series", duration: "27:59" },
    { title: "Lecture 124: Minimum Swaps to make Subsequences Increasing || DP Series", duration: "42:10" },
    { title: "Lecture 125: Longest Arithmetic Subsequence || DP Series", duration: "37:42" },
    { title: "Lecture 126: Longest AP with given Difference \"d\" || DP Series", duration: "11:24" },
    { title: "Lecture 127: Unique Binary Search Trees || Catalan Number", duration: "20:27" },
    { title: "Lecture 128: Guess Number Higher or Lower || DP Series", duration: "25:03" },
    { title: "Lecture 129: Minimum Cost Tree From Leaf Values || DP Series", duration: "26:49" },
    { title: "Lecture 130: Buy and Sell Stock [Part 1] || DP Series", duration: "9:50" },
    { title: "Lecture 131: Buy and Sell Stock [Part 2] || DP Series", duration: "30:05" },
    { title: "Lecture 132: Buy and Sell Stock [Part 3] || DP Series", duration: "20:59" },
    { title: "Lecture 133: Buy and Sell Stock [Part 4] || DP Series", duration: "18:30" },
    { title: "Lecture 134: Buy and Sell Stock [Part 5] || DP Series", duration: "8:26" },
    { title: "Lecture 135: Longest Common Subsequence || DP on Strings", duration: "22:07" },
    { title: "Lecture 136: Longest Palindromic Subsequence || DP on Strings", duration: "8:25" },
    { title: "Lecture 137: EDIT Distance || DP on Strings", duration: "30:03" },
    { title: "Lecture 138: Maximum Rectangle with all 1's || DP Series", duration: "13:07" },
    { title: "Lecture 139: Wildcard Pattern Matching || DP Series", duration: "31:35" },
    { title: "Lecture 140: GREEDY ALGORITHMS in 1 VIDEO", duration: "1:29:51" }
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
          list: 'PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA',
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