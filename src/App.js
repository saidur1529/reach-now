import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Destination from './components/Destination/Destination';
import RideDetails from './components/RideDetails/RideDetails';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import firebaseConfig from './components/Login/firebase.config';
import NoMatch from './components/NoMatch/NoMatch';

export const UserContext = createContext();
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/home">
            <div className="bg-color">
              <Header />
              <Home />
            </div>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/vehicle/:vehicleType">
            <RideDetails></RideDetails>
          </PrivateRoute>
          <Route path="/destination">
            <Destination></Destination>
          </Route>
          <Route path="/blog">
            <div className="bg-color">
              <Header />
              <Home />
            </div>
          </Route>
          <Route path="/contact">
            <div className="bg-color">
              <Header />
              <Home />
            </div>
          </Route>
          <Route exact path="/">
            <div className="bg-color">
              <Header />
              <Home />
            </div>
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
