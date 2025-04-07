# Deprecated Components

This folder contains components that are no longer actively used in the application. They have been moved here to maintain a record of their implementation while preventing build issues that may arise from their dependencies.

## SocialMediaStoryGenerator and SocialMediaStoryTemplate

These components were designed to create shareable social media story images for tours. They were deprecated due to:

1. **Build Issues**: The components rely on `html2canvas` which causes build errors in certain environments, particularly on Windows.

2. **Canvas Dependency**: The components required canvas support which is not available in all environments.

3. **Performance Concerns**: The canvas-based screenshot approach was resource-intensive for client-side operations.

If social media sharing functionality is needed in the future, consider implementing:

- Server-side image generation
- API-based solutions (e.g., Cloudinary's image transformation)
- Native sharing APIs where available

## ColorPaletteGenerator

This version of the ColorPaletteGenerator component was moved to the deprecated folder because:

1. **Canvas Dependency**: The original component relies on `color-thief-node` which depends on `canvas`, causing build issues on certain environments, particularly on Windows.

2. **Node.js Limitation**: The `color-thief-node` library is designed for Node.js environments and not browser environments.

The current implementation of ColorPaletteGenerator already handles the browser vs. Node.js environments gracefully by falling back to a default palette in the browser, so this deprecated version serves as a reference implementation that doesn't require the native dependencies.

For PDF generation, we continue to use `jspdf` which has proven more reliable across different environments.
