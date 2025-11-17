import React, { useContext } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import FeaturedPackages from '../components/FeaturedPackages';
import Contact from '../components/Contact';
import Testimonials from '../components/Testimonials';
import { DataContext } from '../contexts/DataContext';
import WhyChooseChampion from '../components/WhyChooseChampion';

const HomePage: React.FC = () => {
  const { appData } = useContext(DataContext);
  const { home } = appData.pages;

  return (
    <>
      <Hero />
      {home.sections.services.enabled && <Services showTitle={true} />}
      {home.sections.packages.enabled && <FeaturedPackages showHajjFilters={false} showUmrahFilters={false} showTitle={true} />}
      {home.sections.whyChooseUs.enabled && <WhyChooseChampion />}
      {home.sections.testimonials.enabled && <Testimonials showTitle={true} />}
      {home.sections.contact.enabled && <Contact showTitle={true} />}
    </>
  );
};

export default HomePage;