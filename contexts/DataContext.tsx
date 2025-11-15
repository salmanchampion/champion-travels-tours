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
             // Merge with default data to ensure new fields are present
             return { ...defaultData, ...parsed };
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
    setAppData(prevData => ({ ...prevData, ...newData }));
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
