
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { calculateBreakEven } from "@/utils/breakEvenCalculations";

interface BreakEvenCalculatorFormProps {
  onCalculate: (results: ReturnType<typeof calculateBreakEven>) => void;
}

const BreakEvenCalculatorForm = ({ onCalculate }: BreakEvenCalculatorFormProps) => {
  const [fixedCosts, setFixedCosts] = useState<number>(0);
  const [variableCost, setVariableCost] = useState<number>(0);
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [unitsSold, setUnitsSold] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const results = calculateBreakEven(fixedCosts, variableCost, sellingPrice, unitsSold);
    onCalculate(results);
  };

  const handleReset = () => {
    setFixedCosts(0);
    setVariableCost(0);
    setSellingPrice(0);
    setUnitsSold(0);
    onCalculate(calculateBreakEven(0, 0, 0));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fixedCosts">Fixed Costs ($)</Label>
          <Input
            id="fixedCosts"
            type="number"
            min="0"
            step="0.01"
            value={fixedCosts}
            onChange={(e) => setFixedCosts(Number(e.target.value))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="variableCost">Variable Cost per Unit ($)</Label>
          <Input
            id="variableCost"
            type="number"
            min="0"
            step="0.01"
            value={variableCost}
            onChange={(e) => setVariableCost(Number(e.target.value))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sellingPrice">Selling Price per Unit ($)</Label>
          <Input
            id="sellingPrice"
            type="number"
            min="0"
            step="0.01"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(Number(e.target.value))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="unitsSold">Expected Units Sold (Optional)</Label>
          <Input
            id="unitsSold"
            type="number"
            min="0"
            value={unitsSold}
            onChange={(e) => setUnitsSold(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <Button type="submit" className="bg-[#E98A23] hover:bg-[#E98A23]/90">Calculate</Button>
        <Button type="button" variant="outline" onClick={handleReset}>Reset</Button>
      </div>
    </form>
  );
};

export default BreakEvenCalculatorForm;
