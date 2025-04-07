
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/features/Footer";
import { ClientOnly } from "@/lib/client-utils";

interface PageWrapperProps {
  children: React.ReactNode;
  clientContent?: React.ReactNode;
  fallback?: React.ReactNode;
  header?: React.ReactNode;
  title?: string;
  description?: string;
  hideFooter?: boolean;
}

export default function PageWrapper({
  children,
  clientContent,
  fallback,
  header,
  title,
  description,
  hideFooter = false
}: PageWrapperProps) {
  return (
    <div className="bg-white shadow-[0px_6px_44px_rgba(45,33,122,0.1)] flex flex-col overflow-hidden items-center pt-[19px]">
      <header className="self-stretch flex w-full flex-col items-center pl-[76px] max-md:max-w-full max-md:pl-5">
        {header || <Navbar />}
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && <h1 className="text-4xl font-bold text-[#170F49] mb-4">{title}</h1>}
            {description && (
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {clientContent ? (
          <ClientOnly fallback={fallback || <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>}>
            {clientContent}
          </ClientOnly>
        ) : (
          children
        )}
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
}
