import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataContext';

interface HeaderProps {
  activePage: string;
}

const Header: React.FC<HeaderProps> = ({ activePage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [isMobileServicesMenuOpen, setMobileServicesMenuOpen] = useState(false);
  
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { appData } = useContext(DataContext);
  const { header, site } = appData;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isServicesSectionActive = ['#services', '#packages', '#visa-processing'].includes(activePage);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isMenuOpen ? 'bg-light-bg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center">
             {site.logoUrl ? (
                <img src={site.logoUrl} alt="Champion Travels & Tours Logo" className="h-12 w-auto" />
              ) : (
                <span className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                    <span className="text-light-text">Champion</span>
                    <span className="text-primary"> Travels & Tours</span>
                </span>
             )}
          </a>

          <nav className="hidden md:flex items-center space-x-8">
            {header.navLinks.map((link) => (
              link.subLinks ? (
                <div 
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setServicesMenuOpen(true)}
                  onMouseLeave={() => setServicesMenuOpen(false)}
                >
                  <a
                    href={link.href}
                    className={`flex items-center hover:text-primary transition-colors duration-300 font-medium ${
                      isServicesSectionActive ? 'text-primary' : 'text-light-text'
                    }`}
                  >
                    {link.label}
                    <svg className={`w-4 h-4 ml-1 transition-transform ${isServicesMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </a>
                  {isServicesMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 w-60 bg-light-bg rounded-md shadow-lg py-2">
                      {link.subLinks.map(subLink => (
                        <a
                          key={subLink.href}
                          href={subLink.href}
                          className={`block px-4 py-2 text-sm hover:bg-dark-bg hover:text-primary ${
                            activePage === subLink.href ? 'text-primary' : 'text-light-text'
                          }`}
                        >
                          {subLink.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className={`hover:text-primary transition-colors duration-300 font-medium ${
                    activePage === link.href ? 'text-primary' : 'text-light-text'
                  }`}
                >
                  {link.label}
                </a>
              )
            ))}
            {isAuthenticated && (
              <>
                <div className="w-px h-6 bg-gray-600"></div>
                <a href="#admin" className={`hover:text-secondary transition-colors duration-300 font-medium ${activePage === '#admin' ? 'text-secondary' : 'text-light-text'}`}>
                  Admin Panel
                </a>
                <button onClick={logout} className="hover:text-secondary transition-colors duration-300 font-medium text-light-text">(Logout)</button>
              </>
            )}
          </nav>
          
          <a href={header.bookNowButton.href} className="hidden md:inline-block bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary-dark transition-transform duration-300 hover:scale-105">
            {header.bookNowButton.text}
          </a>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-light-bg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            {header.navLinks.map((link) => (
              link.subLinks ? (
                <div key={link.label} className="w-full text-center">
                  <div className="flex w-full items-center justify-center">
                    <a
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`hover:text-primary px-3 py-2 rounded-md text-base font-medium ${
                        isServicesSectionActive ? 'text-primary' : 'text-light-text'
                      }`}
                    >
                      {link.label}
                    </a>
                    <button
                      onClick={() => setMobileServicesMenuOpen(!isMobileServicesMenuOpen)}
                      className={`ml-1 p-1 ${
                        isServicesSectionActive ? 'text-primary' : 'text-light-text'
                      } hover:text-primary`}
                      aria-label="Toggle services submenu"
                    >
                      <svg className={`w-4 h-4 transition-transform ${isMobileServicesMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                  </div>
                  {isMobileServicesMenuOpen && (
                    <div className="pl-4 bg-dark-bg rounded-md">
                      {link.subLinks.map(subLink => (
                        <a
                          key={subLink.href}
                          href={subLink.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block hover:text-primary px-3 py-2 rounded-md text-base font-medium ${
                            activePage === subLink.href ? 'text-primary' : 'text-light-text'
                          }`}
                        >
                          {subLink.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`hover:text-primary block px-3 py-2 rounded-md text-base font-medium ${
                    activePage === link.href ? 'text-primary' : 'text-light-text'
                  }`}
                >
                  {link.label}
                </a>
              )
            ))}
            {isAuthenticated && (
                <>
                    <a
                    href="#admin"
                    onClick={() => setIsMenuOpen(false)}
                    className={`hover:text-secondary block px-3 py-2 rounded-md text-base font-medium ${
                        activePage === '#admin' ? 'text-secondary' : 'text-light-text'
                    }`}
                    >
                    Admin Panel
                    </a>
                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="hover:text-secondary block px-3 py-2 rounded-md text-base font-medium text-light-text">(Logout)</button>
                </>
            )}
            <a href={header.bookNowButton.href} onClick={() => setIsMenuOpen(false)} className="mt-4 bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary-dark transition-transform duration-300 hover:scale-105">
              {header.bookNowButton.text}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;