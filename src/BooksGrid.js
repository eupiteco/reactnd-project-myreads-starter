import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

const BooksGrid = ({ books , shelves, onShelfChange}) => (
	<div className="books-grid">
		{ books.map((book) => (
			<Book key={book.id} book={book} shelves={shelves} onShelfChange={onShelfChange}/>
		))}
	</div>
);

BooksGrid.propTypes = {
	books: PropTypes.array.isRequired,
	shelves: PropTypes.array.isRequired,
	onShelfChange: PropTypes.func.isRequired
};


export default BooksGrid;
