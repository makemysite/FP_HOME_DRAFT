
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Wrench, 
  CalendarClock, 
  Receipt 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ArrowRightIcon from "../ui/ArrowRightIcon";

const Features = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState("reports");

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

  const handleViewAllFeaturesClick = () => {
    navigate('/features');
  };

  const handleFeatureClick = (featureKey: string) => {
    setActiveFeature(featureKey);
  };

  return (
    <section className="flex w-full max-w-[1335px] flex-col items-center mt-14 max-md:max-w-full max-md:mt-10">
      <div className="text-[rgba(233,138,35,1)] text-lg font-bold leading-none tracking-[1.8px] text-center uppercase">
        Features
      </div>
      <h2 className="text-[#170F49] text-center text-[50px] font-bold leading-[62px] w-[668px] mt-7 max-md:max-w-full max-md:text-[40px] max-md:leading-[55px]">
        Spend Less Time Managing and More Time Growing
      </h2>
      <div className="text-[#26393F] text-center text-lg font-normal leading-loose mt-[29px] max-md:max-w-full">
        Automate Your Service Business With Our Exclusive Features
      </div>
      
      {/* Hero Image */}
      <div className="relative w-full max-w-[800px] aspect-[16/9] mt-12 mb-16">
        {Object.entries(features).map(([key, feature]) => (
          <img
            key={key}
            src={feature.image}
            alt={`${feature.title} Screenshot`}
            className={cn(
              "absolute top-0 left-0 w-full h-full object-contain transition-all duration-[1000ms] ease-in-out rounded-lg",
              activeFeature === key
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            )}
          />
        ))}
      </div>

      {/* Feature Cards Carousel */}
      <div className="w-full max-w-[1200px] px-4">
        <Carousel
          opts={{
            align: "start",
            loop: true
          }}
          className="w-full"
        >
          <CarouselContent>
            {Object.entries(features).map(([key, feature]) => (
              <CarouselItem key={key} className="md:basis-1/2 lg:basis-1/4">
                <div
                  className={cn(
                    "feature-card group p-6 rounded-xl transition-all duration-300 cursor-pointer",
                    activeFeature === key
                      ? "bg-white shadow-lg transform scale-105"
                      : "bg-white/50 hover:bg-white hover:shadow-md"
                  )}
                  onClick={() => handleFeatureClick(key)}
                >
                  <div className="aspect-[1] w-12 mb-4 transition-transform group-hover:scale-110 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className={cn(
                    "text-xl font-semibold mb-3 transition-colors duration-300",
                    activeFeature === key
                      ? "text-[rgba(233,138,35,1)]"
                      : "text-[#202225] group-hover:text-[rgba(233,138,35,0.7)]"
                  )}>
                    {feature.title}
                  </h3>
                  <p className="text-[#202225] text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-[rgba(233,138,35,1)] font-semibold group-hover:text-[rgba(233,138,35,0.7)] transition-colors duration-300">
                    Learn More 
                    <ArrowRightIcon className="ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <Button 
        className="mt-12 bg-[rgba(245,246,251,1)] text-[rgba(7,15,24,1)] hover:bg-[rgba(245,246,251,0.8)] border border-[rgba(233,138,35,1)]"
        onClick={handleViewAllFeaturesClick}
      >
        View all features
      </Button>
    </section>
  );
};

export default Features;
