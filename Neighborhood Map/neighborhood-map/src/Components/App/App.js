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
      query: "",
      places: ""
    };
  }
  componentDidMount() {
    let qs = {
      client_id: "IUCNQI1FKUOYXCCE5SOO0XY0VJ0WBZEUXJ5LN5UL5QFFLPZY",
      client_secret: "0XLENEHRPKU51H5TJAYVGYSEIOFZUZFOA2BZTP0T0ZV20D4I",
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
              coords: [data.venue.location.lat, data.venue.location.lng],
              address: data.venue.location.address,
              rating: data.venue.rating
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
  
  listFilterHandler = (query) => {
    console.log(query);
    this.setState({
      query: query
    })
  }
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Navbar listViewOpenHandler={this.listViewOpenHandler} />
        <ListView mainState = {this.state} listFilterHandler = {this.listFilterHandler}/>
        <Map places = {this.state.places} query = {this.state.query}/>
      </div>
    );
  }
}

export default App;
