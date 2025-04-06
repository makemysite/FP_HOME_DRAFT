
import React from "react";
import BlogPostClient from "@/components/blog/BlogPostClient";
import { getBlogPostBySlug } from "@/lib/blog/queries";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch blog post by slug
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }

  return {
    title: `${post.title} | Field Promax Blog`,
    description: post.description || "Read this insightful article from Field Promax",
    openGraph: {
      title: post.title,
      description: post.description || "Read this insightful article from Field Promax",
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
      ...(post.hero_image && { images: [post.hero_image] }),
    },
    keywords: post.tags || post.category || "field service management",
  };
}

export default async function BlogPostPage({ params }: Props) {
  // Pre-fetch the blog post on the server
  const post = await getBlogPostBySlug(params.slug);
  
  // If post doesn't exist, return 404
  if (!post) {
    notFound();
  }
  
  return <BlogPostClient initialPost={post} slug={params.slug} />;
}
