
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import PageWrapper from '../components/layout/PageWrapper';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, ArrowLeft, CalendarIcon, Clock } from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  is_key_feature: boolean;
  image_url: string | null;
  order_index: number;
}

interface ProductUpdateDetails {
  id: string;
  title: string;
  slug: string;
  description: string;
  quarter: string;
  year: number;
  published_at: string;
  image_url: string | null;
  features: Feature[];
}

const ProductUpdateDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [update, setUpdate] = useState<ProductUpdateDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpdateDetails = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        // Fetch the product update
        const { data: updateData, error: updateError } = await supabase
          .from('product_updates')
          .select('*')
          .eq('status', 'published')
          .eq('slug', slug)
          .single();

        if (updateError) throw updateError;
        if (!updateData) throw new Error("Product update not found");
        
        // Fetch the features
        const { data: featuresData, error: featuresError } = await supabase
          .from('product_update_features')
          .select('*')
          .eq('product_update_id', updateData.id)
          .order('order_index');
          
        if (featuresError) throw featuresError;
        
        setUpdate({
          ...updateData,
          features: featuresData || []
        });
      } catch (error: any) {
        console.error("Error fetching product update:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdateDetails();
  }, [slug]);

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-gray-500">Loading product update...</p>
        </div>
      </PageWrapper>
    );
  }

  if (error || !update) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Product Update Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The product update you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/product-updates">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Updates
            </Link>
          </Button>
        </div>
      </PageWrapper>
    );
  }

  // Get key features and regular features
  const keyFeatures = update.features.filter(f => f.is_key_feature);
  const regularFeatures = update.features.filter(f => !f.is_key_feature);

  return (
    <PageWrapper>
      <div className="space-y-8">
        <Button variant="outline" asChild className="mb-4">
          <Link to="/product-updates">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Updates
          </Link>
        </Button>
        
        <div className="space-y-4">
          <Badge variant="outline" className="text-sm">
            Q{update.quarter} {update.year}
          </Badge>
          
          <h1 className="text-3xl md:text-4xl font-bold">{update.title}</h1>
          
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span className="text-sm">
                Published on {new Date(update.published_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {update.image_url && (
          <div className="rounded-lg overflow-hidden">
            <img 
              src={update.image_url} 
              alt={update.title}
              className="w-full h-auto max-h-[400px] object-cover"
            />
          </div>
        )}
        
        <div className="prose max-w-none">
          <p className="text-lg">{update.description}</p>
        </div>
        
        {keyFeatures.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {keyFeatures.map(feature => (
                <Card key={feature.id} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                    {feature.image_url && (
                      <div className="mt-4 rounded-md overflow-hidden">
                        <img
                          src={feature.image_url}
                          alt={feature.title}
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {regularFeatures.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Additional Improvements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularFeatures.map(feature => (
                <Card key={feature.id}>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                    {feature.image_url && (
                      <div className="mt-4 rounded-md overflow-hidden">
                        <img
                          src={feature.image_url}
                          alt={feature.title}
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default ProductUpdateDetail;
