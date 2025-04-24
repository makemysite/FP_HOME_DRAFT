
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdditionalInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Key Terms to Know</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Salary (Annual/Monthly/Weekly):</h3>
            <p className="text-gray-700">The total income before taxes, entered based on the period you choose.</p>
          </div>
          <div>
            <h3 className="font-semibold">Weekly Hours:</h3>
            <p className="text-gray-700">The number of hours worked each week, on average.</p>
          </div>
          <div>
            <h3 className="font-semibold">Equivalent Hourly Rate:</h3>
            <p className="text-gray-700">Your calculated hourly wage, derived from the entered salary and work hours.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Hourly Rates for Field Technicians</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Hourly rates for field technicians depend on factors like experience and location. Here's an estimate of typical rates:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Entry-level technicians: $15 - $25/hour</li>
            <li>Experienced technicians in specialized sectors like HVAC, telecommunications, and healthcare: $25 - $35/hour</li>
          </ul>
          <p className="text-gray-700 mt-4">Rates may vary based on region and the specific services offered.</p>
        </CardContent>
      </Card>

      <Card className="bg-primary text-primary-foreground">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Ready to take control of your payroll and grow your business?</h3>
          <Button 
            variant="secondary" 
            onClick={() => navigate("/contact")}
            className="w-full sm:w-auto"
          >
            Sign up for Field Promax today
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditionalInfo;
