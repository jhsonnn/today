// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getDatabase } from "firebase/database";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB-6sBI-lNSeXCHndlUVhZEN4jhm6tVYPc",
  authDomain: "today-4be20.firebaseapp.com",
  projectId: "today-4be20",
  storageBucket: "today-4be20.appspot.com",
  messagingSenderId: "204687737625",
  appId: "1:204687737625:web:68990c69d7596485d1fb88"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Firebase 데이터베이스 인스턴스 가져오기
export const db = getFirestore(app);
export const storage = getStorage(app)
