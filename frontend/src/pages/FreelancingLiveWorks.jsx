import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FreelancingLiveWorks = () => {
  const navigate = useNavigate()

  // Sample freelancing work data - in a real app, this would come from an API
  const freelancingWorks = [
    {
      id: 1,
      title: "E-commerce Website Development",
      client: "StartupTech Solutions",
      budget: "$500 - $800",
      duration: "2-3 weeks",
      skills: ["React", "Node.js", "MongoDB", "Stripe"],
      description: "Build a modern e-commerce website with payment integration and admin dashboard",
      postedDate: new Date(),
      proposals: 12,
      experience: "Intermediate",
      type: "Fixed Price"
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      client: "DesignStudio Pro",
      budget: "$300 - $600",
      duration: "1-2 weeks",
      skills: ["Figma", "Adobe XD", "Mobile Design", "Prototyping"],
      description: "Create stunning UI/UX designs for a fitness tracking mobile application",
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      proposals: 8,
      experience: "Expert",
      type: "Fixed Price"
    },
    {
      id: 3,
      title: "Data Analysis & Visualization",
      client: "Analytics Corp",
      budget: "$50/hour",
      duration: "Ongoing",
      skills: ["Python", "Pandas", "Tableau", "SQL"],
      description: "Analyze sales data and create interactive dashboards for business insights",
      postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      proposals: 15,
      experience: "Intermediate",
      type: "Hourly"
    },
    {
      id: 4,
      title: "WordPress Website Customization",
      client: "Local Business Hub",
      budget: "$200 - $400",
      duration: "1 week",
      skills: ["WordPress", "PHP", "CSS", "JavaScript"],
      description: "Customize existing WordPress theme and add custom functionality",
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      proposals: 6,
      experience: "Beginner",
      type: "Fixed Price"
    }
  ]

  const formatDate = (date) => {
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
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
                <h1 className="text-2xl font-bold text-white">Freelancing Live Works</h1>
                <p className="text-gray-400">Current freelancing opportunities and projects</p>
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
            <h3 className="text-white font-semibold mb-2">💼 Live Freelancing Opportunities</h3>
            <p className="text-green-100 text-sm">Browse current freelancing projects, submit proposals, and start earning. Latest opportunities appear first.</p>
          </div>
        </div>

        {/* Filter/Sort Options */}
        <div className="mb-6 flex flex-wrap gap-4">
          <select className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Categories</option>
            <option>Web Development</option>
            <option>Mobile Development</option>
            <option>Design</option>
            <option>Data Analysis</option>
            <option>Writing</option>
          </select>
          <select className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Budgets</option>
            <option>$0 - $100</option>
            <option>$100 - $500</option>
            <option>$500 - $1000</option>
            <option>$1000+</option>
          </select>
          <select className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Experience Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </select>
        </div>

        {/* Freelancing Work Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {freelancingWorks.map((work) => (
            <div key={work.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{work.title}</h3>
                      <p className="text-gray-300 mb-3">{work.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">👤 Client</p>
                      <p className="text-white font-medium">{work.client}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">💰 Budget</p>
                      <p className="text-green-400 font-medium">{work.budget}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">⏰ Duration</p>
                      <p className="text-white font-medium">{work.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">📊 Proposals</p>
                      <p className="text-blue-400 font-medium">{work.proposals}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">🎯 Experience Level</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      work.experience === 'Beginner' ? 'bg-green-600/20 text-green-400' :
                      work.experience === 'Intermediate' ? 'bg-yellow-600/20 text-yellow-400' :
                      'bg-red-600/20 text-red-400'
                    }`}>
                      {work.experience}
                    </span>
                    <span className="ml-3 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
                      {work.type}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">🛠️ Required Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {work.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-sm text-gray-400">
                      Posted {formatDate(work.postedDate)}
                    </div>
                  </div>
                </div>

                <div className="mt-6 lg:mt-0 lg:ml-6">
                  <button className="w-full lg:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-center block">
                    Send Proposal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
            Load More Projects
          </button>
        </div>
      </div>
    </div>
  )
}

export default FreelancingLiveWorks