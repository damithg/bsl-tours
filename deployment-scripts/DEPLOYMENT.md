# Deployment Guide for Best Sri Lanka Tours Website

This guide provides detailed instructions for deploying the Best Sri Lanka Tours website using various methods.

## Table of Contents
1. [Full-Stack Deployment Options](#full-stack-deployment-options)
   - [Replit Deployment](#replit-deployment)
   - [Vercel Deployment](#vercel-deployment)
   - [Docker Deployment](#docker-deployment)
   - [Traditional Hosting (SiteGround)](#traditional-hosting-siteground)
2. [Separate Frontend/Backend Deployment](#separate-frontendbackend-deployment)
   - [Frontend-Only Deployment](#frontend-only-deployment)
   - [Backend-Only Deployment](#backend-only-deployment)
   - [Connecting Frontend to Backend](#connecting-frontend-to-backend)
3. [Environment Variables](#environment-variables)
4. [Post-Deployment Tasks](#post-deployment-tasks)

## Full-Stack Deployment Options

### Replit Deployment

The easiest way to deploy the application is directly from Replit:

1. Click the "Deploy" button at the top right of this Replit.
2. Configure your deployment settings.
3. Click "Deploy" and follow the prompts.

### Vercel Deployment

To deploy to Vercel:

1. Create a new Vercel project.
2. Link your GitHub repository.
3. Configure the following settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Development Command**: `npm run dev`
4. Add any required environment variables.
5. Click "Deploy".

### Docker Deployment

The application includes a Dockerfile for containerized deployment:

1. Build the Docker image:
   ```bash
   docker build -t bsl-tours:latest .
   ```

2. Run the container:
   ```bash
   docker run -p 5000:5000 -e NODE_ENV=production bsl-tours:latest
   ```

3. For cloud deployment (AWS, GCP, Azure):
   - Push your image to a container registry.
   - Configure your cloud service to deploy the container.
   - Set up appropriate environment variables.

### Traditional Hosting (SiteGround)

#### Full Application Deployment

1. Download the `deployment.tar.gz` file from this Replit.
2. Extract the file to get the production build.
3. In SiteGround cPanel:
   - Create a Node.js application.
   - Upload the extracted files.
   - Set the "Application Root" to the directory containing `index.js`.
   - Set the "Application URL" to your domain.
   - Configure "Application Startup File" as `index.js`.
   - Set "Node.js Version" to 20.x or higher.
   - Click "Create".

## Separate Frontend/Backend Deployment

### Frontend-Only Deployment

If you want to deploy just the frontend (useful for hosting providers without Node.js support):

1. From the Replit, run the build script:
   ```bash
   npm run build
   ```

2. Download the `dist` directory contents.
3. Upload these files to your hosting provider's web root directory.
4. Make sure to update the queryClient.ts file to point to your backend URL.

### Backend-Only Deployment

For deploying the backend separately:

1. Download the `backend-deployment.tar.gz` file.
2. Extract and deploy to a hosting provider that supports Node.js:
   - Render
   - Railway
   - Fly.io
   - Heroku
   - Vercel (as a serverless function)

3. Example for Render:
   - Create a new Web Service.
   - Connect your GitHub repo.
   - Set "Build Command" to `npm install`.
   - Set "Start Command" to `node backend-index.js`.
   - Add any required environment variables.
   - Click "Create Web Service".

### Connecting Frontend to Backend

When deploying frontend and backend separately:

1. Replace the API_BASE_URL in `frontend-modifications/queryClient.ts` with your actual backend URL:
   ```typescript
   const API_BASE_URL = "https://your-backend-url.com";
   ```

2. Copy this file to replace the original queryClient.ts before building the frontend.

3. Build the frontend with this updated file.

## Environment Variables

The application uses the following environment variables:

- `NODE_ENV`: Set to `production` for production deployments.
- `PORT`: The port number the server will listen on (default: 5000).
- `SESSION_SECRET`: Secret for session management (required for production).

## Post-Deployment Tasks

After deploying:

1. **Test All Features**: Ensure all features work as expected in the production environment.
2. **Configure DNS**: If using a custom domain, set up DNS records to point to your deployment.
3. **Setup SSL**: Enable HTTPS for your website.
4. **Monitoring**: Set up monitoring to be alerted of any issues.
5. **Backup**: Configure regular backups of your database (if applicable).

---

For any deployment issues, please contact support at [your-email@example.com].