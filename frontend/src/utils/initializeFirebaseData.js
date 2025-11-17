// Script to initialize Firebase with existing hardcoded data
import { collection, addDoc, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const initializeFirebaseData = async () => {
  try {
    console.log('🚀 Initializing Firebase collections...')

    // Initialize Events Collection
    const eventsData = [
      {
        title: 'Tech Talk: AI in Education',
        description: 'Explore how artificial intelligence is transforming educational methodologies',
        date: '2024-03-15',
        type: 'academic',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Career Fair',
        description: 'Connect with top companies and discover exciting career opportunities',
        date: '2024-04-05',
        type: 'academic',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cultural Fest',
        description: 'Celebrate diversity through music, dance, and cultural performances',
        date: '2024-04-20',
        type: 'cultural',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    for (const event of eventsData) {
      await addDoc(collection(db, 'events'), event)
    }
    console.log('✅ Events collection initialized')

    // Initialize Announcements Collection
    const announcementsData = [
      {
        title: 'Mid-term Exam Schedule',
        content: 'Available now - Check your email',
        type: 'academic',
        priority: 'high',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'New Course Registration',
        content: 'Opens next week',
        type: 'academic',
        priority: 'medium',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Scholarship Applications',
        content: 'Deadline: March 30',
        type: 'general',
        priority: 'high',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    for (const announcement of announcementsData) {
      await addDoc(collection(db, 'announcements'), announcement)
    }
    console.log('✅ Announcements collection initialized')

    // Initialize Deadlines Collection
    const deadlinesData = [
      {
        title: 'Data Structures Assignment',
        description: 'Submit your data structures assignment',
        dueDate: '2024-03-20',
        priority: 'high',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'AI Project Proposal',
        description: 'Submit your AI project proposal',
        dueDate: '2024-03-25',
        priority: 'medium',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    for (const deadline of deadlinesData) {
      await addDoc(collection(db, 'deadlines'), deadline)
    }
    console.log('✅ Deadlines collection initialized')

    // Initialize Subjects Collection
    const subjectsData = [
      // 3rd Semester subjects with PDFs
      {
        name: 'PMSE',
        semester: '3rd Semester',
        year: '2',
        specialization: 'AIML',
        academicYear: '2024-25',
        description: 'Principles of Modern Software Engineering - Learn modern software development practices',
        pdfs: {
          'MST-1': '/pdfs/3rd-sem-mst1/Principle_of_Modern_Software_Engineering_Question_Paper.pdf',
          'MST-2': '/pdfs/3rd-sem-mst2/MST-II_Principle_of_Modern_Software_Engineering_Nov2024 (2).pdf',
          'Final': '/pdfs/3rd-sem-final/Modern_Software_Engineering_End_Term_Jan_2025_Questions.pdf'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Operating System',
        semester: '3rd Semester',
        year: '2',
        specialization: 'AIML',
        academicYear: '2024-25',
        description: 'Operating Systems - Comprehensive study of OS concepts and implementations',
        pdfs: {
          'MST-1': '/pdfs/3rd-sem-mst1/System_Programming_and_OS_Question_Paper.pdf',
          'MST-2': '/pdfs/3rd-sem-mst2/System_Programming_Operating_System_MST_2.pdf',
          'Final': '/pdfs/3rd-sem-final/System_Programming_and_OS_End_Term_Jan_2025_Questions.pdf'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ET1-Data Analytics(ALML, Cyber Security)',
        semester: '3rd Semester',
        year: '2',
        specialization: 'AIML',
        academicYear: '2024-25',
        description: 'Data Analytics for AIML and Cyber Security specializations',
        pdfs: {
          'MST-1': '/pdfs/3rd-sem-mst1/Introduction_to_Data_Analytics_Question_Paper.pdf',
          'MST-2': '/pdfs/3rd-sem-mst2/Open_Standards_MST_2.pdf',
          'Final': '/pdfs/3rd-sem-final/FinalPage_EmergingTech1_DataAnalytics.pdf'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ET1-IT-Security (Data Science)',
        semester: '3rd Semester',
        year: '2',
        specialization: 'DS',
        academicYear: '2024-25',
        description: 'IT Security fundamentals for Data Science specialization',
        pdfs: {
          'MST-1': '/pdfs/3rd-sem-mst1/Open_Source_Question_Paper.pdf',
          'MST-2': '/pdfs/3rd-sem-mst2/Open_Standards_MST_2.pdf',
          'Final': '/pdfs/3rd-sem-final/Open_Source_Software_and_Open_Standards_Exam_Jan_2025.pdf'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Relational Database Management System and NOSQL',
        semester: '3rd Semester',
        year: '2',
        specialization: 'DS',
        academicYear: '2024-25',
        description: 'RDBMS and NoSQL databases - Complete database management systems',
        pdfs: {
          'MST-1': '/pdfs/3rd-sem-mst1/RDBMS_Question_Paper.pdf',
          'MST-2': '/pdfs/3rd-sem-mst2/MST 2 RDBMS_Nov2024_QuestionPaper.pdf',
          'Final': '/pdfs/3rd-sem-final/Relational_Database_Management_System_NoSQL_Exam_Jan_2025.pdf'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    for (const subject of subjectsData) {
      await addDoc(collection(db, 'subjects'), subject)
    }
    console.log('✅ Subjects collection initialized')

    // Initialize Admin Users Collection (for role-based access)
    const adminUsers = [
      {
        email: 'admin@ltsu.edu',
        role: 'admin',
        name: 'LTSU Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    for (const admin of adminUsers) {
      await addDoc(collection(db, 'adminUsers'), admin)
    }
    console.log('✅ Admin users collection initialized')

    console.log('🎉 Firebase initialization completed successfully!')
    alert('Firebase data initialized successfully!')

  } catch (error) {
    console.error('❌ Error initializing Firebase data:', error)
    alert('Error initializing Firebase data. Check console for details.')
  }
}

// Function to clear all collections (for testing)
export const clearFirebaseData = async () => {
  try {
    const collections = ['events', 'announcements', 'deadlines', 'subjects', 'adminUsers']

    for (const collectionName of collections) {
      const querySnapshot = await getDocs(collection(db, collectionName))
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref))
      await Promise.all(deletePromises)
      console.log(`🗑️ Cleared ${collectionName} collection`)
    }

    console.log('🧹 All collections cleared')
    alert('All Firebase collections cleared!')

  } catch (error) {
    console.error('❌ Error clearing Firebase data:', error)
    alert('Error clearing Firebase data. Check console for details.')
  }
}