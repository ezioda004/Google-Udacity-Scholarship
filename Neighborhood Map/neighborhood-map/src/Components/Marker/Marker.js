import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

class MarkerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: window.google.maps.Animation.DROP
    };
  }
  onClickHandler = () => {
    this.animateMarkerBounce();
  };
  animateMarkerBounce = () => {
    this.setState(() => ({ animation: 1 }));
    setTimeout(() => {
      this.setState(() => ({ animation: 0 }));
    }, 400);
  };
  render() {
    return (
      <div>
        <Marker
          position={{ lat: 40.756795, lng: -73.954298 }}
          animation={this.state.animation}
          onClick={this.onClickHandler}
        />
        <Marker
          position={{ lat: 40.856795, lng: -73.854298 }}
          animation={this.state.animation}
          onClick={this.onClickHandler}
        />
      </div>
    );
  }
}

export default MarkerComponent;
