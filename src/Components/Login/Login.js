import React, { useContext, useState } from 'react';
import { useForm} from "react-hook-form";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { initializeLoginFramework,  handleSignOut,  createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';

const formStyle = {
    width : '50%',
    display: 'block',
    margin: 'auto',
    textAlign: 'center',
    borderRadius : '10px'
}
function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
      isSignedIn: false,
      name: '',
      email: '',
      password: '',
      photo: ''
    });
  
    initializeLoginFramework();
  
    const [loggedInUser, setLoggedInUser ] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
  
    const signOut = () => {
        handleSignOut()
        .then(res => {
            handleResponse(res, false);
        })
    }
  
    const handleResponse = (res, redirect) =>{
      setUser(res);
      setLoggedInUser(res);
      if(redirect){
          history.replace(from);
      }
    }
  
    const handleBlur = (e) => {
      let isFieldValid = true;
      if(e.target.name === 'email'){
        isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      }
      if(e.target.name === 'password'){
        const isPasswordValid = e.target.value.length > 6;
        const passwordHasNumber =  /\d{1}/.test(e.target.value);
        isFieldValid = isPasswordValid && passwordHasNumber;
      }
      if(isFieldValid){
        const newUserInfo = {...user};
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
      }
    }
    const handleSubmit = (e) => {
      if(newUser && user.email && user.password){
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
      }
  
      if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
      }
      e.preventDefault();
    }
     const provider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const {displayName , email} = result.user;
            const signedInUser = {displayName , email}
            setLoggedInUser(signedInUser)
            history.replace(from);
            // console.log(signedInUser)
            }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });

    }
    return (
        <div class = "text-center">
            <h2>Sign In</h2>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
            <label htmlFor="newUser">New User Sign up</label>
            <form style ={formStyle}onSubmit={handleSubmit}>
                {newUser && <input type = "text" name="name" className="form-control" onBlur = {handleBlur}placeholder = "Name"  />}
                <br/>
                <input type = "text" name="email" className="form-control" onBlur = {handleBlur}placeholder = "Username or Email" required/>
                <br/>
                <input type = "password" name="password" className="form-control" onBlur = {handleBlur}placeholder = "Password"  required/>
                <br/>
                {newUser && <input type = "password" name="password" className="form-control" onBlur = {handleBlur} placeholder = "Confirm Password" />}
                <br/>
                <input type="submit" className="form-control bg-success" value = {newUser ? "Create an account" : "Login"} style = {{color: 'white'}} />
                <p>or</p>
                <button className = "btn btn-danger w-100 mb-1 rounded-pill" onClick = {handleGoogleSignIn}>Continue with Google</button>
            </form>
            <p style = {{color: 'red'}}>{user.error}</p>
            {user.success && <p style = {{color: 'green'}}>User created successfully</p>}
        </div>
        


    );
};


            
            



export default Login;