import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import HomePage from './components/HomePage/HomePage';
import Footer from './components/shared/Footer';
import Navbar from './components/shared/Navbar';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';

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
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
