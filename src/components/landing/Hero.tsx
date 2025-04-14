import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Hero: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
      
      const result = await response.json();
      
      // Show success message
      toast({
        title: "Free trial requested!",
        description: "Redirecting you to schedule your demo...",
        duration: 3000,
      });

      console.log("Redirecting to:", result.redirectUrl);

      // Redirect to Calendly
      setTimeout(() => {
        window.location.href = result.redirectUrl;
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
    }
  };

  return (
    <section className="w-full max-w-[1334px] max-md:max-w-full mt-[52px]">
      <div className="w-full flex flex-col">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-6/12 max-md:w-full max-md:ml-0">
            <div className="flex w-full flex-col items-center text-lg mt-3 max-md:max-w-full max-md:mt-[38px]">
              <div className="text-[rgba(233,138,35,1)] text-base font-bold leading-none tracking-[3.84px] uppercase mb-3">
                FIELD SERVICE SOFTWARE
              </div>
              <h1 className="text-[#170F49] text-[50px] font-bold leading-[62px] max-md:max-w-full max-md:text-[40px] max-md:leading-[55px] max-md:mr-1">
                Automate & Grow
                <br />
                Your Field Service Business
              </h1>
              <p className="text-[#26393f] text-center font-normal leading-[30px] mt-3 max-md:max-w-full max-md:mr-1">
                Gain full control over scheduling, dispatching, tracking, and
                invoicing with Field Promax. Fill in your email below and Take our{" "}
                <span className="text-[rgba(233,138,35,1)]">
                  14 Days free trial
                </span>
              </p>
              <form
                onSubmit={handleSubmit}
                className="border border-[color:var(--Neutral-300,#EFF0F6)] shadow-[0px_8px_25px_0px_rgba(13,10,44,0.06)] bg-white flex w-full items-stretch gap-5 flex-wrap justify-between mt-[63px] pl-[30px] pr-1.5 py-[11px] rounded-[60px] border-solid max-md:max-w-full max-md:mt-10 max-md:pl-5"
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
              <p className="text-[#6f6c90] text-center text-base font-normal leading-none self-center mt-[27px] max-md:max-w-full">
                It's <span className="text-[rgba(233,138,35,1)]">100% free</span>{" "}
                and we don't ask for your payment method details
              </p>
            </div>
          </div>
          <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/3c01218d214b0c673f4edbe9065ee5245f6c8e85?placeholderIfAbsent=true"
              alt="Field Service Management Dashboard"
              className="aspect-[1.92] object-contain w-full max-md:max-w-full max-md:mt-[26px]"
            />
          </div>
        </div>
        <div className="text-[#26393F] text-center text-lg font-normal leading-loose mt-[111px] max-md:max-w-full max-md:mt-10">
          Automate Your Service Business With Our Exclusive Features
        </div>
        <div className="shadow-[0px_3px_14px_0px_rgba(74,58,255,0.03),0px_-2px_4px_0px_rgba(20,20,43,0.02),0px_12px_24px_0px_rgba(20,20,43,0.04)] bg-white flex w-full items-center justify-start gap-[30px] px-6 py-4 rounded-[18px] max-md:flex-col max-md:items-start">
          <div className="text-[rgba(7,15,24,1)] text-base font-semibold text-left mr-10 max-md:w-full max-md:mb-4">
            Trusted by
            <br />
            Our Clients
          </div>
          <div className="flex-1 flex items-center justify-start gap-[30px] max-md:flex-col max-md:w-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/212570bc4db3d238ca6ee132fb873c0b0d7a1a0b?placeholderIfAbsent=true"
              alt="Client Logo 1"
              className="aspect-[1.93] object-contain w-[147px] shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/c20eb160304e3e2229cde01a6d10c14a70c83e1f?placeholderIfAbsent=true"
              alt="Client Logo 2"
              className="aspect-[1.93] object-contain w-[147px] shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/71c187e5b6feaca90e194fb2fcefdf852eee4a32?placeholderIfAbsent=true"
              alt="Client Logo 3"
              className="aspect-[1.93] object-contain w-[147px] shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
