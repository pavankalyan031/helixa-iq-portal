import React, { useState, useRef, useEffect } from 'react'
import { collection, addDoc, getDocs, query, where, orderBy, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

// Professional LTSU Chatbot Logo Component
const ChatbotLogo = () => (
  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/20 backdrop-blur-sm">
    <img
      src="/assets/images/chatbot-logo.png"
      alt="Chatbot Logo"
      className="w-full h-full object-cover"
      onError={(e) => {
        // Fallback to text logo if image fails to load
        e.target.style.display = 'none'
        e.target.parentElement.innerHTML = '<div class="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-full flex items-center justify-center shadow-lg"><span class="text-white text-sm font-bold">LTSU</span></div>'
      }}
    />
  </div>
)

export default function Chatbot({ user }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "🎓 Welcome to LTSU Student Portal! I'm your AI Assistant, powered by advanced technology to help you excel in your academic journey. I can assist with:\n\n📊 Academic tracking (attendance, grades, timetable)\n📚 Course recommendations & learning resources\n👤 Profile management & account settings\n🎉 Events, hackathons & competitions\n🆘 Technical support & general guidance\n\nWhat would you like to explore today?", sender: 'bot' }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState(null)
  const messagesEndRef = useRef(null)

  // OpenAI API configuration
  const OPENAI_API_KEY = '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'
  const OPENAI_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load chat history on component mount
  useEffect(() => {
    if (user?.uid) {
      loadChatHistory()
    }
  }, [user])

  // Create new chat session
  const createNewSession = async () => {
    if (!user?.uid) return null
    try {
      const sessionRef = await addDoc(collection(db, 'chatSessions'), {
        userId: user.uid,
        createdAt: new Date(),
        title: `Chat ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
      })
      return sessionRef.id
    } catch (error) {
      console.error('Error creating chat session:', error)
      return null
    }
  }

  // Load chat history
  const loadChatHistory = async () => {
    if (!user?.uid) return
    try {
      const q = query(
        collection(db, 'chatSessions'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc'),
        limit(10)
      )
      const querySnapshot = await getDocs(q)
      const history = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setChatHistory(history)
    } catch (error) {
      console.error('Error loading chat history:', error)
    }
  }

  // Save message to current session
  const saveMessage = async (message, sender) => {
    if (!currentSessionId || !user?.uid) return
    try {
      await addDoc(collection(db, 'chatMessages'), {
        sessionId: currentSessionId,
        message: message,
        sender: sender,
        timestamp: new Date(),
        userId: user.uid
      })
    } catch (error) {
      console.error('Error saving message:', error)
    }
  }

  // Load messages from a specific session
  const loadSessionMessages = async (sessionId) => {
    try {
      const q = query(
        collection(db, 'chatMessages'),
        where('sessionId', '==', sessionId),
        where('userId', '==', user.uid),
        orderBy('timestamp', 'asc')
      )
      const querySnapshot = await getDocs(q)
      const sessionMessages = querySnapshot.docs.map(doc => ({
        text: doc.data().message,
        sender: doc.data().sender,
        timestamp: doc.data().timestamp
      }))
      if (sessionMessages.length > 0) {
        setMessages(sessionMessages)
        setCurrentSessionId(sessionId)
      } else {
        // If no messages found, create default welcome message
        setMessages([
          { text: "🎓 Welcome back to LTSU Student Portal! I'm your AI Assistant. What would you like to explore today?", sender: 'bot' }
        ])
        setCurrentSessionId(sessionId)
      }
      setShowHistory(false)
    } catch (error) {
      console.error('Error loading session messages:', error)
    }
  }

  // Clear current chat
  const clearChat = () => {
    // Only clear the UI messages, don't delete from database
    setMessages([
      { text: "🎓 Welcome to LTSU Student Portal! I'm your AI Assistant, powered by advanced technology to help you excel in your academic journey. I can assist with:\n\n📊 Academic tracking (attendance, grades, timetable)\n📚 Course recommendations & learning resources\n👤 Profile management & account settings\n🎉 Events, hackathons & competitions\n🆘 Technical support & general guidance\n\nWhat would you like to explore today?", sender: 'bot' }
    ])
    // Keep the session ID so new messages can still be saved to the same session
  }

  // Start new chat
  const startNewChat = async () => {
    const newSessionId = await createNewSession()
    if (newSessionId) {
      setCurrentSessionId(newSessionId)
      setMessages([
        { text: "🎓 Welcome to LTSU Student Portal! I'm your AI Assistant, powered by advanced technology to help you excel in your academic journey. I can assist with:\n\n📊 Academic tracking (attendance, grades, timetable)\n📚 Course recommendations & learning resources\n👤 Profile management & account settings\n🎉 Events, hackathons & competitions\n🆘 Technical support & general guidance\n\nWhat would you like to explore today?", sender: 'bot' }
      ])
      setShowHistory(false)
      loadChatHistory() // Refresh history
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    // Create new session if none exists
    let sessionId = currentSessionId
    if (!sessionId) {
      sessionId = await createNewSession()
      setCurrentSessionId(sessionId)
    }

    const userMessage = { text: inputMessage, sender: 'user' }
    setMessages(prev => [...prev, userMessage])
    await saveMessage(inputMessage, 'user')
    setInputMessage('')
    setIsTyping(true)

    try {
      // Call OpenAI API
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'LTSU Student Portal AI Assistant'
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are an advanced AI assistant for LTSU (Learn Teach Share Unite) Student Portal. You are helpful, professional, and knowledgeable about all aspects of the student portal.

Key information about LTSU:
- Created by students Vairagade Pavan Kalyan (AI & ML) and Satish (Data Science)
- Mission: "Learning is not just about acquiring knowledge, but about transforming lives"
- Comprehensive student portal with academic tracking, courses, events, and community features

Portal Features:
- Academic Services: Attendance (92%), Timetable, Grades (GPA: 8.5), Advisor contact
- Courses: Python Full Course, Full Stack Development, DSA Crash Course
- Events: Tech talks, hackathons (Devpost, Devnovate, SIH), cultural events
- Profile Management: Avatar upload, account settings
- Admin Dashboard: For admin users with analytics and user management
- Community: Forums, study groups, mentorship programs

Premium Features (Upgrade Available):
- Advanced AI Tutoring Sessions
- Premium Course Library (React, Node.js, Machine Learning, Cloud Computing)
- 1-on-1 Mentorship with Industry Experts
- Resume Review & Career Counseling
- Internship/Job Placement Assistance
- Advanced Analytics Dashboard
- Priority Support & Help
- Exclusive Webinars & Workshops
- Certification Programs
- Downloadable Resources & Templates

Current User Context:
- User is logged in as: ${user?.displayName || user?.email || 'Student'}
- Current date/time: ${new Date().toLocaleString()}

Guidelines:
- Be extremely helpful and provide detailed, accurate information
- Use emojis appropriately to make responses engaging
- If asked about specific data, provide realistic examples
- Always maintain a professional yet friendly tone
- If you don't know something specific, admit it and offer alternatives
- Encourage academic excellence and portal engagement

Respond naturally and comprehensively to user queries.`
            },
            {
              role: 'user',
              content: inputMessage
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      const botResponse = data.choices[0]?.message?.content || 'I apologize, but I encountered an error processing your request. Please try again.'

      const botMessage = { text: botResponse, sender: 'bot' }
      setMessages(prev => [...prev, botMessage])
      await saveMessage(botResponse, 'bot')

    } catch (error) {
      console.error('Error calling OpenAI API:', error)
      // Fallback to local responses if API fails
      const botResponse = getBotResponse(inputMessage.toLowerCase())
      const botMessage = { text: botResponse, sender: 'bot' }
      setMessages(prev => [...prev, botMessage])
      await saveMessage(botResponse, 'bot')
    }

    setIsTyping(false)
  }

  const getBotResponse = (message) => {
    // Enhanced keyword-based responses with more comprehensive coverage
    if (message.includes('attendance') || message.includes('attend')) {
      return "📊 You can check your attendance in the Student Services section. Your current attendance is 92%! Regular attendance is crucial for academic success. Need help with attendance tracking?"
    }
    if (message.includes('timetable') || message.includes('schedule') || message.includes('class')) {
      return "📅 View your timetable in the Student Services section. It includes all your class schedules, timings, and room numbers. Stay organized and never miss a class!"
    }
    if (message.includes('grades') || message.includes('marks') || message.includes('gpa') || message.includes('result')) {
      return "📈 Your current GPA is 8.5. Check the Student Services section for detailed grade reports, semester-wise breakdown, and performance analytics. Keep up the excellent work!"
    }
    if (message.includes('courses') || message.includes('python') || message.includes('dsa') || message.includes('fullstack') || message.includes('full stack')) {
      return "📚 Explore our comprehensive courses in the Courses section! We offer:\n• Python Full Course (beginner to advanced)\n• Full Stack Development (MERN stack)\n• DSA Crash Course (interview preparation)\nAll courses include hands-on projects and certification!"
    }
    if (message.includes('profile') || message.includes('account') || message.includes('avatar')) {
      return "👤 You can update your profile information in the Profile section. Upload your avatar, update personal details, and manage your account settings. A complete profile helps you get the most out of the portal!"
    }
    if (message.includes('events') || message.includes('hackathon') || message.includes('competition')) {
      return "🎉 Check out upcoming events and hackathons in the Events section! We have:\n• Tech Talks & Workshops\n• Coding Competitions\n• Cultural Events\n• Hackathons on Devpost, Devnovate, SIH\nGreat opportunities to learn, network, and showcase your skills!"
    }
    if (message.includes('help') || message.includes('support') || message.includes('assist')) {
      return "🆘 I'm your LTSU Assistant! I can help with:\n• Academic queries (attendance, grades, timetable)\n• Course information and recommendations\n• Profile and account management\n• Events and hackathons\n• Portal navigation\n• General student support\nWhat would you like to know?"
    }
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon')) {
      return "👋 Hello! Welcome to LTSU Student Portal - your gateway to academic excellence! I'm your AI assistant, ready to help you navigate through courses, track your progress, and make the most of your student journey. How can I assist you today?"
    }
    if (message.includes('bye') || message.includes('goodbye') || message.includes('see you') || message.includes('thank you')) {
      return "👋 You're welcome! Have a fantastic day at LTSU. Remember, I'm always here if you need help with anything - just click the chat button anytime. Keep learning and growing! 🚀"
    }
    if (message.includes('premium') || message.includes('upgrade') || message.includes('paid') || message.includes('pro') || message.includes('subscription')) {
      return "⭐ **Unlock Premium Features!**\n\nElevate your learning experience with LTSU Premium:\n\n🎓 **Advanced AI Tutoring**\n• Personalized 1-on-1 AI tutoring sessions\n• Code review and debugging assistance\n• Project guidance and mentorship\n\n📚 **Premium Course Library**\n• React & Advanced JavaScript\n• Node.js & Backend Development\n• Machine Learning & AI\n• Cloud Computing (AWS/Azure)\n• DevOps & CI/CD\n\n💼 **Career Services**\n• Resume review by industry experts\n• Mock interviews & preparation\n• Internship/job placement assistance\n• LinkedIn profile optimization\n\n📊 **Advanced Analytics**\n• Detailed performance insights\n• Learning progress tracking\n• Personalized study recommendations\n\n🎯 **Exclusive Benefits**\n• Priority customer support\n• Early access to new features\n• Exclusive webinars & workshops\n• Certification programs\n• Downloadable resources & templates\n\n💰 **Pricing:** ₹199/6 months or ₹299/1 year\n\nReady to upgrade? Visit your Profile → Premium Upgrade!\n\nTransform your academic journey today! 🚀"
    }
    if (message.includes('pricing') || message.includes('cost') || message.includes('price') || message.includes('fee') || message.includes('money')) {
      return "💰 **LTSU Premium Pricing Plans**\n\n📅 **Semester Plan:** ₹199/6 months\n• All premium features\n• Student-friendly pricing\n• Complete semester access\n\n📅 **Annual Plan:** ₹299/1 year\n• Best value for students\n• Complete year access\n• Save 25% compared to semester\n\n💳 **Payment Methods:**\n• UPI (Google Pay, PhonePe)\n• Credit/Debit Cards\n• Net Banking\n• Digital Wallets\n\nReady to upgrade? Visit Profile → Premium Upgrade! 🚀"
    }

    // Default responses for unrecognized queries
    const defaultResponses = [
      "🤔 I'm here to help! Try asking about attendance, grades, courses, events, or any other portal features. I'm constantly learning to better assist you!",
      "💡 I can help with academic queries, course information, profile management, events, and much more. What specific information are you looking for?",
      "🎯 Let me assist you better! Ask me about:\n• Your academic progress\n• Course recommendations\n• Portal features\n• Events and hackathons\n• Profile settings\nWhat interests you most?",
      "🚀 I'm your LTSU guide! Whether it's attendance tracking, course exploration, or staying updated with events, I'm here to help. What's on your mind?"
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group border-2 border-gray-700/30 backdrop-blur-sm"
        >
          <ChatbotLogo />
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse border border-white"></div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-gray-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-700/50 z-50 flex flex-col animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 rounded-t-2xl flex items-center gap-3 border-b border-gray-700/50">
            <ChatbotLogo />
            <div className="flex-1">
              <h3 className="font-bold text-sm">LTSU AI Assistant</h3>
              <p className="text-xs text-gray-300"></p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-gray-300 hover:text-white transition-colors p-1 rounded hover:bg-gray-600/50"
                title="Chat History"
              >
                📚
              </button>
              <button
                onClick={clearChat}
                className="text-gray-300 hover:text-white transition-colors p-1 rounded hover:bg-gray-600/50"
                title="Clear Chat"
              >
                🗑️
              </button>
              <button
                onClick={startNewChat}
                className="text-gray-300 hover:text-white transition-colors p-1 rounded hover:bg-gray-600/50"
                title="New Chat"
              >
                ➕
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white transition-colors p-1 rounded hover:bg-gray-600/50"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Chat History Sidebar */}
          {showHistory && (
            <div className="absolute top-full left-0 right-0 bg-gray-800/95 backdrop-blur-2xl border-t border-gray-600 max-h-48 overflow-y-auto z-10 rounded-b-2xl">
              <div className="p-3">
                <h4 className="font-semibold text-sm text-white mb-2">Chat History</h4>
                {chatHistory.length > 0 ? (
                  <div className="space-y-2">
                    {chatHistory.map((session) => (
                      <button
                        key={session.id}
                        onClick={() => loadSessionMessages(session.id)}
                        className="w-full text-left p-2 rounded-lg hover:bg-gray-600/50 transition-colors text-sm text-gray-300 hover:text-white"
                      >
                        <div className="font-medium text-white">{session.title}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(session.createdAt.seconds * 1000).toLocaleDateString()}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No chat history yet</p>
                )}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className={`flex-1 p-4 overflow-y-auto space-y-3 ${showHistory ? 'pb-52' : ''}`}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl text-sm whitespace-pre-line ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none shadow-lg'
                      : 'bg-gray-800 text-gray-100 rounded-bl-none border border-gray-700/50 shadow-sm'
                  }`}
                >
                  {message.text}
                  {message.timestamp && (
                    <div className={`text-xs mt-2 opacity-70 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                    }`}>
                      {new Date(message.timestamp.seconds * 1000).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-100 px-4 py-3 rounded-2xl rounded-bl-none text-sm border border-gray-700/50 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-400">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700/50 bg-gray-800/50 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about LTSU..."
                className="flex-1 px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-800/80 text-white placeholder-gray-400"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={isTyping || !inputMessage.trim()}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🚀
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-400 text-center">
              💡 Try asking about attendance, courses, events, or portal features
            </div>
          </form>
        </div>
      )}
    </>
  )
}