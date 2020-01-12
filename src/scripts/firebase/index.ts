import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDA-aVDwH4sNwlFiH6Bpv_su5qY9t7_sDo",
  authDomain: "racai-app.firebaseapp.com",
  databaseURL: "https://racai-app.firebaseio.com",
  projectId: "racai-app",
  storageBucket: "racai-app.appspot.com",
  messagingSenderId: "821375952625",
  appId: "1:821375952625:web:b76b63382109e14b176b50",
  measurementId: "G-YS4LWB1Q90"
};

firebase.initializeApp(firebaseConfig);
export const analytics = firebase.analytics();
// export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
