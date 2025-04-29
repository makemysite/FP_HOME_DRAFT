import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import FeaturesPage from './app/features/page';
import PricingPage from './app/pricing/page';
import Industries from './app/industries/page';
import Blog from './app/blog/page';
import BlogPost from './app/blog/[slug]/page';
import Contact from './pages/Contact';
import ProductUpdates from './pages/ProductUpdates';
import ProductUpdateDetail from './pages/ProductUpdateDetail';
import FreeTools from './pages/FreeTools';
import Calculator from './pages/Calculator';
import BreakEvenCalculator from './pages/BreakEvenCalculator';
import DiscountCalculator from './pages/DiscountCalculator';
import GrowthCalculator from './pages/GrowthCalculator';
import LoadCalculator from './pages/LoadCalculator';
import OvertimeCalculator from './pages/OvertimeCalculator';
import ProfitCalculator from './pages/ProfitCalculator';
import ROICalculator from './pages/ROICalculator';
import SalaryCalculator from './pages/SalaryCalculator';
import DuctCalculator from './pages/DuctCalculator';
import Booking from './pages/Booking';
import AdminLogin from './pages/AdminLogin';
import AdminRoute from './components/admin/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminHome from './components/admin/AdminHome';
import BlogHighlightsPage from './components/admin/pages/BlogHighlightsPage';
import ContactSubmissionsPage from './components/admin/pages/ContactSubmissionsPage';
import ProductUpdatesPage from './components/admin/pages/ProductUpdatesPage';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import SeoDashboardPage from './components/admin/pages/SeoDashboardPage';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product-updates" element={<ProductUpdates />} />
          <Route path="/product-updates/:slug" element={<ProductUpdateDetail />} />
          <Route path="/free-tools" element={<FreeTools />} />
          <Route path="/free-tools/calculator" element={<Calculator />} />
          <Route path="/free-tools/break-even-calculator" element={<BreakEvenCalculator />} />
          <Route path="/free-tools/discount-calculator" element={<DiscountCalculator />} />
          <Route path="/free-tools/growth-calculator" element={<GrowthCalculator />} />
          <Route path="/free-tools/load-calculator" element={<LoadCalculator />} />
          <Route path="/free-tools/overtime-calculator" element={<OvertimeCalculator />} />
          <Route path="/free-tools/profit-calculator" element={<ProfitCalculator />} />
          <Route path="/free-tools/roi-calculator" element={<ROICalculator />} />
          <Route path="/free-tools/salary-calculator" element={<SalaryCalculator />} />
          <Route path="/free-tools/duct-calculator" element={<DuctCalculator />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="blog-highlights" element={<BlogHighlightsPage />} />
              <Route path="contact-submissions" element={<ContactSubmissionsPage />} />
              <Route path="product-updates" element={<ProductUpdatesPage />} />
              <Route path="seo-dashboard" element={<SeoDashboardPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
