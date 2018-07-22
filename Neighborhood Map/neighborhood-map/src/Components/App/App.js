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
      shouldListViewOpen: false,
      places: ""
    };
  }
  componentDidMount() {
    let qs = {
      client_id: "XM3F34N54T41OY32LSGSNTIF2B0DWDLE3SVPXAFU4QPVNVEO",
      client_secret: "SXKCR4F4MIJSYTOMARG3PAHFUEVAB2XVZX4G1UUXCJC1GTJG",
      v: "20180323"
    };

    let promise = [];
     async function asyncForEach(array, callback) {
     
      for (let num of array) {

        await promise.push(callback(num));
      }
    }
    const start = async () => {
      let dataToState = [];
      await asyncForEach(JSONData.id,  async id => {
        await axios
          .get(`https://api.foursquare.com/v2/venues/${id}`, {
            params: qs
          })
          .then(res => res.data.response)
          .catch(err => console.log(err))
          .then(data => {
            console.log(data)
            dataToState.push({
              id: data.venue.id,
              name: data.venue.name,
              photo: data.venue.bestPhoto.prefix + "1024" + data.venue.bestPhoto.suffix,
              coords: [data.venue.location.lat, data.venue.location.lng]
              
            });
          });
      });
      console.log("here")
      await Promise.all(promise).then((res) => {
        console.log("done", res)
        this.setState({
          places: dataToState
        })
      });
      
    };
    start();

   
  }
  listViewOpenHandler = () => {
    this.setState(prevState => ({
      shouldListViewOpen: !prevState.shouldListViewOpen
    }));
  };
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Navbar listViewOpenHandler={this.listViewOpenHandler} />
        <ListView mainState = {this.state} />
        <Map places = {this.state.places}/>
      </div>
    );
  }
}

export default App;
