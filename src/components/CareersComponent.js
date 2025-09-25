import React, { useState, useEffect } from 'react';
import Filters from './Filters';
import RolesList from './RolesList';
import Pagination from './Pagination';
import { useCareersApi } from '../hooks/useCareersApi';

const CareersComponent = () => {
	const [ selectedLocation, setSelectedLocation ] = useState( '' );
	const [ selectedDepartment, setSelectedDepartment ] = useState( '' );
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const perPage = 10;

	const { departments, jobs, locations, loading, error } = useCareersApi();

	const onLocationChange = ( location ) => {
		setSelectedLocation( location );
		setCurrentPage( 1 );
	};

	const onDepartmentChange = ( department ) => {
		setSelectedDepartment( department );
		setCurrentPage( 1 );
	};

	const onClearFilters = () => {
		setSelectedDepartment( '' );
		setSelectedLocation( '' );
		setCurrentPage( 1 );
	};

	const onPageChange = ( page ) => {
		setCurrentPage( page );
		// Scroll to top of component
		const container = document.getElementById( 'bl-careers-webflow-root' );
		if ( container ) {
			container.scrollIntoView( { behavior: 'smooth', block: 'start' } );
		}
	};

	// Filter jobs based on selected filters
	const getFilteredJobs = () => {
		if ( ! jobs ) return [];

		let filteredJobs = [ ...jobs ];

		// Filter by department
		if ( selectedDepartment ) {
			filteredJobs = filteredJobs.filter( ( job ) => {
				return job.departmentId === parseInt( selectedDepartment );
			} );
		}

		// Filter by location
		if ( selectedLocation ) {
			filteredJobs = filteredJobs.filter( ( job ) => {
				return job.jobLocation === selectedLocation;
			} );
		}

		// Sort by updated date (newest first)
		filteredJobs.sort( ( a, b ) => {
			return new Date( b.updatedAt ) - new Date( a.updatedAt );
		} );

		return filteredJobs;
	};

	const filteredJobs = getFilteredJobs();
	const totalJobs = filteredJobs.length;
	const totalPages = Math.ceil( totalJobs / perPage );

	// Paginate jobs
	const paginatedJobs = filteredJobs.slice(
		( currentPage - 1 ) * perPage,
		currentPage * perPage
	);

	if ( loading ) {
		return (
			<div className="bl-careers-webflow">
				<div className="bl-careers-webflow-loading">
					<p>Loading careers...</p>
				</div>
			</div>
		);
	}

	if ( error ) {
		return (
			<div className="bl-careers-webflow">
				<div className="bl-careers-webflow-error">
					<p>Error loading careers: { error.message }</p>
				</div>
			</div>
		);
	}

	return (
		<div className="bl-careers-webflow">
			<div className="bl-careers-webflow-container">
				<h2 className="bl-careers-webflow-title">All Roles</h2>
				
				<Filters
					locations={ locations }
					departments={ departments }
					selectedLocation={ selectedLocation }
					selectedDepartment={ selectedDepartment }
					onLocationChange={ onLocationChange }
					onDepartmentChange={ onDepartmentChange }
				/>

				{ totalPages > 1 && (
					<Pagination
						currentPage={ currentPage }
						totalPages={ totalPages }
						onPageChange={ onPageChange }
					/>
				) }

				<RolesList
					roles={ paginatedJobs }
					onRoleClick={ () => {} }
					onClearFilters={ onClearFilters }
				/>

				{ totalPages > 1 && (
					<Pagination
						currentPage={ currentPage }
						totalPages={ totalPages }
						onPageChange={ onPageChange }
					/>
				) }
			</div>
		</div>
	);
};

export default CareersComponent;
