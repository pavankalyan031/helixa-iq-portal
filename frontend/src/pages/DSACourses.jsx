import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const dsaCourses = [
  {
    id: 1,
    title: "LeetCode's Interview Crash Course – DSA",
    description: 'Focused on interview-relevant DSA',
    provider: 'LeetCode',
    link: 'https://leetcode.com/explore/featured/card/leetcodes-interview-crash-course-data-structures-and-algorithms/'
  },
  {
    id: 2,
    title: '"Master the Coding Interview: Data Structures + Algorithms" (Zero to Mastery)',
    description: 'Comprehensive bootcamp style',
    provider: 'Zero To Mastery',
    link: 'https://zerotomastery.io/courses/learn-data-structures-and-algorithms/'
  },
  {
    id: 3,
    title: 'GeeksforGeeks – Data Structures & Algorithms Self-Paced Course',
    description: 'Covers from basics to advanced, good for exam & interview prep',
    provider: 'GeeksforGeeks',
    link: 'https://www.geeksforgeeks.org/courses/dsa-self-paced/'
  },
  {
    id: 4,
    title: '"Algorithms, Part I & II" – Princeton on Coursera',
    description: 'University level algorithms course (often used as crash refresher)',
    provider: 'Coursera',
    link: '#'
  },
  {
    id: 5,
    title: '"Algorithms & Data Structures Full Crash Course" – YouTube (NeuralNine)',
    description: 'Video crash course covering major DSA topics',
    provider: 'YouTube',
    link: 'https://www.youtube.com/watch?v=jQqQpPMYPXs'
  }
]

export default function DSACourses({user}){
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header user={user}/>
      <div className="container mx-auto p-6">
        <div className="mb-8 p-8 bg-gradient-to-r from-green-600 to-blue-700 text-white rounded-xl shadow-2xl">
          <h1 className="text-4xl font-bold mb-2">📊 DSA Crash Course</h1>
          <p className="text-green-100 text-lg">Master Data Structures and Algorithms for technical interviews</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {dsaCourses.map((course, index) => (
            <div key={course.id} className="bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-600">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3 text-gray-300">#{course.id}</span>
                    <h3 className="text-xl font-bold text-gray-100">{course.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-green-800 text-green-200 rounded-full text-sm font-medium">
                      {course.provider}
                    </span>
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition transform hover:scale-105 shadow-lg"
                    >
                      Start Learning 🚀
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}