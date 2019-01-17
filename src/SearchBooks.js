import React from "react";
import { Link } from "react-router-dom";
import BooksGrid from "./BooksGrid";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";

class SearchBooks extends React.Component {
	state = {
		searchQueryValue: "",
		foundBooks: [],
	};

	static propTypes = {
		shelves: PropTypes.array.isRequired,
		onShelfChange: PropTypes.func.isRequired
	};

	isComponentMounted = false;

	getBooksFromShelves = () => {
		let list = [];
		this.props.shelves.forEach( shelf => list = list.concat(shelf.books));
		return list;
	}
	updateComponentState = (query) => {
		this.updateSearchQuery(query);
		this.searchBooks(query, this.getBooksFromShelves());
	}

	updateSearchQuery = (query) => {
		this.setState(() => ({
			searchQueryValue: query,
		}));
	}

	searchBooks(searchQuery, shelfBooks) {
		if (searchQuery !== "") {
			BooksAPI.search(searchQuery)
			.then((books) => {
				if(this.isComponentMounted){
					books = books.map( book => {
						shelfBooks.forEach( shelfBook => {
							if (book.id === shelfBook.id) {
								book = {...book, shelf: shelfBook.shelf};
							}
						});
						return book;
					});
					this.setState(() => ({
						foundBooks: books
					}));
				}
			});
		}
	}

	clearQuery = () => this.updateSearchQuery("");
	
	componentDidMount(){
		this.isComponentMounted = true;
	}

	componentWillUnmount(){
		this.isComponentMounted = false;
	}

	render() {
		const { shelves, onShelfChange } = this.props;
		const { searchQueryValue, foundBooks} = this.state;
		const showingBooks = searchQueryValue === "" || foundBooks.error
		? []
		: foundBooks

		return(
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/">
						<button className="close-search">Close</button>
					</Link>
					<div className="search-books-input-wrapper">
						<input 
							type="text"
							placeholder="Search by title or author"
							value={searchQueryValue}
							onChange={(e) => this.updateComponentState(e.target.value)}
						/>
					</div>
				</div>
				{ searchQueryValue !== "" && (
					<div className="showing-books">
						<span>
							{showingBooks.length === 0 
								? "No books found 🙁"
								: null }
						</span>
						<button onClick={this.clearQuery}>Clear Search</button>
					</div>
				)}
				<div className="search-books-results">
					<ol className="books-grid"></ol>
				</div>
				<BooksGrid books={showingBooks} shelves={shelves} onShelfChange={onShelfChange} />
			</div>
		);
	}
}

export default SearchBooks;
