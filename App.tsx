import React, { useState, useEffect, useContext } from 'react';
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
import { DataProvider } from './contexts/DataContext';
import WhyUsPage from './pages/WhyUsPage';


const AppContent: React.FC = () => {
  const [page, setPage] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const { isAuthenticated } = useContext(AuthContext);

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