import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkCurrentUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setCurrentUser(data.user);
        // Check if the user is an admin
        const { data: isAdminData, error: adminError } = await supabase
          .rpc('is_admin', { user_email: data.user.email });

        if (!isAdminData || adminError) {
          setErrorMessage(`You're logged in as ${data.user.email}, but don't have admin privileges.`);
        } else {
          // User is already authenticated and an admin, redirect to admin dashboard
          navigate('/admin');
        }
      }
    };

    checkCurrentUser();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error("Authentication failed");
      }

      // Check if the user is an admin using RPC
      const { data: isAdmin, error: adminError } = await supabase
        .rpc('is_admin', { user_email: data.user.email });

      if (!isAdmin || adminError) {
        await supabase.auth.signOut();
        throw new Error('Unauthorized access. Admin privileges required.');
      }

      toast.success('Logged in successfully');
      navigate('/admin');
    } catch (error: any) {
      toast.error(error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setErrorMessage(null);
    toast.success('Signed out successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          {currentUser && (
            <CardDescription className="text-center">
              Currently logged in as {currentUser.email}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <Alert className="mb-4 border-amber-500 bg-amber-50">
              <InfoIcon className="h-4 w-4 text-amber-500" />
              <AlertDescription className="text-amber-700">
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}
          
          {currentUser ? (
            <Button 
              onClick={handleSignOut}
              className="w-full"
            >
              Sign Out
            </Button>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
