import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAsWpuFofmQ4A_GNHOKYUv45qbDSEYi67I",
    authDomain: "smart-locker-4a8ce.firebaseapp.com",
    projectId: "smart-locker-4a8ce",
    storageBucket: "smart-locker-4a8ce.appspot.com",
    messagingSenderId: "1083622774243",
    appId: "1:1083622774243:web:b9fdba2394318716687cd6",
    measurementId: "G-VLPCQ5P0FJ"
  };

  firebase.initializeApp(firebaseConfig);
  
  export default firebase;
