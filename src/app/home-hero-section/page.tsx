
import React from "react";
import Image from "next/image";
import ClientHeroForm from "./ClientHeroForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Field Promax - Field Service Management Software",
  description: "Automate & grow your field service business with Field Promax's comprehensive service management solution.",
  openGraph: {
    images: [{
      url: "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/3c01218d214b0c673f4edbe9065ee5245f6c8e85",
      width: 1200,
      height: 630,
      alt: "Field Promax Dashboard",
    }],
  },
};

// This is a Server Component by default
export default function HomeHeroSection() {
  return (
    <section className="w-full max-w-[1334px] max-md:max-w-full mt-[52px]">
      <div className="w-full flex flex-col">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-6/12 max-md:w-full max-md:ml-0">
            <div className="flex w-full flex-col items-center text-lg mt-3 max-md:max-w-full max-md:mt-[38px]">
              <div className="text-[rgba(233,138,35,1)] text-base font-bold leading-none tracking-[3.84px] uppercase mb-3">
                FIELD SERVICE SOFTWARE
              </div>
              <h1 className="text-[#170F49] text-[50px] font-bold leading-[62px] max-md:max-w-full max-md:text-[40px] max-md:leading-[55px] max-md:mr-1">
                Automate & Grow
                <br />
                Your Field Service Business
              </h1>
              <p className="text-[#26393f] text-center font-normal leading-[30px] mt-3 max-md:max-w-full max-md:mr-1">
                Gain full control over scheduling, dispatching, tracking, and
                invoicing with Field Promax. Fill in your email below and Take our{" "}
                <span className="text-[rgba(233,138,35,1)]">
                  14 Days free trial
                </span>
              </p>
              
              <ClientHeroForm />
              
              <p className="text-[#6f6c90] text-center text-base font-normal leading-none self-center mt-[27px] max-md:max-w-full">
                It's <span className="text-[rgba(233,138,35,1)]">100% free</span>{" "}
                and we don't ask for your payment method details
              </p>
            </div>
          </div>
          
          <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
            <Image
              src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/3c01218d214b0c673f4edbe9065ee5245f6c8e85"
              alt="Field Service Management Dashboard"
              className="aspect-[1.92] object-contain w-full max-md:max-w-full max-md:mt-[26px]"
              width={800}
              height={416}
              priority={true}
              loading="eager"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0NjauBwAC0QFXmHzpFwAAAABJRU5ErkJggg=="
            />
          </div>
        </div>
        
        <div className="text-[#26393F] text-center text-lg font-normal leading-loose mt-[111px] max-md:max-w-full max-md:mt-10">
          Automate Your Service Business With Our Exclusive Features
        </div>
        
        <div className="shadow-[0px_3px_14px_0px_rgba(74,58,255,0.03),0px_-2px_4px_0px_rgba(20,20,43,0.02),0px_12px_24px_0px_rgba(20,20,43,0.04)] bg-white flex w-full items-center px-6 py-4 rounded-[18px] max-md:flex-col max-md:items-start">
          <div className="text-[rgba(7,15,24,1)] text-base font-semibold text-left shrink-0 mr-10 max-md:w-full max-md:mb-4">
            Trusted by
            <br />
            Our Clients
          </div>
          <div className="flex-1 flex items-center justify-center gap-[40px] max-md:flex-col max-md:w-full">
            <Image
              src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/212570bc4db3d238ca6ee132fb873c0b0d7a1a0b"
              alt="Client Logo 1"
              className="aspect-[1.93] object-contain w-[147px] shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
              width={147}
              height={76}
            />
            <Image
              src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/c20eb160304e3e2229cde01a6d10c14a70c83e1f"
              alt="Client Logo 2"
              className="aspect-[1.93] object-contain w-[147px] shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
              width={147}
              height={76}
            />
            <Image
              src="https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/71c187e5b6feaca90e194fb2fcefdf852eee4a32"
              alt="Client Logo 3"
              className="aspect-[1.93] object-contain w-[147px] shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
              width={147}
              height={76}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
