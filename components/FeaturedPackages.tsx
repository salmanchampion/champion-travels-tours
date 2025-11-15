import React, { useState, useMemo } from 'react';

// --- Icon Components ---
const PriceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 002 2h5a2 2 0 012 2v5a2 2 0 01-2 2h-5a2 2 0 01-2-2v-5a2 2 0 00-2-2H7a2 2 0 01-2-2V5a2 2 0 012-2z" /></svg>;
const DurationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const HotelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M5 7h14" /></svg>;
const FlightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
const FoodIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 7h18M3 11h18M3 15h18M3 19h18" /></svg>;
const SpecialIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 16l-4 1 1-4 6.293-6.293a1 1 0 011.414 0z" /></svg>;
const NoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>;
const DateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;


// --- Data ---
const hajjPackages = [
    { name: 'Economy', price: '9510000', duration: '40-45 Days', hotelMakkah: '1500-1600 Meter', hotelMadinah: 'Apx. 600 Meter', flightsUp: 'Direct - SV/Biman', flightsDown: 'Direct - SV/Biman', food: 'Breakfast, Lunch & dinner (From our catering service)', special: 'Ziyara + Guide + Date + Workshop', note: 'If you want to take a short (21 Days) package, you will have to pay an additional 35000/- to 45000/- for airfare', image: 'https://i.postimg.cc/R0N8Mv8X/as.jpg' },
    { name: 'Executive', price: '9580000', duration: '40-45 Days', hotelMakkah: '1000 Meter', hotelMadinah: '500-600 Meter', flightsUp: 'Direct - SV/Biman', flightsDown: 'Direct - SV/Biman', food: 'Breakfast, Lunch & dinner (From our catering service)', special: 'Ziyara + Guide + Date + Workshop', note: 'If you want to take a short (21 Days) package, you will have to pay an additional 35000/- to 45000/- for airfare', image: 'https://i.postimg.cc/jSKtdnQ4/HD-wallpaper-mecca-madina-during-evening-time-ramzan.jpg' },
    { name: 'Executive Royal', price: '9670000', duration: '40-45 Days', hotelMakkah: '700 Meter', hotelMadinah: '200 Meter', flightsUp: 'Direct - SV/Biman', flightsDown: 'Direct - SV/Biman', food: 'Breakfast, Lunch & dinner (From our catering service)', special: 'Ziyara + Guide + Date + Workshop', note: 'If you want to take a short (21 Days) package, you will have to pay an additional 35000/- to 45000/- for airfare', image: 'https://i.postimg.cc/Bb92VfRP/ag.webp' },
    { name: 'Vip Gold', price: '12900000', duration: '18-21 Days', hotelMakkah: '5 Star | 1-7 Meter', hotelMadinah: '4 Star | 1 Minute Walk', flightsUp: 'Direct - SV/Biman', flightsDown: 'Direct - SV/Biman', food: 'Breakfast, Lunch, Evening snacks & Dinner (From our catering service)', special: 'VIP, Special Train, Ziyara + Guide + Da\'e', note: 'If you want to take a short (21 Days) package, you will have to pay an additional 35000/- to 45000/- for airfare', image: 'https://i.postimg.cc/Y2z4HFFK/ah.jpg' },
];

const umrahPackages = [
    { name: 'Standard Umrah Package', price: '170000', date: 'Sept/Oct (14 Days)', hotelMakkah: 'MAATHER AL JAWAR/Equivalent Hotel | Distance 550-650m.', hotelMadinah: 'MARJAN GOLDEN HOTEL PISTANCE - 100-200 MITRE', flightsUp: 'Direct - SV/BG/BS', flightsDown: 'Direct - SV/BG/BS', food: 'Excluded', special: 'Ziyara + Guide + Da\'e', note: 'IF FOOD INCLUDE EXTRA CHARGE 10000/- WILL BE PAY. If you want VIP train you need to pay extra 5000/-', image: 'https://i.postimg.cc/CL6k3832/ak.jpg', buttonText: 'Select Standard Package' },
    { name: 'Economy Umrah Package', price: '160000', date: 'Sept/Oct (14 Days)', hotelMakkah: 'MAATHER AL JAWAR/Equivalent Hotel | Distance 550-650m.', hotelMadinah: 'MARJAN GOLDEN HOTEL PISTANCE - 100-200 MITRE (3 Star)', flightsUp: 'Transit - Air Arabia/Gulf Air', flightsDown: 'BG/SV', food: 'Excluded', special: 'Ziyara + Guide + Da\'e', note: 'IF FOOD INCLUDE EXTRA CHARGE 10000/- WILL BE PAY. If you want bullet train you need to pay extra 5000/-', image: 'https://i.postimg.cc/VkQL0LnX/al.webp', buttonText: 'Choose Economy Package' },
    { name: 'VIP Umrah Package', price: '270000', date: 'Sept/Oct (10 Days)', hotelMakkah: 'HILTON/MAKKA TOWER/ ELAF KINDA DISTANCE - 0 MITRE (5 Star)', hotelMadinah: 'MARJAN GOLDEN DISTANCE-100-200 MITRE (3 Star)', flightsUp: 'BG/SV', flightsDown: 'BG/SV', food: 'Excluded', special: 'Ziyara + Guide + Da\'e', note: 'IF FOOD INCLUDE EXTRA CHARGE 15000/- WILL BE PAY. If you want bullet train you need to pay extra 5000/-', image: 'https://i.postimg.cc/R01mH74z/aj.webp', buttonText: 'Book Super Saver Now' },
];

// --- Hajj Card Detail Row Component ---
const DetailRow: React.FC<{ icon: React.ReactNode; label: string; value: string; }> = ({ icon, label, value }) => (
    <div className="flex items-start space-x-3 py-2 border-b border-gray-200 last:border-b-0">
        <div className="flex-shrink-0 pt-1">{icon}</div>
        <div className="flex-grow">
            <p className="text-sm font-semibold text-gray-700">{label}</p>
            <p className="text-sm text-gray-500">{value}</p>
        </div>
    </div>
);


// --- Hajj Package Card Component ---
const HajjPackageCard: React.FC<{ pkg: typeof hajjPackages[0] }> = ({ pkg }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col h-full text-gray-800 overflow-hidden">
        <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
        <div className="bg-gray-100 p-4 text-center">
            <h3 className="text-xl font-bold font-display text-primary">{pkg.name}</h3>
        </div>
        <div className="p-4 flex-grow">
            <DetailRow icon={<PriceIcon />} label="Price" value={`৳${Number(pkg.price).toLocaleString()}`} />
            <DetailRow icon={<DurationIcon />} label="Time & Duration" value={pkg.duration} />
            <DetailRow icon={<HotelIcon />} label="Hotel Makkah" value={pkg.hotelMakkah} />
            <DetailRow icon={<HotelIcon />} label="Hotel Madinah" value={pkg.hotelMadinah} />
            <DetailRow icon={<FlightIcon />} label="Flights Up" value={pkg.flightsUp} />
            <DetailRow icon={<FlightIcon />} label="Flights Down" value={pkg.flightsDown} />
            <DetailRow icon={<FoodIcon />} label="Food" value={pkg.food} />
            <DetailRow icon={<SpecialIcon />} label="Special Services" value={pkg.special} />
            <DetailRow icon={<NoteIcon />} label="Note" value={pkg.note} />
        </div>
        <div className="p-4 mt-auto">
             <a href={`#contact?subject=${encodeURIComponent(`Booking Inquiry: Hajj - ${pkg.name}`)}`} className="w-full text-center block bg-secondary text-dark-bg font-bold py-3 px-6 rounded-lg hover:bg-amber-600 transition-all duration-300">
                Book Your Hajj Journey
            </a>
        </div>
    </div>
);

// --- Hajj Pre-Registration Card ---
const HajjPreRegistrationCard = () => (
    <div className="bg-[#fdf9f0] rounded-lg shadow-lg overflow-hidden flex flex-col h-full border border-gray-200 text-gray-800 col-span-1 md:col-span-2 lg:col-span-1">
      <div className="relative bg-white h-48 flex items-center justify-center p-4">
        <img 
          src="https://i.postimg.cc/PJS59Bqw/champion-logo-1.png"
          alt="Hajj Pre Registration" 
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-green-600 mb-3 font-display">Hajj Pre Registration 2026-2027</h3>
        <p className="text-base text-[#5d4037] mb-2 leading-relaxed">
          Embark on a sacred pilgrimage with peace of mind. Pre-register for Hajj and ensure your place in this spiritually significant journey.
        </p>
        <p className="text-base text-[#5d4037] mb-4 leading-relaxed flex-grow">
          Champion Travels & Tours is here to guide you through the process, offering seamless pre-registration services. Prepare for an experience of a lifetime – start your Hajj pre-registration today.
        </p>
        <a href="#contact?subject=Inquiry: Hajj Pre-Registration 2026-2027" className="mt-auto w-full block bg-secondary text-dark-bg font-bold py-3 px-6 rounded-full hover:bg-amber-600 transition-all duration-300 text-center shadow-md">
          Apply For Pre-Register
        </a>
      </div>
    </div>
);


const KeyHighlights = () => (
     <div className="text-center pt-8 text-gray-800">
        <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">Key Highlights of Champion Travels and Tours</h3>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex flex-col items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.284-1.255-.758-1.658M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.284-1.255.758-1.658m0 0A5.986 5.986 0 0112 13a5.986 5.986 0 014.242 1.758m0 0a3 3 0 01-5.356-1.857m0 0a3 3 0 00-5.356-1.857m0 0A5.986 5.986 0 017 13a5.986 5.986 0 01-4.242 1.758M12 13a5 5 0 015 5v2H7v-2a5 5 0 015-5z" /></svg>
                <p className="text-2xl font-bold">20000+</p>
                <p className="text-gray-600">Umrah packages last 10 year</p>
            </div>
            <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 016-6h6a6 6 0 016 6v1h-3" /></svg>
                <p className="text-2xl font-bold">15000+</p>
                <p className="text-gray-600">Hajj Pilgrimage</p>
            </div>
        </div>
    </div>
);


// --- Umrah Package Card Component ---
const UmrahPackageCard: React.FC<{ pkg: typeof umrahPackages[0] }> = ({ pkg }) => (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col h-full text-gray-800 overflow-hidden">
        <div className="bg-gray-100 p-4 flex items-center justify-between">
            <h3 className="font-bold text-lg font-display text-primary">{pkg.name}</h3>
            <img src='https://i.postimg.cc/PJS59Bqw/champion-logo-1.png' alt='Champion Travels & Tours Logo' className="h-10 w-auto" />
        </div>
        <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
        <div className="p-4 flex-grow">
            <DetailRow icon={<PriceIcon />} label="Price" value={`৳${Number(pkg.price).toLocaleString()}`} />
            <DetailRow icon={<DateIcon />} label="Date" value={pkg.date} />
            <DetailRow icon={<HotelIcon />} label="Hotel Makkah" value={pkg.hotelMakkah} />
            <DetailRow icon={<HotelIcon />} label="Hotel Madinah" value={pkg.hotelMadinah} />
            <DetailRow icon={<FlightIcon />} label="Flights Up" value={pkg.flightsUp} />
            <DetailRow icon={<FlightIcon />} label="Flights Down" value={pkg.flightsDown} />
            <DetailRow icon={<FoodIcon />} label="Food" value={pkg.food} />
            <DetailRow icon={<SpecialIcon />} label="Special Services" value={pkg.special} />
            <DetailRow icon={<NoteIcon />} label="Note" value={pkg.note} />
        </div>
        <div className="p-4 mt-auto">
             <a href={`#contact?subject=${encodeURIComponent(`Booking Inquiry: Umrah - ${pkg.name}`)}`} className="w-full text-center block bg-secondary text-dark-bg font-bold py-3 px-6 rounded-lg hover:bg-amber-600 transition-all duration-300">
                {pkg.buttonText}
            </a>
        </div>
    </div>
);

// --- Gallery Component ---
const Gallery: React.FC = () => {
  const images = [
    { src: 'https://i.postimg.cc/R01mH74z/aj.webp', alt: 'The Prophet\'s Mosque illuminated at night' },
    { src: 'https://i.postimg.cc/Y2z4HFFK/ah.jpg', alt: 'A close-up view of the Kaaba surrounded by pilgrims' },
    { src: 'https://i.postimg.cc/Bb92VfRP/ag.webp', alt: 'The Kaaba during prayers with beautiful lighting' },
    { src: 'https://i.postimg.cc/R0N8Mv8X/as.jpg', alt: 'Aerial view of the Kaaba and the Grand Mosque during the day' },
    { src: 'https://i.postimg.cc/jSKtdnQ4/HD-wallpaper-mecca-madina-during-evening-time-ramzan.jpg', alt: 'The Grand Mosque in Mecca during a vibrant sunset' },
    { src: 'https://i.postimg.cc/x1gn4TDd/ad.jpg', alt: 'The serene courtyard of the Prophet\'s Mosque in Medina' },
    { src: 'https://i.postimg.cc/CL6k3832/ak.jpg', alt: 'The Makkah Royal Clock Tower overlooking the Kaaba' },
    { src: 'https://i.postimg.cc/VkQL0LnX/al.webp', alt: 'A wide-angle view of the Grand Mosque bustling with pilgrims' },
  ];

  return (
    <div className="bg-light-bg rounded-xl p-6 md:p-10 mt-16 shadow-inner">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-display font-bold text-white">Explore Our Gallery</h3>
        <p className="mt-4 text-lg text-muted-text max-w-3xl mx-auto">A glimpse into the spiritual journeys and beautiful destinations we offer.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg group aspect-square">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Filter Components ---
const FilterInput: React.FC<{ label: string, type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string }> = ({ label, type, value, onChange, placeholder }) => (
    <div>
        <label className="block text-sm font-medium text-muted-text mb-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-dark-bg border border-gray-600 rounded-md py-2 px-3 text-light-text focus:outline-none focus:ring-1 focus:ring-primary"
        />
    </div>
);

const FilterSelect: React.FC<{ label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children: React.ReactNode }> = ({ label, value, onChange, children }) => (
     <div>
        <label className="block text-sm font-medium text-muted-text mb-1">{label}</label>
        <select
            value={value}
            onChange={onChange}
            className="w-full bg-dark-bg border border-gray-600 rounded-md py-2 px-3 text-light-text focus:outline-none focus:ring-1 focus:ring-primary"
        >
            {children}
        </select>
    </div>
);

const FilterCheckbox: React.FC<{ label: string, checked: boolean, onChange: () => void }> = ({ label, checked, onChange }) => (
    <label className="flex items-center space-x-2 cursor-pointer">
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="h-4 w-4 rounded border-gray-500 bg-gray-700 text-primary focus:ring-primary"
        />
        <span className="text-light-text">{label}</span>
    </label>
);

// --- Custom Hook for Filtering and Sorting ---
const usePackageFilters = <T extends { name: string; price: string; }>(
    initialPackages: T[], 
    durationParser: (pkg: T) => number
) => {
    const [sort, setSort] = useState('default');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minDuration, setMinDuration] = useState('');
    const [maxDuration, setMaxDuration] = useState('');
    const packageTypes = useMemo(() => [...new Set(initialPackages.map(p => p.name))], [initialPackages]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    
    const parsePrice = (priceStr: string) => Number(priceStr.replace(/,/g, ''));

    const handleTypeChange = (typeName: string) => {
        setSelectedTypes(prev =>
            prev.includes(typeName)
                ? prev.filter(t => t !== typeName)
                : [...prev, typeName]
        );
    };
    
    const resetFilters = () => {
        setSort('default');
        setMinPrice('');
        setMaxPrice('');
        setMinDuration('');
        setMaxDuration('');
        setSelectedTypes([]);
    };

    const filteredPackages = useMemo(() => {
        let packages = [...initialPackages];

        if (minPrice) packages = packages.filter(p => parsePrice(p.price) >= Number(minPrice));
        if (maxPrice) packages = packages.filter(p => parsePrice(p.price) <= Number(maxPrice));
        if (minDuration) packages = packages.filter(p => durationParser(p) >= Number(minDuration));
        if (maxDuration) packages = packages.filter(p => durationParser(p) <= Number(maxDuration));
        if (selectedTypes.length > 0) packages = packages.filter(p => selectedTypes.includes(p.name));
        
        if (sort === 'price-asc') packages.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        else if (sort === 'price-desc') packages.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

        return packages;
    }, [sort, minPrice, maxPrice, minDuration, maxDuration, selectedTypes, initialPackages, durationParser]);
    
    return {
        sort, setSort,
        minPrice, setMinPrice,
        maxPrice, setMaxPrice,
        minDuration, setMinDuration,
        maxDuration, setMaxDuration,
        packageTypes,
        selectedTypes, handleTypeChange,
        resetFilters,
        filteredPackages
    };
};

interface FeaturedPackagesProps {
  showHajjFilters?: boolean;
  showUmrahFilters?: boolean;
  showTitle?: boolean;
}

// --- Main Component ---
const FeaturedPackages: React.FC<FeaturedPackagesProps> = ({ showHajjFilters = false, showUmrahFilters = false, showTitle = true }) => {
    // --- Duration parsing functions ---
    const parseHajjDuration = (pkg: typeof hajjPackages[0]) => {
        const match = pkg.duration.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
    };
    
// FIX: Updated the `pkg` parameter type to guide TypeScript's generic type inference.
// The original type caused the `usePackageFilters` hook to infer a base type for Umrah packages,
// which was missing the `flightType` and `hotelProximity` properties needed for filtering.
// This more specific type ensures the correct, enhanced type is inferred throughout the hook.
    const parseUmrahDuration = (pkg: (typeof umrahPackages)[0] & { flightType: string; hotelProximity: string; }) => {
        const match = pkg.date.match(/\((\d+)\s*Days\)/);
        return match ? parseInt(match[1], 10) : 0;
    };

    // --- Use the custom hook for both Hajj and Umrah packages ---
    const {
        sort: hajjSort, setSort: setHajjSort,
        minPrice: hajjMinPrice, setMinPrice: setHajjMinPrice,
        maxPrice: hajjMaxPrice, setMaxPrice: setHajjMaxPrice,
        minDuration: hajjMinDuration, setMinDuration: setHajjMinDuration,
        maxDuration: hajjMaxDuration, setMaxDuration: setHajjMaxDuration,
        packageTypes: hajjPackageTypes,
        selectedTypes: hajjSelectedTypes, handleTypeChange: handleHajjTypeChange,
        resetFilters: resetHajjFilters,
        filteredPackages: filteredHajjPackages
    } = usePackageFilters(hajjPackages, parseHajjDuration);
    
    // --- Enhance Umrah packages with filterable properties ---
    const enhancedUmrahPackages = useMemo(() => {
        return umrahPackages.map(pkg => {
            const flightType = (pkg.flightsUp.toLowerCase().includes('transit') || pkg.flightsDown.toLowerCase().includes('transit')) ? 'Transit' : 'Direct';
            const hotelInfo = `${pkg.hotelMakkah} ${pkg.hotelMadinah}`.toLowerCase();
            let hotelProximity = 'Close'; // Default
            if (hotelInfo.includes('0 mitre') || hotelInfo.includes('100-200 mitre')) {
                hotelProximity = 'Very Close';
            }
            return { ...pkg, flightType, hotelProximity };
        });
    }, []);

    const {
        sort: umrahSort, setSort: setUmrahSort,
        minPrice: umrahMinPrice, setMinPrice: setUmrahMinPrice,
        maxPrice: umrahMaxPrice, setMaxPrice: setUmrahMaxPrice,
        minDuration: umrahMinDuration, setMinDuration: setUmrahMinDuration,
        maxDuration: umrahMaxDuration, setMaxDuration: setUmrahMaxDuration,
        packageTypes: umrahPackageTypes,
        selectedTypes: umrahSelectedTypes, handleTypeChange: handleUmrahTypeChange,
        resetFilters: resetUmrahFiltersFromHook,
        filteredPackages: filteredUmrahPackagesFromHook
    } = usePackageFilters(enhancedUmrahPackages, parseUmrahDuration);

    const [flightType, setFlightType] = useState('any');
    const [hotelProximity, setHotelProximity] = useState('any');

    const resetUmrahFilters = () => {
        resetUmrahFiltersFromHook();
        setFlightType('any');
        setHotelProximity('any');
    };

    const filteredUmrahPackages = useMemo(() => {
        return filteredUmrahPackagesFromHook.filter(pkg => {
            const flightMatch = flightType === 'any' || pkg.flightType.toLowerCase() === flightType;
            const proximityMatch = hotelProximity === 'any' || pkg.hotelProximity.toLowerCase().replace(' ', '-') === hotelProximity;
            return flightMatch && proximityMatch;
        });
    }, [filteredUmrahPackagesFromHook, flightType, hotelProximity]);


  return (
    <section className={`${showTitle ? 'py-20' : 'pb-20'} bg-dark-bg`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
            <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary">Our Hajj & Umrah Packages</h2>
            <p className="mt-4 text-lg text-muted-text max-w-3xl mx-auto">Explore our diverse range of Hajj and Umrah packages. Each is thoughtfully crafted to provide a spiritually rewarding, comfortable, and seamless pilgrimage experience.</p>
            </div>
        )}

        {/* --- Hajj Packages Section --- */}
        <div className="bg-gray-100 rounded-xl p-6 md:p-10 mb-16 shadow-inner">
            {showHajjFilters && (
              <div className="bg-light-bg rounded-lg p-4 md:p-6 mb-8 shadow-inner text-white">
                <h3 className="text-2xl font-display mb-4">Filter Hajj Packages</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                    <FilterInput label="Min Price (৳)" type="number" value={hajjMinPrice} onChange={e => setHajjMinPrice(e.target.value)} placeholder="e.g. 9500000" />
                    <FilterInput label="Max Price (৳)" type="number" value={hajjMaxPrice} onChange={e => setHajjMaxPrice(e.target.value)} placeholder="e.g. 10000000" />
                    <FilterSelect label="Sort By" value={hajjSort} onChange={e => setHajjSort(e.target.value)}>
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </FilterSelect>
                    <FilterInput label="Min Duration (Days)" type="number" value={hajjMinDuration} onChange={e => setHajjMinDuration(e.target.value)} placeholder="e.g. 20" />
                    <FilterInput label="Max Duration (Days)" type="number" value={hajjMaxDuration} onChange={e => setHajjMaxDuration(e.target.value)} placeholder="e.g. 40" />
                </div>
                <div className="mt-4">
                    <h4 className="font-semibold mb-2">Package Type</h4>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {hajjPackageTypes.map(type => (
                            <FilterCheckbox key={type} label={type} checked={hajjSelectedTypes.includes(type)} onChange={() => handleHajjTypeChange(type)} />
                        ))}
                    </div>
                </div>
                <div className="mt-6">
                    <button onClick={resetHajjFilters} className="bg-secondary text-dark-bg font-bold py-2 px-5 rounded-lg hover:bg-amber-600 transition-colors">Reset Filters</button>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                {filteredHajjPackages.length > 0 ? (
                    <>
                        {filteredHajjPackages.map((pkg) => <HajjPackageCard key={pkg.name} pkg={pkg} />)}
                        <HajjPreRegistrationCard />
                    </>
                ) : (
                    <div className="col-span-full text-center py-16 text-gray-500">
                        <h4 className="text-2xl font-semibold">No Hajj Packages Found</h4>
                        <p className="mt-2">Try adjusting your filters or contact us for custom packages.</p>
                    </div>
                )}
            </div>
            <KeyHighlights />
        </div>

        {/* --- Umrah Packages Section --- */}
        <div className="bg-[#EBF5F0] rounded-xl p-6 md:p-10 shadow-inner">
           <div className="text-center mb-12">
             <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-800">Upcoming Umrah Packages</h3>
             <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Plan your Umrah and Ziyarah. Our upcoming Umrah packages will encompass a range of options, including economy and premium packages, designed to accommodate various budgets and preferences.</p>
             <a href="#packages" className="mt-6 inline-block bg-secondary text-dark-bg font-bold py-3 px-8 rounded-full hover:bg-amber-600 transition-colors">
                View All Packages
             </a>
           </div>
          {showUmrahFilters && (
              <div className="bg-light-bg rounded-lg p-4 md:p-6 mb-8 shadow-inner text-white">
                <h3 className="text-2xl font-display mb-4">Filter Umrah Packages</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <FilterInput label="Min Price (৳)" type="number" value={umrahMinPrice} onChange={e => setUmrahMinPrice(e.target.value)} placeholder="e.g. 150000" />
                    <FilterInput label="Max Price (৳)" type="number" value={umrahMaxPrice} onChange={e => setUmrahMaxPrice(e.target.value)} placeholder="e.g. 200000" />
                    <FilterSelect label="Sort By" value={umrahSort} onChange={e => setUmrahSort(e.target.value)}>
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </FilterSelect>
                     <FilterSelect label="Flight Type" value={flightType} onChange={e => setFlightType(e.target.value)}>
                        <option value="any">Any Flight Type</option>
                        <option value="direct">Direct</option>
                        <option value="transit">Transit</option>
                    </FilterSelect>
                    <FilterInput label="Min Duration (Days)" type="number" value={umrahMinDuration} onChange={e => setUmrahMinDuration(e.target.value)} placeholder="e.g. 10" />
                    <FilterInput label="Max Duration (Days)" type="number" value={umrahMaxDuration} onChange={e => setUmrahMaxDuration(e.target.value)} placeholder="e.g. 15" />
                    <FilterSelect label="Hotel Proximity" value={hotelProximity} onChange={e => setHotelProximity(e.target.value)}>
                        <option value="any">Any Proximity</option>
                        <option value="very-close">Very Close (0-200m)</option>
                        <option value="close">Close (201m+)</option>
                    </FilterSelect>
                </div>
                <div className="mt-4">
                    <h4 className="font-semibold mb-2">Package Type</h4>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {umrahPackageTypes.map(type => (
                            <FilterCheckbox key={type} label={type} checked={umrahSelectedTypes.includes(type)} onChange={() => handleUmrahTypeChange(type)} />
                        ))}
                    </div>
                </div>
                <div className="mt-6">
                    <button onClick={resetUmrahFilters} className="bg-secondary text-dark-bg font-bold py-2 px-5 rounded-lg hover:bg-amber-600 transition-colors">Reset Filters</button>
                </div>
              </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {filteredUmrahPackages.length > 0 ? (
                filteredUmrahPackages.map((pkg) => <UmrahPackageCard key={pkg.name} pkg={pkg} />)
             ) : (
                <div className="col-span-full text-center py-16 text-gray-500">
                    <h4 className="text-2xl font-semibold">No Umrah Packages Found</h4>
                    <p className="mt-2">Try adjusting your filters or check back for new packages soon.</p>
                </div>
             )}
          </div>
        </div>

        {/* --- Gallery Section --- */}
        <Gallery />

      </div>
    </section>
  );
};

export default FeaturedPackages;