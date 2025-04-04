
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  // Define your footer links here
  const features = [
    { name: "Mobile App", path: "/features/mobile-app" },
    { name: "Scheduling & Dispatching", path: "/features/scheduling-dispatching" },
    { name: "Work Orders", path: "/features/work-orders" },
    // ... add more features as needed
  ];

  const industries = [
    { name: "HVAC Industries", path: "/industries/hvac" },
    { name: "Fire Service Industries", path: "/industries/fire-service" },
    { name: "Alarm System", path: "/industries/alarm-system" },
    // ... add more industries as needed
  ];

  const quickLinks = [
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
    { name: "Pricing", path: "/pricing" },
    // ... add more links as needed
  ];

  // Split industries into two columns
  const halfwayPoint = Math.ceil(industries.length / 2);
  const industriesColumn1 = industries.slice(0, halfwayPoint);
  const industriesColumn2 = industries.slice(halfwayPoint);

  return (
    <footer className="bg-gray-100 pt-16 pb-10">
      <div className="max-w-full px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <div className="md:col-span-2 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-black">Field Promax</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                <span>contact@fieldpromax.com</span>
              </div>
            </div>
            
            <div className="flex gap-4 mt-4">
              {/* Social media icons */}
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-[rgba(233,138,35,1)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              {/* Add more social media icons as needed */}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <a 
                href="https://apps.apple.com" 
                aria-label="Download on App Store" 
                className="inline-block h-10 w-[140px]"
              >
                <img 
                  src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" 
                  alt="Download on the App Store" 
                  className="h-full w-full object-contain"
                />
              </a>
              <a 
                href="https://play.google.com" 
                aria-label="Get it on Google Play" 
                className="inline-block h-10 w-[140px]"
              >
                <img 
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                  alt="Get it on Google Play" 
                  className="h-full w-full object-contain"
                />
              </a>
            </div>
          </div>

          {/* Footer columns for features, industries, and quick links */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-4 text-black">Features</h3>
            <div className="grid grid-cols-1 gap-2">
              {features.map((feature, index) => (
                <Link 
                  key={index} 
                  to={feature.path} 
                  className="text-sm text-gray-600 hover:text-[rgba(233,138,35,1)] transition-colors"
                >
                  {feature.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:col-span-2">
            <h3 className="text-lg font-bold mb-4 text-black">Industries</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                {industriesColumn1.map((industry, index) => (
                  <Link 
                    key={index} 
                    to={industry.path} 
                    className="block text-sm text-gray-600 hover:text-[rgba(233,138,35,1)] transition-colors mb-2"
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>
              
              <div>
                {industriesColumn2.map((industry, index) => (
                  <Link 
                    key={index} 
                    to={industry.path} 
                    className="block text-sm text-gray-600 hover:text-[rgba(233,138,35,1)] transition-colors mb-2"
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-4 text-black">Quick Links</h3>
            <div className="grid grid-cols-1 gap-2">
              {quickLinks.map((link, index) => (
                <Link 
                  key={index} 
                  to={link.path} 
                  className="text-sm text-gray-600 hover:text-[rgba(233,138,35,1)] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer separator and copyright */}
        <div className="my-8 h-[1px] w-full bg-gray-200"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Field Promax. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm text-gray-600 hover:text-[rgba(233,138,35,1)] transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-[rgba(233,138,35,1)] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
