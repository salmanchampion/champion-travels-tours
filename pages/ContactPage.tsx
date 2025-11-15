import React from 'react';
import Contact from '../components/Contact';
import PageBanner from '../components/PageBanner';

interface ContactPageProps {
  defaultSubject?: string;
}

const ContactPage: React.FC<ContactPageProps> = ({ defaultSubject }) => {
  return (
    <div className="pt-20">
      <PageBanner 
        title="Get In Touch"
        subtitle="Have questions or ready to book your next journey? Contact us today!"
      />
      <Contact defaultSubject={defaultSubject} showTitle={false} />
    </div>
  );
};

export default ContactPage;
