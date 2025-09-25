import React from 'react';

const Pagination = ( { currentPage, totalPages, onPageChange } ) => {
	if ( totalPages <= 1 ) {
		return null;
	}

	const getPageNumbers = () => {
		const pages = [];
		const maxVisiblePages = 5;
		
		if ( totalPages <= maxVisiblePages ) {
			// Show all pages if total is small
			for ( let i = 1; i <= totalPages; i++ ) {
				pages.push( i );
			}
		} else {
			// Show limited pages with ellipsis
			if ( currentPage <= 3 ) {
				for ( let i = 1; i <= 4; i++ ) {
					pages.push( i );
				}
				pages.push( '...' );
				pages.push( totalPages );
			} else if ( currentPage >= totalPages - 2 ) {
				pages.push( 1 );
				pages.push( '...' );
				for ( let i = totalPages - 3; i <= totalPages; i++ ) {
					pages.push( i );
				}
			} else {
				pages.push( 1 );
				pages.push( '...' );
				for ( let i = currentPage - 1; i <= currentPage + 1; i++ ) {
					pages.push( i );
				}
				pages.push( '...' );
				pages.push( totalPages );
			}
		}
		
		return pages;
	};

	const pageNumbers = getPageNumbers();

	return (
		<div className="bl-careers-webflow-pagination">
			{ currentPage > 1 && (
				<button
					className="bl-careers-webflow-pagination-btn bl-careers-webflow-pagination-btn--prev"
					onClick={ () => onPageChange( currentPage - 1 ) }
				>
					&larr; Previous
				</button>
			) }

			<div className="bl-careers-webflow-pagination-numbers">
				{ pageNumbers.map( ( page, index ) => (
					<button
						key={ index }
						className={ `bl-careers-webflow-pagination-btn bl-careers-webflow-pagination-btn--number${
							page === currentPage ? ' bl-careers-webflow-pagination-btn--active' : ''
						}` }
						onClick={ () => {
							if ( page !== '...' ) {
								onPageChange( page );
							}
						} }
						disabled={ page === '...' }
					>
						{ page }
					</button>
				) ) }
			</div>

			{ currentPage < totalPages && (
				<button
					className="bl-careers-webflow-pagination-btn bl-careers-webflow-pagination-btn--next"
					onClick={ () => onPageChange( currentPage + 1 ) }
				>
					Next &rarr;
				</button>
			) }
		</div>
	);
};

export default Pagination;
