import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const API_KEY = process.env.REACT_APP_API_KEY;

const config = {
    apiKey: API_KEY,
    authDomain: "together-for-nature.firebaseapp.com",
    databaseURL: "https://together-for-nature.firebaseio.com",
    projectId: "together-for-nature",
    storageBucket: "together-for-nature.appspot.com",
    messagingSenderId: "330155121671",
    appId: "1:330155121671:web:12c98c78a32a70bdb69ea2"
  };

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' })
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase