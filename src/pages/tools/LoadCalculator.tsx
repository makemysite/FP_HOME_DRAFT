import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer } from "lucide-react";
import { BuildingInfo, HVACLoadResult } from "@/types/hvacTypes";
import BuildingInfoForm from "@/components/tools/load-calculator/BuildingInfoForm";
import ResultsDisplay from "@/components/tools/load-calculator/ResultsDisplay";
import InformationSection from "@/components/tools/load-calculator/InformationSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { calculateHVACLoad } from "@/services/hvacCalculator";

const LoadCalculator = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<string>("input");
  
  const [buildingInfo, setBuildingInfo] = useState<BuildingInfo>({
    buildingLocation: "south",
    buildingAreaSqft: 1500,
    ceilingHeightFt: 8,
    insulationType: "average",
    numberOfWindows: 8,
    windowType: "double-pane",
    numberOfExteriorDoors: 2,
    doorType: "insulated",
    numberOfOccupants: 4,
    numberOfAppliances: 5,
    lightingWattageTotal: 500,
    outsideTemperatureF: 95,
    desiredIndoorTemperatureF: 75
  });
  
  const [results, setResults] = useState<HVACLoadResult | null>(null);
  
  const handleFieldChange = (field: keyof BuildingInfo, value: any) => {
    setBuildingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const validateInputs = () => {
    const requiredFields = Object.entries(buildingInfo).filter(
      ([_, value]) => value === 0 || value === ""
    );
    
    if (requiredFields.length > 0) {
      toast({
        title: "Missing Values",
        description: "Please fill in all required fields before calculating.",
        variant: "destructive",
      });
      return false;
    }
    
    if (buildingInfo.outsideTemperatureF === buildingInfo.desiredIndoorTemperatureF) {
      toast({
        title: "Invalid Temperatures",
        description: "Outside and inside temperatures cannot be the same.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const calculateLoads = () => {
    if (!validateInputs()) return;
    
    try {
      const calculatedResults = calculateHVACLoad(buildingInfo);
      setResults(calculatedResults);
      setActiveTab("results");
      
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
              <Thermometer className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>HVAC Load Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <BuildingInfoForm 
              buildingInfo={buildingInfo}
              onChange={handleFieldChange}
              onCalculate={calculateLoads}
            />
            {results && <ResultsDisplay results={results} />}
          </CardContent>
        </Card>

        <InformationSection />

        <div className="bg-gradient-to-r from-[#E98A23] to-[#F9B348] p-8 rounded-lg text-white shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Take your HVAC business to the next level with Field Promax
            </h2>
            <p className="text-lg mb-6 opacity-90">
              The key to smarter operations and greater profits.
            </p>
            <Button 
              onClick={() => navigate("/booking")}
              className="bg-white text-[#E98A23] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              Book Your Free Demo
            </Button>
          </div>
        </div>
      </div>
    </ClientPageWrapper>
  );
};

export default LoadCalculator;
