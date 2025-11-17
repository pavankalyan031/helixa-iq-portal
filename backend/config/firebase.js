// Backend Firebase Configuration
// Using Firebase Client SDK for demonstration (can be upgraded to Admin SDK later)

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrJ12QLlmQ0QMaE9XDfOK0d4SHJkJ8kaY",
  authDomain: "lstu-student-portal.firebaseapp.com",
  projectId: "lstu-student-portal",
  storageBucket: "lstu-student-portal.firebasestorage.app",
  messagingSenderId: "213785339707",
  appId: "1:213785339707:web:9a98d88ae593f014dcb91e",
  measurementId: "G-E16S2FJ6PD"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig, 'backend-server')
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Test connection
export const testConnection = async () => {
  try {
    // Try to access a collection
    const testQuery = query(collection(db, 'test'), limit(1))
    await getDocs(testQuery)
    
    return { 
      success: true, 
      message: 'Firebase connection successful',
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('Firebase connection test failed:', error)
    return { 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    }
  }
}

// Helper function to get collection reference
export const getCollection = (collectionName) => {
  try {
    return collection(db, collectionName)
  } catch (error) {
    console.error(`Error getting collection ${collectionName}:`, error)
    throw error
  }
}

// Helper function for document creation
export const createDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return docRef.id
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error)
    throw error
  }
}

// Helper function for document updates
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    })
    return true
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error)
    throw error
  }
}

export default {
  app,
  auth,
  db,
  storage,
  testConnection,
  getCollection,
  createDocument,
  updateDocument
}