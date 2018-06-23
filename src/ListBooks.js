import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RenderBooks from './RenderBooks';

class ListBooks extends Component {
    handleStatusChange = (book, status) => {
        this.props.onStatusChange(book, status)
    }

    render () {
        const  currentlyReading  = this.props.books.filter((e) => e.shelf === "currentlyReading")
        const wantToRead  = this.props.books.filter((e) => e.shelf === "wantToRead")
        const  read  = this.props.books.filter((e) => e.shelf === "read")

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            { currentlyReading.length > 0 &&
                                <RenderBooks books={currentlyReading} handleStatusChanged={(book, status) => this.handleStatusChange(book, status)} />
                            }
                        </div>                        
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            { wantToRead.length > 0 &&
                                <RenderBooks books={wantToRead} handleStatusChanged={(book, status) => this.handleStatusChange(book, status)} />
                            }
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            { read.length > 0 &&
                                <RenderBooks books={read} handleStatusChanged={(book, status) => this.handleStatusChange(book, status)} />
                            }
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