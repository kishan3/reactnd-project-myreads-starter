import React, { Component } from 'react'

class RenderBooks extends Component {

    render () {
        return (    
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props.books.filter((book) => (book.status) === this.props.status).map((book) => (
                        <li key={book.name}>
                            <div className="book">
                                <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.url}")` }}></div>
                                <div className="book-shelf-changer">
                                    <select onChange={(event) => this.props.handleStatusChanged(book, event.target.value)} >
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currently_reading">Currently Reading</option>
                                        <option value="want_to_read">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                                </div>
                                <div className="book-title">{book.name}</div>
                                <div className="book-authors">{book.author}</div>
                            </div>
                        </li> 
                    ))}
                </ol>
            </div>
        )
    }
}

export default RenderBooks;