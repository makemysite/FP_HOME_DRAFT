
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface ProductUpdate {
  id: string;
  title: string;
  slug: string;
  description: string;
  quarter: string;
  year: number;
  published_at: string;
  image_url: string | null;
  features: {
    id: string;
    title: string;
    description: string;
    is_key_feature: boolean;
  }[];
}

const ProductUpdatesList = () => {
  const [updates, setUpdates] = useState<ProductUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [yearFilter, setYearFilter] = useState<string>("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpdates = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('product_updates')
          .select(`
            id, title, slug, description, quarter, year, published_at, image_url,
            product_update_features:product_update_features(id, title, description, is_key_feature)
          `)
          .eq('status', 'published')
          .order('year', { ascending: false })
          .order('quarter', { ascending: false });
          
        if (yearFilter !== 'all') {
          query = query.eq('year', yearFilter);
        }
        
        const { data, error } = await query;

        if (error) throw error;
        
        // Transform the data to have nested features
        const transformedData = data?.map(item => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          description: item.description,
          quarter: item.quarter,
          year: item.year,
          published_at: item.published_at,
          image_url: item.image_url,
          features: item.product_update_features
        })) || [];

        setUpdates(transformedData);
      } catch (error: any) {
        console.error("Error fetching product updates:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, [yearFilter]);

  // Get unique years for filter
  const uniqueYears = Array.from(new Set(updates.map(update => update.year))).sort((a, b) => b - a);

  const handleViewDetails = (slug: string) => {
    navigate(`/product-updates/${slug}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-gray-500">Loading product updates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500">Error loading product updates: {error}</p>
      </div>
    );
  }

  if (updates.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-gray-500">No product updates available yet.</p>
        <p className="text-gray-400 mt-2">Check back later for new features and improvements!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Latest Updates</h2>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Filter by year:</span>
          <Select
            value={yearFilter}
            onValueChange={setYearFilter}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Filter by year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {uniqueYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {updates.map((update) => (
          <Card key={update.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {update.image_url && (
                <div className="md:w-1/3 bg-gray-100">
                  <img 
                    src={update.image_url}
                    alt={update.title}
                    className="object-cover w-full h-full max-h-[240px] md:max-h-none"
                  />
                </div>
              )}
              <div className={`${update.image_url ? 'md:w-2/3' : 'w-full'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="mb-2 text-sm">
                      Q{update.quarter} {update.year}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {new Date(update.published_at).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-xl md:text-2xl">{update.title}</CardTitle>
                  <CardDescription className="text-base">
                    {update.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Key Features</h3>
                  <div className="space-y-2">
                    {update.features
                      .filter(feature => feature.is_key_feature)
                      .slice(0, 3)
                      .map(feature => (
                        <div key={feature.id} className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-green-600 text-sm">✓</span>
                          </div>
                          <p className="text-sm">{feature.title}</p>
                        </div>
                      ))}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button onClick={() => handleViewDetails(update.slug)}>
                    View Details
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductUpdatesList;
