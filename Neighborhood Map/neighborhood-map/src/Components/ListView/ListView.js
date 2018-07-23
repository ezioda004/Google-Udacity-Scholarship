import React, { Component } from "react";
import "./ListView.css";

//List View Component which shows the appropriate list
class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }

  //on input change sending the data to the main state and updating local state
  inputChangeHandler = e => {
    this.setState({
      query: e.target.value
    });
    this.props.listFilterHandler(e.target.value);
  };

  //Sending the id to the main state on click
  onClickHandler = id => {
    this.props.listItemClickedHandler(id);
  };

  render() {
    const list =
      this.props.mainState.places &&
      this.props.mainState.places
        .filter(items => items.name.toLowerCase().includes(this.state.query))
        .map(val => (
          <div
            tabIndex={0}
            onClick={e => this.onClickHandler(val.id)}
            className="list"
            role="button"
            key={val.id}
          >
            {val.name}
          </div>
        ));
    return (
      <section
        className={`list-view ${
          this.props.mainState.shouldListViewOpen ? `open` : ``
        }`}
      >
        <div className="location-search">
          <input
            id="search"
            tabIndex={0}
            type="text"
            value={this.state.query}
            onChange={this.inputChangeHandler}
            role="search"
          />
          <label htmlFor="search">Search Location </label>
        </div>
        <div className="list-render">{list}</div>
        <div className="foursquare">
          <img
            width="200px"
            src="https://ss0.4sqi.net/img/poweredByFoursquare/poweredby-one-color-cdf070cc7ae72b3f482cf2d075a74c8c.png"
            alt="Powered By Foursquare"
          />
        </div>
      </section>
    );
  }
}

export default ListView;
