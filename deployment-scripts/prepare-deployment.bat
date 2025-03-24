@echo off
setlocal enabledelayedexpansion

:: Function to display usage information
:usage
echo Usage: %0 [options]
echo Options:
echo   -h, --help            Display this help message
echo   -f, --full            Create full-stack deployment package (default)
echo   -b, --backend-only    Create backend-only deployment package
echo   -a, --all             Create both deployment packages
exit /b 1

:: Default to full deployment if no arguments provided
if "%~1"=="" (
  set FULL=true
) else (
  :: Parse command-line arguments
  :parse_args
  if "%~1"=="" goto :end_parse_args
  
  if "%~1"=="-h" (
    call :usage
    exit /b 0
  ) else if "%~1"=="--help" (
    call :usage
    exit /b 0
  ) else if "%~1"=="-f" (
    set FULL=true
    shift
    goto :parse_args
  ) else if "%~1"=="--full" (
    set FULL=true
    shift
    goto :parse_args
  ) else if "%~1"=="-b" (
    set BACKEND_ONLY=true
    shift
    goto :parse_args
  ) else if "%~1"=="--backend-only" (
    set BACKEND_ONLY=true
    shift
    goto :parse_args
  ) else if "%~1"=="-a" (
    set FULL=true
    set BACKEND_ONLY=true
    shift
    goto :parse_args
  ) else if "%~1"=="--all" (
    set FULL=true
    set BACKEND_ONLY=true
    shift
    goto :parse_args
  ) else (
    echo Unknown option: %~1
    call :usage
    exit /b 1
  )
)
:end_parse_args

:: Ensure a clean build
echo Cleaning previous builds...
if exist dist rmdir /s /q dist
if exist deployment.tar.gz del deployment.tar.gz
if exist backend-deployment.tar.gz del backend-deployment.tar.gz
call npm run build

if "%FULL%"=="true" (
  echo Preparing full-stack deployment package...
  :: Create a directory for the full deployment
  mkdir dist\deployment
  
  :: Copy necessary files
  xcopy dist\public dist\deployment\public\ /s /e /i
  copy dist\index.js dist\deployment\
  copy package.json dist\deployment\
  
  :: Create a minimal package.json for production
  node -e "const pkg = require('./package.json'); const newPkg = { name: pkg.name, version: pkg.version, description: pkg.description, main: 'index.js', scripts: { start: 'node index.js' }, dependencies: pkg.dependencies, engines: { node: '>=16.0.0' } }; require('fs').writeFileSync('./dist/deployment/package.json', JSON.stringify(newPkg, null, 2));"
  
  :: Create the tarball (requires 7-Zip or similar tool)
  echo Note: You will need 7-Zip or a similar tool installed to create a tarball.
  echo Creating deployment archive...
  cd dist\deployment
  if exist "C:\Program Files\7-Zip\7z.exe" (
    "C:\Program Files\7-Zip\7z.exe" a -ttar -so . | "C:\Program Files\7-Zip\7z.exe" a -si ..\..\deployment.tar.gz
    echo Full-stack deployment package created: deployment.tar.gz
  ) else (
    echo Warning: 7-Zip not found. Please manually compress the contents of dist\deployment.
  )
  cd ..\..
)

if "%BACKEND_ONLY%"=="true" (
  echo Preparing backend-only deployment package...
  :: Create a directory for the backend deployment
  mkdir dist\backend-deployment
  
  :: Copy backend files
  if exist backend-deploy\server mkdir dist\backend-deployment\server
  xcopy backend-deploy\server dist\backend-deployment\server\ /s /e /i
  if exist backend-deploy\shared mkdir dist\backend-deployment\shared
  xcopy backend-deploy\shared dist\backend-deployment\shared\ /s /e /i
  copy package.json dist\backend-deployment\
  
  :: Create a specialized package.json for backend-only deployment
  node -e "const pkg = require('./package.json'); const newPkg = { name: pkg.name + '-backend', version: pkg.version, description: pkg.description + ' (Backend API)', main: 'server/backend-index.js', scripts: { start: 'node server/backend-index.js' }, dependencies: { '@neondatabase/serverless': pkg.dependencies['@neondatabase/serverless'], 'connect-pg-simple': pkg.dependencies['connect-pg-simple'], 'cors': pkg.dependencies['cors'], 'drizzle-orm': pkg.dependencies['drizzle-orm'], 'drizzle-zod': pkg.dependencies['drizzle-zod'], 'express': pkg.dependencies['express'], 'express-session': pkg.dependencies['express-session'], 'memorystore': pkg.dependencies['memorystore'], 'passport': pkg.dependencies['passport'], 'passport-local': pkg.dependencies['passport-local'], 'zod': pkg.dependencies['zod'], 'zod-validation-error': pkg.dependencies['zod-validation-error'] }, engines: { node: '>=16.0.0' } }; require('fs').writeFileSync('./dist/backend-deployment/package.json', JSON.stringify(newPkg, null, 2));"
  
  :: Create the backend-specific entry point
  echo const { createServer } = require('./server/backend-index'); > dist\backend-deployment\index.js
  echo. >> dist\backend-deployment\index.js
  echo const port = process.env.PORT ^|^| 5000; >> dist\backend-deployment\index.js
  echo createServer().then((server) =^> { >> dist\backend-deployment\index.js
  echo   server.listen(port, () =^> { >> dist\backend-deployment\index.js
  echo     console.log(`Backend server listening on port ${port}`); >> dist\backend-deployment\index.js
  echo   }); >> dist\backend-deployment\index.js
  echo }); >> dist\backend-deployment\index.js
  
  :: Create the tarball (requires 7-Zip or similar tool)
  echo Creating backend deployment archive...
  cd dist\backend-deployment
  if exist "C:\Program Files\7-Zip\7z.exe" (
    "C:\Program Files\7-Zip\7z.exe" a -ttar -so . | "C:\Program Files\7-Zip\7z.exe" a -si ..\..\backend-deployment.tar.gz
    echo Backend-only deployment package created: backend-deployment.tar.gz
  ) else (
    echo Warning: 7-Zip not found. Please manually compress the contents of dist\backend-deployment.
  )
  cd ..\..
)

echo Deployment preparation complete.