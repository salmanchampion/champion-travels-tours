import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PackagesPage from './pages/PackagesPage';
import VisaProcessingPage from './pages/VisaProcessingPage';
import TeamPage from './pages/TeamPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
  const [page, setPage] = useState('');
  const [contactSubject, setContactSubject] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      const [path, queryString] = hash.split('?');
      
      setPage(path);
      window.scrollTo(0, 0); // Scroll to top on page change

      if (path === '#contact' || path === '#book-now') {
        const params = new URLSearchParams(queryString || '');
        const subject = params.get('subject') || '';
        setContactSubject(subject);
      } else {
        setContactSubject(''); // Clear subject for other pages
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Set initial page and subject on load
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    let currentPage = page;
    // Unify #book-now to #contact for rendering
    if (currentPage === '#book-now') {
      currentPage = '#contact';
    }

    switch (currentPage) {
      case '#services':
        return <ServicesPage />;
      case '#packages':
        return <PackagesPage />;
      case '#visa-processing':
        return <VisaProcessingPage />;
      case '#team':
        return <TeamPage />;
      case '#testimonials':
        return <TestimonialsPage />;
      case '#contact':
        return <ContactPage defaultSubject={contactSubject} />;
      case '#home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-dark-bg">
      <Header activePage={page} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;