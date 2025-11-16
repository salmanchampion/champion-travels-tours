import React, { useState, useContext, ChangeEvent } from 'react';
import PageBanner from '../components/PageBanner';
import { DataContext } from '../contexts/DataContext';
import { AppData, HajjPackage, UmrahPackage, TeamMember, GalleryImage, ContactInfo, Service, Testimonial, NavLink } from '../data';

// Helper component for form fields
// FIX: Converted to React.FC with an interface to correctly handle `key` and `className` props.
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
        <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full bg-dark-bg border border-gray-600 rounded-md py-2 px-3 text-light-text focus:outline-none focus:ring-1 focus:ring-primary" />
    </div>
);

const AdminTextarea = ({ label, name, value, onChange, rows = 3 }: { label: string, name: string, value: string, onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void, rows?: number }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-muted-text mb-1">{label}</label>
        <textarea id={name} name={name} value={value} onChange={onChange} rows={rows} className="w-full bg-dark-bg border border-gray-600 rounded-md py-2 px-3 text-light-text focus:outline-none focus:ring-1 focus:ring-primary" />
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

    // Generic handler for nested state
    const handleNestedChange = (path: string, value: any) => {
        setLocalData(prev => {
            const keys = path.split('.');
            let tempState = JSON.parse(JSON.stringify(prev)); // Deep copy to ensure no mutation
            let currentLevel = tempState as any;

            for (let i = 0; i < keys.length - 1; i++) {
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
                                <AdminTextarea label="Details (one per line)" name="details" value={service.details.join('\n')} onChange={e => handleListChange('pages.services.list', index, e.target.name, e.target.value.split('\n'))} rows={6} />
                                </div>
                            </div>
                            <button onClick={() => removeListItem('pages.services.list', index)} className="mt-2 bg-red-600 text-white px-3 py-1 rounded">Remove Service</button>
                        </div>
                    ))}
                    <button onClick={() => addListItem('pages.services.list', { icon: 'New', title: 'New Service', description: '', details: [] })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Service</button>
                </Section>
                
                <Section title="Hajj Packages">
                    {localData.hajjPackages.map((pkg, index) => (
                        <div key={index} className="mb-6 p-4 border border-gray-700 rounded-md">
                            <div className="flex justify-between items-center">
                                <h4 className="font-bold text-xl mb-2 text-secondary">{pkg.name || `Package ${index+1}`}</h4>
                                <button onClick={() => removeListItem('hajjPackages', index)} className="bg-red-600 text-white px-3 py-1 rounded">Remove</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                               <AdminInput label="Name" name="name" value={pkg.name} onChange={e => handleListChange('hajjPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Price" name="price" value={pkg.price} onChange={e => handleListChange('hajjPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Duration" name="duration" value={pkg.duration} onChange={e => handleListChange('hajjPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Hotel Makkah" name="hotelMakkah" value={pkg.hotelMakkah} onChange={e => handleListChange('hajjPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Hotel Madinah" name="hotelMadinah" value={pkg.hotelMadinah} onChange={e => handleListChange('hajjPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Flights Up" name="flightsUp" value={pkg.flightsUp} onChange={e => handleListChange('hajjPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Flights Down" name="flightsDown" value={pkg.flightsDown} onChange={e => handleListChange('hajjPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Food" name="food" value={pkg.food} onChange={e => handleListChange('hajjPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Special Services" name="special" value={pkg.special} onChange={e => handleListChange('hajjPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Image URL" name="image" value={pkg.image} onChange={e => handleListChange('hajjPackages', index, e.target.name, e.target.value)} />
                               <div className="md:col-span-2 lg:col-span-3">
                                <AdminTextarea label="Note" name="note" value={pkg.note} onChange={e => handleListChange('hajjPackages', index, e.target.name, e.target.value)} />
                               </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('hajjPackages', { name: 'New Hajj Package', price: '0', duration: '', hotelMakkah: '', hotelMadinah: '', flightsUp: '', flightsDown: '', food: '', special: '', note: '', image: '' })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Hajj Package</button>
                </Section>
                
                 <Section title="Umrah Packages">
                    {localData.umrahPackages.map((pkg, index) => (
                        <div key={index} className="mb-6 p-4 border border-gray-700 rounded-md">
                            <div className="flex justify-between items-center">
                                <h4 className="font-bold text-xl mb-2 text-secondary">{pkg.name || `Package ${index+1}`}</h4>
                                <button onClick={() => removeListItem('umrahPackages', index)} className="bg-red-600 text-white px-3 py-1 rounded">Remove</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                               <AdminInput label="Name" name="name" value={pkg.name} onChange={e => handleListChange('umrahPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Price" name="price" value={pkg.price} onChange={e => handleListChange('umrahPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Date/Duration" name="date" value={pkg.date} onChange={e => handleListChange('umrahPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Hotel Makkah" name="hotelMakkah" value={pkg.hotelMakkah} onChange={e => handleListChange('umrahPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Hotel Madinah" name="hotelMadinah" value={pkg.hotelMadinah} onChange={e => handleListChange('umrahPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Flights Up" name="flightsUp" value={pkg.flightsUp} onChange={e => handleListChange('umrahPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Flights Down" name="flightsDown" value={pkg.flightsDown} onChange={e => handleListChange('umrahPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Food" name="food" value={pkg.food} onChange={e => handleListChange('umrahPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Special Services" name="special" value={pkg.special} onChange={e => handleListChange('umrahPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Image URL" name="image" value={pkg.image} onChange={e => handleListChange('umrahPackages', index, e.target.name, e.target.value)} />
                               <AdminInput label="Button Text" name="buttonText" value={pkg.buttonText} onChange={e => handleListChange('umrahPackages', index, e.target.name, e.target.value)} />
                               <div className="md:col-span-2 lg:col-span-2">
                                <AdminTextarea label="Note" name="note" value={pkg.note} onChange={e => handleListChange('umrahPackages', index, e.target.name, e.target.value)} />
                               </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('umrahPackages', { name: 'New Umrah Package', price: '0', date: '', hotelMakkah: '', hotelMadinah: '', flightsUp: '', flightsDown: '', food: '', special: '', note: '', image: '', buttonText: 'Book Now' })} className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded">Add Umrah Package</button>
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