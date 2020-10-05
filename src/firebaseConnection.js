import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


let firebaseConfig = {
    // apiKey: "AIzaSyCCYLPwbPpPVLE4rMTnAXHR3H8BT9NdYvc",
    // authDomain: "slack-chat-54b8a.firebaseapp.com",
    // databaseURL: "https://slack-chat-54b8a.firebaseio.com",
    // projectId: "slack-chat-54b8a",
    // storageBucket: "slack-chat-54b8a.appspot.com",
    // messagingSenderId: "963850044805",
    // appId: "1:963850044805:web:0ebd49c8da1c3a4a6730ec",
    // measurementId: "G-9PDYSD6726"

    apiKey: "AIzaSyA3bNnN6Hx3MtPov0RXhTPzOsN1dnK6hi4",
    authDomain: "dvara-ait.firebaseapp.com",
    databaseURL: "https://dvara-ait.firebaseio.com",
    projectId: "dvara-ait",
    storageBucket: "dvara-ait.appspot.com",
    messagingSenderId: "470053074649",
    appId: "1:470053074649:web:5aa0982a688cf8b64230c8",
    measurementId: "G-0JJ7P6NHD2"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
