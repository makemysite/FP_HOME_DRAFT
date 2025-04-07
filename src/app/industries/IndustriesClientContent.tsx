
"use client";

import React, { useState } from 'react';
import { industriesData } from '@/data/industries';
import IndustryCard from '@/components/industries/IndustryCard';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function IndustriesClientContent() {
  const [showAllCards, setShowAllCards] = useState(false);
  const initialCardCount = 12;
  
  // Display either the first 12 cards or all cards
  const displayedIndustries = showAllCards 
    ? industriesData 
    : industriesData.slice(0, initialCardCount);
  
  const remainingCardsCount = industriesData.length - initialCardCount;

  return (
    <>
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
    </>
  );
}
