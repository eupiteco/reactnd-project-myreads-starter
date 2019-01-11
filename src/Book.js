import React from 'react'
import ShelfPicker from './ShelfPicker'
import PropTypes from 'prop-types'

const Book = ({ book, shelves, onShelfChange}) => {
	return (
		<div className="book">
			<div className='book-top'>
				<div className='book-cover'
					style={{
						width: 128,
						height: 193,
						backgroundImage: `url(${
							book.imageLinks
								? book.imageLinks.thumbnail
								: null
						})`
					}}
				></div>
				<ShelfPicker
					book={book}
					shelves={shelves}
					onShelfChange={onShelfChange}
				/>
			</div>
			<div className='book-title'>{book.title}</div>
			<div className='book-authors'>
				{ book.authors
					? ( book.authors.map( (author,i) => 
							<div key={i}>{author}</div>
						)
					) : null }
			</div>
		</div>
	);
}

Book.propTypes = {
	book: PropTypes.object.isRequired,
	shelves: PropTypes.array.isRequired,
	onShelfChange: PropTypes.func.isRequired
}

export default Book;
