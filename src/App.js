import React, { Component } from 'react';
import './App.css';
import Location from './React-scripts/Location';
import Footer from './React-scripts/Footer';


class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
              <Location />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
