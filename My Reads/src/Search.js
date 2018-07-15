import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
//Search Component which makes query to the DB
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      data: ""
    };
  }

  //Querying the DB
  searchHandler = e => {
    const query = e.target.value;
    this.setState({
      query
    });
    BooksAPI.search(e.target.value).then(data =>
      this.setState({ data: query === "" ? "" : data })
    );
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={this.searchHandler}
              value={this.state.query}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {typeof this.state.data === "object" &&
            !("error" in this.state.data)
              ? this.state.data.map(book => (
                  <Book
                    key={book.id}
                    shelfUpdateHandler={this.props.shelfUpdateHandler}
                    booksInShelf={this.props.booksInShelf}
                    book={book}
                  />
                ))
              : ""}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
