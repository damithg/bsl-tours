# Architecture Overview

## 1. Overview

Best Sri Lanka Tours (BSL Tours) is a full-stack web application built to showcase Sri Lankan tour packages and provide users with the ability to explore destinations, view tour details, customize tours, and make inquiries. The application follows a modern web architecture with a clear separation between frontend and backend components.

The system consists of:
- A React-based Single Page Application (SPA) frontend
- A dual-backend architecture:
  - Node.js/Express API for certain frontend services
  - .NET Core API for main business logic and data operations
- Data persistence layer with PostgreSQL (via Drizzle ORM)
- Deployment options for various hosting environments

## 2. System Architecture

### 2.1 High-Level Architecture

The application follows a client-server architecture with the following components:

```
┌─────────────────┐       ┌───────────────────────┐       ┌─────────────────┐
│                 │       │                       │       │                 │
│  React Frontend │◄─────►│  Express.js API &     │◄─────►│  PostgreSQL     │
│  (SPA)          │       │  .NET Core API        │       │  Database       │
│                 │       │                       │       │                 │
└─────────────────┘       └───────────────────────┘       └─────────────────┘
        ▲                           ▲                             ▲
        │                           │                             │
        ▼                           ▼                             ▼
┌─────────────────┐       ┌───────────────────────┐       ┌─────────────────┐
│                 │       │                       │       │                 │
│  External APIs  │       │  Media Storage        │       │  Email Service  │
│  & Services     │       │  (Cloudinary)         │       │  (SendGrid)     │
│                 │       │                       │       │                 │
└─────────────────┘       └───────────────────────┘       └─────────────────┘
```

### 2.2 Frontend Architecture

The frontend is built with:
- React as the UI library
- TypeScript for type safety
- Vite as the build tool and development server
- Tailwind CSS for styling
- ShadCN UI component library
- React Query for data fetching and state management
- Wouter for routing

The frontend follows a component-based architecture with clear separation of concerns:
- Components for reusable UI elements
- Pages for route-specific views
- Contexts for global state management
- Hooks for shared logic
- Utils for helper functions

### 2.3 Backend Architecture

The application employs a dual-backend architecture:

**Node.js/Express API:**
- Serves the frontend static assets in production
- Handles API requests for certain frontend services
- Provides simple in-memory storage
- Seamlessly integrates with the frontend build process

**.NET Core API:**
- Primary backend for business logic
- Handles tour package, destination, and inquiry management
- Provides a RESTful API for frontend consumption
- Configured to run alongside the Node.js server

### 2.4 Data Architecture

Data persistence is handled through:
- PostgreSQL database (accessed via Drizzle ORM)
- Schema defined in `shared/schema.ts`
- Data models include tour packages, destinations, users, testimonials, inquiries, and subscribers

## 3. Key Components

### 3.1 Frontend Components

#### 3.1.1 Core Structure
- `/client/src/` - Frontend source code
- `/client/src/pages/` - Page components for routes
- `/client/src/components/` - Reusable UI components
- `/client/src/contexts/` - React context providers
- `/client/src/utils/` - Utility functions
- `/client/src/hooks/` - Custom React hooks
- `/client/index.html` - Main HTML template

#### 3.1.2 Key Features
- Responsive design for various screen sizes
- Theming support with multiple color schemes
- Currency conversion for international users
- PDF generation for tour itineraries
- Interactive Sri Lanka map for destination exploration
- Form handling for user inquiries and custom tour requests

### 3.2 Backend Components

#### 3.2.1 Node.js/Express API
- `/server/` - Server-side code
- `/server/index.ts` - Main Express server
- `/server/storage.ts` - Data storage abstraction
- `/server/emailService.ts` - Email sending functionality

#### 3.2.2 .NET Core API
- `/BSLTours.API/` - .NET Core API project
- Follows RESTful design patterns
- Handles core business operations

### 3.3 Shared Components
- `/shared/` - Code shared between frontend and backend
- `/shared/schema.ts` - Database schema and type definitions

## 4. Data Flow

### 4.1 Request Handling
1. User interacts with the React frontend
2. Frontend makes API requests to either the Express or .NET API
3. API processes the request and interacts with the database if needed
4. API returns response to the frontend
5. Frontend updates UI accordingly

### 4.2 Static Asset Serving
1. Vite builds frontend assets to `dist/public`
2. Express serves static assets in production
3. For development, Vite's dev server is used

### 4.3 Email Flow
1. User submits a form (inquiry, custom tour request, etc.)
2. Frontend sends data to the API
3. API uses SendGrid to send emails to administrators
4. Confirmation emails are sent to users when applicable

## 5. External Dependencies

### 5.1 Frontend Dependencies
- React and React DOM for UI rendering
- Tailwind CSS for styling
- ShadCN UI for component library
- React Query for data fetching
- Wouter for routing
- jsPDF for PDF generation
- Various Radix UI components

### 5.2 Backend Dependencies
- Express.js for the Node.js API
- .NET Core for the secondary API
- @neondatabase/serverless for PostgreSQL database access
- Drizzle ORM for database operations
- SendGrid for email functionality

### 5.3 Development Tools
- TypeScript for type checking
- Vite for building and development
- ESBuild for server-side code bundling

## 6. Deployment Strategy

The application supports multiple deployment strategies:

### 6.1 Full-Stack Deployment
- **Replit Deployment:** One-click deployment for the entire stack
- **Vercel Deployment:** Frontend with serverless functions
- **Docker Deployment:** Containerized deployment for consistent environments

### 6.2 Separate Frontend/Backend Deployment
- **Frontend:** Static hosting on services like Netlify, Vercel, or traditional hosts
- **Backend:** Cloud services like Azure (for .NET API) and Heroku/Railway (for Node.js API)

### 6.3 Traditional Hosting
- **SiteGround Hosting:** Detailed guide provided for SiteGround deployment
- **IONOS Windows Hosting:** Support for Windows-based hosting environments

### 6.4 Environment Configuration
Environment variables for:
- Database connection strings
- API endpoints
- SendGrid API key
- Other service credentials

### 6.5 Deployment Artifacts
- `deployment.tar.gz` for full-stack deployment
- `frontend-deployment.tar.gz` for frontend-only deployment
- `backend-deployment.tar.gz` for backend-only deployment

## 7. Security Considerations

### 7.1 Frontend Security
- HTTPS enforced for all communications
- Content Security Policy headers
- Cross-Origin Resource Sharing (CORS) protection

### 7.2 Backend Security
- Input validation on all API endpoints
- Protection against common web vulnerabilities
- Secure password handling for admin users

### 7.3 Data Security
- Environment variables for sensitive configuration
- No sensitive data stored in client-side code
- Proper error handling to prevent information leakage

## 8. Future Architecture Considerations

### 8.1 Potential Enhancements
- Implementing a booking and payment system
- Adding user authentication for personalized experiences
- Enhancing admin functionality for content management
- Implementing server-side rendering for improved SEO

### 8.2 Scaling Strategy
- Horizontal scaling of backend services
- Content Delivery Network (CDN) for static assets
- Database scaling through read replicas or sharding
- Caching strategy for frequently accessed data