import React, { useContext } from 'react';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App'
import { useHistory, useLocation } from 'react-router-dom';
const Login = () => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    
    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
    

    //to handle duplication of loggin In
    if(firebase.apps.length ===0){
        firebase.initializeApp(firebaseConfig);
    }
    


    const handleGoogleSignIn = () =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        
        
        firebase.auth().signInWithPopup(provider).then(function(result) {
             
            const  {displayName,email} = result.user;
            const signedInUser ={name:displayName,email};
            setLoggedInUser(signedInUser);
            storeAuthToken();
            // history.replace(from);


          }).catch(function(error) {
            // Handle Errors here.
             
            const errorMessage = error.message;
            console.log(errorMessage);
          });
    }

    //jwt token starts
    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            // console.log(idToken);
            sessionStorage.setItem('token',idToken);
            history.replace(from);//redirect after token is set .
          }).catch(function(error) {
            // Handle error
          });
    }
    return (
        <div className="container " style={{padding: '30px', border: '1px solid gray', borderRadius: '5px', marginTop: '50px' ,width:"40%"}}>
            <h1 style={{textAlign: 'center'}}>Login</h1>
            <button className="btn btn-secondary"  style={{margin: '0 auto',
    display: 'block'}}onClick={handleGoogleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;