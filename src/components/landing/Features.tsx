
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ArrowRightIcon from "../ui/ArrowRightIcon";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";

const Features: React.FC = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState("reports");
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState<string[]>([]);
  const featuresRef = useRef<HTMLDivElement>(null);
  const featureSectionRef = useRef<HTMLElement>(null);
  const transitionInProgress = useRef(false);
  const animationComplete = useRef(false);
  const featureOrder = ["reports", "tools", "scheduling", "invoicing"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);
  const previousActiveFeature = useRef("reports");
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);
  const isScrolling = useRef(false);
  const targetFeatureIndex = useRef(0);
  const reachedEnd = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      const newDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
      setScrollDirection(newDirection);
      lastScrollY.current = currentScrollY;
      
      // Set scrolling flag and clear previous timer
      isScrolling.current = true;
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
      
      // Set a timeout to handle the end of scroll event
      scrollTimer.current = setTimeout(() => {
        isScrolling.current = false;
        
        // When scrolling stops, ensure we're at the correct feature state
        const currentFeatureIndex = featureOrder.indexOf(previousActiveFeature.current);
        const targetIndex = targetFeatureIndex.current;
        
        // If we're not at the target index when scrolling stops, move to it
        if (currentFeatureIndex !== targetIndex && !transitionInProgress.current) {
          transitionToFeature(featureOrder[targetIndex], targetIndex);
        }
      }, 150);

      // Check if we've reached end boundaries and prevent further progression
      if (newDirection === 'down' && previousActiveFeature.current === featureOrder[featureOrder.length - 1]) {
        reachedEnd.current = true;
        return;
      } else if (newDirection === 'up' && previousActiveFeature.current === featureOrder[0]) {
        reachedEnd.current = true;
        return;
      } else {
        reachedEnd.current = false;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, []);

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

  // Centralized transition function to ensure consistent behavior
  const transitionToFeature = (featureId: string, index: number) => {
    if (transitionInProgress.current) return false;
    
    transitionInProgress.current = true;
    setActiveFeature(featureId);
    setCurrentIndex(index);
    previousActiveFeature.current = featureId;
    
    setTimeout(() => {
      transitionInProgress.current = false;
    }, 400);
    
    return true;
  };

  // Function to handle ordered feature transitions based on scroll direction
  const handleOrderedFeatureTransition = (entries: IntersectionObserverEntry[]) => {
    if (transitionInProgress.current || reachedEnd.current) return;
    
    // Find the most visible element
    const mostVisibleEntry = entries.reduce((prev, current) => {
      return (prev?.intersectionRatio > current.intersectionRatio) ? prev : current;
    }, entries[0]);

    if (mostVisibleEntry && mostVisibleEntry.isIntersecting && mostVisibleEntry.intersectionRatio > 0.4) {
      const featureId = mostVisibleEntry.target.getAttribute("data-feature") as string;
      
      if (!featureId) return;
      
      const currentFeatureIndex = featureOrder.indexOf(featureId);
      const previousFeatureIndex = featureOrder.indexOf(previousActiveFeature.current);
      
      // Update the target index based on scroll direction with boundary checks
      if (scrollDirection === 'down') {
        // When scrolling down, move forward one step at a time, but don't exceed the last feature
        const nextIndex = Math.min(
          featureOrder.length - 1, 
          previousFeatureIndex + 1
        );
        targetFeatureIndex.current = nextIndex;
        
        // If we're at the last feature, mark as reached end to prevent further transitions
        if (nextIndex === featureOrder.length - 1 && previousFeatureIndex === featureOrder.length - 1) {
          reachedEnd.current = true;
        }
      } else {
        // When scrolling up, move backward one step at a time, but don't go below the first feature
        const prevIndex = Math.max(
          0,
          previousFeatureIndex - 1
        );
        targetFeatureIndex.current = prevIndex;
        
        // If we're at the first feature, mark as reached end to prevent further transitions
        if (prevIndex === 0 && previousFeatureIndex === 0) {
          reachedEnd.current = true;
        }
      }
      
      // Only transition if we're not already at the target feature and haven't reached an end
      if (currentFeatureIndex === targetFeatureIndex.current && !reachedEnd.current) {
        transitionToFeature(featureId, currentFeatureIndex);
      }
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        handleOrderedFeatureTransition(entries);
        
        // Update the visibility state for animation purposes
        entries.forEach((entry) => {
          const featureId = entry.target.getAttribute("data-feature");
          if (featureId) {
            if (entry.isIntersecting) {
              setVisibleFeatures((prev) => [...prev.filter(id => id !== featureId), featureId]);
            } else {
              setVisibleFeatures((prev) => prev.filter((id) => id !== featureId));
            }
          }
        });
      },
      {
        threshold: [0.2, 0.3, 0.4, 0.5, 0.6],
        rootMargin: "-15% 0px -15% 0px"
      }
    );

    Object.values(cardRefs.current).forEach((ref) => {
      if (ref) {
        observerRef.current?.observe(ref);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [scrollDirection]);

  // Reset reachedEnd when scroll direction changes
  useEffect(() => {
    // Reset the reachedEnd flag when direction changes
    // This allows transitions to work again when changing direction
    reachedEnd.current = false;
  }, [scrollDirection]);

  const handleFeatureClick = (featureName: string, index: number) => {
    transitionToFeature(featureName, index);
    // Update target index to match clicked feature
    targetFeatureIndex.current = index;
    // Reset reachedEnd flag on manual click
    reachedEnd.current = false;
    setIsAnimating(true);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const startSequentialTransition = () => {
    if (animationComplete.current) return;
    
    let index = 0;
    setCurrentIndex(0);
    setActiveFeature(featureOrder[0]);
    previousActiveFeature.current = featureOrder[0];
    targetFeatureIndex.current = 0;
    
    const transitionInterval = setInterval(() => {
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
        previousActiveFeature.current = featureOrder[index];
        targetFeatureIndex.current = index;
      }, 3000);
    }, 3000);
    
    return () => clearInterval(transitionInterval);
  };

  const handleViewAllFeaturesClick = () => {
    navigate('/features');
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
              <div className="w-full mb-6">
                {currentIndex < featureOrder.length - 1 && (
                  <Progress value={progress} className="h-1.5 bg-gray-200" />
                )}
              </div>

              {featureOrder.map((featureKey, index) => (
                <div
                  key={featureKey}
                  ref={(el) => {
                    if (el) cardRefs.current[featureKey] = el;
                  }}
                  data-feature={featureKey}
                  className={cn(
                    "feature-card group transition-all duration-700 ease-in-out mb-4 p-4 rounded-lg cursor-pointer",
                    activeFeature === featureKey
                      ? "shadow-[0px_20px_30px_5px_rgba(0,0,0,0.15)] bg-white transform translate-y-0 opacity-100 scale-100"
                      : "bg-white hover:bg-gray-50 transform opacity-70 scale-95",
                    !visibleFeatures.includes(featureKey) && scrollDirection === 'down' 
                      ? "translate-y-[100px]" 
                      : !visibleFeatures.includes(featureKey) && scrollDirection === 'up'
                      ? "-translate-y-[100px]"
                      : "translate-y-0",
                    visibleFeatures.includes(featureKey) && "opacity-100 scale-100"
                  )}
                  onClick={() => handleFeatureClick(featureKey, index)}
                >
                  <div className="flex w-[361px] max-w-full gap-[17px] text-lg font-bold leading-[3] pb-1.5">
                    {features[featureKey as keyof typeof features].icon && (
                      <img
                        src={features[featureKey as keyof typeof features].icon}
                        alt={`${featureKey} Icon`}
                        className="aspect-[1] object-contain w-9 shrink-0 transition-transform group-hover:scale-110"
                      />
                    )}
                    <div
                      className={cn(
                        "grow shrink w-[301px] basis-auto mt-3.5 transition-colors duration-300",
                        activeFeature === featureKey
                          ? "text-[rgba(233,138,35,1)]"
                          : "text-[#202225] group-hover:text-[rgba(233,138,35,0.7)]"
                      )}
                    >
                      {features[featureKey as keyof typeof features].title}
                    </div>
                  </div>
                  <div
                    className={cn(
                      "flex gap-[40px_60px] text-sm text-[#202225] font-normal leading-[22px] flex-wrap px-[54px] max-md:max-w-full max-md:px-5 transition-all duration-500 ease-in-out overflow-hidden",
                      activeFeature === featureKey
                        ? "opacity-100 max-h-[200px] mt-2"
                        : "opacity-0 max-h-0 mt-0"
                    )}
                  >
                    <div className="w-[276px]">
                      {features[featureKey as keyof typeof features].description}
                    </div>
                    <div className="flex items-center mt-2 text-[rgba(233,138,35,1)] font-semibold group-hover:text-[rgba(233,138,35,0.7)] transition-colors duration-300">
                      Learn More 
                      <ArrowRightIcon className="ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[57%] ml-5 max-md:w-full max-md:ml-0">
            <div className="relative w-full h-full">
              {Object.keys(features).map((key) => (
                <img
                  key={key}
                  src={features[key as keyof typeof features].image}
                  alt={`${features[key as keyof typeof features].title} Screenshot`}
                  className={cn(
                    "absolute top-0 left-0 aspect-[1.4] object-contain w-full transition-all duration-800 ease-in-out",
                    activeFeature === key
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-8 scale-95"
                  )}
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

