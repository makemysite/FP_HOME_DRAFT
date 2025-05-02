
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Index from './pages/Index';
import FeaturesPage from './app/features/page';
import PricingPage from './app/pricing/page';
import Industries from './app/industries/page';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import ProductUpdates from './pages/ProductUpdates';
import ProductUpdateDetail from './pages/ProductUpdateDetail';
import FreeTools from './pages/FreeTools';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import AdminLogin from './components/admin/AdminLogin';
import AdminRoute from './components/admin/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminHome from './components/admin/AdminHome';
import BlogHighlightsPage from './components/admin/pages/BlogHighlightsPage';
import ContactSubmissionsPage from './components/admin/pages/ContactSubmissionsPage';
import ProductUpdatesPage from './components/admin/pages/ProductUpdatesPage';
import SeoDashboardPage from './components/admin/pages/SeoDashboardPage';
import Booking from './pages/Booking';
import { QueryClientWrapper } from '@/lib/query-client-wrapper';

// Wrapper component for Blog to provide searchParams
const BlogWithSearchParams = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageParam = searchParams.get('page');
  
  return <Blog searchParams={{ page: pageParam || undefined }} />;
};

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/blog" element={<BlogWithSearchParams />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product-updates" element={<ProductUpdates />} />
            <Route path="/product-updates/:slug" element={<ProductUpdateDetail />} />
            <Route path="/free-tools" element={<FreeTools />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route index element={<AdminHome />} />
              <Route path="blog-highlights" element={<BlogHighlightsPage />} />
              <Route path="contact-submissions" element={<ContactSubmissionsPage />} />
              <Route path="product-updates" element={<ProductUpdatesPage />} />
              <Route path="seo-dashboard" element={<SeoDashboardPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientWrapper>
    </ErrorBoundary>
  );
};

export default App;
