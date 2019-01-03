import React from 'react'

const Book = ({ book, shelves }) => {

	const shelfList = shelves.map( (shelf, i) => {
		const isSelected = shelf.value === book.shelf ? '✓ ' : ''
		return(
			<option
				key={i}
				value={shelf.value}
			>{isSelected}{shelf.name}</option>
		)
	})

	return (
		<div className="book">
			<div className='book-top'>
				<div className='book-cover'
					style={{
						width: 128,
						height: 193,
						backgroundImage: `url(${book.imageLinks.thumbnail})`
					}}
				></div>
				<div className="book-shelf-changer">
					<select>
						<option value="move" disabled>Move to...</option>
						{shelfList}
					</select>
				</div>
			</div>
			<div className='book-title'>{book.title}</div>
			<div className='book-authors'>
				{book.authors.map( (author,i) => 
					<div key={i}>{author}</div>
				 )}
			</div>
		</div>
	)
}

export default Book
