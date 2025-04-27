
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <nav className="border-b bg-white">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </div>
        <Button 
          variant="outline" 
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
