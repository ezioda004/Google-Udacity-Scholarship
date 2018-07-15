import React from "react";
import { Link, Route } from "react-router-dom";
import Search from "./Search";
import Bookshelf from "./Bookshelf";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

//Parent Component
class BooksApp extends React.Component {
  state = {
    books: ""
  };
  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({ books: data });
    });
  }

  shelfUpdateHandler = data => {
    this.setState(prevState =>
      prevState.books.map(
        book => (book.id === data.id ? (book.shelf = data.shelf) : book.shelf)
      )
    );
    !this.state.books.some(book => book.id === data.id)
      ? this.setState(prevState => {
          const booksArray = prevState.books.slice();
          booksArray.push(Object.assign(data.bookInfo, { shelf: data.shelf }));
          return { books: booksArray };
        })
      : null;
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <Search
              booksInShelf={this.state.books}
              shelfUpdateHandler={this.shelfUpdateHandler}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <Bookshelf
                allBooks={this.state.books}
                shelfUpdateHandler={this.shelfUpdateHandler}
              />
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
