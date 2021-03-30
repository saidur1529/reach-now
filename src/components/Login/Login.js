import React from 'react';
import Header from '../Header/Header';
import '../Login/Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { useState } from 'react';
import firebaseConfig from './firebase.config';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var { displayName, email } = result.user;
                const signedInUser = { name: displayName, email };
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }
    const handleFacebookSignIn = () => {
        var fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                var credential = result.credential;
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email };
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(error);
            });
    }
    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passWordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passWordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.password && user.email) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    history.push(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    console.log('sign in userInfo', res.user);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    console.log(error.message);
                });
        }

        e.preventDefault();
        
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
        }).then(function () {
            console.log('user name updated successfully');
        }).catch(function (error) {
            console.log(error);
        });
    }
    return (
        <div>
            <Header></Header>
            <form className="container mt-5">
                <div class="mb-3">
                    {newUser && <input type="name" name="username" placeholder="Full Name*" onBlur={handleBlur} class="form-control" id="user" aria-describedby="emailHelp" required/>}
                </div>
                <div class="mb-3">
                    <input type="email" name="email" placeholder="Email address*" onBlur={handleBlur} class="form-control" id="email" aria-describedby="emailHelp" required/>
                </div>
                <div class="mb-3">
                    <input type="password" name="password" placeholder="Password*" onBlur={handleBlur} class="form-control" id="pass" required/>
                </div>
                <div class="mb-3">
                    <input type="password" name="re-password" placeholder="Re-Type Password*" onBlur={handleBlur} class="form-control" id="re-pass" required/>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" class="form-check-input" id="check"></input>
                    <label htmlFor="newUser" class="form-check-label" for="exampleCheck1"><b>New User? Click the checkbox for Sign Up!</b></label>
                </div>
                <button onClick={handleSubmit} type="submit" value="submit" class="btn btn-primary">Submit</button>
            </form>
            <p className="text-center" style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p className="text-center" style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>
            }
            <hr style={{ width: '1150px' }}></hr>
            <div className="container">
                <h3 className="text-center">Or</h3>
                <button onClick={handleGoogleSignIn} className="btn-success p-3 m-left mb-3">Continue with Google</button><br />
                <button onClick={handleFacebookSignIn} className="btn-success p-3 m-left">Continue with Facebook</button>
            </div>
        </div>
    );
};

export default Login;