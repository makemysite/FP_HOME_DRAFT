
"use client";

import React, { useState } from 'react';
import { industriesData } from '@/data/industries';
import IndustryCard from '@/components/industries/IndustryCard';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/features/Footer';

export default function IndustriesPage() {
  const [showAllCards, setShowAllCards] = useState(false);
  const initialCardCount = 12;
  
  // Display either the first 12 cards or all cards
  const displayedIndustries = showAllCards 
    ? industriesData 
    : industriesData.slice(0, initialCardCount);
  
  const remainingCardsCount = industriesData.length - initialCardCount;

  return (
    <div className="bg-white shadow-[0px_6px_44px_rgba(45,33,122,0.1)] flex flex-col overflow-hidden items-center pt-[19px]">
      <header className="self-stretch flex w-full flex-col items-center pl-[76px] max-md:max-w-full max-md:pl-5">
        <Navbar />
      </header>
      
      <main className="container mx-auto px-4 py-16 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#170F49] mb-4">Industry-Specific Software Solutions</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover our specialized software packages designed to streamline operations across various service industries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedIndustries.map((industry) => (
            <div key={industry.id} className="flex">
              <IndustryCard 
                title={industry.title} 
                description={industry.description}
              />
            </div>
          ))}
        </div>
        
        {remainingCardsCount > 0 && (
          <div className="flex justify-center mt-12">
            <Button 
              onClick={() => setShowAllCards(!showAllCards)}
              className="group bg-[#E98A23] hover:bg-[#d07b1f] text-white"
            >
              {showAllCards ? (
                <>
                  Show Less <ChevronUp className="ml-1 group-hover:-translate-y-1 transition-transform" />
                </>
              ) : (
                <>
                  Show {remainingCardsCount} More Industries <ChevronDown className="ml-1 group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
