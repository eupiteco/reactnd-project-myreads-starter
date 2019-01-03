import React from 'react'
import Book from './Book'

const BooksGrid = ({ books , shelves }) => (
	<div className='books-grid'>
		{ books.map((book) => (
			<Book key={book.id} book={book} shelves={shelves} />
		))}
	</div>
)

export default BooksGrid
