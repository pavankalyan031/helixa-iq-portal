import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FullTimeJobs = () => {
  const navigate = useNavigate()

  // Sample job data - in a real app, this would come from an API
  const jobs = [
    {
      id: 1,
      title: "Software Development Engineer",
      company: "TechGiant Inc.",
      role: "SDE-1",
      location: "Bangalore, India",
      experience: "0-2 years",
      salary: "₹8-12 LPA",
      type: "Full-time",
      description: "Join our dynamic team to build scalable web applications",
      applyLink: "https://example.com/apply1",
      skills: ["JavaScript", "React", "Node.js", "MongoDB"],
      postedDate: new Date(),
      lastDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "DataTech Solutions",
      role: "Data Scientist",
      location: "Remote",
      experience: "1-3 years",
      salary: "₹10-15 LPA",
      type: "Full-time",
      description: "Work with large datasets and build ML models for business insights",
      applyLink: "https://example.com/apply2",
      skills: ["Python", "Machine Learning", "SQL", "Tableau"],
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      lastDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000) // 21 days from now
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "StartupXYZ",
      role: "Senior Frontend Developer",
      location: "Mumbai, India",
      experience: "2-4 years",
      salary: "₹12-18 LPA",
      type: "Full-time",
      description: "Create amazing user experiences with modern web technologies",
      applyLink: "https://example.com/apply3",
      skills: ["React", "TypeScript", "CSS", "Figma"],
      postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      lastDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
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
                <h1 className="text-2xl font-bold text-white">Full Time Jobs</h1>
                <p className="text-gray-400">Career opportunities for freshers and experienced professionals</p>
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
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">💼 Full-Time Career Opportunities</h3>
            <p className="text-green-100 text-sm">Browse through exciting full-time job positions from top companies. Latest postings appear first.</p>
          </div>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        🔹 {job.id}. {job.title}
                      </h3>
                      <p className="text-green-400 text-lg mb-2">{job.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">🏢 Company</p>
                      <p className="text-white font-medium">{job.company}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">📌 Role</p>
                      <p className="text-white font-medium">{job.role}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">📍 Location</p>
                      <p className="text-white font-medium">{job.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">💼 Experience</p>
                      <p className="text-white font-medium">{job.experience}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">💰 Salary</p>
                      <p className="text-green-400 font-medium">{job.salary}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">⏰ Type</p>
                      <p className="text-white font-medium">{job.type}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">🛠️ Required Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-sm text-gray-400">
                      <span>Posted: {formatDate(job.postedDate)}</span>
                      <span className="mx-2">•</span>
                      <span>Last Date: {formatDate(job.lastDate)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 lg:mt-0 lg:ml-6">
                  <a
                    href={job.applyLink}
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
            Load More Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default FullTimeJobs