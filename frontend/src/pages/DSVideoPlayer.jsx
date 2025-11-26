import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const DSVideoPlayer = () => {
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
          list: 'PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y',
          index: currentVideoIndex,
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: (event) => {
            console.log('DS player ready')
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
      console.log('Switching to DS video index:', currentVideoIndex)
      player.playVideoAt(currentVideoIndex)
    }
  }, [currentVideoIndex, player])

  // DBMS playlist videos
  const videos = [
    { title: "Lec-1: DBMS Syllabus for GATE, UGCNET, DSSSB etc.| Full DBMS for College/University Students", duration: "18:04" },
    { title: "Lec-2: Introduction to DBMS (Database Management System) With Real life examples | What is DBMS", duration: "12:00" },
    { title: "Lec-3: File System vs DBMS | Disadvantages of File System | DBMS Advantages", duration: "13:00" },
    { title: "Lec-4: 2 tier and 3 tier Architecture with real life examples | Database Management System", duration: "12:57" },
    { title: "Lec-5: What is Schema | How to define Schema | Database management system in Hindi", duration: "4:34" },
    { title: "Lec-6: Three Schema Architecture | Three Level of Abstraction | Database Management System", duration: "15:25" },
    { title: "Lec-7: What is Data Independence | Logical vs. Physical Independence | DBMS", duration: "10:22" },
    { title: "Lec-8.0: Integrity Constraints in Database with Examples", duration: "7:14" },
    { title: "Lec-8: What is CANDIDATE KEY and PRIMARY key | Full Concept | Most suitable examples | DBMS", duration: "5:12" },
    { title: "Lec-9: What is Primary Key in DBMS | Primary Key with Examples in Hindi", duration: "11:31" },
    { title: "Lec-10: Foreign Key in DBMS | Full Concept with examples | DBMS in Hindi", duration: "8:43" },
    { title: "Lec-11: Insert, Update & Delete from Foreign Key table | Referential Integrity", duration: "18:19" },
    { title: "Lec-12: Question on Foreign Key | ये Question Competition Exams में अक्सर पूछा गया है", duration: "8:44" },
    { title: "Lec-13: Super key in DBMS in HINDI | ये Question Competition Exams में अक्सर पूछा गया है", duration: "9:42" },
    { title: "Lec-14: Introduction to ER model | ER Model क्या है", duration: "8:32" },
    { title: "Lec-15: Types of Attributes in ER Model | Full Concept | DBMS in Hindi", duration: "14:02" },
    { title: "Lec-16: One to One relationship in DBMS in Hindi", duration: "16:44" },
    { title: "Lec-17: One to Many Relationship in DBMS in Hindi | 1-M Relationship", duration: "13:59" },
    { title: "Lec-18: Many to Many Relationship in DBMS | M-N Relationship", duration: "10:47" },
    { title: "Lec-19:Question on Minimize tables in ER Model | ये Question Competition Exams में अक्सर पूछा गया है", duration: "5:38" },
    { title: "Lec-20: Introduction to Normalization | Insertion, Deletion & Updation Anomaly", duration: "12:51" },
    { title: "Lec-21: First Normal form in DBMS in HINDI | 1st Normal form क्या होती है ?", duration: "8:29" },
    { title: "Lec-22: Finding Closure of Functional dependency in DBMS | Easiest & Simplest way", duration: "17:46" },
    { title: "Lec-23: Functional Dependency & its properties in DBMS in HINDI", duration: "17:09" },
    { title: "Lec-24: Second Normal Form | 2NF | Database Management System", duration: "18:00" },
    { title: "Lec-25: Third Normal Form in dbms with examples in Hindi | Normalization", duration: "16:26" },
    { title: "Lec-26: Boyce Codd Normal Form #BCNF #DBMS #Normalization with best examples", duration: "6:48" },
    { title: "Lec-27: BCNF Always Ensures Dependency Preserving Decomposition?? Normalization Examples", duration: "10:04" },
    { title: "Lec-28: Lossless and Lossy Decomposition| Fifth (5th) Normal Form | Database Management System", duration: "22:17" },
    { title: "Lec-29: All Normal Forms with Real life examples | 1NF 2NF 3NF BCNF 4NF 5NF | All in One", duration: "11:15" },
    { title: "Lec-30: Minimal Cover in DBMS With Example | Canonical cover", duration: "9:09" },
    { title: "Lec-31: Practice Question on Normalization | Database Management System", duration: "20:08" },
    { title: "Lec-32: How to find out the Normal form of a Relation | DBMS", duration: "24:03" },
    { title: "Lec-33: How to Solve Normalization Questions | DBMS", duration: "9:21" },
    { title: "Lec-34: Important Question Explanation on Normalization", duration: "19:28" },
    { title: "Lec-35: Cover and Equivalence of Functional Dependencies | Database Management System", duration: "13:24" },
    { title: "Lec-36: Dependency Preserving Decomposition in DBMS with Examples in Hindi | DBMS", duration: "10:51" },
    { title: "Lec-37: Dependency Preserving Decomposition in DBMS | Example 2 in Hindi", duration: "7:20" },
    { title: "Lec-38: Introduction to Joins and its types | Need of Joins with example | DBMS", duration: "10:41" },
    { title: "Lec-39: Natural Join operation with Example | Database Management System", duration: "16:11" },
    { title: "Lec-40: Self Join operation with Example | Database Management System", duration: "14:37" },
    { title: "Lec-41: Equi Join operation with Example | Database Management System", duration: "14:15" },
    { title: "Lec-42: Left Outer Join operation with Example | Database Management System", duration: "7:48" },
    { title: "Lec-43: Right Outer Join operation with Example | Database Management System", duration: "8:32" },
    { title: "Lec-44: Introduction to Relational Algebra | Database Management System", duration: "4:24" },
    { title: "Lec-45: Projection in Relational Algebra | Database Management System", duration: "6:19" },
    { title: "Lec-46: Selection in Relational Algebra | Database Management System", duration: "6:33" },
    { title: "Lec-47: Cross/Cartesian Product in Relational Algebra | Database Management System", duration: "6:18" },
    { title: "Lec-48: Set Difference in Relational Algebra | Database Management System", duration: "6:03" },
    { title: "Lec-49: Union Operation in Relational Algebra | Database Management System", duration: "7:20" },
    { title: "Lec-50: Division Operation in Relational Algebra | Database Management System", duration: "14:43" },
    { title: "Lec-51: Tuple Calculus in DBMS with examples", duration: "16:09" },
    { title: "Lec-52: Introduction to Structured Query Language | All Points regarding its Features and Syllabus", duration: "12:10" },
    { title: "Lec-53: All Types of SQL Commands with Example | DDL, DML, DCL, TCL and CONSTRAINTS | DBMS", duration: "10:32" },
    { title: "Lec-54: Create table in SQL with execution | SQL for Beginners | Oracle LIVE", duration: "7:25" },
    { title: "Lec-55: ALTER Command (DDL) in SQL with Implementation on ORACLE", duration: "13:09" },
    { title: "Lec-56: Difference between Alter and Update in SQL with examples in Hindi | DBMS", duration: "8:01" },
    { title: "Lec-57 Difference between Delete, Drop & Truncate in SQL | DBMS", duration: "10:19" },
    { title: "Lec-58: Constraints in SQL in Hindi | DBMS", duration: "12:01" },
    { title: "Lec-59: SQL Queries and Subqueries (part-1) | Database Management System", duration: "8:58" },
    { title: "Lec-60: SQL Queries and Subqueries (part-2) | 2nd Highest Salary | Nested Queries | DBMS", duration: "12:27" },
    { title: "Lec-61: SQL Queries and Subqueries (part-3) | Group By clause | Database Management System", duration: "9:12" },
    { title: "Lec-62: SQL Queries and Subqueries (part-4) | Having clause | Database Management System", duration: "11:02" },
    { title: "Lec-63: SQL Queries and Subqueries (part-5) | Database Management System", duration: "11:30" },
    { title: "Lec-64: SQL Queries and Subqueries (part-6)| use of IN and Not IN | Database Management System", duration: "9:14" },
    { title: "Lec-65: SQL Queries and Subqueries (part-7)| use of IN and Not IN in Subquery | DBMS", duration: "9:40" },
    { title: "Lec-66: EXIST and NOT EXIST Subqueries(part-8) | Database Management System", duration: "14:09" },
    { title: "Lec-67: SQL Aggregate Functions - SUM, AVG(n), COUNT, MIN, MAX Functions | DBMS", duration: "11:21" },
    { title: "Lec-68: Correlated Subquery in SQL with Example | Imp for Placements, GATE, NET & SQL certification", duration: "11:44" },
    { title: "Lec-69: Difference between Joins, Nested Subquery and Correlated Subquery | Most Imp Concept of SQL", duration: "15:57" },
    { title: "Lec-70: Find Nth(1st,2nd,3rd....N) Highest Salary in SQL | Imp for Competitive & Placement exam", duration: "12:54" },
    { title: "Lec-71: 3 Imp Questions on SQL basic Concepts | DBMS", duration: "9:38" },
    { title: "Lec-72: Introduction to PL-SQL in DBMS", duration: "6:25" },
    { title: "Lec-73: Introduction to Transaction Concurrency in HINDI | Database Management System", duration: "12:42" },
    { title: "Lec-74: ACID Properties of a Transaction | Database Management System", duration: "13:58" },
    { title: "Lec-75: Transaction States | Database Management System", duration: "11:57" },
    { title: "Lec-76: What is Schedule | Serial Vs Parallel Schedule | Database Management System", duration: "10:46" },
    { title: "Lec-77: All Concurrency Problems | Dirty Read | Incorrect Summary | Lost Update | Phantom Read", duration: "4:57" },
    { title: "Lec-78: Write-Read Conflict or Dirty Read Problem | Database Management System", duration: "8:24" },
    { title: "Lec-79: Read-Write Conflict or Unrepeatable Read Problem | Database Management System", duration: "7:44" },
    { title: "Lec-80: Irrecoverable Vs Recoverable Schedules in Transactions | DBMS", duration: "6:09" },
    { title: "Lec-81: Cascading vs Cascadeless Schedule with Example | Recoverability | DBMS", duration: "11:33" },
    { title: "Lec-82: Introduction to Serializability | Transactions Concurrency and Control | DBMS", duration: "9:17" },
    { title: "Lec-83: Conflict Equivalent Schedules with Example | Transaction concurrency and Control | DBMS", duration: "7:20" },
    { title: "Lec-84: Conflict Serializability | Precedence Graph | Transaction | DBMS", duration: "12:18" },
    { title: "Lec-85: Why View Serializability is Used | Introduction to View Serializability | DBMS", duration: "11:24" },
    { title: "Lec-86:Shared Exclusive Locking Protocol with Example in Hindi | Concurrency Control | DBMS | Part-1", duration: "6:44" },
    { title: "Lec-87: Drawbacks in Shared/Exclusive Locking Protocol with Example | Concurrency Control Part-2", duration: "10:59" },
    { title: "Lec-88: 2 Phase Locking(2PL) Protocol in Transaction Concurrency Control | DBMS", duration: "9:53" },
    { title: "Lec-89: Drawbacks in 2 Phase Locking(2PL) Protocol with examples | Concurrency Control | DBMS", duration: "10:48" },
    { title: "Lec-90: Strict 2PL, Rigorous 2PL and Conservative 2PLSchedule | 2 Phase Locking in DBMS", duration: "11:30" },
    { title: "Lec-91: Basic Timestamp Ordering Protocol with Example in Hindi | Concurrency Control | DBMS", duration: "15:11" },
    { title: "Lec-92: How to Solve Question on Timestamp Ordering Protocol | Concurrency Control | DBMS", duration: "12:38" },
    { title: "Lec-93: Why Indexing is used | Indexing Beginning | DBMS", duration: "10:20" },
    { title: "Lec-94: Numerical Example on I/O Cost in Indexing | Part-1 | DBMS", duration: "12:27" },
    { title: "Lec-95: Numerical Example on I/O Cost in Indexing | Part 2 | DBMS", duration: "11:45" },
    { title: "Lec-96: Types Of Indexes | Most Important Video on Indexing", duration: "4:38" },
    { title: "Lec-97: Primary Index With Example | GATE, PSU and UGC NET | DBMS", duration: "7:56" },
    { title: "Lec-98: Clustered Index in Database with Example", duration: "6:46" },
    { title: "Lec-99: Secondary Index in Database with Example | Multilevel Indexing", duration: "13:04" },
    { title: "Lec-100: Introduction to B-Tree and its Structure | Block Pointer, Record Pointer, Key", duration: "10:13" },
    { title: "Lec-101: Insertion in B-Tree with example in Hindi", duration: "12:48" },
    { title: "Lec-102: How to find Order of B-Tree | Imp Question on B-Tree", duration: "11:15" },
    { title: "Lec-103: Difference b/w B-Tree & B+Tree in Hindi with examples", duration: "14:58" },
    { title: "Lec-104: Order of B+ Tree | Order of Leaf Node & Non Leaf Node in B+Tree", duration: "10:02" },
    { title: "Lec-105: Immediate Database Modification in DBMS | Log Based Recovery Methods", duration: "6:19" },
    { title: "Lec-106: Deferred Database Modification in DBMS | Log Based Recovery | Imp for UGC NET and KVS", duration: "10:30" },
    { title: "Lec-107: Like Command in SQL with example in Hindi | Learn SQL in Easiest Way| DBMS", duration: "10:42" },
    { title: "Lec-108: Basic PL-SQL Programming With Execution | Part-1", duration: "8:05" },
    { title: "Lec-109: Basic PL-SQL Programming(While, For Loop) With Execution | Part-2", duration: "6:12" },
    { title: "Lec-110: Single row and Multi row functions in SQL", duration: "5:44" },
    { title: "Lec-111: Character functions in SQL with execution | Oracle LIVE", duration: "10:30" },
    { title: "Lec-112: View in Database | Oracle, SQL Server Views | Types of Views", duration: "13:58" },
    { title: "Lec-113: How Aggregate Functions work on NULL Values | SQL | DBMS", duration: "7:23" },
    { title: "Lec-114: What is RAID? RAID 0, RAID 1, RAID 4, RAID 5, RAID 6, Nested RAID 10 Explained", duration: "14:35" },
    { title: "Lec-115: Various objects in Database | Oracle, SQL Server", duration: "6:05" },
    { title: "Lec-116: Important Question explanation on ER Model | DBMS", duration: "8:44" },
    { title: "Lec-117: Very Imp. Questions on DBMS basic concepts and Data Modelling | DBMS", duration: "10:56" },
    { title: "Lec-118: Question on Inner, Left, Right & Full Outer Joins Explanation | DBMS", duration: "4:03" },
    { title: "Lec-119: 4 Imp Questions on Advance DBMS | BIG Data and Data Warehouse | DBMS", duration: "10:17" },
    { title: "Lec-120: Important Question on Normalization (Schemas) Explanation | DBMS", duration: "6:53" },
    { title: "Lec-121: Important Question on Relational Algebra | DBMS", duration: "8:56" },
    { title: "Lec-122: Codd's 12 Rules of RDBMS with examples", duration: "13:42" },
    { title: "Lec-123: Top 15 SQL Interview Questions Answers | Most Important Questions for Job Interview", duration: "15:19" },
    { title: "Lec-124: CREATE Command (DDL) in SQL with Implementation on ORACLE", duration: "10:57" },
    { title: "Lec-125: SEQUENCE in SQL with Syntax & Examples", duration: "7:05" },
    { title: "Lec-126: How SQL Query executes?? Order of SQL Query Execution⏳🔄", duration: "7:05" },
    { title: "Lec-127: Introduction to Hadoop🐘| What is Hadoop🐘| Hadoop Framework🖥", duration: "9:28" },
    { title: "Lec-128: Introduction to BIG Data in Hindi | Small Data Vs BIG Data | Real Life Examples", duration: "12:45" },
    { title: "Lec-129: Simple vs Complex vs Materialized Views with examples | DBMS", duration: "7:57" },
    { title: "Foreign Key🔑 with On Delete Cascade with Execution", duration: "5:34" },
    { title: "Procedures in PL-SQL | Local Procedure vs Stored Procedure", duration: "7:18" },
    { title: "How to Fetch Data from Database using Procedures | PL-SQL Procedure", duration: "7:02" },
    { title: "What is Cursor in PL-SQL with example", duration: "12:15" },
    { title: "What is %TYPE & %ROWTYPE in PL-SQL with Examples", duration: "8:35" },
    { title: "Introduction to Weak Entity Set with Example | Database Management System", duration: "11:47" },
    { title: "Rename Operator in Relational Algebra | Database Management System", duration: "13:21" },
    { title: "Non Correlated Subquery in SQL with Example | Imp for Placements, GATE, NET & SQL certification", duration: "18:07" },
    { title: "WITH Clause in SQL | SQL CTE (Common Table Expression) | DBMS", duration: "9:41" }
  ]

  const handleVideoSelect = (videoIndex) => {
    console.log('Switching to DS video index:', videoIndex)
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
                <h1 className="text-lg font-bold text-white">🗄️ DBMS Video Courses</h1>
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
                    {videos[currentVideoIndex]?.title || 'DBMS Tutorial'}
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
                  id="ds-video-player"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Playlist */}
        <div className={`${isFullscreen ? 'w-full bg-gray-800 p-6' : 'w-1/2 bg-gray-800 border-l border-gray-700 p-6'} overflow-y-auto`}>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">DBMS Course Playlist</h2>
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

export default DSVideoPlayer