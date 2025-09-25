import React from 'react';
import RolesList from './RolesList';
import { useCareersApi } from '../hooks/useCareersApi';

const FeaturedComponent = () => {
	const { featuredListings, loading, error } = useCareersApi();

	if ( loading ) {
		return (
			<div className="bl-careers-webflow">
				<div className="bl-careers-webflow-loading">
					<p>Loading featured roles...</p>
				</div>
			</div>
		);
	}

	if ( error ) {
		return (
			<div className="bl-careers-webflow">
				<div className="bl-careers-webflow-error">
					<p>Error loading featured roles: { error.message }</p>
				</div>
			</div>
		);
	}

	// Return early if no featured listings
	if ( ! featuredListings || featuredListings.length === 0 ) {
		return null;
	}

	return (
		<div className="bl-careers-webflow bl-careers-webflow--featured">
			<div className="bl-careers-webflow-container">
				<h2 className="bl-careers-webflow-title">Featured Roles</h2>
				<RolesList
					roles={ featuredListings }
					onRoleClick={ () => {} }
					onClearFilters={ () => {} }
				/>
			</div>
		</div>
	);
};

export default FeaturedComponent;
