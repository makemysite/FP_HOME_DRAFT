
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface DemoFormProps {
  className?: string;
}

const DemoForm: React.FC<DemoFormProps> = ({ className }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://emdldcecqgrdgronpcoc.supabase.co/functions/v1/create-demo-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtZGxkY2VjcWdyZGdyb25wY29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNDQ5OTcsImV4cCI6MjA1ODcyMDk5N30.7f6V0MkrBtBSmao3boXqlEwy7IyB_lxAKtQtb-3M2NE`
        },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit request');
      }
      
      // Show success message
      toast({
        title: "Demo requested!",
        description: "Redirecting you to schedule your demo...",
        duration: 3000,
      });

      // Redirect to internal booking page with email parameter
      setTimeout(() => {
        navigate(`/booking?email=${encodeURIComponent(email)}`);
      }, 1500);
      
    } catch (error) {
      console.error("Error submitting demo request:", error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
      setEmail("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex items-stretch ${className}`}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        required
        disabled={isSubmitting}
        className="bg-[rgba(245,246,251,1)] mr-[-62px] text-[rgba(87,84,85,1)] font-normal grow shrink-0 basis-0 w-fit px-6 py-3.5 rounded-[50px] max-md:px-5 focus:outline-none focus:ring-2 focus:ring-[rgba(233,138,35,0.5)]"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-[rgba(233,138,35,1)] shadow-[0px_3px_12px_rgba(74,58,255,0.18)] min-h-[55px] text-white font-medium leading-none px-[39px] py-[18px] rounded-[56px] hover:bg-[rgba(233,138,35,0.9)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Processing..." : "Take a Demo"}
      </button>
    </form>
  );
};

export default DemoForm;
