import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturedPackages from '../components/FeaturedPackages';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedPackages showHajjFilters={true} />
      <WhyChooseUs />
      <Contact />
    </>
  );
};

export default HomePage;
