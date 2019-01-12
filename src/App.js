import React from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import SearchBooks from "./SearchBooks";
import ShelfList from "./ShelfList";

class BooksApp extends React.Component {
	state = {
		books: [],
		shelves: [
			{ name: "Currently Reading", value: "currentlyReading" },
			{ name: "Want to Read", value: "wantToRead" },
			{ name: "Read", value: "read" },
			{ name: "None", value: "none" },
		],
	};

	getBooksFromAPI = () => {
		BooksAPI.getAll()
		.then((books) => {
			this.setState(() => ({
				books
			}));
		})
	}

	/* Altera a prateleira utilizando a ID do livro selecionado para iterar
	 * pelo array this.state.books*/
	updateShelf = (selectedBook, newShelf) => {
		console.log(this.isBookIntoCollection(selectedBook, this.state.books));
		this.isBookIntoCollection(selectedBook, this.state.books)
		? this.changeShelf(selectedBook, newShelf)
		: this.putBookIntoShelf(selectedBook, newShelf)
		BooksAPI.update(selectedBook, newShelf);
	}

	/* Verifica se o livro está em uma prateleira para definir se ele será
	 * ou não adicionado ao this.state.books */
	isBookIntoCollection = (selectedBook, bookCollection) => {
		let answer = false;
		bookCollection.forEach(book => {
			if(book.id === selectedBook.id) answer = true;
			console.log(answer); //???????????????????????
		});
		return answer;
	}
	
	putBookIntoShelf = (book, selectedShelf) => {
		console.log('put');
		this.setState((prevState) => ({
			books: prevState.books.push({...book, shelf: selectedShelf}),
		}))
	}
	changeShelf = (selectedBook, selectedShelf) => {
		console.log('change');
		this.setState((prevState) => ({
			books: prevState.books.map( book => book.id === selectedBook.id
				? ({...book, shelf: selectedShelf})
				: book),
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
		const { books, shelves } = this.state
		return (
			<div className="app">
				{/* Página inicial do app */}
				<Route exact path="/" render={() => (
					<div className="list-books">
						<div className="list-books-title">
							<h1>MyReads</h1>
						</div>
						<ShelfList
							books={books}
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
						onShelfChange={this.changeShelf}
					/>
				)} />
			</div>
		);
	}
}

export default BooksApp;
