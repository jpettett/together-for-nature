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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()
    
    //if uid snapshot doesn't exist, create data in its place 
    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
        console.log('error creating user', error.message)
      }
    }
    return userRef;
  }
  
  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' })
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase