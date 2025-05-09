
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';
import AdminLogin from './components/AdminLogin';
import AdminHome from './components/AdminHome';
import BlogHighlightsPage from './components/pages/BlogHighlightsPage';
import ContactSubmissionsPage from './components/pages/ContactSubmissionsPage';
import ProductUpdatesPage from './components/pages/ProductUpdatesPage';
import SeoDashboardPage from './components/pages/SeoDashboardPage';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="blog-highlights" element={<BlogHighlightsPage />} />
          <Route path="contact-submissions" element={<ContactSubmissionsPage />} />
          <Route path="product-updates" element={<ProductUpdatesPage />} />
          <Route path="seo-dashboard" element={<SeoDashboardPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
