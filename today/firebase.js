// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1IZnps7SZc98UQnAhroAuOgBIPExdZtk",
  authDomain: "today-91ce7.firebaseapp.com",
  projectId: "today-91ce7",
  storageBucket: "today-91ce7.appspot.com",
  messagingSenderId: "661747652175",
  appId: "1:661747652175:web:768577ce7427e1c5247c3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
