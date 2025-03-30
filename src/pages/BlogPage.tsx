import React, { useEffect, useRef, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogContainer from "@/components/blog/BlogContainer";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useBlog } from "@/hooks/use-blog";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const SafeAsyncComponent: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const isMounted = useRef(true);
  
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  return <>{children}</>;
};

const BlogPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [contentError, setContentError] = useState(false);
  const { 
    loading, 
    dataLoaded,
    renderBlogList, 
    renderBlogPost, 
    cleanup
  } = useBlog();
  
  const isMounted = useRef(true);
  const isProcessingRoute = useRef(false);
  const previousPath = useRef(location.pathname);
  const retryCount = useRef(0);
  const maxRetries = 3;
  
  const safeCleanup = useCallback(() => {
    console.log("Running safe cleanup");
    if (!isMounted.current) return;
    
    setTimeout(() => {
      try {
        if (isMounted.current) {
          console.log("Executing deferred cleanup");
          cleanup();
        }
      } catch (error) {
        console.error("Error during deferred cleanup:", error);
      }
    }, 50);
  }, [cleanup]);
  
  useEffect(() => {
    console.log("BlogPage mounted");
    setContentError(false);
    isMounted.current = true;
    
    return () => {
      console.log("BlogPage unmounting");
      isMounted.current = false;
      setTimeout(() => {
        try {
          cleanup();
        } catch (error) {
          console.error("Error during cleanup on unmount:", error);
        }
      }, 100);
    };
  }, [cleanup]);
  
  useEffect(() => {
    if (!isMounted.current || isProcessingRoute.current) return;
    
    if (previousPath.current === location.pathname && dataLoaded) return;
    
    console.log(`Processing route change from ${previousPath.current} to ${location.pathname}`);
    
    setContentError(false);
    previousPath.current = location.pathname;
    isProcessingRoute.current = true;
    
    const path = location.pathname;
    const slug = path.replace('/blog/', '').replace(/\/$/, '');
    
    console.log(`Current path: ${path}, slug: ${slug}`);
    
    safeCleanup();
    
    const renderContent = async () => {
      try {
        if (!isMounted.current) {
          isProcessingRoute.current = false;
          return;
        }
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (!isMounted.current) {
          isProcessingRoute.current = false;
          return;
        }
        
        console.log(`Rendering content for path: ${path}`);
        if (path === '/blog' || path === '/blog/') {
          await renderBlogList();
        } else if (path.startsWith('/blog/') && slug) {
          await renderBlogPost(slug);
        }
      } catch (error) {
        console.error("Error rendering blog content:", error);
        if (isMounted.current) {
          setContentError(true);
          toast({
            title: "Error Loading Content",
            description: "There was a problem loading the blog content. Please try again.",
            variant: "destructive",
          });
        }
      } finally {
        if (isMounted.current) {
          isProcessingRoute.current = false;
        }
      }
    };
    
    setTimeout(renderContent, 150);
    
    return () => {
      isProcessingRoute.current = false;
    };
  }, [location.pathname, renderBlogList, renderBlogPost, safeCleanup, dataLoaded]);
  
  useEffect(() => {
    if (loading && !dataLoaded && retryCount.current < maxRetries) {
      let timeoutId: number | undefined;
      
      timeoutId = window.setTimeout(() => {
        if (isMounted.current && loading && !dataLoaded) {
          console.log(`Retrying content load, attempt ${retryCount.current + 1}`);
          retryCount.current += 1;
          
          safeCleanup();
          
          setTimeout(() => {
            if (isMounted.current) {
              const path = location.pathname;
              if (path === '/blog' || path === '/blog/') {
                renderBlogList();
              } else {
                const slug = path.replace('/blog/', '').replace(/\/$/, '');
                if (slug) renderBlogPost(slug);
              }
            }
          }, 200);
        }
      }, 8000);
    } else if (!loading && !dataLoaded && retryCount.current >= maxRetries && isMounted.current) {
      setContentError(true);
      
      toast({
        title: "Content Loading Failed",
        description: "We couldn't load the blog content after multiple attempts. Please try again later.",
        variant: "destructive",
      });
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loading, dataLoaded, location.pathname, renderBlogList, renderBlogPost, safeCleanup]);
  
  useEffect(() => {
    if (location.state && location.state.error && location.pathname === '/blog' && isMounted.current) {
      toast({
        title: "Blog Post Not Found",
        description: location.state.error,
        variant: "destructive",
      });
      
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  
  const EmptyState = () => (
    <div className="w-full py-12 text-center">
      <Alert variant="destructive" className="max-w-xl mx-auto">
        <AlertTriangle className="h-4 w-4 mr-2" />
        <AlertDescription>
          No blog content is available at the moment. This could be due to connection issues or no published posts.
        </AlertDescription>
      </Alert>
      <div className="mt-6">
        <p className="text-gray-500">
          Please try again later or check your connection to the blog database.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 transition-colors"
        >
          Refresh page
        </button>
      </div>
    </div>
  );
  
  return (
    <SafeAsyncComponent>
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BlogHeader />

          <div className="mt-12">
            <ErrorBoundary>
              {(location.pathname === '/blog' || location.pathname === '/blog/') && (
                <>
                  <BlogContainer id="blog-list-container" loading={loading} type="list" error={contentError} />
                  {!loading && !dataLoaded && retryCount.current >= maxRetries && <EmptyState />}
                </>
              )}
              
              {location.pathname !== '/blog' && location.pathname !== '/blog/' && (
                <>
                  <BlogContainer id="blog-post-container" loading={loading} type="post" error={contentError} />
                  {!loading && !dataLoaded && retryCount.current >= maxRetries && <EmptyState />}
                </>
              )}
            </ErrorBoundary>
          </div>
        </div>
        
        <style>{`
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
          
          .blog-embed-loading, .blog-embed-empty, .blog-embed-error {
            width: 100%;
            padding: 2rem;
            text-align: center;
            color: #6b7280;
            font-size: 1.125rem;
          }
          
          .blog-embed-error {
            color: #ef4444;
            background-color: #fff3f3;
            border: 1px solid #ffd0d0;
            border-radius: 5px;
            padding: 15px;
            margin: 10px 0;
          }
          
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
    </SafeAsyncComponent>
  );
};

export default BlogPage;
