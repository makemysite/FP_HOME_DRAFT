
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogRenderer from '@/components/BlogContent/BlogRenderer';
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { Button } from '@/components/ui/button';
import { getBlogPostBySlug } from "@/lib/blog/queries";
import { useToast } from "@/hooks/use-toast";

interface BlogPostClientContentProps {
  initialPost?: any;
  slug?: string;
}

// Default placeholder for missing images
const IMAGE_PLACEHOLDER = 'https://placehold.co/600x400/e9e9e9/969696?text=Image+Not+Available';

const BlogPostClientContent = ({ initialPost, slug: propSlug }: BlogPostClientContentProps) => {
  const params = useParams<{ slug: string }>();
  const slug = propSlug || params.slug || '';
  const [post, setPost] = useState<any>(initialPost);
  const [loading, setLoading] = useState(!initialPost);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!slug) {
      setError("Blog post not found");
      setLoading(false);
      return;
    }

    // Skip fetching if we already have the initial post
    if (initialPost) {
      setLoading(false);
      return;
    }

    const loadBlogPost = async () => {
      try {
        console.log(`Attempting to load blog post with slug: ${slug}`);
        const fetchedPost = await getBlogPostBySlug(slug);
        
        if (fetchedPost) {
          console.log("Blog post loaded successfully:", fetchedPost.title);
          setPost(fetchedPost);
        } else {
          console.error(`No blog post found with slug: ${slug}`);
          setError(`Blog post not found: ${slug}`);
          toast({
            title: "Not Found",
            description: `Could not find the blog post "${slug}"`,
            variant: "destructive"
          });
        }
      } catch (err: any) {
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
  }, [slug, toast, initialPost]);
  
  if (loading) {
    return (
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
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700 mb-4">{error || "Blog post not found"}</h3>
        <p className="text-gray-500 mb-6">The requested blog post could not be found or loaded.</p>
        <Button asChild>
          <Link to="/blog">
            Return to Blog
          </Link>
        </Button>
      </div>
    );
  }

  // Optimize the image path if needed
  const optimizedPost = { ...post };
  if (optimizedPost.hero_image) {
    optimizedPost.hero_image = optimizedPost.hero_image || IMAGE_PLACEHOLDER;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="outline" className="mb-6">
          <Link to="/blog" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
        
        <div className="bg-white rounded-lg overflow-hidden">
          <BlogRenderer post={optimizedPost} />
        </div>
      </div>
    </div>
  );
};

export default BlogPostClientContent;
