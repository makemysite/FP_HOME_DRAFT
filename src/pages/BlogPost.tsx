
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import BlogEmbed from "@/lib/blog/blogsmith-embed";

interface BlogPostParams {
  slug: string;
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<BlogPostParams>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!slug) {
      setError("Blog post not found");
      setLoading(false);
      return;
    }

    const blogEmbed = new BlogEmbed({ debug: false });
    const containerId = "blog-post-content";
    
    // Create container div if it doesn't exist
    let containerElement = document.getElementById(containerId);
    if (!containerElement) {
      containerElement = document.createElement("div");
      containerElement.id = containerId;
      document.querySelector(".blog-content-container")?.appendChild(containerElement);
    }
    
    const loadBlogPost = async () => {
      try {
        await blogEmbed.renderBlogPost(containerId, slug, {
          retryOnFailure: true,
          retryAttempts: 2,
          fallbackContent: "We couldn't load this blog post. Please try again later."
        });
      } catch (err) {
        console.error("Error rendering blog post:", err);
        setError("Failed to load blog post");
        toast({
          title: "Error",
          description: "Failed to load blog post. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadBlogPost();
    
    // Cleanup function
    return () => {
      blogEmbed.cleanupContainer(containerId);
      blogEmbed.destroy();
    };
  }, [slug, toast]);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="w-full">
        <Navbar />
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <Link 
          to="/blog" 
          className="inline-flex items-center mb-8 text-[#E98A23] hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Blog
        </Link>
        
        <div className="blog-content-container">
          {loading ? (
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <div className="flex items-center mb-6">
                <Skeleton className="h-4 w-24 mr-4" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-64 w-full mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-4">{error}</h3>
              <p className="text-gray-500 mb-6">The requested blog post could not be found or loaded.</p>
              <Link 
                to="/blog" 
                className="bg-[#E98A23] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Return to Blog
              </Link>
            </div>
          ) : (
            <div id="blog-post-content" className="prose max-w-none">
              {/* Content will be populated by BlogEmbed */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
