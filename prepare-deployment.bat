@echo off
echo 🚀 Preparing BSL Tours Website for deployment...

REM Step 1: Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Step 2: Build the application
echo 🔨 Building the application...
call npm run build

REM Step 3: Create server/public directory structure
echo 📁 Creating server/public directory structure...
if not exist server\public mkdir server\public

REM Step 4: Copy dist content to server/public
echo 📋 Copying built files to server/public...
xcopy /E /I /Y dist\* server\public\

REM Step 5: Create a deployment package
echo 📦 Creating deployment package...
if not exist deployment mkdir deployment
xcopy /E /I /Y dist deployment\dist\
xcopy /E /I /Y server deployment\server\
xcopy /E /I /Y public deployment\public\
copy package.json deployment\
copy package-lock.json deployment\
copy tsconfig.json deployment\
copy prepare-deployment.bat deployment\
copy DEPLOYMENT.md deployment\
copy HOSTING_GUIDE.md deployment\
copy Dockerfile deployment\
copy .dockerignore deployment\

echo ✅ Deployment preparation complete!
echo Your deployment package is ready in the deployment folder.
echo Upload this folder to your hosting provider.
echo Follow the instructions in DEPLOYMENT.md and HOSTING_GUIDE.md to complete the deployment process.

pause