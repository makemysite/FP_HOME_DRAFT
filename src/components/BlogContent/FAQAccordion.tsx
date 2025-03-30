
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface BlogFAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: BlogFAQ[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="mt-12 mb-8">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div 
            key={faq.id} 
            className="border rounded-md overflow-hidden"
          >
            <button
              className="w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => toggleFaq(faq.id)}
            >
              <span className="font-medium">{faq.question}</span>
              <span className="text-xl">
                {openFaqId === faq.id ? '−' : '+'}
              </span>
            </button>
            <div 
              className={`p-4 prose max-w-none transition-all ${
                openFaqId === faq.id 
                  ? 'max-h-screen opacity-100' 
                  : 'max-h-0 opacity-0 hidden'
              }`}
            >
              <ReactMarkdown>{faq.answer}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
