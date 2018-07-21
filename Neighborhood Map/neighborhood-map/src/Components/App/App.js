import React, { Component } from "react";
import axios from "axios";
import Map from "../Maps/Maps";
import Navbar from "../Navbar/Navbar";
import ListView from "../ListView/ListView";
import "./App.css";
import JSONData from "../../data/places.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldListViewOpen: false
    };
  }
  componentDidMount() {
    let qs = {
      client_id: "4G4VGFRZFSP44HD0UYCBIBECDISZWAU0BHZC321A44HTPP5L",
      client_secret: "VQCDP2XYNSGPXU2RO0JELB4TB3XBIMWIQRNMJR2AERXKVI0Z",
      ll: "40.7243,-74.0018",
      v: "20180323"
  }
 
    console.log(JSONData);
    axios
      .get(`https://api.foursquare.com/v2/venues/4ba51d9df964a52042df38e3`, {
        params: {
          client_id: "4G4VGFRZFSP44HD0UYCBIBECDISZWAU0BHZC321A44HTPP5L",
          client_secret: "VQCDP2XYNSGPXU2RO0JELB4TB3XBIMWIQRNMJR2AERXKVI0Z",
          ll: "40.7040764,-73.84591019999999",
          v: "20180323"

        },
      }).then(res => console.log(res.data.response));
  }
  listViewOpenHandler = () => {
    this.setState(prevState => ({
      shouldListViewOpen: !prevState.shouldListViewOpen
    }));
  };
  render() {
    return (
      <div className="App">
        <Navbar listViewOpenHandler={this.listViewOpenHandler} />
        <ListView shouldListViewOpen={this.state.shouldListViewOpen} />
        <Map />
      </div>
    );
  }
}

export default App;
