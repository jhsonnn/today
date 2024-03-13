// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getDatabase } from "firebase/database";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBxKm2wFjFx1gwiKTWePxjD3tTxYzMVvwg",
  authDomain: "today-test-91e6b.firebaseapp.com",
  projectId: "today-test-91e6b",
  storageBucket: "today-test-91e6b.appspot.com",
  messagingSenderId: "974882219442",
  appId: "1:974882219442:web:aeec91a65c392a446c70ab"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Firebase 데이터베이스 인스턴스 가져오기
export const db = getFirestore(app);
export const storage = getStorage(app)
