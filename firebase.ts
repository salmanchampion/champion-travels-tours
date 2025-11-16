import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnlNAMlTY2lnZZUYb1JPOF6UOif3ud4CE",
  authDomain: "champion-travels-and-tours.firebaseapp.com",
  projectId: "champion-travels-and-tours",
  storageBucket: "champion-travels-and-tours.appspot.com",
  messagingSenderId: "538780516998",
  appId: "1:538780516998:web:7be5898ecf05a96cddc707"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
