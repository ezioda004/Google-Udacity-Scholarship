import React, { Component } from "react";
import { withGoogleMap, GoogleMap } from "react-google-maps";
import MarkerComponent from "../Marker/Marker";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: ""
    };
  }
  
  componentWillReceiveProps(nextProps){
    if (nextProps.places){
        let newState = nextProps.places.slice();
        newState = newState.map(obj => (obj["animation"] = window.google.maps.Animation.DROP) && obj)
        this.setState({
            places: newState
        })
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
        defaultZoom={11}
        defaultCenter={{ lat: 40.686795, lng: -73.954298 }}
      >
        <MarkerComponent places = {this.state.places}/>
      </GoogleMap>
    ));
    return (
      <div style = {{height: "90%"}}>
        <GoogleMapExample
          containerElement={<div style={{ height: `100%`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
export default Map;
