// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDj_frhf4PigBcVuc946_D3gXhChpNQPd0",
    authDomain: "technith-9c488.firebaseapp.com",
    projectId: "technith-9c488",
    storageBucket: "technith-9c488.firebasestorage.app",
    messagingSenderId: "988248834008",
    appId: "1:988248834008:web:fa94b6e5ab289f799ebcad",
    measurementId: "G-QBC5YWN203"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // Export auth for usage in components
export default app;
