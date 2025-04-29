
import React from 'react';
import ProductUpdatesList from '../components/product-updates/ProductUpdatesList';
import PageWrapper from '../components/layout/PageWrapper';

const ProductUpdates = () => {
  return (
    <PageWrapper
      title="Product Updates"
      description="Stay up to date with the latest features, improvements, and changes to the FieldProMax platform."
    >
      <ProductUpdatesList />
    </PageWrapper>
  );
};

export default ProductUpdates;
