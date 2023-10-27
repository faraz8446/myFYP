import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBq5LnxtqcUHGDWPAm7Y5Oku5-BYLbm5YM",
  authDomain: "askcui-985f2.firebaseapp.com",
  projectId: "askcui-985f2",
  storageBucket: "askcui-985f2.appspot.com",
  messagingSenderId: "399328789441",
  appId: "1:399328789441:web:eb709b1d24aa0e2229e540",
  measurementId: "G-QGFK53XPFB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
// export  const db = getFirestore(app);
export const db= getDatabase(app);
export const storage=getStorage(app);

export {auth};