
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Booking = () => {
  const location = useLocation();

  useEffect(() => {
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
  }, []);

  // Get email from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');

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
