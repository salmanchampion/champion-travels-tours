import React from 'react';

const PackageFilterBar: React.FC = () => {
  return (
    <div className="bg-[var(--color-light-bg)] -mt-16 relative z-30 shadow-[var(--ui-shadow)] container mx-auto p-6 rounded-[var(--ui-border-radius)]">
      <h2 className="text-2xl font-bold text-center text-[var(--color-primary)] mb-4 font-display">Find Your Perfect Package</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-[var(--color-primary)] font-bold mb-1 text-sm">Destination</label>
          <input type="text" placeholder="e.g., Makkah" className="w-full bg-[var(--color-dark-bg)] border border-gray-600 rounded-[var(--ui-border-radius)] py-3 px-3 text-[var(--color-light-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"/>
        </div>
        <div>
          <label className="block text-[var(--color-primary)] font-bold mb-1 text-sm">Month</label>
          <input type="month" className="w-full bg-[var(--color-dark-bg)] border border-gray-600 rounded-[var(--ui-border-radius)] py-3 px-3 text-[var(--color-light-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"/>
        </div>
        <div>
          <label className="block text-[var(--color-primary)] font-bold mb-1 text-sm">Package Type</label>
          <select className="w-full bg-[var(--color-dark-bg)] border border-gray-600 rounded-[var(--ui-border-radius)] py-3 px-3 text-[var(--color-light-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] h-[46px]">
            <option>All Packages</option>
            <option>Hajj Package</option>
            <option>Umrah Package</option>
          </select>
        </div>
        <a href="#packages" className="bg-[var(--color-primary)] text-white font-bold py-3 px-4 rounded-[var(--ui-button-radius)] hover:bg-[var(--color-primary-dark)] w-full text-center transition-colors duration-300">
          Search
        </a>
      </div>
    </div>
  );
};

export default PackageFilterBar;
