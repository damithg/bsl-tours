import { QueryClient } from '@tanstack/react-query';

// Replace this value with your deployed .NET API base URL
export const API_BASE_URL = "https://localhost:7048";

// Helper function to check if a response is okay
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `HTTP error! status: ${res.status}`);
  }
}

// Generic API request function
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  await throwIfResNotOk(response);

  // For some endpoints, we might not expect a JSON response
  if (response.status === 204) {
    return null as unknown as T;
  }

  return await response.json();
}

// Behavior type for handling unauthorized requests
type UnauthorizedBehavior = "returnNull" | "throw";

// Query function factory that handles 401s differently based on `on401`
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => (endpoint: string) => () => Promise<T> =
  ({ on401 }) =>
  (endpoint) =>
  async () => {
    try {
      return await apiRequest<T>(endpoint);
    } catch (e) {
      if (
        e instanceof Error &&
        e.message.includes("401") &&
        on401 === "returnNull"
      ) {
        return null as unknown as T;
      }
      throw e;
    }
  };

// Create a query client instance with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // No caching
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      retry: false, // Don't retry failed requests
    },
  },
});

/**
 * HOW TO USE THIS CLIENT:
 * 
 * 1. Import this file in your main.tsx or App.tsx:
 *    import { queryClient } from './netApiClient';
 * 
 * 2. Set up your QueryProvider with this client:
 *    <QueryClientProvider client={queryClient}>
 *      <App />
 *    </QueryClientProvider>
 * 
 * 3. In your components, use React Query hooks with the API endpoints:
 *    
 *    // For GET requests
 *    const { data, isLoading, error } = useQuery({
 *      queryKey: ['/api/tour-packages'],
 *      queryFn: getQueryFn<TourPackage[]>({ on401: "returnNull" })('/api/tour-packages')
 *    });
 * 
 *    // For POST/PUT/DELETE requests
 *    const mutation = useMutation({
 *      mutationFn: (data: CreateInquiryDto) => 
 *        apiRequest<Inquiry>('/api/inquiries', {
 *          method: 'POST',
 *          body: JSON.stringify(data)
 *        }),
 *      onSuccess: () => {
 *        // Invalidate relevant queries or handle success
 *        queryClient.invalidateQueries({ queryKey: ['/api/inquiries'] });
 *      }
 *    });
 * 
 *    // Then use the mutation
 *    mutation.mutate(formData);
 */