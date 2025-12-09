import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const InternshipsForStudents = () => {
  const navigate = useNavigate()

  // Sample internship data - in a real app, this would come from an API
  const internships = [
    {
      id: 1,
      title: "Software Development Engineering Internship",
      company: "FarAlpha Technologies",
      role: "Software Development Engineering Intern",
      location: "Remote (WFH)",
      batch: "Freshers & Undergraduates",
      stipend: "₹10,000/Month",
      duration: "6 Months",
      description: "🚀 Backend + Next.js Lovers, This One's for You!",
      applyLink: "https://shorturl.at/m1Ir0",
      referralNote: "Entangle referral window open (only open till December 9th before 12pm)",
      postedDate: new Date(),
      lastDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    },
    {
      id: 2,
      title: "Data Analyst Internship",
      company: "TechCorp Solutions",
      role: "Data Analyst Intern",
      location: "Hybrid",
      batch: "Final-year students from technical backgrounds",
      stipend: "₹8,000/Month",
      duration: "6 Months",
      description: "Work with real datasets and build analytical models",
      applyLink: "https://shorturl.at/5DJWo",
      referralNote: "",
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      lastDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
    },
    {
      id: 3,
      title: "Frontend Developer Internship",
      company: "InnovateLabs",
      role: "Frontend Developer Intern",
      location: "Remote",
      batch: "All undergraduate students",
      stipend: "₹12,000/Month",
      duration: "4 Months",
      description: "Build modern web applications with React and TypeScript",
      applyLink: "https://example.com/apply3",
      referralNote: "",
      postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      lastDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000) // 21 days from now
    }
  ]

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

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
                <h1 className="text-2xl font-bold text-white">Internships for Students</h1>
                <p className="text-gray-400">Latest internship opportunities posted daily</p>
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
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">🎓 Latest Internship Opportunities</h3>
            <p className="text-blue-100 text-sm">Browse through curated internship positions from top companies. Latest postings appear first.</p>
          </div>
        </div>

        {/* Internship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {internships.map((internship) => (
            <div key={internship.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        🔹 {internship.id}. {internship.title}
                      </h3>
                      <p className="text-blue-400 text-lg mb-2">{internship.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">🏢 Company</p>
                      <p className="text-white font-medium">{internship.company}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">📌 Role</p>
                      <p className="text-white font-medium">{internship.role}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">📍 Location</p>
                      <p className="text-white font-medium">{internship.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">🎓 Batch</p>
                      <p className="text-white font-medium">{internship.batch}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">💰 Stipend</p>
                      <p className="text-green-400 font-medium">{internship.stipend}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">⏳ Duration</p>
                      <p className="text-white font-medium">{internship.duration}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-sm text-gray-400">
                      <span>Posted: {formatDate(internship.postedDate)}</span>
                      <span className="mx-2">•</span>
                      <span>Last Date: {formatDate(internship.lastDate)}</span>
                    </div>
                    {internship.referralNote && (
                      <div className="text-orange-400 text-sm font-medium">
                        {internship.referralNote}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 lg:mt-0 lg:ml-6">
                  <a
                    href={internship.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full lg:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-center block"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
            Load More Internships
          </button>
        </div>
      </div>
    </div>
  )
}

export default InternshipsForStudents