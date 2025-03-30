
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import BlogEmbed from "@/lib/blog/blogsmith-embed";

const BlogPage: React.FC = () => {
  const blogListRef = useRef<HTMLDivElement>(null);
  const blogPostRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize BlogEmbed
    const blogEmbed = new BlogEmbed();
    
    // Determine if we're viewing a single post or the blog list
    const path = window.location.pathname;
    const slug = path.replace('/blog/', '');
    
    if (path === '/blog' || path === '/blog/') {
      // We're on the main blog page, render the blog list
      if (blogListRef.current) {
        blogEmbed.renderBlogList('blog-list-container', {
          limit: 8,
          showDescription: true,
          showImage: true
        });
      }
    } else if (path.startsWith('/blog/') && slug !== '') {
      // We're on a single blog post page, render that post
      if (blogPostRef.current) {
        blogEmbed.renderBlogPost('blog-post-container', slug);
      }
    }
    
    // Cleanup function
    return () => {
      // Clean up any event listeners or subscriptions if needed
    };
  }, []);

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
            <div id="blog-list-container" ref={blogListRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Content will be rendered by BlogEmbed */}
            </div>
            
            {/* Blog post container - this will be populated by BlogEmbed for single posts */}
            <div id="blog-post-container" ref={blogPostRef} className="prose max-w-none">
              {/* Content will be rendered by BlogEmbed */}
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
        
        .blog-embed-post-content {
          margin-top: a1.5rem;
          line-height: 1.8;
        }
      `}</style>
    </div>
  );
};

export default BlogPage;
