import React from 'react'
import BooksGrid from './BooksGrid'

const Shelf = ({ name, books, shelves, onShelfChange}) => {
		return(
		<div className='bookshelf'>
			<h2 className='bookshelf-title'>{name}</h2>
			<div className='bookshelf-books'>
				<BooksGrid onShelfChange={onShelfChange} books={books} shelves={shelves} />
			</div>
		</div>
	)
}

export default Shelf
