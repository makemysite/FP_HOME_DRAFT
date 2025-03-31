
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getBlogPostBySlug } from "@/lib/blog/queries";
import BlogRenderer from "@/components/BlogContent/BlogRenderer";

// Fix the type annotation for useParams
type BlogPostParams = {
  slug: string;
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<BlogPostParams>();
  const [blogPost, setBlogPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!slug) {
      setError("Blog post not found");
      setLoading(false);
      return;
    }

    const loadBlogPost = async () => {
      try {
        console.log(`Attempting to load blog post with slug: ${slug}`);
        
        const post = await getBlogPostBySlug(slug);
        
        if (post) {
          console.log("Blog post loaded successfully:", post.title);
          setBlogPost(post);
        } else {
          console.error(`No blog post found with slug: ${slug}`);
          setError(`Blog post not found: ${slug}`);
          toast({
            title: "Not Found",
            description: `Could not find the blog post "${slug}"`,
            variant: "destructive"
          });
        }
      } catch (err) {
        console.error("Error loading blog post:", err);
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
    
  }, [slug, toast]);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="w-full">
        <Navbar />
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <Button asChild variant="outline" className="mb-6">
          <Link to="/blog" className="inline-flex items-center mb-8 text-[#E98A23] hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
        
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
              <Button 
                asChild
                className="bg-[#E98A23] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                <Link to="/blog">
                  Return to Blog
                </Link>
              </Button>
            </div>
          ) : (
            <BlogRenderer post={blogPost} />
          )}
        </div>
      </main>
      
      {/* Add the blog post custom styles */}
      <link rel="stylesheet" href="/blog-integration/blog-styles.css" />
      <link rel="stylesheet" href="/blogsmith-custom.css" />
    </div>
  );
};

export default BlogPost;
