import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import MarkerComponent from "../Marker/Marker";
import mapStyles from "../../data/mapStyles.json";

//Initializing the map outside the component so it doesnt rerender

const GoogleMapExample = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: 40.686795, lng: -73.954298 }}
        defaultOptions={{ styles: mapStyles }}
      >
        <MarkerComponent
          places={props.state && props.state.places}
          query={props.query}
          idClicked={props.idClicked}
        />
      </GoogleMap>
    );
  })
);

//Map component which renders Map, Marker and InfoWindow
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: ""
    };
  }

  //Adding extra properties to the recieved prop and updating the local state with it
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
  //Preventing  rerendering  if no new props is recieved
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps) === JSON.stringify(this.props)
      ? false
      : true;
  }

  render() {
    return (
      <div style={{ height: "90%" }} role="application">
        <GoogleMapExample
          containerElement={<div style={{ height: `100%`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
          state={this.state}
          query={this.props.query}
          idClicked={this.props.idClicked}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAihs7deqk7Q6wjoXJzhAD1eUsBjk8-piU"
          loadingElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
export default Map;
