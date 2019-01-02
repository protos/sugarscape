import React, { Component } from 'react';
import Grid from "./components/Grid"
import './css/Main.css';


class Main extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          SugarScape!!!
        </header>
        <div className="main-content">
          <Grid />
        </div>
      </div>
    );
  }
}

export default Main;
