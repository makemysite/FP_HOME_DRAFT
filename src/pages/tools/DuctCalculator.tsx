import React, { useState, useEffect } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Wrench, Circle, Square, CircleCheck, CircleX } from "lucide-react";
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
    if (value === '' || !isNaN(parseFloat(value))) {
      setMaxStaticLoss(value === '' ? 0 : parseFloat(value));
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
      title="HVAC Duct Calculator"
      description="Fast, Free, and Accurate Duct Size Calculations"
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="prose max-w-none mb-8">
          <p className="text-lg text-gray-700">
            Simplify your HVAC design process with our easy-to-use HVAC Duct Calculator. Calculate the perfect duct size in seconds, improving both your project efficiency and customer satisfaction.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-4">Take the Guesswork Out of Duct Sizing</h2>
          <p className="text-gray-700">
            Are you tired of manually calculating duct sizes? Introducing the HVAC Duct Calculator - your all-in-one tool for precise ductwork design. This free, user-friendly tool requires zero technical expertise. Just input the necessary details - like room dimensions, airflow velocity, and duct shape - and get the correct duct size instantly.
          </p>
          <p className="text-gray-700">
            No more guesswork, no more time wasted. Get accurate results and streamline your HVAC projects today!
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Wrench className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Duct Size Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div>
                <Label>Air Flow Rate (CFM)</Label>
                <Input
                  type="number"
                  value={airflow || ''}
                  onChange={(e) => setAirflow(Number(e.target.value))}
                  placeholder="Enter air flow rate"
                />
              </div>
              
              <div>
                <Label>Maximum Velocity (FPM)</Label>
                <Input
                  type="number"
                  value={maxVelocity || ''}
                  onChange={(e) => setMaxVelocity(Number(e.target.value))}
                  placeholder="Enter maximum velocity"
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
                />
              </div>

              <div>
                <Label>Duct Shape</Label>
                <Select value={ductShape} onValueChange={(value: "round" | "rectangular") => setDuctShape(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="round">
                      <div className="flex items-center gap-2">
                        <Circle className="w-4 h-4" /> Round
                      </div>
                    </SelectItem>
                    <SelectItem value="rectangular">
                      <div className="flex items-center gap-2">
                        <Square className="w-4 h-4" /> Rectangular
                      </div>
                    </SelectItem>
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
                    />
                  </div>
                  <div>
                    <Label>Height (inches)</Label>
                    <Input
                      type="number"
                      value={height || ''}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      placeholder="Enter duct height"
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
                />
              </div>

              <Button 
                onClick={calculateDuct}
                className="bg-[#E98A23] hover:bg-[#d47b1e]"
              >
                Calculate
              </Button>

              {result && (
                <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-semibold">Results:</h3>
                  <div className="space-y-2">
                    <p>Airflow Rate: {airflow} CFM</p>
                    <p>Duct Area: {result.area.toFixed(2)} ft²</p>
                    <div className="flex items-center gap-2">
                      <p>Velocity: {result.actualVelocity.toFixed(2)} FPM</p>
                      {result.velocityStatus === "within" ? (
                        <CircleCheck className="text-green-500 w-5 h-5" />
                      ) : (
                        <CircleX className="text-red-500 w-5 h-5" />
                      )}
                    </div>
                    <p>Static Loss per 100ft: {result.staticLossPerHundred.toFixed(3)} inWG</p>
                    <p>Total Static Loss: {result.totalStaticLoss.toFixed(3)} inWG</p>
                    <div className="flex items-center gap-2">
                      <p>Friction Status:</p>
                      {result.frictionStatus === "within" ? (
                        <span className="text-green-500 font-medium">Within acceptable range</span>
                      ) : (
                        <span className="text-red-500 font-medium">Exceeds static loss allowance</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <BenefitsSection />
        
        <div className="my-8 space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Is an HVAC Duct Calculator?</h2>
          <p className="text-gray-600 mb-4">
            An HVAC Duct Calculator helps technicians determine the ideal size and specifications for ductwork in HVAC systems. By entering parameters like airflow, duct shape, and material, the calculator generates results that ensure optimal system performance. Proper duct sizing is crucial for energy efficiency and effective climate control in buildings.
          </p>
          <p className="text-gray-600">
            This tool simplifies complex calculations, making it easy for HVAC pros of all levels to design efficient systems that meet regulatory standards.
          </p>

          <div className="bg-gradient-to-r from-[#E98A23] to-[#F9B348] p-8 rounded-lg text-white shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Try Field Promax Free for 14 Days</h2>
              <p className="text-lg mb-6 opacity-90">
                Experience the full power of our field service management platform. 
                No credit card required. Cancel anytime.
              </p>
              <a 
                href="/booking" 
                className="inline-block bg-white text-[#E98A23] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                Book Your Free Demo
              </a>
            </div>
          </div>
        </div>

        <InstructionsSection />
        <CalculationMethodSection />

        <div className="my-8 bg-gradient-to-r from-[#E98A23] to-[#F9B348] p-8 rounded-lg text-white shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Enhance Your HVAC Design Process</h2>
            <p className="text-lg mb-0 opacity-90">
              Our Duct Calculator provides precise, easy-to-use tools for professionals and DIY enthusiasts. 
              Streamline your ductwork design with accurate, real-time calculations.
            </p>
          </div>
        </div>
      </div>
    </ClientPageWrapper>
  );
};

export default DuctCalculator;
