import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";

//Shelfchanger Component, which changes the shelf of the selected book
class Shelfchanger extends Component {

  //Change Handler which handles the book change
  changeHandler = e => {
    const bookId = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("id");
    BooksAPI.update(
      {
        id: bookId
      },
      e.target.value
    ).then(data => data);
    return this.props.shelfUpdateHandler && this.props.shelfUpdateHandler({ id: bookId, shelf: e.target.value });
  };

  //Removing the focus from any other options
  handleFocus = event => {
    event.target.value = "move";
  };

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
