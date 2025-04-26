import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ChartBar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BenefitsSection from "@/components/tools/duct-calculator/BenefitsSection";
import InstructionsSection from "@/components/tools/duct-calculator/InstructionsSection";
import CalculationMethodSection from "@/components/tools/duct-calculator/CalculationMethodSection";

interface DuctCalculationResult {
  area: number;
  actualVelocity: number;
  velocityStatus: "within" | "exceeds";
  staticLossPerHundred: number;
  totalStaticLoss: number;
  frictionStatus: "within" | "exceeds";
}

const DuctCalculator = () => {
  const { toast } = useToast();
  const [airflow, setAirflow] = useState<number>(0);
  const [maxVelocity, setMaxVelocity] = useState<number>(0);
  const [maxStaticLoss, setMaxStaticLoss] = useState<number>(0);
  const [ductShape, setDuctShape] = useState<"round" | "rectangular">("round");
  const [ductLength, setDuctLength] = useState<number>(100);
  const [diameter, setDiameter] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [result, setResult] = useState<DuctCalculationResult | null>(null);

  const handleMaxStaticLossChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Input value:', value);
    console.log('Parsed value:', parseFloat(value));
    
    if (value === '' || !isNaN(parseFloat(value))) {
      const newValue = value === '' ? 0 : parseFloat(value);
      console.log('Setting maxStaticLoss:', newValue);
      setMaxStaticLoss(newValue);
    }
  };

  const calculateDuct = () => {
    if (!airflow || !maxVelocity || maxStaticLoss === 0) {
      toast({
        title: "Missing Required Values",
        description: "Please enter airflow, maximum velocity, and maximum static pressure loss.",
        variant: "destructive",
      });
      return;
    }

    if (ductShape === "round" && !diameter) {
      toast({
        title: "Missing Value",
        description: "Please enter duct diameter.",
        variant: "destructive",
      });
      return;
    }

    if (ductShape === "rectangular" && (!width || !height)) {
      toast({
        title: "Missing Values",
        description: "Please enter both width and height for rectangular duct.",
        variant: "destructive",
      });
      return;
    }

    const area = ductShape === "round" 
      ? (Math.PI * Math.pow(diameter / 12, 2)) / 4
      : (width / 12) * (height / 12);

    const actualVelocity = airflow / area;

    const velocityStatus = actualVelocity <= maxVelocity ? "within" : "exceeds";

    const staticLossPerHundred = Math.pow(actualVelocity / maxVelocity, 2) * maxStaticLoss;
    const totalStaticLoss = (ductLength / 100) * staticLossPerHundred;

    const frictionStatus = totalStaticLoss <= maxStaticLoss ? "within" : "exceeds";

    setResult({
      area,
      actualVelocity,
      velocityStatus,
      staticLossPerHundred,
      totalStaticLoss,
      frictionStatus
    });
  };

  return (
    <ClientPageWrapper
      metaTitle="Free HVAC Duct Calculator for Accurate Duct Size Calculations"
      metaDescription="Get precise duct size calculations quickly with our free HVAC Duct Calculator. Simplify your HVAC designs today!"
    >
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <ChartBar className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Duct Calculator Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[#E98A23] mb-4">Duct Size Calculator</h2>
              <p className="text-lg text-gray-700 mb-4">
                Get instant, accurate duct sizing calculations for your HVAC system. Our calculator helps you determine the optimal duct dimensions based on airflow requirements and system specifications.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <ChartBar className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Calculate Duct Size</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid gap-4">
              <div>
                <Label>Air Flow Rate (CFM)</Label>
                <Input
                  type="number"
                  value={airflow || ''}
                  onChange={(e) => setAirflow(Number(e.target.value))}
                  placeholder="Enter air flow rate"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Maximum Velocity (FPM)</Label>
                <Input
                  type="number"
                  value={maxVelocity || ''}
                  onChange={(e) => setMaxVelocity(Number(e.target.value))}
                  placeholder="Enter maximum velocity"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Maximum Static Pressure Loss (inches of water per 100 ft)</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={maxStaticLoss || ''}
                  onChange={handleMaxStaticLossChange}
                  placeholder="Enter maximum static pressure loss (e.g., 0.08)"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Duct Shape</Label>
                <Select value={ductShape} onValueChange={(value: "round" | "rectangular") => setDuctShape(value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="round">Round</SelectItem>
                    <SelectItem value="rectangular">Rectangular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {ductShape === "round" ? (
                <div>
                  <Label>Diameter (inches)</Label>
                  <Input
                    type="number"
                    value={diameter || ''}
                    onChange={(e) => setDiameter(Number(e.target.value))}
                    placeholder="Enter duct diameter"
                    className="mt-1"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <Label>Width (inches)</Label>
                    <Input
                      type="number"
                      value={width || ''}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      placeholder="Enter duct width"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Height (inches)</Label>
                    <Input
                      type="number"
                      value={height || ''}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      placeholder="Enter duct height"
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              <div>
                <Label>Duct Length (feet)</Label>
                <Input
                  type="number"
                  value={ductLength || ''}
                  onChange={(e) => setDuctLength(Number(e.target.value) || 100)}
                  placeholder="Enter duct length (default: 100)"
                  className="mt-1"
                />
              </div>

              <Button 
                onClick={calculateDuct}
                className="w-full md:w-auto bg-[#E98A23] hover:bg-[#E98A23]/90 mt-4"
              >
                Calculate
              </Button>

              {result && (
                <div className="mt-6 p-4 border rounded-lg bg-gray-50 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">Results:</h3>
                  <div className="grid gap-2 text-gray-700">
                    <p>Airflow Rate: {airflow} CFM</p>
                    <p>Duct Area: {result.area.toFixed(2)} ft²</p>
                    <div className="flex items-center gap-2">
                      <p>
                        Velocity: {result.actualVelocity.toFixed(2)} FPM
                        <span className={result.velocityStatus === "within" ? "text-green-500 ml-2" : "text-red-500 ml-2"}>
                          ({result.velocityStatus === "within" ? "Within range" : "Exceeds limit"})
                        </span>
                      </p>
                    </div>
                    <p>Static Loss per 100ft: {result.staticLossPerHundred.toFixed(3)} inWG</p>
                    <p>Total Static Loss: {result.totalStaticLoss.toFixed(3)} inWG</p>
                    <div className="flex items-center gap-2">
                      <p>
                        Friction Status:
                        <span className={result.frictionStatus === "within" ? "text-green-500 ml-2" : "text-red-500 ml-2"}>
                          {result.frictionStatus === "within" ? "Within acceptable range" : "Exceeds static loss allowance"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <BenefitsSection />
        <InstructionsSection />
        <CalculationMethodSection />

        <Card className="bg-gradient-to-r from-[#E98A23]/10 to-[#F9B348]/10 border-2 border-[#E98A23]/20">
          <CardHeader className="border-b border-[#E98A23]/20">
            <CardTitle className="text-[#E98A23]">Upgrade Your HVAC Planning</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Field Promax can revolutionize your HVAC business management. Get precise duct calculations and streamline your operations.
            </p>
            <Button className="w-full md:w-auto bg-[#E98A23] hover:bg-[#E98A23]/90">
              Book Your Free Demo
            </Button>
          </CardContent>
        </Card>
      </div>
    </ClientPageWrapper>
  );
};

export default DuctCalculator;
