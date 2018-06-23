import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';

class SearchBook extends Component {
    state = {
        query : '',
        results : []
    }
      
    updateQuery = (query) => {
        const books = this.searchBook(query)
        this.setState(() => ({
            query : query,
            books
        }))    
    }

    updateShelfValue = (res) => {
        const value = this.props.books.filter((e) => e.id === res.id)
        if (this.props.books.some((e) => e.id === res.id)) {
            res.shelf = value[0].shelf
        }
        else {
            res.shelf = 'none'
        }
        return res
    }

    searchBook = (query) => {
        BooksAPI.search(query)
        .then((results) => {
            const values = []
            if (results.error === undefined) {
                for (let o of results) {
                    const x = this.updateShelfValue(o)
                    values.push(x)
                }
            }
            this.setState(() => ({
                results : values
            }))
        })
    }


    render () {
        const {query} = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query}
                               onChange={(event) => this.updateQuery(
                                    event.target.value
                               )}
                        />
                    </div>
                </div>
                {this.state.results &&
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {this.state.results.map((book) => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                        {book.imageLinks &&
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>}
                                        <div className="book-shelf-changer">
                                            <select defaultValue={book.shelf} onChange={(event) => this.props.onStatusChange(book, event.target.value)} >
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
                }
            </div>
        )
    }
}

export default SearchBook;