# BSLTours.API - .NET Core Backend

This is the .NET Core API backend for the Best Sri Lanka Tours website.

## Prerequisites

- .NET 6.0 SDK or later
- Visual Studio 2022 or Visual Studio Code

## Getting Started

### Building and Running the API

1. **Clone the repository**

2. **Open the solution in Visual Studio**
   - Double-click on `BSLTours.sln`
   - Or open it from Visual Studio using "Open a project or solution"

3. **Build the solution**
   - Press F6 or select Build > Build Solution

4. **Run the API**
   - Press F5 or select Debug > Start Debugging
   - The API will start and a browser window will open to the Swagger UI

### Using the Command Line

1. **Navigate to the project directory**
   ```bash
   cd BSLTours.API
   ```

2. **Restore packages**
   ```bash
   dotnet restore
   ```

3. **Build the project**
   ```bash
   dotnet build
   ```

4. **Run the project**
   ```bash
   dotnet run
   ```

5. **Access the API**
   - API: https://localhost:7048/api
   - Swagger UI: https://localhost:7048/swagger

## API Endpoints

- **GET /api/tour-packages** - Get all tour packages
- **GET /api/tour-packages/featured** - Get featured tour packages
- **GET /api/tour-packages/{id}** - Get a specific tour package by ID
- **POST /api/tour-packages** - Create a new tour package

- **GET /api/destinations** - Get all destinations
- **GET /api/destinations/{id}** - Get a specific destination by ID
- **POST /api/destinations** - Create a new destination

- **GET /api/testimonials** - Get all testimonials
- **POST /api/testimonials** - Create a new testimonial

- **GET /api/inquiries** - Get all inquiries
- **POST /api/inquiries** - Create a new inquiry

- **POST /api/subscribers** - Add a new subscriber

## Deployment

### Publishing the API

```bash
dotnet publish -c Release
```

The published files will be in the `bin/Release/net6.0/publish` directory.

### Deploying to IIS

1. Install the .NET 6.0 Hosting Bundle on the server
2. Create a new website in IIS
3. Set the physical path to the publish directory
4. Set up the application pool to use No Managed Code
5. Configure necessary permissions

### Deploying to Azure App Service

1. Right-click on the project in Visual Studio
2. Select "Publish..."
3. Follow the wizard to configure your Azure App Service deployment

## Frontend Integration

To connect the React frontend to this API:

1. Update the `API_BASE_URL` in the frontend's `queryClient.ts`:
   ```typescript
   export const API_BASE_URL = "https://your-api-url.com";
   ```

2. Make sure CORS is properly configured if the frontend and API are hosted on different domains.