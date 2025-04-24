
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

// Import pages
import Index from "./pages/Index";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import Industries from "./pages/Industries";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Booking from "./pages/Booking";
import FreeTools from "./pages/FreeTools";

// Import tool pages
import DuctCalculator from "./pages/tools/DuctCalculator";
import LoadCalculator from "./pages/tools/LoadCalculator";
import SalaryCalculator from "./pages/tools/SalaryCalculator";
import ProfitCalculator from "./pages/tools/ProfitCalculator";
import GrowthCalculator from "./pages/tools/GrowthCalculator";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/tools" element={<FreeTools />} />
              <Route path="/tools/duct-calculator" element={<DuctCalculator />} />
              <Route path="/tools/load-calculator" element={<LoadCalculator />} />
              <Route path="/tools/salary-calculator" element={<SalaryCalculator />} />
              <Route path="/tools/profit-calculator" element={<ProfitCalculator />} />
              <Route path="/tools/growth-calculator" element={<GrowthCalculator />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
