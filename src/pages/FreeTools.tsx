import React from "react";
import { Link } from "react-router-dom";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator, ChartBar, Wrench, DollarSign, Clock } from "lucide-react";

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

const tools: Tool[] = [
  {
    id: "duct-calculator",
    title: "HVAC Duct Calculator",
    description: "Calculate duct sizes, air flow, and pressure drops for HVAC systems",
    icon: <Wrench className="w-8 h-8 text-[#E98A23]" />,
    path: "/tools/duct-calculator"
  },
  {
    id: "load-calculator",
    title: "HVAC Load Calculator",
    description: "Estimate heating and cooling loads for your HVAC projects",
    icon: <Calculator className="w-8 h-8 text-[#E98A23]" />,
    path: "/tools/load-calculator"
  },
  {
    id: "salary-calculator",
    title: "Salary to Hourly Calculator",
    description: "Convert annual salary to hourly pay rate and calculate take-home pay",
    icon: <Calculator className="w-8 h-8 text-[#E98A23]" />,
    path: "/tools/salary-calculator"
  },
  {
    id: "profit-calculator",
    title: "Profit Margin Calculator",
    description: "Calculate your profit margins and markup percentages instantly",
    icon: <ChartBar className="w-8 h-8 text-[#E98A23]" />,
    path: "/tools/profit-calculator"
  },
  {
    id: "growth-calculator",
    title: "Sales Growth Calculator",
    description: "Track and forecast your sales growth and revenue trends",
    icon: <ChartBar className="w-8 h-8 text-[#E98A23]" />,
    path: "/tools/growth-calculator"
  },
  {
    id: "roi-calculator",
    title: "ROI Calculator",
    description: "Calculate Return on Investment for your business decisions",
    icon: <ChartBar className="w-8 h-8 text-[#E98A23]" />,
    path: "/tools/roi-calculator"
  },
  {
    id: "break-even-calculator",
    title: "Break-Even Calculator",
    description: "Find out when your business will become profitable",
    icon: <DollarSign className="w-8 h-8 text-[#E98A23]" />,
    path: "/tools/break-even-calculator"
  },
  {
    id: "discount-calculator",
    title: "Discount Calculator",
    description: "Calculate discounts and final prices for your services",
    icon: <Calculator className="w-8 h-8 text-[#E98A23]" />,
    path: "/tools/discount-calculator"
  },
  {
    id: "overtime-calculator",
    title: "Overtime Calculator",
    description: "Calculate overtime pay and hours for your field service team",
    icon: <Clock className="w-8 h-8 text-[#E98A23]" />,
    path: "/tools/overtime-calculator"
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
