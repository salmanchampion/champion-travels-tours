import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { defaultData, AppData } from '../data';

interface DataContextType {
  appData: AppData;
  updateAppData: (newData: Partial<AppData>) => void;
  resetAppData: () => void;
}

// Ensure defaultData is not undefined when creating the context
const initialContextValue: DataContextType = {
    appData: defaultData,
    updateAppData: () => {},
    resetAppData: () => {},
};

export const DataContext = createContext<DataContextType>(initialContextValue);

// Helper function for deep merging objects
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
  const [appData, setAppData] = useState<AppData>(() => {
    try {
      const storedData = localStorage.getItem('appData');
      if (storedData) {
        // Basic check to see if it's a valid object
        const parsed = JSON.parse(storedData);
        if (typeof parsed === 'object' && parsed !== null && parsed.site) {
             // Deep merge with default data to ensure new fields from updates are present
             return deepMerge(defaultData, parsed);
        }
      }
    } catch (error) {
      console.error("Failed to parse appData from localStorage", error);
    }
    // Fallback to default data
    return defaultData;
  });

  useEffect(() => {
    try {
      localStorage.setItem('appData', JSON.stringify(appData));
    } catch (error) {
      console.error("Failed to save appData to localStorage", error);
    }
  }, [appData]);

  const updateAppData = (newData: Partial<AppData>) => {
    setAppData(prevData => deepMerge(prevData, newData));
  };

  const resetAppData = () => {
    if(window.confirm('Are you sure you want to reset all content to the original defaults? This cannot be undone.')) {
        setAppData(defaultData);
        localStorage.removeItem('appData');
    }
  }

  return (
    <DataContext.Provider value={{ appData, updateAppData, resetAppData }}>
      {children}
    </DataContext.Provider>
  );
};