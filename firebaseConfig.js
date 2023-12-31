// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqAGMueBD0hyYLfZ5hVATUZ_9gU3UB2M8",
  authDomain: "first-project-11055.firebaseapp.com",
  databaseURL: "https://first-project-11055-default-rtdb.firebaseio.com",
  projectId: "first-project-11055",
  storageBucket: "first-project-11055.appspot.com",
  messagingSenderId: "728911134918",
  appId: "1:728911134918:web:03833c774e772d6c4257c7",
  measurementId: "G-CHSKFXEXYM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);