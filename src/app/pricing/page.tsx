
import React from "react";
import Navbar from "@/components/landing/Navbar";
import ServerPricingLayout from "@/components/pricing/ServerPricingLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Field Promax - Field Service Management Software",
  description: "Affordable pricing plans for field service businesses of all sizes. Choose the right plan to grow your business with Field Promax.",
  keywords: "field service pricing, service management cost, field operations software pricing, service business plans",
  openGraph: {
    title: "Pricing | Field Promax - Field Service Management Software",
    description: "Affordable pricing plans for field service businesses of all sizes. Choose the right plan to grow your business with Field Promax.",
    type: "website",
  },
};

export default function PricingPage() {
  return <ServerPricingLayout navbarComponent={<Navbar />} />;
}
