 import React, { useState, useEffect } from 'react'
 import { useNavigate } from 'react-router-dom'
 import { grindgramProblems } from '../data/problems/index.js'

const ProblemCard = ({ problem, onSkip }) => (
  <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 mb-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4 flex-1">
        <h4 className="text-white font-medium min-w-0 flex-1">{problem.title}</h4>
        <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
          problem.difficulty === 'easy' ? 'bg-green-600 text-white' :
          problem.difficulty === 'medium' ? 'bg-yellow-600 text-white' :
          'bg-red-600 text-white'
        }`}>
          {problem.difficulty}
        </span>
      </div>

      <div className="flex items-center space-x-2 ml-4">
        <a
          href={problem.videoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors whitespace-nowrap"
        >
          📹 Video
        </a>
        <a
          href={problem.solutionLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors whitespace-nowrap"
        >
          💡 Solution
        </a>
        <a
          href={problem.practiceLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          🏃 Practice
        </a>
        <button
          onClick={() => onSkip(problem.id)}
          className="flex items-center justify-center px-3 py-2 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors whitespace-nowrap"
        >
          ⏭️ Skip
        </button>
      </div>
    </div>
  </div>
)

const MasterCodingSheet = () => {
  const navigate = useNavigate()
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [selectedSection, setSelectedSection] = useState(null)

  // Check for URL parameters to auto-select topic
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const topicParam = urlParams.get('topic')
    if (topicParam === 'aptitude') {
      setSelectedTopic('aptitude')
      setSelectedSection(null)
      // Clean up URL
      navigate('/master-coding-sheet', { replace: true })
    }
  }, [navigate])

  // Generate coding topics from grindgramProblems
  const codingTopics = Object.entries(grindgramProblems).map(([topicId, topicData], index) => {
    let totalProblems = 0;

    // Handle aptitude section differently as it has nested topics
    if (topicId === 'aptitude') {
      totalProblems = Object.values(topicData).reduce((sum, subTopic) => {
        return sum + Object.values(subTopic.sections || {}).reduce((sectionSum, section) => {
          return sectionSum + (section.problems ? section.problems.length : 0)
        }, 0)
      }, 0)
    } else {
      totalProblems = Object.values(topicData.sections || {}).reduce((sum, section) => {
        return sum + (section.problems ? section.problems.length : 0)
      }, 0)
    }

    const colors = [
      'from-green-500 to-green-600',
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-indigo-500 to-indigo-600',
      'from-cyan-500 to-cyan-600',
      'from-teal-500 to-teal-600',
      'from-emerald-500 to-emerald-600',
      'from-lime-500 to-lime-600',
      'from-yellow-500 to-yellow-600',
      'from-orange-500 to-orange-600',
      'from-red-500 to-red-600',
      'from-pink-500 to-pink-600',
      'from-rose-500 to-rose-600',
      'from-fuchsia-500 to-fuchsia-600',
      'from-violet-500 to-violet-600',
      'from-sky-500 to-sky-600',
      'from-amber-500 to-amber-600',
      'from-stone-500 to-stone-600'
    ]

    return {
      id: topicId,
      title: topicId === 'aptitude' ? 'Aptitude Round Cheat Sheet' : topicData.title,
      solved: 0,
      total: totalProblems,
      description: topicId === 'aptitude' ? 'Complete aptitude practice problems organized by topic' : topicData.subtitle,
      color: colors[index % colors.length]
    }
  })

  const totalSolved = codingTopics.reduce((sum, topic) => sum + topic.solved, 0)
  const totalProblems = codingTopics.reduce((sum, topic) => sum + topic.total, 0)


  const getTopicTitle = (topicId) => {
    const topic = codingTopics.find(t => t.id === topicId)
    return topic ? topic.title : topicId
  }

  const getTopicSubtitle = (topicId) => {
    return grindgramProblems[topicId]?.subtitle || 'Coding problems and practice questions.'
  }

  const handlePracticeClick = (topicId) => {
    setSelectedTopic(topicId)
    setSelectedSection(null) // Reset section when selecting topic
  }

  const handleSectionClick = (sectionId) => {
    setSelectedSection(sectionId)
  }

  const handleSkipProblem = (problemId) => {
    // Handle skip logic here
    console.log('Skipped problem:', problemId)
  }

  const handleBackToTopics = () => {
    if (selectedTopic === 'aptitude' && selectedSection) {
      // Special handling for aptitude navigation
      const sectionParts = selectedSection.split('-');
      if (sectionParts.length > 1) {
        // We're in a subsection, go back to subtopic
        setSelectedSection(sectionParts[0]);
      } else {
        // We're at subtopic level, go back to sections
        setSelectedSection(null);
      }
    } else if (selectedSection) {
      setSelectedSection(null);
    } else {
      setSelectedTopic(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-30">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand - Left Side */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/lms-portal')}
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
                <h1 className="text-lg font-bold text-white">Master Coding Sheet</h1>
                <p className="text-gray-400 text-xs">Helixa IQ Portal</p>
              </div>
            </div>

            {/* Progress - Right Side */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <p className="text-white font-medium">{totalSolved}/{totalProblems} Problems solved</p>
                <p className="text-gray-400 text-xs">Overall Progress</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🎯 Master Coding Sheet — 665+ problems, exact patterns to ace your interviews</h1>
          <p className="text-gray-400 text-lg">Your complete roadmap to become a coding expert</p>
        </div>


        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Problems</p>
                <p className="text-2xl font-bold text-white">{totalProblems + 252}</p>
              </div>
              <div className="text-3xl">📚</div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Solved</p>
                <p className="text-2xl font-bold text-green-400">{totalSolved}</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Remaining</p>
                <p className="text-2xl font-bold text-yellow-400">{totalProblems - totalSolved}</p>
              </div>
              <div className="text-3xl">🎯</div>
            </div>
          </div>
        </div>

        {/* Conditional Content: Topics Grid or Problems View */}
        {!selectedTopic ? (
          /* Topics Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {codingTopics.map((topic, index) => (
              <div key={topic.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${topic.color} flex items-center justify-center text-white font-bold text-sm`}>
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-white">{topic.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{topic.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-400">
                      {topic.solved}/{topic.total} Problems solved
                    </div>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${topic.color}`}
                        style={{ width: topic.total > 0 ? `${(topic.solved / topic.total) * 100}%` : '0%' }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePracticeClick(topic.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    {topic.solved === topic.total ? 'Review' : 'Practice'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Problems View */
          <div>
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handleBackToTopics}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>
                  {selectedTopic === 'aptitude' && selectedSection ?
                    (selectedSection.includes('-') ? 'Back to Sections' : 'Back to Aptitude Topics') :
                    (selectedSection ? 'Back to Sections' : 'Back to Topics')
                  }
                </span>
              </button>
            </div>

            <div>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">{grindgramProblems[selectedTopic]?.title || getTopicTitle(selectedTopic)}</h2>
                <p className="text-gray-400 mb-4">{grindgramProblems[selectedTopic]?.subtitle || getTopicSubtitle(selectedTopic)}</p>
              </div>

              {!selectedSection ? (
                /* Sections View */
                <div className="grid grid-cols-1 gap-4">
                  {selectedTopic === 'aptitude' ? (
                    // Special handling for aptitude section
                    Object.entries(grindgramProblems[selectedTopic]).map(([subTopicId, subTopicData], index) => (
                      <div key={subTopicId} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                                {index + 1}
                              </div>
                              <h3 className="text-lg font-semibold text-white">{subTopicData.title}</h3>
                            </div>
                            <p className="text-gray-400 text-sm mb-3">{subTopicData.subtitle}</p>
                            <p className="text-yellow-400 font-medium">{subTopicData.totalProblems} problems</p>
                          </div>
                          <button
                            onClick={() => handleSectionClick(subTopicId)}
                            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                          >
                            Practice
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Normal sections for other topics
                    Object.entries(grindgramProblems[selectedTopic]?.sections || {}).map(([sectionId, section], index) => (
                      <div key={sectionId} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                                {index + 1}
                              </div>
                              <h3 className="text-lg font-semibold text-white">{section.sectionTitle}</h3>
                            </div>
                            <p className="text-gray-400 text-sm mb-3">{section.sectionSubtitle}</p>
                            <p className="text-yellow-400 font-medium">{section.xp}</p>
                          </div>
                          <button
                            onClick={() => handleSectionClick(sectionId)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            Practice
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                /* Problems View */
                <div>
                  {selectedTopic === 'aptitude' ? (
                    // Special handling for aptitude subtopics
                    (() => {
                      const sectionParts = selectedSection.split('-');
                      const subTopicId = sectionParts[0];
                      const actualSectionId = sectionParts.slice(1).join('-');

                      if (actualSectionId && grindgramProblems[selectedTopic][subTopicId]?.sections[actualSectionId]) {
                        // Show actual problems for the selected section
                        const section = grindgramProblems[selectedTopic][subTopicId].sections[actualSectionId];
                        return (
                          <div>
                            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 mb-4">
                              <h3 className="text-lg font-semibold text-white mb-1">{section.sectionTitle}</h3>
                              <p className="text-orange-100 text-sm mb-2">{section.sectionSubtitle}</p>
                              <p className="text-yellow-400 font-medium">{section.xp}</p>
                            </div>

                            <div className="space-y-3">
                              {section.problems?.map((problem, index) => (
                                <ProblemCard
                                  key={index}
                                  problem={{
                                    id: `${selectedTopic}-${selectedSection}-${index}`,
                                    title: problem.title,
                                    difficulty: problem.difficulty,
                                    videoLink: problem.videoLink,
                                    solutionLink: problem.solutionLink,
                                    practiceLink: problem.practiceLink
                                  }}
                                  onSkip={handleSkipProblem}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      } else if (Object.keys(grindgramProblems[selectedTopic][selectedSection]?.sections || {}).length > 0) {
                        // Show aptitude subtopic sections
                        return (
                          <div className="grid grid-cols-1 gap-4">
                            {Object.entries(grindgramProblems[selectedTopic][selectedSection]?.sections || {}).map(([sectionId, section], index) => (
                              <div key={sectionId} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                                        {index + 1}
                                      </div>
                                      <h3 className="text-lg font-semibold text-white">{section.sectionTitle}</h3>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-3">{section.sectionSubtitle}</p>
                                    <p className="text-yellow-400 font-medium">{section.xp}</p>
                                  </div>
                                  <button
                                    onClick={() => handleSectionClick(`${selectedSection}-${sectionId}`)}
                                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                                  >
                                    View Problems
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      } else {
                        // Show aptitude subtopic info
                        return (
                          <div>
                            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 mb-4">
                              <h3 className="text-lg font-semibold text-white mb-1">{grindgramProblems[selectedTopic][selectedSection]?.title}</h3>
                              <p className="text-orange-100 text-sm mb-2">{grindgramProblems[selectedTopic][selectedSection]?.subtitle}</p>
                              <p className="text-yellow-400 font-medium">{grindgramProblems[selectedTopic][selectedSection]?.totalProblems} problems</p>
                            </div>
                            <div className="text-center text-gray-400 py-8">
                              <p>Select a section to view problems</p>
                            </div>
                          </div>
                        );
                      }
                    })()
                  ) : (
                    // Normal problems view for other topics
                    <div>
                      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold text-white mb-1">{grindgramProblems[selectedTopic]?.sections[selectedSection]?.sectionTitle}</h3>
                        <p className="text-blue-100 text-sm mb-2">{grindgramProblems[selectedTopic]?.sections[selectedSection]?.sectionSubtitle}</p>
                        <p className="text-yellow-400 font-medium">{grindgramProblems[selectedTopic]?.sections[selectedSection]?.xp}</p>
                      </div>

                      <div className="space-y-3">
                        {grindgramProblems[selectedTopic]?.sections[selectedSection]?.problems?.map((problem, index) => (
                          <ProblemCard
                            key={index}
                            problem={{
                              id: `${selectedTopic}-${selectedSection}-${index}`,
                              title: problem.title,
                              difficulty: problem.difficulty,
                              videoLink: problem.videoLink,
                              solutionLink: problem.solutionLink,
                              practiceLink: problem.practiceLink
                            }}
                            onSkip={handleSkipProblem}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default MasterCodingSheet