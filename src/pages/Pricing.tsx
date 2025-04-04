
import React from "react";
import Navbar from "@/components/landing/Navbar";

const Pricing = () => {
  return (
    <div className="bg-white shadow-[0px_6px_44px_rgba(45,33,122,0.1)] flex flex-col overflow-hidden items-center pt-[19px] pb-[49px]">
      <header className="self-stretch flex w-full flex-col items-center pl-[76px] max-md:max-w-full max-md:pl-5">
        <Navbar />
      </header>

      <main className="self-stretch flex w-full flex-col items-center px-[76px] max-md:max-w-full max-md:px-5">
        <div className="w-full max-w-[1200px] mt-16 mb-10">
          <h1 className="text-4xl font-bold text-center mb-4">Pricing Plans</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Choose the perfect plan for your business needs. All plans include our core features with different usage limits.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-2">Starter</h3>
              <div className="text-3xl font-bold mb-1">$29<span className="text-lg font-normal text-gray-500">/mo</span></div>
              <p className="text-gray-500 mb-6">Perfect for small teams</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[rgba(233,138,35,1)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Up to 5 users</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[rgba(233,138,35,1)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>1GB storage</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[rgba(233,138,35,1)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Basic reporting</span>
                </li>
              </ul>
              <button className="w-full bg-[rgba(245,246,251,1)] border px-4 py-2 rounded-[56px] border-[rgba(233,138,35,1)] border-solid hover:bg-[rgba(245,246,251,0.8)] transition-colors">
                Get Started
              </button>
            </div>

            {/* Professional Plan */}
            <div className="bg-[rgba(233,138,35,0.03)] p-8 rounded-xl shadow-md border-2 border-[rgba(233,138,35,1)] relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[rgba(233,138,35,1)] text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional</h3>
              <div className="text-3xl font-bold mb-1">$79<span className="text-lg font-normal text-gray-500">/mo</span></div>
              <p className="text-gray-500 mb-6">For growing businesses</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[rgba(233,138,35,1)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Up to 20 users</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[rgba(233,138,35,1)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>10GB storage</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[rgba(233,138,35,1)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced reporting</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[rgba(233,138,35,1)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Priority support</span>
                </li>
              </ul>
              <button className="w-full bg-[rgba(233,138,35,1)] text-white px-4 py-2 rounded-[56px] hover:bg-[rgba(233,138,35,0.9)] transition-colors">
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <div className="text-3xl font-bold mb-1">$199<span className="text-lg font-normal text-gray-500">/mo</span></div>
              <p className="text-gray-500 mb-6">For large organizations</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[rgba(233,138,35,1)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited users</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[rgba(233,138,35,1)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>100GB storage</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[rgba(233,138,35,1)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Custom reporting</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[rgba(233,138,35,1)] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Dedicated support</span>
                </li>
              </ul>
              <button className="w-full bg-[rgba(245,246,251,1)] border px-4 py-2 rounded-[56px] border-[rgba(233,138,35,1)] border-solid hover:bg-[rgba(245,246,251,0.8)] transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
