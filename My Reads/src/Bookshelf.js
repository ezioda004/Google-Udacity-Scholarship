import React from "react";
import Book from "./Book";
//Bookshelf Component which seperates book in bookshelf

const Bookshelf = props => {
  const book = props.allBooks;
  return ["Currently Reading", "Want to Read", "Read"].map((val, i) => (
    <div className="list-books-content" key={i}>
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{val}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {/* Checking if book is not a falsy value or instance of Promise */}
              {!!book &&
                !(book instanceof Promise) &&
                book
                  .filter(
                    book =>
                      book.shelf.toLowerCase() ===
                      val.toLowerCase().replace(/\s/g, "")
                  )
                  .map(book => (
                    <Book
                      key={book.id}
                      booksInShelf={props.allBooks}
                      book={book}
                      shelfUpdateHandler={props.shelfUpdateHandler}
                    />
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default Bookshelf;
