
import React from "react";
import { getBlogPostBySlug } from "@/lib/blog/queries";
import { useParams } from "react-router-dom";
import ServerBlogPage from "../ServerBlogPage";
import BlogPostClientContent from "./BlogPostClientContent";
import { ClientOnly } from "@/lib/client-utils";

// This component needs to be client-side since we're using React Router
export default function BlogPostPage() {
  // Use React Router's useParams instead of Next.js style props
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return (
      <ServerBlogPage heading="Blog Post Not Found">
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700 mb-4">Invalid blog URL</h3>
          <p className="text-gray-500 mb-6">No blog post slug was provided.</p>
        </div>
      </ServerBlogPage>
    );
  }
  
  // Note: We now pass the slug to BlogPostClientContent and let it handle the data fetching
  return (
    <ServerBlogPage>
      <ClientOnly>
        <BlogPostClientContent slug={slug} />
      </ClientOnly>
    </ServerBlogPage>
  );
}
