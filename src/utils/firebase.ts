import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAdnSxELmOGLf-hnztQXULgvEge7eq_a9k",
    authDomain: "ranguinho-70d2d.firebaseapp.com",
    projectId: "ranguinho-70d2d",
    storageBucket: "ranguinho-70d2d.appspot.com",
    messagingSenderId: "641127796845",
    appId: "1:641127796845:web:3b83e7983664d6dc076f64",
    measurementId: "G-NKEVG95TTY"
  };

export const firebaseApp  = firebase.initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(firebaseApp)
auth.useDeviceLanguage()