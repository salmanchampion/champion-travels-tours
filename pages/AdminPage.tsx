import React, { useState, useContext, ChangeEvent } from 'react';
import PageBanner from '../components/PageBanner';
import { DataContext } from '../contexts/DataContext';
import { AppData, HajjPackage, UmrahPackage, TeamMember, GalleryImage, ContactInfo, Service, Testimonial, NavLink, UmrahGuideStep, HajjGuideFaqItem, HajjGuideType, HajjGuideAct, WhyChooseSection, VisaFeature, VisaProcessStep, AirTicketingFeature, CustomPage, ContentBlock } from '../data';

interface AdminInputProps {
    label: string;
    name: string;
    value: any;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    className?: string;
}

const AdminInput: React.FC<AdminInputProps> = ({ label, name, value, onChange, placeholder = '', type = 'text', className }) => (
    <div className={className}>
        <label htmlFor={name} className="block text-sm font-medium text-[var(--color-muted-text)] mb-1">{label}</label>
        <input type={type} id={name} name={name} value={value || ''} onChange={onChange} placeholder={placeholder} className="w-full bg-[var(--color-dark-bg)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-light-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
    </div>
);

const AdminTextarea = ({ label, name, value, onChange, rows = 3 }: { label: string, name: string, value: string, onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void, rows?: number }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-[var(--color-muted-text)] mb-1">{label}</label>
        <textarea id={name} name={name} value={value || ''} onChange={onChange} rows={rows} className="w-full bg-[var(--color-dark-bg)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-light-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
    </div>
);

const ToggleSwitch: React.FC<{
    label: string;
    enabled: boolean;
    onChange: (enabled: boolean) => void;
}> = ({ label, enabled, onChange }) => (
    <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--color-light-text)]">{label}</span>
        <button
            type="button"
            onClick={() => onChange(!enabled)}
            className={`${enabled ? 'bg-[var(--color-primary)]' : 'bg-gray-500'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-light-bg)] focus:ring-[var(--color-primary)]`}
        >
            <span
                className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
        </button>
    </div>
);


const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-[var(--color-light-bg)] rounded-lg shadow-lg mb-8">
            <button
                className="w-full flex justify-between items-center p-6 text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-2xl font-display text-[var(--color-primary)]">{title}</h3>
                 <svg className={`w-6 h-6 text-[var(--color-primary)] transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[20000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-0">
                    {children}
                </div>
            </div>
        </div>
    );
};

const SeoEditor: React.FC<{ pageName: string; seoPath: string; localData: AppData; onChange: (path: string, value: any) => void; }> = ({ pageName, seoPath, localData, onChange }) => {
    const getSeoData = () => {
        const keys = seoPath.split('.');
        let data: any = localData;
        for (const key of keys) {
            if (data[key] === undefined) return { title: '', description: '', keywords: '' };
            data = data[key];
        }
        return data;
    }
    const seoData = getSeoData();

    return (
        <div className="mt-6 p-4 border border-gray-700 rounded-lg">
            <h4 className="font-bold text-xl mb-2 text-[var(--color-secondary)]">{pageName}</h4>
            <AdminInput label="Meta Title" name={`${seoPath}.title`} value={seoData.title} onChange={e => onChange(e.target.name, e.target.value)} />
            <div className="mt-2">
            <AdminTextarea label="Meta Description" name={`${seoPath}.description`} value={seoData.description} onChange={e => onChange(e.target.name, e.target.value)} />
            </div>
            <div className="mt-2">
            <AdminInput label="Meta Keywords (comma-separated)" name={`${seoPath}.keywords`} value={seoData.keywords} onChange={e => onChange(e.target.name, e.target.value)} />
            </div>
        </div>
    );
};

const packageFieldLabels: { [key: string]: string } = {
    name: 'Name',
    price: 'Price',
    duration: 'Duration',
    category: 'Category',
    shortDescription: 'Short Description',
    date: 'Date/Duration',
    hotelMakkah: 'Hotel Makkah',
    hotelMadinah: 'Hotel Madinah',
    flightsUp: 'Flights Up',
    flightsDown: 'Flights Down',
    food: 'Food',
    special: 'Special Services',
    note: 'Note',
    image: 'Image URL',
    buttonText: 'Button Text',
};

const PackageEditor: React.FC<{
    pkg: HajjPackage | UmrahPackage;
    index: number;
    packageType: 'hajj' | 'umrah';
    onChange: (path: string, index: number, field: string, value: any) => void;
    onDelete: (path: string, index: number) => void;
}> = ({ pkg, index, packageType, onChange, onDelete }) => {
    const path = packageType === 'hajj' ? 'hajjPackages' : 'umrahPackages';

    return (
        <div className="mb-6 p-4 border border-gray-700 rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-xl text-[var(--color-secondary)]">{pkg.name || `Package ${index + 1}`}</h4>
                <div className="flex items-center gap-4">
                    <ToggleSwitch 
                        label="Visible" 
                        enabled={pkg.enabled} 
                        onChange={(enabled) => onChange(path, index, 'enabled', enabled)} 
                    />
                    <button onClick={() => onDelete(path, index)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(pkg).map(key => {
                    if (key === 'enabled') return null; // We handle this with the toggle switch
                    
                    const label = packageFieldLabels[key] || key;
                    const value = (pkg as any)[key];
                    
                    if (key === 'note' || key === 'shortDescription') {
                        return (
                           <div key={key} className="md:col-span-2 lg:col-span-3">
                                <AdminTextarea
                                    label={label}
                                    name={key}
                                    value={value}
                                    onChange={e => onChange(path, index, e.target.name, e.target.value)}
                                />
                           </div>
                        );
                    }
                    
                    if (key in packageFieldLabels) {
                        return (
                            <AdminInput
                                key={key}
                                label={label}
                                name={key}
                                value={value}
                                onChange={e => onChange(path, index, e.target.name, e.target.value)}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

const ExpertGuideEditor: React.FC<{
    pageKey: 'whyChooseUs' | 'expertHajjGuides';
    localData: AppData;
    handleNestedChange: (path: string, value: any) => void;
}> = ({ pageKey, localData, handleNestedChange }) => {
    const data = localData.pages[pageKey];
    const path = `pages.${pageKey}`;

    return (
        <div className="space-y-6">
            <AdminInput label="Background Image URL" name={`${path}.backgroundImage`} value={data.backgroundImage} onChange={e => handleNestedChange(e.target.name, e.target.value)} />

            <div className="p-4 border border-gray-600 rounded-md">
                <h4 className="font-bold text-lg text-[var(--color-secondary)] mb-2">Guides Section</h4>
                <AdminInput label="Tagline" name={`${path}.guides.tagline`} value={data.guides.tagline} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                <AdminInput label="Title" name={`${path}.guides.title`} value={data.guides.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" />
                <AdminTextarea label="Description" name={`${path}.guides.description`} value={data.guides.description} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                <AdminInput label="Subheading" name={`${path}.guides.subheading`} value={data.guides.subheading} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" />
                <AdminTextarea label="Sub-description" name={`${path}.guides.subDescription`} value={data.guides.subDescription} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                <AdminInput label="Button Text" name={`${path}.guides.buttonText`} value={data.guides.buttonText} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" />
                <AdminInput label="Main Image URL" name={`${path}.guides.mainImage`} value={data.guides.mainImage} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" />
                <AdminInput label="Secondary Image URL" name={`${path}.guides.secondaryImage`} value={data.guides.secondaryImage} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" />
            </div>

            <div className="p-4 border border-gray-600 rounded-md">
                <h4 className="font-bold text-lg text-[var(--color-secondary)] mb-2">Board of Directors Section</h4>
                <AdminInput label="Title" name={`${path}.directors.title`} value={data.directors.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                <AdminTextarea label="Description" name={`${path}.directors.description`} value={data.directors.description} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                <AdminInput label="Button Text" name={`${path}.directors.buttonText`} value={data.directors.buttonText} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" />
                <AdminInput label="Main Image URL" name={`${path}.directors.mainImage`} value={data.directors.mainImage} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" />
                <AdminInput label="Secondary Image 1 URL" name={`${path}.directors.secondaryImage1`} value={data.directors.secondaryImage1} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" />
                <AdminInput label="Secondary Image 2 URL" name={`${path}.directors.secondaryImage2`} value={data.directors.secondaryImage2} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" />
                <AdminInput label="Decorative Image URL" name={`${path}.directors.decorativeImage`} value={data.directors.decorativeImage} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" />
            </div>
            
            <div className="p-4 border border-gray-600 rounded-md">
                <h4 className="font-bold text-lg text-[var(--color-secondary)] mb-2">Services Offer Section</h4>
                 <AdminInput label="Title" name={`${path}.services.title`} value={data.services.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                 <AdminTextarea label="Services List (one per line)" name={`${path}.services.list`} value={Array.isArray(data.services.list) ? data.services.list.join('\n') : ''} onChange={e => handleNestedChange(e.target.name, e.target.value.split('\n'))} />
                 <AdminInput label="Button Text" name={`${path}.services.buttonText`} value={data.services.buttonText} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" />
                 <AdminInput label="Image URL" name={`${path}.services.image`} value={data.services.image} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" />
            </div>

            <div className="p-4 border border-gray-600 rounded-md">
                <h4 className="font-bold text-lg text-[var(--color-secondary)] mb-2">Final CTA Section</h4>
                <AdminInput label="Title" name={`${path}.cta.title`} value={data.cta.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                <AdminInput label="Button Text" name={`${path}.cta.buttonText`} value={data.cta.buttonText} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" />
                <AdminInput label="Image URL" name={`${path}.cta.image`} value={data.cta.image} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" />
            </div>
            
            <AdminInput label="Footer Silhouette Image URL" name={`${path}.footerImage`} value={data.footerImage} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
        </div>
    );
};

const AdminPage: React.FC = () => {
    const { appData, updateAppData, resetAppData } = useContext(DataContext);
    const [localData, setLocalData] = useState<AppData>(JSON.parse(JSON.stringify(appData)));
    const [activePackageTab, setActivePackageTab] = useState<'hajj' | 'umrah'>('hajj');
    const [isSaving, setIsSaving] = useState(false);

    // Sync local state if appData from context changes (e.g., after reset)
    React.useEffect(() => {
        setLocalData(JSON.parse(JSON.stringify(appData)));
    }, [appData]);

    const updateNestedState = (prevState: AppData, path: string, valueOrUpdater: any): AppData => {
        const keys = path.split('.');
        const newState = JSON.parse(JSON.stringify(prevState));
        let currentLevel = newState;

        for (let i = 0; i < keys.length - 1; i++) {
            currentLevel = currentLevel[keys[i]];
        }
        
        const finalKey = keys[keys.length - 1];
        
        if (typeof valueOrUpdater === 'function') {
            currentLevel[finalKey] = valueOrUpdater(currentLevel[finalKey]);
        } else {
            currentLevel[finalKey] = valueOrUpdater;
        }
        
        return newState;
    };
    
    const handleNestedChange = (path: string, value: any) => {
        setLocalData(prevState => updateNestedState(prevState, path, value));
    };

    const handleListChange = (pathToList: string, index: number, field: string, value: any) => {
        const fullPath = `${pathToList}.${index}.${field}`;
        handleNestedChange(fullPath, value);
    };

    const addListItem = (path: string, newItem: any) => {
        setLocalData(prevState => {
            const updater = (currentArray: any[] = []) => [...currentArray, newItem];
            return updateNestedState(prevState, path, updater);
        });
    };

    const deleteListItem = (path: string, indexToDelete: number) => {
        if (!window.confirm("Are you sure you want to delete this item? This action cannot be undone.")) return;
        setLocalData(prevState => {
            const updater = (currentArray: any[] = []) => currentArray.filter((_, index) => index !== indexToDelete);
            return updateNestedState(prevState, path, updater);
        });
    };

    const moveListItem = (path: string, fromIndex: number, toIndex: number) => {
        setLocalData(prevState => {
            const updater = (currentArray: any[] = []) => {
                const newArray = [...currentArray];
                if (toIndex < 0 || toIndex >= newArray.length) return newArray;
                const [item] = newArray.splice(fromIndex, 1);
                newArray.splice(toIndex, 0, item);
                return newArray;
            };
            return updateNestedState(prevState, path, updater);
        });
    };
    
    const saveChanges = async () => {
        setIsSaving(true);
        await updateAppData(localData);
        setIsSaving(false);
        alert('Changes saved successfully!');
    };
    
    const handleReset = async () => {
        await resetAppData();
    }

    const phoneIndex = localData.header.contactInfo?.findIndex(c => c.label === 'Phone');
    const emailIndex = localData.header.contactInfo?.findIndex(c => c.label === 'Email');

    return (
        <div className="pt-20">
            <PageBanner
                title="Admin Panel"
                subtitle="Manage your website content here. Click 'Save All Changes' at the bottom to apply your updates."
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                <Section title="Header & Navigation Bar">
                    <h4 className="font-bold text-xl mb-4 text-[var(--color-secondary)]">General</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-700 rounded-lg">
                        <AdminInput
                            label="Site Logo URL"
                            name="site.logoUrl"
                            value={localData.site.logoUrl}
                            onChange={e => handleNestedChange(e.target.name, e.target.value)}
                        />
                        <AdminInput
                            label="'Book Now' Button Text"
                            name="header.bookNowButton.text"
                            value={localData.header.bookNowButton.text}
                            onChange={e => handleNestedChange(e.target.name, e.target.value)}
                        />
                        <AdminInput
                            label="'Book Now' Button Link"
                            name="header.bookNowButton.href"
                            value={localData.header.bookNowButton.href}
                            onChange={e => handleNestedChange(e.target.name, e.target.value)}
                        />
                    </div>

                     <h4 className="font-bold text-xl mt-8 mb-4 text-[var(--color-secondary)]">Top Bar Settings</h4>
                    <div className="p-4 border border-gray-700 rounded-lg">
                        <h5 className="font-semibold text-lg text-white mb-2">Contact Info</h5>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {phoneIndex !== -1 && (
                             <AdminInput
                                label="Top Bar Phone Number"
                                name={`header.contactInfo.${phoneIndex}.value`}
                                value={localData.header.contactInfo?.[phoneIndex]?.value || ''}
                                onChange={e => handleNestedChange(e.target.name, e.target.value)}
                            />
                           )}
                           {emailIndex !== -1 && (
                            <AdminInput
                                label="Top Bar Email Address"
                                name={`header.contactInfo.${emailIndex}.value`}
                                value={localData.header.contactInfo?.[emailIndex]?.value || ''}
                                onChange={e => handleNestedChange(e.target.name, e.target.value)}
                            />
                           )}
                        </div>

                        <h5 className="font-semibold text-lg text-white mt-6 mb-2">Social Media Links</h5>
                        <div className="space-y-4">
                            {localData.header.socialLinks?.map((link, index) => (
                                <div key={link.name + index} className="p-4 border border-gray-600 rounded-md bg-[var(--color-dark-bg)]">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-bold text-[var(--color-light-text)]">{link.name || 'New Social Link'}</p>
                                        <button
                                            onClick={() => deleteListItem('header.socialLinks', index)}
                                            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <AdminInput
                                        label="Name (e.g., Facebook)"
                                        name="name"
                                        value={link.name}
                                        onChange={e => handleListChange('header.socialLinks', index, e.target.name, e.target.value)}
                                    />
                                    <AdminInput
                                        label="Full URL"
                                        name="href"
                                        value={link.href}
                                        onChange={e => handleListChange('header.socialLinks', index, e.target.name, e.target.value)}
                                        className="mt-2"
                                    />
                                    <AdminTextarea
                                        label="Icon (SVG Path Data)"
                                        name="icon"
                                        value={link.icon}
                                        onChange={e => handleListChange('header.socialLinks', index, e.target.name, e.target.value)}
                                        rows={4}
                                    />
                                    <p className="text-xs text-[var(--color-muted-text)] mt-1">
                                        Provide the inner content of an SVG tag, e.g., {'<path d="..."/>'}. Find icons on sites like Heroicons.
                                    </p>
                                </div>
                            ))}
                            <button
                                onClick={() => addListItem('header.socialLinks', { name: 'New Social', href: 'https://', icon: '<path d="..."/>' })}
                                className="mt-2 bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm hover:bg-blue-700"
                            >
                                Add Social Link
                            </button>
                        </div>
                        <h5 className="font-semibold text-lg text-white mt-6 mb-2">Tagline Slider</h5>
                        <p className="text-sm text-[var(--color-muted-text)] mb-2">Manage the taglines that appear in the top bar slider.</p>
                        <div className="space-y-3">
                            {localData.header.taglines?.map((tagline, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        aria-label={`Tagline ${index + 1}`}
                                        value={tagline}
                                        onChange={(e) => handleNestedChange(`header.taglines.${index}`, e.target.value)}
                                        className="w-full bg-[var(--color-dark-bg)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-light-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => deleteListItem('header.taglines', index)}
                                        className="bg-red-600 text-white px-3 py-2 rounded self-end h-10 hover:bg-red-700 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => addListItem('header.taglines', 'New Inspiring Tagline')}
                            className="mt-3 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                        >
                            Add Tagline
                        </button>
                    </div>

                    <h4 className="font-bold text-xl mt-8 mb-4 text-[var(--color-secondary)]">Navigation Links</h4>
                    <div className="space-y-4">
                        {localData.header.navLinks.map((navLink, index) => (
                            <div key={navLink.label + index} className="p-4 border border-gray-700 rounded-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h5 className="font-semibold text-lg text-white">Menu Item: {navLink.label || `Item ${index + 1}`}</h5>
                                    <div className="flex items-center gap-4">
                                        <ToggleSwitch
                                            label="Visible"
                                            enabled={navLink.enabled}
                                            onChange={enabled => handleListChange('header.navLinks', index, 'enabled', enabled)}
                                        />
                                        <button
                                            onClick={() => deleteListItem('header.navLinks', index)}
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <AdminInput
                                        label="Label"
                                        name="label"
                                        value={navLink.label}
                                        onChange={e => handleListChange('header.navLinks', index, e.target.name, e.target.value)}
                                    />
                                    <AdminInput
                                        label="Link (e.g., #home, or # for dropdown)"
                                        name="href"
                                        value={navLink.href}
                                        onChange={e => handleListChange('header.navLinks', index, e.target.name, e.target.value)}
                                    />
                                </div>
                                
                                {navLink.subLinks && (
                                    <div className="mt-4 pl-6 border-l-2 border-gray-600">
                                        <h6 className="font-semibold text-md text-[var(--color-light-text)] mb-2">Sub-menu Items</h6>
                                        {navLink.subLinks.map((subLink, subIndex) => (
                                             <div key={subLink.label + subIndex} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 p-3 border border-gray-600 rounded-md items-center bg-[var(--color-dark-bg)]">
                                                <AdminInput
                                                    label="Sub-item Label"
                                                    name="label"
                                                    value={subLink.label}
                                                    onChange={e => handleListChange(`header.navLinks.${index}.subLinks`, subIndex, 'label', e.target.value)}
                                                />
                                                <AdminInput
                                                    label="Sub-item Link"
                                                    name="href"
                                                    value={subLink.href}
                                                    onChange={e => handleListChange(`header.navLinks.${index}.subLinks`, subIndex, 'href', e.target.value)}
                                                />
                                                <div className="flex items-center gap-4">
                                                    <ToggleSwitch
                                                        label="Visible"
                                                        enabled={subLink.enabled}
                                                        onChange={enabled => handleListChange(`header.navLinks.${index}.subLinks`, subIndex, 'enabled', enabled)}
                                                    />
                                                    <button onClick={() => deleteListItem(`header.navLinks.${index}.subLinks`, subIndex)} className="bg-red-600 text-white px-3 py-1 rounded self-center h-8">Delete</button>
                                                </div>
                                            </div>
                                        ))}
                                         <button
                                            onClick={() => addListItem(`header.navLinks.${index}.subLinks`, { href: '#', label: 'New Sub-Link', enabled: true })}
                                            className="mt-2 bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm hover:bg-blue-700"
                                        >
                                            Add Sub-menu Item
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={() => addListItem('header.navLinks', { href: '#', label: 'New Menu', enabled: true, subLinks: [] })}
                            className="mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
                        >
                            Add New Menu Item
                        </button>
                    </div>
                </Section>

                <Section title="Theme & Design">
                    <p className="text-[var(--color-muted-text)] mb-6">Customize the look and feel of your entire website. Changes are applied globally.</p>
                    <h4 className="font-bold text-xl mb-4 text-[var(--color-secondary)]">Color Palette</h4>
                    <div className="p-4 border border-gray-700 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-6">
                        {Object.keys(localData.theme.colors).map(key => (
                            <div key={key}>
                                <label className="block text-sm font-medium text-[var(--color-muted-text)] mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={localData.theme.colors[key as keyof typeof localData.theme.colors]}
                                        onChange={e => handleNestedChange(`theme.colors.${key}`, e.target.value)}
                                        className="w-10 h-10 p-0 border-none rounded-md cursor-pointer bg-[var(--color-dark-bg)]"
                                    />
                                    <input
                                        type="text"
                                        name={`theme.colors.${key}`}
                                        value={localData.theme.colors[key as keyof typeof localData.theme.colors]}
                                        onChange={e => handleNestedChange(e.target.name, e.target.value)}
                                        className="w-full bg-[var(--color-dark-bg)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-light-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <h4 className="font-bold text-xl mt-8 mb-4 text-[var(--color-secondary)]">Typography</h4>
                    <div className="p-4 border border-gray-700 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AdminInput
                            label="Body Font (Sans-serif)"
                            name="theme.fonts.sans"
                            value={localData.theme.fonts.sans}
                            onChange={e => handleNestedChange(e.target.name, e.target.value)}
                            placeholder="e.g., Roboto"
                        />
                        <AdminInput
                            label="Display Font (Headings)"
                            name="theme.fonts.display"
                            value={localData.theme.fonts.display}
                            onChange={e => handleNestedChange(e.target.name, e.target.value)}
                            placeholder="e.g., Teko"
                        />
                    </div>
                    <p className="text-xs text-[var(--color-muted-text)] mt-2">Note: Use font names from Google Fonts. The theme will automatically try to load them.</p>

                    <h4 className="font-bold text-xl mt-8 mb-4 text-[var(--color-secondary)]">UI Elements</h4>
                    <div className="p-4 border border-gray-700 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="theme.ui.borderRadius" className="block text-sm font-medium text-[var(--color-muted-text)] mb-1">Border Radius</label>
                            <input
                                type="text"
                                id="theme.ui.borderRadius"
                                name="theme.ui.borderRadius"
                                value={localData.theme.ui.borderRadius}
                                onChange={e => handleNestedChange(e.target.name, e.target.value)}
                                placeholder="e.g., 0.5rem"
                                className="w-full bg-[var(--color-dark-bg)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-light-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                            />
                        </div>
                        <div>
                            <label htmlFor="theme.ui.buttonStyle" className="block text-sm font-medium text-[var(--color-muted-text)] mb-1">Button Style</label>
                            <select
                                id="theme.ui.buttonStyle"
                                name="theme.ui.buttonStyle"
                                value={localData.theme.ui.buttonStyle}
                                onChange={e => handleNestedChange(e.target.name, e.target.value)}
                                className="w-full bg-[var(--color-dark-bg)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-light-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] h-[42px]"
                            >
                                <option value="rounded">Rounded</option>
                                <option value="pill">Pill</option>
                                <option value="sharp">Sharp</option>
                            </select>
                        </div>
                         <div>
                            <label htmlFor="theme.ui.shadow" className="block text-sm font-medium text-[var(--color-muted-text)] mb-1">Shadow Intensity</label>
                            <select
                                id="theme.ui.shadow"
                                name="theme.ui.shadow"
                                value={localData.theme.ui.shadow}
                                onChange={e => handleNestedChange(e.target.name, e.target.value)}
                                className="w-full bg-[var(--color-dark-bg)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-light-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] h-[42px]"
                            >
                                <option value="none">None</option>
                                <option value="sm">Small</option>
                                <option value="md">Medium</option>
                                <option value="lg">Large</option>
                                <option value="xl">Extra Large</option>
                            </select>
                        </div>
                    </div>
                </Section>
                
                <Section title="Homepage Management">
                    <h4 className="font-bold text-xl mb-4 text-[var(--color-secondary)]">Section Visibility &amp; Titles</h4>
                    <p className="text-[var(--color-muted-text)] mb-4 -mt-2">Control which sections appear on your homepage and edit their titles.</p>
                    
                    {Object.keys(localData.pages.home.sections).map(key => {
                        const section = localData.pages.home.sections[key as keyof typeof localData.pages.home.sections];
                        if (typeof section !== 'object' || section === null || !('enabled' in section)) return null;

                        const hasTitle = 'title' in section;
                        const hasSubtitle = 'subtitle' in section;

                        return (
                            <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start mb-4 p-4 border border-gray-700 rounded-lg">
                                <div className="md:col-span-1">
                                    <ToggleSwitch
                                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                                        enabled={section.enabled}
                                        onChange={val => handleNestedChange(`pages.home.sections.${key}.enabled`, val)}
                                    />
                                </div>
                                <div className="md:col-span-2 grid grid-cols-1 gap-4">
                                    {hasTitle && (
                                        <AdminInput
                                            label="Section Title"
                                            name={`pages.home.sections.${key}.title`}
                                            value={(section as any).title}
                                            onChange={e => handleNestedChange(e.target.name, e.target.value)}
                                        />
                                    )}
                                    {hasSubtitle && (
                                        <AdminTextarea
                                            label="Section Subtitle"
                                            name={`pages.home.sections.${key}.subtitle`}
                                            value={(section as any).subtitle}
                                            onChange={e => handleNestedChange(e.target.name, e.target.value)}
                                            rows={2}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    <h4 className="font-bold text-xl mt-8 mb-4 text-[var(--color-secondary)]">Hero Section</h4>
                    <div className="p-4 border border-gray-700 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <AdminInput label="Title" name="pages.home.hero.title" value={localData.pages.home.hero.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <AdminInput label="License Info" name="pages.home.hero.licenseInfo" value={localData.pages.home.hero.licenseInfo} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <AdminInput label="Subtitle" name="pages.home.hero.subtitle" value={localData.pages.home.hero.subtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <AdminInput label="Button Text" name="pages.home.hero.buttonText" value={localData.pages.home.hero.buttonText} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        </div>
                        <div className="mt-4">
                            <AdminTextarea label="Description" name="pages.home.hero.description" value={localData.pages.home.hero.description} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        </div>
                        
                        <h5 className="mt-6 font-semibold text-lg text-white">Slider Images</h5>
                        <p className="text-[var(--color-muted-text)] mb-4 text-sm">Manage the background images for the main banner.</p>
                        <div className="space-y-3 mt-2">
                            {localData.pages.home.hero.images.map((img, index) => (
                                <div key={index} className="flex items-center gap-2">
                                     <input
                                        type="text"
                                        aria-label={`Image ${index + 1} URL`}
                                        value={img}
                                        onChange={(e) => handleNestedChange(`pages.home.hero.images.${index}`, e.target.value)}
                                        className="w-full bg-[var(--color-dark-bg)] border border-gray-600 rounded-md py-2 px-3 text-[var(--color-light-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => deleteListItem('pages.home.hero.images', index)}
                                        className="bg-red-600 text-white px-3 py-2 rounded self-center h-10 hover:bg-red-700 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => addListItem('pages.home.hero.images', 'https://i.postimg.cc/x1gn4TDd/ad.jpg')}
                            className="mt-3 bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-colors"
                        >
                            Add New Slider Image
                        </button>
                    </div>
                </Section>
                
                <Section title="Services Page">
                    <AdminInput label="Page Title" name="pages.services.pageBanner.title" value={localData.pages.services.pageBanner.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <div className="mt-2">
                        <AdminTextarea label="Page Subtitle" name="pages.services.pageBanner.subtitle" value={localData.pages.services.pageBanner.subtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    </div>
                    <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">Services List</h4>
                    {localData.pages.services.list.map((service, index) => (
                        <div key={service.title + index} className="mb-4 p-3 border border-gray-600 rounded-md">
                            <div className="flex justify-between items-start mb-2">
                                <ToggleSwitch label="Visible" enabled={service.enabled} onChange={val => handleListChange('pages.services.list', index, 'enabled', val)} />
                                <button onClick={() => deleteListItem('pages.services.list', index)} className="bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                            </div>
                            <AdminInput label="Icon" name={`icon`} value={service.icon} onChange={e => handleListChange('pages.services.list', index, e.target.name, e.target.value)} />
                            <AdminInput label="Title" name={`title`} value={service.title} onChange={e => handleListChange('pages.services.list', index, e.target.name, e.target.value)} className="mt-2"/>
                            <AdminTextarea label="Short Description" name={`description`} value={service.description} onChange={e => handleListChange('pages.services.list', index, e.target.name, e.target.value)} />
                            <AdminTextarea label="Details (one per line)" name={`details`} value={service.details.join('\n')} onChange={e => handleListChange('pages.services.list', index, 'details', e.target.value.split('\n'))} rows={5}/>
                        </div>
                    ))}
                    <button onClick={() => addListItem('pages.services.list', { icon: 'Default', title: 'New Service', description: '', details: [], enabled: true })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Service</button>
                </Section>

                <Section title="Packages Page">
                     <AdminInput label="Page Title" name="pages.packages.pageBanner.title" value={localData.pages.packages.pageBanner.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                     <AdminTextarea label="Page Subtitle" name="pages.packages.pageBanner.subtitle" value={localData.pages.packages.pageBanner.subtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />

                    <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">Hajj Pre-Registration</h4>
                     <div className="p-4 border border-gray-700 rounded-lg">
                        <AdminInput label="Title" name="pages.packages.hajjPreRegistration.title" value={localData.pages.packages.hajjPreRegistration.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminTextarea label="Description" name="pages.packages.hajjPreRegistration.description" value={localData.pages.packages.hajjPreRegistration.description} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminTextarea label="Sub-Description" name="pages.packages.hajjPreRegistration.subDescription" value={localData.pages.packages.hajjPreRegistration.subDescription} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminInput label="Button Text" name="pages.packages.hajjPreRegistration.buttonText" value={localData.pages.packages.hajjPreRegistration.buttonText} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminInput label="Image URL" name="pages.packages.hajjPreRegistration.image" value={localData.pages.packages.hajjPreRegistration.image} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminInput label="Inquiry Subject" name="pages.packages.hajjPreRegistration.inquirySubject" value={localData.pages.packages.hajjPreRegistration.inquirySubject} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    </div>

                    <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">Key Highlights</h4>
                     <div className="p-4 border border-gray-700 rounded-lg">
                        <AdminInput label="Title" name="pages.packages.keyHighlights.title" value={localData.pages.packages.keyHighlights.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminInput label="Umrah Stat" name="pages.packages.keyHighlights.umrahStat" value={localData.pages.packages.keyHighlights.umrahStat} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminInput label="Umrah Stat Label" name="pages.packages.keyHighlights.umrahStatLabel" value={localData.pages.packages.keyHighlights.umrahStatLabel} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminInput label="Hajj Stat" name="pages.packages.keyHighlights.hajjStat" value={localData.pages.packages.keyHighlights.hajjStat} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminInput label="Hajj Stat Label" name="pages.packages.keyHighlights.hajjStatLabel" value={localData.pages.packages.keyHighlights.hajjStatLabel} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    </div>

                     <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">Gallery</h4>
                    <div className="p-4 border border-gray-700 rounded-lg">
                        <AdminInput label="Title" name="pages.packages.gallery.title" value={localData.pages.packages.gallery.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminTextarea label="Description" name="pages.packages.gallery.description" value={localData.pages.packages.gallery.description} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        {localData.pages.packages.gallery.images.map((img, index) => (
                            <div key={index} className="p-3 border border-gray-600 rounded-md mt-2">
                                <ToggleSwitch label="Visible" enabled={img.enabled} onChange={val => handleListChange('pages.packages.gallery.images', index, 'enabled', val)} />
                                <AdminInput label="Image URL" name="src" value={img.src} onChange={e => handleListChange('pages.packages.gallery.images', index, e.target.name, e.target.value)} />
                                <AdminInput label="Alt Text" name="alt" value={img.alt} onChange={e => handleListChange('pages.packages.gallery.images', index, e.target.name, e.target.value)} />
                                <button onClick={() => deleteListItem('pages.packages.gallery.images', index)} className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                            </div>
                        ))}
                        <button onClick={() => addListItem('pages.packages.gallery.images', { src: '', alt: '', enabled: true })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Image</button>
                    </div>
                </Section>
                
                <Section title="Package Management">
                    <div className="flex border-b border-gray-700 mb-6">
                        <button 
                            className={`px-4 py-2 font-semibold ${activePackageTab === 'hajj' ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' : 'text-[var(--color-muted-text)]'}`}
                            onClick={() => setActivePackageTab('hajj')}
                        >
                            Hajj Packages
                        </button>
                        <button 
                            className={`px-4 py-2 font-semibold ${activePackageTab === 'umrah' ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' : 'text-[var(--color-muted-text)]'}`}
                            onClick={() => setActivePackageTab('umrah')}
                        >
                            Umrah Packages
                        </button>
                    </div>

                    {activePackageTab === 'hajj' && (
                        <div>
                            {localData.hajjPackages.map((pkg, index) => (
                                <PackageEditor
                                    key={pkg.name + index}
                                    pkg={pkg}
                                    index={index}
                                    packageType="hajj"
                                    onChange={handleListChange}
                                    onDelete={deleteListItem}
                                />
                            ))}
                            <button 
                                onClick={() => addListItem('hajjPackages', { name: 'New Hajj Package', price: '0', duration: '', category: 'New Category', shortDescription: '', hotelMakkah: '', hotelMadinah: '', flightsUp: '', flightsDown: '', food: '', special: '', note: '', image: '', enabled: true })} 
                                className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Add Hajj Package
                            </button>
                        </div>
                    )}

                    {activePackageTab === 'umrah' && (
                        <div>
                            {localData.umrahPackages.map((pkg, index) => (
                                <PackageEditor
                                    key={pkg.name + index}
                                    pkg={pkg}
                                    index={index}
                                    packageType="umrah"
                                    onChange={handleListChange}
                                    onDelete={deleteListItem}
                                />
                            ))}
                            <button 
                                onClick={() => addListItem('umrahPackages', { name: 'New Umrah Package', price: '0', date: '', category: 'New Category', shortDescription: '', hotelMakkah: '', hotelMadinah: '', flightsUp: '', flightsDown: '', food: '', special: '', note: '', image: '', buttonText: 'Book Now', enabled: true })}
                                className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Add Umrah Package
                            </button>
                        </div>
                    )}
                </Section>
                
                <Section title="Hajj & Umrah Pages">
                    <h4 className="font-bold text-xl mb-4 text-[var(--color-secondary)]">Hajj Page Banner & Filters</h4>
                    <div className="p-4 border border-gray-700 rounded-lg mb-6">
                        <AdminInput 
                            label="Page Title" 
                            name="pages.hajj.pageBanner.title" 
                            value={localData.pages.hajj.pageBanner.title} 
                            onChange={e => handleNestedChange(e.target.name, e.target.value)} 
                        />
                        <AdminTextarea 
                            label="Page Subtitle" 
                            name="pages.hajj.pageBanner.subtitle" 
                            value={localData.pages.hajj.pageBanner.subtitle} 
                            onChange={e => handleNestedChange(e.target.name, e.target.value)} 
                        />
                         <AdminInput 
                            label="Banner Background Image URL"
                            name="pages.hajj.pageBanner.backgroundImage"
                            value={localData.pages.hajj.pageBanner.backgroundImage || ''}
                            onChange={e => handleNestedChange(e.target.name, e.target.value)}
                            className="mt-2"
                        />
                         <h5 className="font-semibold text-lg text-white mt-6 mb-2">Category Filters</h5>
                        <div className="space-y-4">
                            {localData.pages.hajj.filters.map((filter, index) => (
                                <div key={index} className="p-4 border border-gray-600 rounded-md bg-[var(--color-dark-bg)]">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-bold text-[var(--color-light-text)]">{filter.label || 'New Filter'}</p>
                                        <button
                                            onClick={() => deleteListItem('pages.hajj.filters', index)}
                                            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <AdminInput 
                                        label="Label (Button Text)" 
                                        name="label" 
                                        value={filter.label} 
                                        onChange={e => handleListChange('pages.hajj.filters', index, e.target.name, e.target.value)}
                                    />
                                    <AdminInput 
                                        label="Category (Must match package category exactly)" 
                                        name="category" 
                                        value={filter.category} 
                                        onChange={e => handleListChange('pages.hajj.filters', index, e.target.name, e.target.value)}
                                        className="mt-2"
                                    />
                                    <AdminTextarea 
                                        label="Icon (SVG Path Data)" 
                                        name="icon" 
                                        value={filter.icon} 
                                        onChange={e => handleListChange('pages.hajj.filters', index, e.target.name, e.target.value)}
                                        rows={3}
                                    />
                                </div>
                            ))}
                            <button
                                onClick={() => addListItem('pages.hajj.filters', { label: 'New Category', category: 'New Category', icon: '<path ... />' })}
                                className="mt-2 bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm hover:bg-blue-700"
                            >
                                Add Hajj Filter
                            </button>
                        </div>
                    </div>

                    <h4 className="font-bold text-xl mb-4 text-[var(--color-secondary)]">Umrah Page Banner & Filters</h4>
                    <div className="p-4 border border-gray-700 rounded-lg">
                        <AdminInput 
                            label="Page Title" 
                            name="pages.umrah.pageBanner.title" 
                            value={localData.pages.umrah.pageBanner.title} 
                            onChange={e => handleNestedChange(e.target.name, e.target.value)} 
                        />
                        <AdminTextarea 
                            label="Page Subtitle" 
                            name="pages.umrah.pageBanner.subtitle" 
                            value={localData.pages.umrah.pageBanner.subtitle} 
                            onChange={e => handleNestedChange(e.target.name, e.target.value)} 
                        />
                        <AdminInput 
                            label="Banner Background Image URL"
                            name="pages.umrah.pageBanner.backgroundImage"
                            value={localData.pages.umrah.pageBanner.backgroundImage || ''}
                            onChange={e => handleNestedChange(e.target.name, e.target.value)}
                            className="mt-2"
                        />

                        <h5 className="font-semibold text-lg text-white mt-6 mb-2">Category Filters</h5>
                        <div className="space-y-4">
                            {localData.pages.umrah.filters.map((filter, index) => (
                                <div key={index} className="p-4 border border-gray-600 rounded-md bg-[var(--color-dark-bg)]">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-bold text-[var(--color-light-text)]">{filter.label || 'New Filter'}</p>
                                        <button
                                            onClick={() => deleteListItem('pages.umrah.filters', index)}
                                            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <AdminInput 
                                        label="Label (Button Text)" 
                                        name="label" 
                                        value={filter.label} 
                                        onChange={e => handleListChange('pages.umrah.filters', index, e.target.name, e.target.value)}
                                    />
                                    <AdminInput 
                                        label="Category (Must match package category exactly)" 
                                        name="category" 
                                        value={filter.category} 
                                        onChange={e => handleListChange('pages.umrah.filters', index, e.target.name, e.target.value)}
                                        className="mt-2"
                                    />
                                    <AdminTextarea 
                                        label="Icon (SVG Path Data)" 
                                        name="icon" 
                                        value={filter.icon} 
                                        onChange={e => handleListChange('pages.umrah.filters', index, e.target.name, e.target.value)}
                                        rows={3}
                                    />
                                </div>
                            ))}
                            <button
                                onClick={() => addListItem('pages.umrah.filters', { label: 'New Category', category: 'New Category', icon: '<path ... />' })}
                                className="mt-2 bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm hover:bg-blue-700"
                            >
                                Add Umrah Filter
                            </button>
                        </div>
                    </div>
                </Section>

                 <Section title="Why Choose Us Page (Bilingual)">
                    <div className="p-4 border border-gray-700 rounded-lg mb-4">
                        <h4 className="font-bold text-xl mb-2 text-[var(--color-secondary)]">English Content</h4>
                        <AdminInput label="Title (EN)" name="pages.whyChooseChampion.en.title" value={localData.pages.whyChooseChampion.en.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminTextarea label="Subtitle (EN)" name="pages.whyChooseChampion.en.subtitle" value={localData.pages.whyChooseChampion.en.subtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <h5 className="font-semibold text-lg mt-4 mb-2 text-white">Feature Sections (EN)</h5>
                        {localData.pages.whyChooseChampion.en.sections.map((section, index) => (
                             <div key={index} className="mb-4 p-3 border border-gray-600 rounded-md">
                                <ToggleSwitch label="Visible" enabled={section.enabled} onChange={val => handleListChange('pages.whyChooseChampion.en.sections', index, 'enabled', val)} />
                                <AdminInput label="Icon" name="icon" value={section.icon} onChange={e => handleListChange('pages.whyChooseChampion.en.sections', index, e.target.name, e.target.value)} />
                                <AdminInput label="Title" name="title" value={section.title} onChange={e => handleListChange('pages.whyChooseChampion.en.sections', index, e.target.name, e.target.value)} />
                                <AdminTextarea label="Description" name="description" value={section.description} onChange={e => handleListChange('pages.whyChooseChampion.en.sections', index, e.target.name, e.target.value)} />
                                <button onClick={() => deleteListItem('pages.whyChooseChampion.en.sections', index)} className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                            </div>
                        ))}
                        <button onClick={() => addListItem('pages.whyChooseChampion.en.sections', { icon: 'Default', title: 'New Feature', description: '', enabled: true })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Section (EN)</button>
                    </div>

                    <div className="p-4 border border-gray-700 rounded-lg">
                        <h4 className="font-bold text-xl mb-2 text-[var(--color-secondary)]">Bengali Content</h4>
                         <AdminInput label="Title (BN)" name="pages.whyChooseChampion.bn.title" value={localData.pages.whyChooseChampion.bn.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminTextarea label="Subtitle (BN)" name="pages.whyChooseChampion.bn.subtitle" value={localData.pages.whyChooseChampion.bn.subtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                         <h5 className="font-semibold text-lg mt-4 mb-2 text-white">Feature Sections (BN)</h5>
                        {localData.pages.whyChooseChampion.bn.sections.map((section, index) => (
                             <div key={index} className="mb-4 p-3 border border-gray-600 rounded-md">
                                <ToggleSwitch label="Visible" enabled={section.enabled} onChange={val => handleListChange('pages.whyChooseChampion.bn.sections', index, 'enabled', val)} />
                                <AdminInput label="Icon" name="icon" value={section.icon} onChange={e => handleListChange('pages.whyChooseChampion.bn.sections', index, e.target.name, e.target.value)} />
                                <AdminInput label="Title" name="title" value={section.title} onChange={e => handleListChange('pages.whyChooseChampion.bn.sections', index, e.target.name, e.target.value)} />
                                <AdminTextarea label="Description" name="description" value={section.description} onChange={e => handleListChange('pages.whyChooseChampion.bn.sections', index, e.target.name, e.target.value)} />
                                <button onClick={() => deleteListItem('pages.whyChooseChampion.bn.sections', index)} className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                            </div>
                        ))}
                        <button onClick={() => addListItem('pages.whyChooseChampion.bn.sections', { icon: 'Default', title: 'নতুন বৈশিষ্ট্য', description: '', enabled: true })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Section (BN)</button>
                    </div>
                </Section>

                <Section title="Custom Pages Management">
                    <p className="text-[var(--color-muted-text)] mb-4">Create and manage new content pages for your website. After creating a page, add a link to it in the "Header &amp; Navigation Bar" section.</p>
                    {localData.customPages?.map((customPage, index) => (
                        <div key={customPage.id + index} className="mb-6 p-4 border border-gray-700 rounded-md">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-bold text-xl text-[var(--color-secondary)]">{customPage.title || `Custom Page ${index + 1}`}</h4>
                                <div className="flex items-center gap-4">
                                    <ToggleSwitch
                                        label="Visible"
                                        enabled={customPage.enabled}
                                        onChange={(enabled) => handleListChange('customPages', index, 'enabled', enabled)}
                                    />
                                    <button onClick={() => deleteListItem('customPages', index)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AdminInput
                                    label="Page ID / URL (e.g., #about-us)"
                                    name="id"
                                    value={customPage.id}
                                    onChange={e => handleListChange('customPages', index, e.target.name, e.target.value)}
                                />
                                <AdminInput
                                    label="Page Title"
                                    name="title"
                                    value={customPage.title}
                                    onChange={e => handleListChange('customPages', index, e.target.name, e.target.value)}
                                />
                            </div>
                            <div className="mt-4">
                                <AdminInput
                                    label="Banner Subtitle"
                                    name="bannerSubtitle"
                                    value={customPage.bannerSubtitle}
                                    onChange={e => handleListChange('customPages', index, e.target.name, e.target.value)}
                                />
                            </div>
                             <div className="mt-4">
                                <h5 className="font-semibold text-lg text-white mb-2">Page Content Blocks</h5>
                                <div className="space-y-4">
                                    {customPage.contentBlocks?.map((block, blockIndex) => (
                                        <div key={blockIndex} className="p-4 border border-gray-600 rounded-md bg-[var(--color-dark-bg)]">
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="font-bold text-sm text-gray-400 uppercase">{block.type} Block</span>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => moveListItem(`customPages.${index}.contentBlocks`, blockIndex, blockIndex - 1)}
                                                        disabled={blockIndex === 0}
                                                        className="p-1 disabled:opacity-50 text-gray-400 hover:text-white"
                                                        aria-label="Move block up"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => moveListItem(`customPages.${index}.contentBlocks`, blockIndex, blockIndex + 1)}
                                                        disabled={blockIndex === (customPage.contentBlocks?.length || 0) - 1}
                                                        className="p-1 disabled:opacity-50 text-gray-400 hover:text-white"
                                                        aria-label="Move block down"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteListItem(`customPages.${index}.contentBlocks`, blockIndex)}
                                                        className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                                                    >
                                                        Delete Block
                                                    </button>
                                                </div>
                                            </div>

                                            {block.type === 'html' && (
                                                <AdminTextarea
                                                    label="HTML Content"
                                                    name="content"
                                                    value={block.content}
                                                    onChange={e => handleListChange(`customPages.${index}.contentBlocks`, blockIndex, 'content', e.target.value)}
                                                    rows={8}
                                                />
                                            )}
                                            {block.type === 'image' && (
                                                <div className="space-y-2">
                                                    <AdminInput
                                                        label="Image URL"
                                                        name="src"
                                                        value={block.src}
                                                        onChange={e => handleListChange(`customPages.${index}.contentBlocks`, blockIndex, 'src', e.target.value)}
                                                    />
                                                    <AdminInput
                                                        label="Alt Text (for accessibility)"
                                                        name="alt"
                                                        value={block.alt}
                                                        onChange={e => handleListChange(`customPages.${index}.contentBlocks`, blockIndex, 'alt', e.target.value)}
                                                    />
                                                </div>
                                            )}
                                            {block.type === 'button' && (
                                                <div className="space-y-2">
                                                    <AdminInput
                                                        label="Button Text"
                                                        name="text"
                                                        value={block.text}
                                                        onChange={e => handleListChange(`customPages.${index}.contentBlocks`, blockIndex, 'text', e.target.value)}
                                                    />
                                                    <AdminInput
                                                        label="Button Link (URL)"
                                                        name="href"
                                                        value={block.href}
                                                        onChange={e => handleListChange(`customPages.${index}.contentBlocks`, blockIndex, 'href', e.target.value)}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => addListItem(`customPages.${index}.contentBlocks`, { type: 'html', content: '<p>New paragraph.</p>' })}
                                        className="bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm hover:bg-blue-700"
                                    >
                                        Add HTML Block
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => addListItem(`customPages.${index}.contentBlocks`, { type: 'image', src: 'https://via.placeholder.com/800x400', alt: 'Placeholder Image' })}
                                        className="bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm hover:bg-blue-700"
                                    >
                                        Add Image Block
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => addListItem(`customPages.${index}.contentBlocks`, { type: 'button', text: 'Click Me', href: '#' })}
                                        className="bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm hover:bg-blue-700"
                                    >
                                        Add Button Block
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <SeoEditor 
                                    pageName="Custom Page SEO" 
                                    seoPath={`customPages.${index}.seo`} 
                                    localData={localData} 
                                    onChange={handleNestedChange} 
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => addListItem('customPages', { id: '#new-page', title: 'New Custom Page', bannerSubtitle: '', contentBlocks: [{type: 'html', content: '<p>Start writing your content here.</p>'}], seo: { title: '', description: '', keywords: '' }, enabled: true })}
                        className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Add New Custom Page
                    </button>
                </Section>

                <Section title="Testimonials Page">
                    <AdminInput label="Page Title" name="pages.testimonials.pageBanner.title" value={localData.pages.testimonials.pageBanner.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <div className="mt-2">
                        <AdminTextarea label="Page Subtitle" name="pages.testimonials.pageBanner.subtitle" value={localData.pages.testimonials.pageBanner.subtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    </div>
                    <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">Testimonials List</h4>
                    {localData.pages.testimonials.list.map((testimonial, index) => (
                        <div key={testimonial.name + index} className="mb-4 p-3 border border-gray-600 rounded-md">
                             <div className="flex justify-between items-start mb-2">
                                <ToggleSwitch label="Visible" enabled={testimonial.enabled} onChange={val => handleListChange('pages.testimonials.list', index, 'enabled', val)} />
                                <button onClick={() => deleteListItem('pages.testimonials.list', index)} className="bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                            </div>
                            <AdminInput label="Name" name={`name`} value={testimonial.name} onChange={e => handleListChange('pages.testimonials.list', index, e.target.name, e.target.value)} />
                            <AdminInput label="Title/Role" name={`title`} value={testimonial.title} onChange={e => handleListChange('pages.testimonials.list', index, e.target.name, e.target.value)} className="mt-2" />
                            <AdminInput label="Avatar Image URL" name={`avatar`} value={testimonial.avatar} onChange={e => handleListChange('pages.testimonials.list', index, e.target.name, e.target.value)} className="mt-2" />
                            <AdminTextarea label="Quote" name={`quote`} value={testimonial.quote} onChange={e => handleListChange('pages.testimonials.list', index, e.target.name, e.target.value)} />
                        </div>
                    ))}
                     <button onClick={() => addListItem('pages.testimonials.list', { quote: '', name: '', title: '', avatar: '', enabled: true })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Testimonial</button>
                </Section>

                <Section title="Visa Processing Page">
                    <AdminInput label="Page Title" name="pages.visaProcessing.pageBanner.title" value={localData.pages.visaProcessing.pageBanner.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminTextarea label="Page Subtitle" name="pages.visaProcessing.pageBanner.subtitle" value={localData.pages.visaProcessing.pageBanner.subtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    
                    <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">"What We Offer" Section</h4>
                    <AdminInput label="Offer Section Title" name="pages.visaProcessing.offerTitle" value={localData.pages.visaProcessing.offerTitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    {localData.pages.visaProcessing.offerList.map((item, index) => (
                         <div key={index} className="mb-4 p-3 border border-gray-600 rounded-md">
                            <div className="flex justify-between items-start mb-2">
                                <ToggleSwitch label="Visible" enabled={item.enabled} onChange={val => handleListChange('pages.visaProcessing.offerList', index, 'enabled', val)} />
                                <button onClick={() => deleteListItem('pages.visaProcessing.offerList', index)} className="bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                            </div>
                            <AdminInput label="Icon" name={`icon`} value={item.icon} onChange={e => handleListChange('pages.visaProcessing.offerList', index, e.target.name, e.target.value)} />
                            <AdminInput label="Title" name={`title`} value={item.title} onChange={e => handleListChange('pages.visaProcessing.offerList', index, e.target.name, e.target.value)} className="mt-2"/>
                            <AdminTextarea label="Description" name={`description`} value={item.description} onChange={e => handleListChange('pages.visaProcessing.offerList', index, e.target.name, e.target.value)} />
                        </div>
                    ))}
                    <button onClick={() => addListItem('pages.visaProcessing.offerList', { icon: 'Default', title: 'New Offer', description: '', enabled: true })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Offer</button>

                    <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">"Our Process" Section</h4>
                     <AdminInput label="Process Section Title" name="pages.visaProcessing.processTitle" value={localData.pages.visaProcessing.processTitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    {localData.pages.visaProcessing.processSteps.map((item, index) => (
                        <div key={index} className="mb-4 p-3 border border-gray-600 rounded-md">
                            <div className="flex justify-between items-start mb-2">
                                <ToggleSwitch label="Visible" enabled={item.enabled} onChange={val => handleListChange('pages.visaProcessing.processSteps', index, 'enabled', val)} />
                                <button onClick={() => deleteListItem('pages.visaProcessing.processSteps', index)} className="bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                            </div>
                            <AdminInput label="Icon" name={`icon`} value={item.icon} onChange={e => handleListChange('pages.visaProcessing.processSteps', index, e.target.name, e.target.value)} />
                            <AdminInput label="Title" name={`title`} value={item.title} onChange={e => handleListChange('pages.visaProcessing.processSteps', index, e.target.name, e.target.value)} className="mt-2"/>
                            <AdminTextarea label="Description" name={`description`} value={item.description} onChange={e => handleListChange('pages.visaProcessing.processSteps', index, e.target.name, e.target.value)} />
                        </div>
                    ))}
                    <button onClick={() => addListItem('pages.visaProcessing.processSteps', { icon: 'Default', title: 'New Step', description: '', enabled: true })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Step</button>
                    
                    <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">"Why Choose Us" Section</h4>
                     <AdminInput label="Why Choose Us Section Title" name="pages.visaProcessing.whyChooseUsTitle" value={localData.pages.visaProcessing.whyChooseUsTitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    {localData.pages.visaProcessing.whyChooseUsFeatures.map((item, index) => (
                        <div key={index} className="mb-4 p-3 border border-gray-600 rounded-md">
                            <div className="flex justify-between items-start mb-2">
                                <ToggleSwitch label="Visible" enabled={item.enabled} onChange={val => handleListChange('pages.visaProcessing.whyChooseUsFeatures', index, 'enabled', val)} />
                                <button onClick={() => deleteListItem('pages.visaProcessing.whyChooseUsFeatures', index)} className="bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                            </div>
                            <AdminInput label="Icon" name={`icon`} value={item.icon} onChange={e => handleListChange('pages.visaProcessing.whyChooseUsFeatures', index, e.target.name, e.target.value)} />
                            <AdminInput label="Title" name={`title`} value={item.title} onChange={e => handleListChange('pages.visaProcessing.whyChooseUsFeatures', index, e.target.name, e.target.value)} className="mt-2"/>
                            <AdminTextarea label="Description" name={`description`} value={item.description} onChange={e => handleListChange('pages.visaProcessing.whyChooseUsFeatures', index, e.target.name, e.target.value)} />
                        </div>
                    ))}
                    <button onClick={() => addListItem('pages.visaProcessing.whyChooseUsFeatures', { icon: 'Default', title: 'New Feature', description: '', enabled: true })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Feature</button>

                    <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">Visa Inquiry Form</h4>
                    <AdminInput label="Form Title" name="pages.visaProcessing.form.title" value={localData.pages.visaProcessing.form.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminTextarea label="Form Subtitle" name="pages.visaProcessing.form.subtitle" value={localData.pages.visaProcessing.form.subtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminInput label="Button Text" name="pages.visaProcessing.form.buttonText" value={localData.pages.visaProcessing.form.buttonText} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2"/>
                    <AdminInput label="Google Apps Script URL" name="pages.visaProcessing.googleAppsScriptUrl" value={localData.pages.visaProcessing.googleAppsScriptUrl} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" placeholder="Enter the URL for visa form submissions" />
                </Section>
                
                 <Section title="Air Ticketing Page">
                    <AdminInput label="Page Title" name="pages.airTicketing.pageBanner.title" value={localData.pages.airTicketing.pageBanner.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminTextarea label="Page Subtitle" name="pages.airTicketing.pageBanner.subtitle" value={localData.pages.airTicketing.pageBanner.subtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    
                    <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">Features Section</h4>
                    {localData.pages.airTicketing.features.map((item, index) => (
                         <div key={index} className="mb-4 p-3 border border-gray-600 rounded-md">
                            <div className="flex justify-between items-start mb-2">
                                <ToggleSwitch label="Visible" enabled={item.enabled} onChange={val => handleListChange('pages.airTicketing.features', index, 'enabled', val)} />
                                <button onClick={() => deleteListItem('pages.airTicketing.features', index)} className="bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                            </div>
                            <AdminInput label="Icon" name={`icon`} value={item.icon} onChange={e => handleListChange('pages.airTicketing.features', index, e.target.name, e.target.value)} />
                            <AdminInput label="Title" name={`title`} value={item.title} onChange={e => handleListChange('pages.airTicketing.features', index, e.target.name, e.target.value)} className="mt-2"/>
                            <AdminTextarea label="Description" name={`description`} value={item.description} onChange={e => handleListChange('pages.airTicketing.features', index, e.target.name, e.target.value)} />
                        </div>
                    ))}
                    <button onClick={() => addListItem('pages.airTicketing.features', { icon: 'Default', title: 'New Feature', description: '', enabled: true })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Feature</button>
                    
                    <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">Flight Inquiry Form</h4>
                    <AdminInput label="Form Title" name="pages.airTicketing.form.title" value={localData.pages.airTicketing.form.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminTextarea label="Form Subtitle" name="pages.airTicketing.form.subtitle" value={localData.pages.airTicketing.form.subtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminInput label="Button Text" name="pages.airTicketing.form.buttonText" value={localData.pages.airTicketing.form.buttonText} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2"/>
                    <AdminInput label="Google Apps Script URL" name="pages.airTicketing.googleAppsScriptUrl" value={localData.pages.airTicketing.googleAppsScriptUrl} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" placeholder="Enter the URL for flight form submissions" />
                </Section>
                
                <Section title="Team Page">
                    <AdminInput label="Page Title" name="pages.team.pageBanner.title" value={localData.pages.team.pageBanner.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminTextarea label="Page Subtitle" name="pages.team.pageBanner.subtitle" value={localData.pages.team.pageBanner.subtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />

                    <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">Chairman Section</h4>
                    <div className="p-4 border border-gray-700 rounded-lg">
                        <ToggleSwitch label="Show Chairman Section" enabled={localData.pages.team.chairman.enabled} onChange={val => handleNestedChange('pages.team.chairman.enabled', val)} />
                        <AdminInput label="Section Title" name="pages.team.chairmanTitle" value={localData.pages.team.chairmanTitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-4" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <AdminInput label="Name" name="pages.team.chairman.name" value={localData.pages.team.chairman.name} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <AdminInput label="Role" name="pages.team.chairman.role" value={localData.pages.team.chairman.role} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        </div>
                        <AdminInput label="Image URL" name="pages.team.chairman.imageUrl" value={localData.pages.team.chairman.imageUrl} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" />
                        <h5 className="font-semibold text-md text-white mt-4 mb-2">Contact Details</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <AdminInput label="Email" name="pages.team.chairman.socials.email" value={localData.pages.team.chairman.socials?.email || ''} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <AdminInput label="Facebook URL" name="pages.team.chairman.socials.facebook" value={localData.pages.team.chairman.socials?.facebook || ''} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <AdminInput label="Phone" name="pages.team.chairman.socials.phone" value={localData.pages.team.chairman.socials?.phone || ''} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <AdminInput label="WhatsApp Number" name="pages.team.chairman.socials.whatsapp" value={localData.pages.team.chairman.socials?.whatsapp || ''} onChange={e => handleNestedChange(e.target.name, e.target.value)} placeholder="e.g. 88017..." />
                        </div>
                    </div>

                    <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">Talented Employees Section</h4>
                    <AdminInput label="Section Title" name="pages.team.employeesTitle" value={localData.pages.team.employeesTitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminTextarea label="Section Subtitle" name="pages.team.employeesSubtitle" value={localData.pages.team.employeesSubtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    {localData.pages.team.talentedEmployees.map((member, index) => (
                         <div key={member.name + index} className="mb-4 p-3 border border-gray-600 rounded-md">
                            <div className="flex justify-between items-start mb-2">
                                <h5 className="font-bold text-[var(--color-light-text)]">{member.name || `Member ${index + 1}`}</h5>
                                <div className="flex items-center gap-4">
                                    <ToggleSwitch label="Visible" enabled={member.enabled} onChange={val => handleListChange('pages.team.talentedEmployees', index, 'enabled', val)} />
                                    <button onClick={() => deleteListItem('pages.team.talentedEmployees', index)} className="bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AdminInput label="Name" name={`name`} value={member.name} onChange={e => handleListChange('pages.team.talentedEmployees', index, e.target.name, e.target.value)} />
                                <AdminInput label="Role" name={`role`} value={member.role} onChange={e => handleListChange('pages.team.talentedEmployees', index, e.target.name, e.target.value)} />
                            </div>
                            <AdminInput label="Image URL" name={`imageUrl`} value={member.imageUrl} onChange={e => handleListChange('pages.team.talentedEmployees', index, e.target.name, e.target.value)} className="mt-2"/>
                            <h6 className="font-semibold text-md text-white mt-4 mb-2">Contact Details</h6>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AdminInput label="Email" name={`socials.email`} value={member.socials?.email || ''} onChange={e => handleListChange('pages.team.talentedEmployees', index, e.target.name, e.target.value)} />
                                <AdminInput label="Facebook URL" name={`socials.facebook`} value={member.socials?.facebook || ''} onChange={e => handleListChange('pages.team.talentedEmployees', index, e.target.name, e.target.value)} />
                                <AdminInput label="Phone" name={`socials.phone`} value={member.socials?.phone || ''} onChange={e => handleListChange('pages.team.talentedEmployees', index, e.target.name, e.target.value)} />
                                <AdminInput label="WhatsApp Number" name={`socials.whatsapp`} value={member.socials?.whatsapp || ''} onChange={e => handleListChange('pages.team.talentedEmployees', index, e.target.name, e.target.value)} placeholder="e.g. 88017..." />
                            </div>
                        </div>
                    ))}
                     <button onClick={() => addListItem('pages.team.talentedEmployees', { name: 'New Member', role: 'Employee', imageUrl: '', enabled: true, socials: { facebook: '', phone: '', whatsapp: '', email: '' } })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Team Member</button>
                </Section>

                <Section title="Contact Page">
                    <AdminInput label="Page Title" name="pages.contact.pageBanner.title" value={localData.pages.contact.pageBanner.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminTextarea label="Page Subtitle" name="pages.contact.pageBanner.subtitle" value={localData.pages.contact.pageBanner.subtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />

                    <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">Info Section</h4>
                    <AdminInput label="Info Title" name="pages.contact.infoTitle" value={localData.pages.contact.infoTitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminTextarea label="Info Subtitle" name="pages.contact.infoSubtitle" value={localData.pages.contact.infoSubtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminInput label="Map Background URL" name="pages.contact.mapUrl" value={localData.pages.contact.mapUrl} onChange={e => handleNestedChange(e.target.name, e.target.value)} />

                     <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">Contact Info Items</h4>
                     {localData.pages.contact.contactInfo.map((info, index) => (
                         <div key={index} className="mb-4 p-3 border border-gray-600 rounded-md">
                            <div className="flex justify-between items-start mb-2">
                                <ToggleSwitch label="Visible" enabled={info.enabled} onChange={val => handleListChange('pages.contact.contactInfo', index, 'enabled', val)} />
                                <button onClick={() => deleteListItem('pages.contact.contactInfo', index)} className="bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                            </div>
                             <AdminInput label="Label (e.g., Address)" name={`label`} value={info.label} onChange={e => handleListChange('pages.contact.contactInfo', index, e.target.name, e.target.value)} />
                             <AdminTextarea label="Value" name={`value`} value={info.value} onChange={e => handleListChange('pages.contact.contactInfo', index, e.target.name, e.target.value)} />
                             <AdminTextarea label="Icon (SVG Code)" name={`icon`} value={info.icon} onChange={e => handleListChange('pages.contact.contactInfo', index, e.target.name, e.target.value)} />
                         </div>
                     ))}
                    <button onClick={() => addListItem('pages.contact.contactInfo', { icon: '', label: 'New Info', value: '', enabled: true })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Contact Info</button>

                    <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">Form Section</h4>
                    <AdminInput label="Form Title" name="pages.contact.formTitle" value={localData.pages.contact.formTitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminInput label="Form Button Text" name="pages.contact.formButtonText" value={localData.pages.contact.formButtonText} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" />
                    <AdminInput label="Google Apps Script URL" name="pages.contact.googleAppsScriptUrl" value={localData.pages.contact.googleAppsScriptUrl} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" placeholder="Enter URL for general contact form"/>

                    <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">Accreditations</h4>
                    <AdminInput label="Section Title" name="pages.contact.accreditationsTitle" value={localData.pages.contact.accreditationsTitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminInput label="Image URL" name="pages.contact.accreditationsImage" value={localData.pages.contact.accreditationsImage} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" />
                </Section>
                
                <Section title="Guidelines Pages Management">
                    <Section title="Hajj Guide (Bangla)">
                        <div className="space-y-4">
                            <AdminInput label="Page Title" name="pages.hajjGuide.pageBanner.title" value={localData.pages.hajjGuide.pageBanner.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <AdminTextarea label="Page Subtitle" name="pages.hajjGuide.pageBanner.subtitle" value={localData.pages.hajjGuide.pageBanner.subtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            
                            <h4 className="font-bold text-xl mt-4 mb-2 text-[var(--color-secondary)]">Types of Hajj</h4>
                            <AdminInput label="Title" name="pages.hajjGuide.types.title" value={localData.pages.hajjGuide.types.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <AdminTextarea label="Intro" name="pages.hajjGuide.types.intro" value={localData.pages.hajjGuide.types.intro} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            {localData.pages.hajjGuide.types.list.map((item, index) => (
                                <div key={index} className="p-3 border border-gray-600 rounded-md">
                                    <div className="flex justify-between items-center mb-2">
                                        <ToggleSwitch label="Visible" enabled={item.enabled} onChange={val => handleListChange('pages.hajjGuide.types.list', index, 'enabled', val)} />
                                        <button onClick={() => deleteListItem('pages.hajjGuide.types.list', index)} className="bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                                    </div>
                                    <AdminInput label="Title" name="title" value={item.title} onChange={e => handleListChange('pages.hajjGuide.types.list', index, e.target.name, e.target.value)} />
                                    <AdminTextarea label="Description" name="description" value={item.description} onChange={e => handleListChange('pages.hajjGuide.types.list', index, e.target.name, e.target.value)} />
                                </div>
                            ))}
                            <button onClick={() => addListItem('pages.hajjGuide.types.list', { title: 'New Type', description: '', enabled: true })} className="bg-green-600 text-white font-bold py-2 px-4 rounded text-sm">Add Hajj Type</button>

                             <h4 className="font-bold text-xl mt-4 mb-2 text-[var(--color-secondary)]">Faraj of Hajj</h4>
                            <AdminInput label="Title" name="pages.hajjGuide.faraj.title" value={localData.pages.hajjGuide.faraj.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <AdminTextarea label="Intro" name="pages.hajjGuide.faraj.intro" value={localData.pages.hajjGuide.faraj.intro} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            {localData.pages.hajjGuide.faraj.list.map((item, index) => (
                                <div key={index} className="p-3 border border-gray-600 rounded-md">
                                    <ToggleSwitch label="Visible" enabled={item.enabled} onChange={val => handleListChange('pages.hajjGuide.faraj.list', index, 'enabled', val)} />
                                    <AdminInput label="Title" name="title" value={item.title} onChange={e => handleListChange('pages.hajjGuide.faraj.list', index, e.target.name, e.target.value)} />
                                    <AdminTextarea label="Description" name="description" value={item.description} onChange={e => handleListChange('pages.hajjGuide.faraj.list', index, e.target.name, e.target.value)} />
                                    <button onClick={() => deleteListItem('pages.hajjGuide.faraj.list', index)} className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                                </div>
                            ))}
                            <button onClick={() => addListItem('pages.hajjGuide.faraj.list', { title: 'New Faraj', description: '', enabled: true })} className="bg-green-600 text-white font-bold py-2 px-4 rounded text-sm">Add Faraj</button>

                            <h4 className="font-bold text-xl mt-4 mb-2 text-[var(--color-secondary)]">Wajib of Hajj</h4>
                            <AdminInput label="Title" name="pages.hajjGuide.wajib.title" value={localData.pages.hajjGuide.wajib.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <AdminTextarea label="Intro" name="pages.hajjGuide.wajib.intro" value={localData.pages.hajjGuide.wajib.intro} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            {localData.pages.hajjGuide.wajib.list.map((item, index) => (
                                <div key={index} className="p-3 border border-gray-600 rounded-md">
                                    <ToggleSwitch label="Visible" enabled={item.enabled} onChange={val => handleListChange('pages.hajjGuide.wajib.list', index, 'enabled', val)} />
                                    <AdminInput label="Title" name="title" value={item.title} onChange={e => handleListChange('pages.hajjGuide.wajib.list', index, e.target.name, e.target.value)} />
                                    <AdminTextarea label="Description" name="description" value={item.description} onChange={e => handleListChange('pages.hajjGuide.wajib.list', index, e.target.name, e.target.value)} />
                                    <button onClick={() => deleteListItem('pages.hajjGuide.wajib.list', index)} className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                                </div>
                            ))}
                            <button onClick={() => addListItem('pages.hajjGuide.wajib.list', { title: 'New Wajib', description: '', enabled: true })} className="bg-green-600 text-white font-bold py-2 px-4 rounded text-sm">Add Wajib</button>

                            <h4 className="font-bold text-xl mt-4 mb-2 text-[var(--color-secondary)]">Do's and Don'ts</h4>
                            <AdminInput label="Title" name="pages.hajjGuide.dosAndDonts.title" value={localData.pages.hajjGuide.dosAndDonts.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <AdminTextarea label="Intro" name="pages.hajjGuide.dosAndDonts.intro" value={localData.pages.hajjGuide.dosAndDonts.intro} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <AdminInput label="Do's Title" name="pages.hajjGuide.dosAndDonts.dos.title" value={localData.pages.hajjGuide.dosAndDonts.dos.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <AdminTextarea label="Do's Items (one per line)" name="pages.hajjGuide.dosAndDonts.dos.items" value={localData.pages.hajjGuide.dosAndDonts.dos.items.join('\n')} onChange={e => handleNestedChange(e.target.name, e.target.value.split('\n'))} />
                            <AdminInput label="Don'ts Title" name="pages.hajjGuide.dosAndDonts.donts.title" value={localData.pages.hajjGuide.dosAndDonts.donts.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <AdminTextarea label="Don'ts Items (one per line)" name="pages.hajjGuide.dosAndDonts.donts.items" value={localData.pages.hajjGuide.dosAndDonts.donts.items.join('\n')} onChange={e => handleNestedChange(e.target.name, e.target.value.split('\n'))} />
                            <AdminInput label="Note" name="pages.hajjGuide.dosAndDonts.note" value={localData.pages.hajjGuide.dosAndDonts.note} onChange={e => handleNestedChange(e.target.name, e.target.value)} />

                            <h4 className="font-bold text-xl mt-4 mb-2 text-[var(--color-secondary)]">FAQ Section</h4>
                             <AdminInput label="Title" name="pages.hajjGuide.faq.title" value={localData.pages.hajjGuide.faq.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                             {localData.pages.hajjGuide.faq.items.map((item, index) => (
                                <div key={index} className="p-3 border border-gray-600 rounded-md">
                                    <div className="flex justify-between items-center mb-2">
                                        <ToggleSwitch label="Visible" enabled={item.enabled} onChange={val => handleListChange('pages.hajjGuide.faq.items', index, 'enabled', val)} />
                                        <button onClick={() => deleteListItem('pages.hajjGuide.faq.items', index)} className="bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                                    </div>
                                    <AdminInput label="Question" name="question" value={item.question} onChange={e => handleListChange('pages.hajjGuide.faq.items', index, e.target.name, e.target.value)} />
                                    <AdminTextarea label="Answer" name="answer" value={item.answer} onChange={e => handleListChange('pages.hajjGuide.faq.items', index, e.target.name, e.target.value)} />
                                </div>
                            ))}
                            <button onClick={() => addListItem('pages.hajjGuide.faq.items', { question: 'New Question?', answer: '', enabled: true })} className="bg-green-600 text-white font-bold py-2 px-4 rounded text-sm">Add FAQ</button>
                        </div>
                    </Section>

                     <Section title="Umrah Guide (Bangla)">
                        <div className="space-y-4">
                             <AdminInput label="Page Title" name="pages.umrahGuide.pageBanner.title" value={localData.pages.umrahGuide.pageBanner.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <AdminTextarea label="Page Subtitle" name="pages.umrahGuide.pageBanner.subtitle" value={localData.pages.umrahGuide.pageBanner.subtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            
                            <h4 className="font-bold text-xl mt-4 mb-2 text-[var(--color-secondary)]">Steps Section</h4>
                            <AdminInput label="Title" name="pages.umrahGuide.stepsTitle" value={localData.pages.umrahGuide.stepsTitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <AdminTextarea label="Intro" name="pages.umrahGuide.stepsIntro" value={localData.pages.umrahGuide.stepsIntro} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            {localData.pages.umrahGuide.steps.map((step, index) => (
                                <div key={index} className="p-3 border border-gray-600 rounded-md">
                                     <div className="flex justify-between items-center mb-2">
                                        <ToggleSwitch label="Visible" enabled={step.enabled} onChange={val => handleListChange('pages.umrahGuide.steps', index, 'enabled', val)} />
                                        <button onClick={() => deleteListItem('pages.umrahGuide.steps', index)} className="bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                                    </div>
                                    <AdminInput label="Title" name="title" value={step.title} onChange={e => handleListChange('pages.umrahGuide.steps', index, e.target.name, e.target.value)} />
                                    <AdminTextarea label="Description" name="description" value={step.description} onChange={e => handleListChange('pages.umrahGuide.steps', index, e.target.name, e.target.value)} />
                                    <AdminTextarea label="Points (one per line)" name="points" value={step.points.join('\n')} onChange={e => handleListChange('pages.umrahGuide.steps', index, 'points', e.target.value.split('\n'))} />
                                    <AdminInput label="Arabic Text" name="arabicText" value={step.arabicText} onChange={e => handleListChange('pages.umrahGuide.steps', index, e.target.name, e.target.value)} className="mt-2" />
                                    <AdminInput label="Arabic Meaning" name="arabicMeaning" value={step.arabicMeaning} onChange={e => handleListChange('pages.umrahGuide.steps', index, e.target.name, e.target.value)} className="mt-2" />
                                </div>
                            ))}
                            <button onClick={() => addListItem('pages.umrahGuide.steps', { title: 'New Step', description: '', points: [], enabled: true })} className="bg-green-600 text-white font-bold py-2 px-4 rounded text-sm">Add Step</button>
                            
                             <h4 className="font-bold text-xl mt-4 mb-2 text-[var(--color-secondary)]">FAQ Section</h4>
                            <AdminInput label="Title" name="pages.umrahGuide.faq.title" value={localData.pages.umrahGuide.faq.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            {localData.pages.umrahGuide.faq.items.map((item, index) => (
                                <div key={index} className="p-3 border border-gray-600 rounded-md">
                                    <ToggleSwitch label="Visible" enabled={item.enabled} onChange={val => handleListChange('pages.umrahGuide.faq.items', index, 'enabled', val)} />
                                    <AdminInput label="Question" name="question" value={item.question} onChange={e => handleListChange('pages.umrahGuide.faq.items', index, e.target.name, e.target.value)} />
                                    <AdminTextarea label="Answer" name="answer" value={item.answer} onChange={e => handleListChange('pages.umrahGuide.faq.items', index, e.target.name, e.target.value)} />
                                    <button onClick={() => deleteListItem('pages.umrahGuide.faq.items', index)} className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                                </div>
                            ))}
                            <button onClick={() => addListItem('pages.umrahGuide.faq.items', { question: 'New Question?', answer: '', enabled: true })} className="bg-green-600 text-white font-bold py-2 px-4 rounded text-sm">Add FAQ</button>
                        </div>
                    </Section>

                    <Section title="Expert Umrah Guides">
                       <ExpertGuideEditor pageKey="whyChooseUs" localData={localData} handleNestedChange={handleNestedChange} />
                    </Section>

                     <Section title="Expert Hajj Guides">
                        <ExpertGuideEditor pageKey="expertHajjGuides" localData={localData} handleNestedChange={handleNestedChange} />
                    </Section>
                </Section>
                
                <Section title="Footer">
                    <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">About Section</h4>
                    <AdminTextarea label="About Description" name="footer.about.description" value={localData.footer.about.description} onChange={e => handleNestedChange(e.target.name, e.target.value)} />

                    <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">Quick Links</h4>
                    {localData.footer.quickLinks.links.map((link, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 p-3 border border-gray-700 rounded-md items-center">
                            <AdminInput label="Label" name={`label`} value={link.label} onChange={e => handleListChange('footer.quickLinks.links', index, e.target.name, e.target.value)} />
                            <AdminInput label="Link (e.g., #home)" name={`href`} value={link.href} onChange={e => handleListChange('footer.quickLinks.links', index, e.target.name, e.target.value)} />
                            <div className="flex items-center gap-4">
                                <ToggleSwitch label="Visible" enabled={link.enabled} onChange={enabled => handleListChange('footer.quickLinks.links', index, 'enabled', enabled)} />
                                <button onClick={() => deleteListItem('footer.quickLinks.links', index)} className="bg-red-600 text-white px-3 py-1 rounded self-center h-8">Delete</button>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('footer.quickLinks.links', { href: '#', label: 'New Link', enabled: true })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Quick Link</button>
                    
                     <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">Main Services Links</h4>
                    {localData.footer.mainServices.links.map((link, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 p-3 border border-gray-700 rounded-md items-center">
                            <AdminInput label="Label" name={`label`} value={link.label} onChange={e => handleListChange('footer.mainServices.links', index, e.target.name, e.target.value)} />
                            <AdminInput label="Link (e.g., #home)" name={`href`} value={link.href} onChange={e => handleListChange('footer.mainServices.links', index, e.target.name, e.target.value)} />
                            <div className="flex items-center gap-4">
                                <ToggleSwitch label="Visible" enabled={link.enabled} onChange={enabled => handleListChange('footer.mainServices.links', index, 'enabled', enabled)} />
                                <button onClick={() => deleteListItem('footer.mainServices.links', index)} className="bg-red-600 text-white px-3 py-1 rounded self-center h-8">Delete</button>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('footer.mainServices.links', { href: '#', label: 'New Service Link', enabled: true })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Service Link</button>

                    <h4 className="font-bold text-xl mt-6 mb-2 text-[var(--color-secondary)]">Copyright & Follow Us</h4>
                    <AdminTextarea label="Follow Us Description" name="footer.followUs.description" value={localData.footer.followUs.description} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminInput label="Copyright Text" name="footer.copyrightText" value={localData.footer.copyrightText} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-2" />
                </Section>
                
                <Section title="SEO & Metadata Management">
                    <p className="text-[var(--color-muted-text)] mb-4">Manage the meta title, description, and keywords for each page to improve search engine visibility.</p>
                    {Object.keys(localData.pages).map(pageKey => {
                        const pageData = localData.pages[pageKey as keyof typeof localData.pages];
                        if (pageData && 'seo' in pageData && typeof pageData.seo === 'object' && pageData.seo !== null) {
                            // Convert 'whyChooseChampion' to 'Why Choose Champion'
                            const pageName = pageKey
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, str => str.toUpperCase());
                            
                            const seoPath = `pages.${pageKey}.seo`;
                            return <SeoEditor key={pageKey} pageName={pageName} seoPath={seoPath} localData={localData} onChange={handleNestedChange} />;
                        }
                        return null;
                    })}
                </Section>

                <div className="mt-12 text-center flex flex-col sm:flex-row justify-center gap-4">
                    <button onClick={saveChanges} disabled={isSaving} className="w-full sm:w-auto bg-[var(--color-primary)] text-white font-bold py-3 px-8 rounded-lg hover:bg-[var(--color-primary-dark)] transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-wait">
                        {isSaving ? 'Saving...' : 'Save All Changes'}
                    </button>
                    <button onClick={handleReset} className="w-full sm:w-auto bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-all duration-300">
                        Reset to Default
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;