import React from 'react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex text-secondary">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < rating ? 'fill-current' : 'text-gray-600'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
    ))}
  </div>
);

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title, avatar }) => (
  <div className="bg-light-bg p-8 rounded-lg shadow-lg flex flex-col h-full">
    <div className="flex-grow mb-4">
      <svg className="w-10 h-10 text-primary mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M9.333 22.583c0 2.221-1.203 4.286-3.053 5.466-1.12 1.13-2.583.56-2.583-1.13v-5.69c0-2.827 2.278-5.105 5.105-5.105h.531c-.133 1.638-.531 3.208-.531 4.286zm16 0c0 2.221-1.203 4.286-3.053 5.466-1.12 1.13-2.583.56-2.583-1.13v-5.69c0-2.827 2.278-5.105 5.105-5.105h.531c-.133 1.638-.531 3.208-.531 4.286z"></path>
      </svg>
      <p className="text-light-text italic">"{quote}"</p>
    </div>
    <div className="flex items-center mt-auto">
      <img className="w-12 h-12 rounded-full mr-4 object-cover" src={avatar} alt={name} />
      <div>
        <div className="font-bold text-white">{name}</div>
        <div className="text-sm text-muted-text">{title}</div>
      </div>
      <div className="ml-auto">
        <StarRating rating={5} />
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: 'The service from Champion Travels was exceptional. Every detail of our Umrah trip was perfectly managed. Highly recommended!',
      name: 'Abdullah Al Mahmud',
      title: 'Umrah Pilgrim, 2023',
      avatar: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=100&auto=format&fit=crop',
    },
    {
      quote: 'My Hajj journey was a dream come true, thanks to the amazing team at Champion. They were supportive and professional throughout.',
      name: 'Fatima Begum',
      title: 'Hajj Pilgrim, 2023',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop',
    },
    {
      quote: 'From visa processing to hotel bookings, everything was seamless. Their attention to detail and customer care is top-notch.',
      name: 'Hasan Chowdhury',
      title: 'Family Tour, 2024',
      avatar: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=100&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-20 bg-light-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary">Words From Our Clients</h2>
          <p className="mt-4 text-lg text-muted-text max-w-2xl mx-auto">We are proud to have served thousands of satisfied pilgrims and travelers.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;