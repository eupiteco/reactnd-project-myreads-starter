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

	sortBooks = (shelves, books) => {
	}

	changeShelf = (book, shelf) => {
		BooksAPI.update(book, shelf)
		.then( shelves => {
			console.log(shelves)
		})
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
						<ShelfList books={books} shelves={shelves} />
						<div className="open-search">
							<Link
								to='/search'
							><button>Add a book</button></Link>
						</div>
						<button onClick={() => this.changeShelf(books[1], shelves[0].value)}>clickMe</button>
						<button onClick={() => this.getBooks()}>update</button>
					</div>
				)} />
				<Route path='/search' render={() => (<SearchBooks books={books} shelves={shelves}/>)}/>
      </div>
    )
  }
}

export default BooksApp
