#!/bin/bash

# Stop on any error
set -e

echo "🚀 Preparing BSL Tours Website for deployment..."

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 2: Build the application
echo "🔨 Building the application..."
npm run build

# Step 3: Create server/public directory structure
echo "📁 Creating server/public directory structure..."
mkdir -p server/public

# Step 4: Copy dist content to server/public
echo "📋 Copying built files to server/public..."
cp -r dist/* server/public/

# Step 5: Create a deployment package
echo "📦 Creating deployment package..."
mkdir -p deployment
cp -r dist server package.json package-lock.json tsconfig.json public deployment/
cp prepare-deployment.sh deployment/
cp DEPLOYMENT.md deployment/
cp HOSTING_GUIDE.md deployment/
cp Dockerfile deployment/
cp .dockerignore deployment/

# Step 6: Prepare the deployment directory for easy transfer
echo "🗜️ Creating deployment archive..."
cd deployment
tar -czvf ../bsl-tours-deployment.tar.gz .
cd ..

echo "✅ Deployment preparation complete!"
echo "Your deployment package is ready at: bsl-tours-deployment.tar.gz"
echo "Upload this file to your hosting provider and extract it there."
echo "Follow the instructions in DEPLOYMENT.md and HOSTING_GUIDE.md to complete the deployment process."