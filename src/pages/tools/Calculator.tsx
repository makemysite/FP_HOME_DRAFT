
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
      title="Field Service Calculator"
      description="Calculate service costs, labor hours, and more"
    >
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Calculator className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Service Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
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
