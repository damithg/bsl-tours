# Best Sri Lanka Tours - Backend API

This is the backend API server for the Best Sri Lanka Tours website. It provides data for tour packages, destinations, testimonials, and more.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Build the application:
   ```
   npm run build
   ```

3. Start the server:
   ```
   npm start
   ```

## Environment Variables

The following environment variables can be configured:

- `PORT`: The port on which the server will run (default: 5000)
- `FRONTEND_URL`: The URL of your frontend for CORS (default: all origins allowed in development)
- `NODE_ENV`: Set to "production" for production deployment

## API Endpoints

- `GET /api/tour-packages`: Get all tour packages
- `GET /api/tour-packages/featured`: Get featured tour packages
- `GET /api/tour-packages/:id`: Get a specific tour package
- `GET /api/destinations`: Get all destinations
- `GET /api/destinations/:id`: Get a specific destination
- `GET /api/testimonials`: Get all testimonials
- `POST /api/inquiries`: Submit an inquiry
- `POST /api/subscribers`: Subscribe to newsletter

## Frontend Integration

To connect your frontend to this backend, update the API base URL in your frontend configuration to point to the URL where this backend is deployed.