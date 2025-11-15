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

export interface AppData {
    site: {
        logoUrl: string;
    };
    hero: {
        title: string;
        licenseInfo: string;
        subtitle: string;
        description: string;
        images: string[];
    };
    hajjPackages: HajjPackage[];
    umrahPackages: UmrahPackage[];
    pages: {
        team: {
            chairman: TeamMember;
            talentedEmployees: TeamMember[];
        },
        packages: {
            hajjPreRegistration: {
                image: string;
                title: string;
                description: string;
                subDescription: string;
                inquirySubject: string;
            },
            keyHighlights: {
                title: string;
                umrahStat: string;
                umrahStatLabel: string;
                hajjStat: string;
                hajjStatLabel: string;
            },
            gallery: {
                title: string;
                description: string;
                images: GalleryImage[];
            }
        },
        contact: {
            contactInfo: ContactInfo[];
            accreditationsImage: string;
        },
        whyChooseUs: {
            backgroundImage: string,
            guides: {
                mainImage: string;
                secondaryImage: string;
            },
            directors: {
                decorativeImage: string;
                mainImage: string;
                secondaryImage1: string;
                secondaryImage2: string;
            },
            services: {
                image: string;
            },
            cta: {
                image: string;
            },
            footerImage: string;
        }
    };
}


export const defaultData: AppData = {
    site: {
        logoUrl: 'https://i.postimg.cc/9QNWStMS/champion-logo-1.png',
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
        ]
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
        team: {
            chairman: {
                name: 'Abdul Mannan',
                role: 'C.E.O & Chairman',
                imageUrl: 'https://i.postimg.cc/rwn0QTMc/image.png',
                title: '',
            },
            talentedEmployees: [
                { name: 'মোঃ মুছা', role: 'Executive', imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop' },
                { name: 'সাদ্দام হোসেম', role: 'Manager', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop' },
                { name: 'লোকমান হোসাইন', role: 'Executive', imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=300&auto=format&fit=crop' },
                { name: 'মোহাম্মদ নূরে আলম ডালিম', role: 'General Manager', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop' },
                { name: 'মোঃ আলী আকবর', role: 'Accounts', imageUrl: 'https://i.postimg.cc/G3MgC8cQ/image-(2).png' },
                { name: 'Salman sharif', role: 'New Joined', imageUrl: 'https://i.postimg.cc/0jmsLpT9/image-(1).png' },
                { name: 'MD Kawsar Ahmed', role: 'Ticketing', imageUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300&auto=format&fit=crop' },
            ]
        },
        packages: {
            hajjPreRegistration: {
                image: 'https://i.postimg.cc/PJS59Bqw/champion-logo-1.png',
                title: 'Hajj Pre Registration 2026-2027',
                description: 'Embark on a sacred pilgrimage with peace of mind. Pre-register for Hajj and ensure your place in this spiritually significant journey.',
                subDescription: 'Champion Travels & Tours is here to guide you through the process, offering seamless pre-registration services. Prepare for an experience of a lifetime – start your Hajj pre-registration today.',
                inquirySubject: 'Inquiry: Hajj Pre-Registration 2026-2027'
            },
            keyHighlights: {
                title: 'Key Highlights of Champion Travels and Tours',
                umrahStat: '20,000+',
                umrahStatLabel: 'Umrah Packages Provided in the Last 10 Years',
                hajjStat: '15,000+',
                hajjStatLabel: 'Hajj Pilgrims Successfully Served',
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
        contact: {
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
        },
        whyChooseUs: {
            backgroundImage: "https://www.toptal.com/designers/subtlepatterns/uploads/islamic-style.png",
            guides: {
                mainImage: 'https://i.postimg.cc/FHFRwHxn/gg.jpg',
                secondaryImage: 'https://i.postimg.cc/x1gn4TDd/ad.jpg',
            },
            directors: {
                decorativeImage: 'https://i.postimg.cc/L5K4p8xT/star-lantern.png',
                mainImage: 'https://i.postimg.cc/rwn0QTMc/image.png',
                secondaryImage1: 'https://i.postimg.cc/G3MgC8cQ/image-(2).png',
                secondaryImage2: 'https://i.postimg.cc/0jmsLpT9/image-(1).png',
            },
            services: {
                image: 'https://i.postimg.cc/4xHMfzwH/champion-travels-tours2.png',
            },
            cta: {
                image: 'https://i.postimg.cc/FHFRwHxn/gg.jpg'
            },
            footerImage: 'https://i.postimg.cc/MHfn961Y/ds.jpg',
        }
    }
};
