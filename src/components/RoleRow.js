import React from 'react';

const RoleRow = ( { role, isLast, onClick } ) => {
	const applyUrl = `https://www.boundless.com/careers/apply/?gh_jid=${ role.id }`;

	/**
	 * Take the user to the apply page.
	 *
	 * @param {Event} e The click event.
	 */
	const onUrlClick = ( e ) => {
		// Allow others to handle the click event.
		onClick( e, role );

		// If the event is not handled, open the apply page.
		if ( ! e.defaultPrevented ) {
			e.preventDefault();

			window.open( applyUrl, '_self' );
		}
	};

	return (
		<div className={ `bl-careers-webflow-row${ isLast ? ' bl-careers-webflow-row--last' : '' }` }>
			<div className="bl-careers-webflow-row-title">
				<a href={ applyUrl }>{ role.title }</a>
			</div>
			<div className="bl-careers-webflow-row-department">{ role.departmentName }</div>
			<div className="bl-careers-webflow-row-location">{ role.jobLocation }</div>
			<div className="bl-careers-webflow-row-arrow">
				<button className="bl-careers-webflow-row-arrow-btn" onClick={ onUrlClick }>
					<span className="bl-careers-webflow-row-arrow-icon">&rarr;</span>
				</button>
			</div>
		</div>
	);
};

export default RoleRow;
