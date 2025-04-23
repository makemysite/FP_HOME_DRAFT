
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import BlogFilters from "@/components/blog/BlogFilters";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  hero_image: string | null;
  created_at: string;
  category: "Industry Insights" | "Field Operations" | "Technology Trends" | "Growth" | null;
}

export default function BlogClientContent() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const categories = ["Industry Insights", "Field Operations", "Technology Trends", "Growth"];

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        console.log('Fetching blog posts...');
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, slug, title, description, hero_image, created_at, category')
          .eq('published', true)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching blog posts:', error);
          setError(`Failed to load blog posts: ${error.message}`);
          toast({
            title: "Error",
            description: "Failed to load blog posts. Please try again later.",
            variant: "destructive"
          });
          return;
        }
        
        console.log('Blog posts fetched successfully:', data?.length);
        setBlogPosts(data || []);
        setFilteredPosts(data || []);
      } catch (error: any) {
        console.error('Error fetching blog posts:', error);
        setError(`Failed to load blog posts: ${error.message || 'Unknown error'}`);
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

  useEffect(() => {
    let filtered = [...blogPosts];

    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (dateRange) {
      filtered = filtered.filter(post => {
        const postDate = new Date(post.created_at);
        return postDate >= dateRange.from && postDate <= dateRange.to;
      });
    }

    setFilteredPosts(filtered);
  }, [blogPosts, searchQuery, selectedCategory, dateRange]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
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
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Error Loading Blog Posts</h3>
        <p className="text-gray-500 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-[#E98A23] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <BlogFilters
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        onDateRange={setDateRange}
        categories={categories}
      />
      
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700 mb-4">No blog posts found</h3>
          <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
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
      )}
    </>
  );
}
