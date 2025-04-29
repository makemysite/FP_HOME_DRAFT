
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
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
}

interface ProductUpdateFeature {
  id: string;
  product_update_id: string;
  title: string;
  description: string;
  is_key_feature: boolean;
  order_index: number;
}

const ProductUpdatesList = () => {
  const [updates, setUpdates] = useState<ProductUpdate[]>([]);
  const [keyFeatures, setKeyFeatures] = useState<Record<string, ProductUpdateFeature[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  
  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        let query = supabase
          .from('product_updates')
          .select('*')
          .eq('status', 'published')
          .order('year', { ascending: false })
          .order('quarter', { ascending: false });
        
        if (selectedYear !== "all") {
          // Convert string to number for year filtering
          query = query.eq('year', parseInt(selectedYear, 10));
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        setUpdates(data as ProductUpdate[]);
        
        // Fetch key features for each product update
        if (data && data.length > 0) {
          const featuresMap: Record<string, ProductUpdateFeature[]> = {};
          
          for (const update of data) {
            const { data: features, error: featuresError } = await supabase
              .from('product_update_features')
              .select('*')
              .eq('product_update_id', update.id)
              .eq('is_key_feature', true)
              .order('order_index', { ascending: true });
            
            if (!featuresError && features) {
              featuresMap[update.id] = features as ProductUpdateFeature[];
            }
          }
          
          setKeyFeatures(featuresMap);
        }
      } catch (err: any) {
        console.error('Error fetching updates:', err);
        setError(err.message || 'Failed to load product updates');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUpdates();
  }, [selectedYear]);
  
  // Get unique years from updates to populate the filter
  const uniqueYears = [...new Set(updates.map(update => update.year))].sort((a, b) => b - a);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2">Loading product updates...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-800 rounded-lg">
        <h2 className="text-lg font-semibold">Error</h2>
        <p>{error}</p>
      </div>
    );
  }
  
  if (updates.length === 0) {
    return (
      <div className="py-10 text-center">
        <h2 className="text-2xl font-bold">No product updates available</h2>
        <p className="text-gray-500 mt-2">
          Check back soon for the latest product updates and new features.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Product Updates</h2>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Filter by year:</span>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-white border rounded px-2 py-1"
          >
            <option value="all">All Years</option>
            {uniqueYears.map(year => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {updates.map(update => (
          <Card key={update.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {update.image_url && (
                <div className="md:w-1/3">
                  <img 
                    src={update.image_url} 
                    alt={update.title} 
                    className="w-full h-full object-cover aspect-square md:aspect-auto" 
                  />
                </div>
              )}
              <div className={`flex-1 ${update.image_url ? 'md:w-2/3' : 'w-full'}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="mb-2">Q{update.quarter}/{update.year}</Badge>
                      <CardTitle className="text-2xl">{update.title}</CardTitle>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(update.published_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  <CardDescription className="mt-2">{update.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  {keyFeatures[update.id]?.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {keyFeatures[update.id].map(feature => (
                          <li key={feature.id} className="flex">
                            <span className="text-primary font-bold mr-2">•</span>
                            <span>{feature.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
                
                <Separator />
                
                <CardFooter className="pt-4">
                  <Link 
                    to={`/product-updates/${update.slug}`} 
                    className="text-primary hover:underline font-medium"
                  >
                    Read More
                  </Link>
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
