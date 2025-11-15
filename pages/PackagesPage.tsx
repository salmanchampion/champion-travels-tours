import React from 'react';
import FeaturedPackages from '../components/FeaturedPackages';

const PackagesPage: React.FC = () => {
  return (
    <div className="pt-20">
      <FeaturedPackages showHajjFilters={true} showUmrahFilters={true} />
    </div>
  );
};

export default PackagesPage;