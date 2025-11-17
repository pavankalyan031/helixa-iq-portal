import React from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

// WhatsApp contact component
const WhatsAppContact = ({ phoneNumber = '+919391485316', message = "Hi, I am looking for academic guidance and would like to connect with an advisor.", className = "" }) => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`px-8 py-4 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 text-white font-bold rounded-2xl hover:from-green-700 hover:via-green-800 hover:to-emerald-800 transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl text-lg ${className}`}
    >
      💬 Contact via WhatsApp
    </button>
  )
}

const academicYears = ['2023-24', '2024-25', '2025-26']

const subjectsByYearAndSemester = {
  '2023-24': {
    '1st Semester': ['Mathematics-I', 'Physics/Chemistry', 'Basic Electrical Engineering', 'Engineering Graphics', 'Communication Skills', 'Environmental Science'],
    '2nd Semester': ['Mathematics-II', 'Data Structures & Algorithms', 'Digital Electronics', 'Object Oriented Programming', 'Discrete Mathematics', 'Economics'],
    '3rd Semester': ['PMSE', 'Operating System', 'ET1-Data Analytics(ALML, Cyber Security)', 'ET1-IT-Security (Data Science)', 'Relational Database Management System and NOSQL']
  },
  '2024-25': {
    '1st Semester': ['Advanced Mathematics', 'Computer Organization', 'Database Management Systems', 'Software Engineering', 'Web Technologies', 'Professional Ethics'],
    '2nd Semester': ['Operating Systems', 'Computer Networks', 'Design & Analysis of Algorithms', 'Machine Learning Basics', 'Cloud Computing', 'Project Management'],
    '3rd Semester': ['PMSE', 'Operating System', 'ET1-Data Analytics(ALML, Cyber Security)', 'ET1-IT-Security (Data Science)', 'Relational Database Management System and NOSQL']
  },
  '2025-26': {
    '1st Semester': ['Advanced Data Structures', 'Artificial Intelligence', 'Cyber Security Fundamentals', 'Big Data Analytics', 'Mobile Application Development', 'Research Methodology'],
    '2nd Semester': ['Deep Learning', 'Blockchain Technology', 'Internet of Things', 'DevOps & CI/CD', 'Advanced Web Development', 'Capstone Project'],
    '3rd Semester': ['PMSE', 'Operating System', 'ET1-Data Analytics(ALML, Cyber Security)', 'ET1-IT-Security (Data Science)', 'Relational Database Management System and NOSQL']
  }
}

const specializations = ['AIML', 'DS', 'IOT', 'Cyber Security']

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
    'MST-2': '/pdfs/3rd-sem-mst2/Open_Standards_MST_2.pdf',
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

export default function Syllabus({ user }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const selectedSpecialization = searchParams.get('spec') || 'AIML'
  const semester = searchParams.get('semester') || '1st Semester'
  const yearId = searchParams.get('year') || '1'
  const [selectedAcademicYear, setSelectedAcademicYear] = React.useState('2024-25')
  const [selectedExam, setSelectedExam] = React.useState(null)

  const currentSubjects = subjectsByYearAndSemester[selectedAcademicYear][semester] || subjectsByYearAndSemester[selectedAcademicYear]['1st Semester']

  const yearNames = {
    '1': 'First Year',
    '2': 'Second Year',
    '3': 'Third Year',
    '4': 'Fourth Year'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header user={user} />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-purple-800 to-indigo-900 opacity-95"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        <div className="relative container mx-auto px-6 py-24">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-lg rounded-full mb-8 shadow-2xl border border-white/30">
              <span className="text-5xl animate-pulse">
                {selectedSpecialization === 'AIML' ? '🤖' :
                 selectedSpecialization === 'DS' ? '📊' :
                 selectedSpecialization === 'IOT' ? '📡' : '🔒'}
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg">
              {selectedSpecialization} Syllabus
            </h1>
            <div className="flex items-center justify-center space-x-6 mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                <span className="text-lg font-semibold text-white">{yearNames[yearId]}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                <span className="text-lg font-semibold text-white">{semester}</span>
              </div>
            </div>
            <p className="text-xl md:text-2xl text-blue-100 font-medium max-w-4xl mx-auto leading-relaxed">
              🚀 Comprehensive curriculum and course structure for academic excellence in {selectedSpecialization}
            </p>
            <div className="mt-8 flex items-center justify-center space-x-4">
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"></div>
              <div className="w-4 h-4 bg-white/60 rounded-full animate-pulse"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Specialization Selector */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-100 mb-8">Select Specialization</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {specializations.map((spec) => (
              <button
                key={spec}
                onClick={() => navigate(`/syllabus?spec=${spec}&semester=${semester}&year=${yearId}`)}
                className={`p-6 rounded-2xl shadow-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl ${
                  selectedSpecialization === spec
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 text-white shadow-2xl ring-4 ring-blue-400'
                    : 'bg-gray-800 text-gray-200 hover:bg-gradient-to-br hover:from-gray-700 hover:via-gray-600 hover:to-gray-700 border-2 border-gray-600 hover:border-blue-400'
                }`}
              >
                <div className="text-center">
                  <div className={`text-4xl mb-3 ${selectedSpecialization === spec ? 'animate-bounce' : ''}`}>
                    {spec === 'AIML' ? '🤖' : spec === 'DS' ? '📊' : spec === 'IOT' ? '📡' : '🔒'}
                  </div>
                  <div className="font-bold text-lg">{spec}</div>
                  <div className="text-sm opacity-80 mt-1">
                    {spec === 'AIML' ? 'AI & Machine Learning' :
                     spec === 'DS' ? 'Data Science' :
                     spec === 'IOT' ? 'Internet of Things' : 'Cyber Security'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Academic Year Selection */}
        <div className="mb-12">
          <h2 className="text-4xl font-black text-center text-gray-100 mb-12 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Select Academic Year</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {academicYears.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedAcademicYear(year)}
                className={`relative p-10 rounded-3xl shadow-2xl transition-all duration-500 transform hover:scale-110 hover:shadow-3xl border-4 ${
                  selectedAcademicYear === year
                    ? 'bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 text-white shadow-2xl border-blue-400 ring-4 ring-blue-300'
                    : 'bg-gray-800 text-gray-200 hover:bg-gradient-to-br hover:from-gray-700 hover:via-gray-600 hover:to-gray-700 border-gray-600 hover:border-blue-400'
                }`}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-xl ${
                    selectedAcademicYear === year
                      ? 'bg-white/25 backdrop-blur-sm'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
                  }`}>
                    <span className="text-4xl font-bold animate-pulse">
                      {year === '2023-24' ? '🎓' : year === '2024-25' ? '📖' : '🚀'}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black mb-3">{year}</h3>
                  <p className="text-lg font-medium opacity-90 mb-4">
                    {year === '2023-24' ? 'Foundation Year' :
                     year === '2024-25' ? 'Current Year' : 'Upcoming Year'}
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    <span className={`inline-block w-3 h-3 rounded-full ${
                      selectedAcademicYear === year ? 'bg-white animate-ping' : 'bg-blue-500'
                    }`}></span>
                    <span className="text-sm font-semibold">
                      {selectedAcademicYear === year ? 'Selected' : 'Click to Select'}
                    </span>
                  </div>
                </div>
                {selectedAcademicYear === year && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-800 drop-shadow-lg"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Course Structure */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-3xl shadow-2xl p-10 border border-gray-600 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-4xl font-black text-gray-100 mb-3 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    {selectedSpecialization} - {selectedAcademicYear}
                  </h3>
                  <p className="text-gray-300 text-lg font-medium">{yearNames[yearId]} • {semester} • Advanced Curriculum</p>
                  <div className="flex items-center mt-3 space-x-3">
                    <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-sm font-bold rounded-full shadow-lg">
                      🎯 Industry Ready
                    </span>
                    <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-bold rounded-full shadow-lg">
                      🚀 Cutting Edge
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Downloading full syllabus for ${selectedSpecialization} - ${selectedAcademicYear} - ${semester}`)}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 via-emerald-700 to-teal-700 text-white font-bold rounded-2xl hover:from-green-700 hover:via-emerald-800 hover:to-teal-800 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-3xl text-lg"
                >
                  📄 Full Syllabus
                </button>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentSubjects.map((subject, idx) => (
                <div
                  key={subject}
                  className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-3xl shadow-2xl border-2 border-gray-600 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:border-indigo-500 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="relative z-10 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 text-white rounded-full flex items-center justify-center text-xl font-black mr-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-black text-gray-100 text-xl mb-2 group-hover:text-indigo-300 transition-colors">{subject}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-xs rounded-full font-bold shadow-lg">
                              🎯 Active Subject
                            </span>
                            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs rounded-full font-bold shadow-lg">
                              🚀 Industry Ready
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 text-base mb-8 leading-relaxed font-medium">
                      Comprehensive curriculum covering fundamental concepts, practical applications, and industry-relevant skills for {subject.toLowerCase()}. Designed to build expertise and prepare students for real-world challenges.
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() => setSelectedExam(selectedExam === `${subject}-MST1` ? null : `${subject}-MST1`)}
                        className="px-6 py-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl text-sm"
                      >
                        📝 MST-1
                      </button>
                      <button
                        onClick={() => setSelectedExam(selectedExam === `${subject}-MST2` ? null : `${subject}-MST2`)}
                        className="px-6 py-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl text-sm"
                      >
                        📝 MST-2
                      </button>
                      <button
                        onClick={() => setSelectedExam(selectedExam === `${subject}-Final` ? null : `${subject}-Final`)}
                        className="px-6 py-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl text-sm"
                      >
                        🎓 Final
                      </button>
                    </div>

                    {selectedExam === `${subject}-MST1` && (
                      <div className="flex space-x-3 mt-4 animate-fade-in">
                        {semester === '3rd Semester' && pdfsBySubjectAndExam[subject] ? (
                          <>
                            <button onClick={() => window.open(pdfsBySubjectAndExam[subject]['MST-1'], '_blank')} className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">View</button>
                            <a href={pdfsBySubjectAndExam[subject]['MST-1']} download className="text-sm bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition inline-block">Download</a>
                          </>
                        ) : (
                          <>
                            <button onClick={() => alert(`Viewing ${subject} MST-1 paper for ${selectedAcademicYear}`)} className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">View</button>
                            <button onClick={() => alert(`Downloading ${subject} MST-1 paper for ${selectedAcademicYear}`)} className="text-sm bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">Download</button>
                          </>
                        )}
                      </div>
                    )}
                    {selectedExam === `${subject}-MST2` && (
                      <div className="flex space-x-3 mt-4 animate-fade-in">
                        {semester === '3rd Semester' && pdfsBySubjectAndExam[subject] ? (
                          <>
                            <button onClick={() => window.open(pdfsBySubjectAndExam[subject]['MST-2'], '_blank')} className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">View</button>
                            <a href={pdfsBySubjectAndExam[subject]['MST-2']} download className="text-sm bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition inline-block">Download</a>
                          </>
                        ) : (
                          <>
                            <button onClick={() => alert(`Viewing ${subject} MST-2 paper for ${selectedAcademicYear}`)} className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">View</button>
                            <button onClick={() => alert(`Downloading ${subject} MST-2 paper for ${selectedAcademicYear}`)} className="text-sm bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">Download</button>
                          </>
                        )}
                      </div>
                    )}
                    {selectedExam === `${subject}-Final` && (
                      <div className="flex space-x-3 mt-4 animate-fade-in">
                        {semester === '3rd Semester' && pdfsBySubjectAndExam[subject] ? (
                          <>
                            <button onClick={() => window.open(pdfsBySubjectAndExam[subject]['Final'], '_blank')} className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">View</button>
                            <a href={pdfsBySubjectAndExam[subject]['Final']} download className="text-sm bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition inline-block">Download</a>
                          </>
                        ) : (
                          <>
                            <button onClick={() => alert(`Viewing ${subject} Final paper for ${selectedAcademicYear}`)} className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">View</button>
                            <button onClick={() => alert(`Downloading ${subject} Final paper for ${selectedAcademicYear}`)} className="text-sm bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">Download</button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-8 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-600">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-gradient-to-r from-gray-600 via-slate-700 to-gray-800 text-white font-bold rounded-2xl hover:from-gray-700 hover:via-slate-800 hover:to-gray-900 transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl text-lg"
            >
              🏠 Back to Home
            </button>
            <button
              onClick={() => navigate(`/year/${yearId}`)}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-700 text-white font-bold rounded-2xl hover:from-indigo-700 hover:via-purple-800 hover:to-pink-800 transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl text-lg"
            >
              📊 Back to {yearNames[yearId]}
            </button>
            <WhatsAppContact />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}