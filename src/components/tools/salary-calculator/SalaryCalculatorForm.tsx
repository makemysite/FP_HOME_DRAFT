
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SalaryCalculatorFormProps } from "@/types/calculatorTypes";

const SalaryCalculatorForm = ({ onCalculate }: SalaryCalculatorFormProps) => {
  const [annualSalary, setAnnualSalary] = useState<number>(0);
  const [weeklyHours, setWeeklyHours] = useState<number>(40);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(52);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(annualSalary, weeklyHours, weeksPerYear);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="salary">Annual Salary ($)</Label>
        <Input
          id="salary"
          type="number"
          value={annualSalary || ''}
          onChange={(e) => setAnnualSalary(Number(e.target.value))}
          placeholder="Enter annual salary"
          required
        />
      </div>

      <div>
        <Label htmlFor="hours">Weekly Hours</Label>
        <Input
          id="hours"
          type="number"
          value={weeklyHours || ''}
          onChange={(e) => setWeeklyHours(Number(e.target.value))}
          placeholder="Enter weekly hours"
          required
        />
      </div>

      <div>
        <Label htmlFor="weeks">Weeks Worked per Year</Label>
        <Input
          id="weeks"
          type="number"
          value={weeksPerYear || ''}
          onChange={(e) => setWeeksPerYear(Number(e.target.value))}
          placeholder="Enter weeks per year"
          required
        />
      </div>

      <Button type="submit" className="w-full bg-[#E98A23] hover:bg-[#d47b1e]">
        Calculate
      </Button>
    </form>
  );
};

export default SalaryCalculatorForm;
