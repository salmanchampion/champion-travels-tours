import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PackagesPage from './pages/PackagesPage';
import VisaProcessingPage from './pages/VisaProcessingPage';
import WhyUsPage from './pages/WhyUsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  // Use window.location.hash for simple client-side routing
  const [page, setPage] = useState(window.location.hash || '#home');

  useEffect(() => {
    const handleHashChange = () => {
      setPage(window.location.hash || '#home');
      window.scrollTo(0, 0); // Scroll to top on page change
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Set initial page on load
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    switch (page) {
      case '#services':
        return <ServicesPage />;
      case '#packages':
        return <PackagesPage />;
      case '#visa-processing':
        return <VisaProcessingPage />;
      case '#why-us':
        return <WhyUsPage />;
      case '#testimonials':
        return <TestimonialsPage />;
      case '#contact':
      case '#book-now': // Both contact and book now lead to the contact page
        return <ContactPage />;
      case '#home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-dark-bg">
      <Header />
      <main>
        {renderPage()}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;