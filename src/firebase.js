import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/functions"

const firebaseConfig = {
    apiKey: "AIzaSyDmA6obuH35PZ8sLCJXvssdTXnBbtxRqGk",
    authDomain: "queue-cc2f4.firebaseapp.com",
    databaseURL: "https://queue-cc2f4.firebaseio.com",
    projectId: "queue-cc2f4",
    storageBucket: "queue-cc2f4.appspot.com",
    messagingSenderId: "595192435679",
    appId: "1:595192435679:web:496845cf67145bf64d2a6a"
  };
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var functions = firebase.functions();
export { db, functions };