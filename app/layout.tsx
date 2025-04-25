
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientWrapper } from "@/lib/query-client-wrapper";
import { HelmetProvider } from "react-helmet-async";
import { Inter } from 'next/font/google';
import "@/styles/globals.css";
import { Metadata } from "next";

// Initialize the Inter font
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Field Promax',
    default: 'Field Promax - Field Service Management Software',
  },
  description: 'Field service management software for service businesses. Streamline operations, manage teams, and grow your business.',
  keywords: 'field service management, FSM software, service business software, field operations management, service scheduling',
  authors: [{ name: 'Field Promax Team' }],
  creator: 'Field Promax',
  publisher: 'Field Promax',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Field Promax',
    images: [
      {
        url: 'https://fieldpromax.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Field Promax - Field Service Management Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@fieldpromax',
    site: '@fieldpromax',
  },
  alternates: {
    canonical: 'https://fieldpromax.com',
  },
  verification: {
    google: 'verification_token',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientWrapper>
          <TooltipProvider>
            <HelmetProvider>
              {children}
              <Toaster />
              <Sonner />
            </HelmetProvider>
          </TooltipProvider>
        </QueryClientWrapper>
      </body>
    </html>
  );
}
