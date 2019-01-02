import React from 'react'
import Shelf from './Shelf'

const ShelfList = ({ books, shelves }) => {
	const filterBooks = (shelf, books) => {
		return books.filter( book => shelf.toLowerCase().replace(/\s/g,'') === book.shelf.toLowerCase() )
	}
	return (
		<div className='list-books-content'>
			{shelves.map((shelf, i) => (
				<Shelf key={i} name={shelf} books={filterBooks(shelf, books)} />
			))}
		</div>
	)
}

export default ShelfList
