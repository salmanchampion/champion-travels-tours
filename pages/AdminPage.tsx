import React, { useState, useContext, ChangeEvent } from 'react';
import PageBanner from '../components/PageBanner';
import { DataContext } from '../contexts/DataContext';
import { AppData, HajjPackage, UmrahPackage, TeamMember, GalleryImage, ContactInfo, Service, Testimonial, NavLink, UmrahGuideStep, HajjGuideFaqItem, HajjGuideType, HajjGuideAct } from '../data';

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
        <label htmlFor={name} className="block text-sm font-medium text-muted-text mb-1">{label}</label>
        <input type={type} id={name} name={name} value={value || ''} onChange={onChange} placeholder={placeholder} className="w-full bg-dark-bg border border-gray-600 rounded-md py-2 px-3 text-light-text focus:outline-none focus:ring-1 focus:ring-primary" />
    </div>
);

const AdminTextarea = ({ label, name, value, onChange, rows = 3 }: { label: string, name: string, value: string, onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void, rows?: number }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-muted-text mb-1">{label}</label>
        <textarea id={name} name={name} value={value || ''} onChange={onChange} rows={rows} className="w-full bg-dark-bg border border-gray-600 rounded-md py-2 px-3 text-light-text focus:outline-none focus:ring-1 focus:ring-primary" />
    </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-light-bg p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl font-display text-primary mb-4 border-b border-gray-700 pb-2">{title}</h3>
        {children}
    </div>
);

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
            <h4 className="font-bold text-xl mb-2 text-secondary">{pageName} Page</h4>
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
    onRemove: (path: string, index: number) => void;
}> = ({ pkg, index, packageType, onChange, onRemove }) => {
    const path = packageType === 'hajj' ? 'hajjPackages' : 'umrahPackages';

    return (
        <div className="mb-6 p-4 border border-gray-700 rounded-md">
            <div className="flex justify-between items-center">
                <h4 className="font-bold text-xl mb-2 text-secondary">{pkg.name || `Package ${index + 1}`}</h4>
                <button onClick={() => onRemove(path, index)} className="bg-red-600 text-white px-3 py-1 rounded">Remove</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(pkg).map(key => {
                    const label = packageFieldLabels[key] || key;
                    const value = (pkg as any)[key];
                    
                    if (key === 'note') {
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


const AdminPage: React.FC = () => {
    const { appData, updateAppData, resetAppData } = useContext(DataContext);
    const [localData, setLocalData] = useState<AppData>(JSON.parse(JSON.stringify(appData)));
    const [activePackageTab, setActivePackageTab] = useState<'hajj' | 'umrah'>('hajj');
    const [isSaving, setIsSaving] = useState(false);

    // Sync local state if appData from context changes (e.g., after reset)
    React.useEffect(() => {
        setLocalData(JSON.parse(JSON.stringify(appData)));
    }, [appData]);

    const handleNestedChange = (path: string, value: any) => {
        setLocalData(prev => {
            const keys = path.split('.');
            let tempState = JSON.parse(JSON.stringify(prev));
            let currentLevel = tempState as any;

            for (let i = 0; i < keys.length - 1; i++) {
                if (currentLevel[keys[i]] === undefined) {
                    currentLevel[keys[i]] = {};
                }
                currentLevel = currentLevel[keys[i]];
            }

            currentLevel[keys[keys.length - 1]] = value;
            return tempState;
        });
    };

    const handleListChange = (path: string, index: number, field: string, value: any) => {
        const fullPath = `${path}.${index}.${field}`;
        handleNestedChange(fullPath, value);
    }
    
    const addListItem = (path: string, newItem: any) => {
        const keys = path.split('.');
        let currentList = localData as any;
        keys.forEach(key => {
            currentList = currentList[key];
        });
        const newList = [...currentList, newItem];
        handleNestedChange(path, newList);
    };

    const removeListItem = (path: string, indexToRemove: number) => {
        const keys = path.split('.');
        let currentList = localData as any;
        keys.forEach(key => {
            currentList = currentList[key];
        });
        const newList = currentList.filter((_: any, index: number) => index !== indexToRemove);
        handleNestedChange(path, newList);
    };
    
    const saveChanges = async () => {
        setIsSaving(true);
        await updateAppData(localData);
        setIsSaving(false);
        alert('Changes saved successfully!');
    };
    
    const handleReset = async () => {
        await resetAppData();
        // The useEffect hook will update localData once appData changes
    }

    return (
        <div className="pt-20">
            <PageBanner
                title="Admin Panel"
                subtitle="Manage your website content here. Click 'Save All Changes' at the bottom to apply your updates."
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <Section title="SEO & Metadata">
                    <p className="text-muted-text mb-4">Manage the title, description, and keywords for each page to improve your website's search engine ranking.</p>
                    <SeoEditor pageName="Home" seoPath="pages.home.seo" localData={localData} onChange={handleNestedChange} />
                    <SeoEditor pageName="Services" seoPath="pages.services.seo" localData={localData} onChange={handleNestedChange} />
                    <SeoEditor pageName="Packages" seoPath="pages.packages.seo" localData={localData} onChange={handleNestedChange} />
                    <SeoEditor pageName="Visa Processing" seoPath="pages.visaProcessing.seo" localData={localData} onChange={handleNestedChange} />
                    <SeoEditor pageName="Why Us" seoPath="pages.whyChooseUs.seo" localData={localData} onChange={handleNestedChange} />
                    <SeoEditor pageName="Umrah Guide (Bangla)" seoPath="pages.umrahGuide.seo" localData={localData} onChange={handleNestedChange} />
                    <SeoEditor pageName="Hajj Guide (Bangla)" seoPath="pages.hajjGuide.seo" localData={localData} onChange={handleNestedChange} />
                    <SeoEditor pageName="Our Team" seoPath="pages.team.seo" localData={localData} onChange={handleNestedChange} />
                    <SeoEditor pageName="Testimonials" seoPath="pages.testimonials.seo" localData={localData} onChange={handleNestedChange} />
                    <SeoEditor pageName="Contact" seoPath="pages.contact.seo" localData={localData} onChange={handleNestedChange} />
                </Section>
                
                <Section title="Site-wide & Header">
                    <AdminInput label="Website Logo URL" name="site.logoUrl" value={localData.site.logoUrl} onChange={(e) => handleNestedChange(e.target.name, e.target.value)} />
                     <div className="mt-4">
                        <h4 className="font-bold text-xl my-4 text-secondary">Navigation Links</h4>
                        {localData.header.navLinks.map((link, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2 p-2 border border-gray-700 rounded-md">
                                <AdminInput label="Label" name={`header.navLinks.${index}.label`} value={link.label} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                                <AdminInput label="Link (e.g., #home)" name={`header.navLinks.${index}.href`} value={link.href} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                                <button onClick={() => removeListItem('header.navLinks', index)} className="bg-red-600 text-white px-3 py-1 rounded self-end h-10">Remove</button>
                            </div>
                        ))}
                        <button onClick={() => addListItem('header.navLinks', { href: '#', label: 'New Link' })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Nav Link</button>
                    </div>
                </Section>
                
                <Section title="Homepage Hero Section">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AdminInput label="Title" name="pages.home.hero.title" value={localData.pages.home.hero.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminInput label="License Info" name="pages.home.hero.licenseInfo" value={localData.pages.home.hero.licenseInfo} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminInput label="Subtitle" name="pages.home.hero.subtitle" value={localData.pages.home.hero.subtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminInput label="Button Text" name="pages.home.hero.buttonText" value={localData.pages.home.hero.buttonText} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    </div>
                     <AdminTextarea label="Description" name="pages.home.hero.description" value={localData.pages.home.hero.description} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                     <h4 className="mt-4 font-semibold text-lg">Slider Images</h4>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        {localData.pages.home.hero.images.map((img, index) => (
                             <AdminInput key={index} label={`Image ${index+1} URL`} name={`pages.home.hero.images.${index}`} value={img} onChange={(e) => handleNestedChange(e.target.name, e.target.value)} />
                        ))}
                     </div>
                </Section>

                <Section title="Hajj Guide Page">
                    <h4 className="font-bold text-xl mb-2 text-secondary">Page Banner</h4>
                    <AdminInput label="Title" name="pages.hajjGuide.pageBanner.title" value={localData.pages.hajjGuide.pageBanner.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminTextarea label="Subtitle" name="pages.hajjGuide.pageBanner.subtitle" value={localData.pages.hajjGuide.pageBanner.subtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />

                    <h4 className="font-bold text-xl mt-6 mb-2 text-secondary">Types of Hajj Section</h4>
                    <AdminInput label="Section Title" name="pages.hajjGuide.types.title" value={localData.pages.hajjGuide.types.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminTextarea label="Section Intro" name="pages.hajjGuide.types.intro" value={localData.pages.hajjGuide.types.intro} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                     {localData.pages.hajjGuide.types.list.map((item, index) => (
                        <div key={index} className="my-4 p-3 border border-gray-700 rounded-md">
                             <button onClick={() => removeListItem('pages.hajjGuide.types.list', index)} className="float-right bg-red-600 text-white px-3 py-1 rounded">Remove Type</button>
                             <h5 className="font-bold text-lg mb-2 text-white">Type {index + 1}</h5>
                             <AdminInput label="Title" name="title" value={item.title} onChange={e => handleListChange('pages.hajjGuide.types.list', index, e.target.name, e.target.value)} />
                             <AdminTextarea label="Description" name="description" value={item.description} onChange={e => handleListChange('pages.hajjGuide.types.list', index, e.target.name, e.target.value)} />
                        </div>
                    ))}
                    <button onClick={() => addListItem('pages.hajjGuide.types.list', { title: 'New Type', description: '' })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Type</button>

                    <h4 className="font-bold text-xl mt-6 mb-2 text-secondary">Faraj of Hajj Section</h4>
                    <AdminInput label="Section Title" name="pages.hajjGuide.faraj.title" value={localData.pages.hajjGuide.faraj.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminTextarea label="Section Intro" name="pages.hajjGuide.faraj.intro" value={localData.pages.hajjGuide.faraj.intro} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                     {localData.pages.hajjGuide.faraj.list.map((item, index) => (
                        <div key={index} className="my-4 p-3 border border-gray-700 rounded-md">
                             <button onClick={() => removeListItem('pages.hajjGuide.faraj.list', index)} className="float-right bg-red-600 text-white px-3 py-1 rounded">Remove Faraj</button>
                             <h5 className="font-bold text-lg mb-2 text-white">Faraj {index + 1}</h5>
                             <AdminInput label="Title" name="title" value={item.title} onChange={e => handleListChange('pages.hajjGuide.faraj.list', index, e.target.name, e.target.value)} />
                             <AdminTextarea label="Description" name="description" value={item.description} onChange={e => handleListChange('pages.hajjGuide.faraj.list', index, e.target.name, e.target.value)} />
                        </div>
                    ))}
                    <button onClick={() => addListItem('pages.hajjGuide.faraj.list', { title: 'New Faraj', description: '' })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Faraj</button>

                    <h4 className="font-bold text-xl mt-6 mb-2 text-secondary">Wajib of Hajj Section</h4>
                    <AdminInput label="Section Title" name="pages.hajjGuide.wajib.title" value={localData.pages.hajjGuide.wajib.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminTextarea label="Section Intro" name="pages.hajjGuide.wajib.intro" value={localData.pages.hajjGuide.wajib.intro} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                     {localData.pages.hajjGuide.wajib.list.map((item, index) => (
                        <div key={index} className="my-4 p-3 border border-gray-700 rounded-md">
                             <button onClick={() => removeListItem('pages.hajjGuide.wajib.list', index)} className="float-right bg-red-600 text-white px-3 py-1 rounded">Remove Wajib</button>
                             <h5 className="font-bold text-lg mb-2 text-white">Wajib {index + 1}</h5>
                             <AdminInput label="Title" name="title" value={item.title} onChange={e => handleListChange('pages.hajjGuide.wajib.list', index, e.target.name, e.target.value)} />
                             <AdminTextarea label="Description" name="description" value={item.description} onChange={e => handleListChange('pages.hajjGuide.wajib.list', index, e.target.name, e.target.value)} />
                        </div>
                    ))}
                    <button onClick={() => addListItem('pages.hajjGuide.wajib.list', { title: 'New Wajib', description: '' })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Wajib</button>

                    <h4 className="font-bold text-xl mt-6 mb-2 text-secondary">FAQ Section</h4>
                     <AdminInput label="Section Title" name="pages.hajjGuide.faq.title" value={localData.pages.hajjGuide.faq.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                     {localData.pages.hajjGuide.faq.items.map((item, index) => (
                         <div key={index} className="my-4 p-3 border border-gray-700 rounded-md">
                             <button onClick={() => removeListItem('pages.hajjGuide.faq.items', index)} className="float-right bg-red-600 text-white px-3 py-1 rounded">Remove FAQ</button>
                             <h5 className="font-bold text-lg mb-2 text-white">FAQ {index + 1}</h5>
                             <AdminInput label="Question" name="question" value={item.question} onChange={e => handleListChange('pages.hajjGuide.faq.items', index, e.target.name, e.target.value)} />
                             <AdminTextarea label="Answer" name="answer" value={item.answer} onChange={e => handleListChange('pages.hajjGuide.faq.items', index, e.target.name, e.target.value)} />
                         </div>
                     ))}
                     <button onClick={() => addListItem('pages.hajjGuide.faq.items', { question: 'New Question?', answer: 'New Answer.' })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add FAQ</button>

                    <h4 className="font-bold text-xl mt-6 mb-2 text-secondary">CTA Section</h4>
                    <AdminTextarea label="CTA Title" name="pages.hajjGuide.cta.title" value={localData.pages.hajjGuide.cta.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminInput label="Button Text" name="pages.hajjGuide.cta.buttonText" value={localData.pages.hajjGuide.cta.buttonText} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                </Section>

                <Section title="Umrah Guide Page">
                    <h4 className="font-bold text-xl mb-2 text-secondary">Page Banner</h4>
                    <AdminInput label="Title" name="pages.umrahGuide.pageBanner.title" value={localData.pages.umrahGuide.pageBanner.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminTextarea label="Subtitle" name="pages.umrahGuide.pageBanner.subtitle" value={localData.pages.umrahGuide.pageBanner.subtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />

                    <h4 className="font-bold text-xl mt-6 mb-2 text-secondary">Steps Section</h4>
                    <AdminInput label="Section Title" name="pages.umrahGuide.stepsTitle" value={localData.pages.umrahGuide.stepsTitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminTextarea label="Section Intro" name="pages.umrahGuide.stepsIntro" value={localData.pages.umrahGuide.stepsIntro} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    
                    {localData.pages.umrahGuide.steps.map((step, index) => (
                        <div key={index} className="my-4 p-3 border border-gray-700 rounded-md">
                             <button onClick={() => removeListItem('pages.umrahGuide.steps', index)} className="float-right bg-red-600 text-white px-3 py-1 rounded">Remove Step</button>
                             <h5 className="font-bold text-lg mb-2 text-white">Step {index + 1}</h5>
                             <AdminInput label="Title" name="title" value={step.title} onChange={e => handleListChange('pages.umrahGuide.steps', index, e.target.name, e.target.value)} />
                             <AdminTextarea label="Description" name="description" value={step.description} onChange={e => handleListChange('pages.umrahGuide.steps', index, e.target.name, e.target.value)} />
                             <AdminTextarea label="Points (one per line)" name="points" value={step.points.join('\n')} onChange={e => handleListChange('pages.umrahGuide.steps', index, 'points', e.target.value.split('\n'))} rows={5} />
                             <AdminInput label="Arabic Text (Optional)" name="arabicText" value={step.arabicText} onChange={e => handleListChange('pages.umrahGuide.steps', index, e.target.name, e.target.value)} />
                             <AdminTextarea label="Arabic Meaning (Optional)" name="arabicMeaning" value={step.arabicMeaning} onChange={e => handleListChange('pages.umrahGuide.steps', index, e.target.name, e.target.value)} />
                        </div>
                    ))}
                    <button onClick={() => addListItem('pages.umrahGuide.steps', { title: 'New Step', description: '', points: [] })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Step</button>

                    <h4 className="font-bold text-xl mt-6 mb-2 text-secondary">Do's & Don'ts Section</h4>
                    <AdminInput label="Section Title" name="pages.umrahGuide.dosAndDonts.title" value={localData.pages.umrahGuide.dosAndDonts.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminTextarea label="Section Intro" name="pages.umrahGuide.dosAndDonts.intro" value={localData.pages.umrahGuide.dosAndDonts.intro} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminInput label="Image 1 URL" name="pages.umrahGuide.dosAndDonts.images.0" value={localData.pages.umrahGuide.dosAndDonts.images[0]} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminInput label="Image 2 URL" name="pages.umrahGuide.dosAndDonts.images.1" value={localData.pages.umrahGuide.dosAndDonts.images[1]} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminInput label="Do's Title" name="pages.umrahGuide.dosAndDonts.dos.title" value={localData.pages.umrahGuide.dosAndDonts.dos.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminTextarea label="Do's Items (one per line)" name="dos.items" value={localData.pages.umrahGuide.dosAndDonts.dos.items.join('\n')} onChange={e => handleNestedChange('pages.umrahGuide.dosAndDonts.dos.items', e.target.value.split('\n'))} rows={7} />
                    <AdminInput label="Don'ts Title" name="pages.umrahGuide.dosAndDonts.donts.title" value={localData.pages.umrahGuide.dosAndDonts.donts.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminTextarea label="Don'ts Items (one per line)" name="donts.items" value={localData.pages.umrahGuide.dosAndDonts.donts.items.join('\n')} onChange={e => handleNestedChange('pages.umrahGuide.dosAndDonts.donts.items', e.target.value.split('\n'))} rows={7} />
                    <AdminTextarea label="Note" name="pages.umrahGuide.dosAndDonts.note" value={localData.pages.umrahGuide.dosAndDonts.note} onChange={e => handleNestedChange(e.target.name, e.target.value)} />

                    <h4 className="font-bold text-xl mt-6 mb-2 text-secondary">FAQ Section</h4>
                     <AdminInput label="Section Title" name="pages.umrahGuide.faq.title" value={localData.pages.umrahGuide.faq.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                     {localData.pages.umrahGuide.faq.items.map((item, index) => (
                         <div key={index} className="my-4 p-3 border border-gray-700 rounded-md">
                             <button onClick={() => removeListItem('pages.umrahGuide.faq.items', index)} className="float-right bg-red-600 text-white px-3 py-1 rounded">Remove FAQ</button>
                             <h5 className="font-bold text-lg mb-2 text-white">FAQ {index + 1}</h5>
                             <AdminInput label="Question" name="question" value={item.question} onChange={e => handleListChange('pages.umrahGuide.faq.items', index, e.target.name, e.target.value)} />
                             <AdminTextarea label="Answer" name="answer" value={item.answer} onChange={e => handleListChange('pages.umrahGuide.faq.items', index, e.target.name, e.target.value)} />
                         </div>
                     ))}
                     <button onClick={() => addListItem('pages.umrahGuide.faq.items', { question: 'New Question?', answer: 'New Answer.' })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add FAQ</button>

                    <h4 className="font-bold text-xl mt-6 mb-2 text-secondary">CTA Section</h4>
                    <AdminTextarea label="CTA Title" name="pages.umrahGuide.cta.title" value={localData.pages.umrahGuide.cta.title} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminInput label="Button Text" name="pages.umrahGuide.cta.buttonText" value={localData.pages.umrahGuide.cta.buttonText} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                </Section>

                <Section title="Services">
                    {localData.pages.services.list.map((service, index) => (
                        <div key={index} className="mb-4 p-3 border border-gray-700 rounded-md">
                            <h4 className="font-bold text-xl mb-2 text-secondary">{service.title || `Service ${index+1}`}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AdminInput label="Title" name="title" value={service.title} onChange={e => handleListChange('pages.services.list', index, e.target.name, e.target.value)} />
                                <AdminInput label="Icon Name (e.g., Hajj, Visa)" name="icon" value={service.icon} onChange={e => handleListChange('pages.services.list', index, e.target.name, e.target.value)} />
                                <div className="md:col-span-2">
                                <AdminTextarea label="Description" name="description" value={service.description} onChange={e => handleListChange('pages.services.list', index, e.target.name, e.target.value)} />
                                </div>
                                <div className="md:col-span-2">
                                <AdminTextarea label="Details (one per line)" name="details" value={service.details.join('\n')} onChange={e => handleListChange('pages.services.list', index, 'details', e.target.value.split('\n'))} rows={6} />
                                </div>
                            </div>
                            <button onClick={() => removeListItem('pages.services.list', index)} className="mt-2 bg-red-600 text-white px-3 py-1 rounded">Remove Service</button>
                        </div>
                    ))}
                    <button onClick={() => addListItem('pages.services.list', { icon: 'New', title: 'New Service', description: '', details: [] })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Service</button>
                </Section>
                
                <Section title="Package Management">
                    <div className="flex border-b border-gray-700 mb-6">
                        <button 
                            className={`px-4 py-2 font-semibold ${activePackageTab === 'hajj' ? 'text-primary border-b-2 border-primary' : 'text-muted-text'}`}
                            onClick={() => setActivePackageTab('hajj')}
                        >
                            Hajj Packages
                        </button>
                        <button 
                            className={`px-4 py-2 font-semibold ${activePackageTab === 'umrah' ? 'text-primary border-b-2 border-primary' : 'text-muted-text'}`}
                            onClick={() => setActivePackageTab('umrah')}
                        >
                            Umrah Packages
                        </button>
                    </div>

                    {activePackageTab === 'hajj' && (
                        <div>
                            {localData.hajjPackages.map((pkg, index) => (
                                <PackageEditor
                                    key={index}
                                    pkg={pkg}
                                    index={index}
                                    packageType="hajj"
                                    onChange={handleListChange}
                                    onRemove={removeListItem}
                                />
                            ))}
                            <button 
                                onClick={() => addListItem('hajjPackages', { name: 'New Hajj Package', price: '0', duration: '', hotelMakkah: '', hotelMadinah: '', flightsUp: '', flightsDown: '', food: '', special: '', note: '', image: '' })} 
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
                                    key={index}
                                    pkg={pkg}
                                    index={index}
                                    packageType="umrah"
                                    onChange={handleListChange}
                                    onRemove={removeListItem}
                                />
                            ))}
                            <button 
                                onClick={() => addListItem('umrahPackages', { name: 'New Umrah Package', price: '0', date: '', hotelMakkah: '', hotelMadinah: '', flightsUp: '', flightsDown: '', food: '', special: '', note: '', image: '', buttonText: 'Book Now' })}
                                className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Add Umrah Package
                            </button>
                        </div>
                    )}
                </Section>

                <Section title="Packages Page - Gallery">
                    <AdminInput 
                        label="Gallery Title" 
                        name="pages.packages.gallery.title" 
                        value={localData.pages.packages.gallery.title} 
                        onChange={e => handleNestedChange(e.target.name, e.target.value)} 
                    />
                    <div className="mt-4">
                        <AdminTextarea 
                            label="Gallery Description" 
                            name="pages.packages.gallery.description" 
                            value={localData.pages.packages.gallery.description} 
                            onChange={e => handleNestedChange(e.target.name, e.target.value)}
                        />
                    </div>
                    <h4 className="font-bold text-xl my-4 text-secondary">Gallery Images</h4>
                    {localData.pages.packages.gallery.images.map((image, index) => (
                        <div key={index} className="mb-4 p-3 border border-gray-700 rounded-md relative">
                            <button 
                                onClick={() => removeListItem('pages.packages.gallery.images', index)} 
                                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs"
                            >
                                Remove
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AdminInput 
                                    label={`Image ${index + 1} URL`}
                                    name="src" 
                                    value={image.src} 
                                    onChange={e => handleListChange('pages.packages.gallery.images', index, e.target.name, e.target.value)} 
                                />
                                <AdminInput 
                                    label={`Image ${index + 1} Alt Text`}
                                    name="alt" 
                                    value={image.alt} 
                                    onChange={e => handleListChange('pages.packages.gallery.images', index, e.target.name, e.target.value)} 
                                />
                            </div>
                        </div>
                    ))}
                    <button 
                        onClick={() => addListItem('pages.packages.gallery.images', { src: 'https://via.placeholder.com/300', alt: 'New Image' })} 
                        className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Gallery Image
                    </button>
                </Section>


                <Section title="Team Members">
                     <h4 className="font-bold text-xl mb-2 text-secondary">C.E.O & Chairman</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-3 border border-gray-700 rounded-md">
                        <AdminInput label="Name" name="pages.team.chairman.name" value={localData.pages.team.chairman.name} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminInput label="Role" name="pages.team.chairman.role" value={localData.pages.team.chairman.role} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminInput label="Image URL" name="pages.team.chairman.imageUrl" value={localData.pages.team.chairman.imageUrl} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminInput label="Facebook URL" name="pages.team.chairman.socials.facebook" value={localData.pages.team.chairman.socials?.facebook} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminInput label="Phone" name="pages.team.chairman.socials.phone" value={localData.pages.team.chairman.socials?.phone} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                        <AdminInput label="WhatsApp Number" name="pages.team.chairman.socials.whatsapp" value={localData.pages.team.chairman.socials?.whatsapp} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                     </div>
                     <h4 className="font-bold text-xl my-4 text-secondary">Talented Employees</h4>
                     {localData.pages.team.talentedEmployees.map((member, index) => (
                        <div key={index} className="mb-4 p-3 border border-gray-700 rounded-md">
                             <button onClick={() => removeListItem('pages.team.talentedEmployees', index)} className="float-right bg-red-600 text-white px-3 py-1 rounded">Remove</button>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <AdminInput label="Name" name="name" value={member.name} onChange={e => handleListChange('pages.team.talentedEmployees', index, e.target.name, e.target.value)} />
                                <AdminInput label="Role" name="role" value={member.role} onChange={e => handleListChange('pages.team.talentedEmployees', index, e.target.name, e.target.value)} />
                                <AdminInput label="Image URL" name="imageUrl" value={member.imageUrl} onChange={e => handleListChange('pages.team.talentedEmployees', index, e.target.name, e.target.value)} />
                                <AdminInput label="Facebook URL" name="socials.facebook" value={member.socials?.facebook} onChange={e => handleListChange('pages.team.talentedEmployees', index, e.target.name, e.target.value)} />
                                <AdminInput label="Phone" name="socials.phone" value={member.socials?.phone} onChange={e => handleListChange('pages.team.talentedEmployees', index, e.target.name, e.target.value)} />
                                <AdminInput label="WhatsApp Number" name="socials.whatsapp" value={member.socials?.whatsapp} onChange={e => handleListChange('pages.team.talentedEmployees', index, e.target.name, e.target.value)} />
                            </div>
                        </div>
                     ))}
                     <button onClick={() => addListItem('pages.team.talentedEmployees', { name: 'New Member', role: 'Role', imageUrl: '', socials: { facebook: '#', phone: '#', whatsapp: '#' } })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Employee</button>
                </Section>
                
                 <Section title="Testimonials">
                    {localData.pages.testimonials.list.map((testimonial, index) => (
                        <div key={index} className="mb-4 p-3 border border-gray-700 rounded-md">
                            <button onClick={() => removeListItem('pages.testimonials.list', index)} className="float-right bg-red-600 text-white px-3 py-1 rounded">Remove</button>
                            <h4 className="font-bold text-xl mb-2 text-secondary">{testimonial.name || `Testimonial ${index + 1}`}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AdminInput label="Name" name="name" value={testimonial.name} onChange={e => handleListChange('pages.testimonials.list', index, e.target.name, e.target.value)} />
                                <AdminInput label="Title/Role" name="title" value={testimonial.title} onChange={e => handleListChange('pages.testimonials.list', index, e.target.name, e.target.value)} />
                                <AdminInput label="Avatar Image URL" name="avatar" value={testimonial.avatar} onChange={e => handleListChange('pages.testimonials.list', index, e.target.name, e.target.value)} />
                                <div className="md:col-span-2">
                                <AdminTextarea label="Quote" name="quote" value={testimonial.quote} onChange={e => handleListChange('pages.testimonials.list', index, e.target.name, e.target.value)} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('pages.testimonials.list', { quote: '', name: '', title: '', avatar: '' })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Testimonial</button>
                </Section>

                <Section title="Visa Processing Page">
                    <AdminInput
                        label="Google Apps Script URL for Visa Inquiry Form"
                        name="pages.visaProcessing.googleAppsScriptUrl"
                        value={localData.pages.visaProcessing.googleAppsScriptUrl}
                        onChange={e => handleNestedChange(e.target.name, e.target.value)}
                        placeholder="Paste your deployed web app URL here"
                        className="mt-4"
                    />
                </Section>

                <Section title="Contact Page">
                    <h4 className="font-bold text-xl mb-2 text-secondary">Info Section</h4>
                    <AdminInput label="Info Title" name="pages.contact.infoTitle" value={localData.pages.contact.infoTitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminTextarea label="Info Subtitle" name="pages.contact.infoSubtitle" value={localData.pages.contact.infoSubtitle} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminInput label="Map Background Image URL" name="pages.contact.mapUrl" value={localData.pages.contact.mapUrl} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                    <AdminInput 
                        label="Google Apps Script URL for Contact Form" 
                        name="pages.contact.googleAppsScriptUrl" 
                        value={localData.pages.contact.googleAppsScriptUrl} 
                        onChange={e => handleNestedChange(e.target.name, e.target.value)} 
                        placeholder="Paste your deployed web app URL here"
                        className="mt-4"
                    />
                    
                    <h4 className="font-bold text-xl mt-4 mb-2 text-secondary">Contact Details</h4>
                    {localData.pages.contact.contactInfo.map((info, index) => (
                        <div key={index} className="mb-2 p-2 border border-gray-700 rounded">
                           <button onClick={() => removeListItem('pages.contact.contactInfo', index)} className="float-right bg-red-600 text-white px-2 py-1 text-sm rounded">X</button>
                           <AdminInput label="Label" name="label" value={info.label} onChange={e => handleListChange('pages.contact.contactInfo', index, e.target.name, e.target.value)} />
                           <AdminTextarea label="Value" name="value" value={info.value} onChange={e => handleListChange('pages.contact.contactInfo', index, e.target.name, e.target.value)} />
                        </div>
                    ))}
                     <button onClick={() => addListItem('pages.contact.contactInfo', { icon: '', label: 'New Field', value: '' })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Contact Field</button>
                </Section>

                <Section title="Footer">
                     <h4 className="font-bold text-xl mt-4 mb-2 text-secondary">Footer Links</h4>
                     {localData.footer.quickLinks.links.map((link, index) => (
                        <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                            <AdminInput label="Quick Link Label" name={`footer.quickLinks.links.${index}.label`} value={link.label} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <AdminInput label="Link URL" name={`footer.quickLinks.links.${index}.href`} value={link.href} onChange={e => handleNestedChange(e.target.name, e.target.value)} />
                            <button onClick={() => removeListItem('footer.quickLinks.links', index)} className="bg-red-600 text-white px-3 py-1 rounded self-end h-10">Remove</button>
                        </div>
                     ))}
                     <button onClick={() => addListItem('footer.quickLinks.links', { href: '#', label: 'New' })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Quick Link</button>
                     <AdminInput label="Copyright Text" name="footer.copyrightText" value={localData.footer.copyrightText} onChange={e => handleNestedChange(e.target.name, e.target.value)} className="mt-4" />
                </Section>
                
                <div className="mt-12 text-center flex flex-col sm:flex-row justify-center gap-4">
                    <button onClick={saveChanges} disabled={isSaving} className="w-full sm:w-auto bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-wait">
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