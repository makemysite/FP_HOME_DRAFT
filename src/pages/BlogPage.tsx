
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogContainer from "@/components/blog/BlogContainer";
import { useBlog } from "@/hooks/use-blog";
import { toast } from "@/hooks/use-toast";

const BlogPage: React.FC = () => {
  const location = useLocation();
  const { 
    loading, 
    renderBlogList, 
    renderBlogPost, 
    cleanup
  } = useBlog();
  
  // Reference to track if component is mounted
  const isMounted = useRef(true);
  
  // Set up mount/unmount tracking
  useEffect(() => {
    isMounted.current = true;
    
    return () => {
      isMounted.current = false;
      cleanup();
    };
  }, [cleanup]);
  
  // Handle blog rendering based on URL with safe checks
  useEffect(() => {
    if (!isMounted.current) return;
    
    const path = location.pathname;
    const slug = path.replace('/blog/', '').replace(/\/$/, ''); // Remove trailing slash if present
    
    console.log(`Current path: ${path}, slug: ${slug}`);
    
    const renderContent = async () => {
      try {
        if (path === '/blog' || path === '/blog/') {
          await renderBlogList();
        } else if (path.startsWith('/blog/') && slug) {
          await renderBlogPost(slug);
        }
      } catch (error) {
        console.error("Error rendering blog content:", error);
        if (isMounted.current) {
          toast({
            title: "Error Loading Content",
            description: "There was a problem loading the blog content. Please try again.",
            variant: "destructive",
          });
        }
      }
    };
    
    renderContent();
    
  }, [location.pathname, renderBlogList, renderBlogPost]);

  // Check for error from previous navigation
  useEffect(() => {
    if (location.state && location.state.error && location.pathname === '/blog') {
      toast({
        title: "Blog Post Not Found",
        description: location.state.error,
        variant: "destructive",
      });
      
      // Clear the error state to prevent showing the toast multiple times
      history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogHeader />

        <div className="mt-12">
          {/* Blog list container */}
          {(location.pathname === '/blog' || location.pathname === '/blog/') && (
            <BlogContainer id="blog-list-container" loading={loading} type="list" />
          )}
          
          {/* Blog post container */}
          {location.pathname !== '/blog' && location.pathname !== '/blog/' && (
            <BlogContainer id="blog-post-container" loading={loading} type="post" />
          )}
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
