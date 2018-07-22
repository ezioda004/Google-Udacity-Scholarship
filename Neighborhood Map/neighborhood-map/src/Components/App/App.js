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
      places: "",
      idClicked: ""
    };
  }
  componentDidMount() {
    let qs = {
      client_id: "4BUO0BTOATECTASVBVUHQHRYNRXPDE30PZK3J5W5JGQJQ0S0",
      client_secret: "5XHCSNGSV10BRPITBVXALG3EUGH4VCTIPOMU1JXHSRYQCEOT",
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
  listViewOpenHandler = () => {
    this.setState(prevState => ({
      shouldListViewOpen: !prevState.shouldListViewOpen
    }));
  };

  listFilterHandler = query => {
    console.log(query);
    this.setState({
      query: query
    });
  };
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
