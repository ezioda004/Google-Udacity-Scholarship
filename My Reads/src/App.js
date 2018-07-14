import React from "react";
import { Link, Route } from "react-router-dom";
import Search from "./Search";
import Bookshelf from "./Bookshelf";
import "./App.css";

//Parent Component
class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/search" component={Search} />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <Bookshelf />
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
