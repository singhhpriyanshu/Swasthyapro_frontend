// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBk6sv-WfmP8MObUGEFVbKRxPB6DnewRtY",
  authDomain: "otp-project-beb85.firebaseapp.com",
  projectId: "otp-project-beb85",
  storageBucket: "otp-project-beb85.firebasestorage.app",
  messagingSenderId: "174681731394",
  appId: "1:174681731394:web:43fe72ac8bfc09903d18db",
  measurementId: "G-2JG1Y19RLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);