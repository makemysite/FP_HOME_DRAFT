import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Wrench, Circle, Square } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BenefitsSection from "@/components/tools/duct-calculator/BenefitsSection";
import InstructionsSection from "@/components/tools/duct-calculator/InstructionsSection";
import CalculationMethodSection;

interface DuctSizeResult {
  width?: number;
  height?: number;
  diameter?: number;
  pressureLoss?: number;
}

const DuctCalculator = () => {
  const { toast } = useToast();
  const [airflow, setAirflow] = useState<number>(0);
  const [maxVelocity, setMaxVelocity] = useState<number>(0);
  const [ductShape, setDuctShape] = useState<"round" | "rectangular">("round");
  const [includeFrictionLoss, setIncludeFrictionLoss] = useState<boolean>(false);
  const [ductLength, setDuctLength] = useState<number>(0);
  const [frictionLoss, setFrictionLoss] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [knownWidth, setKnownWidth] = useState<number>(0);
  const [hasKnownWidth, setHasKnownWidth] = useState<boolean>(false);
  const [result, setResult] = useState<DuctSizeResult | null>(null);

  const calculateDuctSize = () => {
    if (!airflow || !maxVelocity) {
      toast({
        title: "Missing Values",
        description: "Please enter both airflow and maximum velocity.",
        variant: "destructive",
      });
      return;
    }

    const area = airflow / maxVelocity; // ft²
    let calculatedResult: DuctSizeResult = {};

    if (ductShape === "round") {
      const diameter = Math.sqrt((4 * area) / Math.PI);
      calculatedResult.diameter = Math.round(diameter * 12 * 100) / 100; // Convert to inches
    } else {
      if (hasKnownWidth && knownWidth) {
        const height = area / knownWidth;
        calculatedResult.width = Math.round(knownWidth * 12 * 100) / 100; // Convert to inches
        calculatedResult.height = Math.round(height * 12 * 100) / 100; // Convert to inches
      } else {
        const height = Math.sqrt(area / aspectRatio);
        const width = aspectRatio * height;
        calculatedResult.width = Math.round(width * 12 * 100) / 100; // Convert to inches
        calculatedResult.height = Math.round(height * 12 * 100) / 100; // Convert to inches
      }
    }

    if (includeFrictionLoss && ductLength && frictionLoss) {
      calculatedResult.pressureLoss = Math.round((ductLength / 100) * frictionLoss * 1000) / 1000;
    }

    setResult(calculatedResult);
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
                <Label>Maximum Air Velocity (FPM)</Label>
                <Input
                  type="number"
                  value={maxVelocity || ''}
                  onChange={(e) => setMaxVelocity(Number(e.target.value))}
                  placeholder="Enter maximum velocity"
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

              {ductShape === "rectangular" && (
                <>
                  <div className="space-y-2">
                    <Label>Known Width?</Label>
                    <Select value={hasKnownWidth ? "yes" : "no"} onValueChange={(v) => setHasKnownWidth(v === "yes")}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {hasKnownWidth && (
                    <div>
                      <Label>Known Width (feet)</Label>
                      <Input
                        type="number"
                        value={knownWidth || ''}
                        onChange={(e) => setKnownWidth(Number(e.target.value))}
                        placeholder="Enter known width"
                      />
                    </div>
                  )}
                  {!hasKnownWidth && (
                    <div>
                      <Label>Aspect Ratio (Width:Height)</Label>
                      <Input
                        type="number"
                        value={aspectRatio || ''}
                        onChange={(e) => setAspectRatio(Number(e.target.value))}
                        placeholder="Enter ratio (e.g., 2 for 2:1 width:height)"
                      />
                    </div>
                  )}
                </>
              )}

              <div className="space-y-2">
                <Label>Include Friction Loss?</Label>
                <Select 
                  value={includeFrictionLoss ? "yes" : "no"} 
                  onValueChange={(v) => setIncludeFrictionLoss(v === "yes")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {includeFrictionLoss && (
                <>
                  <div>
                    <Label>Duct Length (feet)</Label>
                    <Input
                      type="number"
                      value={ductLength || ''}
                      onChange={(e) => setDuctLength(Number(e.target.value))}
                      placeholder="Enter duct length"
                    />
                  </div>
                  <div>
                    <Label>Friction Loss (inches of water per 100 ft)</Label>
                    <Input
                      type="number"
                      value={frictionLoss || ''}
                      onChange={(e) => setFrictionLoss(Number(e.target.value))}
                      placeholder="Enter friction loss"
                    />
                  </div>
                </>
              )}

              <Button 
                onClick={calculateDuctSize}
                className="bg-[#E98A23] hover:bg-[#d47b1e]"
              >
                Calculate
              </Button>

              {result && (
                <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-semibold">Results:</h3>
                  {ductShape === "round" ? (
                    <p>Round duct diameter: {result.diameter} inches</p>
                  ) : (
                    <p>Rectangular duct size: {result.width} in × {result.height} in</p>
                  )}
                  {result.pressureLoss !== undefined && (
                    <p>Total pressure loss: {result.pressureLoss} inches of water</p>
                  )}
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
