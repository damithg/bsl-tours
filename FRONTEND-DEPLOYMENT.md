# Frontend Deployment Guide

This guide explains how to deploy the frontend to your IONOS Windows hosting environment.

## Prerequisites

- Access to your IONOS hosting control panel
- FTP credentials for your hosting account
- Node.js installed on your local machine

## Deployment Steps

### 1. Build the Frontend

```bash
# Make the script executable
chmod +x ./prepare-frontend.sh

# Run the build script
./prepare-frontend.sh
```

This script will:
- Build the React frontend for production
- Create a zip file (`frontend-deployment.zip`) containing all necessary files

### 2. Upload to IONOS Hosting

#### Option 1: Using FTP Client (FileZilla, WinSCP, etc.)

1. Connect to your hosting using FTP credentials
2. Extract the contents of `frontend-deployment.zip` locally
3. Upload all files to the root directory of your website (or the subdirectory where you want to host the frontend)

#### Option 2: Using IONOS File Manager

1. Log in to your IONOS control panel
2. Navigate to the file manager
3. Upload `frontend-deployment.zip`
4. Extract the zip file on the server to the desired directory

### 3. Configure Web Server (if needed)

If you're hosting in a subdirectory or need special configurations:

1. Make sure the web server is configured to serve the `index.html` file for any routes
2. This is crucial for a React app with client-side routing to work properly

#### Sample web.config for IIS (Windows hosting)

Create a `web.config` file in your deployment directory with:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="React Routes" stopProcessing="true">
                    <match url=".*" />
                    <conditions logicalGrouping="MatchAll">
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                        <add input="{REQUEST_URI}" pattern="^/(api)" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="/" />
                </rule>
            </rules>
        </rewrite>
        <staticContent>
            <mimeMap fileExtension=".json" mimeType="application/json" />
            <mimeMap fileExtension=".woff" mimeType="application/font-woff" />
            <mimeMap fileExtension=".woff2" mimeType="application/font-woff2" />
        </staticContent>
    </system.webServer>
</configuration>
```

### 4. Verify Deployment

1. Open your website in a browser
2. Verify that all pages load correctly
3. Confirm API connections are working by testing tour packages, destinations, and other dynamic content

### Troubleshooting

#### API Connection Issues

- Check that `API_BASE_URL` in `client/src/lib/queryClient.ts` is correctly set to `https://api.travelnip.com`
- Verify that CORS is properly configured on the .NET API to allow requests from your frontend domain

#### Routing Issues

- If pages work on direct load but not when navigating within the app, check the web server configuration
- Make sure URL rewriting is correctly set up to serve `index.html` for all routes

#### Content Not Updating

- Make sure to clear your browser cache
- Try opening the site in an incognito/private window