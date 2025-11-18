import React from 'react';

const Filters = ( { locations, departments, selectedLocation, selectedDepartment, onLocationChange, onDepartmentChange } ) => (
	<div className="fm-careers-webflow-filters" id="fm-careers-webflow-filters">
		<div className="fm-careers-webflow-select-container">
			<select
				className="fm-careers-webflow-select fm-careers-webflow-select-location"
				value={ selectedLocation }
				onChange={ ( e ) => onLocationChange( e.target.value ) }
			>
				<option value="">Select All Locations</option>
				{ locations && locations.map( ( loc ) => (
					<option key={ loc } value={ loc }>{ loc }</option>
				) ) }
			</select>
		</div>
		<div className="fm-careers-webflow-select-container">
			<select
				className="fm-careers-webflow-select fm-careers-webflow-select-department"
				value={ selectedDepartment }
				onChange={ ( e ) => onDepartmentChange( e.target.value ) }
			>
				<option value="">Select All Departments</option>
				{ departments && departments.map( ( dep ) => (
					<option key={ dep.id } value={ dep.id }>{ dep.name }</option>
				) ) }
			</select>
		</div>
	</div>
);

export default Filters;
