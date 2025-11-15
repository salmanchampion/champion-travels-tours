import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

interface ContactProps {
  defaultSubject?: string;
  showTitle?: boolean;
}

const Contact: React.FC<ContactProps> = ({ defaultSubject = '', showTitle = true }) => {
  const { appData } = useContext(DataContext);
  const homeData = appData.pages.home.contact;
  const contactPageData = appData.pages.contact;
  const data = showTitle ? homeData : contactPageData.pageBanner;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: defaultSubject,
    message: '',
  });

  useEffect(() => {
    setFormData(prevData => ({ ...prevData, subject: defaultSubject }));
  }, [defaultSubject]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., send to an API
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };
  
  const addressInfo = contactPageData.contactInfo.find(info => info.label === 'Address');
  const googleMapsUrl = addressInfo ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressInfo.value)}` : '#';

  return (
    <section className={`${showTitle ? 'py-20' : 'pb-20'} bg-dark-bg`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
            <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary">{data.title}</h2>
            <p className="mt-4 text-lg text-muted-text max-w-2xl mx-auto">{data.subtitle}</p>
            </div>
        )}
        <div className="flex flex-col lg:flex-row gap-12 bg-light-bg p-4 sm:p-8 md:p-12 rounded-lg shadow-2xl">
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-display font-semibold text-white mb-6">{contactPageData.infoTitle}</h3>
            <p className="text-muted-text mb-8">{contactPageData.infoSubtitle}</p>

            <div className="mb-8">
              <div 
                className="relative h-48 sm:h-64 w-full rounded-lg shadow-md border-2 border-gray-700 bg-dark-bg flex items-center justify-center bg-cover bg-center"
                style={{backgroundImage: `url('${contactPageData.mapUrl}')`}}
              >
                  <div className="absolute inset-0 bg-black/50"></div>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>View on Google Maps</span>
                  </a>
              </div>
            </div>

            <div className="space-y-6">
              {contactPageData.contactInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" dangerouslySetInnerHTML={{ __html: info.icon }} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-white">{info.label}</h4>
                    {info.label === 'Address' ? (
                      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-muted-text hover:text-primary transition-colors break-words">
                        {info.value}
                      </a>
                    ) : info.label === 'Phone' ? (
                      <p className="text-muted-text break-words">
                        {info.value.split(/, | /).filter(Boolean).map((part, i) => 
                          part.startsWith('+') || /^\d/.test(part) ? (
                            <React.Fragment key={i}>
                              <a href={`tel:${part.replace(/[-\s]/g, '')}`} className="hover:text-primary transition-colors">{part}</a>
                              {i < info.value.split(/, | /).filter(Boolean).length - 1 ? ', ' : ''}
                            </React.Fragment>
                          ) : (
                            <span key={i}>{part} </span>
                          )
                        )}
                      </p>
                    ) : info.label === 'Email' ? (
                       <a href={`mailto:${info.value}`} className="text-muted-text hover:text-primary transition-colors break-words">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-muted-text break-words">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="text-xl font-display font-semibold text-white mb-4">{contactPageData.accreditationsTitle}</h4>
                <img src={contactPageData.accreditationsImage} alt='Accreditations from IATA, ATAB, TOAB, and more.' className="w-full h-auto rounded-lg bg-white p-2" />
            </div>

          </div>
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-display font-semibold text-white mb-6">{contactPageData.formTitle}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full bg-dark-bg border border-gray-600 rounded-md py-3 px-4 text-light-text focus:outline-none focus:ring-2 focus:ring-primary transition" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="w-full bg-dark-bg border border-gray-600 rounded-md py-3 px-4 text-light-text focus:outline-none focus:ring-2 focus:ring-primary transition" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone" className="w-full bg-dark-bg border border-gray-600 rounded-md py-3 px-4 text-light-text focus:outline-none focus:ring-2 focus:ring-primary transition" />
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required className="w-full bg-dark-bg border border-gray-600 rounded-md py-3 px-4 text-light-text focus:outline-none focus:ring-2 focus:ring-primary transition" />
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows={5} required className="w-full bg-dark-bg border border-gray-600 rounded-md py-3 px-4 text-light-text focus:outline-none focus:ring-2 focus:ring-primary transition"></textarea>
              <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105">
                {contactPageData.formButtonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;