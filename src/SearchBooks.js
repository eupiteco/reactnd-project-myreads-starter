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
	render() {
		const { books, shelves } = this.props
		const { searchQueryValue } = this.state
		const showingBooks = searchQueryValue === ''
		? []
		: books.filter(book =>
			book.title.toLowerCase().includes(searchQueryValue.toLowerCase()) ||
			book.authors.toString().toLowerCase().includes(searchQueryValue.toLowerCase())
			)

		return(
			<div className="search-books">
				<div className="search-books-bar">
					<Link to='/'>
						<button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
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
				<div className="search-books-results">
					<ol className="books-grid"></ol>
				</div>
				<BooksGrid books={showingBooks} shelves={shelves}/>
			</div>
		)
	}
}

export default SearchBooks
