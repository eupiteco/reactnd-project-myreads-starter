import React from 'react'
import BooksGrid from './BooksGrid'

const Shelf = ({ name, books }) => {
		return(
		<div className='bookshelf'>
			<h2 className='bookshelf-title'>{name}</h2>
			<div className='bookshelf-books'>
				<BooksGrid books={books} />
			</div>
		</div>
	)
}

export default Shelf
