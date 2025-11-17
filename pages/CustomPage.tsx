import React from 'react';
import PageBanner from '../components/PageBanner';
import { CustomPage as CustomPageData } from '../data';

interface CustomPageProps {
  pageData: CustomPageData;
}

const CustomPage: React.FC<CustomPageProps> = ({ pageData }) => {
  return (
    <div className="pt-20">
      <PageBanner title={pageData.title} subtitle={pageData.bannerSubtitle} />
      <div className="bg-dark-bg py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-invert lg:prose-xl max-w-4xl mx-auto"
                 dangerouslySetInnerHTML={{ __html: pageData.content }}
            />
        </div>
      </div>
    </div>
  );
};

export default CustomPage;
