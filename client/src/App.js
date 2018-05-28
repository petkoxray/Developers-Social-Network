import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import HomePage from './components/shared/HomePage';
import Footer from './components/shared/Footer';
import Navbar from './components/shared/Navbar';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={HomePage} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
