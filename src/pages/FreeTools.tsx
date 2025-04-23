
import React from "react";
import { Link } from "react-router-dom";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wrench, Calculator, ChartBar, Calendar } from "lucide-react";

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

const tools: Tool[] = [
  {
    id: "calculator",
    title: "Field Service Calculator",
    description: "Calculate service costs, labor hours, and project estimates with ease",
    icon: <Calculator className="w-8 h-8 text-[#E98A23]" />,
    path: "/tools/calculator"
  },
  {
    id: "roi",
    title: "ROI Calculator",
    description: "Measure the return on investment for your field service operations",
    icon: <ChartBar className="w-8 h-8 text-[#E98A23]" />,
    path: "/tools/roi-calculator"
  },
  {
    id: "scheduler",
    title: "Service Schedule Planner",
    description: "Plan and optimize your service schedules efficiently",
    icon: <Calendar className="w-8 h-8 text-[#E98A23]" />,
    path: "/tools/scheduler"
  },
  {
    id: "maintenance",
    title: "Maintenance Calculator",
    description: "Calculate maintenance costs and schedules for equipment",
    icon: <Wrench className="w-8 h-8 text-[#E98A23]" />,
    path: "/tools/maintenance"
  }
];

const FreeTools = () => {
  return (
    <ClientPageWrapper
      title="Free Field Service Tools"
      description="Access our collection of free tools designed to help you manage and optimize your field service operations"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {tools.map((tool) => (
          <Link key={tool.id} to={tool.path}>
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="mt-1">{tool.icon}</div>
                  <div>
                    <CardTitle className="text-xl mb-2">{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </ClientPageWrapper>
  );
};

export default FreeTools;
