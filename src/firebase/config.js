import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDt6IK0-b3Qij0hjVbC4Wr3oLuYMMrMsi0",
    authDomain: "music-playlists-91c86.firebaseapp.com",
    projectId: "music-playlists-91c86",
    storageBucket: "music-playlists-91c86.appspot.com",
    messagingSenderId: "36698531464",
    appId: "1:36698531464:web:caf2a0fcd25b3af887213d"
};

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()

const projectAuth = firebase.auth()

const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, timestamp }