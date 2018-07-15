import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";

//Shelfchanger Component, which changes the shelf of the selected book
class Shelfchanger extends Component {
  //Change Handler which handles the book change
  changeHandler = e => {
    const book = this.props.book;
    BooksAPI.update(
      {
        id: book.id
      },
      e.target.value
    ).then(data => data);
    return (
      this.props.shelfUpdateHandler &&
      this.props.shelfUpdateHandler({
        id: book.id,
        shelf: e.target.value,
        bookInfo: book
      })
    );
  };

  //Removing the focus from any other options
  handleFocus = event => {
    let defaultValue = "none";
    this.props.booksInShelf.some(
      book => book.id === this.props.book.id && (defaultValue = book.shelf)
    );
    event.target.value = defaultValue;
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
