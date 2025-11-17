import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import PremiumLogin from './pages/auth/PremiumLogin'
import Home from './pages/Home'
import Profile from './pages/Profile'
import YearDetail from './pages/YearDetail'
import Syllabus from './pages/Syllabus'
import AdminDashboard from './pages/AdminDashboard'
import AdminAnalytics from './pages/AdminAnalytics'
import AdminGrades from './pages/AdminGrades'
import AdminAttendance from './pages/AdminAttendance'
import AdminUsers from './pages/AdminUsers'
import Timetable from './pages/Timetable'
import PythonCourses from './pages/PythonCourses'
import FullStackCourses from './pages/FullStackCourses'
import DSACourses from './pages/DSACourses'
import PremiumCourses from './pages/PremiumCourses'
import PremiumBenefits from './pages/PremiumBenefits'
import Payment from './pages/Payment'
import PaymentFlow from './pages/PaymentFlow'
import LMSPortal from './pages/LMSPortal'
import Chatbot from './components/Chatbot'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

function App(){
  const [user, setUser] = React.useState(null)
  React.useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (u)=> setUser(u))
    return ()=> unsub()
  },[])
  return (
    <div className="relative">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/premium-login" element={<PremiumLogin />} />
        <Route path="/profile" element={ user ? <Profile user={user} /> : <Navigate to='/login' />} />
        <Route path="/admin" element={ user ? <AdminDashboard user={user} /> : <Navigate to='/login' />} />
        <Route path="/admin/analytics" element={ user ? <AdminAnalytics user={user} /> : <Navigate to='/login' />} />
        <Route path="/admin/grades" element={ user ? <AdminGrades user={user} /> : <Navigate to='/login' />} />
        <Route path="/admin/attendance" element={ user ? <AdminAttendance user={user} /> : <Navigate to='/login' />} />
        <Route path="/admin/users" element={ user ? <AdminUsers user={user} /> : <Navigate to='/login' />} />
        <Route path="/year/:id" element={ user ? <YearDetail user={user} /> : <Navigate to='/login' />} />
        <Route path="/syllabus" element={ user ? <Syllabus user={user} /> : <Navigate to='/login' />} />
        <Route path="/timetable" element={ user ? <Timetable user={user} /> : <Navigate to='/login' />} />
        <Route path="/python-courses" element={ user ? <PythonCourses user={user} /> : <Navigate to='/login' />} />
        <Route path="/fullstack-courses" element={ user ? <FullStackCourses user={user} /> : <Navigate to='/login' />} />
        <Route path="/dsa-courses" element={ user ? <DSACourses user={user} /> : <Navigate to='/login' />} />
        <Route path="/premium-courses" element={ user ? <PremiumCourses user={user} /> : <Navigate to='/login' />} />
        <Route path="/premium-benefits" element={ user ? <PremiumBenefits user={user} /> : <Navigate to='/login' />} />
        <Route path="/payment" element={ user ? <Payment user={user} /> : <Navigate to='/login' />} />
        <Route path="/payment-flow" element={<PaymentFlow />} />
        <Route path="/lms-portal" element={ user ? <LMSPortal user={user} /> : <Navigate to='/login' />} />
        <Route path="/" element={ user ? <Home user={user} /> : <Navigate to='/login' />} />
      </Routes>
      {user && <Chatbot user={user} />}
    </div>
  )
}

export default App
