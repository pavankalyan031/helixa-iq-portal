import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const javaDSAVideos = [
  { id: 1, title: "Best Data Structures & Algorithms (DSA) Course - Clear Any FAANG Interview!", duration: "16:20", link: "https://youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyqJ&si=1Mj-FW-j3KyI8VHG" },
  { id: 2, title: "Java vs C++ for Data Structures & Algorithms", duration: "11:15", link: "https://youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyqJ&si=1Mj-FW-j3KyI8VHG" },
  { id: 3, title: "How I Cleared My Google Interviews - Use LeetCode Effectively!", duration: "15:44", link: "https://youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyqJ&si=1Mj-FW-j3KyI8VHG" },
  { id: 4, title: "Complete Git and GitHub Tutorial", duration: "1:12:40", link: "https://youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyqJ&si=1Mj-FW-j3KyI8VHG" },
  { id: 5, title: "Introduction to Programming - Types of Languages, Memory Management", duration: "39:02", link: "https://youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyqJ&si=1Mj-FW-j3KyI8VHG" }
]

export default function JavaDSAVideos({user}){
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header user={user}/>
      <div className="container mx-auto p-6">
        <div className="mb-8 p-8 bg-gradient-to-r from-orange-600 to-red-700 text-white rounded-xl shadow-2xl">
          <h1 className="text-4xl font-bold mb-2">☕ Java + DSA + Interview Preparation Course</h1>
          <p className="text-orange-100 text-lg">69 comprehensive videos covering Data Structures and Algorithms in Java</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {javaDSAVideos.map((video) => (
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