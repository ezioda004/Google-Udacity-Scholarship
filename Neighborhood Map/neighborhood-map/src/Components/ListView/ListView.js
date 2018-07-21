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
    return (
      <div
        className={`list-view ${this.props.shouldListViewOpen ? `open` : ``}`}
      >
        <div className="location-search">
          <input
            type="text"
            placeholder="Search Location"
            value={this.state.query}
            onChange={this.inputChangeHandler}
          />
        </div>
        <div className="list-render">
          <div>Hello world</div>
          <div> some tex </div>
        </div>
      </div>
    );
  }
}

export default ListView;
