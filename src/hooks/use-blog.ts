
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import blogService from '@/lib/blog/blog-service';

export function useBlog() {
  const [loading, setLoading] = useState(true);
  const [renderError, setRenderError] = useState<string | null>(null);
  const unmountedRef = useRef(false);
  const navigate = useNavigate();

  // Safe state setter that only updates if component is still mounted
  const safeSetState = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, value: T) => {
    if (!unmountedRef.current) {
      setter(value);
    }
  };

  // Sets up the unmount tracking
  useEffect(() => {
    unmountedRef.current = false;
    
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  // Render blog list function
  const renderBlogList = async () => {
    if (unmountedRef.current) return;
    safeSetState(setLoading, true);
    safeSetState(setRenderError, null);
    
    try {
      await blogService.renderBlogList('blog-list-container');
      if (!unmountedRef.current) safeSetState(setLoading, false);
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
  };

  // Render blog post function
  const renderBlogPost = async (slug: string) => {
    if (unmountedRef.current) return;
    safeSetState(setLoading, true);
    safeSetState(setRenderError, null);
    
    try {
      await blogService.renderBlogPost('blog-post-container', slug);
      if (!unmountedRef.current) safeSetState(setLoading, false);
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
  };

  // Cleanup function to be called on unmount
  const cleanup = () => {
    blogService.cleanupContainer('blog-list-container');
    blogService.cleanupContainer('blog-post-container');
  };

  // Handle 404 redirects
  useEffect(() => {
    if (renderError) {
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
