import React from 'react';
import WhyChooseUs from '../components/WhyChooseUs';
import PageBanner from '../components/PageBanner';

const WhyUsPage: React.FC = () => {
  return (
    <div className="pt-20">
      <PageBanner 
        title="Why Choose Us"
        subtitle="Your journey is sacred. We ensure it's seamless, comfortable, and spiritually fulfilling."
      />
      <WhyChooseUs showTitle={false} />
    </div>
  );
};

export default WhyUsPage;
