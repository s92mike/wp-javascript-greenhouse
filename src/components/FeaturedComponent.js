import React from 'react';
import RolesList from './RolesList';
import { useCareersApi } from '../hooks/useCareersApi';

const FeaturedComponent = () => {
	const { featuredListings, loading, error } = useCareersApi();

	if ( loading ) {
		return (
			<div className="fm-careers-webflow">
				<div className="fm-careers-webflow-loading">
					<p>Loading featured roles...</p>
				</div>
			</div>
		);
	}

	if ( error ) {
		return (
			<div className="fm-careers-webflow">
				<div className="fm-careers-webflow-error">
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
		<div className="fm-careers-webflow fm-careers-webflow--featured">
			<div className="fm-careers-webflow-container">
				<h2 className="fm-careers-webflow-title">Featured Roles</h2>
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
