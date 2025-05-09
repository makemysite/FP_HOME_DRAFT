
import React from 'react';
import ProductUpdatesManager from '../ProductUpdatesManager';

const ProductUpdatesPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Product Updates</h1>
      <p className="text-gray-600">
        Manage quarterly product updates and feature announcements
      </p>
      <ProductUpdatesManager />
    </div>
  );
};

export default ProductUpdatesPage;
