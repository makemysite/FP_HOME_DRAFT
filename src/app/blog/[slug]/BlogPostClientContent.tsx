
import React from 'react';
import BlogRenderer from '@/components/BlogContent/BlogRenderer';
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface BlogPostClientContentProps {
  post: any;
  loading?: boolean;
  error?: string | null;
}

const BlogPostClientContent = ({ post, loading, error }: BlogPostClientContentProps) => {
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
          <Link href="/blog">
            Return to Blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="outline" className="mb-6">
          <Link href="/blog" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
        
        <div className="bg-white rounded-lg overflow-hidden">
          <BlogRenderer post={post} />
        </div>
      </div>
    </div>
  );
};

export default BlogPostClientContent;
