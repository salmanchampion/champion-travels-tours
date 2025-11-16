import React, { useState, useEffect, useContext, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PackagesPage from './pages/PackagesPage';
import VisaProcessingPage from './pages/VisaProcessingPage';
import TeamPage from './pages/TeamPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { DataProvider, DataContext } from './contexts/DataContext';
import WhyUsPage from './pages/WhyUsPage';
import UmrahGuidePage from './pages/UmrahGuidePage';
import { SeoMetadata } from './data';


const AppContent: React.FC = () => {
  const [page, setPage] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const { isAuthenticated } = useContext(AuthContext);
  const { appData } = useContext(DataContext);
  const keySequenceRef = useRef('');
  const secretCode = '045';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        keySequenceRef.current += e.key;

        // Keep the sequence only as long as the secret code
        if (keySequenceRef.current.length > secretCode.length) {
            keySequenceRef.current = keySequenceRef.current.slice(-secretCode.length);
        }

        // Check if the sequence matches the secret code
        if (keySequenceRef.current === secretCode) {
            window.location.hash = '#login';
            keySequenceRef.current = ''; // Reset the sequence
        }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array ensures this runs only once

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

  useEffect(() => {
    const getSeoData = (): SeoMetadata | undefined => {
      const pages = appData.pages;
      switch (page) {
        case '#services': return pages.services.seo;
        case '#packages': return pages.packages.seo;
        case '#visa-processing': return pages.visaProcessing.seo;
        case '#why-us': return pages.whyChooseUs.seo;
        case '#umrah-guide-in-bangla': return pages.umrahGuide.seo;
        case '#team': return pages.team.seo;
        case '#testimonials': return pages.testimonials.seo;
        case '#contact':
        case '#book-now': return pages.contact.seo;
        case '#home':
        default:
          return pages.home.seo;
      }
    };

    const seo = getSeoData();

    if (seo) {
      document.title = seo.title;
      
      // Update or create meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', seo.description);

      // Update or create meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', seo.keywords);
    }
  }, [page, appData]);

  const renderPage = () => {
    let currentPage = page;
    // Unify #book-now to #contact for rendering
    if (currentPage === '#book-now') {
      currentPage = '#contact';
    }
    
    // Protected admin route
    if (currentPage === '#admin' && !isAuthenticated) {
      window.location.hash = '#login';
      return <LoginPage />;
    }

    switch (currentPage) {
      case '#services':
        return <ServicesPage />;
      case '#packages':
        return <PackagesPage />;
      case '#visa-processing':
        return <VisaProcessingPage />;
      case '#why-us':
        return <WhyUsPage />;
      case '#umrah-guide-in-bangla':
        return <UmrahGuidePage />;
      case '#team':
        return <TeamPage />;
      case '#testimonials':
        return <TestimonialsPage />;
      case '#contact':
        return <ContactPage defaultSubject={contactSubject} />;
      case '#login':
        return <LoginPage />;
      case '#admin':
        return <AdminPage />;
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


const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  )
}

export default App;