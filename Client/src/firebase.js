// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDHXR_Ij5tGwudt0O7jQ-2Kql-mWe5YJ-Q",
    authDomain: "crm-system-99d52.firebaseapp.com",
    projectId: "crm-system-99d52",
    storageBucket: "crm-system-99d52.appspot.com",
    messagingSenderId: "365806722615",
    appId: "1:365806722615:web:2e04155e380f28e92ae9b2",
    measurementId: "G-N40LKSDRPM"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
