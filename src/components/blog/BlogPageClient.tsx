
"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/landing/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/features/Footer";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ErrorBoundary from "@/components/ErrorBoundary";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  hero_image: string | null;
  created_at: string;
  category: "Industry Insights" | "Field Operations" | "Technology Trends" | "Growth" | null;
}

export default function BlogPageClient() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);
  const { toast } = useToast();

  const fetchBlogPosts = async (retryAttempt = 0) => {
    setLoading(true);
    setError(null);
    setRetrying(retryAttempt > 0);
    
    try {
      console.log(`Fetching blog posts... (attempt ${retryAttempt + 1})`);
      
      // Set a timeout to handle network issues - increase timeout for retries
      const timeoutDuration = retryAttempt > 0 ? 15000 : 10000;
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), timeoutDuration)
      );
      
      // Use simpler query with fewer fields for faster response
      const fetchPromise = supabase
        .from('blog_posts')
        .select('id, slug, title, description, hero_image, created_at, category')
        .eq('published', true)
        .order('created_at', { ascending: false });
          
      // Race between fetch and timeout
      const { data, error: supabaseError } = await Promise.race([
        fetchPromise,
        timeoutPromise.then(() => { throw new Error('Request timeout'); })
      ]) as any;
      
      if (supabaseError) {
        throw supabaseError;
      }
      
      console.log('Blog posts fetched successfully:', data?.length);
      setBlogPosts(data || []);
      setLoading(false);
      setRetrying(false);
    } catch (error: any) {
      console.error('Error fetching blog posts:', error);
      setError(`Failed to load blog posts: ${error.message || 'Unknown error'}`);
      
      // Auto-retry once with increased timeout
      if (retryAttempt < 1) {
        console.log('Retrying blog post fetch...');
        setTimeout(() => fetchBlogPosts(retryAttempt + 1), 1000);
      } else {
        setLoading(false);
        setRetrying(false);
        toast({
          title: "Error",
          description: "Failed to load blog posts. Please try again later.",
          variant: "destructive"
        });
      }
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, [toast]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleRetry = () => {
    fetchBlogPosts();
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="w-full">
        <Navbar />
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#170F49] mb-4">Our Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, thoughts, and stories about growing your business and optimizing your operations.
          </p>
        </div>

        <ErrorBoundary fallback={
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-4">Something went wrong</h3>
            <p className="text-gray-500 mb-6">We couldn't load the blog posts</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-[#E98A23] text-white hover:bg-opacity-90 transition-colors"
            >
              Reload page
            </Button>
          </div>
        }>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-1/3 mb-4" />
                    <Skeleton className="h-20 w-full mb-4" />
                    <Skeleton className="h-10 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <AlertCircle className="h-12 w-12 text-red-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-4">Error Loading Blog Posts</h3>
              <p className="text-gray-500 mb-6">{error}</p>
              <Button 
                onClick={handleRetry} 
                className="bg-[#E98A23] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
                disabled={retrying}
              >
                {retrying ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Retrying...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    <span>Try Again</span>
                  </>
                )}
              </Button>
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link 
                  href={`/blog/${post.slug}`} 
                  key={post.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="h-48 overflow-hidden">
                    {post.hero_image ? (
                      <img 
                        src={post.hero_image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width="400"
                        height="300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/600x400/e9e9e9/969696?text=Image+Not+Available';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-sm text-[#E98A23] font-medium">
                        {post.category || 'Uncategorized'}
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">
                        {formatDate(post.created_at)}
                      </span>
                    </div>
                    <h2 className="font-bold text-xl mb-3 text-[#170F49] line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.description || "Read more about this topic..."}
                    </p>
                    <div className="text-[#E98A23] font-medium hover:underline">
                      Read More
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-4">No blog posts found</h3>
              <p className="text-gray-500">Check back later for new content.</p>
            </div>
          )}
        </ErrorBoundary>
      </main>
      
      <Footer />
    </div>
  );
}
