import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const CalculatorTool = () => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [operation, setOperation] = useState<string>("add");
  const [result, setResult] = useState<number | string>(0);

  const calculate = () => {
    switch (operation) {
      case "add":
        setResult(num1 + num2);
        break;
      case "subtract":
        setResult(num1 - num2);
        break;
      case "multiply":
        setResult(num1 * num2);
        break;
      case "divide":
        setResult(num2 !== 0 ? num1 / num2 : "Cannot divide by zero");
        break;
      default:
        setResult(0);
    }
  };

  return (
    <ClientPageWrapper
      metaTitle="Field Service Calculator"
      metaDescription="Calculate service costs, labor hours, and more with our free calculator"
    >
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <Calculator className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Service Calculator Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[#E98A23] mb-4">Service Calculator</h2>
              <p className="text-lg text-gray-700 mb-4">
                A simple yet powerful calculator for all your service business calculations. Perfect for quick estimates and basic calculations on the go.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <Calculator className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Service Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid gap-4">
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(Number(e.target.value))}
                className="border p-2 rounded"
                placeholder="Enter first number"
              />
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="add">Add</option>
                <option value="subtract">Subtract</option>
                <option value="multiply">Multiply</option>
                <option value="divide">Divide</option>
              </select>
              <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(Number(e.target.value))}
                className="border p-2 rounded"
                placeholder="Enter second number"
              />
              <Button onClick={calculate} className="bg-[#E98A23] hover:bg-[#d47b1e]">
                Calculate
              </Button>
              <div className="text-xl font-semibold text-center p-4 border rounded">
                Result: {result}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientPageWrapper>
  );
};

export default CalculatorTool;
