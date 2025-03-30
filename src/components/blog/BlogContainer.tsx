import React, { useRef, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";

interface BlogContainerProps {
  id: string;
  loading: boolean;
  type: "list" | "post";
  error?: boolean;
}

const BlogContainer: React.FC<BlogContainerProps> = ({ id, loading, type, error = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const unmountingRef = useRef(false);
  
  // Safely handle elements on mount/unmount to prevent DOM node errors
  useEffect(() => {
    console.log(`BlogContainer ${id} mounted`);
    unmountingRef.current = false;
    
    return () => {
      console.log(`BlogContainer ${id} unmounting`);
      unmountingRef.current = true;
      
      // Use a safer technique for DOM node removal during unmounting
      // Instead of trying to manipulate the container directly, we'll create a placeholder
      // that React can safely remove without "object cannot be found" errors
      try {
        const container = document.getElementById(id);
        if (container && document.body.contains(container)) {
          // Using innerHTML = '' is safer than removing children directly
          container.innerHTML = '';
          
          // Add a data attribute to indicate this container is being unmounted
          container.setAttribute('data-unmounting', 'true');
        }
      } catch (err) {
        console.error(`Error during safe unmount for ${id}:`, err);
      }
    };
  }, [id]);

  return (
    <div 
      id={id} 
      ref={containerRef}
      className={type === "list" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "prose max-w-none"}
      data-loading={loading ? "true" : "false"}
      data-error={error ? "true" : "false"}
      data-unmounting={unmountingRef.current ? "true" : "false"}
    >
      {loading && type === "list" && (
        Array(6).fill(0).map((_, i) => (
          <div key={i} className="flex flex-col gap-4 bg-gray-50 p-4 rounded-lg">
            <Skeleton className="w-full h-[200px] rounded-lg" />
            <Skeleton className="w-3/4 h-6" />
            <Skeleton className="w-full h-24" />
            <Skeleton className="w-1/4 h-6" />
          </div>
        ))
      )}
      
      {loading && type === "post" && (
        <div className="space-y-6">
          <Skeleton className="w-full h-[400px] rounded-lg" />
          <Skeleton className="w-3/4 h-12" />
          <Skeleton className="w-1/4 h-6" />
          <Skeleton className="w-full h-32" />
          <div className="space-y-4">
            <Skeleton className="w-1/2 h-8" />
            <Skeleton className="w-full h-24" />
            <Skeleton className="w-full h-24" />
          </div>
          <div className="space-y-4">
            <Skeleton className="w-1/2 h-8" />
            <Skeleton className="w-full h-24" />
          </div>
        </div>
      )}
      
      {!loading && !error && (
        <div className="w-full min-h-[200px]">
          <div className="blog-embed-loading text-center p-8">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500 mb-3"></div>
            <p className="text-gray-600">Loading blog content...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="w-full min-h-[200px] flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-red-700 mb-2">Content Loading Error</h3>
            <p className="text-gray-600">
              We couldn't load the blog content. Please try refreshing the page.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 transition-colors"
            >
              Refresh page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogContainer;
