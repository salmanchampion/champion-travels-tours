import React, { useState, useEffect } from 'react';

const images = [
  'https://i.postimg.cc/x1gn4TDd/ad.jpg',
  'https://i.postimg.cc/jSKtdnQ4/HD-wallpaper-mecca-madina-during-evening-time-ramzan.jpg',
  'https://i.postimg.cc/Y2z4HFFK/ah.jpg',
];

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white">
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${src}')` }}
        ></div>
      ))}

      <div className="relative z-20 container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-wide mb-4">
          Champion Travels & Tours
        </h1>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-primary mb-6">
          Hajj Umrah & Air Ticketing
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-light-text">
          Embark on your spiritual journey with peace of mind. We provide exceptional services to make your pilgrimage a memorable experience.
        </p>
        <a
          href="#packages"
          className="bg-primary text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-primary-dark transition-transform duration-300 hover:scale-105 inline-block"
        >
          Explore Our Packages
        </a>
      </div>
    </section>
  );
};

export default Hero;
