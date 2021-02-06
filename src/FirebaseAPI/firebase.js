// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
  apiKey: "AIzaSyAs3m8hGtshaeUz_sYvjihBMzY5xaRpHqg",
  authDomain: "inventory-management-23f22.firebaseapp.com",
  projectId: "inventory-management-23f22",
  storageBucket: "inventory-management-23f22.appspot.com",
  messagingSenderId: "664704913590",
  appId: "1:664704913590:web:85e37c1ec35e0f03f3d617",
  measurementId: "G-GXL5PZT5LP",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
