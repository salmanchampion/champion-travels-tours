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
import HajjGuidePage from './pages/HajjGuidePage';
import ExpertHajjGuidesPage from './pages/ExpertHajjGuidesPage';
import WhyChooseChampionPage from './pages/WhyChooseChampionPage';
import AirTicketingPage from './pages/AirTicketingPage';
import CustomPage from './pages/CustomPage';


const AppContent: React.FC = () => {
  const [page, setPage] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const { isAuthenticated, isLoading: isAuthLoading } = useContext(AuthContext);
  const { appData, isLoading: isDataLoading } = useContext(DataContext);
  const keySequenceRef = useRef('');
  const secretCode = '045';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        keySequenceRef.current += e.key;

        if (keySequenceRef.current.length > secretCode.length) {
            keySequenceRef.current = keySequenceRef.current.slice(-secretCode.length);
        }

        if (keySequenceRef.current === secretCode) {
            window.location.hash = '#login';
            keySequenceRef.current = '';
        }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      const [path, queryString] = hash.split('?');
      
      setPage(path);
      window.scrollTo(0, 0);

      if (path === '#contact' || path === '#book-now') {
        const params = new URLSearchParams(queryString || '');
        const subject = params.get('subject') || '';
        setContactSubject(subject);
      } else {
        setContactSubject('');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (isDataLoading) return; // Wait for data to be loaded

    const getSeoData = (): SeoMetadata | undefined => {
      const pages = appData.pages;
      
      // Check for custom pages first
      const customPageData = appData.customPages?.find(p => p.id === page && p.enabled);
      if (customPageData) {
        return customPageData.seo;
      }
      
      switch (page) {
        case '#services': return pages.services.seo;
        case '#packages': return pages.packages.seo;
        case '#visa-processing': return pages.visaProcessing.seo;
        case '#air-ticketing': return pages.airTicketing.seo;
        case '#why-us': return pages.whyChooseUs.seo;
        case '#expert-hajj-guides': return pages.expertHajjGuides.seo;
        case '#why-choose-us': return pages.whyChooseChampion.seo;
        case '#umrah-guide-in-bangla': return pages.umrahGuide.seo;
        case '#hajj-guide-in-bangla': return pages.hajjGuide.seo;
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
      
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', seo.description);

      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', seo.keywords);
    }
  }, [page, appData, isDataLoading]);

  const renderPage = () => {
    let currentPage = page;
    if (currentPage === '#book-now') {
      currentPage = '#contact';
    }
    
    if (currentPage === '#admin' && !isAuthenticated) {
      window.location.hash = '#login';
      return <LoginPage />;
    }

    // Check for custom pages
    const customPageData = appData.customPages?.find(p => p.id === currentPage && p.enabled);
    if (customPageData) {
        return <CustomPage pageData={customPageData} />;
    }

    switch (currentPage) {
      case '#services': return <ServicesPage />;
      case '#packages': return <PackagesPage />;
      case '#visa-processing': return <VisaProcessingPage />;
      case '#air-ticketing': return <AirTicketingPage />;
      case '#why-us': return <WhyUsPage />;
      case '#expert-hajj-guides': return <ExpertHajjGuidesPage />;
      case '#why-choose-us': return <WhyChooseChampionPage />;
      case '#umrah-guide-in-bangla': return <UmrahGuidePage />;
      case '#hajj-guide-in-bangla': return <HajjGuidePage />;
      case '#team': return <TeamPage />;
      case '#testimonials': return <TestimonialsPage />;
      case '#contact': return <ContactPage defaultSubject={contactSubject} />;
      case '#login': return <LoginPage />;
      case '#admin': return <AdminPage />;
      case '#home':
      default: return <HomePage />;
    }
  };

  if (isAuthLoading || isDataLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-bg text-white">
            <div className="flex flex-col items-center">
                <svg className="animate-spin h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="font-display text-2xl">Loading Website...</p>
            </div>
        </div>
    );
  }

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