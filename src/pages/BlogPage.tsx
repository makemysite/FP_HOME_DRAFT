
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogCard from "@/components/blog/BlogCard";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { AlertTriangle, Calendar, User } from "lucide-react";

const BlogList: React.FC = () => {
  const { blogPosts, loading, error } = useBlogPosts();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="flex flex-col gap-4 bg-gray-50 p-4 rounded-lg">
            <Skeleton className="w-full h-[200px] rounded-lg" />
            <Skeleton className="w-3/4 h-6" />
            <Skeleton className="w-full h-24" />
            <Skeleton className="w-1/4 h-6" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">Error Loading Blog Posts</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900 mb-2">No Blog Posts Yet</h3>
        <p className="text-gray-600">Check back soon for new content!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogPosts.map(post => (
        <BlogCard
          key={post.id}
          id={post.id}
          title={post.title}
          description={post.description}
          date={post.date}
          imageUrl={post.imageUrl}
          slug={post.slug}
        />
      ))}
    </div>
  );
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getBlogPostBySlug, loading, error } = useBlogPosts();
  
  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="w-full h-[400px] rounded-lg" />
        <Skeleton className="w-3/4 h-12" />
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-full h-32" />
        <div className="space-y-4">
          <Skeleton className="w-1/2 h-8" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">Error Loading Blog Post</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <article className="max-w-4xl mx-auto">
      <img 
        src={post.imageUrl} 
        alt={post.title} 
        className="w-full h-[400px] object-cover rounded-xl mb-8" 
      />
      
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
      
      <div className="flex items-center text-gray-600 mb-8 space-x-6">
        <div className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          <span>{post.author}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{post.date}</span>
        </div>
      </div>
      
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
};

const BlogPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogHeader />
        <div className="mt-12">
          {slug ? <BlogPost /> : <BlogList />}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
