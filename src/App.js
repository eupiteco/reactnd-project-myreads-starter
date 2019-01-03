import React from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ShelfList from './ShelfList'

class BooksApp extends React.Component {
  state = {
		books: [],
		shelves: [
			{ name: 'Currently Reading', value: 'currentlyReading' },
			{ name: 'Want to Read', value: 'wantToRead' },
			{ name: 'Read', value: 'read' },
			{ name: 'None', value: 'none'},
		],
  }
	getBooks = () => {
		BooksAPI.getAll()
		.then((books) => {
			this.setState(() => ({
				books
			}))
		})
	}

	changeShelf = (selectedBook, newShelf) => {
		this.setState((prevState) => ({
			books: prevState.books.map( book => book.id === selectedBook.id 
				? ({...book, shelf: newShelf})
				: book)
		}))
		BooksAPI.update(selectedBook, newShelf)
	}

	componentDidMount() {
		this.getBooks()
	}

  render() {
		const { books, shelves } = this.state
    return (
      <div className='app'>
				<Route exact path='/' render={() => (
					<div className='list-books'>
						<div className='list-books-title'>
							<h1>MyReads</h1>
						</div>
						<ShelfList books={books} shelves={shelves} onShelfChange={this.changeShelf}/>
						<div className="open-search">
							<Link
								to='/search'
							><button>Add a book</button></Link>
						</div>
					</div>
				)} />
				<Route path='/search' render={() => (<SearchBooks books={books} shelves={shelves} onShelfChange={this.changeShelf} />)}/>
      </div>
    )
  }
}

export default BooksApp
