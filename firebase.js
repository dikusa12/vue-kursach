// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebase = {
  apiKey: "AIzaSyC--VwSfsBfHhzAfe1x-H0Iqrgi0BKyTJo",
  authDomain: "vue-kursach.firebaseapp.com",
  projectId: "vue-kursach",
  storageBucket: "vue-kursach.appspot.com",
  messagingSenderId: "30473262616",
  appId: "1:30473262616:web:54cefa9bbe71e34512556d",
  measurementId: "G-LZKT47RZMM"
};

export const app = initializeApp(firebase);
export const db = getFirestore(app)