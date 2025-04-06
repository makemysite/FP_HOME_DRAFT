
import React from "react";
import BlogPageClient from "@/components/blog/BlogPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Field Promax - Field Service Management Insights",
  description: "Expert insights, tips, and strategies for field service management. Stay updated with the latest trends and best practices in the service industry.",
  keywords: "field service blog, service management insights, field service tips, service business strategies",
  openGraph: {
    title: "Blog | Field Promax - Field Service Management Insights",
    description: "Expert insights, tips, and strategies for field service management. Stay updated with the latest trends and best practices in the service industry.",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
