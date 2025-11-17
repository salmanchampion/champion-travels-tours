export interface NavLink {
    href: string;
    label: string;
    enabled: boolean;
    subLinks?: { href: string; label: string; enabled: boolean; }[];
}

export interface Service {
  icon: string; // Will be mapped to an SVG component
  title: string;
  description: string;
  details: string[];
  enabled: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
  enabled: boolean;
}

export interface VisaFeature {
    icon: string;
    title: string;
    description: string;
    enabled: boolean;
}

export interface VisaProcessStep {
    icon: string;
    title: string;
    description: string;
    enabled: boolean;
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
    enabled: boolean;
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
    enabled: boolean;
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
    enabled: boolean;
}

export interface GalleryImage {
    src: string;
    alt: string;
    enabled: boolean;
}

export interface ContactInfo {
    icon: string;
    label: string;
    value: string;
    enabled: boolean;
}

// --- New Interfaces for Umrah Guide ---
export interface UmrahGuideStep {
  title: string;
  description: string;
  points: string[];
  arabicText?: string;
  arabicMeaning?: string;
  enabled: boolean;
}

// --- New Interfaces for Hajj Guide ---
export interface HajjGuideType {
    title: string;
    description: string;
    enabled: boolean;
}

export interface HajjGuideAct {
    title: string;
    description: string;
    enabled: boolean;
}

export interface HajjGuideFaqItem {
  question: string;
  answer: string;
  enabled: boolean;
}

export interface GuideDoDontItem {
  title: string;
  items: string[];
}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string;
}

export interface WhyChooseSection {
    icon: string;
    title: string;
    description: string;
    enabled: boolean;
}

export interface WhyChooseChampionData {
    seo: SeoMetadata;
    en: {
        title: string;
        subtitle: string;
        sections: WhyChooseSection[];
    };
    bn: {
        title: string;
        subtitle: string;
        sections: WhyChooseSection[];
    };
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
    dos: GuideDoDontItem;
    donts: GuideDoDontItem;
    images: string[];
    note: string;
  };
  faq: {
    title: string;
    items: HajjGuideFaqItem[];
  };
  cta: {
    title: string;
    buttonText: string;
  };
}

export interface HajjGuideData {
  seo: SeoMetadata;
  pageBanner: {
    title: string;
    subtitle: string;
  };
  types: {
    title: string;
    intro: string;
    list: HajjGuideType[];
  };
  faraj: {
    title: string;
    intro: string;
    list: HajjGuideAct[];
  };
  wajib: {
    title: string;
    intro: string;
    list: HajjGuideAct[];
  };
  dosAndDonts: {
    title: string;
    intro: string;
    dos: GuideDoDontItem;
    donts: GuideDoDontItem;
    images: string[];
    note: string;
  };
  faq: {
    title: string;
    items: HajjGuideFaqItem[];
  };
  cta: {
    title: string;
    buttonText: string;
  };
}

export interface WhyChooseUsData {
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
}

export interface AirTicketingFeature {
    icon: string;
    title: string;
    description: string;
    enabled: boolean;
}

export interface AirTicketingData {
    seo: SeoMetadata;
    pageBanner: {
        title: string;
        subtitle: string;
    };
    features: AirTicketingFeature[];
    form: {
        title: string;
        subtitle: string;
        buttonText: string;
    };
    googleAppsScriptUrl: string;
}

export interface CustomPage {
  id: string; // e.g., #about-us
  title: string;
  bannerSubtitle: string;
  content: string; // Supports basic HTML
  seo: SeoMetadata;
  enabled: boolean;
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
            links: { href: string; label: string; enabled: boolean; }[];
        };
        mainServices: {
            title: string;
            links: { href: string; label: string; enabled: boolean; }[];
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
            sections: {
                services: { enabled: boolean; title: string; subtitle: string; };
                packages: { enabled: boolean; title: string; subtitle: string; };
                whyChooseUs: { enabled: boolean; };
                testimonials: { enabled: boolean; title: string; subtitle: string; };
                contact: { enabled: boolean; title: string; subtitle: string; };
            };
            hero: {
                title: string;
                licenseInfo: string;
                subtitle: string;
                description: string;
                images: string[];
                buttonText: string;
            },
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
        airTicketing: AirTicketingData;
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
        whyChooseUs: WhyChooseUsData;
        expertHajjGuides: WhyChooseUsData;
        whyChooseChampion: WhyChooseChampionData;
        umrahGuide: UmrahGuideData;
        hajjGuide: HajjGuideData;
    };
    customPages: CustomPage[];
}


export const defaultData: AppData = {
    site: {
        logoUrl: 'https://i.postimg.cc/9QNWStMS/champion-logo-1.png',
    },
    header: {
        navLinks: [
            { href: '#home', label: 'Home', enabled: true },
            { href: '#why-choose-us', label: 'Why Choose Us', enabled: true },
            { 
              label: 'Services', 
              href: '#services',
              enabled: true,
              subLinks: [
                { href: '#services', label: 'All Services', enabled: true },
                { href: '#packages', label: 'Hajj & Umrah Packages', enabled: true },
                { href: '#visa-processing', label: 'Visa Processing', enabled: true },
                { href: '#air-ticketing', label: 'Air Ticketing', enabled: true },
              ]
            },
            {
              label: 'Guidelines',
              href: '#',
              enabled: true,
              subLinks: [
                { href: '#hajj-guide-in-bangla', label: 'Hajj Guide (Bangla)', enabled: true },
                { href: '#umrah-guide-in-bangla', label: 'Umrah Guide (Bangla)', enabled: true },
                { href: '#why-us', label: 'Expert Umrah Guides', enabled: true },
                { href: '#expert-hajj-guides', label: 'Expert Hajj Guides', enabled: true },
              ]
            },
            { href: '#team', label: 'Our Team', enabled: true },
            { href: '#testimonials', label: 'Testimonials', enabled: true },
            { href: '#contact', label: 'Contact', enabled: true },
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
                { href: '#about-us', label: 'About Us', enabled: true },
                { href: '#services', label: 'Services', enabled: true },
                { href: '#packages', label: 'Packages', enabled: true },
                { href: '#team', label: 'Our Team', enabled: true },
                { href: '#contact', label: 'Contact', enabled: true },
                { href: '#privacy-policy', label: 'Privacy Policy', enabled: true },
            ]
        },
        mainServices: {
            title: 'Main Services',
            links: [
                { href: '#packages', label: 'Hajj Packages', enabled: true },
                { href: '#packages', label: 'Umrah Packages', enabled: true },
                { href: '#visa-processing', label: 'Visa Processing', enabled: true },
                { href: '#air-ticketing', label: 'Air Ticketing', enabled: true },
            ]
        },
        followUs: {
            title: 'Follow Us',
            description: 'Stay connected with us on social media for the latest updates and offers.'
        },
        copyrightText: 'Champion Travels & Tours. All Rights Reserved.'
    },
    hajjPackages: [
        { name: 'Economy', price: '9510000', duration: '40-45 Days', hotelMakkah: '1500-1600 Meter', hotelMadinah: 'Apx. 600 Meter', flightsUp: 'Direct - SV/Biman', flightsDown: 'Direct - SV/Biman', food: 'Breakfast, Lunch & dinner (From our catering service)', special: 'Ziyara + Guide + Date + Workshop', note: 'If you want to take a short (21 Days) package, you will have to pay an additional 35000/- to 45000/- for airfare', image: 'https://i.postimg.cc/R0N8Mv8X/as.jpg', enabled: true },
        { name: 'Executive', price: '9580000', duration: '40-45 Days', hotelMakkah: '1000 Meter', hotelMadinah: '500-600 Meter', flightsUp: 'Direct - SV/Biman', flightsDown: 'Direct - SV/Biman', food: 'Breakfast, Lunch & dinner (From our catering service)', special: 'Ziyara + Guide + Date + Workshop', note: 'If you want to take a short (21 Days) package, you will have to pay an additional 35000/- to 45000/- for airfare', image: 'https://i.postimg.cc/jSKtdnQ4/HD-wallpaper-mecca-madina-during-evening-time-ramzan.jpg', enabled: true },
        { name: 'Executive Royal', price: '9670000', duration: '40-45 Days', hotelMakkah: '700 Meter', hotelMadinah: '200 Meter', flightsUp: 'Direct - SV/Biman', flightsDown: 'Direct - SV/Biman', food: 'Breakfast, Lunch & dinner (From our catering service)', special: 'Ziyara + Guide + Date + Workshop', note: 'If you want to take a short (21 Days) package, you will have to pay an additional 35000/- to 45000/- for airfare', image: 'https://i.postimg.cc/Bb92VfRP/ag.webp', enabled: true },
        { name: 'Vip Gold', price: '12900000', duration: '18-21 Days', hotelMakkah: '5 Star | 1-7 Meter', hotelMadinah: '4 Star | 1 Minute Walk', flightsUp: 'Direct - SV/Biman', flightsDown: 'Direct - SV/Biman', food: 'Breakfast, Lunch, Evening snacks & Dinner (From our catering service)', special: 'VIP, Special Train, Ziyara + Guide + Da\'e', note: 'If you want to take a short (21 Days) package, you will have to pay an additional 35000/- to 45000/- for airfare', image: 'https://i.postimg.cc/Y2z4HFFK/ah.jpg', enabled: true },
    ],
    umrahPackages: [
        { name: 'Standard Umrah Package', price: '170000', date: 'Sept/Oct (14 Days)', hotelMakkah: 'MAATHER AL JAWAR/Equivalent Hotel | Distance 550-650m.', hotelMadinah: 'MARJAN GOLDEN HOTEL PISTANCE - 100-200 MITRE', flightsUp: 'Direct - SV/BG/BS', flightsDown: 'Direct - SV/BG/BS', food: 'Excluded', special: 'Ziyara + Guide + Da\'e', note: 'IF FOOD INCLUDE EXTRA CHARGE 10000/- WILL BE PAY. If you want VIP train you need to pay extra 5000/-', image: 'https://i.postimg.cc/CL6k3832/ak.jpg', buttonText: 'Select Standard Package', enabled: true },
        { name: 'Economy Umrah Package', price: '160000', date: 'Sept/Oct (14 Days)', hotelMakkah: 'MAATHER AL JAWAR/Equivalent Hotel | Distance 550-650m.', hotelMadinah: 'MARJAN GOLDEN HOTEL PISTANCE - 100-200 MITRE (3 Star)', flightsUp: 'Transit - Air Arabia/Gulf Air', flightsDown: 'BG/SV', food: 'Excluded', special: 'Ziyara + Guide + Da\'e', note: 'IF FOOD INCLUDE EXTRA CHARGE 10000/- WILL BE PAY. If you want bullet train you need to pay extra 5000/-', image: 'https://i.postimg.cc/VkQL0LnX/al.webp', buttonText: 'Choose Economy Package', enabled: true },
        { name: 'VIP Umrah Package', price: '270000', date: 'Sept/Oct (10 Days)', hotelMakkah: 'HILTON/MAKKA TOWER/ ELAF KINDA DISTANCE - 0 MITRE (5 Star)', hotelMadinah: 'MARJAN GOLDEN DISTANCE-100-200 MITRE (3 Star)', flightsUp: 'BG/SV', flightsDown: 'BG/SV', food: 'Excluded', special: 'Ziyara + Guide + Da\'e', note: 'IF FOOD INCLUDE EXTRA CHARGE 15000/- WILL BE PAY. If you want bullet train you need to pay extra 5000/-', image: 'https://i.postimg.cc/RZ8BGSpf/aj.webp', buttonText: 'Book Super Saver Now', enabled: true },
    ],
    pages: {
        home: {
            seo: {
                title: 'Champion Travels & Tours | Hajj, Umrah & Air Ticketing in Bangladesh',
                description: 'Your trusted partner for Hajj, Umrah, Visa Processing, and worldwide travel in Bangladesh. We are committed to providing exceptional service and unforgettable spiritual journeys.',
                keywords: 'Hajj package Bangladesh, Umrah package Bangladesh, Champion Travels, Air Ticket Dhaka, Visa processing Bangladesh'
            },
            sections: {
                services: { enabled: true, title: 'Our Services', subtitle: 'We offer a complete range of travel solutions with a commitment to quality and customer satisfaction.' },
                packages: { enabled: true, title: 'Our Hajj & Umrah Packages', subtitle: 'Explore our diverse range of Hajj and Umrah packages. Each is thoughtfully crafted to provide a spiritually rewarding, comfortable, and seamless pilgrimage experience.' },
                whyChooseUs: { enabled: true },
                testimonials: { enabled: true, title: 'Words From Our Clients', subtitle: 'We are proud to have served thousands of satisfied pilgrims and travelers.' },
                contact: { enabled: true, title: 'Get In Touch', subtitle: 'Have questions or ready to book your next journey? Contact us today!' }
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
                  ],
                  enabled: true,
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
                  ],
                  enabled: true,
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
                  ],
                  enabled: true,
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
                  ],
                  enabled: true,
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
                  ],
                  enabled: true,
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
                  ],
                  enabled: true,
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
                    { src: 'https://i.postimg.cc/RZ8BGSpf/aj.webp', alt: 'The Prophet\'s Mosque illuminated at night', enabled: true },
                    { src: 'https://i.postimg.cc/Y2z4HFFK/ah.jpg', alt: 'A close-up view of the Kaaba surrounded by pilgrims', enabled: true },
                    { src: 'https://i.postimg.cc/Bb92VfRP/ag.webp', alt: 'The Kaaba during prayers with beautiful lighting', enabled: true },
                    { src: 'https://i.postimg.cc/R0N8Mv8X/as.jpg', alt: 'Aerial view of the Kaaba and the Grand Mosque during the day', enabled: true },
                    { src: 'https://i.postimg.cc/jSKtdnQ4/HD-wallpaper-mecca-madina-during-evening-time-ramzan.jpg', alt: 'The Grand Mosque in Mecca during a vibrant sunset', enabled: true },
                    { src: 'https://i.postimg.cc/x1gn4TDd/ad.jpg', alt: 'The serene courtyard of the Prophet\'s Mosque in Medina', enabled: true },
                    { src: 'https://i.postimg.cc/CL6k3832/ak.jpg', alt: 'The Makkah Royal Clock Tower overlooking the Kaaba', enabled: true },
                    { src: 'https://i.postimg.cc/VkQL0LnX/al.webp', alt: 'A wide-angle view of the Grand Mosque bustling with pilgrims', enabled: true },
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
                },
                enabled: true
            },
            employeesTitle: 'Our Talented Employee',
            employeesSubtitle: 'At The Heart Of Our Commitment To Providing Exceptional Immigration Solutions Stands We Provide Experts Create Great Value For Visa Categories',
            talentedEmployees: [
                { name: 'মোঃ মুছা', role: 'Executive', imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop', socials: { facebook: '#', phone: '#', whatsapp: '#' }, enabled: true },
                { name: 'সাদ্দام হোসেম', role: 'Manager', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop', socials: { facebook: '#', phone: '#', whatsapp: '#' }, enabled: true },
                { name: 'লোকমান হোসাইন', role: 'Executive', imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=300&auto=format&fit=crop', socials: { facebook: '#', phone: '#', whatsapp: '#' }, enabled: true },
                { name: 'মোহাম্মদ নূরে আলম ডালিম', role: 'General Manager', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop', socials: { facebook: '#', phone: '#', whatsapp: '#' }, enabled: true },
                { name: 'মোঃ আলী আকবর', role: 'Accounts', imageUrl: 'https://i.postimg.cc/G3MgC8cQ/image-(2).png', socials: { facebook: '#', phone: '#', whatsapp: '#' }, enabled: true },
                { name: 'Salman sharif', role: 'New Joined', imageUrl: 'https://i.postimg.cc/0jmsLpT9/image-(1).png', socials: { facebook: '#', phone: '#', whatsapp: '#' }, enabled: true },
                { name: 'MD Kawsar Ahmed', role: 'Ticketing', imageUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300&auto=format&fit=crop', socials: { facebook: '#', phone: '#', whatsapp: '#' }, enabled: true },
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
                  enabled: true,
                },
                {
                  quote: 'My Hajj journey was a dream come true, thanks to the amazing team at Champion. They were supportive and professional throughout.',
                  name: 'Fatima Begum',
                  title: 'Hajj Pilgrim, 2023',
                  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop',
                  enabled: true,
                },
                {
                  quote: 'From visa processing to hotel bookings, everything was seamless. Their attention to detail and customer care is top-notch.',
                  name: 'Hasan Chowdhury',
                  title: 'Family Tour, 2024',
                  avatar: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=100&auto=format&fit=crop',
                  enabled: true,
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
                { icon: 'Tourist', title: 'Tourist Visa', description: 'Explore new destinations with our hassle-free tourist visa services.', enabled: true },
                { icon: 'Business', title: 'Business Visa', description: 'Facilitating your international business travel needs with efficient processing.', enabled: true },
                { icon: 'Student', title: 'Student Visa', description: 'Helping students achieve their dreams of studying abroad.', enabled: true },
                { icon: 'Medical', title: 'Medical Visa', description: 'Assisting with visa requirements for medical treatment overseas.', enabled: true },
            ],
            processTitle: 'Our Simple 4-Step Process',
            processSteps: [
                { icon: 'Consultation', title: 'Consultation', description: 'We start with a detailed consultation to understand your visa needs.', enabled: true },
                { icon: 'DocumentCheck', title: 'Document Check', description: 'Our experts meticulously review all your documents to ensure accuracy.', enabled: true },
                { icon: 'Submission', title: 'Application Submission', description: 'We handle the entire submission process on your behalf.', enabled: true },
                { icon: 'FollowUp', title: 'Follow-up & Delivery', description: 'We keep you updated and ensure timely delivery of your visa.', enabled: true },
            ],
            whyChooseUsTitle: 'Why Choose Us For Visa Processing?',
            whyChooseUsFeatures: [
                { icon: 'Guidance', title: 'Expert Guidance', description: 'Our experienced team provides professional advice for a smooth process.', enabled: true },
                { icon: 'Success', title: 'High Success Rate', description: 'We have a proven track record of successful visa applications.', enabled: true },
                { icon: 'Time', title: 'Time-Saving', description: 'Let us handle the complexities while you focus on your travel plans.', enabled: true },
                { icon: 'Transparent', title: 'Transparent Process', description: 'We maintain complete transparency with no hidden costs or surprises.', enabled: true },
            ],
            form: {
                title: 'Visa Inquiry Form',
                subtitle: 'Have a specific question about your visa application? Fill out the form below, and our experts will get in touch with you.',
                buttonText: 'Submit Inquiry'
            },
            googleAppsScriptUrl: '',
        },
        airTicketing: {
            seo: {
                title: 'Air Ticketing | Champion Travels & Tours',
                description: 'Find competitive prices for domestic and international flights. Book your air tickets easily with Champion Travels & Tours for a seamless travel experience.',
                keywords: 'Air ticket Bangladesh, cheap flights Dhaka, international air ticket, domestic flights'
            },
            pageBanner: {
                title: 'Air Ticketing Services',
                subtitle: 'Your gateway to the world. We offer competitive fares and a seamless booking experience for both domestic and international flights.'
            },
            features: [
                { icon: 'BestFares', title: 'Competitive Fares', description: 'Access to the best prices from all major airlines, ensuring you get the most value.', enabled: true },
                { icon: 'Global', title: 'Worldwide Destinations', description: 'Whether it\'s a local trip or an international journey, we cover destinations across the globe.', enabled: true },
                { icon: 'EasyBooking', title: 'Simple Booking Process', description: 'Our straightforward booking process makes securing your flight quick and easy.', enabled: true },
                { icon: 'Support', title: '24/7 Support', description: 'Our dedicated team is available around the clock to assist with any changes or queries.', enabled: true },
            ],
            form: {
                title: 'Flight Inquiry Form',
                subtitle: 'Please provide your travel details below, and one of our ticketing experts will contact you with the best available options and fares.',
                buttonText: 'Get Flight Options'
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
                  enabled: true,
                },
                {
                  icon: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />',
                  label: 'Phone',
                  value: '+8802226663228, +8802226663229, +8801718425042, +8801901922368, +8801901922366, +8801815071704',
                  enabled: true,
                },
                {
                  icon: '<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />',
                  label: 'Email',
                  value: 'championtravels.Dhaka@gmail.com',
                  enabled: true,
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
        expertHajjGuides: {
            seo: {
                title: 'Expert Hajj Guides | Champion Travels & Tours',
                description: 'Discover why our expert Hajj guides make us the premier choice for your sacred pilgrimage. We provide dedicated scholars and comprehensive services for a flawless Hajj.',
                keywords: 'Expert Hajj guides, best Hajj services, Hajj scholars, trusted Hajj agency'
            },
            backgroundImage: "https://www.toptal.com/designers/subtlepatterns/uploads/islamic-style.png",
            guides: {
                mainImage: 'https://i.postimg.cc/R0N8Mv8X/as.jpg',
                secondaryImage: 'https://i.postimg.cc/jSKtdnQ4/HD-wallpaper-mecca-madina-during-evening-time-ramzan.jpg',
                tagline: 'Your Sacred Pilgrimage',
                title: 'Expert Hajj Guides',
                description: 'Our Hajj guides ensure a meaningful & enriching journey for every pilgrim, committed to assisting you at every step, from pre-departure preparations to on-site guidance during the Manasik of Hajj.',
                subheading: 'Dedicated Bangla-Speaking Alim & Mufti',
                subDescription: 'We provide experienced scholars to guide you through every ritual, ensuring your Hajj is performed correctly and with deep spiritual understanding. Join us on this sacred journey, knowing you are in capable hands.',
                buttonText: 'Available Hajj Packages'
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
                title: 'Services offer by Champion Travels & Tours for Hajj',
                list: [
                    'Hajj Visa Processing',
                    'Hotel Booking in Makkah & Madinah',
                    'Ziyarat Tours',
                    'Return Flights',
                    'Hajj Training & Seminars'
                ],
                buttonText: 'Book Your Hajj'
            },
            cta: {
                image: 'https://i.postimg.cc/R0N8Mv8X/as.jpg',
                title: 'Apply for a Hajj visa and experience the hassle-free journey to the holy lands.',
                buttonText: 'Request for Hajj Booking Online'
            },
            footerImage: 'https://i.postimg.cc/MHfn961Y/ds.jpg',
        },
        whyChooseChampion: {
            seo: {
                title: 'Why Choose Champion | Champion Travels & Tours',
                description: 'Discover the Champion difference. With years of experience, dedicated support, and comprehensive travel services, we are your trusted partner for spiritual and leisure travel.',
                keywords: 'Why choose us, best travel agency Bangladesh, trusted travel agent, champion travels difference'
            },
            en: {
                title: 'Why Choose Champion Travels & Tours?',
                subtitle: 'Your journey is our commitment. Discover the reasons why thousands of pilgrims and travelers trust us with their most important journeys.',
                sections: [
                    { icon: 'Time', title: 'Years of Experience', description: 'Since 2005, we have been a cornerstone in the travel industry, successfully guiding over 15,000 Hajj and 20,000 Umrah pilgrims on their spiritual paths.', enabled: true },
                    { icon: 'Guidance', title: 'Dedicated & Expert Team', description: 'Our team of experienced professionals and knowledgeable guides are committed to providing you with seamless support from start to finish.', enabled: true },
                    { icon: 'AllInOne', title: 'One-Stop Travel Solution', description: 'From Hajj & Umrah to visa processing, air ticketing, and hotel bookings, we offer a comprehensive suite of services to cover all your travel needs.', enabled: true },
                    { icon: 'Success', title: 'High Success Rate', description: 'We pride ourselves on a high success rate, especially in complex visa applications, ensuring your travel plans proceed without a hitch.', enabled: true },
                    { icon: 'Transparent', title: 'Transparent & Honest Service', description: 'We believe in clear communication and honest pricing. With us, there are no hidden fees or surprises, just trustworthy service.', enabled: true },
                    { icon: 'Support', title: '24/7 Customer Support', description: 'Your peace of mind is our priority. Our support team is available around the clock to assist you with any queries or concerns during your journey.', enabled: true },
                ]
            },
            bn: {
                title: 'কেন চ্যাম্পিয়ন ট্রাভেলস এন্ড ট্যুরস বেছে নেবেন?',
                subtitle: 'আপনার ভ্রমণই আমাদের অঙ্গীকার। হাজার হাজার হজযাত্রী এবং ভ্রমণকারী কেন তাদের সবচেয়ে গুরুত্বপূর্ণ যাত্রার জন্য আমাদের বিশ্বাস করে তা আবিষ্কার করুন।',
                sections: [
                    { icon: 'Time', title: 'বছরের পর বছর অভিজ্ঞতা', description: '২০০৫ সাল থেকে, আমরা ভ্রমণ শিল্পে একটি ভিত্তিপ্রস্তর হয়ে আছি, সফলভাবে ১৫,০০০ এর বেশি হজ এবং ২০,০০০ এর বেশি ওমরাহ হজযাত্রীকে তাদের আধ্যাত্মিক পথে পরিচালিত করেছি।', enabled: true },
                    { icon: 'Guidance', title: 'বিশেষজ্ঞ এবং নিবেদিত টিম', description: 'আমাদের অভিজ্ঞ পেশাদার এবং জ্ঞানী গাইডের দল শুরু থেকে শেষ পর্যন্ত আপনাকে নির্বিঘ্ন সহায়তা প্রদানে প্রতিশ্রুতিবদ্ধ।', enabled: true },
                    { icon: 'AllInOne', title: 'ওয়ান-স্টপ ট্রাভেল সমাধান', description: 'হজ ও ওমরাহ থেকে শুরু করে ভিসা প্রক্রিয়াকরণ, এয়ার টিকেটিং এবং হোটেল বুকিং পর্যন্ত, আমরা আপনার সমস্ত ভ্রমণের প্রয়োজন মেটাতে একটি বিস্তৃত পরিসরের পরিষেবা সরবরাহ করি।', enabled: true },
                    { icon: 'Success', title: 'উচ্চ সাফল্যের হার', description: 'আমরা জটিল ভিসা আবেদনেও উচ্চ সাফল্যের হারের জন্য গর্বিত, যা নিশ্চিত করে যে আপনার ভ্রমণের পরিকল্পনা কোনো বাধা ছাড়াই এগিয়ে যাবে।', enabled: true },
                    { icon: 'Transparent', title: 'স্বচ্ছ এবং সৎ পরিষেবা', description: 'আমরা স্পষ্ট যোগাযোগ এবং সৎ це це це বিশ্বাস করি। আমাদের সাথে, কোনও লুকানো ফি বা বিস্ময় নেই, কেবল বিশ্বাসযোগ্য পরিষেবা।', enabled: true },
                    { icon: 'Support', title: '২৪/৭ গ্রাহক সহায়তা', description: 'আপনার মনের শান্তিই আমাদের অগ্রাধিকার। আমাদের সহায়তা দল আপনার যাত্রার সময় যেকোনো জিজ্ঞাসা বা উদ্বেগের জন্য চব্বিশ ঘন্টা উপলব্ধ।', enabled: true },
                ]
            }
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
                    description: 'ওমরাহ পালন করার জন্য ইহরাম অপরিহার্য। ইহرامের পোশাক পরার জন্য কিছু ধাপ অনুসরণ করতে হয়:',
                    points: [
                        'পরিষ্কার-পরিচ্ছন্ন হয়ে গোসল বা অজু করা',
                        'ইহরামের নির্দিষ্ট পোশাক পরা',
                        'মিকাতের আগে বা মিকাতে ইহرامের কাপড় পরে নেওয়া',
                        'ইহرامের নিয়তে দুই রাকাত নামাজ আদায় করা',
                        'ওমরাহর নিয়ত করা'
                    ],
                    arabicText: 'লাব্বাইক! আল্লাহুম্মা লাব্বাইক, লাব্বাইকা লা শারিকা লাকা লাব্বাইক, ইন্নাল হামদা ওয়ান নি’মাতা লাকা ওয়াল মুলক, লা শারিকা লাক।',
                    arabicMeaning: 'অর্থ: আমি হাজির, হে আল্লাহ! আমি হাজির, তোমার কোন অংশীদার নেই, আমি হাজির, নিশ্চয়ই সমস্ত প্রশংসা এবং নেয়ামত তোমার এবং রাজত্ব তোমারই, তোমার কোন অংশীদার নেই।',
                    enabled: true,
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
                    ],
                    enabled: true,
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
                    ],
                    enabled: true,
                },
                {
                    title: '০৪. চুল মুণ্ডন করা (ওয়াজিব)',
                    description: 'চুল মুণ্ডন করা (ওয়াজিব)। ওমরাহ পালনে এটি অবশ্যই করণীয়। পুরুষের ক্ষেত্রে রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম)-এর আদর্শ অনুসারে সম্পূর্ণ মাথা মুণ্ডন করা। তবে কেউ চাইলে চুল ছোটও করতে পারে। মহিলাদের ক্ষেত্রে চুল এক ইঞ্চি পরিমাণ কেটে ফেলা।',
                    points: [],
                    enabled: true,
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
                    { question: 'ওমরাহ পালনের মূল ধাপগুলো কী কী?', answer: 'ওমরাহ পালনের মূল ধাপগুলো হলো: ইহরাম বাঁধা, কাবা শরিফ তাওয়াফ করা, সাফা ও মারওয়া পাহাড়ের মাঝে সাঈ করা এবং শেষে চুল কাটা বা মুণ্ডন করা।', enabled: true },
                    { question: 'ওমরাহ পালনের সময় কী কী বর্জনীয়?', answer: 'ইহরাম অবস্থায় কিছু কাজ নিষিদ্ধ, যেমন: সুগন্ধি ব্যবহার, চুল বা নখ কাটা, কোনো প্রাণী শিকার করা, ঝগড়া-বিবাদ করা এবং স্বামী-স্ত্রীর বিশেষ সম্পর্ক স্থাপন করা।', enabled: true },
                    { question: 'ইহরাম অবস্থায় সুগন্ধি ব্যবহার করা নিষিদ্ধ?', answer: 'হ্যাঁ, ইহরাম অবস্থায় যেকোনো ধরনের সুগন্ধি, পারফিউম বা সেন্ট ব্যবহার করা সম্পূর্ণরূপে নিষিদ্ধ।', enabled: true },
                    { question: 'মহিলারা কি একা ওমরাহ করতে পারেন?', answer: 'ইসলামিক আইন অনুযায়ী, মহিলাদের জন্য মাহরাম (স্বামী বা যার সাথে বিবাহ নিষিদ্ধ) ছাড়া হজ বা ওমরাহর জন্য সফর করা অনুমোদিত নয়। তবে বিভিন্ন দেশ ও মাজহাবের नियমে ভিন্নতা থাকতে পারে।', enabled: true },
                ]
            },
            cta: {
                title: 'Apply for an Umrah visa and experience the hassle-free journey to the city of Makkah and Madina',
                buttonText: 'Request for Umrah Booking Online'
            }
        },
        hajjGuide: {
            seo: {
                title: 'Hajj Guide in Bangla (হজ গাইডলাইন) | Champion Travels & Tours',
                description: 'A complete Hajj guide in Bengali. Learn about the types of Hajj (Tamattu, Qiran, Ifrad), Farz and Wajib acts, and essential do\'s and don\'ts for a successful pilgrimage.',
                keywords: 'Hajj guide Bangla, how to perform Hajj, Hajj korar niyom, হজ করার নিয়ম, তামাত্তু, ক্বিরান, ইফরাদ'
            },
            pageBanner: {
                title: 'হজ গাইডলাইন',
                subtitle: 'আপনার হজ যাত্রাকে সহজ ও অর্থবহ করার জন্য বিস্তারিত নির্দেশিকা।'
            },
            types: {
                title: 'হজের প্রকারভেদ',
                intro: 'হজ তিন প্রকার। প্রত্যেক প্রকার হজের নিয়ম-কানুনে কিছু পার্থক্য রয়েছে। আপনার জন্য সুবিধাজনক হজ বেছে নিন:',
                list: [
                    { title: 'হজ্জে তামাত্তু', description: 'এই হজে, হজযাত্রীগণ প্রথমে ওমরাহ পালন করে ইহরাম থেকে হালাল হন এবং হজের সময় নতুন করে ইহরাম বেঁধে হজের কার্যক্রম সম্পন্ন করেন। এটি বাংলাদেশ থেকে আগত হজযাত্রীদের জন্য সবচেয়ে জনপ্রিয়।', enabled: true },
                    { title: 'হজ্জে ক্বিরান', description: 'এই হজে, হজযাত্রীগণ ওমরাহ এবং হজ উভয়ের জন্য একই সাথে ইহরাম বাঁধেন এবং হজের কার্যক্রম শেষ না হওয়া পর্যন্ত ইহরাম অবস্থায় থাকেন।', enabled: true },
                    { title: 'হজ্জে ইফরাদ', description: 'এই হজে, হজযাত্রীগণ শুধুমাত্র হজের জন্য ইহরাম বাঁধেন এবং হজের কার্যক্রম সম্পন্ন করেন। তারা ওমরাহ পালন করেন না।', enabled: true }
                ]
            },
            faraj: {
                title: 'হজের ফরজ কাজসমূহ',
                intro: 'হজের মোট তিনটি ফরজ কাজ রয়েছে। এর কোনো একটি বাদ পড়লে হজ আদায় হবে না।',
                list: [
                    { title: 'ইহরাম বাঁধা', description: 'হজের নিয়তে নির্দিষ্ট স্থান (মিকাত) থেকে ইহরামের পোশাক পরা এবং তালবিয়া পাঠ করা।', enabled: true },
                    { title: 'আরাফাতের ময়দানে অবস্থান', description: 'জিলহজ মাসের ৯ তারিখে আরাফাতের ময়দানে সূর্যোদয় থেকে সূর্যাস্ত পর্যন্ত অবস্থান করা হজের সবচেয়ে গুরুত্বপূর্ণ ফরজ।', enabled: true },
                    { title: 'তাওয়াফে জিয়ারত', description: 'জিলহজ মাসের ১০ থেকে ১২ তারিখের মধ্যে কাবা শরিফ সাতবার প্রদক্ষিণ করা।', enabled: true }
                ]
            },
            wajib: {
                title: 'হজের ওয়াজিব কাজসমূহ',
                intro: 'হজের ওয়াজিব কাজগুলো অবশ্যই পালনীয়। কোনো একটি ছুটে গেলে দম (কুরবানি) দিয়ে তার ক্ষতিপূরণ করতে হয়।',
                list: [
                    { title: 'সাঈ করা', description: 'সাফা ও মারওয়া পাহাড়ের মধ্যে সাতবার দৌড়ানো।', enabled: true },
                    { title: 'মুজদালিফায় অবস্থান', description: 'আরাফাত থেকে ফিরে ১০ জিলহজ রাতে মুজদালিফায় অবস্থান করা।', enabled: true },
                    { title: 'জামারাতে পাথর নিক্ষেপ', description: '১০, ১১ ও ১২ জিলহজ মিনায় শয়তানকে পাথর নিক্ষেপ করা।', enabled: true },
                    { title: 'কুরবানি করা', description: 'আল্লাহর সন্তুষ্টির জন্য পশু কুরবানি করা।', enabled: true },
                    { title: 'মাথা মুণ্ডন বা চুল ছোট করা', description: 'কুরবানির পর পুরুষরা মাথা মুণ্ডন করবেন বা চুল ছোট করবেন এবং মহিলারা চুলের অগ্রভাগ সামান্য কাটবেন।', enabled: true },
                    { title: 'বিদায়ী তাওয়াফ', description: 'মক্কা থেকে বিদায় নেওয়ার আগে কাবা শরিফ তাওয়াফ করা।', enabled: true }
                ]
            },
            dosAndDonts: {
                title: 'হজ পালনে করণীয় ও বর্জনীয়',
                intro: 'হজ একটি গুরুত্বপূর্ণ ইবাদত। এটি পালনের সময় কিছু কাজকে গুরুত্ব দিতে হয় এবং এবং কিছু কাজ বর্জন করতে হয়।',
                dos: {
                    title: 'হজ পালনে করণীয়:',
                    items: [
                        'সব সময় আল্লাহর জিকির ও ইবাদতে মশগুল থাকা',
                        'ধৈর্য ধারণ করা এবং অন্য হাজিদের সাহায্য করা',
                        'পরিষ্কার-পরিচ্ছন্নতা বজায় রাখা',
                        'ইসলামী জ্ঞান অর্জন ও দোয়া-দরুদ পাঠ করা',
                        'নফল তাওয়াফ ও ইবাদত বেশি করা'
                    ]
                },
                donts: {
                    title: 'হজ পালনে বর্জনীয়:',
                    items: [
                        'ইহরাম অবস্থায় নিষিদ্ধ কাজগুলো করা (যেমন সুগন্ধি ব্যবহার, নখ বা চুল কাটা)',
                        'ঝগড়া-বিবাদ বা কোনো ধরনের পাপাচারে লিপ্ত হওয়া',
                        'কোনো প্রাণী শিকার করা বা কষ্ট দেওয়া',
                        'অপ্রয়োজনে দুনিয়াবী কথাবার্তা ও কাজে সময় নষ্ট করা',
                        'ছবি তোলা বা ভিডিও করায় অতিরিক্ত ব্যস্ত থাকা'
                    ]
                },
                images: [
                    'https://i.postimg.cc/R0N8Mv8X/as.jpg',
                    'https://i.postimg.cc/jSKtdnQ4/HD-wallpaper-mecca-madina-during-evening-time-ramzan.jpg',
                    'https://i.postimg.cc/x1gn4TDd/ad.jpg'
                ],
                note: 'নোট: ইহরাম অবস্থায় এ কাজগুলো করা যাবে না। ইহরাম থেকে মুক্ত হওয়ার পর কিছু কাজ করা যাবে, তবে ঝগড়া, গালাগালি ও খারাপ কথা বলা সব সময় বর্জনীয়।'
            },
            faq: {
                title: 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী',
                items: [
                    { question: 'হজের মূল কাজ কোনটি?', answer: 'হজের সবচেয়ে গুরুত্বপূর্ণ ও মূল কাজ হলো আরাফাতের ময়দানে অবস্থান করা। এটি ছাড়া হজ পূর্ণ হয় না।', enabled: true },
                    { question: 'তাওয়াফে জিয়ারত কখন করতে হয়?', answer: 'তাওয়াফে জিয়ারত ১০ জিলহজ কুরবানির পর থেকে ১২ জিলহজ সূর্যাস্তের আগে পর্যন্ত যেকোনো সময় করা যায়।', enabled: true },
                    { question: 'হজের সময় অসুস্থ হয়ে পড়লে কী করণীয়?', answer: 'হজের সময় অসুস্থ হলে ধৈর্য ধারণ করতে হবে এবং নিকটস্থ স্বাস্থ্যকেন্দ্রে যোগাযোগ করতে হবে। সৌদি সরকার হাজিদের জন্য বিনামূল্যে চিকিৎসার ব্যবস্থা রাখে।', enabled: true },
                    { question: 'কুরবানি কোথায় করতে হবে?', answer: 'হজের কুরবানি মিনা বা মক্কার হারাম এলাকার মধ্যে করতে হয়। বর্তমানে সৌদি সরকারের তত্ত্বাবধানে ব্যাংক বা নির্দিষ্ট সংস্থার মাধ্যমে কুরবানি করা সহজ।', enabled: true },
                ]
            },
            cta: {
                title: 'আপনার হজের যাত্রা শুরু করতে আজই আমাদের সাথে যোগাযোগ করুন এবং একটি অবিস্মরণীয় অভিজ্ঞতার জন্য প্রস্তুত হন।',
                buttonText: 'হজ প্যাকেজের জন্য অনুরোধ'
            }
        }
    },
    customPages: [
        {
            id: '#about-us',
            title: 'About Us',
            bannerSubtitle: 'Our Journey, Our Commitment, Your Trusted Travel Partner',
            content: `<h2>Our Mission</h2>
<p>Since our establishment in 2005, Champion Travels & Tours has been dedicated to providing exceptional travel services rooted in trust, integrity, and unparalleled customer care. Our mission is to facilitate seamless and spiritually enriching journeys for pilgrims undertaking Hajj and Umrah, and to offer comprehensive travel solutions for clients worldwide.</p>
<h2>Who We Are</h2>
<p>We are a government-approved travel agency (Hajj License No.-1432 & Umrah License No.-515) with a team of experienced professionals who are passionate about travel and dedicated to serving our clients. We understand the significance of a spiritual journey and the importance of a well-planned trip. Our expertise ensures that every detail is handled with precision, allowing you to focus on what truly matters.</p>
<h2>What We Offer</h2>
<p>We pride ourselves on being a one-stop solution for all your travel needs. Our core services include:</p>
<ul>
    <li><strong>Hajj & Umrah Packages:</strong> Thoughtfully designed packages that cater to various budgets and preferences, ensuring a comfortable and spiritually fulfilling pilgrimage.</li>
    <li><strong>Visa Processing:</strong> Expert and efficient visa assistance with a high success rate for destinations across the globe.</li>
    <li><strong>Air Ticketing:</strong> Competitive fares for domestic and international flights, making your travel affordable and convenient.</li>
    <li><strong>Personalized Service:</strong> We believe every traveler is unique. Our team works closely with you to tailor our services to your specific needs.</li>
</ul>
<p><strong>Join us at Champion Travels & Tours, and let us be your trusted partner in creating unforgettable travel memories.</strong></p>`,
            seo: {
                title: 'About Champion Travels & Tours | Our Story and Mission',
                description: 'Learn more about Champion Travels & Tours, a leading travel agency in Bangladesh since 2005. Discover our mission, values, and commitment to providing exceptional Hajj, Umrah, and travel services.',
                keywords: 'About Champion Travels, travel agency Bangladesh, our mission, company history, travel experts'
            },
            enabled: true
        },
        {
            id: '#privacy-policy',
            title: 'Privacy Policy',
            bannerSubtitle: 'Your Privacy is Our Priority',
            content: `<h2>Introduction</h2>
<p>Champion Travels & Tours ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
<h2>Information We Collect</h2>
<p>We may collect personal information from you in a variety of ways, including when you fill out an inquiry form on our site. The information we collect may include:</p>
<ul>
    <li>Your name</li>
    <li>Your email address</li>
    <li>Your phone number</li>
    <li>Details related to your travel inquiry (e.g., destination, travel dates, package preferences).</li>
</ul>
<h2>How We Use Your Information</h2>
<p>Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:</p>
<ul>
    <li>Respond to your inquiries and provide you with the services you have requested.</li>
    <li>Send you information about our packages and services.</li>
    <li>Process your bookings and manage your travel arrangements.</li>
    <li>Improve our website and services.</li>
</ul>
<h2>Data Processing and Third-Party Disclosure</h2>
<p>To efficiently manage and respond to your inquiries submitted through our contact, visa, and air ticketing forms, your submitted data (such as name, email, phone, and inquiry details) is sent to a Google Sheets document via Google Apps Script. This allows our team to process your request effectively.</p>
<p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties other than for the purpose of fulfilling your service request. We are committed to ensuring that your information is secure.</p>
<h2>Your Consent</h2>
<p>By using our site, you consent to our website's privacy policy.</p>
<h2>Changes to Our Privacy Policy</h2>
<p>If we decide to change our privacy policy, we will post those changes on this page. This policy was last modified on [Date of last update].</p>
<h2>Contact Us</h2>
<p>If you have any questions regarding this privacy policy, you may contact us using the information on our <a href="#contact">Contact page</a>.</p>`,
            seo: {
                title: 'Privacy Policy | Champion Travels & Tours',
                description: 'Read the privacy policy of Champion Travels & Tours. We are committed to protecting your personal information and being transparent about how we handle your data.',
                keywords: 'privacy policy, data protection, user privacy, travel agency privacy'
            },
            enabled: true
        }
    ]
};