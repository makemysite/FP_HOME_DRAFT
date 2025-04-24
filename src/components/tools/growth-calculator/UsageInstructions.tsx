
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
              <h3 className="font-semibold mb-2">Enter Sales Figures</h3>
              <p className="text-gray-600">Fill in your sales numbers for both the previous period and the current period.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Click "Calculate"</h3>
              <p className="text-gray-600">Hit the button to instantly calculate your total sales growth and growth rate.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Review Results</h3>
              <p className="text-gray-600">See how your sales are performing - use this information to adjust strategies or reinforce what's working.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Update Easily</h3>
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
              <h3 className="font-semibold mb-2">Step 1: Identify Current Sales</h3>
              <p className="text-gray-600">Identify your total sales for the current period.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Step 2: Identify Previous Sales</h3>
              <p className="text-gray-600">Identify your total sales from the previous period.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Step 3: Apply the Formula</h3>
              <p className="text-gray-600">Sales Growth Rate = [(Current Sales - Previous Sales) / Previous Sales] x 100</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Step 4: Calculate Percentage</h3>
              <p className="text-gray-600">Calculate the percentage to find your growth rate. This helps you see if your sales are growing, shrinking, or staying steady.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsageInstructions;
