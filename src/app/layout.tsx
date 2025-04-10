
import React from "react";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Field Promax - Field Service Management Software",
  description: "Comprehensive field service management software for service businesses. Streamline operations, manage teams, and grow your business.",
  keywords: "field service management, FSM software, service business software, field operations",
  openGraph: {
    title: "Field Promax - Field Service Management Software",
    description: "Comprehensive field service management software for service businesses. Streamline operations, manage teams, and grow your business.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
