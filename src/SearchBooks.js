import React from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'

class SearchBooks extends React.Component {
	state = {
		searchQueryValue: ""
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
	clearQuery = () => this.updateSearchQuery('')

	render() {
		const { books, shelves, onShelfChange } = this.props
		const { searchQueryValue } = this.state
		const showingBooks = searchQueryValue === ''
			? []
			: this.filterBooks(books, searchQueryValue)

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
							{showingBooks.length === 0 
								? "No books found 🙁"
								: `Showing ${showingBooks.length} of ${books.length} books`}
						</span>
						<button onClick={this.clearQuery}>Clear Search</button>
					</div>
				)}
				<div className="search-books-results">
					<ol className="books-grid"></ol>
				</div>
				<BooksGrid books={showingBooks} shelves={shelves} onShelfChange={onShelfChange} />
			</div>
		)
	}
}

export default SearchBooks
