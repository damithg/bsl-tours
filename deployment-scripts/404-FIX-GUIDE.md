# Fixing 404 Errors on Route Refreshes for BSL Tours Website

This guide addresses the issue where refreshing the browser on any route other than the homepage (e.g., /contact, /about) results in a 404 error from the hosting provider.

## Why This Happens

Single Page Applications (SPAs) like our React application handle routing on the client-side. When a user navigates within the app by clicking links, the router updates the UI without a full page reload. 

However, when a user:
- Refreshes the page
- Enters a URL directly in the browser
- Bookmarks and revisits a specific page

The browser sends a request to the server for that specific URL. If the server isn't configured to handle these routes, it will return a 404 error.

## Solution Options

### Option 1: Update web.config (for IIS/Windows Hosting)

The `web.config` file in the root of your deployment should include:

```xml
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
        <httpErrors errorMode="Custom" existingResponse="Replace">
            <remove statusCode="404"/>
            <error statusCode="404" path="/" responseMode="ExecuteURL"/>
            <remove statusCode="500"/>
            <error statusCode="500" path="/" responseMode="ExecuteURL"/>
        </httpErrors>
    </system.webServer>
</configuration>
```

This configuration does two important things:
1. Rewrites any URL that doesn't match a physical file or directory to the root (/)
2. Redirects 404 errors to the root path, allowing the React router to handle the navigation

### Option 2: .htaccess (for Apache Hosting)

If your site is on Apache-based hosting, place this `.htaccess` file in your root directory:

```apache
# Enable rewriting
RewriteEngine On

# If the request is not for a file that exists
RewriteCond %{REQUEST_FILENAME} !-f
# If the request is not for a directory that exists
RewriteCond %{REQUEST_FILENAME} !-d
# If the request is not for the API
RewriteCond %{REQUEST_URI} !^/api
# Rewrite everything else to index.html to allow the SPA router to handle the route
RewriteRule ^ index.html [QSA,L]

# Custom 404 error handling
ErrorDocument 404 /index.html
```

### Option 3: Hosting Provider Configuration

Some hosting providers offer configuration through their control panel:

1. **IONOS**: 
   - In your IONOS Control Panel, navigate to the "Hosting" section
   - Find "Settings" or "Configuration"
   - Look for "Error Pages" or "Custom Error Pages"
   - Set custom error page for 404 errors to `/index.html`

2. **SiteGround**:
   - Go to Site Tools > Site > Error Pages
   - Create a custom error page for 404 redirecting to `/index.html`

3. **GoDaddy**:
   - Access cPanel
   - Find "Error Pages" under "Advanced"
   - Set 404 to redirect to `/index.html`

### Option 4: Build Time Configuration

When building for production, ensure your build script copies the appropriate web.config or .htaccess file:

```bash
# In your build script
cp web.config dist/
```

## Deploying Updated Configuration

1. Copy the latest `web.config` or `.htaccess` file to your hosting server
2. Place it in the root directory where your website is hosted
3. Clear your browser cache and test by:
   - Directly visiting a route like example.com/contact
   - Refreshing the browser on any non-homepage route
   - Using "hard reload" (Ctrl+F5 or Cmd+Shift+R)

## Testing the Fix

To verify your fix works:
1. Go directly to https://yourdomain.com/contact
2. The page should load correctly without a 404 error
3. Try refreshing the page while on /contact
4. The page should reload correctly without navigating away or showing an error

## Troubleshooting

If you still encounter issues:

1. **Check Server Logs**: Look for any errors related to your web.config or .htaccess configuration
2. **Hosting Provider Limitations**: Some hosting providers restrict certain rewrite rules. Contact support if needed.
3. **Caching Issues**: Clear browser cache or try in an incognito/private window
4. **Subfolder Deployment**: If your site is in a subfolder, adjust the paths accordingly
5. **Contact Hosting Support**: If all else fails, ask your hosting provider's support team for assistance with SPA routing