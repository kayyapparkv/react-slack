import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


let firebaseConfig = {
    apiKey: "AIzaSyCCYLPwbPpPVLE4rMTnAXHR3H8BT9NdYvc",
    authDomain: "slack-chat-54b8a.firebaseapp.com",
    databaseURL: "https://slack-chat-54b8a.firebaseio.com",
    projectId: "slack-chat-54b8a",
    storageBucket: "slack-chat-54b8a.appspot.com",
    messagingSenderId: "963850044805",
    appId: "1:963850044805:web:0ebd49c8da1c3a4a6730ec",
    measurementId: "G-9PDYSD6726"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
