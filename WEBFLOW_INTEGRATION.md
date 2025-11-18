# Webflow Integration Guide

This guide will help you integrate the Careers component into your Webflow project.

## 🚀 Quick Start

### 1. Add React Dependencies
In your Webflow project, go to **Project Settings > Custom Code** and add this to the `<head>` section:

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
```

### 2. Add Component Files
Upload the following files to your Webflow project:
- `fm-careers-webflow.js` (JavaScript component)
- `fm-careers-webflow.css` (Styles)

Then add these to the `<head>` section:

```html
<link rel="stylesheet" href="path/to/fm-careers-webflow.css">
<script src="path/to/fm-careers-webflow.js"></script>
```

### 3. Add Container Elements
In your Webflow page, add **HTML Embed** elements with these IDs:

```html
<!-- For main job listings -->
<div id="fm-careers-webflow-root"></div>

<!-- For featured jobs -->
<div id="fm-careers-webflow-featured"></div>

<!-- For job application form -->
<div id="fm-careers-webflow-apply"></div>
```

## 🎨 Customization

### Company Branding
```javascript
BLCareersWebflow.setConfig({
    companyName: 'Your Company Name',
    theme: 'light', // 'auto', 'light', 'dark'
    locale: 'en'
});
```

### Custom API Endpoint
```javascript
BLCareersWebflow.setConfig({
    apiEndpoints: {
        departments: 'https://boards-api.greenhouse.io/v1/boards/yourcompany/departments'
    }
});
```

## 📱 Responsive Design

The component automatically adapts to Webflow's responsive breakpoints:
- **Desktop:** Full layout with side filters
- **Tablet:** Compact layout with collapsible filters
- **Mobile:** Stacked layout optimized for touch

## 🎯 Use Cases

### Careers Page
Add the main component to display all job openings:
```html
<div id="fm-careers-webflow-root"></div>
```

### Featured Jobs Section
Add to homepage or sidebar:
```html
<div id="fm-careers-webflow-featured"></div>
```

### Job Application Page
Add to individual job pages:
```html
<div id="fm-careers-webflow-apply"></div>
```

## 🔧 Advanced Integration

### Custom Styling
Override component styles in Webflow Designer:
```css
.fm-careers-container {
    /* Your custom styles */
}

.fm-careers-filters {
    /* Custom filter styling */
}
```

### Dynamic Loading
Load components conditionally:
```javascript
// Only load on specific pages
if (window.location.pathname.includes('/careers')) {
    BLCareersWebflow.init('careers-container', 'main');
}
```

### CMS Integration
Use Webflow CMS collections to enhance the component:
```javascript
// Get CMS data and pass to component
const cmsData = window.Webflow.cms.get('careers-settings');
BLCareersWebflow.setConfig({
    companyName: cmsData.companyName,
    theme: cmsData.theme
});
```

## 🚨 Troubleshooting

### Component Not Loading
1. Check browser console for errors
2. Verify React and ReactDOM are loaded
3. Ensure container IDs match exactly
4. Check file paths are correct

### Styling Issues
1. Verify CSS file is loaded
2. Check for CSS conflicts in Webflow
3. Use browser dev tools to inspect elements

### API Errors
1. Check Greenhouse API endpoint
2. Verify CORS settings
3. Check network tab for failed requests

## 📞 Support

For integration help:
1. Check the browser console for error messages
2. Review the [main README](../README.md)
3. Open an issue on GitHub
4. Contact the development team

## 🔄 Updates

To update the component:
1. Download the latest version
2. Replace the JS and CSS files
3. Clear browser cache
4. Test functionality

The component is designed to be backward compatible, so updates should not break existing integrations.
