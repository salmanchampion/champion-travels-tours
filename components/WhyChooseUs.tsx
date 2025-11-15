import React from 'react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      title: 'Trusted & Experienced',
      description: 'With years of experience, we have earned the trust of thousands of pilgrims.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      title: 'Affordable Pricing',
      description: 'We offer competitive pricing without compromising on the quality of our services.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" /></svg>,
      title: '24/7 Customer Support',
      description: 'Our dedicated team is available around the clock to assist you with any queries.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: 'Guided Assistance',
      description: 'Experienced guides to help you perform your rituals correctly and with ease.',
    },
  ];

  return (
    <section className="py-20 bg-light-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary">Why Choose Us?</h2>
          <p className="mt-4 text-lg text-muted-text max-w-2xl mx-auto">Your journey is sacred. We ensure it's seamless, comfortable, and spiritually fulfilling.</p>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img 
              src="https://i.postimg.cc/x1gn4TDd/ad.jpg" 
              alt="Prophet's Mosque in Medina" 
              className="rounded-lg shadow-2xl w-full h-auto object-cover"
            />
          </div>
          <div className="lg:w-1/2 space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="mt-1 text-muted-text">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;