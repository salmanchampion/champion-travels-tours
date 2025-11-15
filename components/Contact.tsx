import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., send to an API
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      label: 'Address',
      value: 'Paltan China Town, Level #10, East Building, Room No.# E-11-07.67/1 Naya Paltan, VIP Road, Dhaka-1000',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
      label: 'Phone',
      value: 'T&T:+8802226663228, +8802226663229, Call:+8801718425042',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      label: 'Email',
      value: 'championtravels.Dhaka@gmail.com',
    },
  ];

  return (
    <section className="py-20 bg-dark-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary">Get In Touch</h2>
          <p className="mt-4 text-lg text-muted-text max-w-2xl mx-auto">Have questions or ready to book your next journey? Contact us today!</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 bg-light-bg p-8 md:p-12 rounded-lg shadow-2xl">
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-display font-semibold text-white mb-6">Contact Information</h3>
            <p className="text-muted-text mb-8">Feel free to reach out to us through any of the following methods. Our team is ready to assist you.</p>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white">
                    {info.icon}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-white">{info.label}</h4>
                    <p className="text-muted-text">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-display font-semibold text-white mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full bg-dark-bg border border-gray-600 rounded-md py-3 px-4 text-light-text focus:outline-none focus:ring-2 focus:ring-primary transition" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="w-full bg-dark-bg border border-gray-600 rounded-md py-3 px-4 text-light-text focus:outline-none focus:ring-2 focus:ring-primary transition" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone" className="w-full bg-dark-bg border border-gray-600 rounded-md py-3 px-4 text-light-text focus:outline-none focus:ring-2 focus:ring-primary transition" />
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required className="w-full bg-dark-bg border border-gray-600 rounded-md py-3 px-4 text-light-text focus:outline-none focus:ring-2 focus:ring-primary transition" />
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows={5} required className="w-full bg-dark-bg border border-gray-600 rounded-md py-3 px-4 text-light-text focus:outline-none focus:ring-2 focus:ring-primary transition"></textarea>
              <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
