import React, { useState } from 'react';
import Modal from './Modal';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
}

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void; }> = ({ icon, title, description, onClick }) => (
  <div onClick={onClick} className="bg-light-bg p-8 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-primary/20 cursor-pointer">
    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mx-auto mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-display font-semibold mb-3 text-white">{title}</h3>
    <p className="text-muted-text">{description}</p>
  </div>
);

interface ServicesProps {
  showTitle?: boolean;
}

const Services: React.FC<ServicesProps> = ({ showTitle = true }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" /></svg>,
      title: 'Hajj Packages',
      description: 'Comprehensive Hajj packages that cater to your spiritual and comfort needs.',
      details: [
        'Guidance from experienced scholars and group leaders.',
        'Choice of 5-star, 4-star, or economy accommodations.',
        'All-inclusive meal plans with buffet-style dining.',
        'Private, air-conditioned transportation for all rituals.',
        'Pre-Hajj workshops and seminars to prepare you for the journey.',
        'Dedicated medical and support staff available 24/7.'
      ]
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a9.004 9.004 0 00-4.5 15.75" /></svg>,
      title: 'Umrah Packages',
      description: 'Flexible and affordable Umrah packages available throughout the year.',
      details: [
        'Packages available for individuals, families, and groups.',
        'Flexible durations (e.g., 7, 10, 14 days).',
        'Hotels located within walking distance of Haramain.',
        'Guided Ziyarah tours to historical Islamic sites.',
        'Assistance with Ihram and performance of rituals.',
        'Option to customize your package according to your budget.'
      ]
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
      title: 'Visa Processing',
      description: 'Hassle-free and quick visa processing services for multiple countries.',
       details: [
        'Expert consultation on visa requirements and documentation.',
        'High success rate with meticulous application review.',
        'Processing for tourist, business, student, and medical visas.',
        'Support for major destinations including Saudi Arabia, UAE, Europe, and North America.',
        'Transparent process with no hidden fees.',
        'Timely updates on your application status.'
      ]
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>,
      title: 'Air Ticketing',
      description: 'Competitive prices on domestic and international air tickets.',
       details: [
        'Access to the best fares from all major airlines.',
        'Easy booking process for both one-way and round-trip tickets.',
        'Special deals on group bookings and family travel.',
        'Assistance with seat selection, meal preferences, and baggage allowance.',
        '24/7 support for rebooking, cancellations, and flight changes.',
        'Multi-city and complex itinerary planning available.'
      ]
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
      title: 'Hotel Booking',
      description: 'Book from a wide range of hotels, from budget-friendly to luxury stays.',
       details: [
        'Extensive network of hotels worldwide.',
        'Instant confirmation and secure online payment.',
        'Exclusive deals and discounts available.',
        'Options ranging from budget hotels to luxury 5-star resorts.',
        'Detailed hotel information, including amenities and guest reviews.',
        'Ability to book airport transfers along with your hotel.'
      ]
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      title: 'Tour Packages',
      description: 'Discover the world with our curated holiday and tour packages.',
       details: [
        'Curated itineraries for popular destinations worldwide.',
        'All-inclusive packages covering flights, hotels, tours, and meals.',
        'Options for both group tours and private, customized trips.',
        'Experienced local guides to enhance your travel experience.',
        'Themed tours, such as adventure, cultural, or relaxation holidays.',
        'Visa assistance included with international tour packages.'
      ]
    },
  ];

  return (
    <>
      <section className={`${showTitle ? 'py-20' : 'pb-20'} bg-dark-bg`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {showTitle && (
              <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary">Our Services</h2>
              <p className="mt-4 text-lg text-muted-text max-w-2xl mx-auto">We offer a complete range of travel solutions with a commitment to quality and customer satisfaction.</p>
              </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} onClick={() => setSelectedService(service)} />
            ))}
          </div>
        </div>
      </section>

      {selectedService && (
        <Modal isOpen={!!selectedService} onClose={() => setSelectedService(null)}>
          <div className="flex items-start sm:items-center mb-6 flex-col sm:flex-row">
            <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white mr-4 mb-4 sm:mb-0">
              {selectedService.icon}
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold text-primary">{selectedService.title}</h2>
              <p className="text-muted-text">{selectedService.description}</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">Key Features & Benefits:</h3>
            <ul className="list-disc list-inside space-y-2 text-light-text">
              {selectedService.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
          <div className="mt-8 text-center">
            <a
              href={`#contact?subject=${encodeURIComponent(`Inquiry about ${selectedService.title}`)}`}
              onClick={() => setSelectedService(null)}
              className="bg-secondary text-dark-bg font-bold py-3 px-8 rounded-full hover:bg-amber-600 transition-all duration-300 inline-block"
            >
              Inquire Now
            </a>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Services;