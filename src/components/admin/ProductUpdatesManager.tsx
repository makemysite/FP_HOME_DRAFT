
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, PlusCircle, Pencil, ListFilter, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import ProductUpdateEditor from "./ProductUpdateEditor";

interface ProductUpdate {
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
}

const ProductUpdatesManager = () => {
  const [updates, setUpdates] = useState<ProductUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState<ProductUpdate | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  
  const fetchUpdates = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('product_updates')
        .select('*')
        .order('year', { ascending: false })
        .order('quarter', { ascending: false });
      
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      if (yearFilter !== 'all') {
        query = query.eq('year', yearFilter);
      }
      
      const { data, error } = await query;

      if (error) {
        throw new Error(error.message || 'Failed to load product updates');
      }
      
      setUpdates(data as ProductUpdate[]);
    } catch (error: any) {
      console.error('Error in product updates manager:', error);
      setError(error.message || 'Failed to load product updates');
      toast.error('Failed to load product updates');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (updateId: string, newStatus: ProductUpdate['status']) => {
    try {
      let updateData: { status: string; published_at?: string | null } = { 
        status: newStatus 
      };
      
      // Set published_at timestamp when publishing
      if (newStatus === 'published') {
        updateData.published_at = new Date().toISOString();
      }
      
      const { error } = await supabase
        .from('product_updates')
        .update(updateData)
        .eq('id', updateId);

      if (error) {
        throw new Error(error.message || 'Failed to update status');
      }
      
      toast.success('Status updated successfully');
      
      setUpdates(prevUpdates => 
        prevUpdates.map(update => 
          update.id === updateId 
            ? { ...update, status: newStatus, published_at: updateData.published_at || update.published_at } 
            : update
        )
      );
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleEdit = (update: ProductUpdate) => {
    setSelectedUpdate(update);
    setIsEditorOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedUpdate(null);
    setIsEditorOpen(true);
  };

  const handleEditorClose = () => {
    setIsEditorOpen(false);
    fetchUpdates();
  };

  useEffect(() => {
    fetchUpdates();
  }, [statusFilter, yearFilter]);

  // Get unique years for filter
  const uniqueYears = Array.from(new Set(updates.map(update => update.year))).sort((a, b) => b - a);

  if (loading && updates.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <p>Loading product updates...</p>
      </div>
    );
  }

  if (error && updates.length === 0) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-md">
        <h3 className="text-lg font-medium text-red-800">Error loading updates</h3>
        <p className="mt-2 text-red-700">{error}</p>
        <Button 
          onClick={fetchUpdates} 
          className="mt-4"
          variant="outline"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListFilter className="h-5 w-5 text-gray-500" />
          <div className="flex items-center gap-2">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            
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
        
        <Button onClick={handleCreateNew}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Create Update
        </Button>
      </div>

      {updates.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">No product updates found</p>
          <Button onClick={handleCreateNew} className="mt-4">
            <PlusCircle className="w-4 h-4 mr-2" />
            Create First Update
          </Button>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Quarter/Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {updates.map((update) => (
                <TableRow key={update.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {update.title}
                  </TableCell>
                  <TableCell>Q{update.quarter}/{update.year}</TableCell>
                  <TableCell>
                    <Select
                      value={update.status}
                      onValueChange={(value: ProductUpdate['status']) => 
                        updateStatus(update.id, value)
                      }
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {new Date(update.updated_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(update)}
                        className="flex items-center gap-1"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Button>
                      {update.status === 'published' && (
                        <Link to={`/product-updates/${update.slug}`} target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </Link>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {isEditorOpen && (
        <ProductUpdateEditor
          isOpen={isEditorOpen}
          onClose={handleEditorClose}
          productUpdate={selectedUpdate}
        />
      )}
    </div>
  );
};

export default ProductUpdatesManager;
