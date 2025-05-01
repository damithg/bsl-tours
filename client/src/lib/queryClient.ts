import { QueryClient, QueryFunction } from "@tanstack/react-query";

// API base URL - can be updated to switch between local and production
// For local Express API (uncomment when using local Express server)
// export const API_BASE_URL = "";  // Empty string means use the same host/origin as the frontend

// For local .NET Core API (uncomment when using local .NET Core API)
// export const API_BASE_URL = "http://localhost:5001";

// Previous Production .NET API base URL (Azure)
// export const API_BASE_URL = "https://bsl-dg-adf2awanb4etgsap.uksouth-01.azurewebsites.net";

// Current Production API base URL (DigitalOcean)
export const API_BASE_URL = "https://bsl-tours-api-yqmyn.ondigitalocean.app";

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
  // Core properties
  id: number;
  name: string;
  slug: string;
  excerpt?: string;
  shortDescription?: string;
  featured: boolean;
  region?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
  recommendedDuration?: string;
  
  // Metadata
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  
  // Content sections
  overview?: {
    id: number;
    title: string;
    fullDescription: string;
  };
  
  subSections?: Array<{
    id: number;
    title: string;
    fullDescription: string;
  }>;
  
  // Features
  featuresSection?: {
    id: number;
    title: string;
    items?: Array<{
      id: number;
      title: string;
      description: string;
      image?: {
        publicId: string;
        alt: string;
      };
    }>;
  };
  
  // Media
  heroImage?: {
    id: number;
    publicId: string;
    alt: string;
    caption?: string;
    orientation?: string;
  };
  
  galleryImages?: Array<{
    id: number;
    publicId: string;
    alt: string;
    caption?: string;
    orientation?: string;
  }>;
  
  videoBlock?: {
    id: number;
    title: string;
    videoUrl: string;
    thumbnailUrl?: string;
  };
  
  quoteBlock?: {
    id: number;
    quote: string;
    author?: string;
  };
  
  // Related content
  relatedTours?: Array<{
    id: number;
    name: string;
    slug: string;
    summary: string;
    duration: string;
    startingFrom: number;
    currency: string;
    link: string;
  }>;
  
  nearbyAttractions?: Array<{
    id: number;
    name: string;
    description: string;
    distance?: string;
    travelTime?: string;
  }>;
  
  // Additional information
  essentialInfo?: {
    id?: number;
    gettingThere?: string;
    bestTimeToVisit?: string;
    entryRequirements?: string;
    localCuisine?: string;
    travelTips?: string;
    [key: string]: any;
  };
  
  faqs?: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
  
  // Legacy properties for backward compatibility (essential for template)
  description?: string;
  imageUrl?: string;
  bestTimeToVisit?: string;
  weatherInfo?: string;
  
  // Legacy JSON string fields for backward compatibility
  detailedSections?: string | null;
  pointsOfInterest?: string | null;
  toursFeaturing?: string | null;
  localExperiences?: string | null;
  
  // Allow any additional properties returned by the API
  [key: string]: any;
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
      } else if (basePath.includes('/destinations')) {
        // For destinations, we now directly use the ID or slug without the 'slug/' prefix
        path = `${basePath}/${params[0]}`;
        // Debug code (temporarily hidden)
        // console.log('Destination API path:', path);
      } else if (basePath.includes('/slug/') || basePath.includes('/by-slug/')) {
        // Special handling for other slug endpoints (if we still have them)
        path = `${basePath}/${params[0]}`;
        // Debug code (temporarily hidden)
        // console.log('Slug API path:', path);
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
    
    // Debug code (temporarily hidden)
    // console.log(`Making API request to: ${url}`);
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
