import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcEkUloqpq_CCTOk4V9Z04Xwa5TLLPaAo",
  authDomain: "twitter-71dde.firebaseapp.com",
  projectId: "twitter-71dde",
  storageBucket: "twitter-71dde.firebasestorage.app",
  messagingSenderId: "629214040174",
  appId: "1:629214040174:web:22aa7cd442b36f15c7967f",
  measurementId: "G-S6F8F9D1SR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;