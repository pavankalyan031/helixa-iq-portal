import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const years = [
  { id:1, name: 'First Year', semesters: ['1st Semester','2nd Semester'] },
  { id:2, name: 'Second Year', semesters: ['3rd Semester','4th Semester'] },
  { id:3, name: 'Third Year', semesters: ['5th Semester','6th Semester'] },
  { id:4, name: 'Fourth Year', semesters: ['7th Semester','8th Semester'] }
]

const specializations = ['AIML','DS','IOT','Cyber Security']

const subjects = ['Data Structures','Operating Systems','DBMS','Computer Networks','AI Basics']

const subjectsBySemester = {
  '1st Semester': subjects,
  '2nd Semester': subjects,
  '3rd Semester': ['PMSE', 'Operating System', 'ET1-Data Analytics(ALML, Cyber Security)', 'ET1-IT-Security (Data Science)', 'Relational Database Management System and NOSQL'],
  '4th Semester': subjects,
  '5th Semester': subjects,
  '6th Semester': subjects,
  '7th Semester': subjects,
  '8th Semester': subjects
}

const subjectColors = {
  'PMSE': {
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
    border: 'border-blue-300',
    badge: 'text-blue-700 bg-blue-200',
    text: 'text-blue-800'
  },
  'Operating System': {
    bg: 'bg-gradient-to-br from-green-50 to-green-100',
    border: 'border-green-300',
    badge: 'text-green-700 bg-green-200',
    text: 'text-green-800'
  },
  'ET1-Data Analytics(ALML, Cyber Security)': {
    bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
    border: 'border-purple-300',
    badge: 'text-purple-700 bg-purple-200',
    text: 'text-purple-800'
  },
  'ET1-IT-Security (Data Science)': {
    bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
    border: 'border-orange-300',
    badge: 'text-orange-700 bg-orange-200',
    text: 'text-orange-800'
  },
  'Relational Database Management System and NOSQL': {
    bg: 'bg-gradient-to-br from-teal-50 to-teal-100',
    border: 'border-teal-300',
    badge: 'text-teal-700 bg-teal-200',
    text: 'text-teal-800'
  }
}

const pdfsBySubjectAndExam = {
  'PMSE': {
    'MST-1': '/pdfs/3rd-sem-mst1/Principle_of_Modern_Software_Engineering_Question_Paper.pdf',
    'MST-2': '/pdfs/3rd-sem-mst2/MST-II_Principle_of_Modern_Software_Engineering_Nov2024 (2).pdf',
    'Final': '/pdfs/3rd-sem-final/Modern_Software_Engineering_End_Term_Jan_2025_Questions.pdf'
  },
  'Operating System': {
    'MST-1': '/pdfs/3rd-sem-mst1/System_Programming_and_OS_Question_Paper.pdf',
    'MST-2': '/pdfs/3rd-sem-mst2/System_Programming_Operating_System_MST_2.pdf',
    'Final': '/pdfs/3rd-sem-final/System_Programming_and_OS_End_Term_Jan_2025_Questions.pdf'
  },
  'ET1-Data Analytics(ALML, Cyber Security)': {
    'MST-1': '/pdfs/3rd-sem-mst1/Introduction_to_Data_Analytics_Question_Paper.pdf',
    'MST-2': '/pdfs/3rd-sem-mst2/Open_Standards_MST_2.pdf', // Assuming this is related
    'Final': '/pdfs/3rd-sem-final/FinalPage_EmergingTech1_DataAnalytics.pdf'
  },
  'ET1-IT-Security (Data Science)': {
    'MST-1': '/pdfs/3rd-sem-mst1/Open_Source_Question_Paper.pdf',
    'MST-2': '/pdfs/3rd-sem-mst2/Open_Standards_MST_2.pdf',
    'Final': '/pdfs/3rd-sem-final/Open_Source_Software_and_Open_Standards_Exam_Jan_2025.pdf'
  },
  'Relational Database Management System and NOSQL': {
    'MST-1': '/pdfs/3rd-sem-mst1/RDBMS_Question_Paper.pdf',
    'MST-2': '/pdfs/3rd-sem-mst2/MST 2 RDBMS_Nov2024_QuestionPaper.pdf',
    'Final': '/pdfs/3rd-sem-final/Relational_Database_Management_System_NoSQL_Exam_Jan_2025.pdf'
  }
}

export default function YearDetail({user}){
  const { id } = useParams()
  const navigate = useNavigate()
  const year = years.find(y => y.id === parseInt(id))
  const [openSemester, setOpenSemester] = React.useState(null)
  const [openSpec, setOpenSpec] = React.useState(null)
  const [selectedExam, setSelectedExam] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSemesterToggle = (idx) => {
    setIsLoading(true)
    setTimeout(() => {
      setOpenSemester(openSemester === idx ? null : idx)
      setIsLoading(false)
    }, 300)
  }

  if (!year) return <div>Year not found</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-x-hidden">
      <Header user={user}/>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-8 p-8 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg shadow-lg animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">{year.name}</h1>
          <p className="text-xl">Explore your academic journey and track your progress</p>
        </div>

        <div className="space-y-8">
          {year.semesters.map((semester, idx) => (
            <div key={semester} className="p-6 bg-gray-800 rounded-xl shadow-xl animate-slide-up hover:shadow-2xl transition border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                 <h2 className="text-2xl font-bold text-gray-100">{semester}</h2>
                 <div className="flex space-x-3">
                   <button
                     onClick={() => handleSemesterToggle(idx)}
                     className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-800 transition transform hover:scale-105 shadow-lg"
                     disabled={isLoading}
                   >
                     {isLoading ? 'Loading...' : (openSemester === idx ? 'Close' : 'View Specialization')}
                   </button>
                 </div>
               </div>
               {openSemester === idx && (
                 <div className="mt-6 animate-fade-in">
                   {isLoading && (
                     <div className="flex justify-center items-center py-8">
                       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                       <span className="ml-3 text-lg text-gray-300">Loading specializations...</span>
                     </div>
                   )}
                   {!isLoading && (
                     <>
                       {/* Specializations for ALL semesters */}
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                         {specializations.map(sp => (
                           <div key={sp} className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-2xl shadow-xl border border-gray-600 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:border-indigo-500 group w-full max-w-sm">
                             <div className="p-8">
                               <div className="text-center mb-6">
                                 <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                   <span className="text-4xl">
                                     {sp === 'AIML' ? '🤖' : sp === 'DS' ? '📊' : sp === 'IOT' ? '📡' : '🔒'}
                                   </span>
                                 </div>
                                 <h3 className="text-2xl font-bold text-gray-100 mb-2 group-hover:text-indigo-300 transition-colors">{sp}</h3>
                                 <p className="text-gray-300 text-sm leading-relaxed">Advanced specialization program with industry-relevant curriculum and cutting-edge technologies</p>
                               </div>
                               <button
                                 onClick={() => navigate(`/syllabus?spec=${sp}&semester=${semester}&year=${year.id}`)}
                                 className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-700 text-white font-bold rounded-xl hover:from-indigo-700 hover:via-purple-800 hover:to-pink-800 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg animate-pulse"
                               >
                                 📚 Syllabus View
                               </button>
                             </div>
                           </div>
                         ))}
                       </div>
                     </>
                   )}
                 </div>
               )}

             </div>
           ))}
         </div>
      </div>
      <Footer />
    </div>
  )
}