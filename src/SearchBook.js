import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RenderBooks from './RenderBooks';
import * as BooksAPI from './BooksAPI';

class SearchBook extends Component {
    state = {
        query : '',
        results : []
    }
    
    handleStatusChange = (book, status) => {
        this.props.onStatusChange(book, status)
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
        if (query === '') {
            this.setState(() => ({
                results : []
            }))
        }
        else {
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
    }


    render () {
        const {query, results} = this.state;
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
                {results &&
                    <div className="search-books-results">
                        <RenderBooks books={results} handleStatusChanged={(book, status) => this.handleStatusChange(book, status)} />
                    </div>
                }
            </div>
        )
    }
}

export default SearchBook;