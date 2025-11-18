import React from 'react';
import RoleRow from './RoleRow';

const RolesList = ( { roles, onRoleClick, onClearFilters } ) => (
	<div className="fm-careers-webflow-roles-list">
		{ roles && roles.length > 0 ? (
			roles.map( ( role, idx ) => {
				return (
					<RoleRow 
						key={ role.title + role.jobLocation } 
						role={ role } 
						isLast={ idx === roles.length - 1 } 
						onClick={ () => onRoleClick( role ) } 
					/>
				);
			} )
		) : (
			<div className="fm-careers-webflow-roles-list-empty">
				<p>
					No jobs found. <a href="#fm-careers-webflow-filter-reset" onClick={ ( e ) => {
						e.preventDefault();
						onClearFilters();
					} }>Reset filters</a>
				</p>
			</div>
		) }
	</div>
);

export default RolesList;
