import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDyvmlyGLwDVAvQXdQgU5DqdwPcJ_k-HOM",
  authDomain: "sgi-live.firebaseapp.com",
  projectId: "sgi-live",
  storageBucket: "sgi-live.appspot.com",
  messagingSenderId: "367479700340",
  appId: "1:367479700340:web:6cc6e3e908474750874a21",
};

!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : appfirebase.app();

const db = firebase.firestore();
const auth = firebase.auth();

export { auth, db, firebase };
