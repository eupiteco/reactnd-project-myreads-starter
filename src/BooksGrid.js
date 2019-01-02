import React from 'react'
import Book from './Book'

const BooksGrid = ({ books }) => (
	<div className='books-grid'>
		{ books.map((book) => (
			<Book key={book.id} book={book} />
		))}
	</div>
)

export default BooksGrid
