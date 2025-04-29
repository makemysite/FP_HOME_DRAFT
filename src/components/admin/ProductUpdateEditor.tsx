
import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, PlusCircle, Trash, ArrowUp, ArrowDown, Save } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label"; // Import regular Label component

interface ProductUpdateEditorProps {
  isOpen: boolean;
  onClose: () => void;
  productUpdate: {
    id: string;
    title: string;
    slug: string;
    description: string;
    status: 'draft' | 'published' | 'archived';
    quarter: string;
    year: number;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    image_url: string | null;
  } | null;
}

interface FeatureItem {
  id?: string;
  title: string;
  description: string;
  is_key_feature: boolean;
  image_url: string | null;
  order_index: number;
}

const quarters = ["1", "2", "3", "4"];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  quarter: z.string().min(1, "Quarter is required"),
  year: z.coerce.number().int().min(2000, "Year is required"),
  image_url: z.string().nullable(),
});

const ProductUpdateEditor = ({ isOpen, onClose, productUpdate }: ProductUpdateEditorProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [activeTab, setActiveTab] = useState("details");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: productUpdate?.title || "",
      slug: productUpdate?.slug || "",
      description: productUpdate?.description || "",
      quarter: productUpdate?.quarter || "1",
      year: productUpdate?.year || currentYear,
      image_url: productUpdate?.image_url || null,
    },
  });

  // Load features if editing an existing product update
  useEffect(() => {
    const fetchFeatures = async () => {
      if (productUpdate?.id) {
        try {
          const { data, error } = await supabase
            .from('product_update_features')
            .select('*')
            .eq('product_update_id', productUpdate.id)
            .order('order_index', { ascending: true });

          if (error) throw error;
          
          setFeatures(data || []);
        } catch (error) {
          console.error('Error fetching features:', error);
          toast.error('Failed to load features');
        }
      } else {
        setFeatures([]);
      }
    };

    fetchFeatures();
  }, [productUpdate]);

  const handleAddFeature = () => {
    setFeatures([
      ...features,
      {
        title: "",
        description: "",
        is_key_feature: false,
        image_url: null,
        order_index: features.length,
      },
    ]);
  };

  const handleFeatureChange = (index: number, field: keyof FeatureItem, value: any) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    setFeatures(updatedFeatures);
  };

  const handleToggleKeyFeature = (index: number) => {
    const updatedFeatures = [...features];
    updatedFeatures[index].is_key_feature = !updatedFeatures[index].is_key_feature;
    setFeatures(updatedFeatures);
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures.map((feature, i) => ({ ...feature, order_index: i })));
  };

  const handleMoveFeature = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === features.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedFeatures = [...features];
    
    // Swap items
    [updatedFeatures[index], updatedFeatures[newIndex]] = [updatedFeatures[newIndex], updatedFeatures[index]];
    
    // Update order_index values
    updatedFeatures.forEach((feature, i) => {
      feature.order_index = i;
    });
    
    setFeatures(updatedFeatures);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSaving(true);
    
    try {
      let productUpdateId = productUpdate?.id;
      
      // 1. Create or update the product update
      if (productUpdateId) {
        // Update existing product update
        const { error } = await supabase
          .from('product_updates')
          .update({
            title: values.title,
            slug: values.slug,
            description: values.description,
            quarter: values.quarter,
            year: values.year,
            image_url: values.image_url,
          })
          .eq('id', productUpdateId);

        if (error) throw error;
      } else {
        // Create new product update
        const { data, error } = await supabase
          .from('product_updates')
          .insert({
            title: values.title,
            slug: values.slug,
            description: values.description,
            quarter: values.quarter,
            year: values.year,
            image_url: values.image_url,
            status: 'draft',
          })
          .select('id')
          .single();

        if (error) throw error;
        
        productUpdateId = data.id;
      }
      
      // 2. Handle features
      if (productUpdateId) {
        // Process any existing features that need to be deleted
        if (productUpdate?.id) {
          const existingFeatureIds = features
            .filter(f => f.id)
            .map(f => f.id);
            
          // Delete features not in the current list
          await supabase
            .from('product_update_features')
            .delete()
            .eq('product_update_id', productUpdateId)
            .not('id', 'in', existingFeatureIds.length > 0 ? `(${existingFeatureIds.join(',')})` : '(null)');
        }
        
        // Now handle creating/updating each feature
        for (const feature of features) {
          if (feature.id) {
            // Update existing feature
            await supabase
              .from('product_update_features')
              .update({
                title: feature.title,
                description: feature.description,
                is_key_feature: feature.is_key_feature,
                image_url: feature.image_url,
                order_index: feature.order_index,
              })
              .eq('id', feature.id);
          } else {
            // Create new feature
            await supabase
              .from('product_update_features')
              .insert({
                product_update_id: productUpdateId,
                title: feature.title,
                description: feature.description,
                is_key_feature: feature.is_key_feature,
                image_url: feature.image_url,
                order_index: feature.order_index,
              });
          }
        }
      }
      
      toast.success(productUpdate ? 'Product update saved successfully' : 'New product update created');
      onClose();
    } catch (error: any) {
      console.error('Error saving product update:', error);
      toast.error('Failed to save product update');
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-generate slug when title changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue('title', title);
    
    if (!productUpdate) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      form.setValue('slug', slug);
    }
  };

  const hasInvalidFeatures = features.some(
    feature => !feature.title || !feature.description
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-3xl overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle>
            {productUpdate ? 'Edit Product Update' : 'Create Product Update'}
          </SheetTitle>
          <SheetDescription>
            {productUpdate 
              ? 'Make changes to this product update and its features' 
              : 'Add a new product update with features and key points'}
          </SheetDescription>
        </SheetHeader>

        <Tabs 
          defaultValue="details" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Basic Details</TabsTrigger>
            <TabsTrigger value="features">Features & Key Points</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="py-4">
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Q1 2025 Product Update" 
                          {...field} 
                          onChange={handleTitleChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="q1-2025-product-update" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="quarter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quarter</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select quarter" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {quarters.map((quarter) => (
                              <SelectItem key={quarter} value={quarter}>
                                Q{quarter}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <Select
                          value={field.value.toString()}
                          onValueChange={(value) => field.onChange(Number(value))}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="A short description of this product update" 
                          {...field} 
                          className="min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/image.jpg" 
                          {...field} 
                          value={field.value || ''}
                          onChange={(e) => field.onChange(e.target.value || null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="features" className="py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Features and Key Points</h3>
                <Button 
                  onClick={handleAddFeature} 
                  type="button"
                  variant="outline"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>

              {features.length === 0 ? (
                <div className="text-center p-8 bg-gray-50 rounded-md">
                  <p className="text-gray-500">No features added yet</p>
                  <Button 
                    onClick={handleAddFeature} 
                    type="button" 
                    className="mt-4"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add First Feature
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <Card key={feature.id || `new-feature-${index}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Feature {index + 1}</CardTitle>
                          <div className="flex items-center gap-1">
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleMoveFeature(index, 'up')}
                              disabled={index === 0}
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleMoveFeature(index, 'down')}
                              disabled={index === features.length - 1}
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveFeature(index)}
                            >
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          {/* Use regular Label here instead of FormLabel */}
                          <Label htmlFor={`feature-${index}-title`}>Title</Label>
                          <Input
                            id={`feature-${index}-title`}
                            value={feature.title}
                            onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                            placeholder="Feature title"
                          />
                        </div>
                        <div>
                          {/* Use regular Label here instead of FormLabel */}
                          <Label htmlFor={`feature-${index}-description`}>Description</Label>
                          <Textarea
                            id={`feature-${index}-description`}
                            value={feature.description}
                            onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                            placeholder="Detailed description of this feature"
                            className="min-h-[100px]"
                          />
                        </div>
                        <div>
                          {/* Use regular Label here instead of FormLabel */}
                          <Label htmlFor={`feature-${index}-image`}>Image URL (Optional)</Label>
                          <Input
                            id={`feature-${index}-image`}
                            value={feature.image_url || ''}
                            onChange={(e) => handleFeatureChange(index, 'image_url', e.target.value || null)}
                            placeholder="https://example.com/feature-image.jpg"
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          type="button"
                          variant={feature.is_key_feature ? "default" : "outline"}
                          onClick={() => handleToggleKeyFeature(index)}
                        >
                          {feature.is_key_feature ? "Key Feature ✓" : "Mark as Key Feature"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <SheetFooter className="pt-6">
          <div className="flex justify-between items-center w-full">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={form.handleSubmit(onSubmit)} 
              disabled={isSaving || hasInvalidFeatures}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Product Update
                </>
              )}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProductUpdateEditor;
