// // src/firebase.js
// import { initializeApp } from 'firebase/app'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8OormQ0BJHR81zoGNZpO4KOawos4cKIY",
    authDomain: "fir-monash-login.firebaseapp.com",
    projectId: "fir-monash-login",
    storageBucket: "fir-monash-login.appspot.com",
    messagingSenderId: "350021953190",
    appId: "1:350021953190:web:19383e727b82275a3ab667",
    measurementId: "G-KKL3Y1XQHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = getAuth(app)

export { auth }