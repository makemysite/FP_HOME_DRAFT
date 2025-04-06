
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/landing/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/features/Footer";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  hero_image: string;
  created_at: string;
  category: string;
}

export default function BlogPageClient() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, slug, title, description, hero_image, created_at, category')
          .eq('published', true)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching blog posts:', error);
          toast({
            title: "Error",
            description: "Failed to load blog posts. Please try again later.",
            variant: "destructive"
          });
          return;
        }
        
        setBlogPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        toast({
          title: "Error",
          description: "Failed to load blog posts. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [toast]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      </main>
      
      <Footer />
    </div>
  );
}
