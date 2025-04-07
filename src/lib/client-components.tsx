
"use client";

import React from "react";

/**
 * This component serves as a boundary for client-side code in Next.js.
 * It ensures that client components only render on the client side,
 * preventing hydration errors and server/client mismatches.
 */
export function ClientOnly<T extends React.ReactNode>({ 
  children, 
  fallback = null 
}: { 
  children: T; 
  fallback?: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
