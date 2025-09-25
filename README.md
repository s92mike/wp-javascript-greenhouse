# Boundless Careers Webflow Component

A standalone React component for displaying careers/job listings, specifically designed for Webflow CMS integration. This component integrates with the Greenhouse API to display job openings without requiring any server-side dependencies.

See `demo.html` for example usage.

## 🌐 API Integration

The component integrates with the Greenhouse API endpoint:

```
https://boards-api.greenhouse.io/v1/boards/boundlessimmigration/departments
```

The bulk of the API components are in hook `useCareersAPI` in `src/hooks/useCareersApi.js`.

## 📦 Installation

### Option 1: Direct Download
1. Download the `dist/` folder contents
2. Upload to your Webflow project or external hosting
3. Include the files in your HTML

### Option 2: Build from Source
```bash
# Clone the repository
git clone https://github.com/boundlesshq/bl-careers-webflow.git
cd bl-careers-webflow

# Install dependencies
npm install --legacy-peer-deps

# Build for production
npm run build

# The built files will be in the dist/ folder
```

## 🔧 Webflow Integration

### 1. Add Dependencies
In your Webflow project, add these scripts to the `<head>` section:

### 2. Add Component Files
Upload the component files to your Webflow project or host them externally:

```html
<link rel="stylesheet" href="dist/index.css">
<script src="dist/index.js"></script>
```

### 3. Add Container Elements
Add these HTML elements where you want the components to appear:

```html
<!-- Main careers listings -->
<div id="bl-careers-webflow-root"></div>

<!-- Featured job listings -->
<div id="bl-careers-webflow-featured"></div>
```

### CSS Customization
The component uses CSS classes that can be customized in Webflow Designer:
- `.bl-careers-container` - Main container
- `.bl-careers-filters` - Filter section
- `.bl-careers-list` - Job listings
- `.bl-careers-pagination` - Pagination controls

You can customize this endpoint in the configuration if needed.

## 🧪 Development

```bash
# Use Node 22
nvm use 22

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+
