import { useState, useEffect, useMemo } from 'react';

/**
 * API endpoints.
 */
const departmentsEndpoint = 'https://boards-api.greenhouse.io/v1/boards/boundlessimmigration/departments';

/**
 * Custom hook for managing careers API data.
 */
export const useCareersApi = () => {
	const [ loading, setLoading ] = useState( true );
	const [ error, setError ] = useState( null );
	const [ departments, setDepartments ] = useState( [] );
	const [ jobs, setJobs ] = useState( [] );

	useEffect( () => {
		const fetchData = async () => {
			setLoading( true );
			setError( null );
			
			try {
				// Check if data is available from WordPress localization
				let departmentsJson = [];
				if ( typeof window.blCareersWebflow !== 'undefined' && window.blCareersWebflow.apiEndpoints ) {
					// Use WordPress localized data if available
					const response = await fetch( window.blCareersWebflow.apiEndpoints.departments );
					if ( ! response.ok ) {
						throw new Error( 'Failed to fetch departments' );
					}
					departmentsJson = await response.json();
				} else {
					// Fallback to direct API call
					const response = await fetch( departmentsEndpoint );
					if ( ! response.ok ) {
						throw new Error( 'Failed to fetch departments' );
					}
					departmentsJson = await response.json();
				}

				const jobsList = [];
				const departmentsList = [];

				if ( departmentsJson && departmentsJson.departments ) {
					departmentsJson.departments.forEach( ( department ) => {
						if ( department.jobs ) {
							department.jobs.forEach( ( job ) => {
								const jobLocation = getJobLocation( job );
								jobsList.push( {
									...job,
									jobLocation,
									departmentName: department.name,
									departmentId: department.id,
									updatedAt: job.updated_at,
								} );
							} );
						}
						
						if ( department.jobs && department.jobs.length > 0 ) {
							departmentsList.push( {
								id: department.id,
								name: department.name,
							} );
						}
					} );
				}

				setDepartments( departmentsList );
				setJobs( jobsList );
			} catch ( err ) {
				setError( err );
			} finally {
				setLoading( false );
			}
		};

		fetchData();
	}, [] );

	/**
	 * Get the job location.
	 *
	 * @param {Object} job The job object.
	 * @return {string} The formatted job location.
	 */
	const getJobLocation = ( job ) => {
		const seattleRegex = /Seattle/i;
		const lasVegasRegex = /Las Vegas/i;
		const remoteRegex = /Remote/i;
		const sanFranciscoRegex = /San Francisco/i;
		const cebuRegex = /Cebu/i;
		const manilaRegex = /Manila/i;
		const philippinesRegex = /Philippines/i;

		if ( seattleRegex.test( job.location.name ) ) {
			return 'Seattle, WA';
		}
		if ( lasVegasRegex.test( job.location.name ) ) {
			return 'Las Vegas, NV';
		}
		if ( remoteRegex.test( job.location.name ) ) {
			if ( job.location.name.includes( 'U.S.' ) || job.location.name.includes( 'US' ) ) {
				return 'Remote, U.S.';
			} else if ( job.location.name.includes( 'Philippines' ) ) {
				return 'Remote, Philippines';
			}
		}
		if ( sanFranciscoRegex.test( job.location.name ) ) {
			return 'San Francisco, CA';
		}
		if ( cebuRegex.test( job.location.name ) ) {
			return 'Cebu City, Philippines';
		}
		if ( manilaRegex.test( job.location.name ) ) {
			return 'Manila, Philippines';
		}
		if ( philippinesRegex.test( job.location.name ) ) {
			return 'Philippines';
		}
		return '';
	};

	/**
	 * Get unique locations from jobs.
	 */
	const locations = useMemo( () => {
		if ( ! jobs ) return [];
		
		const filteredLocations = [];
		jobs.forEach( ( job ) => {
			if ( job.jobLocation && ! filteredLocations.includes( job.jobLocation ) ) {
				filteredLocations.push( job.jobLocation );
			}
		} );
		
		return filteredLocations.sort();
	}, [ jobs ] );

	/**
	 * Get featured listings.
	 */
	const featuredListings = useMemo( () => {
		if ( ! jobs ) return [];

		const featured = [];
		jobs.forEach( ( job ) => {
			const { metadata } = job;
			if ( metadata ) {
				metadata.forEach( ( meta ) => {
					if ( ( meta.name === 'Featured Job Listing' || meta.id === 27887826003 ) && meta.value === true ) {
						featured.push( job );
					}
				} );
			}
		} );

		// Sort by updated date and limit to 3
		featured.sort( ( a, b ) => new Date( b.updatedAt ) - new Date( a.updatedAt ) );
		return featured.slice( 0, 3 );
	}, [ jobs ] );

	return {
		departments,
		jobs,
		locations,
		featuredListings,
		loading,
		error,
	};
};
