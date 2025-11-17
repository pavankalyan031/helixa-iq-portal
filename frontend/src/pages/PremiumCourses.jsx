import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

export default function PremiumCourses({ user }) {
  const navigate = useNavigate()

  const premiumCourses = [
    {
      id: 'react-advanced',
      title: 'React & Advanced JavaScript',
      description: 'Master modern React development with hooks, context, and advanced JavaScript concepts',
      duration: '8 weeks',
      level: 'Advanced',
      price: '₹2,999',
      features: [
        'Modern React with Hooks & Context API',
        'Advanced JavaScript (ES6+, Async/Await)',
        'Redux & State Management',
        'React Native for Mobile Apps',
        'Real-world Projects',
        'Industry Expert Mentorship'
      ],
      icon: '⚛️',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'nodejs-backend',
      title: 'Node.js & Backend Development',
      description: 'Build scalable backend applications with Node.js, databases, and modern APIs',
      duration: '10 weeks',
      level: 'Intermediate',
      price: '₹3,499',
      features: [
        'RESTful APIs & GraphQL',
        'MongoDB & PostgreSQL Integration',
        'Authentication & Security',
        'Microservices Architecture',
        'Docker & Deployment',
        'API Testing & Documentation'
      ],
      icon: '🟢',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning & AI',
      description: 'Dive into the world of AI with Python, TensorFlow, and real-world ML applications',
      duration: '12 weeks',
      level: 'Advanced',
      price: '₹4,999',
      features: [
        'Python for Data Science',
        'TensorFlow & PyTorch',
        'Computer Vision & NLP',
        'Deep Learning Fundamentals',
        'Real-world ML Projects',
        'AI Ethics & Deployment'
      ],
      icon: '🤖',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'cloud-computing',
      title: 'Cloud Computing & DevOps',
      description: 'Master cloud platforms, DevOps practices, and scalable infrastructure',
      duration: '14 weeks',
      level: 'Advanced',
      price: '₹5,499',
      features: [
        'AWS, Azure & GCP Fundamentals',
        'Serverless Architecture',
        'Docker & Kubernetes',
        'CI/CD Pipelines',
        'Infrastructure as Code',
        'Cloud Security & Monitoring'
      ],
      icon: '☁️',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'data-science',
      title: 'Advanced Data Science',
      description: 'Master data analysis, visualization, and predictive modeling techniques',
      duration: '10 weeks',
      level: 'Intermediate',
      price: '₹3,999',
      features: [
        'Advanced Statistical Analysis',
        'Data Visualization with Python',
        'Predictive Modeling',
        'Big Data Processing',
        'Time Series Analysis',
        'Business Intelligence'
      ],
      icon: '📊',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'cyber-security',
      title: 'Cyber Security Fundamentals',
      description: 'Learn ethical hacking, network security, and cybersecurity best practices',
      duration: '12 weeks',
      level: 'Intermediate',
      price: '₹4,499',
      features: [
        'Ethical Hacking Techniques',
        'Network Security',
        'Web Application Security',
        'Cryptography & Encryption',
        'Security Auditing',
        'Incident Response'
      ],
      icon: '🔒',
      color: 'from-gray-600 to-gray-800'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Header user={user} />

      <div className="container mx-auto p-6 relative z-10">
        <main>
          {/* Hero Section */}
          <section className="mb-12">
            <div className="text-center mb-8 p-8 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20">
              <div className="text-6xl mb-4">⭐</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Premium Course Library
              </h1>
              <p className="text-xl text-white/90 font-medium">
                Unlock advanced courses designed by industry experts
              </p>
              <div className="mt-6 p-4 bg-yellow-500/20 rounded-lg border border-yellow-400/30">
                <p className="text-yellow-200 font-semibold">
                  🎓 Exclusive Access for Premium Members Only
                </p>
              </div>
            </div>
          </section>

          {/* Courses Grid */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {premiumCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                >
                  {/* Course Header */}
                  <div className={`bg-gradient-to-r ${course.color} p-6 text-white`}>
                    <div className="text-4xl mb-3">{course.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <div className="flex items-center gap-4 text-sm opacity-90">
                      <span>⏱️ {course.duration}</span>
                      <span>📚 {course.level}</span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <p className="text-white/80 text-sm mb-4 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3">What you'll learn:</h4>
                      <ul className="space-y-2">
                        {course.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-white/70 text-sm">
                            <span className="text-green-400">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-white">{course.price}</div>
                        <div className="text-white/60 text-sm">One-time payment</div>
                      </div>
                      <button
                        onClick={() => alert(`🎉 Course "${course.title}" enrolled successfully! Access materials in your dashboard.`)}
                        className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        Enroll Now 🚀
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-2xl rounded-3xl p-8 border border-yellow-400/30 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-white/90 text-lg mb-6">
                Join thousands of successful students who have transformed their careers with our premium courses
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/profile')}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  🎓 Access My Courses
                </button>
                <button
                  onClick={() => alert('📞 Contact support for course recommendations: info.studentportalofficial@gmail.com')}
                  className="px-8 py-4 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-all duration-200 border border-white/30"
                >
                  💬 Get Help
                </button>
              </div>
            </div>
          </section>

          {/* Success Stories */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Success Stories</h2>
              <p className="text-white/70">See how our premium courses have transformed careers</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/20">
                <div className="text-4xl mb-4">👨‍💻</div>
                <h3 className="text-white font-bold mb-2">From Student to SDE</h3>
                <p className="text-white/70 text-sm mb-4">
                  "The Full Stack course helped me land a job at a top tech company with a 40% salary increase!"
                </p>
                <div className="text-yellow-400 text-sm font-semibold">- Rahul M., Software Engineer</div>
              </div>

              <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/20">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-white font-bold mb-2">AI Career Breakthrough</h3>
                <p className="text-white/70 text-sm mb-4">
                  "The ML course gave me the skills to work on cutting-edge AI projects. Now I'm leading AI initiatives!"
                </p>
                <div className="text-yellow-400 text-sm font-semibold">- Priya S., AI Engineer</div>
              </div>

              <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/20">
                <div className="text-4xl mb-4">☁️</div>
                <h3 className="text-white font-bold mb-2">Cloud Architecture Expert</h3>
                <p className="text-white/70 text-sm mb-4">
                  "Cloud Computing course prepared me perfectly for AWS certifications and cloud architect roles."
                </p>
                <div className="text-yellow-400 text-sm font-semibold">- Amit K., Cloud Architect</div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}