// Initialize sample users for testing the admin user management system
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const initializeSampleUsers = async () => {
  try {
    const sampleUsers = [
      {
        uid: 'sample-user-1',
        firstName: 'Satish',
        lastName: '',
        fullName: 'Satish',
        phoneNumber: '9876543210',
        email: 'satish123@gmail.com',
        studentId: '23100010011',
        gender: 'Male',
        department: 'BTech CSE IBM',
        specialization: 'AI & ML',
        currentYear: '3',
        currentSemester: '1',
        enrollmentYear: '2021',
        status: 'active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        address: {
          street: '123 Main Street',
          city: 'Hyderabad',
          state: 'Telangana',
          pincode: '500001',
          country: 'India'
        },
        academicRecords: {
          gpa: 8.5,
          totalCredits: 120,
          completedSubjects: ['CS101', 'CS102', 'CS201']
        }
      },
      {
        uid: 'sample-user-2',
        firstName: 'Priya',
        lastName: 'Sharma',
        fullName: 'Priya Sharma',
        phoneNumber: '9876543211',
        email: 'priya.sharma@ltsu.edu',
        studentId: '23100010012',
        gender: 'Female',
        department: 'BTech CSE IBM',
        specialization: 'Data Science',
        currentYear: '3',
        currentSemester: '1',
        enrollmentYear: '2021',
        status: 'active',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
        address: {
          street: '456 Tech Park',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560001',
          country: 'India'
        },
        academicRecords: {
          gpa: 9.2,
          totalCredits: 125,
          completedSubjects: ['CS101', 'CS102', 'CS201', 'DS101']
        }
      },
      {
        uid: 'sample-user-3',
        firstName: 'Rahul',
        lastName: 'Verma',
        fullName: 'Rahul Verma',
        phoneNumber: '9876543212',
        email: 'rahul.verma@ltsu.edu',
        studentId: '23100010013',
        gender: 'Male',
        department: 'BTech CSE IBM',
        specialization: 'Cyber Security',
        currentYear: '2',
        currentSemester: '2',
        enrollmentYear: '2022',
        status: 'active',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01'),
        address: {
          street: '789 Security Lane',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110001',
          country: 'India'
        },
        academicRecords: {
          gpa: 8.8,
          totalCredits: 85,
          completedSubjects: ['CS101', 'CS102', 'SEC101']
        }
      },
      {
        uid: 'sample-user-4',
        firstName: 'Anjali',
        lastName: 'Patel',
        fullName: 'Anjali Patel',
        phoneNumber: '9876543213',
        email: 'anjali.patel@ltsu.edu',
        studentId: '23100010014',
        gender: 'Female',
        department: 'BTech CSE IBM',
        specialization: 'IoT',
        currentYear: '4',
        currentSemester: '1',
        enrollmentYear: '2020',
        status: 'active',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10'),
        address: {
          street: '321 IoT Boulevard',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          country: 'India'
        },
        academicRecords: {
          gpa: 9.5,
          totalCredits: 160,
          completedSubjects: ['CS101', 'CS102', 'CS201', 'CS301', 'IOT101', 'IOT201']
        }
      },
      {
        uid: 'sample-user-5',
        firstName: 'Karan',
        lastName: 'Singh',
        fullName: 'Karan Singh',
        phoneNumber: '9876543214',
        email: 'karan.singh@ltsu.edu',
        studentId: '23100010015',
        gender: 'Male',
        department: 'BTech Core',
        specialization: 'Computer Science (Core)',
        currentYear: '1',
        currentSemester: '2',
        enrollmentYear: '2023',
        status: 'active',
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-02-15'),
        address: {
          street: '654 Campus Road',
          city: 'Chennai',
          state: 'Tamil Nadu',
          pincode: '600001',
          country: 'India'
        },
        academicRecords: {
          gpa: 7.8,
          totalCredits: 25,
          completedSubjects: ['CS101']
        }
      }
    ]

    console.log('Initializing sample users...')

    for (const user of sampleUsers) {
      try {
        await setDoc(doc(db, 'users', user.uid), user)
        console.log(`✅ Created sample user: ${user.fullName}`)
      } catch (error) {
        console.error(`❌ Failed to create user ${user.fullName}:`, error)
      }
    }

    console.log('🎉 Sample users initialization completed!')
    alert('Sample users created successfully! You can now view them in the admin user management.')

  } catch (error) {
    console.error('Error initializing sample users:', error)
    alert('Failed to create sample users. Please check the console for details.')
  }
}