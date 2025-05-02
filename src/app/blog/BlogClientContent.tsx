
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import BlogFilters from "@/components/blog/BlogFilters";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ErrorBoundary from "@/components/ErrorBoundary";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious, 
  PaginationEllipsis 
} from "@/components/ui/pagination";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  hero_image: string | null;
  created_at: string;
  category: "Industry Insights" | "Field Operations" | "Technology Trends" | "Growth" | null;
}

// Number of posts to display per page
const POSTS_PER_PAGE = 10;

export default function BlogClientContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [paginatedPosts, setPaginatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);
  const { toast } = useToast();

  const categories = ["Industry Insights", "Field Operations", "Technology Trends", "Growth"];

  const fetchBlogPosts = useCallback(async (retryAttempt = 0) => {
    try {
      setLoading(true);
      setError(null);
      setRetrying(retryAttempt > 0);
      
      console.log(`Fetching blog posts... (attempt ${retryAttempt + 1})`);
      // Set a timeout to handle network issues - increase timeout for retries
      const timeoutDuration = retryAttempt > 0 ? 15000 : 10000;
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), timeoutDuration)
      );
      
      // First, get the count of all published posts
      const countPromise = supabase
        .from('blog_posts')
        .select('id', { count: 'exact', head: true })
        .eq('published', true);
      
      // Then fetch just the posts for the current page
      const fetchPromise = supabase
        .from('blog_posts')
        .select('id, slug, title, description, hero_image, created_at, category')
        .eq('published', true)
        .order('created_at', { ascending: false });
          
      // Race between fetch and timeout
      const [countResult, dataResult] = await Promise.all([
        Promise.race([countPromise, timeoutPromise]),
        Promise.race([fetchPromise, timeoutPromise])
      ]) as [any, any];
      
      if (countResult.error) {
        throw countResult.error;
      }
      
      if (dataResult.error) {
        throw dataResult.error;
      }
      
      const totalCount = countResult.count || 0;
      setTotalPosts(totalCount);
      
      console.log('Blog posts fetched successfully:', dataResult.data?.length);
      console.log('Total blog posts:', totalCount);
      
      setBlogPosts(dataResult.data || []);
      setFilteredPosts(dataResult.data || []);
      
    } catch (error: any) {
      console.error('Error fetching blog posts:', error);
      setError(`Failed to load blog posts: ${error.message || 'Unknown error'}`);
      
      // Auto-retry once with increased timeout
      if (retryAttempt < 1) {
        console.log('Retrying blog post fetch...');
        setTimeout(() => fetchBlogPosts(retryAttempt + 1), 1000);
      } else {
        toast({
          title: "Error",
          description: "Failed to load blog posts. Please try again later.",
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  }, [toast]);

  // Update URL with page parameter when changing pages
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(location.search);
    params.set('page', page.toString());
    
    // Navigate to the new URL with the updated page parameter
    navigate(`/blog?${params.toString()}`);
  };

  useEffect(() => {
    fetchBlogPosts();
  }, [fetchBlogPosts]);

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
    // Reset to page 1 when filters change
    if (currentPage !== 1) {
      handlePageChange(1);
    }
  }, [blogPosts, searchQuery, selectedCategory, dateRange]);

  // Calculate pagination values
  useEffect(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    setPaginatedPosts(filteredPosts.slice(startIndex, endIndex));
  }, [filteredPosts, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));

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

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5; // Maximum number of page links to show

    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink
          isActive={currentPage === 1}
          onClick={() => currentPage !== 1 && handlePageChange(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Calculate range of visible pages
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);

    // Adjust if we're near the beginning
    if (startPage > 2) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => currentPage !== i && handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add ellipsis if needed
    if (endPage < totalPages - 1) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => currentPage !== totalPages && handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
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
    );
  }

  return (
    <ErrorBoundary>
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post) => (
              <Link 
                to={`/blog/${post.slug}`} 
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
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {renderPaginationItems()}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </ErrorBoundary>
  );
}
