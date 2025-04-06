
import React from "react";
import Link from 'next/link'; // Update import for Next.js Link
import { Facebook, Twitter, Linkedin, Youtube, Phone, Mail } from "lucide-react";

const Footer: React.FC = () => {
  // Define your footer links here
  const features = [
    { name: "Mobile App", path: "/features/mobile-app" },
    { name: "Scheduling & Dispatching", path: "/features/scheduling-dispatching" },
    { name: "Work Orders", path: "/features/work-orders" },
    { name: "Tools and Integrations", path: "/features/tools-integrations" },
    { name: "Invoice and Payments", path: "/features/invoice-payments" },
    { name: "Timecard & GPS Tracking", path: "/features/timecard-gps" },
    { name: "Equipment Tracking", path: "/features/equipment-tracking" },
    { name: "Reports and Dashboard", path: "/features/reports-dashboard" },
    { name: "Customer Support", path: "/features/customer-support" },
    { name: "Estimates", path: "/features/estimates" },
    { name: "Manage Customers", path: "/features/manage-customers" },
    { name: "Google Review Management", path: "/features/google-review" },
    { name: "Job Costing Features", path: "/features/job-costing" },
  ];

  const industries = [
    { name: "HVAC Industries", path: "/industries/hvac" },
    { name: "Fire Service Industries", path: "/industries/fire-service" },
    { name: "Alarm System", path: "/industries/alarm-system" },
    { name: "Plumbing Business", path: "/industries/plumbing" },
    { name: "Locksmith Industries", path: "/industries/locksmith" },
    { name: "Electrical Industries", path: "/industries/electrical" },
    { name: "Property Management", path: "/industries/property-management" },
    { name: "Garage Door Business Software", path: "/industries/garage-door" },
    { name: "Construction Software", path: "/industries/construction" },
    { name: "Chimney Sweep", path: "/industries/chimney-sweep" },
    { name: "Pressure Wash", path: "/industries/pressure-wash" },
    { name: "Arborist", path: "/industries/arborist" },
    { name: "Drywall Service", path: "/industries/drywall" },
    { name: "Carpet Cleaning", path: "/industries/carpet-cleaning" },
    { name: "Handyman Service", path: "/industries/handyman" },
    { name: "Pool service", path: "/industries/pool-service" },
    { name: "Traffic Control", path: "/industries/traffic-control" },
    { name: "Fencing Service", path: "/industries/fencing" },
    { name: "Painting Business", path: "/industries/painting" },
    { name: "Roofing Business", path: "/industries/roofing" },
    { name: "Window Cleaning", path: "/industries/window-cleaning" },
    { name: "Landscape Business", path: "/industries/landscape" },
  ];

  const quickLinks = [
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
    { name: "Pricing", path: "/pricing" },
    { name: "Community", path: "/community" },
    { name: "Free Tools", path: "/free-tools" },
    { name: "Product Updates", path: "/product-updates" },
    { name: "Cookie Policy", path: "/cookie-policy" },
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
                <Phone size={24} />
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={24} />
                <span>contact@fieldpromax.com</span>
              </div>
            </div>
            
            <div className="flex gap-4 mt-4">
              {/* Social media icons */}
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-[rgba(233,138,35,1)] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-[rgba(233,138,35,1)] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-[rgba(233,138,35,1)] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://youtube.com" aria-label="YouTube" className="hover:text-[rgba(233,138,35,1)] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <a 
                href="https://apps.apple.com" 
                aria-label="Download on App Store" 
                className="inline-block h-10 w-[135px]"
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
                className="inline-block h-10 w-[135px]"
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
                  href={feature.path} 
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
                    href={industry.path} 
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
                    href={industry.path} 
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
                  href={link.path} 
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
            <Link href="/terms" className="text-sm text-gray-600 hover:text-[rgba(233,138,35,1)] transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-[rgba(233,138,35,1)] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
