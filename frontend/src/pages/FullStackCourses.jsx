import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const fullStackCourses = [
  {
    id: 1,
    title: 'IBM Full Stack Cloud Developer Professional Certificate (Coursera)',
    description: 'Covers front end, back end, cloud, DevOps',
    provider: 'Coursera',
    link: 'https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer'
  },
  {
    id: 2,
    title: 'Full Stack Open (University of Helsinki / open course)',
    description: 'Modern JavaScript stack (React, Node.js, GraphQL, TypeScript)',
    provider: 'fullstackopen.com',
    link: 'https://fullstackopen.com/en/'
  },
  {
    id: 3,
    title: 'Scaler Academy – Full Stack Developer Course',
    description: 'Bootcamp style, in-depth curriculum, placement help (India)',
    provider: 'InterviewBit',
    link: '#'
  },
  {
    id: 4,
    title: 'Codecademy – Full-Stack Engineer Career Path',
    description: 'Structured path covering front end, back end, databases',
    provider: 'Codecademy',
    link: 'https://www.codecademy.com/learn/paths/full-stack-engineer-career-path'
  },
  {
    id: 5,
    title: 'UT Austin – Full Stack Software Development Certificate (online)',
    description: 'University certificate course, live + project work',
    provider: 'McCombs Great Learning',
    link: 'https://onlineexeced.mccombs.utexas.edu/online-full-stack-software-development-course'
  }
]

export default function FullStackCourses({user}){
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header user={user}/>
      <div className="container mx-auto p-6">
        <div className="mb-8 p-8 bg-gradient-to-r from-purple-600 to-pink-700 text-white rounded-xl shadow-2xl">
          <h1 className="text-4xl font-bold mb-2">💻 Full Stack Development</h1>
          <p className="text-purple-100 text-lg">Build complete web applications with modern technologies</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {fullStackCourses.map((course, index) => (
            <div key={course.id} className="bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-600">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3 text-gray-300">#{course.id}</span>
                    <h3 className="text-xl font-bold text-gray-100">{course.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-purple-800 text-purple-200 rounded-full text-sm font-medium">
                      {course.provider}
                    </span>
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105 shadow-lg"
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