import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'pending' | 'in-progress' | 'resolved';
  created_at: string;
}

const ContactSubmissionsManager = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/admin/login');
        return;
      }
      
      console.log("Fetching contact submissions...");
      
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching submissions:', error);
        throw error;
      }
      
      console.log("Submissions fetched successfully:", data);
      
      const typedData = (data || []).map(item => ({
        ...item,
        status: (item.status as 'pending' | 'in-progress' | 'resolved') || 'pending'
      }));
      
      setSubmissions(typedData);
    } catch (error: any) {
      console.error('Error fetching submissions:', error);
      setError('Failed to load contact submissions. Please make sure you have the right permissions.');
      toast.error('Failed to load contact submissions');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (submissionId: string, newStatus: ContactSubmission['status']) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus })
        .eq('id', submissionId);

      if (error) throw error;
      
      toast.success('Status updated successfully');
      
      setSubmissions(prevSubmissions => 
        prevSubmissions.map(submission => 
          submission.id === submissionId 
            ? { ...submission, status: newStatus } 
            : submission
        )
      );
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <p>Loading submissions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Contact Submissions</h2>
          <p className="text-sm text-gray-500">
            Manage and track contact form submissions from users.
          </p>
        </div>
        <Button 
          onClick={fetchSubmissions} 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          disabled={loading}
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="p-6 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-medium text-red-800">Error loading submissions</h3>
          </div>
          <p className="mt-2 text-red-700">{error}</p>
          <Button 
            onClick={fetchSubmissions} 
            className="mt-4 bg-red-100 text-red-800 hover:bg-red-200"
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      )}

      {!error && submissions.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">No submissions found</p>
        </div>
      ) : !error && (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>
                    {new Date(submission.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell className="max-w-md truncate">
                    {submission.message}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={submission.status}
                      onValueChange={(value: ContactSubmission['status']) => 
                        updateStatus(submission.id, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ContactSubmissionsManager;
