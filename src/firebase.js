// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDpLD7To3zJm5PRlJDfDJd-fUla57zKBIQ",
  authDomain: "todo-app-b7762.firebaseapp.com",
  projectId: "todo-app-b7762",
  storageBucket: "todo-app-b7762.appspot.com",
  messagingSenderId: "976955248526",
  appId: "1:976955248526:web:a74d9b671ee63a81b89edf",
  measurementId: "G-WZ4J404V75",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;
