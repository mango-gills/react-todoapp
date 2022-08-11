// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,

  // fbase todo app
  // apiKey: "AIzaSyCUABHO3_O619gYRJ1nbsx_m6W33o943AE",
  // authDomain: "todo-fbase-app.firebaseapp.com",
  // projectId: "todo-fbase-app",
  // storageBucket: "todo-fbase-app.appspot.com",
  // messagingSenderId: "518327721306",
  // appId: "1:518327721306:web:1ac67e3926c763eb59e763",

  // //chatapp
  // apiKey: "AIzaSyCbsvbvhVlFcxKHSypYMAdf50Nuaw8bADw",
  // authDomain: "chatapp-114a0.firebaseapp.com",
  // projectId: "chatapp-114a0",
  // storageBucket: "chatapp-114a0.appspot.com",
  // messagingSenderId: "455548879536",
  // appId: "1:455548879536:web:b0d2869000add644473175",
  // measurementId: "G-GF2G0ZHE8W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
