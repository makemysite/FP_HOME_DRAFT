
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ClientDemoForm from "./ClientDemoForm";

// This is now a Server Component by default
export default function HeroSection() {
  return (
    <section className="w-full max-w-[1243px] mx-auto mt-12 md:mt-[106px] px-4 md:px-0">
      <div className="flex flex-col-reverse md:flex-row gap-5">
        <div className="w-full md:w-[57%]">
          <div className="flex flex-col text-base">
            <h1 className="text-black text-3xl md:text-[55px] font-bold leading-tight">
              Best in Industry features for managing your field services business
            </h1>
            <p className="text-[rgba(87,84,85,1)] font-medium leading-7 mt-4 md:mt-[34px]">
              Field Promax is helping you to manage your field services
              <br className="hidden md:inline" />
              business efficiently with powerful features
            </p>
            <div className="mt-6 md:mt-[34px]">
              <ClientDemoForm />
            </div>
          </div>
        </div>
        <div className="w-full md:w-[43%] flex justify-center md:justify-end">
          <Image
            src="https://ik.imagekit.io/d1cslxmlo/features/important-information-three-men-protective-helmet-looking-laptop-with-interest-while-standing-construction-site-day%20(1)%20copy.jpg?updatedAt=1743783905301&tr=w-800,h-600,f-auto,q-75"
            className="w-full h-auto rounded-lg object-cover"
            width={800}
            height={600}
            alt="Field Service Management"
            priority={true}
            loading="eager"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0NjauBwAC0QFXmHzpFwAAAABJRU5ErkJggg=="
          />
        </div>
      </div>
    </section>
  );
}
