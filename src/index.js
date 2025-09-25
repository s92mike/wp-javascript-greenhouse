import React from 'react';
import { createRoot } from 'react-dom/client';
import CareersComponent from './components/CareersComponent';
import FeaturedComponent from './components/FeaturedComponent';
import ApplyComponent from './components/ApplyComponent';
import './styles/careers.scss';

// Default configuration
const defaultConfig = {
	apiEndpoints: {
		departments: 'https://boards-api.greenhouse.io/v1/boards/boundlessimmigration/departments',
	},
	theme: 'auto', // 'auto', 'light', 'dark'
	locale: 'en',
	companyName: 'Boundless Immigration'
};

// Initialize the component when DOM is ready
document.addEventListener( 'DOMContentLoaded', () => {
	// Initialize main careers component
	const mainContainer = document.getElementById( 'bl-careers-webflow-root' );
	if ( mainContainer ) {
		const root = createRoot( mainContainer );
		root.render( <CareersComponent config={defaultConfig} /> );
	}

	// Initialize featured component
	const featuredContainer = document.getElementById( 'bl-careers-webflow-featured' );
	if ( featuredContainer ) {
		const root = createRoot( featuredContainer );
		root.render( <FeaturedComponent config={defaultConfig} /> );
	}

	// Initialize apply component
	const applyContainer = document.getElementById( 'bl-careers-webflow-apply' );
	if ( applyContainer ) {
		const root = createRoot( applyContainer );
		root.render( <ApplyComponent config={defaultConfig} /> );
	}
} );

// Export for external use
window.BLCareersWebflow = {
	CareersComponent,
	FeaturedComponent,
	ApplyComponent,
	config: defaultConfig,
	init: ( containerId, componentType = 'main', customConfig = {} ) => {
		const container = document.getElementById( containerId );
		if ( container ) {
			const root = createRoot( container );
			const config = { ...defaultConfig, ...customConfig };
			let component;
			
			switch ( componentType ) {
				case 'featured':
					component = <FeaturedComponent config={config} />;
					break;
				case 'apply':
					component = <ApplyComponent config={config} />;
					break;
				default:
					component = <CareersComponent config={config} />;
			}
			
			root.render( component );
		}
	},
	setConfig: (newConfig) => {
		Object.assign(defaultConfig, newConfig);
		window.BLCareersWebflow.config = defaultConfig;
	},
	// Utility methods for Webflow integration
	refresh: () => {
		// Re-initialize all components with current config
		const containers = ['bl-careers-webflow-root', 'bl-careers-webflow-featured', 'bl-careers-webflow-apply'];
		containers.forEach(containerId => {
			const container = document.getElementById(containerId);
			if (container) {
				container.innerHTML = '';
				window.BLCareersWebflow.init(containerId, 'main');
			}
		});
	}
};
