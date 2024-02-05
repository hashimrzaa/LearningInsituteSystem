import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAl7pVn3Teqd8GAGZ-ZwkVVG5oXdC5kP-A",
  authDomain: "learningms-f68c9.firebaseapp.com",
  projectId: "learningms-f68c9",
  storageBucket: "learningms-f68c9.appspot.com",
  messagingSenderId: "585906068172",
  appId: "1:585906068172:web:2a5a253ec66f684a744069"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage (app);
