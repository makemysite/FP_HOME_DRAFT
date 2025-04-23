
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Booking = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get email from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');

  useEffect(() => {
    // Save email to demo_requests if provided
    const saveEmailToDatabase = async () => {
      if (email && !isSubmitting) {
        setIsSubmitting(true);
        
        try {
          console.log("Saving email to demo_requests:", email);
          
          // Check if this email already exists in the database
          const { data: existingData, error: existingError } = await supabase
            .from('demo_requests')
            .select('id')
            .eq('email', email)
            .maybeSingle();
            
          if (existingError) {
            console.error("Error checking existing email:", existingError);
            return;
          }
          
          // If email doesn't exist yet, save it
          if (!existingData) {
            const { error } = await supabase
              .from('demo_requests')
              .insert([{ email }]);
              
            if (error) {
              console.error("Error saving email to demo_requests:", error);
              toast({
                title: "Error",
                description: "There was an issue processing your request.",
                variant: "destructive",
              });
              return;
            }
            
            console.log("Email successfully saved to demo_requests");
          } else {
            console.log("Email already exists in demo_requests, skipping insert");
            
            // Update the calendly_redirect_status to true
            await supabase
              .from('demo_requests')
              .update({ calendly_redirect_status: true })
              .eq('id', existingData.id);
          }
        } catch (error) {
          console.error("Exception saving email:", error);
        } finally {
          setIsSubmitting(false);
        }
      }
    };
    
    saveEmailToDatabase();
    
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [email, toast]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Schedule Your Free Demo</h1>
          <div 
            className="calendly-inline-widget rounded-lg shadow-lg" 
            data-url={`https://calendly.com/fieldpromaxapp${email ? `?email=${encodeURIComponent(email)}` : ''}`}
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;
