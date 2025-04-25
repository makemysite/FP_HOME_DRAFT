import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UsageInstructions = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>How to Use Our Free Sales Growth Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-[#E98A23] mb-2">Enter Sales Figures</h3>
              <p className="text-gray-600">Fill in your sales numbers for both the previous period and the current period.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#E98A23] mb-2">Click "Calculate"</h3>
              <p className="text-gray-600">Hit the button to instantly calculate your total sales growth and growth rate.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#E98A23] mb-2">Review Results</h3>
              <p className="text-gray-600">See how your sales are performing - use this information to adjust strategies or reinforce what's working.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#E98A23] mb-2">Update Easily</h3>
              <p className="text-gray-600">If you need to adjust the numbers, simply click "Reset" to start fresh.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Your Sales Growth Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-[#E98A23] mb-2">Step 1: Identify Current Sales</h3>
              <p className="text-gray-600">Identify your total sales for the current period.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#E98A23] mb-2">Step 2: Identify Previous Sales</h3>
              <p className="text-gray-600">Identify your total sales from the previous period.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#E98A23] mb-2">Step 3: Apply the Formula</h3>
              <p className="text-gray-600">Sales Growth Rate = [(Current Sales - Previous Sales) / Previous Sales] x 100</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#E98A23] mb-2">Step 4: Calculate Percentage</h3>
              <p className="text-gray-600">Calculate the percentage to find your growth rate. This helps you see if your sales are growing, shrinking, or staying steady.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What's a Good Sales Growth Rate for a Field Service Business?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            For most businesses, a 15-25% growth rate is a solid target. However, smaller businesses or startups might see higher rates - sometimes reaching 75-100% in their early stages. Larger, well-established businesses tend to aim for a more sustainable growth rate of 5-10% annually.
          </p>
          <p className="text-gray-700">
            If you want to keep your sales on track, consider using this calculator regularly to track your progress and adjust your goals as needed.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supercharge Your Sales Growth with Field Promax</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Field Promax can help your business achieve sustained growth by improving operational efficiency. With our software, you can:
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1 text-[#E98A23]">Optimize Field Operations</h3>
              <p className="text-gray-600">Streamline scheduling, dispatching, and job management to increase the number of jobs your team can handle.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-1 text-[#E98A23]">Make Informed Decisions</h3>
              <p className="text-gray-600">Gain real-time insights into your field operations and customer interactions to spot trends, capitalize on opportunities, and improve weak areas.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-1 text-[#E98A23]">Enhance Customer Relationships</h3>
              <p className="text-gray-600">Build customer loyalty with automated communications and seamless invoicing, encouraging repeat business and long-term growth.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsageInstructions;
