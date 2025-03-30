
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";

interface BlogContainerProps {
  id: string;
  loading: boolean;
  type: "list" | "post";
  error?: boolean;
}

const BlogContainer: React.FC<BlogContainerProps> = ({ id, loading, type, error = false }) => {
  return (
    <div 
      id={id} 
      className={type === "list" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "prose max-w-none"}
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
      
      {/* This div will be populated by the BlogEmbed library */}
      {!loading && !error && (
        <div className="w-full min-h-[200px]">
          {/* Static loading message that will be replaced by the blog embed library */}
          <div className="blog-embed-loading text-center p-8">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mx-auto mb-3" />
            <p className="text-gray-600">Loading blog content...</p>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="w-full min-h-[200px] flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-red-700 mb-2">Content Loading Error</h3>
            <p className="text-gray-600">
              We couldn't load the blog content. Please try refreshing the page.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogContainer;
