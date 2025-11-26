import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ResetPassword from './pages/auth/ResetPassword'
import VerifyEmail from './pages/auth/VerifyEmail'
import PremiumLogin from './pages/auth/PremiumLogin'
import PremiumUserRegister from './pages/auth/PremiumUserRegister'
import PremiumUserLogin from './pages/auth/PremiumUserLogin'
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
import FullStackPractice from './pages/FullStackPractice'
import FullStackVideoPlayer from './pages/FullStackVideoPlayer'
import AIPractice from './pages/AIPractice'
import AIVideoPlayer from './pages/AIVideoPlayer'
import MLPractice from './pages/MLPractice'
import MLVideoPlayer from './pages/MLVideoPlayer'
import DSPractice from './pages/DSPractice'
import DSVideoPlayer from './pages/DSVideoPlayer'
import DSVideoPlayerSingle from './pages/DSVideoPlayerSingle'
import ProgrammingVideoPlayerSingle from './pages/ProgrammingVideoPlayerSingle'
import ProgrammingLanguageSelection from './pages/ProgrammingLanguageSelection'
import PythonProgramming from './pages/PythonProgramming'
import CppProgramming from './pages/CppProgramming'
import JavaProgramming from './pages/JavaProgramming'
import ProgrammingVideoPlayerPython from './pages/ProgrammingVideoPlayerPython'
import ProgrammingVideoPlayerCpp from './pages/ProgrammingVideoPlayerCpp'
import ProgrammingVideoPlayerJava from './pages/ProgrammingVideoPlayerJava'
import PythonPractice from './pages/PythonPractice'
import CppPractice from './pages/CppPractice'
import JavaPractice from './pages/JavaPractice'
import PythonVideoPlayer from './pages/PythonVideoPlayer'
import CppVideoPlayer from './pages/CppVideoPlayer'
import JavaVideoPlayer from './pages/JavaVideoPlayer'
import CppVideoPlayerSingle from './pages/CppVideoPlayerSingle'
import MasterCodingSheet from './pages/MasterCodingSheet'
import GenAIVideoPlayer from './pages/GenAIVideoPlayer'
import AgenticAIVideoPlayer from './pages/AgenticAIVideoPlayer'
import DevOpsVideoPlayer from './pages/DevOpsVideoPlayer'
import N8NVideoPlayer from './pages/N8NVideoPlayer'
import LangchainVideoPlayer from './pages/LangchainVideoPlayer'
import GitGitHubVideoPlayer from './pages/GitGitHubVideoPlayer'
import SQLVideoPlayer from './pages/SQLVideoPlayer'
import LinuxVideoPlayer from './pages/LinuxVideoPlayer'
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
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/premium-login" element={<PremiumLogin />} />
        <Route path="/premium-register" element={<PremiumUserRegister />} />
        <Route path="/premium-user-login" element={<PremiumUserLogin />} />
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
        <Route path="/lms-portal" element={<LMSPortal />} />
        <Route path="/fullstack-practice" element={<FullStackPractice />} />
        <Route path="/fullstack-video-player" element={<FullStackVideoPlayer />} />
        <Route path="/ai-practice" element={<AIPractice />} />
        <Route path="/ai-video-player" element={<AIVideoPlayer />} />
        <Route path="/ml-practice" element={<MLPractice />} />
        <Route path="/ml-video-player" element={<MLVideoPlayer />} />
        <Route path="/ds-practice" element={<DSPractice />} />
        <Route path="/ds-video-player" element={<DSVideoPlayer />} />
        <Route path="/ds-video/:videoId" element={<DSVideoPlayerSingle />} />
        <Route path="/programming-video/:videoId" element={<ProgrammingVideoPlayerSingle />} />
        <Route path="/programming-language-selection" element={<ProgrammingLanguageSelection />} />
        <Route path="/python-programming" element={<PythonProgramming />} />
        <Route path="/cpp-programming" element={<CppProgramming />} />
        <Route path="/java-programming" element={<JavaProgramming />} />
        <Route path="/programming-video-python" element={<ProgrammingVideoPlayerPython />} />
        <Route path="/programming-video-cpp" element={<ProgrammingVideoPlayerCpp />} />
        <Route path="/cpp-video/:videoId" element={<CppVideoPlayerSingle />} />
        <Route path="/programming-video-java" element={<ProgrammingVideoPlayerJava />} />
        <Route path="/cpp-courses" element={<CppPractice />} />
        <Route path="/java-courses" element={<JavaPractice />} />
        <Route path="/python-practice" element={<PythonPractice />} />
        <Route path="/cpp-practice" element={<CppPractice />} />
        <Route path="/java-practice" element={<JavaPractice />} />
        <Route path="/python-video-player" element={<PythonVideoPlayer />} />
        <Route path="/cpp-video-player" element={<CppVideoPlayer />} />
        <Route path="/java-video-player" element={<JavaVideoPlayer />} />
        <Route path="/master-coding-sheet" element={<MasterCodingSheet />} />
        <Route path="/gen-ai-video-player" element={<GenAIVideoPlayer />} />
        <Route path="/agentic-ai-video-player" element={<AgenticAIVideoPlayer />} />
        <Route path="/devops-video-player" element={<DevOpsVideoPlayer />} />
        <Route path="/n8n-video-player" element={<N8NVideoPlayer />} />
        <Route path="/langchain-video-player" element={<LangchainVideoPlayer />} />
        <Route path="/git-github-video-player" element={<GitGitHubVideoPlayer />} />
        <Route path="/sql-video-player" element={<SQLVideoPlayer />} />
        <Route path="/linux-video-player" element={<LinuxVideoPlayer />} />
        <Route path="/" element={ user ? <Home user={user} /> : <Navigate to='/login' />} />
      </Routes>
      {user && <Chatbot user={user} />}
    </div>
  )
}

export default App
