
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function DemoForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic client-side validation
    if (!email || !email.includes('@')) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      // Using fetch API instead of axios to reduce bundle size
      const response = await fetch(`https://emdldcecqgrdgronpcoc.supabase.co/functions/v1/create-demo-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtZGxkY2VjcWdyZGdyb25wY29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNDQ5OTcsImV4cCI6MjA1ODcyMDk5N30.7f6V0MkrBtBSmao3boXqlEwy7IyB_lxAKtQtb-3M2NE`
        },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit request');
      }
      
      // Instead of using toast, simply redirect
      router.push(`/booking?email=${encodeURIComponent(email)}`);
      
    } catch (error) {
      console.error("Error submitting demo request:", error);
      setError("Failed to submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {error && (
        <div className="text-red-500 mb-2 text-sm">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          disabled={isSubmitting}
          className="bg-[rgba(245,246,251,1)] sm:mr-[-62px] text-[rgba(87,84,85,1)] font-normal w-full sm:w-fit px-6 py-3.5 rounded-[50px] focus:outline-none focus:ring-2 focus:ring-[rgba(233,138,35,0.5)]"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[rgba(233,138,35,1)] shadow-[0px_3px_12px_rgba(74,58,255,0.18)] min-h-[55px] text-white font-medium leading-none px-[39px] py-[18px] rounded-[56px] hover:bg-[rgba(233,138,35,0.9)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Processing..." : "Take a Demo"}
        </button>
      </form>
    </>
  );
}
