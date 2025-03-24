import { QueryClient, QueryFunction } from "@tanstack/react-query";

// API base URL - can be updated to switch between local and production
// For local Express API (uncomment when using local Express server)
export const API_BASE_URL = "";  // Empty string means use the same host/origin as the frontend

// For local .NET Core API (uncomment when using local .NET Core API)
// export const API_BASE_URL = "http://localhost:5001";

// Production .NET API base URL (uncomment when connecting to production API)
// export const API_BASE_URL = "https://api.travelnip.com";

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
    const path = queryKey[0] as string;
    
    // If the URL is not absolute, prepend the API base URL
    const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
    
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
