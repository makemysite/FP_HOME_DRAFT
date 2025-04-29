
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import AdminLogin from "./components/admin/AdminLogin";
import AdminRoute from "./components/admin/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminHome from "./components/admin/pages/AdminHome";
import BlogHighlightsPage from "./components/admin/pages/BlogHighlightsPage";
import ContactSubmissionsPage from "./components/admin/pages/ContactSubmissionsPage";
import ProductUpdatesPage from "./components/admin/pages/ProductUpdatesPage";

// Import all page components
import Index from "./pages/Index";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import Industries from "./pages/Industries";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import FreeTools from "./pages/FreeTools";
import DuctCalculator from "./pages/tools/DuctCalculator";
import LoadCalculator from "./pages/tools/LoadCalculator";
import SalaryCalculator from "./pages/tools/SalaryCalculator";
import ProfitCalculator from "./pages/tools/ProfitCalculator";
import GrowthCalculator from "./pages/tools/GrowthCalculator";
import ROICalculator from "./pages/tools/ROICalculator";
import BreakEvenCalculator from "./pages/tools/BreakEvenCalculator";
import DiscountCalculator from "./pages/tools/DiscountCalculator";
import OvertimeCalculator from "./pages/tools/OvertimeCalculator";
import ProductUpdates from "./pages/ProductUpdates";
import ProductUpdateDetail from "./pages/ProductUpdateDetail";
import NotFound from "./pages/NotFound";

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
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/product-updates" element={<ProductUpdates />} />
              <Route path="/product-updates/:slug" element={<ProductUpdateDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/tools" element={<FreeTools />} />
              <Route path="/tools/duct-calculator" element={<DuctCalculator />} />
              <Route path="/tools/load-calculator" element={<LoadCalculator />} />
              <Route path="/tools/salary-calculator" element={<SalaryCalculator />} />
              <Route path="/tools/profit-calculator" element={<ProfitCalculator />} />
              <Route path="/tools/growth-calculator" element={<GrowthCalculator />} />
              <Route path="/tools/roi-calculator" element={<ROICalculator />} />
              <Route path="/tools/break-even-calculator" element={<BreakEvenCalculator />} />
              <Route path="/tools/discount-calculator" element={<DiscountCalculator />} />
              <Route path="/tools/overtime-calculator" element={<OvertimeCalculator />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<AdminHome />} />
                <Route path="blog-highlights" element={<BlogHighlightsPage />} />
                <Route path="contact-submissions" element={<ContactSubmissionsPage />} />
                <Route path="product-updates" element={<ProductUpdatesPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
