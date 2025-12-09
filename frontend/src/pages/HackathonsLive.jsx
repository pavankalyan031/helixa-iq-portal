import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HackathonsLive = () => {
  const navigate = useNavigate()

  // Sample hackathon data - in a real app, this would come from an API
  const hackathons = [
    {
      id: 1,
      title: "Codegeist 2025: Atlassian Williams Racing Edition",
      timeLeft: "13 days left",
      location: "Online",
      prizes: "$120,000 in prizes",
      participants: "2719 participants",
      organizer: "Atlassian",
      dates: "Oct 27 - Dec 22, 2025",
      managedBy: "Devpost",
      tags: ["Machine Learning/AI", "Enterprise", "Productivity"],
      featured: true,
      description: "Build innovative solutions for the racing industry using Atlassian's platform"
    },
    {
      id: 2,
      title: "Tableau Hackathon",
      timeLeft: "about 1 month left",
      location: "Online",
      prizes: "$45,000 in prizes",
      participants: "1062 participants",
      organizer: "Tableau",
      dates: "Nov 12, 2025 - Jan 12, 2026",
      managedBy: "Devpost",
      tags: ["Databases", "Machine Learning/AI"],
      featured: false,
      description: "Create data visualizations and analytics solutions using Tableau"
    },
    {
      id: 3,
      title: "AI Innovation Challenge",
      timeLeft: "2 weeks left",
      location: "Hybrid",
      prizes: "$25,000 in prizes",
      participants: "834 participants",
      organizer: "TechCorp",
      dates: "Dec 15, 2025 - Jan 15, 2026",
      managedBy: "Unstop",
      tags: ["AI/ML", "Innovation"],
      featured: false,
      description: "Develop AI-powered solutions for real-world problems"
    }
  ]

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
                <h1 className="text-2xl font-bold text-white">Live Hackathons</h1>
                <p className="text-gray-400">Active hackathons and coding competitions</p>
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
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">🏆 Active Hackathons & Competitions</h3>
            <p className="text-orange-100 text-sm">Join live hackathons, win prizes, and build your portfolio with real-world projects.</p>
          </div>
        </div>

        {/* Hackathon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hackathons.map((hackathon) => (
            <div key={hackathon.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{hackathon.title}</h3>
                        {hackathon.featured && (
                          <span className="px-3 py-1 bg-yellow-600 text-yellow-100 text-xs rounded-full font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 mb-3">{hackathon.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">⏰ Time Left</p>
                      <p className="text-orange-400 font-medium">{hackathon.timeLeft}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">📍 Location</p>
                      <p className="text-white font-medium">{hackathon.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">🏆 Prizes</p>
                      <p className="text-green-400 font-medium">{hackathon.prizes}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">👥 Participants</p>
                      <p className="text-blue-400 font-medium">{hackathon.participants}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">🏢 Organizer</p>
                    <p className="text-white font-medium">{hackathon.organizer}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">📅 Dates</p>
                    <p className="text-white font-medium">{hackathon.dates}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">🔧 Managed by</p>
                    <p className="text-white font-medium">{hackathon.managedBy}</p>
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {hackathon.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 lg:mt-0 lg:ml-6">
                  <button className="w-full lg:w-auto px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium text-center block">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
            Load More Hackathons
          </button>
        </div>
      </div>
    </div>
  )
}

export default HackathonsLive