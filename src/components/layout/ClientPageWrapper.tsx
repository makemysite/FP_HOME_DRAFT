
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/features/Footer";

interface PageWrapperProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  title?: string;
  description?: string;
  descriptionClassName?: string;
  hideFooter?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export default function ClientPageWrapper({
  children,
  header,
  title,
  description,
  descriptionClassName = "",
  hideFooter = false,
  metaTitle,
  metaDescription
}: PageWrapperProps) {
  return (
    <div className="bg-white shadow-[0px_6px_44px_rgba(45,33,122,0.1)] flex flex-col overflow-hidden items-center pt-[19px]">
      <Helmet>
        {metaTitle && <title>{metaTitle}</title>}
        {metaDescription && <meta name="description" content={metaDescription} />}
      </Helmet>

      <header className="self-stretch flex w-full flex-col items-center pl-[76px] max-md:max-w-full max-md:pl-5">
        {header || <Navbar />}
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        {(title || description) && (
          <div className="text-left mb-12">
            {title && <h1 className="text-4xl font-bold text-[#170F49] mb-4">{title}</h1>}
            {description && (
              <p className={`text-xl text-gray-700 max-w-3xl ${descriptionClassName}`}>
                {description}
              </p>
            )}
          </div>
        )}

        {children}
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
}
