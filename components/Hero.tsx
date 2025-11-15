import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

const Hero: React.FC = () => {
  const { appData } = useContext(DataContext);
  const { hero } = appData;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (hero.images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hero.images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [hero.images]);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center text-white">
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      
      {hero.images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${src}')` }}
        ></div>
      ))}

      <div className="relative z-20 container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-wide mb-2">
          {hero.title}
        </h1>
        <p className="text-base md:text-lg font-sans text-secondary mb-6">
          {hero.licenseInfo}
        </p>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-primary mb-6">
          {hero.subtitle}
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-light-text">
          {hero.description}
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