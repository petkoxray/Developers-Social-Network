import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import HomePage from './components/Home/HomePage';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import DashboardPage from './components/Dashboard/DashboardPage';
import PrivateRoute from './components/shared/PrivateRoot';
import CreateProfilePage from './components/CreateProfile/CreateProfilePage';
import EditProfilePage from './components/EditProfile/EditProfilePage';
import AddExperience from './components/AddExperience/AddExperience';
import AddEducation from './components/AddEducation/AddEducation';
import ProfilesPage from './components/Profiles/ProfilesPage';
import ProfilePage from './components/Profile/ProfilePage';
import NotFound from './components/NotFound/NotFound';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Clear profile
    store.dispatch(clearCurrentProfile());
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/profiles" component={ProfilesPage} />
            <Route exact path="/profiles/:handle" component={ProfilePage} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={DashboardPage} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
              <PrivateRoute exact path="/dashboard" component={DashboardPage} />
              <PrivateRoute exact path="/create-profile" component={CreateProfilePage} />
              <PrivateRoute exact path="/edit-profile" component={EditProfilePage} />
            </Switch>
            <Route exact path="/not-found" component={NotFound} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
