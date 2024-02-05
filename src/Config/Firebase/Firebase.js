import {
  getAuth,

} from "firebase/auth";
import {
  getFirestore,

} from "firebase/firestore";
import { app } from "./firebaseconfig";

 const auth = getAuth(app);

//initialize firestore database
const db = getFirestore(app);



export {
  auth,
  db
};
