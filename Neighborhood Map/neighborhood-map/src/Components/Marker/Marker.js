import React, { Component } from "react";
import { Marker, InfoWindow } from "react-google-maps";

//Marker Component that shows Marker and Infowindow
class MarkerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: ""
    };
  }

  //On click animating the marker as well as changing the state of the indivual place
  onClickHandler(id) {
    this.animateMarkerBounce(id);
    const marker = this.state.places.map(place => {
      if (place.id === id) {
        place.isOpen = !place.isOpen;
      }
      return place;
    });
    this.setState(() => {
      return { places: marker };
    });
  }

  //Animation, which updates the state twice
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

  //Updating the state appropriately when new places or idClicked is recieved
  componentWillReceiveProps(nextProps) {
    if (nextProps.places) {
      this.setState({
        places: nextProps.places
      });
    }
    if (nextProps.idClicked) {
      this.setState(prevState => {
        const updatedPlace = prevState.places.map(
          place =>
            place.id === nextProps.idClicked
              ? (place.isOpen = !place.isOpen) && place
              : place
        );
        return {
          places: updatedPlace
        };
      });
    }
  }

  //Setting up the local state
  componentDidMount() {
    this.setState({
      places: this.props.places
    });
  }
  render() {
    //Making a place list as well as filtering with any query passed
    const place =
      this.state.places &&
      this.state.places
        .filter(place => place.name.toLowerCase().includes(this.props.query))
        .map(place => (
          <Marker
            key={place.id}
            position={{ lat: place.coords[0], lng: place.coords[1] }}
            animation={place.animation}
            onClick={e => this.onClickHandler(place.id)}
          >
            {place.isOpen && (
              <InfoWindow onCloseClick={e => this.onClickHandler(place.id)}>
                <div>
                  <div>{place.rating || 7}/10</div>
                  <img
                    style={{ width: "150px", height: "100px" }}
                    src={place.photo}
                    alt={place.name}
                  />
                  <div>
                    <h4 style={{ margin: "5px" }}>{place.name}</h4>
                  </div>
                  <div>{place.address}</div>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ));
    return <div>{place}</div>;
  }
}

export default MarkerComponent;
