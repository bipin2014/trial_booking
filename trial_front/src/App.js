import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import './Assets/css/layout.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./Views/Login";
import LoginTrainer from "./Views/LoginTrainer";
import SignUp from "./Views/SignUp";
import Booking from "./Views/Booking";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import NavBar from "./Components/NavBar";
import DashBoard from "./Views/DashBoard";
import Center from "./Views/Center";
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userAction';
import AuthRoute from './Components/AuthRoute/AuthRoute'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dashboard from './Views/DashBoard';
import tDashboard from './Views/TDashboard';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import Settings from "./Views/Settings";

function App() {
  const [token, settoken] = useState(localStorage.getItem("AUTH-TOKEN"))
  if (token) {
      const decodedToken = jwtDecode(token);

      console.log(decodedToken);
      if (decodedToken.iat > Date.now()) {
          store.dispatch(logoutUser());
          window.location.href = '/login';
      } else {
          store.dispatch({ type: SET_AUTHENTICATED });
          axios.defaults.headers.common['AUTH-TOKEN'] = token;
          store.dispatch(getUserData());
      }
  }
  return (
    <main>
      <Router>
      <NotificationContainer />
        <AuthRoute path="/" exact component={Login}></AuthRoute>
        <AuthRoute path="/login" exact component={Login}></AuthRoute>
        <AuthRoute path="/trainerlogin" exact component={LoginTrainer}></AuthRoute>
        <Route path="/signup" exact component={SignUp}></Route>
        {token && [
          <Route path="/dashboard" exact component={Dashboard}></Route>,
          <Route path="/tDashboard" exact component={tDashboard}></Route>,
            <Route path="/settings" exact component={Settings}></Route>,
          <Route path="/book/:tc" exact component={Booking}></Route>,
          <Route path="/Center" exact component={Center}></Route>,
  ]}
      </Router>
    </main>
  );
}


App.propTypes = {
  user: PropTypes.object
};

export default App;
