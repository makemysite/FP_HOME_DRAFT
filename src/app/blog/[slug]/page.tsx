
import React from "react";
import { getBlogPostBySlug } from "@/lib/blog/queries";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import ServerBlogPage from "../ServerBlogPage";
import BlogPostClientContent from "./BlogPostClientContent";
import { ClientOnly } from "@/lib/client-utils";

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
  try {
    // Pre-fetch the blog post on the server - IMPORTANT: await the promise
    const post = await getBlogPostBySlug(params.slug);
    
    // If post doesn't exist, return 404
    if (!post) {
      notFound();
    }
    
    return (
      <ServerBlogPage 
        heading={post.title}
        subheading=""
      >
        <ClientOnly>
          <BlogPostClientContent initialPost={post} slug={params.slug} />
        </ClientOnly>
      </ServerBlogPage>
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }
}
