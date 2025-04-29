
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <Link 
                to="/admin" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/admin/blog-highlights" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Blog Highlights
              </Link>
              <Link 
                to="/admin/contact-submissions" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact Submissions
              </Link>
              <Link 
                to="/admin/product-updates" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Product Updates
              </Link>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
