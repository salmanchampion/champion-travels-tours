export interface NavLink {
    href: string;
    label: string;
    subLinks?: { href: string; label: string; }[];
}

export interface Service {
  icon: string; // Will be mapped to an SVG component
  title: string;
  description: string;
  details: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

export interface VisaFeature {
    icon: string;
    title: string;
    description: string;
}

export interface VisaProcessStep {
    icon: string;
    title: string;
    description: string;
}

export interface HajjPackage {
    name: string;
    price: string;
    duration: string;
    hotelMakkah: string;
    hotelMadinah: string;
    flightsUp: string;
    flightsDown: string;
    food: string;
    special: string;
    note: string;
    image: string;
}

export interface UmrahPackage {
    name: string;
    price: string;
    date: string;
    hotelMakkah: string;
    hotelMadinah: string;
    flightsUp: string;
    flightsDown: string;
    food: string;
    special: string;
    note: string;
    image: string;
    buttonText: string;
}

export interface TeamMember {
    name: string;
    role: string;
    imageUrl: string;
    title?: string;
    socials?: {
        facebook?: string;
        phone?: string;
        whatsapp?: string;
    };
}

export interface GalleryImage {
    src: string;
    alt: string;
}

export interface ContactInfo {
    icon: string;
    label: string;
    value: string;
}

// --- New Interfaces for Umrah Guide ---
export interface UmrahGuideStep {
  title: string;
  description: string;
  points: string[];
  arabicText?: string;
  arabicMeaning?: string;
}

export interface UmrahGuideDoDontItem {
  title: string;
  items: string[];
}

export interface UmrahGuideFaqItem {
  question: string;
  answer: string;
}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string;
}

export interface UmrahGuideData {
  seo: SeoMetadata;
  pageBanner: {
    title: string;
    subtitle: string;
  };
  stepsTitle: string;
  stepsIntro: string;
  steps: UmrahGuideStep[];
  dosAndDonts: {
    title: string;
    intro: string;
    dos: UmrahGuideDoDontItem;
    donts: UmrahGuideDoDontItem;
    images: string[];
    note: string;
  };
  faq: {
    title: string;
    items: UmrahGuideFaqItem[];
  };
  cta: {
    title: string;
    buttonText: string;
  };
}

export interface AppData {
    site: {
        logoUrl: string;
    };
    header: {
        navLinks: NavLink[];
        bookNowButton: {
            text: string;
            href: string;
        };
    };
    footer: {
        about: {
            title: string[];
            description: string;
        };
        quickLinks: {
            title: string;
            links: { href: string; label: string; }[];
        };
        mainServices: {
            title: string;
            links: { href: string; label: string; }[];
        };
        followUs: {
            title: string;
            description: string;
        };
        copyrightText: string;
    };
    hajjPackages: HajjPackage[];
    umrahPackages: UmrahPackage[];
    pages: {
        home: {
            seo: SeoMetadata;
            hero: {
                title: string;
                licenseInfo: string;
                subtitle: string;
                description: string;
                images: string[];
                buttonText: string;
            },
            services: {
                title: string;
                subtitle: string;
            };
            packages: {
                title: string;
                subtitle: string;
            };
            contact: {
                title: string;
                subtitle: string;
            }
        };
        services: {
            seo: SeoMetadata;
            pageBanner: { title: string; subtitle: string; };
            list: Service[];
        };
        packages: {
            seo: SeoMetadata;
            pageBanner: { title: string; subtitle: string; };
            hajjPreRegistration: {
                image: string;
                title: string;
                description: string;
                subDescription: string;
                inquirySubject: string;
                buttonText: string;
            },
            keyHighlights: {
                title: string;
                umrahStat: string;
                umrahStatLabel: string;
                hajjStat: string;
                hajjStatLabel: string;
            },
            umrahSection: {
                title: string;
                subtitle: string;
                buttonText: string;
            },
            gallery: {
                title: string;
                description: string;
                images: GalleryImage[];
            }
        };
        visaProcessing: {
            seo: SeoMetadata;
            pageBanner: { title: string; subtitle: string; };
            offerTitle: string;
            offerList: VisaFeature[];
            processTitle: string;
            processSteps: VisaProcessStep[];
            whyChooseUsTitle: string;
            whyChooseUsFeatures: VisaFeature[];
            form: {
                title: string;
                subtitle: string;
                buttonText: string;
            };
            googleAppsScriptUrl: string;
        };
        team: {
            seo: SeoMetadata;
            pageBanner: { title: string; subtitle: string; };
            chairmanTitle: string;
            chairman: TeamMember;
            employeesTitle: string;
            employeesSubtitle: string;
            talentedEmployees: TeamMember[];
        };
        testimonials: {
            seo: SeoMetadata;
            pageBanner: { title: string; subtitle: string; };
            list: Testimonial[];
        };
        contact: {
            seo: SeoMetadata;
            pageBanner: { title: string; subtitle: string; };
            infoTitle: string;
            infoSubtitle: string;
            formTitle: string;
            accreditationsTitle: string;
            contactInfo: ContactInfo[];
            accreditationsImage: string;
            formButtonText: string;
            mapUrl: string;
            googleAppsScriptUrl: string;
        };
        whyChooseUs: {
            seo: SeoMetadata;
            backgroundImage: string,
            guides: {
                mainImage: string;
                secondaryImage: string;
                tagline: string;
                title: string;
                description: string;
                subheading: string;
                subDescription: string;
                buttonText: string;
            },
            directors: {
                decorativeImage: string;
                mainImage: string;
                secondaryImage1: string;
                secondaryImage2: string;
                title: string;
                description: string;
                buttonText: string;
            },
            services: {
                image: string;
                title: string;
                list: string[];
                buttonText: string;
            },
            cta: {
                image: string;
                title: string;
                buttonText: string;
            },
            footerImage: string;
        },
        umrahGuide: UmrahGuideData;
    };
}


export const defaultData: AppData = {
    site: {
        logoUrl: 'https://i.postimg.cc/9QNWStMS/champion-logo-1.png',
    },
    header: {
        navLinks: [
            { href: '#home', label: 'Home' },
            { 
              label: 'Services', 
              href: '#services',
              subLinks: [
                { href: '#services', label: 'All Services' },
                { href: '#packages', label: 'Hajj & Umrah Packages' },
                { href: '#visa-processing', label: 'Visa Processing' },
              ]
            },
            { href: '#umrah-guide-in-bangla', label: 'Umrah Guide (Bangla)' },
            { href: '#why-us', label: 'Why Us' },
            { href: '#team', label: 'Our Team' },
            { href: '#testimonials', label: 'Testimonials' },
            { href: '#contact', label: 'Contact' },
        ],
        bookNowButton: {
            text: 'Book Now',
            href: '#contact?subject=General Booking Inquiry'
        }
    },
    footer: {
        about: {
            title: ['Champion', 'Travels & Tours'],
            description: 'Your trusted partner for Hajj, Umrah, and worldwide travel. We are committed to providing exceptional service and unforgettable experiences.'
        },
        quickLinks: {
            title: 'Quick Links',
            links: [
                { href: '#services', label: 'Services' },
                { href: '#packages', label: 'Packages' },
                { href: '#team', label: 'Our Team' },
                { href: '#contact', label: 'Contact' },
            ]
        },
        mainServices: {
            title: 'Main Services',
            links: [
                { href: '#packages', label: 'Hajj Packages' },
                { href: '#packages', label: 'Umrah Packages' },
                { href: '#visa-processing', label: 'Visa Processing' },
                { href: '#contact?subject=Inquiry about Air Ticketing', label: 'Air Ticketing' },
            ]
        },
        followUs: {
            title: 'Follow Us',
            description: 'Stay connected with us on social media for the latest updates and offers.'
        },
        copyrightText: 'Champion Travels & Tours. All Rights Reserved.'
    },
    hajjPackages: [
        { name: 'Economy', price: '9510000', duration: '40-45 Days', hotelMakkah: '1500-1600 Meter', hotelMadinah: 'Apx. 600 Meter', flightsUp: 'Direct - SV/Biman', flightsDown: 'Direct - SV/Biman', food: 'Breakfast, Lunch & dinner (From our catering service)', special: 'Ziyara + Guide + Date + Workshop', note: 'If you want to take a short (21 Days) package, you will have to pay an additional 35000/- to 45000/- for airfare', image: 'https://i.postimg.cc/R0N8Mv8X/as.jpg' },
        { name: 'Executive', price: '9580000', duration: '40-45 Days', hotelMakkah: '1000 Meter', hotelMadinah: '500-600 Meter', flightsUp: 'Direct - SV/Biman', flightsDown: 'Direct - SV/Biman', food: 'Breakfast, Lunch & dinner (From our catering service)', special: 'Ziyara + Guide + Date + Workshop', note: 'If you want to take a short (21 Days) package, you will have to pay an additional 35000/- to 45000/- for airfare', image: 'https://i.postimg.cc/jSKtdnQ4/HD-wallpaper-mecca-madina-during-evening-time-ramzan.jpg' },
        { name: 'Executive Royal', price: '9670000', duration: '40-45 Days', hotelMakkah: '700 Meter', hotelMadinah: '200 Meter', flightsUp: 'Direct - SV/Biman', flightsDown: 'Direct - SV/Biman', food: 'Breakfast, Lunch & dinner (From our catering service)', special: 'Ziyara + Guide + Date + Workshop', note: 'If you want to take a short (21 Days) package, you will have to pay an additional 35000/- to 45000/- for airfare', image: 'https://i.postimg.cc/Bb92VfRP/ag.webp' },
        { name: 'Vip Gold', price: '12900000', duration: '18-21 Days', hotelMakkah: '5 Star | 1-7 Meter', hotelMadinah: '4 Star | 1 Minute Walk', flightsUp: 'Direct - SV/Biman', flightsDown: 'Direct - SV/Biman', food: 'Breakfast, Lunch, Evening snacks & Dinner (From our catering service)', special: 'VIP, Special Train, Ziyara + Guide + Da\'e', note: 'If you want to take a short (21 Days) package, you will have to pay an additional 35000/- to 45000/- for airfare', image: 'https://i.postimg.cc/Y2z4HFFK/ah.jpg' },
    ],
    umrahPackages: [
        { name: 'Standard Umrah Package', price: '170000', date: 'Sept/Oct (14 Days)', hotelMakkah: 'MAATHER AL JAWAR/Equivalent Hotel | Distance 550-650m.', hotelMadinah: 'MARJAN GOLDEN HOTEL PISTANCE - 100-200 MITRE', flightsUp: 'Direct - SV/BG/BS', flightsDown: 'Direct - SV/BG/BS', food: 'Excluded', special: 'Ziyara + Guide + Da\'e', note: 'IF FOOD INCLUDE EXTRA CHARGE 10000/- WILL BE PAY. If you want VIP train you need to pay extra 5000/-', image: 'https://i.postimg.cc/CL6k3832/ak.jpg', buttonText: 'Select Standard Package' },
        { name: 'Economy Umrah Package', price: '160000', date: 'Sept/Oct (14 Days)', hotelMakkah: 'MAATHER AL JAWAR/Equivalent Hotel | Distance 550-650m.', hotelMadinah: 'MARJAN GOLDEN HOTEL PISTANCE - 100-200 MITRE (3 Star)', flightsUp: 'Transit - Air Arabia/Gulf Air', flightsDown: 'BG/SV', food: 'Excluded', special: 'Ziyara + Guide + Da\'e', note: 'IF FOOD INCLUDE EXTRA CHARGE 10000/- WILL BE PAY. If you want bullet train you need to pay extra 5000/-', image: 'https://i.postimg.cc/VkQL0LnX/al.webp', buttonText: 'Choose Economy Package' },
        { name: 'VIP Umrah Package', price: '270000', date: 'Sept/Oct (10 Days)', hotelMakkah: 'HILTON/MAKKA TOWER/ ELAF KINDA DISTANCE - 0 MITRE (5 Star)', hotelMadinah: 'MARJAN GOLDEN DISTANCE-100-200 MITRE (3 Star)', flightsUp: 'BG/SV', flightsDown: 'BG/SV', food: 'Excluded', special: 'Ziyara + Guide + Da\'e', note: 'IF FOOD INCLUDE EXTRA CHARGE 15000/- WILL BE PAY. If you want bullet train you need to pay extra 5000/-', image: 'https://i.postimg.cc/RZ8BGSpf/aj.webp', buttonText: 'Book Super Saver Now' },
    ],
    pages: {
        home: {
            seo: {
                title: 'Champion Travels & Tours | Hajj, Umrah & Air Ticketing in Bangladesh',
                description: 'Your trusted partner for Hajj, Umrah, Visa Processing, and worldwide travel in Bangladesh. We are committed to providing exceptional service and unforgettable spiritual journeys.',
                keywords: 'Hajj package Bangladesh, Umrah package Bangladesh, Champion Travels, Air Ticket Dhaka, Visa processing Bangladesh'
            },
             hero: {
                title: 'Champion Travels & Tours',
                licenseInfo: 'Bangladesh Govt. Approved hajj License No.-1432 & Umrah License no.-515',
                subtitle: 'Hajj Umrah & Air Ticketing',
                description: 'Embark on your spiritual journey with peace of mind. We provide exceptional services to make your pilgrimage a memorable experience.',
                images: [
                    'https://i.postimg.cc/x1gn4TDd/ad.jpg',
                    'https://i.postimg.cc/jSKtdnQ4/HD-wallpaper-mecca-madina-during-evening-time-ramzan.jpg',
                    'https://i.postimg.cc/Y2z4HFFK/ah.jpg',
                ],
                buttonText: 'Explore Our Packages'
            },
            services: {
                title: 'Our Services',
                subtitle: 'We offer a complete range of travel solutions with a commitment to quality and customer satisfaction.'
            },
            packages: {
                 title: 'Our Hajj & Umrah Packages',
                 subtitle: 'Explore our diverse range of Hajj and Umrah packages. Each is thoughtfully crafted to provide a spiritually rewarding, comfortable, and seamless pilgrimage experience.'
            },
            contact: {
                title: 'Get In Touch',
                subtitle: 'Have questions or ready to book your next journey? Contact us today!'
            }
        },
        services: {
            seo: {
                title: 'Our Services | Champion Travels & Tours',
                description: 'Explore a complete range of travel solutions including Hajj, Umrah, Visa Processing, Air Ticketing, Hotel Booking, and curated Tour Packages.',
                keywords: 'Travel services, Hajj, Umrah, Visa, Air ticket, Hotel booking, Tour packages'
            },
            pageBanner: { 
                title: 'Our Services',
                subtitle: 'We offer a complete range of travel solutions with a commitment to quality and customer satisfaction.'
            },
            list: [
                {
                  icon: 'Hajj',
                  title: 'Hajj Packages',
                  description: 'Comprehensive Hajj packages that cater to your spiritual and comfort needs.',
                  details: [
                    'Guidance from experienced scholars and group leaders.',
                    'Choice of 5-star, 4-star, or economy accommodations.',
                    'All-inclusive meal plans with buffet-style dining.',
                    'Private, air-conditioned transportation for all rituals.',
                    'Pre-Hajj workshops and seminars to prepare you for the journey.',
                    'Dedicated medical and support staff available 24/7.'
                  ]
                },
                {
                  icon: 'Umrah',
                  title: 'Umrah Packages',
                  description: 'Flexible and affordable Umrah packages available throughout the year.',
                  details: [
                    'Packages available for individuals, families, and groups.',
                    'Flexible durations (e.g., 7, 10, 14 days).',
                    'Hotels located within walking distance of Haramain.',
                    'Guided Ziyarah tours to historical Islamic sites.',
                    'Assistance with Ihram and performance of rituals.',
                    'Option to customize your package according to your budget.'
                  ]
                },
                {
                  icon: 'Visa',
                  title: 'Visa Processing',
                  description: 'Hassle-free and quick visa processing services for multiple countries.',
                   details: [
                    'Expert consultation on visa requirements and documentation.',
                    'High success rate with meticulous application review.',
                    'Processing for tourist, business, student, and medical visas.',
                    'Support for major destinations including Saudi Arabia, UAE, Europe, and North America.',
                    'Transparent process with no hidden fees.',
                    'Timely updates on your application status.'
                  ]
                },
                {
                  icon: 'AirTicket',
                  title: 'Air Ticketing',
                  description: 'Competitive prices on domestic and international air tickets.',
                   details: [
                    'Access to the best fares from all major airlines.',
                    'Easy booking process for both one-way and round-trip tickets.',
                    'Special deals on group bookings and family travel.',
                    'Assistance with seat selection, meal preferences, and baggage allowance.',
                    '24/7 support for rebooking, cancellations, and flight changes.',
                    'Multi-city and complex itinerary planning available.'
                  ]
                },
                {
                  icon: 'Hotel',
                  title: 'Hotel Booking',
                  description: 'Book from a wide range of hotels, from budget-friendly to luxury stays.',
                   details: [
                    'Extensive network of hotels worldwide.',
                    'Instant confirmation and secure online payment.',
                    'Exclusive deals and discounts available.',
                    'Options ranging from budget hotels to luxury 5-star resorts.',
                    'Detailed hotel information, including amenities and guest reviews.',
                    'Ability to book airport transfers along with your hotel.'
                  ]
                },
                {
                  icon: 'Tour',
                  title: 'Tour Packages',
                  description: 'Discover the world with our curated holiday and tour packages.',
                   details: [
                    'Curated itineraries for popular destinations worldwide.',
                    'All-inclusive packages covering flights, hotels, tours, and meals.',
                    'Options for both group tours and private, customized trips.',
                    'Experienced local guides to enhance your travel experience.',
                    'Themed tours, such as adventure, cultural, or relaxation holidays.',
                    'Visa assistance included with international tour packages.'
                  ]
                },
            ]
        },
        packages: {
            seo: {
                title: 'Hajj & Umrah Packages | Champion Travels & Tours',
                description: 'Find the best Hajj and Umrah packages from Bangladesh. We offer a range of economy, executive, and VIP packages to suit your needs for a blessed journey.',
                keywords: 'Hajj packages 2026, Umrah packages 2025, Economy Hajj, VIP Umrah, Hajj pre-registration'
            },
            pageBanner: { 
                title: 'Hajj & Umrah Packages', 
                subtitle: 'Explore our diverse range of Hajj and Umrah packages. Each is thoughtfully crafted to provide a spiritually rewarding, comfortable, and seamless pilgrimage experience.'
            },
            hajjPreRegistration: {
                image: 'https://i.postimg.cc/PJS59Bqw/champion-logo-1.png',
                title: 'Hajj Pre Registration 2026-2027',
                description: 'Embark on a sacred pilgrimage with peace of mind. Pre-register for Hajj and ensure your place in this spiritually significant journey.',
                subDescription: 'Champion Travels & Tours is here to guide you through the process, offering seamless pre-registration services. Prepare for an experience of a lifetime – start your Hajj pre-registration today.',
                inquirySubject: 'Inquiry: Hajj Pre-Registration 2026-2027',
                buttonText: 'Apply For Pre-Register'
            },
            keyHighlights: {
                title: 'Key Highlights of Champion Travels and Tours',
                umrahStat: '20,000+',
                umrahStatLabel: 'Umrah Packages Provided in the Last 10 Years',
                hajjStat: '15,000+',
                hajjStatLabel: 'Hajj Pilgrims Successfully Served',
            },
            umrahSection: {
                title: 'Upcoming Umrah Packages',
                subtitle: 'Plan your Umrah and Ziyarah. Our upcoming Umrah packages will encompass a range of options, including economy and premium packages, designed to accommodate various budgets and preferences.',
                buttonText: 'View All Packages'
            },
            gallery: {
                title: 'Explore Our Gallery',
                description: 'A glimpse into the spiritual journeys and beautiful destinations we offer.',
                images: [
                    { src: 'https://i.postimg.cc/RZ8BGSpf/aj.webp', alt: 'The Prophet\'s Mosque illuminated at night' },
                    { src: 'https://i.postimg.cc/Y2z4HFFK/ah.jpg', alt: 'A close-up view of the Kaaba surrounded by pilgrims' },
                    { src: 'https://i.postimg.cc/Bb92VfRP/ag.webp', alt: 'The Kaaba during prayers with beautiful lighting' },
                    { src: 'https://i.postimg.cc/R0N8Mv8X/as.jpg', alt: 'Aerial view of the Kaaba and the Grand Mosque during the day' },
                    { src: 'https://i.postimg.cc/jSKtdnQ4/HD-wallpaper-mecca-madina-during-evening-time-ramzan.jpg', alt: 'The Grand Mosque in Mecca during a vibrant sunset' },
                    { src: 'https://i.postimg.cc/x1gn4TDd/ad.jpg', alt: 'The serene courtyard of the Prophet\'s Mosque in Medina' },
                    { src: 'https://i.postimg.cc/CL6k3832/ak.jpg', alt: 'The Makkah Royal Clock Tower overlooking the Kaaba' },
                    { src: 'https://i.postimg.cc/VkQL0LnX/al.webp', alt: 'A wide-angle view of the Grand Mosque bustling with pilgrims' },
                ],
            }
        },
        team: {
            seo: {
                title: 'Our Team | Champion Travels & Tours',
                description: 'Meet the dedicated and experienced team at Champion Travels & Tours. Our professionals are committed to making your journey seamless and memorable.',
                keywords: 'Travel agency team, Champion Travels team, travel experts Bangladesh'
            },
            pageBanner: {
                title: 'Meet Our Team',
                subtitle: 'The dedicated professionals behind our success. We are committed to providing you with the best travel experiences.'
            },
            chairmanTitle: 'Our Honourable C.E.O & Chairman',
            chairman: {
                name: 'Abdul Mannan',
                role: 'C.E.O & Chairman',
                imageUrl: 'https://i.postimg.cc/rwn0QTMc/image.png',
                title: '',
                socials: {
                    facebook: 'https://www.facebook.com',
                    phone: '+8801718425042',
                    whatsapp: '8801718425042'
                }
            },
            employeesTitle: 'Our Talented Employee',
            employeesSubtitle: 'At The Heart Of Our Commitment To Providing Exceptional Immigration Solutions Stands We Provide Experts Create Great Value For Visa Categories',
            talentedEmployees: [
                { name: 'মোঃ মুছা', role: 'Executive', imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop', socials: { facebook: '#', phone: '#', whatsapp: '#' } },
                { name: 'সাদ্দام হোসেম', role: 'Manager', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop', socials: { facebook: '#', phone: '#', whatsapp: '#' } },
                { name: 'লোকমান হোসাইন', role: 'Executive', imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=300&auto=format&fit=crop', socials: { facebook: '#', phone: '#', whatsapp: '#' } },
                { name: 'মোহাম্মদ নূরে আলম ডালিম', role: 'General Manager', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop', socials: { facebook: '#', phone: '#', whatsapp: '#' } },
                { name: 'মোঃ আলী আকবর', role: 'Accounts', imageUrl: 'https://i.postimg.cc/G3MgC8cQ/image-(2).png', socials: { facebook: '#', phone: '#', whatsapp: '#' } },
                { name: 'Salman sharif', role: 'New Joined', imageUrl: 'https://i.postimg.cc/0jmsLpT9/image-(1).png', socials: { facebook: '#', phone: '#', whatsapp: '#' } },
                { name: 'MD Kawsar Ahmed', role: 'Ticketing', imageUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300&auto=format&fit=crop', socials: { facebook: '#', phone: '#', whatsapp: '#' } },
            ]
        },
        testimonials: {
            seo: {
                title: 'Client Testimonials | Champion Travels & Tours',
                description: 'Read reviews and testimonials from our satisfied clients. See why travelers trust us for their Hajj, Umrah, and other travel needs.',
                keywords: 'Travel reviews, client testimonials, Hajj feedback, Umrah feedback'
            },
            pageBanner: {
                title: 'Words From Our Clients',
                subtitle: 'We are proud to have served thousands of satisfied pilgrims and travelers.'
            },
            list: [
                {
                  quote: 'The service from Champion Travels was exceptional. Every detail of our Umrah trip was perfectly managed. Highly recommended!',
                  name: 'Abdullah Al Mahmud',
                  title: 'Umrah Pilgrim, 2023',
                  avatar: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=100&auto=format&fit=crop',
                },
                {
                  quote: 'My Hajj journey was a dream come true, thanks to the amazing team at Champion. They were supportive and professional throughout.',
                  name: 'Fatima Begum',
                  title: 'Hajj Pilgrim, 2023',
                  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop',
                },
                {
                  quote: 'From visa processing to hotel bookings, everything was seamless. Their attention to detail and customer care is top-notch.',
                  name: 'Hasan Chowdhury',
                  title: 'Family Tour, 2024',
                  avatar: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=100&auto=format&fit=crop',
                },
            ]
        },
        visaProcessing: {
            seo: {
                title: 'Visa Processing Services | Champion Travels & Tours',
                description: 'Reliable and efficient visa processing for tourist, business, student, and medical purposes. Let our experts handle your application with a high success rate.',
                keywords: 'Visa processing Dhaka, tourist visa, business visa, student visa, medical visa'
            },
            pageBanner: { 
                title: 'Visa Processing Services',
                subtitle: 'Navigating the complexities of visa applications can be daunting. Our dedicated team is here to provide you with seamless, reliable, and efficient visa processing services for various countries.'
            },
            offerTitle: 'What We Offer',
            offerList: [
                { icon: 'Tourist', title: 'Tourist Visa', description: 'Explore new destinations with our hassle-free tourist visa services.' },
                { icon: 'Business', title: 'Business Visa', description: 'Facilitating your international business travel needs with efficient processing.' },
                { icon: 'Student', title: 'Student Visa', description: 'Helping students achieve their dreams of studying abroad.' },
                { icon: 'Medical', title: 'Medical Visa', description: 'Assisting with visa requirements for medical treatment overseas.' },
            ],
            processTitle: 'Our Simple 4-Step Process',
            processSteps: [
                { icon: 'Consultation', title: 'Consultation', description: 'We start with a detailed consultation to understand your visa needs.' },
                { icon: 'DocumentCheck', title: 'Document Check', description: 'Our experts meticulously review all your documents to ensure accuracy.' },
                { icon: 'Submission', title: 'Application Submission', description: 'We handle the entire submission process on your behalf.' },
                { icon: 'FollowUp', title: 'Follow-up & Delivery', description: 'We keep you updated and ensure timely delivery of your visa.' },
            ],
            whyChooseUsTitle: 'Why Choose Us For Visa Processing?',
            whyChooseUsFeatures: [
                { icon: 'Guidance', title: 'Expert Guidance', description: 'Our experienced team provides professional advice for a smooth process.' },
                { icon: 'Success', title: 'High Success Rate', description: 'We have a proven track record of successful visa applications.' },
                { icon: 'Time', title: 'Time-Saving', description: 'Let us handle the complexities while you focus on your travel plans.' },
                { icon: 'Transparent', title: 'Transparent Process', description: 'We maintain complete transparency with no hidden costs or surprises.' },
            ],
            form: {
                title: 'Visa Inquiry Form',
                subtitle: 'Have a specific question about your visa application? Fill out the form below, and our experts will get in touch with you.',
                buttonText: 'Submit Inquiry'
            },
            googleAppsScriptUrl: '',
        },
        contact: {
            seo: {
                title: 'Contact Us | Champion Travels & Tours',
                description: 'Get in touch with Champion Travels & Tours. Visit our office in Dhaka, call us, or send an email for your travel inquiries. We are here to help you.',
                keywords: 'Contact Champion Travels, travel agency Dhaka, travel agency address'
            },
            pageBanner: {
                title: 'Get In Touch',
                subtitle: 'Have questions or ready to book your next journey? Contact us today!'
            },
            infoTitle: 'Contact Information',
            infoSubtitle: 'Feel free to reach out to us through any of the following methods. Our team is ready to assist you.',
            formTitle: 'Send Us a Message',
            accreditationsTitle: 'Our Accreditations',
            contactInfo: [
                {
                  icon: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />',
                  label: 'Address',
                  value: 'Paltan China Town, Level #10, East Building, Room No.# E-11-07.67/1 Naya Paltan, VIP Road, Dhaka-1000',
                },
                {
                  icon: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />',
                  label: 'Phone',
                  value: '+8802226663228, +8802226663229, +8801718425042, +8801901922368, +8801901922366, +8801815071704',
                },
                {
                  icon: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />',
                  label: 'Email',
                  value: 'championtravels.Dhaka@gmail.com',
                },
            ],
            accreditationsImage: 'https://i.postimg.cc/CxskNw84/dd.png',
            formButtonText: 'Send Message',
            mapUrl: 'https://www.google.com/maps/d/thumbnail?mid=1_Eigadx_tF92wH3uh5B_z3460_M&hl=en',
            googleAppsScriptUrl: '',
        },
        whyChooseUs: {
            seo: {
                title: 'Why Choose Us | Champion Travels & Tours',
                description: 'Learn why Champion Travels & Tours is the right choice for your spiritual journey. With expert guides, a dedicated team, and comprehensive services, we ensure a memorable experience.',
                keywords: 'Why Champion Travels, best travel agency, expert Umrah guides, trusted Hajj services'
            },
            backgroundImage: "https://www.toptal.com/designers/subtlepatterns/uploads/islamic-style.png",
            guides: {
                mainImage: 'https://i.postimg.cc/FHFRwHxn/gg.jpg',
                secondaryImage: 'https://i.postimg.cc/x1gn4TDd/ad.jpg',
                tagline: 'Your Spiritual Journey',
                title: 'Expert Umrah Guides',
                description: 'Our Umrah guides ensure a meaningful & enriching journey for every pilgrim, and committed to assisting you at every step, from pre-departure preparations to on-site guidance in the holy cities of Makkah & Madinah.',
                subheading: 'Dedicated Bangla-Speaking Muallim',
                subDescription: 'Satisfaction. Join us on this sacred journey, knowing that you are in the capable hands of our dedicated management board.',
                buttonText: 'Available Umrah Packages'
            },
            directors: {
                decorativeImage: 'https://i.postimg.cc/L5K4p8xT/star-lantern.png',
                mainImage: 'https://i.postimg.cc/rwn0QTMc/image.png',
                secondaryImage1: 'https://i.postimg.cc/G3MgC8cQ/image-(2).png',
                secondaryImage2: 'https://i.postimg.cc/0jmsLpT9/image-(1).png',
                title: 'Board of Director',
                description: 'Champion Travels & Tours in Bangladesh was established in 2005. Aiming to provide a comprehensive and all-in-one experience for individuals undertaking the holy pilgrimage of Hajj and Umrah from any city in Bangladesh.',
                buttonText: 'All Shariah Consultants'
            },
            services: {
                image: 'https://i.postimg.cc/4xHMfzwH/champion-travels-tours2.png',
                title: 'Services offer by Champion Travels & Tours',
                list: [
                    'Umrah Visa Processing',
                    'Hotel Booking',
                    'Ziyarat Tours',
                    'Flights',
                    'Umrah Training'
                ],
                buttonText: 'Book Your Umrah'
            },
            cta: {
                image: 'https://i.postimg.cc/FHFRwHxn/gg.jpg',
                title: 'Apply for an Umrah visa and experience the hassle-free journey to the city of Makkah and Madina',
                buttonText: 'Request for Umrah Booking Online'
            },
            footerImage: 'https://i.postimg.cc/MHfn961Y/ds.jpg',
        },
        umrahGuide: {
            seo: {
                title: 'Umrah Guide in Bangla (ওমরাহ গাইডলাইন) | Champion Travels & Tours',
                description: 'A comprehensive step-by-step Umrah guide in Bengali. Learn about Ihram, Tawaf, Sa\'i, and the do\'s and don\'ts of Umrah for a blessed pilgrimage.',
                keywords: 'Umrah guide Bangla, how to perform Umrah, Omrah korar niyom, ওমরাহ করার নিয়ম, ইহরাম, তাওয়াফ, সাঈ'
            },
            pageBanner: {
                title: 'ওমরাহ গাইডলাইন',
                subtitle: 'আপনার ওমরাহ যাত্রাকে সহজ ও অর্থবহ করার জন্য বিস্তারিত নির্দেশিকা।'
            },
            stepsTitle: 'স্টেপ বাই স্টেপ ওমরাহ গাইডলাইন',
            stepsIntro: 'ওমরাহ পালনের মাধ্যমে মুমিনরা তাদের জীবনের গুরুত্বপূর্ণ এক অধ্যায় সম্পন্ন করেন। ওমরাহ পালন করার জন্য নির্দিষ্ট কিছু প্রক্রিয়া আছে। এখানে ধারাবাহিকভাবে সে প্রক্রিয়াগুলো উল্লেখ করা হলো:',
            steps: [
                {
                    title: '০১. ইহরাম (ফরজ)',
                    description: 'ওমরাহ পালন করার জন্য ইহরাম অপরিহার্য। ইহরামের পোশাক পরার জন্য কিছু ধাপ অনুসরণ করতে হয়:',
                    points: [
                        'পরিষ্কার-পরিচ্ছন্ন হয়ে গোসল বা অজু করা',
                        'ইহরামের নির্দিষ্ট পোশাক পরা',
                        'মিকাতের আগে বা মিকাতে ইহরামের কাপড় পরে নেওয়া',
                        'ইহরামের নিয়তে দুই রাকাত নামাজ আদায় করা',
                        'ওমরাহর নিয়ত করা'
                    ],
                    arabicText: 'লাব্বাইক! আল্লাহুম্মা লাব্বাইক, লাব্বাইকা লা শারিকা লাকা লাব্বাইক, ইন্নাল হামদা ওয়ান নি’মাতা লাকা ওয়াল মুলক, লা শারিকা লাক।',
                    arabicMeaning: 'অর্থ: আমি হাজির, হে আল্লাহ! আমি হাজির, তোমার কোন অংশীদার নেই, আমি হাজির, নিশ্চয়ই সমস্ত প্রশংসা এবং নেয়ামত তোমার এবং রাজত্ব তোমারই, তোমার কোন অংশীদার নেই।'
                },
                {
                    title: '০২. তাওয়াফ (ফরজ)',
                    description: 'ওমরাহ পালনের জন্য তাওয়াফ করা আবশ্যক। তাওয়াফ করার প্রস্তুতি হিসেবে যে কাজগুলো করতে হয়:',
                    points: [
                        'তাওয়াফের নিয়ত করা',
                        'ইহরামের চাদর সঠিকভাবে ডান কাঁধের নিচে দিয়ে বাম কাঁধের ওপর রাখা',
                        'অজু করা',
                        'কাবাঘরকে বামদিকে রেখে তাওয়াফ শুরু করা',
                        'হাজরে আসওয়াদকে চুম্বন করা, স্পর্শ করা বা ইশারা করা',
                        'সাতবার কাবা প্রদক্ষিণ করা'
                    ]
                },
                {
                    title: '০৩. সাঈ (ওয়াজিব)',
                    description: 'সাঈ করার পদ্ধতি হলো:',
                    points: [
                        'সাফা পাহাড়ে কাবা শরিফের দিকে মুখ করে দাঁড়ানো',
                        'দুই হাত তুলে দোয়া করা',
                        'মারওয়া পাহাড়ের কাছে পৌঁছালে, সাফা পাহাড়ের দিকে মুখ করে দোয়ার মতো হাত তুলে দোয়া করা',
                        'উভয় পাহাড়ের দিকে মুখ করে দোয়ার মতো হাত তুলে তাকবির বলা',
                        'এইভাবে দুই পাহাড়ের মাঝে সাতবার দৌড়ানো',
                        'সাঈ শেষে দোয়া করা'
                    ]
                },
                {
                    title: '০৪. চুল মুণ্ডন করা (ওয়াজিব)',
                    description: 'চুল মুণ্ডন করা (ওয়াজিব)। ওমরাহ পালনে এটি অবশ্যই করণীয়। পুরুষের ক্ষেত্রে রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম)-এর আদর্শ অনুসারে সম্পূর্ণ মাথা মুণ্ডন করা। তবে কেউ চাইলে চুল ছোটও করতে পারে। মহিলাদের ক্ষেত্রে চুল এক ইঞ্চি পরিমাণ কেটে ফেলা।',
                    // FIX: Added missing 'points' property to satisfy the UmrahGuideStep interface.
                    points: []
                }
            ],
            dosAndDonts: {
                title: 'ওমরাহ পালনে করণীয় ও বর্জনীয়',
                intro: 'ওমরাহ একটি গুরুত্বপূর্ণ ইবাদত। এটি পালনের সময় কিছু কাজকে গুরুত্ব দিতে হয় এবং এবং কিছু কাজ বর্জন করতে হয়। এখানে ওমরাহ পালনের করণীয় ও বর্জনীয়গুলো তুলে ধরা হলো:',
                dos: {
                    title: 'ওমরাহ পালনে করণীয়:',
                    items: [
                        'নফল তাওয়াফ বেশি করা',
                        'অধিক পরিমাণ জমজমের পানি পান করা',
                        'হাতিমে সালাত আদায় করা',
                        'মাকামে ইবরাহিমে সালাত আদায় করা',
                        'হাজরে আসওয়াদ চুম্বন খাওয়া',
                        'কাবা ঘর ধরে দোয়া করা',
                        'মুলতাযামে ধরে দোয়া করা'
                    ]
                },
                donts: {
                    title: 'ওমরাহ পালনে বর্জনীয়:',
                    items: [
                        'সহবাস করা',
                        'দাড়ি বা গোঁফ কাটা ও মুণ্ডন করা',
                        'চুল বা নখ কাটা',
                        'লোম তোলা',
                        'সুগন্ধি বা পারফিউম ব্যবহার করা',
                        'ঝগড়া করা',
                        'গালাগালি করা',
                        'পশু শিকার করা',
                        'খারাপ কথা বলা'
                    ]
                },
                images: [
                    'https://i.postimg.cc/Y2z4HFFK/ah.jpg',
                    'https://i.postimg.cc/FHFRwHxn/gg.jpg'
                ],
                note: 'নোট: ইহরাম অবস্থায় এ কাজগুলো করা যাবে না। ইহরাম থেকে মুক্ত হওয়ার পর ঝগড়া, গালাগালি ও খারাপ কথা বলা ছাড়া উপরের সব কাজ করা যাবে।'
            },
            faq: {
                title: 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী',
                items: [
                    { question: 'ওমরাহ পালনের মূল ধাপগুলো কী কী?', answer: 'ওমরাহ পালনের মূল ধাপগুলো হলো: ইহরাম বাঁধা, কাবা শরিফ তাওয়াফ করা, সাফা ও মারওয়া পাহাড়ের মাঝে সাঈ করা এবং শেষে চুল কাটা বা মুণ্ডন করা।' },
                    { question: 'ওমরাহ পালনের সময় কী কী বর্জনীয়?', answer: 'ইহরাম অবস্থায় কিছু কাজ নিষিদ্ধ, যেমন: সুগন্ধি ব্যবহার, চুল বা নখ কাটা, কোনো প্রাণী শিকার করা, ঝগড়া-বিবাদ করা এবং স্বামী-স্ত্রীর বিশেষ সম্পর্ক স্থাপন করা।' },
                    { question: 'ইহরাম অবস্থায় সুগন্ধি ব্যবহার করা নিষিদ্ধ?', answer: 'হ্যাঁ, ইহরাম অবস্থায় যেকোনো ধরনের সুগন্ধি, পারফিউম বা সেন্ট ব্যবহার করা সম্পূর্ণরূপে নিষিদ্ধ।' },
                    { question: 'মহিলারা কি একা ওমরাহ করতে পারেন?', answer: 'ইসলামিক আইন অনুযায়ী, মহিলাদের জন্য মাহরাম (স্বামী বা যার সাথে বিবাহ নিষিদ্ধ) ছাড়া হজ বা ওমরাহর জন্য সফর করা অনুমোদিত নয়। তবে বিভিন্ন দেশ ও মাজহাবের नियমে ভিন্নতা থাকতে পারে।' },
                ]
            },
            cta: {
                title: 'Apply for an Umrah visa and experience the hassle-free journey to the city of Makkah and Madina',
                buttonText: 'Request for Umrah Booking Online'
            }
        }
    }
};