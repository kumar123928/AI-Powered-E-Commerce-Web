import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getApp, initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-aac23.firebaseapp.com",
  projectId: "loginonecart-aac23",
  storageBucket: "loginonecart-aac23.firebasestorage.app",
  messagingSenderId: "130517538726",
  appId: "1:130517538726:web:7b031124a1a8bc4a69a167"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider=new GoogleAuthProvider()



export {auth, provider}