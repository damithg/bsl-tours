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

For PDF generation, we continue to use `jspdf` which has proven more reliable across different environments.