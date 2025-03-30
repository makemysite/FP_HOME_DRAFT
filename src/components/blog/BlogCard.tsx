
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  description,
  date,
  imageUrl,
  slug,
}) => {
  return (
    <Card className="overflow-hidden border border-gray-200 h-full flex flex-col hover:shadow-md transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter>
        <Link 
          to={`/blog/${slug}`} 
          className="inline-flex items-center text-[#E98A23] hover:text-[#c97520] font-medium"
        >
          Read More
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
