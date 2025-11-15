import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturedPackages from '../components/FeaturedPackages';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <FeaturedPackages showHajjFilters={true} />
      <Testimonials />
      <Contact />
    </>
  );
};

export default HomePage;