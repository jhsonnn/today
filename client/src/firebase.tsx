// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBeGQqEU5_LU5dMagRZCIckSVrv2JLVJc",
  authDomain: "today2-26a5d.firebaseapp.com",
  projectId: "today2-26a5d",
  storageBucket: "today2-26a5d.appspot.com",
  messagingSenderId: "749307685613",
  appId: "1:749307685613:web:75983dc2e85df136f5bae4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Firebase 데이터베이스 인스턴스 가져오기
export const db = getFirestore(app);
export const storage = getStorage(app);
