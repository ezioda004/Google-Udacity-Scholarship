import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav>
        <div className="nav-drawer">
          <a className="canvas-toggler">
            <i className="fas fa-bars" />
          </a>
        </div>
        <div className="heading">
          <h1>Neighborhood Map</h1>
        </div>
      </nav>
    );
  }
}

export default Navbar;
