/* eslint-disable no-unused-vars */
// import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDfpfUB-O2VJkVMs8rjUk49HzIiANIe-QM",
  authDomain: "react-native-app-8d9ee.firebaseapp.com",
  projectId: "react-native-app-8d9ee",
  storageBucket: "react-native-app-8d9ee.appspot.com",
  messagingSenderId: "782615176824",
  appId: "1:782615176824:web:d7c62ef97b55a6be98ef8d",
};

let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

// const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export function logout() {
  return signOut(auth);
}
