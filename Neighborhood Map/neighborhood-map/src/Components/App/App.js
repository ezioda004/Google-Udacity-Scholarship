import React, { Component } from "react";
import axios from "axios";
import Map from "../Maps/Maps";
import Navbar from "../Navbar/Navbar";
import ListView from "../ListView/ListView";
import Error from "../Error/Error";
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
      idClicked: "",
      errorDisplay: ""
    };
  }

  //AJAX calls are made here
  componentDidMount() {
    let qs = {
      client_id: "IPHUUSHUMPLI3KOW0T0HTJJEOHYNGG3V5FJEVSXSL52EWGAL",
      client_secret: "0HB1V2JIBVVZLKNIJ233OYLHNFULTLH4WOEG2K2WJFR3ENOH",
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
          .catch(err => {
            new Error(console.log(err));
            if (err.toString().includes(429)) {
              const error =
                "FourSquare API quota has been exceeded. Check console for more errors";
              console.log(error);
              this.setState({
                errorDisplay: error
              });
            }
          })
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
          })
          .catch(err => {
            this.setState(prevState => ({
              errorDisplay:
                prevState.errorDisplay.length === 0
                  ? `The following error in preventing the app from rendering data. ${err.toString()}. 
                             Check console for more details`
                  : prevState.errorDisplay
            }));
            new Error(console.log(err));
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

  authFailedError = (error) => {
    this.setState({
      errorDisplay: error
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar listViewOpenHandler={this.listViewOpenHandler} />
        {console.log(this.state.errorDisplay)}
        {this.state.errorDisplay && (
          <Error errorDisplay={this.state.errorDisplay} />
        )}
        <ListView
          mainState={this.state}
          listFilterHandler={this.listFilterHandler}
          listItemClickedHandler={this.listItemClickedHandler}
        />
        <Map
          role="main"
          places={this.state.places}
          query={this.state.query}
          idClicked={this.state.idClicked}
          authFailedError = {this.authFailedError}
        />
      </div>
    );
  }
}

export default App;
