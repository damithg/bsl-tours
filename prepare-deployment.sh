#!/bin/bash

# Function to display usage information
usage() {
  echo "Usage: $0 [options]"
  echo "Options:"
  echo "  -h, --help            Display this help message"
  echo "  -f, --full            Create full-stack deployment package (default)"
  echo "  -b, --backend-only    Create backend-only deployment package"
  echo "  -a, --all             Create both deployment packages"
  exit 1
}

# Default to full deployment if no arguments provided
if [ $# -eq 0 ]; then
  FULL=true
fi

# Parse command-line arguments
while [ $# -gt 0 ]; do
  case "$1" in
    -h|--help)
      usage
      ;;
    -f|--full)
      FULL=true
      shift
      ;;
    -b|--backend-only)
      BACKEND_ONLY=true
      shift
      ;;
    -a|--all)
      FULL=true
      BACKEND_ONLY=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      usage
      ;;
  esac
done

# Ensure a clean build
echo "Cleaning previous builds..."
rm -rf dist deployment.tar.gz backend-deployment.tar.gz
npm run build

if [ "$FULL" = true ]; then
  echo "Preparing full-stack deployment package..."
  # Create a directory for the full deployment
  mkdir -p dist/deployment
  
  # Copy necessary files
  cp -r dist/public dist/index.js dist/deployment/
  cp package.json dist/deployment/
  
  # Create a minimal package.json for production
  node -e "
    const pkg = require('./package.json');
    const newPkg = {
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      main: 'index.js',
      scripts: { start: 'node index.js' },
      dependencies: pkg.dependencies,
      engines: { node: '>=16.0.0' }
    };
    require('fs').writeFileSync('./dist/deployment/package.json', JSON.stringify(newPkg, null, 2));
  "
  
  # Create the tarball
  cd dist/deployment
  tar -czf ../../deployment.tar.gz .
  cd ../..
  
  echo "Full-stack deployment package created: deployment.tar.gz"
fi

if [ "$BACKEND_ONLY" = true ]; then
  echo "Preparing backend-only deployment package..."
  # Create a directory for the backend deployment
  mkdir -p dist/backend-deployment
  
  # Copy backend files
  cp -r backend-deploy/server dist/backend-deployment/server
  cp -r backend-deploy/shared dist/backend-deployment/shared
  cp package.json dist/backend-deployment/
  
  # Create a specialized package.json for backend-only deployment
  node -e "
    const pkg = require('./package.json');
    const newPkg = {
      name: pkg.name + '-backend',
      version: pkg.version,
      description: pkg.description + ' (Backend API)',
      main: 'server/backend-index.js',
      scripts: { start: 'node server/backend-index.js' },
      dependencies: {
        '@neondatabase/serverless': pkg.dependencies['@neondatabase/serverless'],
        'connect-pg-simple': pkg.dependencies['connect-pg-simple'],
        'cors': pkg.dependencies['cors'],
        'drizzle-orm': pkg.dependencies['drizzle-orm'],
        'drizzle-zod': pkg.dependencies['drizzle-zod'],
        'express': pkg.dependencies['express'],
        'express-session': pkg.dependencies['express-session'],
        'memorystore': pkg.dependencies['memorystore'],
        'passport': pkg.dependencies['passport'],
        'passport-local': pkg.dependencies['passport-local'],
        'zod': pkg.dependencies['zod'],
        'zod-validation-error': pkg.dependencies['zod-validation-error']
      },
      engines: { node: '>=16.0.0' }
    };
    require('fs').writeFileSync('./dist/backend-deployment/package.json', JSON.stringify(newPkg, null, 2));
  "
  
  # Create the backend-specific entry point
  echo "const { createServer } = require('./server/backend-index');
  
const port = process.env.PORT || 5000;
createServer().then((server) => {
  server.listen(port, () => {
    console.log(\`Backend server listening on port \${port}\`);
  });
});" > dist/backend-deployment/index.js
  
  # Create the tarball
  cd dist/backend-deployment
  tar -czf ../../backend-deployment.tar.gz .
  cd ../..
  
  echo "Backend-only deployment package created: backend-deployment.tar.gz"
fi

echo "Deployment preparation complete."