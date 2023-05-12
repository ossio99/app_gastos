// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKYF1fqE3283q1NJl9ZZU0BebiYsZ71TQ",
  authDomain: "app-gastos-8c1d1.firebaseapp.com",
  projectId: "app-gastos-8c1d1",
  storageBucket: "app-gastos-8c1d1.appspot.com",
  messagingSenderId: "943652173320",
  appId: "1:943652173320:web:93c103cb77bc078eee03bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);