
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InstructionsSection = () => {
  return (
    <div className="space-y-8">
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
    </div>
  );
};

export default InstructionsSection;
