
import React from "react";
import ServerBlogPage from "./ServerBlogPage";
import BlogClientContent from "./BlogClientContent";
import { ClientOnly } from "@/lib/client-components";
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
  return (
    <ServerBlogPage>
      <ClientOnly fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array(6).fill(0).map((_, index) => (
            <div key={`skeleton-${index}`} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200" />
              <div className="p-6">
                <div className="h-6 bg-gray-200 w-3/4 mb-3 rounded" />
                <div className="h-4 bg-gray-200 w-1/3 mb-4 rounded" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 w-3/4 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      }>
        <BlogClientContent />
      </ClientOnly>
    </ServerBlogPage>
  );
}
