import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";

class Shelfchanger extends Component {
  changeHandler = (e) => {
      console.log(e.target.value);
    BooksAPI.update({id: e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("id")}, e.target.value).then(data => console.log(data));
  };
  handleFocus = (event) => {
    
    event.target.value = 'move';
  }
  render() {
    return (
      <div className="book-shelf-changer">
        <select onChange={this.changeHandler} onFocus={this.handleFocus}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default Shelfchanger;
