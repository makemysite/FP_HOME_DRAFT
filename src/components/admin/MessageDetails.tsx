
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare } from "lucide-react";

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
  if (!submission) return null;

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
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MessageDetails;
