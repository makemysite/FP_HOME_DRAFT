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
import { Loader2, RefreshCw, AlertCircle, MessageSquare, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import MessageDetails from './MessageDetails';

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
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | undefined>();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('id, name, email, message, status, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching submissions:', error);
        throw new Error(error.message || 'Failed to load contact submissions');
      }
      
      const typedSubmissions = (data || []).map(item => ({
        ...item,
        status: item.status as 'pending' | 'in-progress' | 'resolved'
      }));
      
      const newSubmissions = data?.filter(submission => submission.status === 'pending');
      
      for (const submission of newSubmissions || []) {
        try {
          await supabase.functions.invoke('contact-email', {
            body: {
              type: 'forward',
              recipientEmail: 'info@fieldpromax.com',
              subject: 'New Contact Form Submission',
              originalMessage: submission,
            },
          });
          console.log('Forwarded new submission:', submission.id);
        } catch (error) {
          console.error('Error forwarding submission:', error);
        }
      }
      
      setSubmissions(typedSubmissions);
    } catch (error: any) {
      console.error('Error in submission manager:', error);
      setError(error.message || 'Failed to load contact submissions');
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

      if (error) {
        console.error('Error updating status:', error);
        throw new Error(error.message || 'Failed to update status');
      }
      
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

  useEffect(() => {
    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <p>Loading submissions...</p>
      </div>
    );
  }

  if (error) {
    return (
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
    );
  }

  const handleViewMessage = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Contact Submissions</h2>
          <p className="text-sm text-gray-500">
            Manage and track contact form submissions
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

      {submissions.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">No submissions found</p>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">
                    {new Date(submission.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate text-gray-600">{submission.message}</p>
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
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewMessage(submission)}
                      className="flex items-center gap-1"
                    >
                      <MessageSquare className="h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <MessageDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        submission={selectedSubmission}
      />
    </div>
  );
};

export default ContactSubmissionsManager;
