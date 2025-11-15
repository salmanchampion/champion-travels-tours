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
  name: 'abdul mannan',
  role: 'Business Management',
  imageUrl: 'https://i.postimg.cc/pT3F20Y7/abdul-mannan.png',
  title: 'Chairman',
};

const distinguishedEmployees = [
  {
    name: 'MD SOFIKUL ISLAM',
    role: 'MANAGER',
    imageUrl: 'https://i.postimg.cc/q79f3M8F/md-sofikul-islam.png',
  },
  {
    name: 'MD AMIN UDDIN',
    role: 'IT EXECUTIVE',
    imageUrl: 'https://i.postimg.cc/7Z0CgVj9/md-amin-uddin.png',
  },
  {
    name: 'SOJOL AMIN SHAON',
    role: 'ACCOUNTS',
    imageUrl: 'https://i.postimg.cc/C1081bM3/sojol-amin-shaon.png',
  },
];

const talentedEmployees = [
  {
    name: 'FARDOUSI BEGUM',
    role: 'C.E.O',
    imageUrl: 'https://i.postimg.cc/PqYwFTtV/fardousi-begum.png',
  },
  ...distinguishedEmployees,
  {
    name: 'MD TAMIMUL ISLAM SUJON',
    role: 'ACCOUNTS',
    imageUrl: 'https://i.postimg.cc/L5v8vjVj/md-tamimul-islam-sujon.png',
  },
  {
    name: 'MD.NAYEMUL ISLAM',
    role: 'OFFICE ASSISTANCE',
    imageUrl: 'https://i.postimg.cc/3J9y1v1J/md-nayemul-islam.png',
  },
  {
    name: 'NURUL ALAM',
    role: 'MAKKA & MEDINA REPRESENTATIVE',
    imageUrl: 'https://i.postimg.cc/pT45rKkM/nurul-alam.png',
  },
  {
    name: 'MOHAMMAD SAYEDUL ALAM',
    role: 'BANGLADESHI MOALLEM',
    imageUrl: 'https://i.postimg.cc/J0vH5TzY/mohammad-sayedul-alam.png',
  },
  {
    name: 'MD MOSTAHASAN BILLAH',
    role: 'BANGLADESHI MOALLEM',
    imageUrl: 'https://i.postimg.cc/Xv9k2s7L/md-mostahasan-billah.png',
  },
  {
    name: 'MD ABDUL HADI',
    role: 'MAKKA MOALLEM',
    imageUrl: 'https://i.postimg.cc/8CKYJbYx/md-abdul-hadi.png',
  },
  {
    name: 'MD IDDRIS',
    role: 'MEDINA MOALLEM',
    imageUrl: 'https://i.postimg.cc/pr0Tz1gG/md-iddris.png',
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
                
                {/* Distinguished Board and Employees Preview */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-light-text">Our distinguished Board of Directors and Employee</h2>
                    <DecorativeLine />
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                    {distinguishedEmployees.map((member) => (
                        <TeamMemberCard key={member.name} {...member} />
                    ))}
                </div>
                 <div className="text-center mb-20">
                    <a href="#talented-employee" className="bg-secondary text-dark-bg font-bold py-3 px-8 rounded-full hover:bg-amber-600 transition-all duration-300 inline-block">
                        View All Members
                    </a>
                </div>

                {/* Honourable Chairman */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-light-text">Our Honourable Chairman</h2>
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