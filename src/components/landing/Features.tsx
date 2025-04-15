
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ArrowRightIcon from "../ui/ArrowRightIcon";
import { Progress } from "../ui/progress";

const Features: React.FC = () => {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState("reports");
  const [isAnimating, setIsAnimating] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const featureSectionRef = useRef<HTMLElement>(null);
  const transitionInProgress = useRef(false);
  const animationComplete = useRef(false);
  const featureOrder = ["reports", "tools", "scheduling", "invoicing"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionObserverRef = useRef<IntersectionObserver | null>(null);
  
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

  // Set up intersection observer to detect when section is in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8, // Consider section in view when 80% visible
    };

    sectionObserverRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setSectionInView(entry.isIntersecting);
      
      if (entry.isIntersecting && !animationComplete.current) {
        startSequentialTransition();
      }
    }, observerOptions);

    if (featureSectionRef.current) {
      sectionObserverRef.current.observe(featureSectionRef.current);
    }

    return () => {
      if (sectionObserverRef.current) {
        sectionObserverRef.current.disconnect();
      }
    };
  }, []);

  // Function to handle feature card click
  const handleFeatureClick = (featureName: string, index: number) => {
    if (transitionInProgress.current) return;
    
    transitionInProgress.current = true;
    setIsAnimating(true);
    setActiveFeature(featureName);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
      transitionInProgress.current = false;
    }, 600);
  };
  
  // Function to start sequential transition through all features
  const startSequentialTransition = () => {
    if (animationComplete.current) return;
    
    let index = 0;
    setCurrentIndex(0);
    setActiveFeature(featureOrder[0]);
    
    const transitionInterval = setInterval(() => {
      // Update progress continuously
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 30);
      
      setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(0);
        
        index++;
        
        if (index >= featureOrder.length) {
          clearInterval(transitionInterval);
          animationComplete.current = true;
          return;
        }
        
        setCurrentIndex(index);
        setActiveFeature(featureOrder[index]);
      }, 3000); // Each feature displays for 3 seconds
    }, 3000);
    
    return () => clearInterval(transitionInterval);
  };
  
  // Handle "View all features" button click
  const handleViewAllFeaturesClick = () => {
    router.push('/features');
  };

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
      <button 
        className="bg-[rgba(245,246,251,1)] border w-[175px] max-w-full text-lg text-[rgba(7,15,24,1)] font-normal text-center mt-[29px] px-5 py-[21px] rounded-[56px] border-[rgba(233,138,35,1)] border-solid hover:bg-[rgba(245,246,251,0.8)] transition-colors"
        onClick={handleViewAllFeaturesClick}
      >
        View all features
      </button>

      <div className="self-stretch max-md:max-w-full mt-14" ref={featuresRef}>
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[43%] max-md:w-full max-md:ml-0">
            <div className="flex w-full flex-col self-stretch my-auto max-md:max-w-full max-md:mt-10">
              {/* Progress bar */}
              <div className="w-full mb-6">
                {currentIndex < featureOrder.length - 1 && (
                  <Progress 
                    value={progress} 
                    className="h-1.5 bg-gray-200" 
                  />
                )}
              </div>
              
              {/* Feature cards with progress indicators */}
              <div className="flex gap-2 mb-4 justify-center">
                {featureOrder.map((feature, index) => (
                  <div 
                    key={feature}
                    className={`h-2 w-16 rounded-full transition-all duration-300 cursor-pointer ${
                      index === currentIndex ? 'bg-[rgba(233,138,35,1)]' : 'bg-gray-200'
                    }`}
                    onClick={() => handleFeatureClick(feature, index)}
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
                onClick={() => handleFeatureClick("reports", 0)}
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
                onClick={() => handleFeatureClick("tools", 1)}
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
                onClick={() => handleFeatureClick("scheduling", 2)}
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
                onClick={() => handleFeatureClick("invoicing", 3)}
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
