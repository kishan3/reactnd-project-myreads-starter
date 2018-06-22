import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RenderBooks from './RenderBooks';
import { STATUS_CODES } from 'http';

class ListBooks extends Component {
    handleStatusChange = (book, status) => {
        console.log('books', book, status)
        this.props.onStatusChange(book, status)
    }

    render () {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <RenderBooks books={this.props.books} status="currently_reading" handleStatusChanged={(book, status) => this.handleStatusChange(book, status)} />
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <RenderBooks books={this.props.books} status="want_to_read" handleStatusChanged={(book, status) => this.handleStatusChange(book, status)} />
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <RenderBooks books={this.props.books} status="read" handleStatusChanged={(book, status) => this.handleStatusChange(book, status)} />
                    </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks;