#!/bin/bash

# Boundless Careers Webflow Component Deployment Script
# This script builds and prepares the component for Webflow integration

echo "🚀 Building Boundless Careers Webflow Component..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build for production
echo "🔨 Building for production..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📁 Files ready for Webflow:"
    echo "   - dist/bl-careers-webflow.js"
    echo "   - dist/bl-careers-webflow.css"
    echo ""
    echo "🌐 To integrate with Webflow:"
    echo "   1. Upload the JS and CSS files to your Webflow project"
    echo "   2. Add React dependencies to your project's custom code"
    echo "   3. Add container elements with the specified IDs"
    echo "   4. Include the component files in your HTML"
    echo ""
    echo "📖 See WEBFLOW_INTEGRATION.md for detailed instructions"
    echo "🎯 Demo available at: dist/index.html"
else
    echo "❌ Build failed!"
    exit 1
fi
