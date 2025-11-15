import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

// Helper component for consistent buttons
const CtaButton: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    className="inline-block bg-secondary text-dark-bg font-bold py-3 px-8 rounded-full hover:bg-amber-600 transition-all duration-300 shadow-md hover:shadow-lg"
  >
    {children}
  </a>
);

// Helper component for service list items
const ServiceListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-center space-x-3">
    <div className="flex-shrink-0">
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <span className="text-gray-600">{children}</span>
  </li>
);

const WhyChooseUs: React.FC = () => {
  const { appData } = useContext(DataContext);
  const { whyChooseUs } = appData.pages;

  return (
    <div className="bg-[#FBF9F5]" style={{ backgroundImage: `url('${whyChooseUs.backgroundImage}')` }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-gray-800">

        {/* Section 1: Expert Umrah Guides */}
        <section className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          <div className="lg:w-1/2 text-center lg:text-left">
            <span className="text-secondary font-bold uppercase tracking-wider">Your Spiritual Journey</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-bg mt-2 mb-4">Expert Umrah Guides</h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Our Umrah guides ensure a meaningful & enriching journey for every pilgrim, and committed to assisting you at every step, from pre-departure preparations to on-site guidance in the holy cities of Makkah & Madinah.
            </p>
            <h3 className="text-2xl font-bold text-dark-bg mb-6">Dedicated Bangla-Speaking Muallim</h3>
            <p className="text-gray-600 mb-8">
              Satisfaction. Join us on this sacred journey, knowing that you are in the capable hands of our dedicated management board.
            </p>
            <CtaButton href="#packages">Available Umrah Packages</CtaButton>
          </div>
          <div className="lg:w-1/2 w-full flex justify-center items-center min-h-[20rem] sm:min-h-[24rem]">
            <div className="relative w-full h-80 sm:h-96 max-w-lg">
              <img 
                src={whyChooseUs.guides.mainImage}
                alt="Pilgrims at Kaaba" 
                className="absolute top-0 left-0 w-[70%] sm:w-[80%] h-[70%] sm:h-[80%] object-cover rounded-2xl shadow-2xl z-10 transform hover:scale-105 transition-transform duration-300" 
              />
              <img 
                src={whyChooseUs.guides.secondaryImage}
                alt="Prophet's Mosque" 
                className="absolute bottom-0 right-0 w-[55%] sm:w-[60%] h-[55%] sm:h-[60%] object-cover rounded-2xl shadow-lg border-4 border-white transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full -z-10"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-lg transform rotate-12 -z-10"></div>
            </div>
          </div>
        </section>

        {/* Section 2: Board of Director */}
        <section className="flex flex-col md:flex-row-reverse items-center gap-12 mb-24 relative">
            <img src={whyChooseUs.directors.decorativeImage} alt="star" className="absolute top-10 right-20 w-14 opacity-30 hidden md:block" />
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-bg mb-4">Board of Director</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Champion Travels & Tours in Bangladesh was established in 2005. Aiming to provide a <span className="font-semibold">comprehensive and all-in-one experience</span> for individuals undertaking the holy pilgrimage of Hajj and Umrah from any city in Bangladesh.
            </p>
            <CtaButton href="#team">All Shariah Consultants</CtaButton>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                <img src={whyChooseUs.directors.mainImage} alt="C.E.O & Chairman" className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[50%] rounded-full object-cover border-4 border-white shadow-lg"/>
                <img src={whyChooseUs.directors.secondaryImage1} alt="Team Member" className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-full object-cover border-4 border-white shadow-lg"/>
                <img src={whyChooseUs.directors.secondaryImage2} alt="Team Member" className="absolute bottom-0 right-0 w-[45%] h-[45%] rounded-full object-cover border-4 border-white shadow-lg"/>
            </div>
          </div>
        </section>
        
        {/* Section 3: Services Offer */}
        <section className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-bg mb-6">Services offer by Champion Travels & Tours</h2>
            <ul className="space-y-4 mb-8 text-lg">
                <ServiceListItem>Umrah Visa Processing</ServiceListItem>
                <ServiceListItem>Hotel Booking</ServiceListItem>
                <ServiceListItem>Ziyarat Tours</ServiceListItem>
                <ServiceListItem>Flights</ServiceListItem>
                <ServiceListItem>Umrah Training</ServiceListItem>
            </ul>
            <CtaButton href="#contact?subject=Booking Inquiry: Umrah">Book Your Umrah</CtaButton>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src={whyChooseUs.services.image} alt="Services Offered" className="max-w-md w-full" />
          </div>
        </section>

        {/* Section 4: Final CTA */}
        <section className="text-center py-16">
            <div className="flex justify-center mb-8">
                <img 
                    src={whyChooseUs.cta.image}
                    alt="Pilgrims at the Kaaba" 
                    className="rounded-xl shadow-lg w-full max-w-lg object-cover"
                />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dark-bg max-w-3xl mx-auto leading-tight">
                Apply for an Umrah visa and experience the hassle-free journey to the city of Makkah and Madina
            </h2>
            <div className="mt-8">
                <CtaButton href="#contact?subject=Request for Umrah Booking Online">Request for Umrah Booking Online</CtaButton>
            </div>
        </section>
      </div>
      
      {/* Mosque Silhouette Footer */}
      <footer className="h-40 bg-center bg-repeat-x" style={{ backgroundImage: `url('${whyChooseUs.footerImage}')` }}>
      </footer>
    </div>
  );
};

export default WhyChooseUs;