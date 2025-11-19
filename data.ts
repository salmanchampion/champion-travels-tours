
import { AppData } from './types';
import { siteConfig } from './data/siteConfig';
import { hajjPackages, umrahPackages } from './data/packages';
import { pagesData, customPagesData } from './data/pages';

// Re-export types for backward compatibility
export * from './types';

export const defaultData: AppData = {
    ...siteConfig,
    hajjPackages,
    umrahPackages,
    pages: pagesData,
    customPages: customPagesData
};
