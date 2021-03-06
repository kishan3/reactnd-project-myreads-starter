import React from 'react'

const RenderBooks = ({books, handleStatusChanged}) => (
    <div>
    {books.length > 0 && (
        <div className="bookshelf-books"> 
            <ol className="books-grid">
                {books.map((book) => (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                            {book.imageLinks &&
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>}
                            <div className="book-shelf-changer">
                                <select defaultValue={book.shelf} onChange={(event) => handleStatusChanged(book, event.target.value)} >
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                        </div>
                    </li> 
                ))}
            </ol>
        </div>
    )}
    </div>
)

export default RenderBooks;