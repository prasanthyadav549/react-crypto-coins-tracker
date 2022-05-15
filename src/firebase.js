import firebaseConfig from "./config/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// initialize the firebase app
const firebaseApp = initializeApp(firebaseConfig);

// this firbaseApp is going to act as an entry point 
// between our project and firebase
  const auth = getAuth(firebaseApp);

  // this is for data base
    const db = getFirestore(firebaseApp);

export { auth, db };    