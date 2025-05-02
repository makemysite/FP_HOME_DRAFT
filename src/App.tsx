
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Features from "./pages/Features";
import Industries from "./pages/Industries";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import FreeTools from "./pages/FreeTools";
import ProductUpdates from "./pages/ProductUpdates";
import ProductUpdateDetail from "./pages/ProductUpdateDetail";
import NotFound from "./pages/NotFound";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client-wrapper";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";

// Calculator pages
import BreakEvenCalculator from "./pages/tools/BreakEvenCalculator";
import DiscountCalculator from "./pages/tools/DiscountCalculator";
import ROICalculator from "./pages/tools/ROICalculator";
import ProfitCalculator from "./pages/tools/ProfitCalculator";
import SalaryCalculator from "./pages/tools/SalaryCalculator";
import OvertimeCalculator from "./pages/tools/OvertimeCalculator";
import LoadCalculator from "./pages/tools/LoadCalculator";
import DuctCalculator from "./pages/tools/DuctCalculator";
import GrowthCalculator from "./pages/tools/GrowthCalculator";
import Calculator from "./pages/tools/Calculator";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/features" element={<Features />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-demo" element={<Booking />} />
            <Route path="/free-tools" element={<FreeTools />} />
            <Route path="/product-updates" element={<ProductUpdates />} />
            <Route path="/product-updates/:slug" element={<ProductUpdateDetail />} />
            <Route path="/tools/break-even-calculator" element={<BreakEvenCalculator />} />
            <Route path="/tools/discount-calculator" element={<DiscountCalculator />} />
            <Route path="/tools/roi-calculator" element={<ROICalculator />} />
            <Route path="/tools/profit-calculator" element={<ProfitCalculator />} />
            <Route path="/tools/salary-calculator" element={<SalaryCalculator />} />
            <Route path="/tools/overtime-calculator" element={<OvertimeCalculator />} />
            <Route path="/tools/load-calculator" element={<LoadCalculator />} />
            <Route path="/tools/duct-calculator" element={<DuctCalculator />} />
            <Route path="/tools/growth-calculator" element={<GrowthCalculator />} />
            <Route path="/tools/calculator" element={<Calculator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
