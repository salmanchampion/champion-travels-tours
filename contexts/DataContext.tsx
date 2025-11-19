import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { defaultData, AppData } from '../data';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface DataContextType {
  appData: AppData;
  isLoading: boolean;
  updateAppData: (newData: Partial<AppData>) => Promise<void>;
  resetAppData: () => Promise<void>;
}

const initialContextValue: DataContextType = {
    appData: defaultData,
    isLoading: true,
    updateAppData: async () => {},
    resetAppData: async () => {},
};

export const DataContext = createContext<DataContextType>(initialContextValue);

const isObject = (item: any): item is object => {
    return (item && typeof item === 'object' && !Array.isArray(item));
};

const deepMerge = (target: any, source: any): any => {
    let output = { ...target };
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                } else {
                    output[key] = deepMerge(target[key], source[key]);
                }
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [appData, setAppData] = useState<AppData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        const docRef = doc(db, 'content', 'liveData');
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const dbData = docSnap.data() as AppData;
                
                // --- START: NEW, ROBUST NAVIGATION PATCHING LOGIC ---
                if (dbData.header && dbData.header.navLinks) {
                    let navLinks = dbData.header.navLinks;

                    // Step 1: Clean up old package links to avoid conflicts
                    navLinks = navLinks.filter(link => link.href !== '#packages' && link.label !== 'Hajj & Umrah Packages');
                    const servicesLink = navLinks.find(link => link.label === 'Services');
                    if (servicesLink && servicesLink.subLinks) {
                        servicesLink.subLinks = servicesLink.subLinks.filter(sub => sub.href !== '#packages');
                    }

                    // Step 2: Ensure Hajj is a dropdown
                    const defaultHajjDropdown = defaultData.header.navLinks.find(link => link.label === 'Hajj');
                    if (defaultHajjDropdown) {
                        const hajjIndex = navLinks.findIndex(link => link.label === 'Hajj');
                        if (hajjIndex !== -1) {
                            // It exists, make sure it's a dropdown
                            if (!navLinks[hajjIndex].subLinks) {
                                navLinks[hajjIndex] = JSON.parse(JSON.stringify(defaultHajjDropdown));
                            }
                        } else {
                            // It doesn't exist, insert it
                            const servicesIndex = navLinks.findIndex(link => link.label === 'Services');
                            navLinks.splice(servicesIndex !== -1 ? servicesIndex + 1 : 2, 0, JSON.parse(JSON.stringify(defaultHajjDropdown)));
                        }
                    }

                    // Step 3: Ensure Umrah is a dropdown
                    const defaultUmrahDropdown = defaultData.header.navLinks.find(link => link.label === 'Umrah');
                    if (defaultUmrahDropdown) {
                        const umrahIndex = navLinks.findIndex(link => link.label === 'Umrah');
                        if (umrahIndex !== -1) {
                            // It exists, make sure it's a dropdown
                            if (!navLinks[umrahIndex].subLinks) {
                                navLinks[umrahIndex] = JSON.parse(JSON.stringify(defaultUmrahDropdown));
                            }
                        } else {
                            // It doesn't exist, insert it after Hajj
                            const hajjIndex = navLinks.findIndex(link => link.label === 'Hajj');
                            navLinks.splice(hajjIndex !== -1 ? hajjIndex + 1 : 3, 0, JSON.parse(JSON.stringify(defaultUmrahDropdown)));
                        }
                    }
                    
                    dbData.header.navLinks = navLinks;
                }
                // --- END: NEW, ROBUST NAVIGATION PATCHING LOGIC ---


                // Other existing patches
                const dbNavLinks = dbData.header?.navLinks;

                // Patch: Ensure 'Guidelines' nav link and its sublinks are up-to-date
                const defaultGuidelinesLink = defaultData.header.navLinks.find(link => link.label === 'Guidelines');

                if (dbNavLinks && defaultGuidelinesLink) {
                    let dbGuidelinesLink = dbNavLinks.find(link => link.label === 'Guidelines');
                    if (!dbGuidelinesLink) {
                        const servicesIndex = dbNavLinks.findIndex(link => link.label === 'Services');
                        dbNavLinks.splice(servicesIndex > -1 ? servicesIndex + 1 : 1, 0, JSON.parse(JSON.stringify(defaultGuidelinesLink)));
                    } else {
                        dbGuidelinesLink.subLinks = dbGuidelinesLink.subLinks || [];
                        defaultGuidelinesLink.subLinks?.forEach(defaultSubLink => {
                            if (!dbGuidelinesLink.subLinks.some(dbSubLink => dbSubLink.href === defaultSubLink.href)) {
                                dbGuidelinesLink.subLinks.push(JSON.parse(JSON.stringify(defaultSubLink)));
                            }
                        });
                    }
                }

                // Patch: Ensure 'Why Choose Us' nav link is present
                if (dbNavLinks) {
                    const whyChooseUsLinkInDb = dbNavLinks.find(link => link.href === '#why-choose-us');
                    if (!whyChooseUsLinkInDb) {
                        const defaultWhyChooseUsLink = defaultData.header.navLinks.find(link => link.href === '#why-choose-us');
                        if (defaultWhyChooseUsLink) {
                            const homeIndex = dbNavLinks.findIndex(link => link.href === '#home');
                            dbNavLinks.splice(homeIndex > -1 ? homeIndex + 1 : 0, 0, JSON.parse(JSON.stringify(defaultWhyChooseUsLink)));
                        }
                    }
                }

                // Patch: Ensure new 'Services' sub-links are present
                const defaultServicesLink = defaultData.header.navLinks.find(link => link.label === 'Services');
                if (dbNavLinks && defaultServicesLink) {
                    const dbServicesLink = dbNavLinks.find(link => link.label === 'Services');
                    if (dbServicesLink) { 
                        dbServicesLink.subLinks = dbServicesLink.subLinks || [];
                        defaultServicesLink.subLinks?.forEach(defaultSubLink => {
                            if (!dbServicesLink.subLinks.some(dbSubLink => dbSubLink.href === defaultSubLink.href)) {
                                dbServicesLink.subLinks.push(JSON.parse(JSON.stringify(defaultSubLink)));
                            }
                        });
                    }
                }
                
                // Patch: Ensure custom pages from defaultData exist in dbData
                if (!dbData.customPages) {
                    dbData.customPages = [];
                }
                const dbCustomPageIds = dbData.customPages.map(p => p.id);
                defaultData.customPages.forEach(defaultPage => {
                    if (!dbCustomPageIds.includes(defaultPage.id)) {
                        dbData.customPages.push(JSON.parse(JSON.stringify(defaultPage)));
                    }
                });
                
                setAppData(deepMerge(defaultData, dbData));
            } else {
                // If no data exists in Firestore, initialize it with the default data
                await setDoc(docRef, defaultData);
                setAppData(defaultData);
            }
        } catch (error) {
            console.error("Error fetching data from Firestore:", error);
            // Fallback to default data in case of an error
            setAppData(defaultData);
        } finally {
            setIsLoading(false);
        }
    };

    fetchData();
  }, []);

  const updateAppData = async (newData: Partial<AppData>) => {
    const mergedData = deepMerge(appData, newData);
    setAppData(mergedData); // Optimistic UI update

    const docRef = doc(db, 'content', 'liveData');
    try {
        await setDoc(docRef, mergedData);
    } catch (error) {
        console.error("Failed to save data to Firestore:", error);
        // Optionally, revert the state or show an error message
    }
  };

  const resetAppData = async () => {
    if(window.confirm('Are you sure you want to reset all content to the original defaults? This cannot be undone.')) {
        setAppData(defaultData);
        const docRef = doc(db, 'content', 'liveData');
        try {
            await setDoc(docRef, defaultData);
        } catch (error) {
            console.error("Failed to reset data in Firestore:", error);
        }
    }
  }

  return (
    <DataContext.Provider value={{ appData, isLoading, updateAppData, resetAppData }}>
      {children}
    </DataContext.Provider>
  );
};