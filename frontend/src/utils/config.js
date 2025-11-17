// Configuration for API endpoints
export const config = {
  // API Base URL
  API_BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-domain.com/api'  // Replace with your production backend URL
    : 'http://localhost:3002/api',
  
  // Firebase configuration
  firebase: {
    apiKey: "AIzaSyCrJ12QLlmQ0QMaE9XDfOK0d4SHJkJ8kaY",
    authDomain: "lstu-student-portal.firebaseapp.com",
    projectId: "lstu-student-portal",
    storageBucket: "lstu-student-portal.firebasestorage.app",
    messagingSenderId: "213785339707",
    appId: "1:213785339707:web:9a98d88ae593f014dcb91e",
    measurementId: "G-E16S2FJ6PD"
  },
  
  // App settings
  app: {
    name: 'LTSU Student Portal',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  }
}

export default config