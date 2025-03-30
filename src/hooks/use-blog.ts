
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import blogService from '@/lib/blog/blog-service';

export function useBlog() {
  const [loading, setLoading] = useState(true);
  const [renderError, setRenderError] = useState<string | null>(null);
  const unmountedRef = useRef(false);
  const navigate = useNavigate();

  // Safe state setter that only updates if component is still mounted
  const safeSetState = useCallback(<T,>(setter: React.Dispatch<React.SetStateAction<T>>, value: T) => {
    if (!unmountedRef.current) {
      setter(value);
    }
  }, []);

  // Sets up the unmount tracking
  useEffect(() => {
    unmountedRef.current = false;
    
    return () => {
      unmountedRef.current = true;
      // Perform immediate cleanup when unmounting
      blogService.cleanupAllContainers();
    };
  }, []);

  // Render blog list function with enhanced safety
  const renderBlogList = useCallback(async () => {
    if (unmountedRef.current) return;
    
    safeSetState(setLoading, true);
    safeSetState(setRenderError, null);
    
    try {
      // Clean up any existing blog post container first
      blogService.cleanupContainer('blog-post-container');
      
      // Then render the list
      await blogService.renderBlogList('blog-list-container');
      
      if (!unmountedRef.current) {
        safeSetState(setLoading, false);
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
    }
  }, [safeSetState]);

  // Render blog post function with enhanced safety
  const renderBlogPost = useCallback(async (slug: string) => {
    if (unmountedRef.current) return;
    
    safeSetState(setLoading, true);
    safeSetState(setRenderError, null);
    
    try {
      // Clean up any existing blog list container first
      blogService.cleanupContainer('blog-list-container');
      
      // Then render the post
      await blogService.renderBlogPost('blog-post-container', slug);
      
      if (!unmountedRef.current) {
        safeSetState(setLoading, false);
      }
    } catch (error) {
      console.error("Error rendering blog post:", error);
      if (!unmountedRef.current) {
        safeSetState(setLoading, false);
        
        // Handle "not found" errors
        if (error instanceof Error && error.message && error.message.includes("not found")) {
          safeSetState(setRenderError, `Blog post "${slug}" not found`);
        } else {
          toast({
            title: "Error loading blog post",
            description: "Could not load the blog post. Please try again later.",
            variant: "destructive",
          });
        }
      }
    }
  }, [safeSetState]);

  // Cleanup function with additional safety
  const cleanup = useCallback(() => {
    blogService.cleanupContainer('blog-list-container');
    blogService.cleanupContainer('blog-post-container');
  }, []);

  // Handle 404 redirects
  useEffect(() => {
    if (renderError && !unmountedRef.current) {
      navigate('/blog', { 
        replace: true,
        state: { error: renderError }
      });
    }
  }, [renderError, navigate]);

  return {
    loading,
    renderError,
    renderBlogList,
    renderBlogPost,
    cleanup,
    safeSetState,
    unmountedRef
  };
}
