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
			{ name: "None", value: "none" },
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
		this.isBookIntoCollection(selectedBook, this.state.shelves)
		? this.changeShelf(selectedBook, newShelf)
		: this.putBookIntoShelf(selectedBook, newShelf)
		BooksAPI.update(selectedBook, newShelf);
	}

	/* Verifica se o livro está em uma prateleira para definir se ele será
	 * ou não adicionado ao this.state.books */
	isBookIntoCollection = (selectedBook, bookShelves) => {
		let answer = false;
		bookShelves.forEach(shelf => {
			shelf.books.forEach( book => {
				if(book.id === selectedBook.id) answer = true;
			});
		});
		return answer;
	}
	
	putBookIntoShelf = (book, selectedShelf) => {
		this.setState((prevState) => ({
			shelves: prevState.shelves.map( shelf =>
				shelf.value === selectedShelf
				? ({...shelf, books: shelf.books.push({...book, shelf: selectedShelf})})
				: shelf),
		}))
	}
	changeShelf = (selectedBook, selectedShelf) => {
		this.setState((prevState) => ({
			shelves: prevState.shelves.forEach(shelf => 
				shelf.value === selectedShelf
				? ({...shelf, books: shelf.books.push({...selectedBook, shelf: selectedShelf})})
				: shelf.books.filter( book => book.id === selectedBook.id)),
		}))
	}

	componentDidMount() {
		this.getBooksFromAPI();
	}
	componentWillUpdate(){
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
