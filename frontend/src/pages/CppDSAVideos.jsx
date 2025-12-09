import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const cppDSAVideos = [
  { id: 1, title: "Lecture 1: Intro to Programming & Flowcharts", duration: "57:54", link: "https://youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&si=OQW7nUXRepOKqfoL" },
  { id: 2, title: "Lecture 2: Write Your First Program in C++", duration: "56:00", link: "https://youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&si=OQW7nUXRepOKqfoL" },
  { id: 3, title: "Lecture 3: If-Else, While loop & Lots of Patterns (Part-1)", duration: "55:52", link: "https://youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&si=OQW7nUXRepOKqfoL" },
  { id: 4, title: "Lecture 4: Solving Pattern Questions (Part-2)", duration: "1:03:58", link: "https://youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&si=OQW7nUXRepOKqfoL" },
  { id: 5, title: "Lecture 5: Bitwise Operators, For Loops, Operator Precedence & Variable Scoping", duration: "1:15:44", link: "https://youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA&si=OQW7nUXRepOKqfoL" }
]

export default function CppDSAVideos({user}){
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header user={user}/>
      <div className="container mx-auto p-6">
        <div className="mb-8 p-8 bg-gradient-to-r from-green-600 to-blue-700 text-white rounded-xl shadow-2xl">
          <h1 className="text-4xl font-bold mb-2">⚡ Complete C++ Placement DSA Course</h1>
          <p className="text-blue-100 text-lg">149 comprehensive videos covering Data Structures and Algorithms in C++</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {cppDSAVideos.map((video) => (
            <div key={video.id} className="bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <span className="text-lg mr-2 text-gray-300">#{video.id}</span>
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-sm leading-tight">{video.title}</h3>
                    <span className="inline-block mt-2 px-2 py-1 bg-gray-600 text-gray-300 rounded text-xs">
                      {video.duration}
                    </span>
                  </div>
                </div>
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  ▶️ Watch
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}