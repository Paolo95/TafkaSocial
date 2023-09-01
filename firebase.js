import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAfxkrxlTYZb7k5woEQutshGjsRTSXatlM",
  authDomain: "ig-clone-fd456.firebaseapp.com",
  projectId: "ig-clone-fd456",
  storageBucket: "ig-clone-fd456.appspot.com",
  messagingSenderId: "482964959995",
  appId: "1:482964959995:web:e9d63c920d3592f021365e"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);