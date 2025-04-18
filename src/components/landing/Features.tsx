
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ArrowRightIcon from "../ui/ArrowRightIcon";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Wrench, CalendarClock, Receipt } from "lucide-react";

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
  const isPaused = useRef(false);
  const pauseTimeout = useRef<NodeJS.Timeout | null>(null);
  const preventCycling = useRef(true);

  const TRANSITION_DURATION = 800;
  const SCROLL_PAUSE_DURATION = 900;
  const PROGRESS_INTERVAL = 50;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (isPaused.current) return;
      
      const newDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
      setScrollDirection(newDirection);
      lastScrollY.current = currentScrollY;
      
      isScrolling.current = true;
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
      
      if (newDirection === 'down' && previousActiveFeature.current === featureOrder[featureOrder.length - 1]) {
        reachedEnd.current = true;
        isPaused.current = true;
        if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
        pauseTimeout.current = setTimeout(() => {
          isPaused.current = false;
        }, SCROLL_PAUSE_DURATION);
        return;
      } 
      else if (newDirection === 'up' && previousActiveFeature.current === featureOrder[0]) {
        reachedEnd.current = true;
        isPaused.current = true;
        if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
        pauseTimeout.current = setTimeout(() => {
          isPaused.current = false;
        }, SCROLL_PAUSE_DURATION);
        return;
      } else {
        reachedEnd.current = false;
      }
      
      scrollTimer.current = setTimeout(() => {
        isScrolling.current = false;
        
        const currentFeatureIndex = featureOrder.indexOf(previousActiveFeature.current);
        const targetIndex = targetFeatureIndex.current;
        
        if (currentFeatureIndex !== targetIndex && !transitionInProgress.current && !isPaused.current) {
          transitionToFeature(featureOrder[targetIndex], targetIndex);
        }
      }, 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
      if (pauseTimeout.current) {
        clearTimeout(pauseTimeout.current);
      }
    };
  }, []);

  interface FeatureItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    image: string;
  }

  const features: Record<string, FeatureItem> = {
    reports: {
      title: "Reports and Dashboard",
      description:
        "Get comprehensive insights with custom reports and real-time dashboards that help you make data-driven decisions for your field service business.",
      icon: <LayoutDashboard size={28} className="text-[#E98A23]" />,
      image:
        "https://ik.imagekit.io/d1cslxmlo/features_hero/Dashboard%20Desktop.png?updatedAt=1743607924289",
    },
    tools: {
      title: "Tools & Integrations",
      description:
        "Connect with your favorite tools and automate your workflow with our seamless integrations to QuickBooks, Xero, and other essential business software.",
      icon: <Wrench size={28} className="text-[#E98A23]" />,
      image:
        "https://ik.imagekit.io/d1cslxmlo/features_hero/tools&integration.png?updatedAt=1744817523845",
    },
    scheduling: {
      title: "Smart Scheduling",
      description:
        "Optimize your team's schedule with AI-powered recommendations that maximize efficiency and reduce travel time between job sites.",
      icon: <CalendarClock size={28} className="text-[#E98A23]" />,
      image:
        "https://ik.imagekit.io/d1cslxmlo/features_hero/scheduling%20&%20dispatching.png?updatedAt=1743602580941",
    },
    invoicing: {
      title: "Invoicing & Payments",
      description: "Streamline your billing process, get paid faster, and maintain healthy cash flow with our integrated invoicing and payment solutions.",
      icon: <Receipt size={28} className="text-[#E98A23]" />,
      image:
        "https://ik.imagekit.io/d1cslxmlo/features_hero/invoice.png?updatedAt=1744822227023",
    },
  };

  const transitionToFeature = (featureId: string, index: number) => {
    if (transitionInProgress.current || isPaused.current) return false;
    
    if (index < 0 || index >= featureOrder.length) return false;
    
    transitionInProgress.current = true;
    setActiveFeature(featureId);
    setCurrentIndex(index);
    previousActiveFeature.current = featureId;
    
    setTimeout(() => {
      transitionInProgress.current = false;
    }, TRANSITION_DURATION);
    
    return true;
  };

  const handleOrderedFeatureTransition = (entries: IntersectionObserverEntry[]) => {
    if (transitionInProgress.current || reachedEnd.current || isPaused.current) return;
    
    const mostVisibleEntry = entries.reduce((prev, current) => {
      return (prev?.intersectionRatio > current.intersectionRatio) ? prev : current;
    }, entries[0]);

    if (mostVisibleEntry && mostVisibleEntry.isIntersecting && mostVisibleEntry.intersectionRatio > 0.4) {
      const featureId = mostVisibleEntry.target.getAttribute("data-feature") as string;
      
      if (!featureId) return;
      
      const currentFeatureIndex = featureOrder.indexOf(featureId);
      const previousFeatureIndex = featureOrder.indexOf(previousActiveFeature.current);
      
      if (scrollDirection === 'down') {
        const nextIndex = Math.min(
          featureOrder.length - 1, 
          previousFeatureIndex + 1
        );
        targetFeatureIndex.current = nextIndex;
        
        if (nextIndex === featureOrder.length - 1) {
          if (previousFeatureIndex === featureOrder.length - 1) {
            reachedEnd.current = true;
            isPaused.current = true;
            if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
            pauseTimeout.current = setTimeout(() => {
              isPaused.current = false;
            }, SCROLL_PAUSE_DURATION);
          }
        }
      } else {
        const prevIndex = Math.max(
          0,
          previousFeatureIndex - 1
        );
        targetFeatureIndex.current = prevIndex;
        
        if (prevIndex === 0) {
          if (previousFeatureIndex === 0) {
            reachedEnd.current = true;
            isPaused.current = true;
            if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
            pauseTimeout.current = setTimeout(() => {
              isPaused.current = false;
            }, SCROLL_PAUSE_DURATION);
          }
        }
      }
      
      if (currentFeatureIndex === targetFeatureIndex.current && !reachedEnd.current && !isPaused.current) {
        transitionToFeature(featureId, currentFeatureIndex);
      }
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        handleOrderedFeatureTransition(entries);
        
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

  useEffect(() => {
    reachedEnd.current = false;
    isPaused.current = false;
    if (pauseTimeout.current) {
      clearTimeout(pauseTimeout.current);
    }
  }, [scrollDirection]);

  const handleFeatureClick = (featureName: string, index: number) => {
    transitionToFeature(featureName, index);
    targetFeatureIndex.current = index;
    reachedEnd.current = false;
    isPaused.current = false;
    if (pauseTimeout.current) {
      clearTimeout(pauseTimeout.current);
    }
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
      }, PROGRESS_INTERVAL);
      
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
      }, 3500);
    }, 3500);
    
    return () => clearInterval(transitionInterval);
  };

  const handleViewAllFeaturesClick = () => {
    navigate('/features');
  };

  const imageTransitionClasses = cn(
    "absolute top-0 left-0 aspect-[1.4] object-contain w-full transition-all duration-[1000ms] ease-in-out"
  );

  const featureCardTransitionClasses = cn(
    "feature-card group transition-all duration-[1000ms] ease-in-out mb-4 p-4 rounded-lg cursor-pointer"
  );

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
                    featureCardTransitionClasses,
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
                    <div className="aspect-[1] w-9 shrink-0 transition-transform group-hover:scale-110 flex items-center justify-center">
                      {features[featureKey].icon}
                    </div>
                    <div
                      className={cn(
                        "grow shrink w-[301px] basis-auto mt-3.5 transition-colors duration-300",
                        activeFeature === featureKey
                          ? "text-[rgba(233,138,35,1)]"
                          : "text-[#202225] group-hover:text-[rgba(233,138,35,0.7)]"
                      )}
                    >
                      {features[featureKey].title}
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
                      {features[featureKey].description}
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
                  src={features[key].image}
                  alt={`${features[key].title} Screenshot`}
                  className={cn(
                    imageTransitionClasses,
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
