
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BlogHighlightsManager from '../BlogHighlightsManager';

const BlogHighlightsPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Blog Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogHighlightsManager />
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogHighlightsPage;
