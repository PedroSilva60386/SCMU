// Import the functions you need from the SDKs you need
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk6PWzdR3WYM-f84ZZhPMW-p0FOPB4_aU",
  authDomain: "oldtimes-4f4aa.firebaseapp.com",
  projectId: "oldtimes-4f4aa",
  storageBucket: "oldtimes-4f4aa.appspot.com",
  messagingSenderId: "70848234999",
  appId: "1:70848234999:web:5336153eefb3f76d68daf2"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };