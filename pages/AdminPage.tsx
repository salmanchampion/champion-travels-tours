import React, { useState, useContext, ChangeEvent } from 'react';
import PageBanner from '../components/PageBanner';
import { DataContext } from '../contexts/DataContext';
import { AppData, HajjPackage, UmrahPackage, TeamMember, GalleryImage, ContactInfo } from '../data';

// Helper component for form fields
const AdminInput = ({ label, id, value, onChange, placeholder = '', type = 'text' }: { label: string, id: string, value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void, placeholder?: string, type?: string }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-muted-text mb-1">{label}</label>
        <input type={type} id={id} name={id} value={value} onChange={onChange} placeholder={placeholder} className="w-full bg-dark-bg border border-gray-600 rounded-md py-2 px-3 text-light-text focus:outline-none focus:ring-1 focus:ring-primary" />
    </div>
);

const AdminTextarea = ({ label, id, value, onChange, rows = 3 }: { label: string, id: string, value: string, onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void, rows?: number }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-muted-text mb-1">{label}</label>
        <textarea id={id} name={id} value={value} onChange={onChange} rows={rows} className="w-full bg-dark-bg border border-gray-600 rounded-md py-2 px-3 text-light-text focus:outline-none focus:ring-1 focus:ring-primary" />
    </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-light-bg p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl font-display text-primary mb-4 border-b border-gray-700 pb-2">{title}</h3>
        {children}
    </div>
);

const AdminPage: React.FC = () => {
    const { appData, updateAppData, resetAppData } = useContext(DataContext);
    const [localData, setLocalData] = useState<AppData>(JSON.parse(JSON.stringify(appData))); // Deep copy

    const handleSiteChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalData(prev => ({ ...prev, site: { ...prev.site, [name]: value } }));
    };
    
    const handleHeroChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLocalData(prev => ({ ...prev, hero: { ...prev.hero, [name]: value } }));
    };
    
    const handleHeroImagesChange = (index: number, value: string) => {
        setLocalData(prev => {
            const newImages = [...prev.hero.images];
            newImages[index] = value;
            return { ...prev, hero: { ...prev.hero, images: newImages } };
        });
    };
    
    const handlePackageChange = (type: 'hajj' | 'umrah', index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const key = type === 'hajj' ? 'hajjPackages' : 'umrahPackages';
        setLocalData(prev => {
            const updatedPackages = [...prev[key]];
            updatedPackages[index] = { ...updatedPackages[index], [name]: value };
            return { ...prev, [key]: updatedPackages };
        });
    };

    const handleTeamChange = (type: 'chairman' | 'employee', index: number, e: ChangeEvent<HTMLInputElement>) => {
         const { name, value } = e.target;
         if (type === 'chairman') {
             setLocalData(prev => ({...prev, pages: {...prev.pages, team: {...prev.pages.team, chairman: {...prev.pages.team.chairman, [name]: value } } }}));
         } else {
            setLocalData(prev => {
                const updatedEmployees = [...prev.pages.team.talentedEmployees];
                updatedEmployees[index] = { ...updatedEmployees[index], [name]: value };
                return {...prev, pages: {...prev.pages, team: {...prev.pages.team, talentedEmployees: updatedEmployees } }};
            });
         }
    };
    
    const handleWhyUsImageChange = (section: keyof AppData['pages']['whyChooseUs'], key: string, value: string) => {
        setLocalData(prev => {
            const whyChooseUs = { ...prev.pages.whyChooseUs };
            if (section === 'guides' || section === 'directors' || section === 'services' || section === 'cta') {
                (whyChooseUs[section] as any)[key] = value;
            } else {
                (whyChooseUs as any)[section] = value;
            }
            return {...prev, pages: {...prev.pages, whyChooseUs }};
        });
    };
    
    const saveChanges = () => {
        updateAppData(localData);
        alert('Changes saved successfully!');
    };

    return (
        <div className="pt-20">
            <PageBanner
                title="Admin Panel"
                subtitle="Manage your website content here. Click 'Save All Changes' at the bottom to apply your updates."
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                <Section title="Site-wide Settings">
                    <AdminInput label="Website Logo URL" id="logoUrl" value={localData.site.logoUrl} onChange={handleSiteChange} />
                </Section>
                
                <Section title="Hero Section">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AdminInput label="Title" id="title" value={localData.hero.title} onChange={handleHeroChange} />
                        <AdminInput label="License Info" id="licenseInfo" value={localData.hero.licenseInfo} onChange={handleHeroChange} />
                        <AdminInput label="Subtitle" id="subtitle" value={localData.hero.subtitle} onChange={handleHeroChange} />
                    </div>
                     <AdminTextarea label="Description" id="description" value={localData.hero.description} onChange={handleHeroChange} />
                     <h4 className="mt-4 font-semibold text-lg">Slider Images</h4>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        {localData.hero.images.map((img, index) => (
                             <AdminInput key={index} label={`Image ${index+1} URL`} id={`heroimg-${index}`} value={img} onChange={(e) => handleHeroImagesChange(index, e.target.value)} />
                        ))}
                     </div>
                </Section>

                <Section title="Hajj Packages">
                    {localData.hajjPackages.map((pkg, index) => (
                        <div key={index} className="mb-6 p-4 border border-gray-700 rounded-md">
                            <h4 className="font-bold text-xl mb-2 text-secondary">{pkg.name || `Package ${index+1}`}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                               <AdminInput label="Name" id="name" value={pkg.name} onChange={e => handlePackageChange('hajj', index, e)} />
                               <AdminInput label="Price" id="price" value={pkg.price} onChange={e => handlePackageChange('hajj', index, e)} />
                               <AdminInput label="Duration" id="duration" value={pkg.duration} onChange={e => handlePackageChange('hajj', index, e)} />
                               <AdminInput label="Hotel Makkah" id="hotelMakkah" value={pkg.hotelMakkah} onChange={e => handlePackageChange('hajj', index, e)} />
                               <AdminInput label="Hotel Madinah" id="hotelMadinah" value={pkg.hotelMadinah} onChange={e => handlePackageChange('hajj', index, e)} />
                               <AdminInput label="Flights Up" id="flightsUp" value={pkg.flightsUp} onChange={e => handlePackageChange('hajj', index, e)} />
                               <AdminInput label="Flights Down" id="flightsDown" value={pkg.flightsDown} onChange={e => handlePackageChange('hajj', index, e)} />
                               <AdminInput label="Food" id="food" value={pkg.food} onChange={e => handlePackageChange('hajj', index, e)} />
                               <AdminInput label="Special Services" id="special" value={pkg.special} onChange={e => handlePackageChange('hajj', index, e)} />
                               <AdminInput label="Image URL" id="image" value={pkg.image} onChange={e => handlePackageChange('hajj', index, e)} />
                               <div className="md:col-span-2 lg:col-span-3">
                                <AdminTextarea label="Note" id="note" value={pkg.note} onChange={e => handlePackageChange('hajj', index, e)} />
                               </div>
                            </div>
                        </div>
                    ))}
                </Section>
                
                 <Section title="Umrah Packages">
                    {localData.umrahPackages.map((pkg, index) => (
                        <div key={index} className="mb-6 p-4 border border-gray-700 rounded-md">
                            <h4 className="font-bold text-xl mb-2 text-secondary">{pkg.name || `Package ${index+1}`}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                               <AdminInput label="Name" id="name" value={pkg.name} onChange={e => handlePackageChange('umrah', index, e)} />
                               <AdminInput label="Price" id="price" value={pkg.price} onChange={e => handlePackageChange('umrah', index, e)} />
                               <AdminInput label="Date/Duration" id="date" value={pkg.date} onChange={e => handlePackageChange('umrah', index, e)} />
                               <AdminInput label="Hotel Makkah" id="hotelMakkah" value={pkg.hotelMakkah} onChange={e => handlePackageChange('umrah', index, e)} />
                               <AdminInput label="Hotel Madinah" id="hotelMadinah" value={pkg.hotelMadinah} onChange={e => handlePackageChange('umrah', index, e)} />
                               <AdminInput label="Flights Up" id="flightsUp" value={pkg.flightsUp} onChange={e => handlePackageChange('umrah', index, e)} />
                               <AdminInput label="Flights Down" id="flightsDown" value={pkg.flightsDown} onChange={e => handlePackageChange('umrah', index, e)} />
                               <AdminInput label="Food" id="food" value={pkg.food} onChange={e => handlePackageChange('umrah', index, e)} />
                               <AdminInput label="Special Services" id="special" value={pkg.special} onChange={e => handlePackageChange('umrah', index, e)} />
                               <AdminInput label="Image URL" id="image" value={pkg.image} onChange={e => handlePackageChange('umrah', index, e)} />
                               <AdminInput label="Button Text" id="buttonText" value={pkg.buttonText} onChange={e => handlePackageChange('umrah', index, e)} />
                               <div className="md:col-span-2 lg:col-span-2">
                                <AdminTextarea label="Note" id="note" value={pkg.note} onChange={e => handlePackageChange('umrah', index, e)} />
                               </div>
                            </div>
                        </div>
                    ))}
                </Section>

                <Section title="Team Members">
                     <h4 className="font-bold text-xl mb-2 text-secondary">C.E.O & Chairman</h4>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <AdminInput label="Name" id="name" value={localData.pages.team.chairman.name} onChange={e => handleTeamChange('chairman', 0, e)} />
                        <AdminInput label="Role" id="role" value={localData.pages.team.chairman.role} onChange={e => handleTeamChange('chairman', 0, e)} />
                        <AdminInput label="Image URL" id="imageUrl" value={localData.pages.team.chairman.imageUrl} onChange={e => handleTeamChange('chairman', 0, e)} />
                     </div>
                     <h4 className="font-bold text-xl my-4 text-secondary">Talented Employees</h4>
                     {localData.pages.team.talentedEmployees.map((member, index) => (
                        <div key={index} className="mb-4 p-3 border border-gray-700 rounded-md">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <AdminInput label="Name" id="name" value={member.name} onChange={e => handleTeamChange('employee', index, e)} />
                                <AdminInput label="Role" id="role" value={member.role} onChange={e => handleTeamChange('employee', index, e)} />
                                <AdminInput label="Image URL" id="imageUrl" value={member.imageUrl} onChange={e => handleTeamChange('employee', index, e)} />
                            </div>
                        </div>
                     ))}
                </Section>
                
                <Section title="Other Page Images">
                    <h4 className="font-bold text-xl mb-2 text-secondary">'Why Choose Us' Page Images</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <AdminInput label="Guides Main Image" id="guides-main" value={localData.pages.whyChooseUs.guides.mainImage} onChange={e => handleWhyUsImageChange('guides', 'mainImage', e.target.value)} />
                        <AdminInput label="Guides Secondary Image" id="guides-sec" value={localData.pages.whyChooseUs.guides.secondaryImage} onChange={e => handleWhyUsImageChange('guides', 'secondaryImage', e.target.value)} />
                        <AdminInput label="Directors Main Image" id="dir-main" value={localData.pages.whyChooseUs.directors.mainImage} onChange={e => handleWhyUsImageChange('directors', 'mainImage', e.target.value)} />
                        <AdminInput label="Directors Secondary 1" id="dir-sec1" value={localData.pages.whyChooseUs.directors.secondaryImage1} onChange={e => handleWhyUsImageChange('directors', 'secondaryImage1', e.target.value)} />
                        <AdminInput label="Directors Secondary 2" id="dir-sec2" value={localData.pages.whyChooseUs.directors.secondaryImage2} onChange={e => handleWhyUsImageChange('directors', 'secondaryImage2', e.target.value)} />
                        <AdminInput label="Services Offer Image" id="serv-img" value={localData.pages.whyChooseUs.services.image} onChange={e => handleWhyUsImageChange('services', 'image', e.target.value)} />
                        <AdminInput label="Final CTA Image" id="cta-img" value={localData.pages.whyChooseUs.cta.image} onChange={e => handleWhyUsImageChange('cta', 'image', e.target.value)} />
                        <AdminInput label="Mosque Footer Image" id="footer-img" value={localData.pages.whyChooseUs.footerImage} onChange={e => handleWhyUsImageChange('footerImage', '', e.target.value)} />
                     </div>
                      <h4 className="font-bold text-xl mt-6 mb-2 text-secondary">Contact Page Images</h4>
                      <AdminInput label="Accreditations Image URL" id="accreditationsImage" value={localData.pages.contact.accreditationsImage} onChange={(e) => setLocalData(prev => ({...prev, pages: {...prev.pages, contact: {...prev.pages.contact, accreditationsImage: e.target.value}}}))} />
                </Section>


                <div className="mt-12 text-center flex flex-col sm:flex-row justify-center gap-4">
                    <button onClick={saveChanges} className="w-full sm:w-auto bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105">
                        Save All Changes
                    </button>
                    <button onClick={resetAppData} className="w-full sm:w-auto bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-all duration-300">
                        Reset to Default
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
