import React, { Component } from "react";
import "./ListView.css";
class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }
  inputChangeHandler = e => {
    this.setState({
      query: e.target.value
    });
  };
  render() {
    console.log(this.props);
    const list =
      this.props.mainState.places &&
      this.props.mainState.places
        .filter(items => items.name.toLowerCase().includes(this.state.query))
        .map(val => (
          <div className="list" role="button" key={val.id}>
            {val.name}
          </div>
        ));
    return (
      <div
        className={`list-view ${
          this.props.mainState.shouldListViewOpen ? `open` : ``
        }`}
      >
        <div className="location-search">
          <input
            type="text"
            placeholder="Search Location"
            value={this.state.query}
            onChange={this.inputChangeHandler}
          />
        </div>
        <div className="list-render">{list}</div>
      </div>
    );
  }
}

export default ListView;
