import React from "react";
import Shelfchanger from "./Shelfchanger";

const Book = ({ book, shelfUpdateHandler, booksInShelf }) => {
  return (
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
          <Shelfchanger
            shelfUpdateHandler={shelfUpdateHandler}
            booksInShelf={booksInShelf}
            book={book}
          />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors[0] : ""}
        </div>
      </div>
    </li>
  );
};

export default Book;
