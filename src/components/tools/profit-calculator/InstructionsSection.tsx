
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const InstructionsSection = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Key Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold mb-2">Revenue</h3>
              <p className="text-gray-600">Money generated from sales.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Cost</h3>
              <p className="text-gray-600">What you spend to provide your service.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Profit</h3>
              <p className="text-gray-600">What's left after subtracting cost from revenue.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Profit Margin</h3>
              <p className="text-gray-600">The percentage of profit relative to revenue.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How Profit Margin Tool Helps You</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Think of the Profit Margin Calculator as your financial sidekick. It quickly shows you how much profit you're making on each sale after covering all costs. It's fast, easy, and essential for making smart business decisions.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use the Profit Margin Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Enter Your Data</h3>
              <p className="text-gray-600">Fill in the fields for cost and revenue.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Hit "Calculate"</h3>
              <p className="text-gray-600">Click the button, and instantly see your profit margin.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Review Your Results</h3>
              <p className="text-gray-600">See the calculation in real time - no waiting.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Adjust as Needed</h3>
              <p className="text-gray-600">Hit "Reset" to update the numbers for a different scenario.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Profit Margins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Step 1: Identify Revenue</h3>
              <p className="text-gray-600">Start with your total sales revenue during a given period.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Step 2: Find Cost of Goods Sold (COGS)</h3>
              <p className="text-gray-600">Add up the costs directly related to delivering your service.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Step 3: Subtract COGS from Revenue</h3>
              <p className="text-gray-600">This gives you your gross profit.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Step 4: Calculate Your Margin</h3>
              <p className="text-gray-600">Divide the gross profit by revenue, then multiply by 100 to get the percentage.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What's a Good Profit Margin for Field Service Businesses?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Sales growth depends on several key metrics like revenue, customer lifetime value, and more. Field service businesses can track these KPIs through their management software for real-time insights.
          </p>
          <p className="text-gray-600">
            Typically, a good sales growth rate for businesses is between 15-25%. However, smaller businesses or startups may experience faster growth - sometimes up to 100%. Larger businesses typically aim for sustainable growth at 5-10% annually.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
        <CardHeader>
          <CardTitle>Supercharge Your Sales Growth with Field Promax</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Field Promax is a game-changer for field service businesses looking to boost profits. By optimizing scheduling, dispatching, and job management, it helps your team complete more work in less time, opening up more opportunities for revenue.
          </p>
          <p className="text-gray-700 mb-6">
            With real-time insights, you can quickly spot areas for improvement and capitalize on successful strategies. Plus, Field Promax enhances customer relationships with automated communications and streamlined invoicing, helping you retain clients and build loyalty.
          </p>
          <Button className="w-full md:w-auto">
            Sign up for Field Promax today!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructionsSection;
