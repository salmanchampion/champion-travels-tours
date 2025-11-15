import React from 'react';
import PageBanner from '../components/PageBanner';
import TeamMemberCard from '../components/TeamMemberCard';

const DecorativeLine: React.FC = () => (
    <div className="flex justify-center items-center my-4">
        <div className="h-px bg-gray-600 w-16"></div>
        <img src="https://i.postimg.cc/d1qHbrGz/decorative-gold-line.png" alt="decorative element" className="h-8 mx-4" />
        <div className="h-px bg-gray-600 w-16"></div>
    </div>
);

const chairman = {
  name: 'Abdul Mannan',
  role: 'C.E.O & Chairman',
  imageUrl: 'https://i.postimg.cc/rwn0QTMc/image.png',
  title: '',
};

const talentedEmployees = [
  {
    name: 'মোঃ মুছা',
    role: 'Executive',
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'সাদ্দাম হোসেম',
    role: 'Manager',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'লোকমান হোসাইন',
    role: 'Executive',
    imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'মোহাম্মদ নূরে আলম ডালিম',
    role: 'General Manager',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'মোঃ আলী আকবর',
    role: 'Accounts',
    imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'Salman sharif',
    role: 'New Joined',
    imageUrl: 'https://i.postimg.cc/0jmsLpT9/image-(1).png',
  },
];

const TeamPage: React.FC = () => {
  return (
    <div className="pt-20 bg-dark-bg">
        <PageBanner
            title="Meet Our Team"
            subtitle="The dedicated professionals behind our success. We are committed to providing you with the best travel experiences."
        />

        <section className="py-20 bg-dark-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Honourable Chairman */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-light-text">Our Honourable C.E.O & Chairman</h2>
                    <DecorativeLine />
                </div>
                <div className="max-w-xs mx-auto mb-20">
                    <TeamMemberCard {...chairman} />
                </div>

                {/* Talented Employees */}
                <div id="talented-employee" className="text-center mb-16 scroll-mt-20">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-light-text">Our Talented Employee</h2>
                     <p className="mt-4 text-lg text-muted-text max-w-3xl mx-auto">At The Heart Of Our Commitment To Providing Exceptional Immigration Solutions Stands We Provide Experts Create Great Value For Visa Categories</p>
                    <DecorativeLine />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {talentedEmployees.map((member) => (
                        <TeamMemberCard key={member.name} {...member} />
                    ))}
                </div>
            </div>
        </section>
    </div>
  );
};

export default TeamPage;