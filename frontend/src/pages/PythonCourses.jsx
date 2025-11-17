import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const pythonCourses = [
  {
    id: 1,
    title: '"Python for Everybody" – University of Michigan (Coursera)',
    description: 'Very popular, from basics to more advanced topics, free auditing option',
    provider: 'Coursera',
    link: 'https://www.coursera.org/specializations/python'
  },
  {
    id: 2,
    title: "Google's Python Class",
    description: 'Free class by Google with lecture videos, exercises',
    provider: 'Google for Developers',
    link: 'https://developers.google.com/edu/python'
  },
  {
    id: 3,
    title: 'Codecademy – Python Courses & Tutorials',
    description: 'Interactive learning, starts from basics, step by step',
    provider: 'Codecademy',
    link: 'https://www.codecademy.com/catalog/language/python'
  },
  {
    id: 4,
    title: 'MyGreatLearning – Python Fundamentals for Beginners (free)',
    description: 'Beginner course, includes fundamentals, quizzes',
    provider: 'My Great Learning',
    link: 'https://www.mygreatlearning.com/academy/learn-for-free/courses/python-fundamentals-for-beginners'
  },
  {
    id: 5,
    title: 'FreeCodeCamp / YouTube "Python Full Course for Beginners"',
    description: 'Video-based full course, good for visual learners',
    provider: 'YouTube',
    link: 'https://www.youtube.com/watch?v=K5KVEU3aaeQ'
  }
]

export default function PythonCourses({user}){
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header user={user}/>
      <div className="container mx-auto p-6">
        <div className="mb-8 p-8 bg-gradient-to-r from-blue-600 to-green-700 text-white rounded-xl shadow-2xl">
          <h1 className="text-4xl font-bold mb-2">🐍 Python Full Course</h1>
          <p className="text-blue-100 text-lg">Master Python programming from basics to advanced concepts</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {pythonCourses.map((course, index) => (
            <div key={course.id} className="bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-600">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3 text-gray-300">#{course.id}</span>
                    <h3 className="text-xl font-bold text-gray-100">{course.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-blue-800 text-blue-200 rounded-full text-sm font-medium">
                      {course.provider}
                    </span>
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition transform hover:scale-105 shadow-lg"
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