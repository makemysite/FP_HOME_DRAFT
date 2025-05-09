
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className={`transition-colors ${isActive('/') && !isActive('/blog-highlights') && !isActive('/contact-submissions') && !isActive('/product-updates') && !isActive('/seo-dashboard') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/blog-highlights" 
                className={`transition-colors ${isActive('/blog-highlights') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Blog Highlights
              </Link>
              <Link 
                to="/contact-submissions" 
                className={`transition-colors ${isActive('/contact-submissions') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Contact Submissions
              </Link>
              <Link 
                to="/product-updates" 
                className={`transition-colors ${isActive('/product-updates') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Product Updates
              </Link>
              <Link 
                to="/seo-dashboard" 
                className={`transition-colors ${isActive('/seo-dashboard') ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                SEO Dashboard
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
