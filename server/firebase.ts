// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCu_P7-QcXRz4E5UvdT0NqsHcGrWP1Tnwg",
  authDomain: "asistente-web-22323.firebaseapp.com",
  projectId: "asistente-web-22323",
  storageBucket: "asistente-web-22323.appspot.com",
  messagingSenderId: "855996265641",
  appId: "1:855996265641:web:d520e2466b8c5dff03e5b8",
  measurementId: "G-MECLML93XB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);