import React from 'react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-light-bg p-6 rounded-lg flex items-start space-x-4">
        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white">
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="mt-1 text-muted-text">{description}</p>
        </div>
    </div>
);

const ProcessStep: React.FC<{ icon: React.ReactNode; title: string; description: string; step: number; }> = ({ icon, title, description, step }) => (
    <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary text-white text-3xl font-bold border-4 border-light-bg shadow-lg">
                {icon}
            </div>
            <div className="absolute -top-2 -right-2 flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-dark-bg font-bold text-sm">
                {step}
            </div>
        </div>
        <h3 className="text-xl font-display font-semibold text-white mb-2">{title}</h3>
        <p className="text-muted-text">{description}</p>
    </div>
);


const VisaProcessing: React.FC = () => {
    const services = [
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, title: 'Tourist Visa', description: 'Explore new destinations with our hassle-free tourist visa services.' },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, title: 'Business Visa', description: 'Facilitating your international business travel needs with efficient processing.' },
        { 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
            ), 
            title: 'Student Visa', 
            description: 'Helping students achieve their dreams of studying abroad.' 
        },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" /></svg>, title: 'Medical Visa', description: 'Assisting with visa requirements for medical treatment overseas.' },
    ];

    const processSteps = [
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>, title: 'Consultation', description: 'We start with a detailed consultation to understand your visa needs.' },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: 'Document Check', description: 'Our experts meticulously review all your documents to ensure accuracy.' },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, title: 'Application Submission', description: 'We handle the entire submission process on your behalf.' },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>, title: 'Follow-up & Delivery', description: 'We keep you updated and ensure timely delivery of your visa.' },
    ];

    const whyUsFeatures = [
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" /></svg>, title: 'Expert Guidance', description: 'Our experienced team provides professional advice for a smooth process.' },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, title: 'High Success Rate', description: 'We have a proven track record of successful visa applications.' },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: 'Time-Saving', description: 'Let us handle the complexities while you focus on your travel plans.' },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, title: 'Transparent Process', description: 'We maintain complete transparency with no hidden costs or surprises.' },
    ];

    return (
        <div className="bg-dark-bg">
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary">Visa Processing Services</h1>
                        <p className="mt-4 text-lg text-muted-text max-w-3xl mx-auto">Navigating the complexities of visa applications can be daunting. Our dedicated team is here to provide you with seamless, reliable, and efficient visa processing services for various countries.</p>
                    </div>

                    {/* What We Offer Section */}
                    <div className="mb-20">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-10">What We Offer</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {services.map(service => <FeatureCard key={service.title} {...service} />)}
                        </div>
                    </div>

                    {/* Our Process Section */}
                    <div className="mb-20">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-12">Our Simple 4-Step Process</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                            {processSteps.map((step, index) => <ProcessStep key={step.title} {...step} step={index + 1} />)}
                        </div>
                    </div>

                    {/* Why Choose Us Section */}
                    <div className="bg-light-bg rounded-lg p-8 md:p-12">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-10">Why Choose Us For Visa Processing?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {whyUsFeatures.map(feature => <FeatureCard key={feature.title} {...feature} />)}
                        </div>
                         <div className="text-center mt-12">
                            <a href="#contact" className="bg-secondary text-dark-bg font-bold py-4 px-10 rounded-full text-lg hover:bg-amber-600 transition-transform duration-300 hover:scale-105 inline-block">
                                Inquire Now
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VisaProcessing;