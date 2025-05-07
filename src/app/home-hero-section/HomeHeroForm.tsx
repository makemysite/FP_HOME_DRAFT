
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeHeroForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    setError("");

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
      
      // Direct redirect instead of toast + timeout
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
        <div className="text-red-500 mb-2 text-sm text-center">{error}</div>
      )}
      <form
        onSubmit={handleSubmit}
        className="border border-[color:var(--Neutral-300,#EFF0F6)] shadow-[0px_8px_25px_0px_rgba(13,10,44,0.06)] bg-white flex w-full items-stretch gap-5 flex-wrap justify-between pl-[30px] pr-1.5 py-[11px] rounded-[60px] border-solid max-md:pl-5"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="text-[#26393F] font-normal leading-loose my-auto bg-transparent outline-none flex-1"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="self-stretch bg-[rgba(233,138,35,1)] shadow-[0px_3px_12px_rgba(74,58,255,0.18)] gap-2 text-white font-bold text-center leading-none pt-4 pb-[19px] px-8 rounded-[56px] max-md:px-5 hover:bg-[rgba(233,138,35,0.9)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Start Free Trial"}
        </button>
      </form>
    </>
  );
}
