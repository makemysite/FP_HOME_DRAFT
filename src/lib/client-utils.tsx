
"use client";

import React from "react";

/**
 * This component serves as a boundary for client-side code.
 * Use this to wrap components that need client-side functionality.
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
