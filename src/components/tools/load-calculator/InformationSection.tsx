
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const InformationSection: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">HVAC Load Calculator</h1>
        <p className="text-xl text-gray-700 mb-2">Get Accurate HVAC Load Calculations in Seconds!</p>
        <p className="text-gray-600">Try the Free Manual J Calculator from Field Promax for fast, precise results.</p>
      </div>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Simplify HVAC Load Calculations - Fast and Accurate</h2>
        <p className="text-gray-700">
          No more guesswork when it comes to HVAC load calculations. Our cutting-edge Manual J calculator 
          is here to give you the accuracy you need, with just a click. Perfect for HVAC service business 
          owners who want to optimize comfort and boost efficiency, this tool ensures you always deliver 
          the right solution.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why HVAC load Calculator is Essential for Your Business</h2>
        <p className="text-gray-700">
          An HVAC load calculator (Manual J calculator) helps determine the exact amount of heating and 
          cooling needed for a building. It factors in key elements like building size, windows, insulation, 
          and occupancy to give you the right load calculations-without the guesswork.
        </p>
        <p className="text-gray-700">
          By using the Manual J method, you ensure that HVAC systems are properly sized, reducing energy 
          waste and optimizing comfort for clients. This helps avoid issues like uneven temperatures, 
          overworked systems, and excessive energy bills, all of which can damage your reputation and 
          hurt your business.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">How to Use our Free HVAC Load Calculator</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Fill in the fields with the necessary information (no specific order required).</li>
          <li>Click "Calculate" to instantly generate results.</li>
          <li>Need to update? Hit "Reset" to adjust your entries and recalculate.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">How to Calculate HVAC Load for Any Project</h3>
        <ol className="list-decimal pl-5 space-y-3 text-gray-700">
          <li>
            <strong>Gather Building Information:</strong>
            <p>This includes the building's location, size, insulation, window types, and occupancy details.</p>
          </li>
          <li>
            <strong>Calculate Heat Loss:</strong>
            <p>Heat Loss = U-Value × Area × Temperature Difference</p>
            <p>This looks at building materials, surface area, and temperature differences.</p>
          </li>
          <li>
            <strong>Calculate Heat Gain:</strong>
            <p>Heat Gain = Solar Heat Gain + Internal Heat Gain</p>
            <p>Solar heat gain considers sunlight entering through windows, and internal heat gain accounts 
            for heat from occupants, appliances, and lighting.</p>
          </li>
          <li>
            <strong>Summarize Loads:</strong>
            <p>Total the heat loss and heat gain for the entire building.</p>
          </li>
          <li>
            <strong>Select HVAC Equipment:</strong>
            <p>Based on these calculations, pick HVAC equipment (like air conditioners, heaters, etc.) 
            that's appropriately sized to meet the building's needs.</p>
          </li>
        </ol>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">How to Create a Quick HVAC Load Estimate Template</h3>
        <p className="text-gray-700 mb-4">
          For accurate and professional quotes, you need to estimate the HVAC load. This helps you select 
          the best equipment and set the right price for your clients. Download our ready-to-use HVAC Load 
          Estimate Template, fill in the data, and send it directly to your customer-it's that easy.
        </p>
        <Button variant="outline" className="w-full sm:w-auto">
          <Download className="mr-2" />
          Download Template
        </Button>
      </div>

      <div className="bg-gradient-to-r from-[#E98A23] to-[#F9B348] p-8 rounded-lg text-white">
        <h3 className="text-2xl font-bold mb-4">Grow Your Sales with Field Promax</h3>
        <p className="mb-4">
          Field Promax is built to help HVAC businesses grow by optimizing operations and increasing 
          efficiency. With tools for scheduling, dispatching, and job management, you can complete more 
          jobs in less time. That means more opportunities for sales and happier customers.
        </p>
        <p className="mb-6">
          Our software also gives you real-time insights into your business, so you can make smarter 
          decisions, improve processes, and deliver top-notch service. Plus, features like automated 
          customer communication and streamlined invoicing make it easy to build loyalty and grow your 
          client base.
        </p>
        <p className="font-semibold">
          Take your HVAC business to the next level with Field Promax-the key to smarter operations 
          and greater profits.
        </p>
      </div>
    </div>
  );
};

export default InformationSection;
