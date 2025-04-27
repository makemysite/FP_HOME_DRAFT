
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setIsLoading(true);
        
        // First refresh the session to ensure we have the latest auth data
        await supabase.auth.refreshSession();
        
        // Then get the current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          console.log("No user found, redirecting to login");
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        // Use RPC call to check if user is admin
        const { data, error } = await supabase
          .rpc('is_admin', { user_email: user.email });

        if (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        console.log("Admin check result:", data);
        setIsAdmin(!!data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error in admin authentication:", error);
        setIsAdmin(false);
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  if (isLoading) {
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
