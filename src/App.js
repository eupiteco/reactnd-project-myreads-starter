import React from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import SearchBooks from "./SearchBooks";
import ShelfList from "./ShelfList";

class BooksApp extends React.Component {
	state = {
		shelves: [
			{ name: "Currently Reading", value: "currentlyReading", books: [] },
			{ name: "Want to Read", value: "wantToRead", books: [] },
			{ name: "Read", value: "read", books: [] },
		],
	};

	getBooksFromAPI = () => {
		BooksAPI.getAll()
		.then((APIbooks) => {
			this.setState((prevState) => ({
				shelves: prevState.shelves.map(shelf => ({
					...shelf, books: APIbooks.filter(book => {
						return book.shelf === shelf.value
					})
				})),
			}));
		})
	}

	/* Altera a prateleira utilizando a ID do livro selecionado para iterar
	 * pelo array this.state.books*/
	updateShelf = (selectedBook, newShelf) => {
		this.changeShelf(selectedBook, newShelf);
		BooksAPI.update(selectedBook, newShelf);
	}

	changeShelf = (selectedBook, selectedShelf) => {
		return this.setState(prevState => ({
			shelves: [
				...prevState.shelves.map(shelf => {
					if (shelf.value === selectedShelf) {
						selectedBook.shelf = selectedShelf
						shelf.books = [...shelf.books, selectedBook];
					}
					if (shelf.value !== selectedShelf) {
						shelf.books = shelf.books.filter(book => selectedBook.id !== book.id);
					}
					return shelf;
				}),
			]
		}))
	}

	//testing method to see what is inside of each shelf
	showBooks = () => {
		this.state.shelves.forEach( shelf => console.log(shelf.books));
	}
	componentDidMount() {
		this.getBooksFromAPI();
	}
	componentWillUpdate(nextState){
	}
	componentDidUpdate(){
	}

	render() {
		const { shelves } = this.state;
		return (
			<div className="app">
				{/* Página inicial do app */}
				<Route exact path="/" render={() => (
					<div className="list-books">
						<div className="list-books-title">
							<h1>MyReads</h1>
						</div>
						<ShelfList
							shelves={shelves}
							onShelfChange={this.updateShelf}
						/>
						<div className="open-search">
							<Link
								to="/search"
							><button>Search Books</button></Link>
						</div>
					</div>
				)} />
				{/* Página de buscas */}
				<Route path="/search" render={() => (
					<SearchBooks
						shelves={shelves}
						onShelfChange={this.updateShelf}
					/>
				)} />
			</div>
		);
	}
}

export default BooksApp;
