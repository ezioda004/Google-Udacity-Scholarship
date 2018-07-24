import React, { Component } from "react";

class Error extends Component {
  render() {
    return <div>{this.props.errorDisplay}</div>;
  }
}

export default Error;
