import React from 'react'
import { useNavigate } from 'react-router-dom'

const HackathonsPlatforms = () => {
  const navigate = useNavigate()

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
                <h1 className="text-2xl font-bold text-white">Hackathons Platforms</h1>
                <p className="text-gray-400">Browse top hackathon platforms and websites</p>
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
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">🏆 Hackathon Platforms & Competition Websites</h3>
            <p className="text-purple-100 text-sm">Find the best platforms to participate in hackathons, coding contests, and innovation challenges worldwide.</p>
          </div>
        </div>

        {/* Main Hackathon Platforms */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <a
            href="https://devpost.com/hackathons"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Devpost</h3>
              <span className="text-2xl">🏆</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">World's #1 Hackathon Platform</p>
            <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
              View Hackathons
            </div>
          </a>

          <a
            href="https://www.hackerearth.com/challenges/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">HackerEarth</h3>
              <span className="text-2xl">💻</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Ongoing Hackathons + Hiring Challenges</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              View Challenges
            </div>
          </a>

          <a
            href="https://www.codechef.com/contests"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-orange-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">CodeChef</h3>
              <span className="text-2xl">🍳</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Monthly Contests + Long Challenges (Free)</p>
            <div className="w-full px-3 py-2 bg-orange-600 text-white rounded-lg text-sm text-center hover:bg-orange-700 transition-colors">
              View Contests
            </div>
          </a>

          <a
            href="https://www.kaggle.com/competitions"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Kaggle</h3>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">ML/DS Competitions (Free Entry)</p>
            <div className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm text-center hover:bg-purple-700 transition-colors">
              View Competitions
            </div>
          </a>

          <a
            href="https://leetcode.com/contest/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-yellow-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">LeetCode</h3>
              <span className="text-2xl">💡</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Weekly & Biweekly Contests</p>
            <div className="w-full px-3 py-2 bg-yellow-600 text-white rounded-lg text-sm text-center hover:bg-yellow-700 transition-colors">
              View Contests
            </div>
          </a>

          <a
            href="https://www.hackathons.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-pink-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Hackathons.com</h3>
              <span className="text-2xl">🌍</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Everywhere Hackathon Listings</p>
            <div className="w-full px-3 py-2 bg-pink-600 text-white rounded-lg text-sm text-center hover:bg-pink-700 transition-colors">
              View Listings
            </div>
          </a>

          <a
            href="https://mlh.io/seasons"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-indigo-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">MLH</h3>
              <span className="text-2xl">🎓</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Student Hackathons Worldwide</p>
            <div className="w-full px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm text-center hover:bg-indigo-700 transition-colors">
              View Seasons
            </div>
          </a>

          <a
            href="https://gitcoin.co/hackathons"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-teal-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Gitcoin</h3>
              <span className="text-2xl">🌐</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Open Source Bounties & Web3 Hackathons</p>
            <div className="w-full px-3 py-2 bg-teal-600 text-white rounded-lg text-sm text-center hover:bg-teal-700 transition-colors">
              View Hackathons
            </div>
          </a>

          <a
            href="https://www.topcoder.com/challenges"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-red-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">TopCoder</h3>
              <span className="text-2xl">🏃</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">SRMs + Marathon Matches</p>
            <div className="w-full px-3 py-2 bg-red-600 text-white rounded-lg text-sm text-center hover:bg-red-700 transition-colors">
              View Challenges
            </div>
          </a>

          <a
            href="https://taikah.com/hackathons"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-cyan-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">TAIKAH</h3>
              <span className="text-2xl">🤖</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">AI/ML & Coding Hackathons (New platform)</p>
            <div className="w-full px-3 py-2 bg-cyan-600 text-white rounded-lg text-sm text-center hover:bg-cyan-700 transition-colors">
              View Hackathons
            </div>
          </a>

          <a
            href="https://unstop.com/hackathons"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-lime-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Unstop</h3>
              <span className="text-2xl">🇮🇳</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">India's largest Hackathon Portal</p>
            <div className="w-full px-3 py-2 bg-lime-600 text-white rounded-lg text-sm text-center hover:bg-lime-700 transition-colors">
              View Hackathons
            </div>
          </a>

          <a
            href="https://angelhack.com/hackathons/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-rose-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">AngelHack</h3>
              <span className="text-2xl">👼</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Global Hackathon Community</p>
            <div className="w-full px-3 py-2 bg-rose-600 text-white rounded-lg text-sm text-center hover:bg-rose-700 transition-colors">
              View Hackathons
            </div>
          </a>

          <a
            href="https://developer.microsoft.com/en-us/reactor/events/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-400 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Microsoft Reactor</h3>
              <span className="text-2xl">☁️</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Cloud/AI Hack Events (Hiring-focused)</p>
            <div className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg text-sm text-center hover:bg-blue-600 transition-colors">
              View Events
            </div>
          </a>

          <a
            href="https://gdg.community.dev/events/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-400 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">GDG</h3>
              <span className="text-2xl">🌟</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Local Hackathons (Hiring-focused)</p>
            <div className="w-full px-3 py-2 bg-green-500 text-white rounded-lg text-sm text-center hover:bg-green-600 transition-colors">
              View Events
            </div>
          </a>

          <a
            href="https://aws.amazon.com/events/hackathons/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-orange-400 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">AWS Hackathons</h3>
              <span className="text-2xl">⚡</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Cloud & Serverless Competitions (Hiring-focused)</p>
            <div className="w-full px-3 py-2 bg-orange-500 text-white rounded-lg text-sm text-center hover:bg-orange-600 transition-colors">
              View Hackathons
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default HackathonsPlatforms