import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNXo2KUYZlsPa2gwLF1nl8TrHYHjlO_nc",
  authDomain: "e-duka-428809.firebaseapp.com",
  projectId: "e-duka-428809",
  storageBucket: "e-duka-428809.appspot.com",
  messagingSenderId: "631429224917",
  appId: "1:631429224917:web:67a0731ae655b4c3e1c55c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;