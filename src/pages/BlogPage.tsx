
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import BlogEmbed from "@/lib/blog/blogsmith-embed";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";

const BlogPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);
  const blogEmbedRef = useRef<BlogEmbed | null>(null);
  const unmountedRef = useRef(false);
  const initTimerRef = useRef<number | null>(null);
  
  // Safe state setter that only updates if component is still mounted
  const safeSetState = useCallback(<T,>(setter: React.Dispatch<React.SetStateAction<T>>, value: T) => {
    if (!unmountedRef.current) {
      setter(value);
    }
  }, []);
  
  // Set mounted state when component mounts
  useEffect(() => {
    unmountedRef.current = false;
    safeSetState(setIsMounted, true);
    
    // Clean up function for component unmounting
    return () => {
      unmountedRef.current = true;
      safeSetState(setIsMounted, false);
      
      // Clear any pending timers
      if (initTimerRef.current !== null) {
        clearTimeout(initTimerRef.current);
        initTimerRef.current = null;
      }
      
      // Safely clean up DOM containers
      try {
        const containers = ['blog-list-container', 'blog-post-container'];
        containers.forEach(id => {
          const container = document.getElementById(id);
          if (container) {
            // Instead of innerHTML manipulation which can cause issues,
            // we'll use a more React-friendly approach
            while (container.firstChild) {
              container.removeChild(container.firstChild);
            }
          }
        });
      } catch (err) {
        console.error("Error safely cleaning up blog containers:", err);
      }
    };
  }, [safeSetState]);
  
  // Handle 404 errors for blog posts
  useEffect(() => {
    if (renderError && location.pathname !== '/blog' && location.pathname !== '/blog/') {
      navigate('/blog', { 
        replace: true,
        state: { error: renderError }
      });
    }
  }, [renderError, location.pathname, navigate]);
  
  useEffect(() => {
    // Only run blog initialization when component is mounted
    if (!isMounted || unmountedRef.current) return;
    
    // Reset loading state for each route change
    safeSetState(setLoading, true);
    safeSetState(setRenderError, null);
    
    // Clean up previous timer if it exists
    if (initTimerRef.current !== null) {
      clearTimeout(initTimerRef.current);
      initTimerRef.current = null;
    }
    
    // Create the BlogEmbed instance only once and store it in the ref
    if (!blogEmbedRef.current) {
      blogEmbedRef.current = new BlogEmbed();
    }
    
    // Determine if we're viewing a single post or the blog list
    const path = location.pathname;
    const slug = path.replace('/blog/', '');
    
    // Small delay to ensure DOM elements exist
    initTimerRef.current = window.setTimeout(() => {
      // Check again if component is still mounted
      if (unmountedRef.current) return;
      
      try {
        if (path === '/blog' || path === '/blog/') {
          // We're on the main blog page, render the blog list
          const blogListContainer = document.getElementById('blog-list-container');
          
          if (blogListContainer && blogEmbedRef.current && !unmountedRef.current) {
            // Clean the container first
            while (blogListContainer.firstChild) {
              blogListContainer.removeChild(blogListContainer.firstChild);
            }
            
            blogEmbedRef.current.renderBlogList('blog-list-container', {
              limit: 8,
              showDescription: true,
              showImage: true
            })
            .then(() => {
              if (!unmountedRef.current) safeSetState(setLoading, false);
            })
            .catch(error => {
              console.error("Error rendering blog list:", error);
              if (!unmountedRef.current) {
                safeSetState(setLoading, false);
                toast({
                  title: "Error loading blogs",
                  description: "Could not load blog posts. Please try again later.",
                  variant: "destructive",
                });
              }
            });
          } else if (!unmountedRef.current) {
            safeSetState(setLoading, false);
          }
        } else if (path.startsWith('/blog/') && slug !== '') {
          // We're on a single blog post page, render that post
          const blogPostContainer = document.getElementById('blog-post-container');
          
          if (blogPostContainer && blogEmbedRef.current && !unmountedRef.current) {
            // Clean the container first to prevent stale DOM references
            while (blogPostContainer.firstChild) {
              blogPostContainer.removeChild(blogPostContainer.firstChild);
            }
            
            console.log(`Rendering blog post with slug: ${slug}`);
            blogEmbedRef.current.renderBlogPost('blog-post-container', slug)
              .then(() => {
                if (!unmountedRef.current) safeSetState(setLoading, false);
              })
              .catch(error => {
                console.error("Error rendering blog post:", error);
                if (!unmountedRef.current) {
                  safeSetState(setLoading, false);
                  
                  // Check if it's a "not found" error and handle accordingly
                  if (error.message && error.message.includes("not found")) {
                    safeSetState(setRenderError, `Blog post "${slug}" not found`);
                  } else {
                    toast({
                      title: "Error loading blog post",
                      description: "Could not load the blog post. Please try again later.",
                      variant: "destructive",
                    });
                  }
                }
              });
          } else if (!unmountedRef.current) {
            safeSetState(setLoading, false);
          }
        }
      } catch (error) {
        console.error("Error in blog page:", error);
        if (!unmountedRef.current) {
          safeSetState(setLoading, false);
          toast({
            title: "An error occurred",
            description: "Something went wrong. Please try again later.",
            variant: "destructive",
          });
        }
      }
    }, 50); // Small delay to ensure DOM is ready
    
    // Clean up function for this effect
    return () => {
      if (initTimerRef.current !== null) {
        clearTimeout(initTimerRef.current);
        initTimerRef.current = null;
      }
    };
    
  }, [location.pathname, isMounted, safeSetState]);

  // Check for error from previous navigation
  useEffect(() => {
    if (location.state && location.state.error && location.pathname === '/blog') {
      toast({
        title: "Blog Post Not Found",
        description: location.state.error,
        variant: "destructive",
      });
      
      // Clear the error state to prevent showing the toast multiple times
      navigate('/blog', { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#170F49] mb-6">Our Blog</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay up to date with the latest trends, tips, and insights in field service management
              and cloud-based solutions.
            </p>
          </div>

          <div className="mt-12">
            {/* Blog list container - this will be populated by BlogEmbed */}
            <div id="blog-list-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading && location.pathname === '/blog' && (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <Skeleton className="w-full h-[200px] rounded-lg" />
                    <Skeleton className="w-3/4 h-6" />
                    <Skeleton className="w-full h-24" />
                    <Skeleton className="w-1/4 h-6" />
                  </div>
                ))
              )}
            </div>
            
            {/* Blog post container - this will be populated by BlogEmbed for single posts */}
            <div id="blog-post-container" className="prose max-w-none">
              {loading && location.pathname !== '/blog' && (
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
            </div>
          </div>
        </div>
      </div>
      
      {/* Add styling for the BlogEmbed components */}
      <style>{`
        /* BlogEmbed styling */
        .blog-embed-list-item {
          border: 1px solid #eee;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .blog-embed-list-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        
        .blog-embed-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        
        .blog-embed-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1rem;
          padding: 0 1rem;
        }
        
        .blog-embed-description {
          margin-top: 0.5rem;
          padding: 0 1rem;
          color: #4b5563;
        }
        
        .blog-embed-meta {
          display: flex;
          justify-content: space-between;
          padding: 0 1rem;
          margin-top: 1rem;
          color: #6b7280;
          font-size: 0.875rem;
        }
        
        .blog-embed-read-more {
          display: inline-flex;
          align-items: center;
          margin: 1rem;
          color: #E98A23;
          font-weight: 500;
        }
        
        .blog-embed-read-more:hover {
          color: #c97520;
        }
        
        /* Empty state and loading styling */
        .blog-embed-loading, .blog-embed-empty, .blog-embed-error {
          width: 100%;
          padding: 2rem;
          text-align: center;
          color: #6b7280;
          font-size: 1.125rem;
        }
        
        .blog-embed-error {
          color: #ef4444;
        }
        
        /* Single post styling */
        .blog-embed-post-image {
          width: 100%;
          max-height: 400px;
          object-fit: cover;
          border-radius: 8px;
        }
        
        .blog-embed-post-title {
          font-size: 2.25rem;
          font-weight: 700;
          margin-top: 1.5rem;
          color: #170F49;
        }
        
        .blog-embed-post-meta {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          color: #6b7280;
        }
        
        .blog-embed-post-description {
          margin-top: 1.5rem;
          line-height: 1.8;
          font-size: 1.125rem;
          color: #4b5563;
          margin-bottom: 2rem;
        }
        
        .blog-embed-section {
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        
        .blog-embed-section-title {
          font-size: 1.75rem;
          font-weight: 600;
          color: #170F49;
          margin-bottom: 1rem;
        }
        
        .blog-embed-section-content {
          line-height: 1.8;
        }
        
        .blog-embed-content-text {
          margin-bottom: 1.5rem;
        }
        
        .blog-embed-content-image {
          margin: 1.5rem 0;
        }
        
        .blog-embed-content-image img {
          width: 100%;
          border-radius: 6px;
        }
        
        .blog-embed-content-image figcaption {
          text-align: center;
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 0.5rem;
        }
        
        .blog-embed-content-quote {
          font-style: italic;
          border-left: 4px solid #E98A23;
          padding-left: 1rem;
          margin: 1.5rem 0;
        }
        
        .blog-embed-content-list {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }
        
        .blog-embed-faqs {
          margin-top: 3rem;
          background-color: #f9fafb;
          padding: 2rem;
          border-radius: 10px;
        }
        
        .blog-embed-faqs-title {
          font-size: 1.75rem;
          font-weight: 600;
          color: #170F49;
          margin-bottom: 1.5rem;
        }
        
        .blog-embed-faq {
          margin-bottom: 1.5rem;
        }
        
        .blog-embed-faq-question {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.75rem;
        }
        
        .blog-embed-faq-answer {
          color: #4b5563;
        }
        
        .blog-embed-conclusion {
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }
        
        .blog-embed-conclusion-title {
          font-size: 1.75rem;
          font-weight: 600;
          color: #170F49;
          margin-bottom: 1rem;
        }
        
        .blog-embed-conclusion-content {
          line-height: 1.8;
        }
      `}</style>
    </div>
  );
};

export default BlogPage;
