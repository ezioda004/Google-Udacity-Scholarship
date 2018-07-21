import React, { Component } from "react";
import "./ListView.css";
class ListView extends Component {

  render() {
    return (
      <div
        className={`list-view ${this.props.shouldListViewOpen ? `open` : ``}`}
      >
        <ol>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ol>
      </div>
    );
  }
}

export default ListView;
