import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest<T = any>(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  
  // Handle empty responses (204 No Content, etc.)
  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return undefined as T;
  }
  
  // Check if response has content
  const contentType = res.headers.get('content-type');
  
  // Parse based on Content-Type
  if (contentType) {
    if (contentType.includes('application/json')) {
      const text = await res.text();
      // Handle empty JSON responses
      if (!text || text.trim() === '') {
        return undefined as T;
      }
      return JSON.parse(text);
    }
    // Other content types could be handled here (text/plain, etc.)
    // For now, return undefined for non-JSON
    return undefined as T;
  }
  
  // No Content-Type header - try to parse as JSON with safety
  const text = await res.text();
  if (!text || text.trim() === '') {
    return undefined as T;
  }
  
  try {
    return JSON.parse(text);
  } catch {
    // Not JSON, return undefined
    return undefined as T;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
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
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
