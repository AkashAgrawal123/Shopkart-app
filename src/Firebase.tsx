import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Firebase = firebase.initializeApp({
  apiKey: "AIzaSyARY5Rtp6wHazPWvxLgilgQINT9KuCBqM0",
  authDomain: "auth-development-9ce28.firebaseapp.com",
  projectId: "auth-development-9ce28",
  storageBucket: "auth-development-9ce28.appspot.com",
  messagingSenderId: "649403855609",
  appId: "1:649403855609:web:7d8669abd57471593fe828",
});

const auth = Firebase.auth();
export { auth };
export default Firebase;
