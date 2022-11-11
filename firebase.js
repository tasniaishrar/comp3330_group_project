import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDYlEW6EBRt1vojXNFe0Pln1Od5KeeMoJA",
  authDomain: "comp3330-expense-tracker-demo.firebaseapp.com",
  projectId: "comp3330-expense-tracker-demo",
  storageBucket: "comp3330-expense-tracker-demo.appspot.com",
  messagingSenderId: "1074905656423",
  appId: "1:1074905656423:web:551bede14e64abc81ab8c2",
  measurementId: "G-K3NE76286F"
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
