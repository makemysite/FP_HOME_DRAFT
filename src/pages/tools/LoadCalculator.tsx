
import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { BuildingInfo, HVACLoadResult } from "@/types/hvacTypes";
import BuildingInfoForm from "@/components/tools/load-calculator/BuildingInfoForm";
import ResultsDisplay from "@/components/tools/load-calculator/ResultsDisplay";
import InformationSection from "@/components/tools/load-calculator/InformationSection";
import { calculateHVACLoad } from "@/services/hvacCalculator";
import { useToast } from "@/hooks/use-toast";

const LoadCalculator = () => {
  const { toast } = useToast();
  const [results, setResults] = useState<HVACLoadResult | null>(null);
  // Initialize buildingInfo with default values
  const [buildingInfo, setBuildingInfo] = useState<BuildingInfo>({
    buildingLocation: "north",
    buildingAreaSqft: 0,
    ceilingHeightFt: 0,
    insulationType: "average",
    numberOfWindows: 0,
    windowType: "double-pane",
    numberOfExteriorDoors: 0,
    doorType: "insulated",
    numberOfOccupants: 0,
    numberOfAppliances: 0,
    lightingWattageTotal: 0,
    outsideTemperatureF: 0,
    desiredIndoorTemperatureF: 0,
  });
  
  const handleCalculate = () => {
    try {
      const calculatedResults = calculateHVACLoad(buildingInfo);
      setResults(calculatedResults);
      toast({
        title: "Calculation Complete",
        description: "HVAC load calculation results are ready to view.",
      });
    } catch (error) {
      console.error("Calculation error:", error);
      toast({
        title: "Calculation Error",
        description: "There was a problem calculating the HVAC loads. Please check your inputs.",
        variant: "destructive",
      });
    }
  };

  const handleFieldChange = (field: keyof BuildingInfo, value: any) => {
    setBuildingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <ClientPageWrapper>
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            HVAC Load Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate heating and cooling loads for your HVAC system. Get precise calculations and equipment recommendations based on your building specifications.
          </p>
        </div>

        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <Calculator className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>HVAC Load Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <BuildingInfoForm 
              buildingInfo={buildingInfo} 
              onChange={handleFieldChange} 
              onCalculate={handleCalculate} 
            />
            {results && <ResultsDisplay results={results} />}
          </CardContent>
        </Card>

        <InformationSection />

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
    </ClientPageWrapper>
  );
};

export default LoadCalculator;
