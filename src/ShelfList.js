import React from "react";
import Shelf from "./Shelf";
import PropTypes from "prop-types";

const ShelfList = ({ shelves, onShelfChange}) => (
	<div className="list-books-content">
		{shelves.map((shelf, i) => (
			shelf.value !== "none" &&
				<Shelf
					key={i}
					name={shelf.name}
					books={shelf.books}
					shelves={shelves}
					onShelfChange={onShelfChange}
				/>
		))}
	</div>
);

ShelfList.propTypes = {
	books: PropTypes.array.isRequired,
	shelves: PropTypes.array.isRequired,
	onShelfChange: PropTypes.func.isRequired
};

export default ShelfList;
