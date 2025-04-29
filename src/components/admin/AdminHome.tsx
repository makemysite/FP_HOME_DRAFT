
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/blog-highlights">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Blog Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Manage featured blog posts and highlights</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/contact-submissions">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Contact Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">View and manage contact form submissions</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/product-updates">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Product Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Manage quarterly product updates and feature announcements</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
