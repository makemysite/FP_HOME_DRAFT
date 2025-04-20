
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Wrench, 
  CalendarClock, 
  Receipt 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import ArrowRightIcon from "../ui/ArrowRightIcon";

const Features = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState("reports");
  const [isLocked, setIsLocked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const sectionRef = useRef<HTMLElement>(null);
  const wheelBlockTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const features = {
    reports: {
      title: "Reports and Dashboard",
      description: "Get comprehensive insights with custom reports and real-time dashboards that help you make data-driven decisions for your field service business.",
      icon: <LayoutDashboard size={28} className="text-[#E98A23]" />,
      image: "https://ik.imagekit.io/d1cslxmlo/features_hero/Dashboard%20Desktop.png?updatedAt=1743607924289",
    },
    tools: {
      title: "Tools & Integrations",
      description: "Connect with your favorite tools and automate your workflow with our seamless integrations to QuickBooks, Xero, and other essential business software.",
      icon: <Wrench size={28} className="text-[#E98A23]" />,
      image: "https://ik.imagekit.io/d1cslxmlo/features_hero/tools&integration.png?updatedAt=1744817523845",
    },
    scheduling: {
      title: "Smart Scheduling",
      description: "Optimize your team's schedule with AI-powered recommendations that maximize efficiency and reduce travel time between job sites.",
      icon: <CalendarClock size={28} className="text-[#E98A23]" />,
      image: "https://ik.imagekit.io/d1cslxmlo/features_hero/scheduling%20&%20dispatching.png?updatedAt=1743602580941",
    },
    invoicing: {
      title: "Invoicing & Payments",
      description: "Streamline your billing process, get paid faster, and maintain healthy cash flow with our integrated invoicing and payment solutions.",
      icon: <Receipt size={28} className="text-[#E98A23]" />,
      image: "https://ik.imagekit.io/d1cslxmlo/features_hero/invoice.png?updatedAt=1744822227023",
    },
  };

  const featureKeys = Object.keys(features);
  const featureCount = featureKeys.length;
  
  // Calculate which feature should be active based on scroll progress
  useEffect(() => {
    const progressPerFeature = 1 / featureCount;
    const featureIndex = Math.min(
      Math.floor(scrollProgress / progressPerFeature),
      featureCount - 1
    );
    setActiveFeature(featureKeys[featureIndex]);
  }, [scrollProgress]);

  // Handle scroll events within the section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When section enters viewport, enable scroll locking
        if (entry.isIntersecting) {
          setIsLocked(true);
        } else {
          setIsLocked(false);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Handle wheel events to control scroll progress
  useEffect(() => {
    if (!isLocked) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Calculate new progress based on wheel direction
      setScrollProgress(prev => {
        const delta = e.deltaY > 0 ? 0.1 : -0.1;
        return Math.max(0, Math.min(prev + delta, 0.999));
      });
      
      // Automatically unlock after reaching end/start
      if (scrollProgress > 0.95 || scrollProgress < 0.05) {
        if (wheelBlockTimeout.current) clearTimeout(wheelBlockTimeout.current);
        wheelBlockTimeout.current = setTimeout(() => {
          setIsLocked(false);
        }, 1000);
      }
    };

    const preventScroll = (e: WheelEvent) => {
      if (isLocked) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("wheel", preventScroll, { passive: false });
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      document.removeEventListener("wheel", preventScroll);
      if (wheelBlockTimeout.current) clearTimeout(wheelBlockTimeout.current);
    };
  }, [isLocked, scrollProgress]);

  const handleViewAllFeaturesClick = () => {
    navigate('/features');
  };

  return (
    <section 
      ref={sectionRef}
      className={`flex w-full max-w-[1335px] flex-col items-center mt-14 pt-20 pb-20 min-h-[100vh] relative ${isLocked ? 'cursor-ns-resize' : ''}`}
    >
      <div className="text-[rgba(233,138,35,1)] text-lg font-bold leading-none tracking-[1.8px] text-center uppercase">
        Features
      </div>
      <h2 className="text-[#170F49] text-center text-[50px] font-bold leading-[62px] w-[668px] mt-7 max-md:max-w-full max-md:text-[40px] max-md:leading-[55px]">
        Spend Less Time Managing and More Time Growing
      </h2>
      <div className="text-[#26393F] text-center text-lg font-normal leading-loose mt-[29px] max-md:max-w-full">
        Automate Your Service Business With Our Exclusive Features
      </div>
      
      {/* Hero Image Container */}
      <div className="relative w-full max-w-[800px] aspect-[16/9] mt-12 mb-12">
        {Object.entries(features).map(([key, feature]) => (
          <img
            key={key}
            src={feature.image}
            alt={`${feature.title} Screenshot`}
            className={cn(
              "absolute top-0 left-0 w-full h-full object-contain transition-all duration-[800ms] ease-in-out rounded-lg",
              activeFeature === key
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            )}
          />
        ))}
      </div>
      
      {/* Progress Indicator */}
      <div className="w-full max-w-[800px] h-1 bg-gray-200 rounded-full mb-12">
        <div 
          className="h-full bg-[#E98A23] rounded-full transition-all duration-300" 
          style={{width: `${scrollProgress * 100}%`}}
        ></div>
      </div>

      {/* Feature Cards - Horizontal Layout */}
      <div className="w-full max-w-[1200px] px-4 overflow-hidden">
        <div 
          className="flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(${-scrollProgress * (featureCount - 1) * 100}%)`,
          }}
        >
          {Object.entries(features).map(([key, feature], index) => {
            // Calculate this card's individual progress point
            const cardProgressPoint = index / (featureCount - 1);
            const isActive = 
              scrollProgress >= cardProgressPoint - 0.25 && 
              scrollProgress <= cardProgressPoint + 0.25;
            
            return (
              <div 
                key={key} 
                className={cn(
                  "flex-shrink-0 w-full px-4 transition-all duration-700",
                  isActive 
                    ? "opacity-100 translate-y-0" 
                    : scrollProgress > cardProgressPoint 
                      ? "opacity-30 -translate-y-8" 
                      : "opacity-30 translate-y-8"
                )}
              >
                <div
                  className={cn(
                    "feature-card group p-6 rounded-xl transition-all duration-500 h-full",
                    isActive
                      ? "bg-white shadow-lg transform scale-105"
                      : "bg-white/50"
                  )}
                >
                  <div className="aspect-[1] w-12 mb-4 transition-transform group-hover:scale-110 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className={cn(
                    "text-xl font-semibold mb-3 transition-colors duration-300",
                    isActive
                      ? "text-[rgba(233,138,35,1)]"
                      : "text-[#202225]"
                  )}>
                    {feature.title}
                  </h3>
                  <p className="text-[#202225] text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-[rgba(233,138,35,1)] font-semibold transition-colors duration-300">
                    Learn More 
                    <ArrowRightIcon className="ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Button 
        className="mt-12 bg-[rgba(245,246,251,1)] text-[rgba(7,15,24,1)] hover:bg-[rgba(245,246,251,0.8)] border border-[rgba(233,138,35,1)]"
        onClick={handleViewAllFeaturesClick}
      >
        View all features
      </Button>
      
      {/* Scroll Hint */}
      {isLocked && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce text-gray-400">
          <span className="text-sm mb-1">{scrollProgress < 0.5 ? "Scroll down" : "Continue scrolling"}</span>
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L10 9L19 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </section>
  );
};

export default Features;
