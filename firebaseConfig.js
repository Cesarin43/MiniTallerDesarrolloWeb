// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZVK2GMzAUR-ZVwttWI68P3B-BCcFpVUc",
  authDomain: "minitaller-7f537.firebaseapp.com",
  projectId: "minitaller-7f537",
  storageBucket: "minitaller-7f537.appspot.com",
  messagingSenderId: "180303401772",
  appId: "1:180303401772:web:f1ac35148ceded67cd9289",
  measurementId: "G-2YS4R2SCGB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
