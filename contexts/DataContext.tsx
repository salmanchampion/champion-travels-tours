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

                // Patch: Ensure 'Guidelines' nav link and its sublinks are up-to-date
                const dbNavLinks = dbData.header?.navLinks;
                const defaultGuidelinesLink = defaultData.header.navLinks.find(link => link.label === 'Guidelines');

                if (dbNavLinks && defaultGuidelinesLink) {
                    let dbGuidelinesLink = dbNavLinks.find(link => link.label === 'Guidelines');
                    if (!dbGuidelinesLink) {
                        // Guidelines menu is missing, add it.
                        const servicesIndex = dbNavLinks.findIndex(link => link.label === 'Services');
                        dbNavLinks.splice(servicesIndex > -1 ? servicesIndex + 1 : 1, 0, JSON.parse(JSON.stringify(defaultGuidelinesLink)));
                    } else {
                        // Guidelines menu exists, check for missing sublinks from default.
                        dbGuidelinesLink.subLinks = dbGuidelinesLink.subLinks || [];
                        defaultGuidelinesLink.subLinks?.forEach(defaultSubLink => {
                            if (!dbGuidelinesLink.subLinks.some(dbSubLink => dbSubLink.href === defaultSubLink.href)) {
                                dbGuidelinesLink.subLinks.push(JSON.parse(JSON.stringify(defaultSubLink)));
                            }
                        });
                    }
                }
                
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