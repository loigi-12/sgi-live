import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBJ6X5dC6Sn61VP1nL7kzgsb9l7UNw_oWM",
  authDomain: "student-grade-inquiry.firebaseapp.com",
  databaseURL: "https://student-grade-inquiry-default-rtdb.firebaseio.com",
  projectId: "student-grade-inquiry",
  storageBucket: "student-grade-inquiry.appspot.com",
  messagingSenderId: "1016185321800",
  appId: "1:1016185321800:web:5060c0734a43b97c7d1b7d",
};

!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : appfirebase.app();

const db = firebase.firestore();
const auth = firebase.auth();

export { auth, db, firebase };
