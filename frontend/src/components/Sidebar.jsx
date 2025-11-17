import React from 'react'

export default function Sidebar(){
  return (
    <aside className="w-64 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <img src="/assets/images/logo.png" className="w-12 h-12" alt="logo" />
        <div>
          <div className="font-bold">LTSU</div>
          <div className="text-xs text-gray-500">Student Portal</div>
        </div>
      </div>
      <nav className="space-y-2 text-sm">
        <a className="block p-2 rounded hover:bg-slate-50">Dashboard</a>
        <a className="block p-2 rounded hover:bg-slate-50">Resources</a>
        <a className="block p-2 rounded hover:bg-slate-50">Courses</a>
        <a className="block p-2 rounded hover:bg-slate-50">Announcements</a>
        <a className="block p-2 rounded hover:bg-slate-50">Help & Support</a>
      </nav>
    </aside>
  )
}
