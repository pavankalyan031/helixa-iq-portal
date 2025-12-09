import React from 'react'
import { useNavigate } from 'react-router-dom'

const FreelancingPlatforms = () => {
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
                <h1 className="text-2xl font-bold text-white">Freelancing Work Platforms</h1>
                <p className="text-gray-400">Browse top freelancing platforms and websites</p>
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
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">🎯 Top Freelancing Platforms & Resources</h3>
            <p className="text-yellow-100 text-sm">Find the best platforms to start your freelancing career, build skills, and land high-paying projects.</p>
          </div>
        </div>

        {/* Top FREE Freelancing Platforms */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="text-green-400 mr-2">🎯</span>
            Top FREE Freelancing Platforms
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://www.upwork.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Upwork</h3>
                <span className="text-2xl">💼</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">World's Biggest Freelancing Marketplace</p>
              <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
                Start Freelancing
              </div>
            </a>

            <a
              href="https://www.fiverr.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Fiverr</h3>
                <span className="text-2xl">🎨</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Gig-based Freelancing Platform</p>
              <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
                Find Gigs
              </div>
            </a>

            <a
              href="https://www.freelancer.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Freelancer.com</h3>
                <span className="text-2xl">🌐</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Global Freelance Marketplace</p>
              <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
                Browse Projects
              </div>
            </a>

            <a
              href="https://www.peopleperhour.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">PeoplePerHour</h3>
                <span className="text-2xl">⏰</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">High-quality Freelance Projects</p>
              <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
                Find Work
              </div>
            </a>

            <a
              href="https://www.guru.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Guru</h3>
                <span className="text-2xl">👨‍💻</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Freelancing for Developers, Designers, Writers</p>
              <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
                Get Started
              </div>
            </a>

            <a
              href="https://www.toptal.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Toptal</h3>
                <span className="text-2xl">⭐</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Premium Freelance Network (High Paying)</p>
              <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
                Apply Now
              </div>
            </a>

            <a
              href="https://www.truelancer.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Truelancer</h3>
                <span className="text-2xl">🇮🇳</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Great for Indian Freelancers</p>
              <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
                Join Now
              </div>
            </a>

            <a
              href="https://www.workana.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Workana</h3>
                <span className="text-2xl">🚀</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Freelance Projects for Beginners</p>
              <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
                Start Here
              </div>
            </a>

            <a
              href="https://www.flexjobs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">FlexJobs</h3>
                <span className="text-2xl">🏠</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Remote & Freelance Job Board</p>
              <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
                Find Remote Work
              </div>
            </a>

            <a
              href="https://arc.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Arc.dev</h3>
                <span className="text-2xl">⚡</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Freelance Remote Jobs for Developers</p>
              <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
                Developer Jobs
              </div>
            </a>
          </div>
        </div>

        {/* Free Learning Platforms */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="text-blue-400 mr-2">📚</span>
            Free Learning Platforms to Build Freelancing Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://www.coursera.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Coursera</h3>
                <span className="text-2xl">🎓</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Courses on Freelancing, Business, Marketing</p>
              <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
                Learn Skills
              </div>
            </a>

            <a
              href="https://www.youtube.com/results?search_query=freelancing+for+beginners"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">YouTube</h3>
                <span className="text-2xl">📺</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Complete Freelancing Tutorials</p>
              <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
                Watch Tutorials
              </div>
            </a>

            <a
              href="https://www.udemy.com/courses/free/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Udemy Free</h3>
                <span className="text-2xl">🆓</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Freelancing Basics Courses</p>
              <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
                Free Courses
              </div>
            </a>

            <a
              href="https://academy.hubspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">HubSpot Academy</h3>
                <span className="text-2xl">📊</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Free Business & Client Management Courses</p>
              <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
                Business Skills
              </div>
            </a>

            <a
              href="https://www.skillshare.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Skillshare</h3>
                <span className="text-2xl">🎨</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Freelancing, Branding, Client Skills</p>
              <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
                Start Learning
              </div>
            </a>
          </div>
        </div>

        {/* Bonus Platforms */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="text-purple-400 mr-2">🌟</span>
            Bonus Platforms to Build Portfolio + Earn Money
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">GitHub</h3>
                <span className="text-2xl">📦</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Showcase your projects (essential for technical freelancing)</p>
              <div className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm text-center hover:bg-purple-700 transition-colors">
                Build Portfolio
              </div>
            </a>

            <a
              href="https://www.behance.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Behance</h3>
                <span className="text-2xl">🎨</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Portfolio for UI/UX, designers, creatives</p>
              <div className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm text-center hover:bg-purple-700 transition-colors">
                Showcase Work
              </div>
            </a>

            <a
              href="https://dribbble.com/jobs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Dribbble</h3>
                <span className="text-2xl">💎</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Portfolio + freelance design jobs</p>
              <div className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm text-center hover:bg-purple-700 transition-colors">
                Design Jobs
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreelancingPlatforms