import React from "react";
import BooksGrid from "./BooksGrid";
import PropTypes from "prop-types";

const Shelf = ({ name, books, shelves, onShelfChange}) => {
		return(
		<div className="bookshelf">
			<h2 className="bookshelf-title">{name}</h2>
			<div className="bookshelf-books">
				<BooksGrid onShelfChange={onShelfChange} books={books} shelves={shelves} />
			</div>
		</div>
	);
}

Shelf.propTypes = {
	name: PropTypes.string.isRequired,
	books: PropTypes.array.isRequired,
	shelves: PropTypes.array.isRequired,
	onShelfChange: PropTypes.func.isRequired
};

export default Shelf;
