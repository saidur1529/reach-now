import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";
import '../Header/Header.css';
import firebaseConfig from '../Login/firebase.config';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    var user = firebase.auth().currentUser;
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container">
                    <Link to="/home" class="navbar-brand" href="#"><h1>Reach Now</h1></Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav ml-auto">
                            <Link to="/home" class="nav-link active" aria-current="page" href="#">Home</Link>
                            <Link to="/destination" class="nav-link active" href="#">Destination</Link>
                            <Link to="/blog" class="nav-link active" href="#">Blog</Link>
                            <Link to="/contact" class="nav-link active" href="#">Contact</Link>
                            {
                                user ? user.displayName : <Link to="/login"><button class="btn btn-outline-success me-2" type="button">Login</button> </Link>
                            }
                            <button onClick={() => setLoggedInUser({})} class="btn btn-outline-success me-2 ml-2" type="button">Sign Out</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;