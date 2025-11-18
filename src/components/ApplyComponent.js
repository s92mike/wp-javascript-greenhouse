import React, { useEffect, useState } from 'react';

const ApplyComponent = () => {
	const [ jobId, setJobId ] = useState( null );

	useEffect( () => {
		// Get job ID from URL query parameter
		const urlParams = new URLSearchParams( window.location.search );
		const ghJid = urlParams.get( 'gh_jid' );
		setJobId( ghJid );

		// Load Greenhouse application script
		if ( ghJid ) {
			const script = document.createElement( 'script' );
			script.src = 'https://boards.greenhouse.io/embed/job_board/js?for=boundlessimmigration';
			script.async = true;
			document.body.appendChild( script );

			return () => {
				// Cleanup script when component unmounts
				if ( document.body.contains( script ) ) {
					document.body.removeChild( script );
				}
			};
		}
	}, [] );

	if ( ! jobId ) {
		return (
			<div className="fm-careers-webflow fm-careers-webflow--apply">
				<div className="fm-careers-webflow-container">
					<div className="fm-careers-webflow-error">
						<p>No job ID specified. Please select a job to apply for.</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="fm-careers-webflow fm-careers-webflow--apply">
			<div className="fm-careers-webflow-container">
				<h2 className="fm-careers-webflow-title">Apply for Position</h2>
				<p className="fm-careers-webflow-subtitle">
					Job ID: { jobId }
				</p>
				<div id="grnhse_app"></div>
			</div>
		</div>
	);
};

export default ApplyComponent;
