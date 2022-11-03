// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdnSxELmOGLf-hnztQXULgvEge7eq_a9k",
  authDomain: "ranguinho-70d2d.firebaseapp.com",
  projectId: "ranguinho-70d2d",
  storageBucket: "ranguinho-70d2d.appspot.com",
  messagingSenderId: "641127796845",
  appId: "1:641127796845:web:3b83e7983664d6dc076f64",
  measurementId: "G-NKEVG95TTY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);