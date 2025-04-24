
import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";

const DuctCalculator = () => {
  const [airflow, setAirflow] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(0);
  const [ductSize, setDuctSize] = useState<number | string>(0);

  const calculateDuctSize = () => {
    if (airflow && velocity) {
      // Formula: Area = Flow Rate / Velocity
      // Diameter = sqrt((4 × Area) / π)
      const area = airflow / velocity;
      const diameter = Math.sqrt((4 * area) / Math.PI);
      setDuctSize(Math.round(diameter * 100) / 100);
    }
  };

  return (
    <ClientPageWrapper
      title="HVAC Duct Calculator"
      description="Calculate the required duct size based on airflow and velocity"
    >
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Wrench className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Duct Size Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Air Flow Rate (CFM)
                </label>
                <input
                  type="number"
                  value={airflow}
                  onChange={(e) => setAirflow(Number(e.target.value))}
                  className="w-full border p-2 rounded"
                  placeholder="Enter air flow rate"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Air Velocity (FPM)
                </label>
                <input
                  type="number"
                  value={velocity}
                  onChange={(e) => setVelocity(Number(e.target.value))}
                  className="w-full border p-2 rounded"
                  placeholder="Enter air velocity"
                />
              </div>
              <Button 
                onClick={calculateDuctSize}
                className="bg-[#E98A23] hover:bg-[#d47b1e]"
              >
                Calculate
              </Button>
              <div className="text-xl font-semibold text-center p-4 border rounded">
                Required Duct Diameter: {ductSize} inches
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientPageWrapper>
  );
};

export default DuctCalculator;
