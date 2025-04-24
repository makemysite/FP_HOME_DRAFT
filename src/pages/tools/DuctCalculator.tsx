
import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Wrench, Circle, Square } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
          <CardContent className="space-y-6">
            {/* Basic Inputs */}
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
              
              {/* Duct Shape Selection */}
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

              {/* Rectangular Duct Options */}
              {ductShape === "rectangular" && (
                <>
                  <div>
                    <Label>Aspect Ratio (width:height)</Label>
                    <Input
                      type="number"
                      value={aspectRatio || ''}
                      onChange={(e) => setAspectRatio(Number(e.target.value))}
                      placeholder="Enter aspect ratio (e.g., 2 for 2:1)"
                    />
                  </div>
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
                </>
              )}

              {/* Friction Loss Options */}
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

              {/* Results Display */}
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
      </div>
    </ClientPageWrapper>
  );
};

export default DuctCalculator;
