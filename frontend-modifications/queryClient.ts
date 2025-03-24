import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Replace this with your actual backend URL when deploying
const API_BASE_URL = "https://your-backend-url.com";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  // Prepend the API base URL to the path
  const url = `${API_BASE_URL}${path}`;
  
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    // Don't include credentials for cross-origin requests to avoid CORS issues
    credentials: "omit", 
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Get the path from the query key
    const path = queryKey[0] as string;
    
    // Prepend the API base URL to the path
    const url = `${API_BASE_URL}${path}`;
    
    const res = await fetch(url, {
      credentials: "omit",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: true, // Enable refetching when window regains focus
      staleTime: 0, // Data immediately becomes stale - no caching
      gcTime: 0, // Remove data from cache immediately (formerly cacheTime in v4)
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});