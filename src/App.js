import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home/Home';
import Contact from './Components/Contact/Contact';
import Header from './Components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Destination from './Components/Destination/Destination';
import { createContext, useState } from 'react';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser , setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser , setLoggedInUser]}>
      <Router>
        <Header />
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <PrivateRoute path="/destination/:name">
              <Destination />
            </PrivateRoute>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
