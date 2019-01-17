import React from "react";
import PropTypes from "prop-types";

const ShelfPicker = ({ book, onShelfChange, shelves }) => {
	const noShelf = { name: "None", value: "none" }
	const allShelves = [...shelves, noShelf]
	const shelfList = allShelves.map( (shelf, i) => {
		const isSelected = book.shelf === shelf.value
			? "✓ "
			: !book.shelf && shelf.value === "none"
				? "✓ "
				: "";
		return(
			<option
				key={i}
				value={shelf.value}
			>{isSelected}{shelf.name}</option>
		);
	});

	return(
		<div className="book-shelf-changer">
			<select onChange={(e) => onShelfChange(book, e.target.value)}>
				<option value="move">Move to...</option>
				{shelfList}
			</select>
		</div>
	);
};

ShelfPicker.propTypes = {
	book: PropTypes.object.isRequired,
	shelves: PropTypes.array.isRequired,
	onShelfChange: PropTypes.func.isRequired
};


export default ShelfPicker;
