import React from 'react'
import { useNavigate } from 'react-router-dom'

const InternshipsJobPlatforms = () => {
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
                <h1 className="text-2xl font-bold text-white">Internships and Job Openings Platforms</h1>
                <p className="text-gray-400">Browse top platforms and websites</p>
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
          <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">🌟 Top Free Platforms for Internships & Job Openings</h3>
            <p className="text-indigo-100 text-sm">Discover the best platforms to find internships and job opportunities worldwide.</p>
          </div>
        </div>

        {/* Top Free Platforms */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <a
            href="https://www.linkedin.com/jobs/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">LinkedIn Jobs</h3>
              <span className="text-2xl">💼</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Global Jobs & Internships</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Find Opportunities
            </div>
          </a>

          <a
            href="https://internshala.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Internshala</h3>
              <span className="text-2xl">🇮🇳</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Best for Internships in India</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Apply Now
            </div>
          </a>

          <a
            href="https://www.glassdoor.com/Job/index.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Glassdoor</h3>
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Jobs, Internships & Company Reviews</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Browse Jobs
            </div>
          </a>

          <a
            href="https://www.indeed.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Indeed</h3>
              <span className="text-2xl">🔍</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">World's #1 Job Platform</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Search Jobs
            </div>
          </a>

          <a
            href="https://www.naukri.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Naukri.com</h3>
              <span className="text-2xl">📋</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Jobs & Internships (India)</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Find Jobs
            </div>
          </a>

          <a
            href="https://wellfound.com/jobs"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Wellfound</h3>
              <span className="text-2xl">🚀</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Startup Jobs Worldwide</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Startup Jobs
            </div>
          </a>

          <a
            href="https://careers.google.com/students/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Google Careers</h3>
              <span className="text-2xl">🔤</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Internships & Full-Time Roles</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Apply to Google
            </div>
          </a>

          <a
            href="https://jobs.careers.microsoft.com/global/en/students-and-graduates"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Microsoft Careers</h3>
              <span className="text-2xl">🪟</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Internships + Graduate Roles</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Microsoft Jobs
            </div>
          </a>

          <a
            href="https://www.amazon.jobs/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Amazon Jobs</h3>
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Internships + SDE Roles</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Amazon Careers
            </div>
          </a>

          <a
            href="https://www.metacareers.com/jobs/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-green-500 transition-colors block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Meta Careers</h3>
              <span className="text-2xl">📘</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Internships & New Grad Roles</p>
            <div className="w-full px-3 py-2 bg-green-600 text-white rounded-lg text-sm text-center hover:bg-green-700 transition-colors">
              Meta Jobs
            </div>
          </a>
        </div>

        {/* Tech-Specific Platforms */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="text-blue-400 mr-2">🧠</span>
            Tech-Specific Internship Platforms
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://www.kaggle.com/jobs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Kaggle</h3>
                <span className="text-2xl">📊</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Data Science & ML Internships</p>
              <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
                DS/ML Jobs
              </div>
            </a>

            <a
              href="https://github.com/community/jobs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">GitHub Jobs</h3>
                <span className="text-2xl">📦</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Community Job Boards</p>
              <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
                Developer Jobs
              </div>
            </a>

            <a
              href="https://stackoverflow.com/jobs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-blue-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">StackOverflow Jobs</h3>
                <span className="text-2xl">💻</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">For Developers</p>
              <div className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700 transition-colors">
                Dev Jobs
              </div>
            </a>
          </div>
        </div>

        {/* Student Internship Portals */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="text-purple-400 mr-2">🎓</span>
            Student Internship Portals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://nextstep.tcs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">TCS CareerNext</h3>
                <span className="text-2xl">🏢</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Internships & Graduate Roles</p>
              <div className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm text-center hover:bg-purple-700 transition-colors">
                TCS Careers
              </div>
            </a>

            <a
              href="https://careers.wipro.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Wipro Careers</h3>
                <span className="text-2xl">💼</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Internship/Graduate Hiring</p>
              <div className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm text-center hover:bg-purple-700 transition-colors">
                Wipro Jobs
              </div>
            </a>

            <a
              href="https://www.ibm.com/employment/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">IBM Career Portal</h3>
                <span className="text-2xl">🌐</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Extreme Blue Internships</p>
              <div className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg text-sm text-center hover:bg-purple-700 transition-colors">
                IBM Careers
              </div>
            </a>
          </div>
        </div>

        {/* Global Opportunities */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="text-orange-400 mr-2">🌐</span>
            Global Opportunities for Students
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://careers.un.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-orange-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">UN Careers</h3>
                <span className="text-2xl">🇺🇳</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Internships Worldwide</p>
              <div className="w-full px-3 py-2 bg-orange-600 text-white rounded-lg text-sm text-center hover:bg-orange-700 transition-colors">
                UN Internships
              </div>
            </a>

            <a
              href="https://www.oecd.org/careers/internship-programme/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-orange-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">OECD Internship</h3>
                <span className="text-2xl">🏛️</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">OECD Internship Programme</p>
              <div className="w-full px-3 py-2 bg-orange-600 text-white rounded-lg text-sm text-center hover:bg-orange-700 transition-colors">
                OECD Careers
              </div>
            </a>

            <a
              href="https://www.nato.int/cps/en/natolive/71013.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-orange-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">NATO Internship</h3>
                <span className="text-2xl">🛡️</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">NATO Internship Programme</p>
              <div className="w-full px-3 py-2 bg-orange-600 text-white rounded-lg text-sm text-center hover:bg-orange-700 transition-colors">
                NATO Careers
              </div>
            </a>
          </div>
        </div>

        {/* Remote Internship Platforms */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="text-teal-400 mr-2">💼</span>
            Remote Internship Platforms (Global)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://www.theforage.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-teal-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Forage</h3>
                <span className="text-2xl">🌱</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Virtual Internships (FREE)</p>
              <div className="w-full px-3 py-2 bg-teal-600 text-white rounded-lg text-sm text-center hover:bg-teal-700 transition-colors">
                Virtual Internships
              </div>
            </a>

            <a
              href="https://remoteok.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-teal-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">RemoteOK</h3>
                <span className="text-2xl">🏠</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Remote Jobs Worldwide</p>
              <div className="w-full px-3 py-2 bg-teal-600 text-white rounded-lg text-sm text-center hover:bg-teal-700 transition-colors">
                Remote Jobs
              </div>
            </a>

            <a
              href="https://weworkremotely.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-teal-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">WeWorkRemotely</h3>
                <span className="text-2xl">💻</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Remote Hiring Board</p>
              <div className="w-full px-3 py-2 bg-teal-600 text-white rounded-lg text-sm text-center hover:bg-teal-700 transition-colors">
                Remote Work
              </div>
            </a>
          </div>
        </div>

        {/* Bonus Platforms */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="text-pink-400 mr-2">🚀</span>
            Bonus: High-Quality Curated Opportunities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://www.internships.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-pink-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Internships.com</h3>
                <span className="text-2xl">🎯</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Dedicated internship portal</p>
              <div className="w-full px-3 py-2 bg-pink-600 text-white rounded-lg text-sm text-center hover:bg-pink-700 transition-colors">
                Find Internships
              </div>
            </a>

            <a
              href="https://www.hirect.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-pink-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Hirect</h3>
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Direct Chat with Recruiters</p>
              <div className="w-full px-3 py-2 bg-pink-600 text-white rounded-lg text-sm text-center hover:bg-pink-700 transition-colors">
                Connect Now
              </div>
            </a>

            <a
              href="https://unstop.com/internships"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-pink-500 transition-colors block cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-white">Unstop</h3>
                <span className="text-2xl">🏆</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Competitions + Internships</p>
              <div className="w-full px-3 py-2 bg-pink-600 text-white rounded-lg text-sm text-center hover:bg-pink-700 transition-colors">
                Compete & Apply
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InternshipsJobPlatforms