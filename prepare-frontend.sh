#!/bin/bash

# Set the NODE_ENV to production
export NODE_ENV=production

# Build only the frontend for production (not the server since we're using .NET API)
echo "Building frontend for production..."
npx vite build --outDir=client/frontend-dist

# Copy web.config for IIS hosting
echo "Copying web.config for IIS..."
cp web.config client/frontend-dist/

# Create a deployment package
echo "Creating deployment package..."
cd client/frontend-dist
tar -czvf ../../frontend-deployment.tar.gz .
cd ../..

echo "Deployment package created: frontend-deployment.tar.gz"
echo "You can now upload this package to your IONOS hosting."
echo "Production API URL is currently set to: $(grep 'API_BASE_URL' ./client/src/lib/queryClient.ts | grep -v '//' | tail -1)"