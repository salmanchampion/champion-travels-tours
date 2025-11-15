import React from 'react';

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
  return (
    <div className="bg-[#FBF9F5]" style={{ backgroundImage: "url('https://www.toptal.com/designers/subtlepatterns/uploads/islamic-style.png')" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-gray-800">

        {/* Section 1: Expert Umrah Guides */}
        <section className="flex flex-col md:flex-row items-center gap-12 mb-24 relative">
            <img src="https://i.postimg.cc/L5K4p8xT/star-lantern.png" alt="star" className="absolute top-0 left-10 w-16 opacity-30 hidden md:block" />
            <img src="https://i.postimg.cc/L5K4p8xT/star-lantern.png" alt="star" className="absolute top-20 left-40 w-12 opacity-30 hidden md:block" />
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-bg mb-4">Expert Umrah Guides</h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Our Umrah guides ensure a meaningful & enriching journey for every pilgrim, and committed to assisting you at every step, from pre-departure preparations to on-site guidance in the holy cities of Makkah & Madinah.
            </p>
            <h3 className="text-2xl font-bold text-dark-bg mb-6">Dedicated Bangla-Speaking Muallim</h3>
            <p className="text-gray-600 mb-8">
              Satisfaction. Join us on this sacred journey, knowing that you are in the capable hands of our dedicated management board.
            </p>
            <CtaButton href="#packages">Available Umrah Packages</CtaButton>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-md p-4 bg-white rounded-2xl shadow-2xl">
                <img src="https://i.postimg.cc/k4JqRzK6/kaaba.jpg" alt="Expert Umrah Guides" className="rounded-xl object-cover w-full h-auto" />
            </div>
          </div>
        </section>

        {/* Section 2: Board of Director */}
        <section className="flex flex-col md:flex-row-reverse items-center gap-12 mb-24 relative">
            <img src="https://i.postimg.cc/L5K4p8xT/star-lantern.png" alt="star" className="absolute top-10 right-20 w-14 opacity-30 hidden md:block" />
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-bg mb-4">Board of Director</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Champion Travels & Tours in Bangladesh was established in 2005. Aiming to provide a <span className="font-semibold">comprehensive and all-in-one experience</span> for individuals undertaking the holy pilgrimage of Hajj and Umrah from any city in Bangladesh.
            </p>
            <CtaButton href="#team">All Shariah Consultants</CtaButton>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-80 h-80">
                <img src="https://i.postimg.cc/52q1C1Zg/director1.jpg" alt="Director 1" className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"/>
                <img src="https://i.postimg.cc/kXy0bHp1/director2.jpg" alt="Director 2" className="absolute bottom-0 left-0 w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"/>
                <img src="https://i.postimg.cc/8cLSgSgJ/director3.jpg" alt="Director 3" className="absolute bottom-0 right-0 w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"/>
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
            <img src="https://i.postimg.cc/d1hKk4jq/services-graphic.png" alt="Services Offered" className="max-w-md w-full" />
          </div>
        </section>

        {/* Section 4: Final CTA */}
        <section className="text-center py-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dark-bg max-w-3xl mx-auto leading-tight">
                Apply for an Umrah visa and experience the hassle-free journey to the city of Makkah and Madina
            </h2>
            <div className="mt-8">
                <CtaButton href="#contact?subject=Request for Umrah Booking Online">Request for Umrah Booking Online</CtaButton>
            </div>
        </section>
      </div>
      
      {/* Mosque Silhouette Footer */}
      <footer className="h-40 bg-center bg-repeat-x" style={{ backgroundImage: "url('https://i.postimg.cc/4NqJmFz9/mosque-silhouette.png')" }}>
      </footer>
    </div>
  );
};

export default WhyChooseUs;
