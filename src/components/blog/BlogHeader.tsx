
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BlogHeader: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-8">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#170F49] mb-6">Our Blog</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Stay up to date with the latest trends, tips, and insights in field service management
          and cloud-based solutions.
        </p>
      </div>
    </div>
  );
};

export default BlogHeader;
