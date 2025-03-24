# BSL Tours Website Hosting Guide

This guide provides detailed instructions for deploying your BSL Tours website to different hosting platforms.

## Deployment Checklist

Before deploying to any platform, ensure you complete these steps:

1. Build the application
   ```bash
   npm install
   npm run build
   ```

2. Create the proper directory structure for production:
   ```bash
   mkdir -p server/public
   cp -r dist/* server/public/
   ```

3. Test locally in production mode:
   ```bash
   NODE_ENV=production npm start
   ```

## Option 1: Shared Hosting (cPanel, Plesk, etc.)

If you have a shared hosting account with a provider like GoDaddy, Bluehost, or HostGator:

### Prerequisites:
- Your hosting must support Node.js (check with your provider)
- SSH access is highly recommended

### Steps:

1. **Set up Node.js on your hosting**:
   Most shared hosting providers have a control panel option to enable Node.js or select a Node.js version.

2. **Upload your files**:
   - Use FTP/SFTP to upload the entire project folder to your host
   - Or use SSH to clone your repository

3. **Install dependencies**:
   ```bash
   npm install --production
   ```

4. **Configure a startup script**:
   Create a file named `.htaccess` in your web root with:
   ```
   RewriteEngine On
   RewriteRule ^$ http://localhost:3000/ [P,L]
   RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
   ```

5. **Set up a process manager** (if available):
   Many hosts use pm2 to keep Node.js apps running:
   ```bash
   npm install -g pm2
   pm2 start npm --name "bsl-tours" -- start
   pm2 save
   ```

6. Check with your hosting provider for specific Node.js deployment instructions, as each provider has different methods.

## Option 2: VPS or Dedicated Server

If you have a VPS or dedicated server (DigitalOcean, Linode, AWS EC2, etc.):

### Prerequisites:
- Root or sudo access to the server
- Basic Linux command line knowledge

### Steps:

1. **Connect to your server**:
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js and npm**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

3. **Install NGINX** (recommended for production):
   ```bash
   sudo apt install nginx
   ```

4. **Configure NGINX** as a reverse proxy:
   ```bash
   sudo nano /etc/nginx/sites-available/bsl-tours
   ```

   Add the following configuration:
   ```
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Enable the site**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/bsl-tours /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. **Set up a process manager**:
   ```bash
   sudo npm install -g pm2
   cd /path/to/your/app
   pm2 start npm --name "bsl-tours" -- start
   pm2 startup
   pm2 save
   ```

7. **Set up SSL** with Let's Encrypt:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

## Option 3: Heroku Deployment

Heroku is a cloud platform that makes it easy to deploy applications:

### Prerequisites:
- A Heroku account
- Heroku CLI installed on your machine

### Steps:

1. **Install Heroku CLI** (if you haven't already):
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create a Procfile** in your project root:
   ```
   web: npm start
   ```

4. **Create a postbuild script** in your package.json:
   ```json
   "scripts": {
     "postinstall": "npm run build && mkdir -p server/public && cp -r dist/* server/public/"
   }
   ```

5. **Initialize a Git repository** (if you haven't already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

6. **Create a Heroku app**:
   ```bash
   heroku create bsl-tours
   ```

7. **Deploy to Heroku**:
   ```bash
   git push heroku main
   ```

8. **Open your app**:
   ```bash
   heroku open
   ```

## Option 4: Cloud Services (AWS, Google Cloud, Azure)

Cloud platforms provide various options for deploying Node.js applications:

### AWS Elastic Beanstalk:

1. **Install the EB CLI**:
   ```bash
   pip install awsebcli
   ```

2. **Initialize your EB application**:
   ```bash
   eb init
   ```

3. **Create an environment**:
   ```bash
   eb create bsl-tours-env
   ```

4. **Deploy your application**:
   ```bash
   eb deploy
   ```

### Google Cloud Run:

1. **Build the Docker image**:
   ```bash
   docker build -t gcr.io/YOUR_PROJECT_ID/bsl-tours .
   ```

2. **Push to Google Container Registry**:
   ```bash
   gcloud auth configure-docker
   docker push gcr.io/YOUR_PROJECT_ID/bsl-tours
   ```

3. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy bsl-tours --image gcr.io/YOUR_PROJECT_ID/bsl-tours --platform managed
   ```

## Option 5: Static Hosting + Separate Backend

If you want to separate the frontend and backend:

### Frontend Deployment (Netlify, Vercel, GitHub Pages):

1. **Create a deployment configuration file**:
   
   For Netlify, create netlify.toml:
   ```toml
   [build]
     publish = "dist"
     command = "npm run build"
   ```

2. **Deploy the frontend**:
   - Connect your repository to Netlify/Vercel
   - Or upload the dist folder to any static hosting

3. **Update API URLs**:
   You'll need to update the frontend API calls to point to your separate backend URL

### Backend Deployment:

1. Follow one of the previous methods for deploying just the server portion of your application
2. Ensure CORS is configured correctly to allow requests from your frontend domain

## Domain and DNS Configuration

After deploying to any platform:

1. Purchase a domain if you don't already have one
2. Configure DNS to point to your hosting:
   - A record: Points your domain to your server's IP address
   - CNAME record: Points a subdomain to another domain (useful for services like Heroku)

3. Configure your application to use your domain name

## Troubleshooting Common Issues

- **Application doesn't start**: Check server logs, ensure Node.js version compatibility
- **"Cannot find module" errors**: Make sure all dependencies are installed
- **Path/directory issues**: Verify the server can find the static files
- **CORS errors**: Configure proper cross-origin resource sharing if using separate frontend/backend
- **Port conflicts**: Make sure the application isn't trying to use a port that's already in use

## Maintenance and Updates

To update your deployed application:

1. Make changes locally
2. Test thoroughly
3. Build the new version
4. Deploy using the same method you initially used
5. Consider setting up a CI/CD pipeline for automated deployments