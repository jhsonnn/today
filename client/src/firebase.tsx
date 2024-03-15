// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXDIyDUuBMJAjEpoOIwnGW_gmFdU5XMkc",
  authDomain: "today4-556a0.firebaseapp.com",
  projectId: "today4-556a0",
  storageBucket: "today4-556a0.appspot.com",
  messagingSenderId: "887676265971",
  appId: "1:887676265971:web:c0ba250fd6f9c675711e86",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Firebase 데이터베이스 인스턴스 가져오기
export const db = getFirestore(app);
export const storage = getStorage(app);
