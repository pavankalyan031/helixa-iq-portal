import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import PremiumUpgrade from './PremiumUpgrade'

export default function Header({user}){
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [helpModal, setHelpModal] = React.useState(false)
  const [settingsModal, setSettingsModal] = React.useState(false)
  const [premiumModal, setPremiumModal] = React.useState(false)
  const [theme, setTheme] = React.useState('light')
  const [notifications, setNotifications] = React.useState(false)
  const [language, setLanguage] = React.useState('English')

  // Refs for dropdowns
  const dropdownRef = React.useRef(null)
  const mobileMenuRef = React.useRef(null)

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  React.useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [theme])

  return (
    <header className="bg-white/10 backdrop-blur-2xl shadow-2xl p-4 flex items-center border-b border-white/20 relative z-20">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
        <img src="/assets/images/logo.png" alt="LTSU" className="w-12 h-12 rounded-full hover:scale-110 transition-transform duration-200"/>
        <div>
          <div className="font-bold text-white hover:text-blue-400 transition-colors duration-200">LTSU Student Portal</div>
          <div className="text-xs text-white/70">Learn • Share • Grow</div>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-6">
        <nav className="hidden md:flex space-x-6 text-sm">
          <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-white hover:text-blue-400 transition-colors duration-200">Dashboard</button>
          <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-white hover:text-blue-400 transition-colors duration-200">Student Services</button>
          <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-white hover:text-blue-400 transition-colors duration-200">Courses</button>
          <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-white hover:text-blue-400 transition-colors duration-200">About</button>
          <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-white hover:text-blue-400 transition-colors duration-200">Events</button>
          <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('hackathons')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-white hover:text-blue-400 transition-colors duration-200">Hackathons</button>
        </nav>

        {/* Mobile Menu Button */}
        <div ref={mobileMenuRef} className="relative z-30">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-white hover:text-blue-400 transition-colors duration-200 p-2 rounded-md hover:bg-white/10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div ref={dropdownRef} className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-md border border-white/30 hover:bg-white/30 transition-all duration-200">
            Profile
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-2xl border border-white/30 rounded-xl shadow-2xl z-50 animate-fade-in">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user?.displayName?.charAt(0) || user?.email?.charAt(0) || '👤'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{user?.displayName || 'User'}</div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <Link to="/profile" className="block px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors duration-200" onClick={() => setDropdownOpen(false)}>
                    👤 View Profile
                  </Link>
                  {user?.email?.includes('admin') && (
                    <Link to="/admin" className="block px-4 py-3 hover:bg-blue-50 text-blue-600 font-semibold transition-colors duration-200" onClick={() => setDropdownOpen(false)}>
                      🎛️ Admin Dashboard
                    </Link>
                  )}
                  <button onClick={() => { setHelpModal(true); setDropdownOpen(false); }} className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors duration-200">
                    ❓ Help
                  </button>
                  <button onClick={() => { setSettingsModal(true); setDropdownOpen(false); }} className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors duration-200">
                    ⚙️ Settings
                  </button>
                  <div className="border-t border-gray-200 mt-2">
                    <button onClick={()=>{ signOut(auth); navigate('/login'); setDropdownOpen(false) }} className="block w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 transition-colors duration-200">
                      🚪 Logout
                    </button>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="absolute top-full left-0 right-0 bg-gradient-to-b from-gray-900/95 via-gray-800/95 to-black/95 backdrop-blur-2xl border-t border-white/20 shadow-2xl z-50 md:hidden animate-fade-in" style={{ animation: 'none' }}>
            <div className="py-2">
              <button
                onClick={() => {
                  navigate('/');
                  setTimeout(() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-white/10 text-white hover:text-blue-400 transition-all duration-200 border-b border-white/10 last:border-b-0"
              >
                <span className="text-lg">🏠</span>
                <span className="font-medium">Dashboard</span>
              </button>
              <button
                onClick={() => {
                  navigate('/');
                  setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-white/10 text-white hover:text-blue-400 transition-all duration-200 border-b border-white/10 last:border-b-0"
              >
                <span className="text-lg">🎓</span>
                <span className="font-medium">Student Services</span>
              </button>
              <button
                onClick={() => {
                  navigate('/');
                  setTimeout(() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-white/10 text-white hover:text-blue-400 transition-all duration-200 border-b border-white/10 last:border-b-0"
              >
                <span className="text-lg">📚</span>
                <span className="font-medium">Courses</span>
              </button>
              <button
                onClick={() => {
                  navigate('/');
                  setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-white/10 text-white hover:text-blue-400 transition-all duration-200 border-b border-white/10 last:border-b-0"
              >
                <span className="text-lg">ℹ️</span>
                <span className="font-medium">About</span>
              </button>
              <button
                onClick={() => {
                  navigate('/');
                  setTimeout(() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-white/10 text-white hover:text-blue-400 transition-all duration-200 border-b border-white/10 last:border-b-0"
              >
                <span className="text-lg">🎉</span>
                <span className="font-medium">Events</span>
              </button>
              <button
                onClick={() => {
                  navigate('/');
                  setTimeout(() => document.getElementById('hackathons')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-white/10 text-white hover:text-blue-400 transition-all duration-200"
              >
                <span className="text-lg">🚀</span>
                <span className="font-medium">Hackathons</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Help Modal */}
      {helpModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-white/30">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Help & Support</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p><strong>Dashboard:</strong> View your academic progress and quick actions.</p>
              <p><strong>Student Services:</strong> Access attendance, timetable, grades, and advisor contact.</p>
              <p><strong>Courses:</strong> External learning resources and tutorials.</p>
              <p><strong>Profile:</strong> Update your information and avatar.</p>
              <p><strong>Contact:</strong> Send queries to the portal administrators.</p>
            </div>
            <button onClick={() => setHelpModal(false)} className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">Close</button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {settingsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-white/30">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Theme</label>
                <select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Notifications</label>
                <div className="flex items-center">
                  <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
                  <span className="text-gray-700">Email notifications</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
            </div>
            <button onClick={() => { setSettingsModal(false); alert('Settings saved!'); }} className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 w-full">Save & Close</button>
          </div>
        </div>
      )}

      {/* Premium Upgrade Modal */}
      {premiumModal && (
        <PremiumUpgrade user={user} onClose={() => setPremiumModal(false)} />
      )}
    </header>
  )
}
