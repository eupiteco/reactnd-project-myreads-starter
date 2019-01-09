import React from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {
	state = {
		searchQueryValue: "",
		foundBooks: [],
	}

	updateSearchQuery = (query) => {
		this.setState(() => ({
			searchQueryValue: query
		}))
	}

	filterBooks(books, filterQuery) {
		let filteredBooks = books
		filterQuery.trim().split(' ').forEach(word => 
			filteredBooks = filteredBooks.filter(book =>
				book.title.toLowerCase().includes(word.toLowerCase()) ||
				book.authors.toString().toLowerCase().includes(word.toLowerCase())
			)
		)
		return filteredBooks
	}

	searchBooks(searchQuery) {
		if (searchQuery !== "") {
			BooksAPI.search(searchQuery)
			.then((books) => {
				this.setState(() => ({
					foundBooks: books
				}))
			})
		}
	}

	clearQuery = () => this.updateSearchQuery("")
	
	componentDidMount(){
		this.searchBooks(this.state.searchQueryValue)
		console.log(this.state.foundBooks)
	}

	render() {
		const { shelves, onShelfChange } = this.props
		const { searchQueryValue, foundBooks} = this.state
		console.log(foundBooks)

		return(
			<div className="search-books">
				<div className="search-books-bar">
					<Link to='/'>
						<button className="close-search">Close</button>
					</Link>
					<div className="search-books-input-wrapper">
						<input 
							type="text"
							placeholder="Search by title or author"
							value={searchQueryValue}
							onChange={(e) => this.updateSearchQuery(e.target.value)}
						/>
					</div>
				</div>
				{ searchQueryValue !== '' && (
					<div className='showing-books'>
						<span>
							{foundBooks.length === 0 
								? "No books found 🙁"
								: null }
						</span>
						<button onClick={this.clearQuery}>Clear Search</button>
					</div>
				)}
				<div className="search-books-results">
					<ol className="books-grid"></ol>
				</div>
				<BooksGrid books={foundBooks} shelves={shelves} onShelfChange={onShelfChange} />
			</div>
		)
	}
}

export default SearchBooks
