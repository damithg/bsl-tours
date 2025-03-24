# Hosting Guide for SiteGround

This guide provides detailed instructions specifically for deploying the Best Sri Lanka Tours website on SiteGround hosting.

## Table of Contents
1. [SiteGround Hosting Options](#siteground-hosting-options)
2. [Option 1: Full Stack Deployment](#option-1-full-stack-deployment)
3. [Option 2: Frontend-Only Deployment](#option-2-frontend-only-deployment)
4. [Managing Your Website](#managing-your-website)

## SiteGround Hosting Options

SiteGround offers different hosting plans that can accommodate our application in two ways:

### Node.js Support (GoGeek or Higher Plans)
- SiteGround's GoGeek plan and Cloud Hosting plans support Node.js applications.
- This allows for full stack deployment of both the frontend and backend on the same server.

### Basic Hosting Plans
- StartUp and GrowBig plans typically don't support Node.js.
- With these plans, you can still host the static frontend but will need to host the backend elsewhere.

## Option 1: Full Stack Deployment

For GoGeek or Cloud Hosting plans with Node.js support:

1. **Prepare Your Application**
   - Download the `deployment.tar.gz` file from this Replit.
   - Extract the contents to get the production build.

2. **Access SiteGround cPanel**
   - Log in to your SiteGround account.
   - Navigate to the cPanel dashboard.

3. **Create Node.js Application**
   - In cPanel, find the "Node.js Application" section.
   - Click "Create Application".
   - Fill in the following details:
     - **Application Name**: Best Sri Lanka Tours (or your preferred name)
     - **Application Root**: The directory where you'll upload your files (e.g., /public_html/bsl-tours)
     - **Application URL**: Your domain or subdomain (e.g., https://bestsrilankatours.com)
     - **Application Startup File**: index.js
     - **Node.js Version**: Select 20.x or the latest available version
     - **Passenger Log File**: Leave as default or specify a path

4. **Upload Files**
   - Use the File Manager in cPanel or FTP to upload the extracted files to the directory you specified as Application Root.
   - Make sure to maintain the file structure from the extracted archive.

5. **Start the Application**
   - Return to the Node.js Application section.
   - Click on the "Start" button next to your application.
   - The application should now be running on your domain.

6. **Configure SSL**
   - In cPanel, find the "Security" section.
   - Click on "SSL/TLS" or "Let's Encrypt".
   - Follow the prompts to enable HTTPS for your domain.

## Option 2: Frontend-Only Deployment

For plans without Node.js support or if you prefer separate hosting for the backend:

1. **Prepare Your Frontend**
   - First, update the API base URL in your frontend code:
     - Copy the `frontend-modifications/queryClient.ts` file to `client/src/lib/queryClient.ts`
     - Update the `API_BASE_URL` to point to where your backend will be hosted.
   - Run the build command to generate static files:
     ```bash
     npm run build
     ```
   - The built files will be in the `dist` directory.

2. **Upload Frontend Files**
   - Log in to your SiteGround cPanel.
   - Use the File Manager or FTP to upload all files from the `dist` directory to your web root (typically public_html).

3. **Configure Site URL**
   - Make sure your domain points to the directory where you uploaded the files.
   - If using a subdomain, configure it in the SiteGround Domain section.

4. **Setup Backend Separately**
   - Deploy the backend on a Node.js-compatible hosting service:
     - Render
     - Railway
     - Fly.io
     - Heroku
     - Vercel (as a serverless function)
   - Follow the backend-only deployment instructions in the main DEPLOYMENT.md guide.

5. **Enable CORS on Backend**
   - Make sure your backend has CORS configured to allow requests from your frontend domain.
   - The provided `backend-deploy/server/backend-index.ts` already includes CORS configuration, but you may need to update the origin to match your frontend domain.

## Managing Your Website

### Domain Management
- In SiteGround cPanel, navigate to the "Domains" section.
- Here you can manage your primary domain and add subdomains if needed.

### SSL/HTTPS
- SiteGround provides free Let's Encrypt SSL certificates.
- Navigate to the "Security" > "SSL/TLS" section to manage certificates.

### File Management
- Use the File Manager in cPanel or connect via FTP to manage your files.
- To update your site, simply replace the files with new versions.

### Backups
- SiteGround provides daily backups that are kept for 30 days.
- You can also create manual backups from the "Backup" section in cPanel.

### Performance Optimization
- SiteGround includes the SG Optimizer plugin for WordPress sites.
- For non-WordPress sites, enable Gzip compression and leverage browser caching from the cPanel.

### Troubleshooting
- Check the Node.js Application logs for any backend errors.
- For frontend issues, use browser developer tools to inspect network requests and console errors.
- If the site isn't loading, check if the Node.js application is running (for full stack deployments).

---

For additional assistance with SiteGround hosting, refer to [SiteGround's official documentation](https://www.siteground.com/kb/) or contact their support team.