
"use client";

import React, { useState, useEffect, useRef } from "react";
import ArrowRightIcon from "../ui/ArrowRightIcon";

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState("reports");
  const [isAnimating, setIsAnimating] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const featureSectionRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(window.scrollY);
  const featureChangeTimeout = useRef<NodeJS.Timeout | null>(null);
  const scrollDebounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const transitionInProgress = useRef(false);
  
  const featureOrder = ["reports", "tools", "scheduling", "invoicing"];
  const currentFeatureIndex = useRef(0);
  
  const features = {
    reports: {
      title: "Reports and Dashboard",
      description:
        "Get comprehensive insights with custom reports and real-time dashboards that help you make data-driven decisions for your field service business.",
      icon: "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/66f38502a5fef33818316ca0f35b1bc4094641c8?placeholderIfAbsent=true",
      image:
        "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/dc35a0569446e6309fd19516f55984c7f2a0535e?placeholderIfAbsent=true",
    },
    tools: {
      title: "Tools & Integrations",
      description:
        "Connect with your favorite tools and automate your workflow with our seamless integrations to QuickBooks, Xero, and other essential business software.",
      icon: "",
      image:
        "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/90cb4c0f51b0744019a62d928e470e8fb001908f?placeholderIfAbsent=true",
    },
    scheduling: {
      title: "Smart Scheduling",
      description:
        "Optimize your team's schedule with AI-powered recommendations that maximize efficiency and reduce travel time between job sites.",
      icon: "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/90cb4c0f51b0744019a62d928e470e8fb001908f?placeholderIfAbsent=true",
      image:
        "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/66f38502a5fef33818316ca0f35b1bc4094641c8?placeholderIfAbsent=true",
    },
    invoicing: {
      title: "Invoicing & Payments",
      description: "Streamline your billing process, get paid faster, and maintain healthy cash flow with our integrated invoicing and payment solutions.",
      icon: "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/c5a7c18383b0c23ef99644f4f1abd3fdc92273d3?placeholderIfAbsent=true",
      image:
        "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/c5a7c18383b0c23ef99644f4f1abd3fdc92273d3?placeholderIfAbsent=true",
    },
  };

  // Function to handle manual feature selection via click
  const handleFeatureClick = (featureName: string) => {
    if (transitionInProgress.current) return;
    
    transitionInProgress.current = true;
    setIsAnimating(true);
    setActiveFeature(featureName);
    currentFeatureIndex.current = featureOrder.indexOf(featureName);
    
    if (featureChangeTimeout.current) {
      clearTimeout(featureChangeTimeout.current);
    }
    
    featureChangeTimeout.current = setTimeout(() => {
      setIsAnimating(false);
      transitionInProgress.current = false;
      featureChangeTimeout.current = null;
    }, 800);
  };
  
  // Function to handle transition to the next feature in order
  const transitionToNextFeature = () => {
    if (transitionInProgress.current) return;
    
    const nextIndex = (currentFeatureIndex.current + 1) % featureOrder.length;
    currentFeatureIndex.current = nextIndex;
    handleFeatureClick(featureOrder[nextIndex]);
  };
  
  // Enhanced scroll handler with improved transition logic
  useEffect(() => {
    const handleScroll = () => {
      if (scrollDebounceTimeout.current) {
        clearTimeout(scrollDebounceTimeout.current);
      }
      
      scrollDebounceTimeout.current = setTimeout(() => {
        if (!featureSectionRef.current || transitionInProgress.current) return;
        
        const sectionRect = featureSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate section visibility
        const visibleHeight = Math.min(windowHeight, sectionRect.bottom) - Math.max(0, sectionRect.top);
        const visibleRatio = visibleHeight / sectionRect.height;
        
        // Get scroll direction
        const scrollDirection = window.scrollY > lastScrollY.current ? 'down' : 'up';
        lastScrollY.current = window.scrollY;
        
        // Check if section is highly visible (60% or more) when scrolling down
        if (visibleRatio > 0.6 && scrollDirection === 'down') {
          // Determine how far we've scrolled within the section
          const sectionProgress = Math.max(0, -sectionRect.top) / (sectionRect.height - windowHeight);
          
          // Map scroll progress to feature index (0-3)
          const targetIndex = Math.min(
            Math.floor(sectionProgress * featureOrder.length),
            featureOrder.length - 1
          );
          
          // Only trigger transition if the target index is different
          if (targetIndex !== currentFeatureIndex.current) {
            // Make sure we're transitioning sequentially
            const nextIndex = currentFeatureIndex.current + 1;
            if (nextIndex < featureOrder.length) {
              currentFeatureIndex.current = nextIndex;
              handleFeatureClick(featureOrder[nextIndex]);
            }
          }
        }
        
        scrollDebounceTimeout.current = null;
      }, 50); // Small debounce for smoother operation
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Setup automatic cycling through features when section is fully visible
    const cycleInterval = setInterval(() => {
      if (featureSectionRef.current) {
        const rect = featureSectionRef.current.getBoundingClientRect();
        const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        
        // If section is fully visible and no transitions are in progress, cycle to next feature
        if (isFullyVisible && !transitionInProgress.current) {
          transitionToNextFeature();
        }
      }
    }, 5000); // Cycle every 5 seconds if visible
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(cycleInterval);
      
      if (featureChangeTimeout.current) {
        clearTimeout(featureChangeTimeout.current);
      }
      
      if (scrollDebounceTimeout.current) {
        clearTimeout(scrollDebounceTimeout.current);
      }
    };
  }, []);

  return (
    <section
      id="features"
      ref={featureSectionRef}
      className="flex w-full max-w-[1335px] flex-col items-center mt-14 max-md:max-w-full max-md:mt-10"
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
      <button className="bg-[rgba(245,246,251,1)] border w-[175px] max-w-full text-lg text-[rgba(7,15,24,1)] font-normal text-center mt-[29px] px-5 py-[21px] rounded-[56px] border-[rgba(233,138,35,1)] border-solid hover:bg-[rgba(245,246,251,0.8)] transition-colors">
        View all features
      </button>

      <div className="self-stretch max-md:max-w-full mt-14" ref={featuresRef}>
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[43%] max-md:w-full max-md:ml-0">
            <div className="flex w-full flex-col self-stretch my-auto max-md:max-w-full max-md:mt-10">
              {/* Feature cards with progress indicators */}
              <div className="flex gap-2 mb-4 justify-center">
                {featureOrder.map((feature, index) => (
                  <div 
                    key={feature}
                    className={`h-2 w-16 rounded-full transition-colors duration-300 cursor-pointer ${
                      index === currentFeatureIndex.current ? 'bg-[rgba(233,138,35,1)]' : 'bg-gray-200'
                    }`}
                    onClick={() => handleFeatureClick(feature)}
                  />
                ))}
              </div>

              {/* Reports and Dashboard */}
              <div
                className={`feature-card ${
                  activeFeature === "reports"
                    ? "shadow-[0px_20px_30px_5px_rgba(0,0,0,0.15)] bg-white"
                    : "bg-white hover:bg-gray-50"
                } self-stretch flex min-h-[100px] w-full flex-col px-[22px] py-7 max-md:max-w-full max-md:px-5 cursor-pointer transition-all duration-500 ease-in-out overflow-hidden`}
                onClick={() => handleFeatureClick("reports")}
                data-feature="reports"
              >
                <div className="flex w-[361px] max-w-full gap-[17px] text-lg font-bold leading-[3] pb-1.5">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/66f38502a5fef33818316ca0f35b1bc4094641c8?placeholderIfAbsent=true"
                    alt="Reports Icon"
                    className="aspect-[1] object-contain w-9 shrink-0"
                  />
                  <div className={`grow shrink w-[301px] basis-auto mt-3.5 ${activeFeature === "reports" ? "text-[rgba(233,138,35,1)]" : "text-[#202225]"} transition-colors duration-300`}>
                    Reports and Dashboard
                  </div>
                </div>
                <div 
                  className={`flex gap-[40px_60px] text-sm text-[#202225] font-normal leading-[22px] flex-wrap px-[54px] max-md:max-w-full max-md:px-5 transition-all duration-300 ease-in-out ${
                    activeFeature === "reports" ? "opacity-100 max-h-[200px] mt-2" : "opacity-0 max-h-0 mt-0"
                  }`}
                >
                  <div className="w-[276px]">
                    {features.reports.description}
                  </div>
                  <div className="flex items-center mt-2 text-[rgba(233,138,35,1)] font-semibold">
                    Learn More 
                    <ArrowRightIcon className="ml-1" />
                  </div>
                </div>
              </div>

              {/* Tools & Integrations */}
              <div
                className={`feature-card ${
                  activeFeature === "tools"
                    ? "shadow-[0px_20px_30px_5px_rgba(0,0,0,0.15)] bg-white"
                    : "bg-white hover:bg-gray-50"
                } flex min-h-[100px] w-full flex-col px-[22px] py-7 max-md:px-5 cursor-pointer transition-all duration-500 ease-in-out overflow-hidden`}
                onClick={() => handleFeatureClick("tools")}
                data-feature="tools"
              >
                <div className="flex w-[361px] max-w-full gap-[17px] text-lg font-bold leading-[3] pb-1.5">
                  <div className="w-9 shrink-0"></div>
                  <div className={`grow shrink w-[301px] basis-auto mt-3.5 ${activeFeature === "tools" ? "text-[rgba(233,138,35,1)]" : "text-[#202225]"} transition-colors duration-300`}>
                    Tools & Integrations
                  </div>
                </div>
                <div 
                  className={`flex gap-[40px_60px] text-sm text-[#202225] font-normal leading-[22px] flex-wrap px-[54px] max-md:max-w-full max-md:px-5 transition-all duration-300 ease-in-out ${
                    activeFeature === "tools" ? "opacity-100 max-h-[200px] mt-2" : "opacity-0 max-h-0 mt-0"
                  }`}
                >
                  <div className="w-[276px]">
                    {features.tools.description}
                  </div>
                  <div className="flex items-center mt-2 text-[rgba(233,138,35,1)] font-semibold">
                    Learn More 
                    <ArrowRightIcon className="ml-1" />
                  </div>
                </div>
              </div>
              <div className="border w-[465px] shrink-0 max-w-full h-px border-[rgba(225,225,225,1)] border-solid" />

              {/* Smart Scheduling */}
              <div
                className={`feature-card ${
                  activeFeature === "scheduling"
                    ? "shadow-[0px_20px_30px_5px_rgba(0,0,0,0.15)] bg-white"
                    : "bg-white hover:bg-gray-50"
                } flex min-h-[100px] w-full flex-col px-[22px] py-7 max-md:px-5 cursor-pointer transition-all duration-500 ease-in-out overflow-hidden`}
                onClick={() => handleFeatureClick("scheduling")}
                data-feature="scheduling"
              >
                <div className="flex w-[361px] max-w-full gap-[17px] text-lg font-bold leading-[3] pb-1.5">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/90cb4c0f51b0744019a62d928e470e8fb001908f?placeholderIfAbsent=true"
                    alt="Scheduling Icon"
                    className="aspect-[1] object-contain w-9 shrink-0"
                  />
                  <div className={`grow shrink w-[301px] basis-auto mt-3.5 ${activeFeature === "scheduling" ? "text-[rgba(233,138,35,1)]" : "text-[#202225]"} transition-colors duration-300`}>
                    Smart Scheduling
                  </div>
                </div>
                <div 
                  className={`flex gap-[40px_60px] text-sm text-[#202225] font-normal leading-[22px] flex-wrap px-[54px] max-md:max-w-full max-md:px-5 transition-all duration-300 ease-in-out ${
                    activeFeature === "scheduling" ? "opacity-100 max-h-[200px] mt-2" : "opacity-0 max-h-0 mt-0"
                  }`}
                >
                  <div className="w-[276px]">
                    {features.scheduling.description}
                  </div>
                  <div className="flex items-center mt-2 text-[rgba(233,138,35,1)] font-semibold">
                    Learn More 
                    <ArrowRightIcon className="ml-1" />
                  </div>
                </div>
              </div>
              <div className="border w-[465px] shrink-0 max-w-full h-px border-[rgba(225,225,225,1)] border-solid" />

              {/* Invoicing & Payments */}
              <div
                className={`feature-card ${
                  activeFeature === "invoicing"
                    ? "shadow-[0px_20px_30px_5px_rgba(0,0,0,0.15)] bg-white"
                    : "bg-white hover:bg-gray-50"
                } flex min-h-[100px] w-full flex-col px-[22px] py-7 max-md:px-5 cursor-pointer transition-all duration-500 ease-in-out overflow-hidden`}
                onClick={() => handleFeatureClick("invoicing")}
                data-feature="invoicing"
              >
                <div className="flex w-[361px] max-w-full gap-[17px] text-lg font-bold leading-[3] pb-1.5">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/c5a7c18383b0c23ef99644f4f1abd3fdc92273d3?placeholderIfAbsent=true"
                    alt="Invoicing Icon"
                    className="aspect-[1] object-contain w-9 shrink-0"
                  />
                  <div className={`grow shrink w-[301px] basis-auto mt-3.5 ${activeFeature === "invoicing" ? "text-[rgba(233,138,35,1)]" : "text-[#202225]"} transition-colors duration-300`}>
                    Invoicing & Payments
                  </div>
                </div>
                <div 
                  className={`flex gap-[40px_60px] text-sm text-[#202225] font-normal leading-[22px] flex-wrap px-[54px] max-md:max-w-full max-md:px-5 transition-all duration-300 ease-in-out ${
                    activeFeature === "invoicing" ? "opacity-100 max-h-[200px] mt-2" : "opacity-0 max-h-0 mt-0"
                  }`}
                >
                  <div className="w-[276px]">
                    {features.invoicing.description}
                  </div>
                  <div className="flex items-center mt-2 text-[rgba(233,138,35,1)] font-semibold">
                    Learn More 
                    <ArrowRightIcon className="ml-1" />
                  </div>
                </div>
              </div>
              <div className="border w-[465px] shrink-0 max-w-full h-px border-[rgba(225,225,225,1)] border-solid" />
            </div>
          </div>
          <div className="w-[57%] ml-5 max-md:w-full max-md:ml-0">
            <div className="relative w-full h-full">
              {Object.keys(features).map((key) => (
                <img
                  key={key}
                  src={features[key as keyof typeof features].image}
                  alt={`${features[key as keyof typeof features].title} Screenshot`}
                  className={`absolute top-0 left-0 aspect-[1.4] object-contain w-full transition-all duration-800 ease-in-out ${
                    activeFeature === key 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-8"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
