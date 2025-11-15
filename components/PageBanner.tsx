import React from 'react';

const PageBanner: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-light-bg text-center py-16">
        <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary">{title}</h1>
            <p className="mt-4 text-lg text-muted-text max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

export default PageBanner;
