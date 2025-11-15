import React from 'react';
import Services from '../components/Services';
import PageBanner from '../components/PageBanner';

const ServicesPage: React.FC = () => {
  return (
    <div className="pt-20">
      <PageBanner 
          title="Our Services" 
          subtitle="We offer a complete range of travel solutions with a commitment to quality and customer satisfaction."
      />
      <Services showTitle={false} />
    </div>
  );
};

export default ServicesPage;
