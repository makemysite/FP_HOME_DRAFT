
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface MessageDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  submission?: {
    name: string;
    email: string;
    message: string;
    created_at: string;
    status: string;
  };
}

const MessageDetails = ({ isOpen, onClose, submission }: MessageDetailsProps) => {
  const [replyMessage, setReplyMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!submission) return null;

  const handleSendReply = async () => {
    if (!replyMessage.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    setIsSending(true);

    try {
      const { data, error } = await supabase.functions.invoke('contact-email', {
        body: {
          type: 'reply',
          recipientEmail: submission.email,
          subject: `Re: Your message to FieldProMax`,
          message: replyMessage,
        },
      });

      if (error) throw error;

      toast.success("Reply sent successfully!");
      setReplyMessage("");
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error("Failed to send reply. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader className="pb-6">
          <SheetTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Message from {submission.name}
          </SheetTitle>
          <SheetDescription>
            Received on {new Date(submission.created_at).toLocaleDateString()}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Contact Details</h3>
              <div className="mt-2 space-y-2">
                <p className="text-sm"><span className="font-medium">Email:</span> {submission.email}</p>
                <p className="text-sm"><span className="font-medium">Status:</span> 
                  <span className={`capitalize ${
                    submission.status === 'resolved' ? 'text-green-600' :
                    submission.status === 'in-progress' ? 'text-blue-600' :
                    'text-yellow-600'
                  }`}>
                    {submission.status}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Message</h3>
              <div className="mt-2 rounded-lg border p-4 bg-gray-50">
                <p className="text-sm whitespace-pre-wrap">{submission.message}</p>
              </div>
            </div>
            <div className="border-t pt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Reply to {submission.name}</h3>
              <Textarea
                placeholder="Type your reply..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="min-h-[120px] mb-4"
              />
              <Button
                onClick={handleSendReply}
                disabled={isSending || !replyMessage.trim()}
                className="w-full"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Reply
                  </>
                )}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MessageDetails;
