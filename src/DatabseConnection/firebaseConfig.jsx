// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCvprqt63C2J2TWy2VQJkxTjDztTnC7pTQ",
  authDomain: "linkedin-a3dce.firebaseapp.com",
  projectId: "linkedin-a3dce",
  storageBucket: "linkedin-a3dce.appspot.com",
  messagingSenderId: "987347825691",
  appId: "1:987347825691:web:6a6972e1315cdb64c674be",
  measurementId: "G-M7YGK4TLDZ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;
