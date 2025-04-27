
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminNavbar from './AdminNavbar';
import BlogHighlightsManager from './BlogHighlightsManager';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="container mx-auto px-4 py-8">
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
      </main>
    </div>
  );
};

export default AdminDashboard;
