
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CheckIcon, ListIcon, MoveUp, MoveDown } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  show_in_highlights: boolean;
  highlight_order: number | null;
  created_at: string;
}

const BlogHighlightsManager = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, show_in_highlights, highlight_order, created_at')
        .eq('published', true)
        .order('highlight_order', { ascending: true, nullsLast: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const toggleHighlight = async (postId: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ show_in_highlights: !currentValue })
        .eq('id', postId);

      if (error) throw error;

      await fetchBlogPosts(); // Refetch to get updated order

      toast.success(
        currentValue 
          ? 'Post removed from highlights'
          : 'Post added to highlights'
      );
    } catch (error) {
      console.error('Error updating blog post:', error);
      toast.error('Failed to update blog highlight status');
    }
  };

  const moveHighlight = async (postId: string, direction: 'up' | 'down') => {
    const currentPost = blogPosts.find(post => post.id === postId);
    if (!currentPost?.show_in_highlights || currentPost.highlight_order === null) return;

    const highlightedPosts = blogPosts.filter(post => post.show_in_highlights);
    const currentIndex = highlightedPosts.findIndex(post => post.id === postId);
    
    if (
      (direction === 'up' && currentIndex === 0) || 
      (direction === 'down' && currentIndex === highlightedPosts.length - 1)
    ) return;

    const swapWithPost = direction === 'up' 
      ? highlightedPosts[currentIndex - 1] 
      : highlightedPosts[currentIndex + 1];

    try {
      const { error: error1 } = await supabase
        .from('blog_posts')
        .update({ highlight_order: swapWithPost.highlight_order })
        .eq('id', currentPost.id);

      const { error: error2 } = await supabase
        .from('blog_posts')
        .update({ highlight_order: currentPost.highlight_order })
        .eq('id', swapWithPost.id);

      if (error1 || error2) throw error1 || error2;

      await fetchBlogPosts();
      toast.success('Post order updated successfully');
    } catch (error) {
      console.error('Error reordering posts:', error);
      toast.error('Failed to update post order');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading blog posts...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Blog Highlights</h2>
          <p className="text-sm text-gray-500">
            Manage which blog posts appear in the landing page highlights section and their display order.
          </p>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogPosts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>
                {new Date(post.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {post.show_in_highlights ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-green-100 text-green-700">
                    <CheckIcon className="w-4 h-4 mr-1" />
                    Highlighted
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                    <ListIcon className="w-4 h-4 mr-1" />
                    Regular
                  </span>
                )}
              </TableCell>
              <TableCell>
                {post.show_in_highlights && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveHighlight(post.id, 'up')}
                      disabled={!post.highlight_order || post.highlight_order === 1}
                    >
                      <MoveUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveHighlight(post.id, 'down')}
                      disabled={!post.highlight_order || post.highlight_order === blogPosts.filter(p => p.show_in_highlights).length}
                    >
                      <MoveDown className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-gray-500">
                      {post.highlight_order || '-'}
                    </span>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant={post.show_in_highlights ? "outline" : "default"}
                  onClick={() => toggleHighlight(post.id, post.show_in_highlights)}
                >
                  {post.show_in_highlights ? 'Remove from Highlights' : 'Add to Highlights'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BlogHighlightsManager;
