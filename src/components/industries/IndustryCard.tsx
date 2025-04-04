
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface IndustryCardProps {
  title: string;
  description: string;
  className?: string;
}

const IndustryCard = ({ title, description, className }: IndustryCardProps) => {
  return (
    <Card className={cn(
      "h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-pointer", 
      className
    )}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold text-[#E98A23]">{title}</CardTitle>
        <ExternalLink 
          className="text-[#E98A23] opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
          size={20} 
        />
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-700">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default IndustryCard;
