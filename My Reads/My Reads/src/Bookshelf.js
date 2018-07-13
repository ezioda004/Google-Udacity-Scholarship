import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";

class Bookshelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBook: ""
    };
  }
  componentDidMount() {
    BooksAPI.getAll().then(data => this.setState({ allBook: data }));
  }
  render() {
    const book = this.state.allBook;
    return Array.from(Array("Currently Reading", "Want to Read", "Read")).map(
      (val, i) => (
        <div className="list-books-content" key={i}>
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{val}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {console.log(this.state.allBook)}
                  {!!this.state.allBook &&
                    !(this.state.allBook instanceof Promise) &&
                    book
                      .filter(
                        book =>
                          book.shelf.toLowerCase() ===
                          val.toLowerCase().replace(/\s/g, "")
                      )
                      .map((book, bookIndex) => (
                        <li key={bookIndex}>
                          <div className="book">
                            <div className="book-top">
                              <div
                                className="book-cover"
                                style={{
                                  width: 128,
                                  height: 193,
                                  backgroundImage: `url("${
                                    book.imageLinks
                                      ? book.imageLinks.thumbnail
                                      : ""
                                  }")`
                                }}
                              />
                              <div className="book-shelf-changer">
                                <select>
                                  <option value="move" disabled>
                                    Move to...
                                  </option>
                                  <option value="currentlyReading">
                                    Currently Reading
                                  </option>
                                  <option value="wantToRead">
                                    Want to Read
                                  </option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title || ""}</div>
                            <div className="book-authors">
                              {book.authors ? book.authors[0] : ""}
                            </div>
                          </div>
                        </li>
                      ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default Bookshelf;
