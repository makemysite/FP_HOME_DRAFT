
import React from "react";
import Navbar from "@/components/landing/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/features/Footer";

// This is a server component
export default function ServerBlogPage({
  children,
  heading = "Our Blog",
  subheading = "Insights, thoughts, and stories about growing your business and optimizing your operations."
}: {
  children: React.ReactNode;
  heading?: string;
  subheading?: string;
}) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="w-full">
        <Navbar />
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#170F49] mb-4">{heading}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subheading}
          </p>
        </div>

        {children}
      </main>
      
      <Footer />
    </div>
  );
}
