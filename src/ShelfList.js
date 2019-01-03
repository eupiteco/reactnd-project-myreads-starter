import React from 'react'
import Shelf from './Shelf'

const ShelfList = ({ books, shelves }) => {
	const filterBooks = (shelf, books) => {
		return books.filter( book => shelf.value === book.shelf )
	}
	return (
		<div className='list-books-content'>
			{shelves.map((shelf, i) => (
				shelf.value !== 'none' && <Shelf key={i} name={shelf.name} books={filterBooks(shelf, books)} shelves={shelves} />
			))}
		</div>
	)
}

export default ShelfList
