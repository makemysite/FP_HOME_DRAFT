
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const InstructionsSection = () => {
  return (
    <div className="space-y-8">
      {/* Key Terms */}
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle>Key Terms</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 text-[#E98A23]">Revenue</h3>
              <p className="text-gray-600">Money generated from sales.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 text-[#E98A23]">Cost</h3>
              <p className="text-gray-600">What you spend to provide your service.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 text-[#E98A23]">Profit</h3>
              <p className="text-gray-600">What's left after subtracting cost from revenue.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 text-[#E98A23]">Profit Margin</h3>
              <p className="text-gray-600">The percentage of profit relative to revenue.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Helps */}
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle>How Profit Margin Tool Helps You</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600">
            Think of the Profit Margin Calculator as your financial sidekick. It quickly shows you how much profit you're making on each sale after covering all costs. It's fast, easy, and essential for making smart business decisions.
          </p>
        </CardContent>
      </Card>

      {/* How to Use */}
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle>How to Use the Profit Margin Calculator</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 text-[#E98A23]">Enter Your Data</h3>
              <p className="text-gray-600">Fill in the fields for cost and revenue.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 text-[#E98A23]">Hit "Calculate"</h3>
              <p className="text-gray-600">Click the button, and instantly see your profit margin.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 text-[#E98A23]">Review Your Results</h3>
              <p className="text-gray-600">See the calculation in real time - no waiting.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 text-[#E98A23]">Adjust as Needed</h3>
              <p className="text-gray-600">Hit "Reset" to update the numbers for a different scenario.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How to Calculate */}
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle>How to Calculate Profit Margins</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-4">Here's the breakdown of calculating your gross profit margin:</p>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 text-[#E98A23]">Step 1: Identify Revenue</h3>
              <p className="text-gray-600">Start with your total sales revenue during a given period.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 text-[#E98A23]">Step 2: Find Cost of Goods Sold (COGS)</h3>
              <p className="text-gray-600">Add up the costs directly related to delivering your service.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 text-[#E98A23]">Step 3: Subtract COGS from Revenue</h3>
              <p className="text-gray-600">This gives you your gross profit.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 text-[#E98A23]">Step 4: Calculate Your Margin</h3>
              <p className="text-gray-600">Divide the gross profit by revenue, then multiply by 100 to get the percentage.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Industry Info */}
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle>What's a Good Profit Margin for Field Service Businesses?</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 mb-4">
            Sales growth depends on several key metrics like revenue, customer lifetime value, and more. Field service businesses can track these KPIs through their management software for real-time insights.
          </p>
          <p className="text-gray-600">
            Typically, a good sales growth rate for businesses is between 15-25%. However, smaller businesses or startups may experience faster growth - sometimes up to 100%. Larger businesses typically aim for sustainable growth at 5-10% annually.
          </p>
        </CardContent>
      </Card>

      {/* CTA Card */}
      <Card className="bg-gradient-to-r from-[#E98A23]/10 to-[#F9B348]/10 border-2 border-[#E98A23]/20">
        <CardHeader className="border-b border-[#E98A23]/20">
          <CardTitle className="text-[#E98A23]">Supercharge Your Sales Growth with Field Promax</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-700 mb-4">
            Field Promax is a game-changer for field service businesses looking to boost profits. By optimizing scheduling, dispatching, and job management, it helps your team complete more work in less time, opening up more opportunities for revenue.
          </p>
          <p className="text-gray-700 mb-6">
            With real-time insights, you can quickly spot areas for improvement and capitalize on successful strategies. Plus, Field Promax enhances customer relationships with automated communications and streamlined invoicing, helping you retain clients and build loyalty.
          </p>
          <Button className="w-full md:w-auto bg-[#E98A23] hover:bg-[#E98A23]/90">
            Sign up for Field Promax today!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructionsSection;
