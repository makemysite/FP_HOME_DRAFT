
import React from "react";
import IndustriesPageClient from "@/components/industries/IndustriesPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries | Field Promax - Field Service Management Software",
  description: "Industry-specific field service management solutions designed for various service sectors. Find the perfect solution for your business needs.",
  keywords: "field service industries, service management solutions, industry-specific software, service business solutions",
  openGraph: {
    title: "Industries | Field Promax - Field Service Management Software",
    description: "Industry-specific field service management solutions designed for various service sectors. Find the perfect solution for your business needs.",
    type: "website",
  },
};

export default function IndustriesPage() {
  return <IndustriesPageClient />;
}
