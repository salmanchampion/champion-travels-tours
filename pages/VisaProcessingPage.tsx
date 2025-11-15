import React from 'react';
import VisaProcessing from '../components/VisaProcessing';
import PageBanner from '../components/PageBanner';

const VisaProcessingPage: React.FC = () => {
  return (
    <div className="pt-20">
      <PageBanner 
        title="Visa Processing Services"
        subtitle="Navigating the complexities of visa applications can be daunting. Our dedicated team is here to provide you with seamless, reliable, and efficient visa processing services for various countries."
      />
      <VisaProcessing showTitle={false} />
    </div>
  );
};

export default VisaProcessingPage;
