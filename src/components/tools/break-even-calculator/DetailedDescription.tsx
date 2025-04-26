
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, ChartBar, DollarSign } from "lucide-react";

const DetailedDescription = () => {
  return (
    <div className="space-y-8">
      {/* Introduction Section */}
      <section className="prose max-w-none">
        <h2 className="text-2xl font-bold mb-4">Know Exactly When Your Business Starts Making Money</h2>
        <p className="text-gray-600">
          Running a service business means juggling costs, jobs, and expectations. But do you know the exact point where your revenue finally covers all your expenses?
          That's where our Break Even Point Calculator steps in.
        </p>
        <p className="text-gray-600">
          Just enter your fixed costs, variable costs, and unit price - and we'll tell you how many jobs or sales you need to break even. No more guessing. No more waiting around.
        </p>
      </section>

      {/* Tool Description */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Know Your Break Even Point Tool</h3>
        <p className="text-gray-600 mb-4">
          Think of this Break Even Point Calculator like a financial GPS. It helps you figure out when your field service business starts covering costs - and heading toward real profit.
        </p>
        <p className="text-gray-600">
          Whether you're planning pricing, setting service goals, or trying to cut waste, this calculator shows you the exact number of jobs or units you need to stay in the green.
        </p>
      </section>

      {/* Requirements Section */}
      <section>
        <h3 className="text-xl font-semibold mb-4">What You'll Need:</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <DollarSign className="w-6 h-6 text-[#E98A23]" />
                <div>
                  <p className="font-medium">Fixed Costs</p>
                  <p className="text-sm text-gray-600">Your rent, salaries, admin tools, etc.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Calculator className="w-6 h-6 text-[#E98A23]" />
                <div>
                  <p className="font-medium">Variable Costs per Unit</p>
                  <p className="text-sm text-gray-600">Fuel, parts, hourly pay per job</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <DollarSign className="w-6 h-6 text-[#E98A23]" />
                <div>
                  <p className="font-medium">Price per Unit/Service</p>
                  <p className="text-sm text-gray-600">What you charge the customer</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Key Terms Section */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Key Terms (Straightforward & No-Nonsense)</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Fixed Costs</h4>
              <p className="text-sm text-gray-600">Stuff you pay every month no matter what - like rent, insurance, salaries.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Variable Cost Per Unit</h4>
              <p className="text-sm text-gray-600">The cost that changes based on each job - like materials or fuel.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Selling Price Per Unit</h4>
              <p className="text-sm text-gray-600">What your customer pays for each service or product.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Break-Even Point</h4>
              <p className="text-sm text-gray-600">The number of jobs or units you must complete to cover all costs.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Why a Break Even Analysis Matters</h3>
        <p className="text-gray-600 mb-4">It's not just about crunching numbers - it's about making smarter decisions:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
          <li>Can you hit your sales target?</li>
          <li>Do you need to adjust pricing?</li>
          <li>Are your current costs too high?</li>
          <li>Is this product or service even worth it?</li>
        </ul>
        <p className="text-gray-600 mt-4">
          If you're just starting out, use this analysis before launching. If you're growing, run it before offering new services.
          Our Break Even Point Calculator helps you plan smarter and avoid bad financial surprises.
        </p>
      </section>
    </div>
  );
};

export default DetailedDescription;
