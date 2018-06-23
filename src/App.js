import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import SearchBook from './SearchBook';
import ListBooks from './ListBooks';

class BooksApp extends React.Component {
  state = {
    books : []
  }

  handleStatusChange = (book, shelf) => {
    const books = this.state.books.filter((e) => e.id !== book.id)
    book.shelf = shelf
    BooksAPI.update(book, shelf)
    .then(() => {
      this.setState((currState) => ({
        books : books.concat(book)
      }))
    })
  }
  
  componentDidMount () {
    BooksAPI.getAll()
    .then((books) => {
        this.setState(() => ({
            books
        }))
    })
    
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBook
            books={this.state.books} 
            onStatusChange={(book, shelf) => {this.handleStatusChange(book, shelf)}}  
          />
        )} />
        { this.state.books.length > 0 && 
            <Route exact path="/" render={() => (
                <ListBooks
                  books={this.state.books}
                  onStatusChange={(book, shelf) => {this.handleStatusChange(book, shelf)}}
                />
            )} />
        }        
      </div>
    )
  }
}

export default BooksApp;
