import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ShelfList from './ShelfList'

class BooksApp extends React.Component {
  state = {
		books: [],
		shelves: ["Currently Reading", "Want to Read", "Read"],
  }

	componentDidMount() {
		BooksAPI.getAll()
		.then((books) => {
			this.setState(() => ({
				books
			}))
		})
	}

  render() {
		const { books, shelves } = this.state
		console.log(books)
    return (
      <div className="app">
				<div className="list-books">
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>
					<ShelfList books={books} shelves={shelves} />
				</div>
      </div>
    )
  }
}

export default BooksApp
