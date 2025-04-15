
"use client";

import React, { useState, useEffect, useRef } from "react";
import ArrowRightIcon from "../ui/ArrowRightIcon";

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState("reports");
  const [isAnimating, setIsAnimating] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const featureSectionRef = useRef<HTMLElement>(null);
  
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

  // Reset animation state after transition completes - longer transition time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 800); // Increased from 500ms to 800ms for smoother transitions
    
    return () => clearTimeout(timer);
  }, [activeFeature]);

  // Handle scroll-based feature transitions
  useEffect(() => {
    const featureElements = document.querySelectorAll('.feature-card');
    const featureOrder = ["reports", "tools", "scheduling", "invoicing"];
    
    const handleScroll = () => {
      if (!featureSectionRef.current) return;
      
      const sectionRect = featureSectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const windowHeight = window.innerHeight;
      
      // Check if section is in view - more visibility required before triggering
      if (sectionTop < windowHeight * 0.7 && sectionTop > -sectionHeight * 0.8) {
        // Adjusted to require the section to be more visible before starting transitions
        // Calculate progress through the section with adjusted thresholds
        // This now starts later in the scroll and progresses more gradually
        const scrollPosition = windowHeight - sectionTop;
        const totalScrollDistance = windowHeight + sectionHeight * 0.7;
        
        // Normalized progress from 0 to 1, starting when section is 30% in view
        let sectionProgress = Math.min(Math.max((scrollPosition - windowHeight * 0.3) / totalScrollDistance, 0), 1);
        
        // Add a delay threshold before the first change
        if (sectionProgress < 0.15) {
          sectionProgress = 0; // Keep at first feature until scrolled a bit more
        }
        
        // Determine which feature should be active based on adjusted scroll position
        const featureIndex = Math.min(
          Math.floor(sectionProgress * 4),
          featureOrder.length - 1
        );
        
        const newActiveFeature = featureOrder[featureIndex];
        
        if (newActiveFeature !== activeFeature && !isAnimating) {
          setIsAnimating(true);
          setActiveFeature(newActiveFeature);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeFeature, isAnimating]);

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
              {/* Reports and Dashboard */}
              <div
                className={`feature-card ${
                  activeFeature === "reports"
                    ? "shadow-[0px_20px_30px_5px_rgba(0,0,0,0.15)] bg-white"
                    : "bg-white hover:bg-gray-50"
                } self-stretch flex min-h-[100px] w-full flex-col px-[22px] py-7 max-md:max-w-full max-md:px-5 cursor-pointer transition-all duration-500 ease-in-out overflow-hidden`}
                onClick={() => {
                  setIsAnimating(true);
                  setActiveFeature("reports");
                }}
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
                onClick={() => {
                  setIsAnimating(true);
                  setActiveFeature("tools");
                }}
                data-feature="tools"
              >
                <div className="flex w-[361px] max-w-full gap-[17px] text-lg font-bold leading-[3] pb-1.5">
                  <div className="w-9 shrink-0"></div> {/* Placeholder for icon */}
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
                onClick={() => {
                  setIsAnimating(true);
                  setActiveFeature("scheduling");
                }}
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
                onClick={() => {
                  setIsAnimating(true);
                  setActiveFeature("invoicing");
                }}
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
