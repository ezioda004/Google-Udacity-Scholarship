import React, { Component } from "react";
import Map from "../Maps/Maps";
import Navbar from "../Navbar/Navbar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Map />
      </div>
    );
  }
}

export default App;
