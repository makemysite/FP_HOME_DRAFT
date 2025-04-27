
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsAdmin(false);
          return;
        }

        // Check if the user has admin role in Supabase
        const { data, error } = await supabase
          .from('admin_users')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
          return;
        }

        setIsAdmin(!!data);
      } catch (error) {
        console.error("Error in admin authentication:", error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, []);

  if (isAdmin === null) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg text-gray-500">Verifying admin credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
