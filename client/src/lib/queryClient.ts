import { QueryClient, QueryFunction } from "@tanstack/react-query";

// API base URL - can be updated to switch between local and production
// For local Express API (uncomment when using local Express server)
// export const API_BASE_URL = "";  // Empty string means use the same host/origin as the frontend

// For local .NET Core API (uncomment when using local .NET Core API)
// export const API_BASE_URL = "http://localhost:5001";

// Production .NET API base URL
export const API_BASE_URL = "https://bsl-dg-adf2awanb4etgsap.uksouth-01.azurewebsites.net";

// Type definitions for API responses
export interface TourPackage {
  id: number;
  title: string;
  slug: string | null;
  description: string;
  shortDescription: string | null;
  excerpt?: string | null; // Added field for compatibility with .NET API
  imageUrl: string;
  price: number;
  duration: number;
  inclusions: string | null;
  exclusions: string | null;
  itinerary: string | null;
  itineraryDays?: ItineraryDay[]; // Structured itinerary data from API
  isFeatured: boolean;
  destinationId: number | null;
  activities: string | null;
  includes: string | null;
  excludes: string | null;
  destinations: string | null;
  galleryImages?: string[];
  gallery?: string | null;
  highlights?: string | null;
  tourHighlights?: string | null;
  highlightsSummary?: string | null;
  groupSize?: string | null;
  featured?: boolean; // Added field for compatibility with API response
  rating?: number;    // Added field for compatibility with API response
  reviewCount?: number; // Added field for compatibility with API response
}

// Itinerary day structure as returned from the API
export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities?: Array<{
    title: string;
    description?: string;
    time?: string;
    imageUrl?: string;
  }>;
  accommodation?: string | {
    name: string;
    description?: string;
    imageUrl?: string;
  };
  meals?: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  imageUrl?: string;
  // New image structure from API
  image?: {
    baseUrl: string;
    small: string;
    medium: string;
    banner: string;
  };
}

export interface Destination {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  featured: boolean;
  slug?: string;
  shortDescription?: string | null;
  excerpt?: string | null;
  fullDescription?: string | null;
  region?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  highlights?: string | null;
  bestTimeToVisit?: string | null;
  recommendedDuration?: string | null;
  weatherInfo?: string | null;
  travelTips?: string | null;
  nearbyAttractions?: string | null;
  transportOptions?: string[] | null;
  category?: string | null;
  tags?: string[] | null;
  address?: string | null;
  nearestAirport?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string[] | null;
  
  // New features from .NET Core API
  features?: Array<{
    title: string;
    description: string;
    icon: string;
    imageUrl?: string;
  }> | null;
  
  // Gallery images now structured as objects
  galleryImages?: Array<{
    url: string;
    alt: string;
  }> | null;
  
  // Activities as structured data
  activities?: string | null;
  
  // FAQs as structured data
  faQs?: Array<{
    question: string;
    answer: string;
  }> | null;
  
  // Content sections
  sections?: Array<{
    type: string;
    title: string;
    content: string;
    imageUrl?: string;
  }> | null;
  
  experiences?: string | null;
}

export interface Testimonial {
  id: number;
  
  // .NET Core API fields
  CustomerName?: string;
  Content?: string;
  TourPackage?: string;
  Rating?: number;
  CustomerAvatar?: string;
  
  // JavaScript API fields
  name?: string;
  content?: string;
  packageName?: string;
  rating?: number;
  
  // Original interface fields - may be used in some implementations
  clientName?: string;
  clientLocation?: string;
  comment?: string;
  tourName?: string | null;
  imageUrl?: string | null;
  
  // Allow additional fields
  [key: string]: any;
}

export interface Inquiry {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  message: string;
  tourPackageId: number | null;
  status: string;
  createdAt: string;
}

export interface Subscriber {
  id: number;
  email: string;
  createdAt: string;
}

// Helper function to handle response errors
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status}: ${text || res.statusText}`);
  }
}

// API request function for mutations (POST, PUT, DELETE)
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown,
): Promise<Response> {
  // If the URL is not absolute, prepend the API base URL
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
  
  const res = await fetch(fullUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
  });

  await throwIfResNotOk(res);
  return res;
}

// Type for handling unauthorized behavior
type UnauthorizedBehavior = "returnNull" | "throw";

// Query function factory for TanStack Query v5
export const getQueryFn = <TData>(options: {
  on401: UnauthorizedBehavior;
}): QueryFunction<TData> => {
  return async ({ queryKey }) => {
    const [basePath, ...params] = queryKey as string[];
    let path = basePath;
    
    // Handle arrays of query parameters by appending them to the path
    if (params.length > 0) {
      // Check if the path already has path parameters or query string
      if (basePath.includes('/:')) {
        // Replace path parameters with actual values
        const pathSegments = basePath.split('/');
        const updatedPathSegments = pathSegments.map(segment => {
          if (segment.startsWith(':')) {
            const paramName = segment.slice(1);
            const paramIndex = parseInt(paramName);
            if (!isNaN(paramIndex) && params[paramIndex-1] !== undefined) {
              return params[paramIndex-1];
            }
          }
          return segment;
        });
        path = updatedPathSegments.join('/');
      } else if (basePath.includes('/slug/') || basePath.includes('/by-slug/')) {
        // Special handling for slug endpoints
        path = `${basePath}/${params[0]}`;
        console.log('Slug API path:', path);
      } else if (basePath.includes('/{')) {
        // Handle .NET style path parameters
        let updatedPath = basePath;
        params.forEach((param, index) => {
          updatedPath = updatedPath.replace(`{${index}}`, param);
        });
        path = updatedPath;
      } else {
        // For numeric IDs, append them to the path
        path = `${basePath}/${params[0]}`;
      }
    }
    
    // If the URL is not absolute, prepend the API base URL
    const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
    
    console.log(`Making API request to: ${url}`);
    const res = await fetch(url);

    // Handle 401 Unauthorized based on the provided behavior option
    if (options.on401 === "returnNull" && res.status === 401) {
      return null as unknown as TData;
    }

    await throwIfResNotOk(res);
    return await res.json() as TData;
  };
};

// Configure the query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      staleTime: 0, // No caching
      gcTime: 0, // Clear cache immediately (formerly cacheTime in v4)
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
