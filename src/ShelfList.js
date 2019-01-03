import React from 'react'
import Shelf from './Shelf'

const ShelfList = ({ books, shelves, onShelfChange}) => {
	const sortBooks = (shelf, books) => (
		books.filter( book => shelf.value === book.shelf )
	)
	
	return (
		<div className='list-books-content'>
			{shelves.map((shelf, i) => (
				shelf.value !== 'none' &&
					<Shelf
						key={i}
						name={shelf.name}
						books={sortBooks(shelf, books)}
						shelves={shelves}
						onShelfChange={onShelfChange}
					/>
			))}
		</div>
	)
}

export default ShelfList
