
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const dummyProductUpdate = {
  title: "Q1 2025 Product Update",
  slug: "q1-2025-product-update",
  description: "Our first quarter update of 2025 brings several exciting new features and improvements to the FieldProMax platform that enhance user experience and workflow efficiency.",
  quarter: "1",
  year: 2025,
  status: "published",
  published_at: new Date().toISOString(),
  image_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
};

const dummyFeatures = [
  {
    title: "Advanced Scheduling Dashboard",
    description: "Our new scheduling dashboard provides an intuitive visual interface for managing technician appointments. The drag-and-drop functionality allows for easy rescheduling, while the color-coded system helps identify schedule conflicts at a glance.",
    is_key_feature: true,
    image_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop",
    order_index: 0
  },
  {
    title: "Mobile App Redesign",
    description: "The FieldProMax mobile app has been completely redesigned with a focus on usability and performance. Technicians can now access all critical information with fewer taps, and the app loads 40% faster than the previous version.",
    is_key_feature: true,
    image_url: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1470&auto=format&fit=crop",
    order_index: 1
  },
  {
    title: "Customer Communication Portal",
    description: "We've added a dedicated customer portal that allows your clients to view appointment details, receive real-time updates on technician arrival times, and provide feedback after service completion.",
    is_key_feature: true,
    image_url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop",
    order_index: 2
  },
  {
    title: "Enhanced Reporting Tools",
    description: "New customizable reports help you track key performance indicators with greater precision. Export options now include CSV, PDF, and direct integration with popular spreadsheet applications.",
    is_key_feature: false,
    image_url: null,
    order_index: 3
  },
  {
    title: "Inventory Management Improvements",
    description: "Track parts and equipment more efficiently with barcode scanning support and automated low-stock alerts. The system now integrates with major supplier catalogs for seamless reordering.",
    is_key_feature: false,
    image_url: null,
    order_index: 4
  }
];

export async function createDummyProductUpdate() {
  try {
    // Insert the product update
    const { data: productUpdate, error: updateError } = await supabase
      .from('product_updates')
      .insert(dummyProductUpdate)
      .select('id')
      .single();

    if (updateError) throw updateError;

    // Insert the features
    for (const feature of dummyFeatures) {
      const { error: featureError } = await supabase
        .from('product_update_features')
        .insert({
          ...feature,
          product_update_id: productUpdate.id
        });

      if (featureError) throw featureError;
    }

    toast.success("Dummy product update created successfully!");
    return productUpdate.id;
  } catch (error: any) {
    console.error("Error creating dummy product update:", error);
    toast.error(`Failed to create dummy product update: ${error.message}`);
    return null;
  }
}
