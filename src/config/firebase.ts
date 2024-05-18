// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChQ5sBIh9swhWplgcx2MobZckisDrb4UI",
  authDomain: "e-commerce-8566d.firebaseapp.com",
  projectId: "e-commerce-8566d",
  storageBucket: "e-commerce-8566d.appspot.com",
  messagingSenderId: "1016432792586",
  appId: "1:1016432792586:web:f271570d075a1130ec7bf3",
  measurementId: "G-271SDL41RC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
