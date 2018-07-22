import React, { Component } from "react";
import { withGoogleMap, GoogleMap } from "react-google-maps";
import MarkerComponent from "../Marker/Marker";



const GoogleMapExample = withGoogleMap(props => {
    return (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={{ lat: 40.686795, lng: -73.954298 }}
    >
      <MarkerComponent places={props.state && props.state.places} query={props.query} />
    </GoogleMap>
  )});


class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.places) {
      let newState = nextProps.places.slice();
      newState = newState.map(obj => {
        obj["animation"] = window.google.maps.Animation.DROP;
        obj["isOpen"] = false;
        return obj;
      });
      this.setState({
        places: newState
      });
    }
  }
  render() {
    return (
      <div style={{ height: "90%" }}>
        <GoogleMapExample
          containerElement={<div style={{ height: `100%`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} 
          />}
          state = {this.state}
          query = {this.props.query}
        />
      </div>
    );
  }
}
export default Map;
