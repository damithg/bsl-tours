# Deployment Guide for BSL Tours Website

This guide provides instructions for deploying the BSL Tours website to various hosting platforms.

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Git (optional, for version control)

## Important Note

This application expects the build output to be in the correct locations. After building, ensure:
1. The frontend assets are in the `dist` directory
2. Create a symbolic link or copy the `dist` directory to `server/public` for the production server to find the static assets:

```bash
# After building, create a directory structure the server expects
mkdir -p server/public
cp -r dist/* server/public/
```

## Preparing for Deployment

### 1. Build the Application

```bash
# Install dependencies
npm install

# Build the application
npm run build
```

This will create a `dist` directory with the compiled application.

## Deployment Options

### Option 1: Traditional Web Hosting with Node.js Support

#### Suitable for: DigitalOcean, Heroku, Render, Railway, Linode, etc.

1. Create an account with your preferred hosting provider
2. Set up a new server/app instance with Node.js support
3. Upload the entire project directory to your hosting provider
4. Set the startup command to `npm start`
5. Configure environment variables if needed
6. Start the application

### Option 2: Docker Deployment

#### Suitable for: Any platform that supports Docker (AWS, GCP, Azure, DigitalOcean, etc.)

1. Build the Docker image:
   ```bash
   docker build -t bsl-tours-website .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 bsl-tours-website
   ```

3. For cloud deployment:
   - Push your Docker image to a container registry (Docker Hub, GitHub Container Registry, etc.)
   - Deploy using your cloud provider's container service

### Option 3: Static Hosting for Frontend + Separate Backend

If your hosting provider doesn't support Node.js or you want to separate the frontend and backend:

#### For the Frontend:
1. The frontend assets are in the `dist` directory after running `npm run build`
2. Upload these files to any static hosting service (Netlify, Vercel, GitHub Pages, shared hosting)

#### For the Backend:
1. Deploy the server code to a service that supports Node.js
2. Update the frontend API calls to point to your backend URL

## Common Deployment Platforms

### Netlify (Frontend Only)

1. Create a `netlify.toml` file:
   ```toml
   [build]
     publish = "dist"
     command = "npm run build"
   ```

2. Connect your repository to Netlify and deploy

### Vercel (Frontend Only)

1. Create a `vercel.json` file:
   ```json
   {
     "version": 2,
     "builds": [
       { "src": "dist/**/*", "use": "@vercel/static" }
     ],
     "routes": [
       { "src": "/(.*)", "dest": "/dist/$1" }
     ]
   }
   ```

2. Connect your repository to Vercel and deploy

### Heroku (Full Stack)

1. Create a `Procfile`:
   ```
   web: npm start
   ```

2. Deploy to Heroku:
   ```bash
   heroku create
   git push heroku main
   ```

### DigitalOcean App Platform (Full Stack)

1. Create a new app in DigitalOcean App Platform
2. Connect your repository or upload your code
3. Set the build command to `npm run build`
4. Set the run command to `npm start`
5. Deploy the app

## Environment Variables

If your application uses environment variables, make sure to configure them in your hosting platform's settings.

## Domain Configuration

After deploying your application, you can configure a custom domain through your hosting provider's domain settings.

## Troubleshooting

If you encounter issues during deployment:

1. Check the server logs provided by your hosting platform
2. Ensure all environment variables are correctly set
3. Verify that the build process completed successfully
4. Check that the server is running on the correct port (the application listens on the port specified by the `PORT` environment variable, defaulting to 3000)