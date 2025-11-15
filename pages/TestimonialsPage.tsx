import React from 'react';
import Testimonials from '../components/Testimonials';
import PageBanner from '../components/PageBanner';

const TestimonialsPage: React.FC = () => {
  return (
    <div className="pt-20">
      <PageBanner 
        title="Words From Our Clients"
        subtitle="We are proud to have served thousands of satisfied pilgrims and travelers."
      />
      <Testimonials showTitle={false} />
    </div>
  );
};

export default TestimonialsPage;
