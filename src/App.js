import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebase.config';
import { useState } from 'react';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
 

function App() {
  const [user , setUser] = useState({
    signinId: false,
    name: '',
    email: '',
    photo: ''
  })
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var googleProvider = new firebase.auth.GoogleAuthProvider();
  const handlerFacebookSingIn = () => {
    firebase.auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    var user = result.user;
    var accessToken = credential.accessToken;
    console.log(user)

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode, errorMessage, credential,email)
  });
  }
  const handleGoogleSignIn = () => {
    firebase.auth()
  .signInWithPopup(googleProvider)
  .then((res) => {
    const {displayName , email, photoURL} = res.user;
    const signInUser = {
      signinId : true,
      name : displayName ,
      email: email,
      photo:photoURL
    }
   console.log(user)
   setUser(signInUser)
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode , errorMessage)
  });

  }
  return (
    <div className="App">
       <button onClick={handleGoogleSignIn}>Sign In Google</button>
       <button onClick={handlerFacebookSingIn}>Sign In Facebooke</button>
       {
      user.signinId && <div>  
                       <h3>Wellcome, {user.name}</h3>
                     <h3>email: {user.email}</h3>
                     <img width="150px" src={user.photo} alt="" />
      </div>
                  
       }
      
    </div>
  );
}

export default App;
