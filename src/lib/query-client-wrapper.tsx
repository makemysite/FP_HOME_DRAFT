
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// Create and export a queryClient instance for direct imports
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * This component initializes and provides the React Query client.
 * Since this uses client hooks, it must be used within a ClientOnly boundary
 * or with "use client" directive.
 */
export function QueryClientWrapper({ children }: { children: React.ReactNode }) {
  // We use the already created queryClient instance
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
