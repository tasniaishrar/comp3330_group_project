import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyABKZC4KoteoNfce26QMtB4HduZxJQDmhE",
  authDomain: "comp3330-receiptify.firebaseapp.com",
  projectId: "comp3330-receiptify",
  storageBucket: "comp3330-receiptify.appspot.com",
  messagingSenderId: "752762107216",
  appId: "1:752762107216:web:a5982f72e6c5062d5a2855",
  measurementId: "G-L7VW9S2E42"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };