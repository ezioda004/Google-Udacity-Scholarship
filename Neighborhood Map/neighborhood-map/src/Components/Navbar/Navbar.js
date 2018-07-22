import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  onClickHandler = () =>{
    this.setState(prevState => ({
        isOpen: !prevState.isOpen
    }))
    this.props.listViewOpenHandler()
  }
  render() {
    return (
      <nav>
        <div className="nav-drawer">
          <a
            className="canvas-toggler"
            onClick={this.onClickHandler}
          >
            <i className= {`fas ${this.state.isOpen ? `fa-times` : `fa-bars`}`} />
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
