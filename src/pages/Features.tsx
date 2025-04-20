
import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import { 
  LayoutDashboard, 
  Wrench, 
  CalendarClock, 
  Receipt,
  Smartphone,
  MessageSquare,
  Clock,
  Map,
  BarChart3,
  Settings
} from "lucide-react";

const Features = () => {
  const [activeFeature, setActiveFeature] = useState("reports");

  const features = {
    reports: {
      title: "Reports and Dashboard",
      description: "Get comprehensive insights with custom reports and real-time dashboards that help you make data-driven decisions for your field service business.",
      icon: <LayoutDashboard className="h-6 w-6 text-[rgba(233,138,35,1)]" />,
      image: "https://ik.imagekit.io/d1cslxmlo/features_hero/Dashboard%20Desktop.png?updatedAt=1743607924289",
    },
    tools: {
      title: "Tools & Integrations",
      description: "Connect with your favorite tools and automate your workflow with our seamless integrations to QuickBooks, Xero, and other essential business software.",
      icon: <Wrench className="h-6 w-6 text-[rgba(233,138,35,1)]" />,
      image: "https://ik.imagekit.io/d1cslxmlo/features_hero/tools&integration.png?updatedAt=1744817523845",
    },
    scheduling: {
      title: "Smart Scheduling",
      description: "Optimize your team's schedule with AI-powered recommendations that maximize efficiency and reduce travel time between job sites.",
      icon: <CalendarClock className="h-6 w-6 text-[rgba(233,138,35,1)]" />,
      image: "https://ik.imagekit.io/d1cslxmlo/features_hero/scheduling%20&%20dispatching.png?updatedAt=1743602580941",
    },
    invoicing: {
      title: "Invoicing & Payments",
      description: "Streamline your billing process, get paid faster, and maintain healthy cash flow with our integrated invoicing and payment solutions.",
      icon: <Receipt className="h-6 w-6 text-[rgba(233,138,35,1)]" />,
      image: "https://ik.imagekit.io/d1cslxmlo/features_hero/invoice.png?updatedAt=1744822227023",
    },
  };

  const additionalFeatures = {
    mobile: {
      title: "Mobile App",
      description: "Access your business on the go with our powerful mobile app that works on iOS and Android devices.",
      icon: <Smartphone className="h-6 w-6 text-[rgba(233,138,35,1)]" />,
    },
    communication: {
      title: "Customer Communication",
      description: "Keep clients informed with automated notifications, appointment reminders, and follow-up messages.",
      icon: <MessageSquare className="h-6 w-6 text-[rgba(233,138,35,1)]" />,
    },
    timeTracking: {
      title: "Time Tracking",
      description: "Accurately track employee hours, job duration, and labor costs to optimize profitability.",
      icon: <Clock className="h-6 w-6 text-[rgba(233,138,35,1)]" />,
    },
    routing: {
      title: "GPS & Route Optimization",
      description: "Plan the most efficient routes for your team members to minimize driving time and fuel costs.",
      icon: <Map className="h-6 w-6 text-[rgba(233,138,35,1)]" />,
    },
    analytics: {
      title: "Advanced Analytics",
      description: "Gain deeper insights with customizable reports and business intelligence tools that highlight trends.",
      icon: <BarChart3 className="h-6 w-6 text-[rgba(233,138,35,1)]" />,
    },
    customization: {
      title: "Custom Workflows",
      description: "Tailor the platform to match your business processes with configurable workflows and forms.",
      icon: <Settings className="h-6 w-6 text-[rgba(233,138,35,1)]" />,
    },
  };

  const handleFeatureClick = (key: string) => {
    setActiveFeature(key);
  };

  return (
    <div className="bg-white shadow-[0px_6px_44px_rgba(45,33,122,0.1)] flex flex-col overflow-hidden items-center pt-[19px] pb-[49px]">
      <header className="self-stretch flex w-full flex-col items-center pl-[76px] max-md:max-w-full max-md:pl-5">
        <Navbar />
      </header>

      <main className="self-stretch flex w-full flex-col items-center px-[76px] max-md:max-w-full max-md:px-5">
        <div className="w-full max-w-[1200px] mt-16 mb-24">
          <div className="text-center mb-16">
            <span className="text-[rgba(233,138,35,1)] text-lg font-bold tracking-[1.8px] uppercase">
              Our Features
            </span>
            <h1 className="text-5xl font-bold mt-4 text-[#170F49]">
              Everything You Need to Run Your Field Service Business
            </h1>
            <p className="text-xl text-[#26393F] max-w-3xl mx-auto mt-6">
              Discover all the powerful tools and features designed to streamline your operations and boost productivity
            </p>
          </div>

          {/* Hero Feature Display */}
          <div className="flex flex-col lg:flex-row gap-8 items-center mb-24">
            <div className="lg:w-1/2">
              {Object.entries(features).map(([key, feature]) => (
                <div
                  key={key}
                  className={`cursor-pointer p-4 border-l-4 mb-4 transition-all duration-300 ${
                    activeFeature === key
                      ? "border-[rgba(233,138,35,1)] bg-orange-50"
                      : "border-transparent hover:border-orange-200 hover:bg-orange-50/30"
                  }`}
                  onClick={() => handleFeatureClick(key)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-orange-100 rounded-lg">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold text-xl">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="lg:w-1/2 p-4 bg-white rounded-lg shadow-xl">
              {Object.entries(features).map(([key, feature]) => (
                <div
                  key={key}
                  className={`transition-opacity duration-500 ${
                    activeFeature === key ? "block opacity-100" : "hidden opacity-0"
                  }`}
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Additional Features Grid */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-12">More Powerful Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(additionalFeatures).map(([key, feature]) => (
                <div key={key} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-[rgba(233,138,35,0.1)] rounded-full flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Features;
