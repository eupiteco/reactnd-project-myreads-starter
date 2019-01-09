import React from 'react'

const ShelfPicker = ({ book, onShelfChange, shelves }) => {
	const shelfList = shelves.map( (shelf, i) => {
		const isSelected = shelf.value === book.shelf ? '✓ ' : ''
		return(
			<option
				key={i}
				value={shelf.value}
			>{isSelected}{shelf.name}</option>
		)
	})

	return(
		<div className="book-shelf-changer">
			<select onChange={(e) => onShelfChange(book, e.target.value)}>
				<option value="move">Move to...</option>
				{shelfList}
			</select>
		</div>
	)
}

export default ShelfPicker
