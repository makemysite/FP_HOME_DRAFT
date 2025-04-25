
import React from "react";

const CalculationMethodSection = () => {
  return (
    <div className="py-8 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Calculate HVAC Duct Size?</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2 text-[#E98A23]">1. Determine Airflow Requirements</h3>
            <p className="text-gray-600">First, calculate the required airflow (CFM) for the space, considering temperature and ventilation needs.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-[#E98A23]">2. Choose a Sizing Method</h3>
            <p className="text-gray-600">Select from the velocity, equal friction, or static regain method based on your project.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-[#E98A23]">3. Calculate Duct Velocity</h3>
            <p className="text-gray-600">Use airflow and duct area to determine the required velocity for your ducts.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-[#E98A23]">4. Determine Duct Size</h3>
            <p className="text-gray-600">Find the duct size that fits your required airflow and velocity while considering space and system compatibility.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-[#E98A23]">5. Account for Friction Loss</h3>
            <p className="text-gray-600">Factor in the friction caused by airflow resistance to ensure the duct system is efficient.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-[#E98A23]">6. Check & Revise</h3>
            <p className="text-gray-600">Verify that the calculated duct size meets your system's needs and adjust if necessary.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationMethodSection;
