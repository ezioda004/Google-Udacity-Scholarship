import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Shelfchanger from "./Shelfchanger";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      data: ""
    };
  }
  searchHandler = e => {
    this.setState({
      query: e.target.value
    });
    BooksAPI.search(e.target.value).then(data => this.setState({ data: data }));
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
                  <li id={book.id} key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url("${
                              book.imageLinks ? book.imageLinks.thumbnail : ""
                            }")`
                          }}
                        />
                        <Shelfchanger />
                      </div>
                      <div className="book-title">{book.title || ""}</div>
                      <div className="book-authors">
                        {book.authors ? book.authors[0] : ""}
                      </div>
                    </div>
                  </li>
                ))
              : ""}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
