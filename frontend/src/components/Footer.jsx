import React from 'react'
import emailjs from '@emailjs/browser'

export default function Footer(){
  return (
    <footer className="mt-8 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white py-8 rounded-xl">
      <div className="container mx-auto px-6">
        {/* Logo and Contact in one row */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <img src="/assets/images/logo.png" alt="LTSU" className="w-10 h-10 rounded-full"/>
            <div>
              <h2 className="text-xl font-bold">LTSU Student Portal</h2>
              <p className="text-sm text-gray-400">Learn • Share • Grow</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-300">
            <div>
              <span className="font-semibold text-white">Email:</span> info.studentportalofficial@gmail.com
            </div>
            <div>
              <span className="font-semibold text-white">Phone:</span> +91 9391485316
            </div>
          </div>
        </div>

        {/* Social Links and Developers in one row */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span className="text-sm font-semibold text-white">Connect:</span>
            <div className="flex gap-3">
              <a href="mailto:info.studentportalofficial@gmail.com" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition transform hover:scale-110" aria-label="Email">
                <img src="/assets/images/gmail.png" alt="Gmail" className="w-5 h-5 rounded-full"/>
              </a>
              <a href="https://github.com/pavankalyan031" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition transform hover:scale-110" aria-label="GitHub">
                <img src="/assets/images/github.png" alt="GitHub" className="w-5 h-5 rounded-full"/>
              </a>
              <a href="https://www.linkedin.com/in/pavankalyan031" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition transform hover:scale-110" aria-label="LinkedIn">
                <img src="/assets/images/linkedin.png" alt="LinkedIn" className="w-5 h-5 rounded-full"/>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="font-semibold text-white">Developed by:</span>
            <span className="text-gray-300">Vairagade Pavan Kalyan (AI & ML) & Satish (Data Science)</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center">
          <p className="text-gray-400 text-xs">
            © 2025 LTSU Student Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
