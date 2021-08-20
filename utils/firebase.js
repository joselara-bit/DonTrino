import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA3jCIkWAYlR_h5zeEGmepots4LcPjl280",
    authDomain: "dontrino-82e9b.firebaseapp.com",
    projectId: "dontrino-82e9b",
    storageBucket: "dontrino-82e9b.appspot.com",
    messagingSenderId: "585675009579",
    appId: "1:585675009579:web:20c434d9ee5343ed22046e",
    measurementId: "G-GTSFPSVJFQ"
  };
export const firebaseApp = firebase.initializeApp(firebaseConfig);