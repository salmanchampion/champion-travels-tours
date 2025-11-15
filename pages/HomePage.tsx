import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturedPackages from '../components/FeaturedPackages';
import Contact from '../components/Contact';
import Testimonials from '../components/Testimonials';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Services showTitle={true} />
      <FeaturedPackages showHajjFilters={false} showUmrahFilters={false} showTitle={true} />
      <WhyChooseUs />
      <Testimonials showTitle={true} />
      <Contact showTitle={true} />
    </>
  );
};

export default HomePage;