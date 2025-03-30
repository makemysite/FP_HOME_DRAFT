
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import blogService from '@/lib/blog/blog-service';

export function useBlog() {
  const [loading, setLoading] = useState(true);
  const [renderError, setRenderError] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const unmountedRef = useRef(false);
  const renderingRef = useRef(false);
  const navigate = useNavigate();

  // Safe state setter that only updates if component is still mounted
  const safeSetState = useCallback(<T,>(setter: React.Dispatch<React.SetStateAction<T>>, value: T) => {
    if (!unmountedRef.current) {
      setter(value);
    }
  }, []);

  // Sets up the unmount tracking
  useEffect(() => {
    console.log("Blog hook mounted");
    unmountedRef.current = false;
    
    return () => {
      console.log("Blog hook unmounting");
      // Signal to BlogService that we're unmounting
      blogService.prepareForUnmount();
      
      // Set unmounting flag first to prevent further state updates
      unmountedRef.current = true;
      
      // Perform immediate cleanup when unmounting - with safety checks
      try {
        // Perform cleanup after a small delay to avoid race conditions with React rendering
        setTimeout(() => {
          try {
            blogService.cleanupAllContainers();
          } catch (error) {
            console.error("Error during delayed unmount cleanup:", error);
          }
        }, 50);
      } catch (error) {
        console.error("Error during unmount cleanup:", error);
      }
    };
  }, []);

  // Render blog list function with enhanced safety and debugging
  const renderBlogList = useCallback(async () => {
    if (unmountedRef.current || renderingRef.current) {
      console.log("Skipping blog list render - component unmounted or already rendering");
      return;
    }
    
    console.log("Starting blog list render");
    renderingRef.current = true;
    safeSetState(setLoading, true);
    safeSetState(setRenderError, null);
    safeSetState(setDataLoaded, false);
    
    try {
      // Verify we're still mounted before continuing
      if (unmountedRef.current) {
        console.log("Component unmounted during render, aborting");
        return;
      }
      
      // Clean up any existing blog post container first - only if needed
      if (document.getElementById('blog-post-container')) {
        try {
          console.log("Cleaning up blog post container");
          blogService.cleanupContainer('blog-post-container');
        } catch (error) {
          console.error("Error cleaning up blog post container:", error);
        }
      }
      
      // Verify we're still mounted before continuing
      if (unmountedRef.current) return;
      
      // Then render the list with debugging
      console.log("Calling blogService.renderBlogList");
      await blogService.renderBlogList('blog-list-container', {
        fallbackContent: "No blog posts are currently available. Please check back later.",
        retryOnFailure: true,
        retryAttempts: 3
      });
      
      if (!unmountedRef.current) {
        console.log("Blog list render completed");
        safeSetState(setLoading, false);
        safeSetState(setDataLoaded, true);
      }
    } catch (error) {
      console.error("Error rendering blog list:", error);
      if (!unmountedRef.current) {
        safeSetState(setLoading, false);
        toast({
          title: "Error loading blogs",
          description: "Could not load blog posts. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      if (!unmountedRef.current) {
        renderingRef.current = false;
      }
    }
  }, [safeSetState]);

  // Render blog post function with enhanced safety and debugging
  const renderBlogPost = useCallback(async (slug: string) => {
    if (unmountedRef.current || renderingRef.current) {
      console.log("Skipping blog post render - component unmounted or already rendering");
      return;
    }
    
    console.log(`Starting blog post render for slug: ${slug}`);
    renderingRef.current = true;
    safeSetState(setLoading, true);
    safeSetState(setRenderError, null);
    safeSetState(setDataLoaded, false);
    
    try {
      // Verify we're still mounted before continuing
      if (unmountedRef.current) {
        console.log("Component unmounted during render, aborting");
        return;
      }
      
      // Clean up any existing blog list container first - only if needed
      if (document.getElementById('blog-list-container')) {
        try {
          console.log("Cleaning up blog list container");
          blogService.cleanupContainer('blog-list-container');
        } catch (error) {
          console.error("Error cleaning up blog list container:", error);
        }
      }
      
      // Verify we're still mounted before continuing
      if (unmountedRef.current) return;
      
      // Then render the post with debugging
      console.log(`Calling blogService.renderBlogPost for slug: ${slug}`);
      await blogService.renderBlogPost('blog-post-container', slug, {
        fallbackContent: `The blog post "${slug}" could not be found.`,
        retryOnFailure: true,
        retryAttempts: 3
      });
      
      if (!unmountedRef.current) {
        console.log("Blog post render completed");
        safeSetState(setLoading, false);
        safeSetState(setDataLoaded, true);
      }
    } catch (error) {
      console.error("Error rendering blog post:", error);
      if (!unmountedRef.current) {
        safeSetState(setLoading, false);
        
        // Handle "not found" errors
        if (error instanceof Error && error.message && error.message.includes("not found")) {
          console.log(`Blog post "${slug}" not found, redirecting to blog index`);
          safeSetState(setRenderError, `Blog post "${slug}" not found`);
        } else {
          toast({
            title: "Error loading blog post",
            description: "Could not load the blog post. Please try again later.",
            variant: "destructive",
          });
        }
      }
    } finally {
      if (!unmountedRef.current) {
        renderingRef.current = false;
      }
    }
  }, [safeSetState]);

  // Cleanup function with additional safety
  const cleanup = useCallback(() => {
    try {
      console.log("Running cleanup function");
      // Only attempt cleanup if we're not already unmounting
      if (!unmountedRef.current && !blogService.isUnmounting()) {
        // First check if containers exist before cleaning up
        if (document.getElementById('blog-list-container')) {
          blogService.cleanupContainer('blog-list-container');
        }
        
        if (document.getElementById('blog-post-container')) {
          blogService.cleanupContainer('blog-post-container');
        }
      }
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  }, []);

  // Handle 404 redirects
  useEffect(() => {
    if (renderError && !unmountedRef.current) {
      console.log("Redirecting due to render error:", renderError);
      navigate('/blog', { 
        replace: true,
        state: { error: renderError }
      });
    }
  }, [renderError, navigate]);

  return {
    loading,
    dataLoaded,
    renderError,
    renderBlogList,
    renderBlogPost,
    cleanup,
    safeSetState,
    unmountedRef
  };
}
