import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const MLVideoPlayer = () => {
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
          list: 'PLxCzCOWd7aiEXg5BV10k9THtjnS48yI-T',
          index: currentVideoIndex,
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: (event) => {
            console.log('ML player ready')
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
      console.log('Switching to ML video index:', currentVideoIndex)
      player.playVideoAt(currentVideoIndex)
    }
  }, [currentVideoIndex, player])

  // Complete Machine Learning playlist: https://youtube.com/playlist?list=PLxCzCOWd7aiEXg5BV10k9THtjnS48yI-T
  const videos = [
    { title: "Lec-1: Introduction to Data Science & ML | Roadmap to Learn Data Science & ML", duration: "8:24" },
    { title: "Lec-2: Supervised Learning Algorithms | Machine Learning", duration: "8:50" },
    { title: "Lec-3: Introduction to Regression with Real Life Examples", duration: "7:19" },
    { title: "Lec-4: Linear Regression📈 with Real life examples & Calculations | Easiest Explanation", duration: "11:01" },
    { title: "Lec-5: Logistic Regression with Simplest & Easiest Example | Machine Learning", duration: "10:01" },
    { title: "Lec-6: Linear Regression Vs. Logistic Regression | Supervised Learning | Machine Learning", duration: "4:37" },
    { title: "Lec-7: kNN Classification with Real Life Example | Movie Imdb Example | Supervised Learning", duration: "10:13" },
    { title: "Lec-8: Naive Bayes Classification Full Explanation with examples | Supervised Learning", duration: "13:31" },
    { title: "Lec-9: Introduction to Decision Tree 🌲 with Real life examples", duration: "6:07" },
    { title: "Lec-10: Decision Tree 🌲 ID3 Algorithm with Example & Calculations 🧮", duration: "16:38" },
    { title: "Lec-11: Conditional Probability with Easiest Explanation & Example", duration: "6:23" },
    { title: "Lec-12: Introduction to Ensemble Learning with Real Life Examples | Machine⚙️ Learning", duration: "5:58" },
    { title: "Lec-13: K-mean Clustering with Numerical Example | Unsupervised Learning | Machine🖥️ Learning 🙇‍♂️🙇", duration: "7:51" },
    { title: "Lec-14: Hierarchical Clustering | Agglomerative vs Divisive with examples", duration: "6:06" },
    { title: "Lec-15: Single Linkage Clustering | Agglomerative Clustering | Hierarchical Clustering", duration: "6:16" },
    { title: "Lec-16: Complete Linkage⛓️ Clustering with Example | Clustering in Unsupervised Learning | ML", duration: "9:05" },
    { title: "Lec-17: K-medoids Clustering with Numerical Example | Machine Learning", duration: "11:53" },
    { title: "Lec-18: Random Forest 🌳 in Machine Learning 🧑‍💻👩‍💻", duration: "8:33" },
    { title: "Lec-19: kNN for Classified & Regression with Easiest Explanation | Machine Learning 🤖🙇", duration: "7:21" },
    { title: "Lec-20: Mean, Median, Mode with Real Life examples | Machine Learning", duration: "7:41" },
    { title: "Lec-21: Standard Deviation & Variance with Examples", duration: "8:16" },
    { title: "Lec-22: Bagging/Bootstrap Aggregating in Machine Learning with examples", duration: "4:56" },
    { title: "Lec-23: Supervised vs Unsupervised learning with real life example", duration: "7:31" },
    { title: "Python code for Mean, Median, Mode, SD, Variance and Range", duration: "0:48" },
    { title: "Lec-24: How Weights are Increased in Boosting | Ensemble Learning", duration: "6:48" },
    { title: "Lec-25: BAGGING vs. BOOSTING vs STACKING in Ensemble Learning | Machine Learning", duration: "6:22" },
    { title: "Bayes Theorem & Total Probability with Examples", duration: "7:16" },
    { title: "Lec-26: Cross Validation in Machine Learning with Examples", duration: "6:51" },
    { title: "Lec-27: Pearson's Correlation Coefficient | Supervised Learning | Data Science & Machine Learning", duration: "7:38" },
    { title: "Lec-28: kNN(k Nearest Neighbour) Numerical Example | Supervised Learning | Machine Learning", duration: "9:09" },
    { title: "Lec-29: Decision Tree 🌳 Example | Calculate Entropy, Information ℹ️ Gain | Supervised Learning", duration: "6:57" },
    { title: "Lec-30: Single Linkage Clustering Example | Unsupervised Learning | Machine Learning", duration: "6:52" },
    { title: "Lec-31: Token & Parameters in LLama3 META Models | 8B & 70B Parameters Model | GPT model", duration: "7:09" },
    { title: "Lec-32: What is Data Preprocessing & Data Cleaning | Various Techniques with Example", duration: "5:53" },
    { title: "Lec-33: How to Deal with Missing Values in DataSet | Data Preprocessing & Data Cleaning", duration: "9:27" },
    { title: "Lec-34: kNN Imputation with Examples | Data Preprocessing and Data Cleaning 🧹", duration: "7:51" },
    { title: "Lec-35: Fit() & Transform() Method | Data Preprocessing | Machine Learning", duration: "6:36" },
    { title: "Lec-36: Feature Extraction in Data preprocessing | Machine Learning", duration: "9:21" },
    { title: "Lec-37: Ridge and Lasso Regression | Machine Learning", duration: "14:10" },
    { title: "Lec-38: Mean Squared Error (MSE) | Machine learning", duration: "9:53" },
    { title: "Lec-39: Multiple Linear Regression (MLR) | Machine Learning", duration: "12:48" },
    { title: "Lec-40: Support Vector Machines (SVMs) | Machine Learning", duration: "10:23" },
    { title: "Lec-41: Numerical Explanation on SVM | How Support Vector Machine Algorithm Works", duration: "16:07" },
    { title: "Lec-42: Linear Discriminant Analysis (LDA) | Machine Learning", duration: "13:21" },
    { title: "Lec-43: Bias & Variance Tradeoff Explained: How to Fix Overfitting & Underfitting?", duration: "14:44" },
    { title: "Lec-44: K-Fold Cross Validation in Machine Learning", duration: "9:52" },
    { title: "Lec-45: Leave-One-Out Cross Validation (LOOCV) Explained with Example | Machine Learning", duration: "9:36" },
    { title: "Lec-46: Principal Component Analysis (PCA) Explained | Machine Learning", duration: "14:06" },
    { title: "Lec-47: How to update cost in K-Medoid Clustering | Machine Learning", duration: "12:05" },
    { title: "Lec-48: Understanding Single Layer Perceptron (SLP) with Example | Machine Learning", duration: "15:04" },
    { title: "Lec-49: What is Multilayer Perceptron (MLP)? | How It Works in Machine Learning", duration: "12:56" },
    { title: "Lec-50: Single Layer Neural Network | Machine Learning", duration: "12:03" },
    { title: "New to ML? Follow These Steps to Build Any Machine Learning Model", duration: "9:59" }
  ]

  const handleVideoSelect = (videoIndex) => {
    console.log('Switching to ML video index:', videoIndex)
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
                onClick={() => navigate('/ml-practice')}
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
                <h1 className="text-lg font-bold text-white">🧠 ML Video Courses</h1>
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
                    {videos[currentVideoIndex]?.title || 'Machine Learning Tutorial'}
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
                  id="ml-video-player"
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

export default MLVideoPlayer