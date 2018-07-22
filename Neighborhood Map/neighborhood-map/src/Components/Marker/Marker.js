import React, { Component } from "react";
import { Marker } from "react-google-maps";

class MarkerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: ""
    };
  }
  onClickHandler(id) {
    this.animateMarkerBounce(id);
  }
  animateMarkerBounce = id => {
    const marker = this.state.places.map(
      place => (place.id === id ? (place.animation = 1) && place : place)
    );
    this.setState(() => {
      return { places: marker };
    });
    setTimeout(() => {
      this.state.places.map(
        place => (place.id === id ? (place.animation = 0) && place : place)
      );
      this.setState(() => {
        return { places: marker };
      });
    }, 400);
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.places) {
      this.setState({
        places: nextProps.places
      });
    }
  }
  componentDidMount() {
    this.setState({
      places: this.props.places
    });
  }
  render() {
    console.log(this.props.places);
    const place =
      this.props.places &&
      this.props.places.map(place => (
        <Marker
          key={place.id}
          position={{ lat: place.coords[0], lng: place.coords[1] }}
          animation={place.animation}
          onClick={e => this.onClickHandler(place.id)}
        />
      ));
    return <div>{place}</div>;
  }
}

export default MarkerComponent;
