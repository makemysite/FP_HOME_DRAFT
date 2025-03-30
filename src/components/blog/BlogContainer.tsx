
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

interface BlogContainerProps {
  id: string;
  loading: boolean;
  type: "list" | "post";
}

const BlogContainer: React.FC<BlogContainerProps> = ({ id, loading, type }) => {
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
      {!loading && <div className="w-full min-h-[50px]"></div>}
    </div>
  );
};

export default BlogContainer;
