import React from 'react';
import FeaturedPackages from '../components/FeaturedPackages';
import PageBanner from '../components/PageBanner';

const PackagesPage: React.FC = () => {
  return (
    <div className="pt-20">
      <PageBanner 
          title="Hajj & Umrah Packages" 
          subtitle="Explore our diverse range of Hajj and Umrah packages. Each is thoughtfully crafted to provide a spiritually rewarding, comfortable, and seamless pilgrimage experience."
      />
      <FeaturedPackages showHajjFilters={true} showUmrahFilters={true} showTitle={false} />
    </div>
  );
};

export default PackagesPage;
