import React, { Component } from "react";
import axios from "axios";
import Map from "../Maps/Maps";
import Navbar from "../Navbar/Navbar";
import ListView from "../ListView/ListView";
import "./App.css";
import JSONData from "../../data/places.json";

//Main component 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldListViewOpen: false,
      query: "",
      places: "",
      idClicked: ""
    };
  }

  //AJAX calls are made here
  componentDidMount() {
    let qs = {
      client_id: "FQEO25RUEMFM35MIDW50VRL14I0VQWHCBN3KZH5BS4DY4FOP",
      client_secret: "VW34HGQWPJW1ZOE0SF02TTAGKJDMGOFQCMHWSNDCZDSZ554P",
      v: "20180323"
    };

    //Using async/wait and promises to make sure all data is recieved before setState()
    let promise = [];
    async function asyncForEach(array, callback) {
      for (let num of array) {
        await promise.push(callback(num));
      }
    }
    const start = async () => {
      let dataToState = [];
      await asyncForEach(JSONData.id, async id => {
        await axios
          .get(`https://api.foursquare.com/v2/venues/${id}`, {
            params: qs
          })
          .then(res => res.data.response)
          .catch(err => console.log(err))
          .then(data => {
            dataToState.push({
              id: data.venue.id,
              name: data.venue.name,
              photo:
                data.venue.bestPhoto.prefix +
                "1024" +
                data.venue.bestPhoto.suffix,
              coords: [data.venue.location.lat, data.venue.location.lng],
              address: data.venue.location.address,
              rating: data.venue.rating
            });
          });
      });
      await Promise.all(promise).then(res => {
        this.setState({
          places: dataToState
        });
      });
    };
    start();
  }

  //Method to handle when hamburger is clicked
  listViewOpenHandler = () => {
    this.setState(prevState => ({
      shouldListViewOpen: !prevState.shouldListViewOpen
    }));
  };

  //Saving the query typed in the state
  listFilterHandler = query => {
    this.setState({
      query: query
    });
  };

  //Saving the id clicked in the list
  listItemClickedHandler = id => {
    this.setState({
      idClicked: id
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar listViewOpenHandler={this.listViewOpenHandler} />
        <ListView
          mainState={this.state}
          listFilterHandler={this.listFilterHandler}
          listItemClickedHandler={this.listItemClickedHandler}
        />
        <Map
          places={this.state.places}
          query={this.state.query}
          idClicked={this.state.idClicked}
        />
      </div>
    );
  }
}

export default App;
