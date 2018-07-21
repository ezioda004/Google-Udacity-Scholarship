import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import MarkerComponent from "../Marker/Marker";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
        animation: window.google.maps.Animation.DROP
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
      console.log(nextState, this.state);
    return JSON.stringify(nextProps) === JSON.stringify(this.props)
      ? false
      : true;
  }
  
  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
      >
        <MarkerComponent />
      </GoogleMap>
    ));
    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `500px`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
export default Map;
