import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PremiumUpgrade from '../components/PremiumUpgrade'

export default function PremiumBenefits({ user }) {
  const navigate = useNavigate()
  const [showUpgradeModal, setShowUpgradeModal] = React.useState(false)

  const premiumFeatures = [
    {
      id: 1,
      title: "Placement Preparation Kit",
      description: "Complete interview preparation with company-specific questions, coding challenges, and mock tests",
      icon: "🎯",
      color: "from-blue-500 to-cyan-500",
      benefits: [
        "500+ Company-specific interview questions",
        "Live coding challenges with solutions",
        "Mock technical interviews",
        "Resume optimization templates",
        "Behavioral interview guides"
      ]
    },
    {
      id: 2,
      title: "Internships and Job Openings",
      description: "Exclusive access to verified internships and job opportunities from top companies",
      icon: "💼",
      color: "from-green-500 to-emerald-500",
      benefits: [
        "200+ Active internships monthly",
        "Direct applications to top companies",
        "Salary insights and negotiation tips",
        "Internship completion certificates",
        "Referral network access"
      ]
    },
    {
      id: 3,
      title: "ATS Resume Building",
      description: "AI-powered resume builder that beats Applicant Tracking Systems with 95% success rate",
      icon: "📄",
      color: "from-purple-500 to-pink-500",
      benefits: [
        "ATS-optimized resume templates",
        "AI content suggestions",
        "Keyword optimization for your field",
        "Multiple export formats (PDF, Word)",
        "Resume scoring and improvement tips"
      ]
    },
    {
      id: 4,
      title: "Project Ideas (Industry Level)",
      description: "Real-world project ideas with complete implementation guides and mentorship support",
      icon: "🚀",
      color: "from-orange-500 to-red-500",
      benefits: [
        "50+ Industry-relevant project ideas",
        "Complete implementation roadmaps",
        "Technology stack recommendations",
        "GitHub repository templates",
        "Project presentation guides"
      ]
    },
    {
      id: 5,
      title: "Alumni Support",
      description: "Connect with successful alumni for guidance, mentorship, and career advice",
      icon: "🤝",
      color: "from-indigo-500 to-blue-500",
      benefits: [
        "1-on-1 mentorship sessions",
        "Alumni networking events",
        "Career transition guidance",
        "Industry insights and trends",
        "Success story sessions"
      ]
    },
    {
      id: 6,
      title: "Mock Interviews",
      description: "Professional mock interviews with detailed feedback and improvement strategies",
      icon: "🎤",
      color: "from-teal-500 to-cyan-500",
      benefits: [
        "Technical interview simulations",
        "HR round practice sessions",
        "Detailed feedback reports",
        "Improvement action plans",
        "Confidence building exercises"
      ]
    },
    {
      id: 7,
      title: "Certification Courses",
      description: "Industry-recognized certifications to boost your resume and career prospects",
      icon: "🎓",
      color: "from-yellow-500 to-orange-500",
      benefits: [
        "AWS, Azure, GCP certifications",
        "Programming language certifications",
        "Data Science & AI certifications",
        "Project Management certifications",
        "Blockchain & Web3 certifications"
      ]
    },
    {
      id: 8,
      title: "Freelancing Work",
      description: "Earn while learning with real freelancing projects and skill-building opportunities",
      icon: "💰",
      color: "from-pink-500 to-rose-500",
      benefits: [
        "Curated freelancing projects",
        "Skill-based earning opportunities",
        "Project management training",
        "Client communication skills",
        "Portfolio building through work"
      ]
    },
    {
      id: 9,
      title: "Emerging Tech Trends",
      description: "Stay ahead with insights on AI, Blockchain, Web3, Metaverse, and future technologies",
      icon: "🔮",
      color: "from-violet-500 to-purple-500",
      benefits: [
        "Weekly tech trend reports",
        "Emerging technology workshops",
        "Future career path guidance",
        "Investment and startup insights",
        "Global tech conference access"
      ]
    },
    {
      id: 10,
      title: "Basic Courses for Students",
      description: "Essential skills every student needs: Git, GitHub, English Communication, and more",
      icon: "📚",
      color: "from-emerald-500 to-teal-500",
      benefits: [
        "Complete Git & GitHub mastery",
        "Professional English communication",
        "Time management & productivity",
        "Basic design principles",
        "Presentation skills training"
      ]
    },
    {
      id: 11,
      title: "Top Performers Winner",
      description: "Exclusive rewards and recognition for outstanding academic and extracurricular achievements",
      icon: "🏆",
      color: "from-amber-500 to-yellow-500",
      benefits: [
        "Monthly top performer awards",
        "Exclusive scholarship opportunities",
        "Leadership development programs",
        "International conference invitations",
        "Industry networking events"
      ]
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
                Helixa IQ Portal Premium Benefits
              </h1>
              <p className="text-xl text-white/90 font-medium">
                Unlock your full potential with exclusive premium features
              </p>
              <div className="mt-6 p-4 bg-yellow-500/20 rounded-lg border border-yellow-400/30">
                <p className="text-yellow-200 font-semibold">
                  🚀 Transform your academic journey into a successful career
                </p>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {premiumFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                >
                  {/* Feature Header */}
                  <div className={`bg-gradient-to-r ${feature.color} p-6 text-white`}>
                    <div className="text-4xl mb-3">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Feature Benefits */}
                  <div className="p-6">
                    <h4 className="text-white font-semibold mb-4">What you'll get:</h4>
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3 text-white/80 text-sm">
                          <span className="text-green-400 mt-1">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-2xl rounded-3xl p-8 border border-yellow-400/30 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Choose Your Plan
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Start your premium journey today and unlock unlimited potential
              </p>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Semester Plan */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-2">Semester Plan</h3>
                  <div className="text-4xl font-bold text-yellow-400 mb-4">₹199<span className="text-lg text-white/70">/6 months</span></div>
                  <ul className="text-left space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-white/80">
                      <span className="text-green-400">✓</span>
                      All premium features
                    </li>
                    <li className="flex items-center gap-2 text-white/80">
                      <span className="text-green-400">✓</span>
                      6 months access
                    </li>
                    <li className="flex items-center gap-2 text-white/80">
                      <span className="text-green-400">✓</span>
                      Student-friendly pricing
                    </li>
                  </ul>
                  <button
                    onClick={() => navigate('/payment-flow?plan=semester')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                  >
                    Choose Semester
                  </button>
                </div>

                {/* Annual Plan */}
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                      SAVE 25%
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Annual Plan</h3>
                  <div className="text-4xl font-bold text-yellow-400 mb-4">₹299<span className="text-lg text-white/70">/year</span></div>
                  <ul className="text-left space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-white/80">
                      <span className="text-green-400">✓</span>
                      All Semester features
                    </li>
                    <li className="flex items-center gap-2 text-white/80">
                      <span className="text-green-400">✓</span>
                      Best value for students
                    </li>
                    <li className="flex items-center gap-2 text-white/80">
                      <span className="text-green-400">✓</span>
                      Complete year access
                    </li>
                  </ul>
                  <button
                    onClick={() => navigate('/payment-flow?plan=annual')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200"
                  >
                    Choose Annual ⭐
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Success Stories */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Success Stories</h2>
              <p className="text-white/70">See how Premium members transformed their careers</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Success stories will be added here */}
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-2xl rounded-3xl p-8 border border-blue-400/30 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Future?
              </h2>
              <p className="text-white/90 text-lg mb-6">
                Join thousands of successful students who chose Helixa IQ Portal Premium
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => navigate('/payment-flow?plan=semester')}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  🚀 Upgrade to Premium Now
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />

      {/* Premium Upgrade Modal */}
      {showUpgradeModal && (
        <PremiumUpgrade user={user} onClose={() => setShowUpgradeModal(false)} />
      )}
    </div>
  )
}