import React from 'react'
import Book from './Book'

const BooksGrid = ({ books , shelves, onShelfChange}) => (
	<div className='books-grid'>
		{ books.map((book) => (
			<Book key={book.id} book={book} shelves={shelves} onShelfChange={onShelfChange}/>
		))}
	</div>
)

export default BooksGrid
