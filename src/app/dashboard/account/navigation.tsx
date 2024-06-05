import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface NavigationProps {
  onNavItemSelect: (label: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onNavItemSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibleItemsCount, setVisibleItemsCount] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: 'Profile and visibility' },
    { label: 'Email'},
    { label: 'Security'},
    { label: 'Account preferences'}
  ];

  useEffect(() => {
    const updateVisibleItemsCount = () => {
      const navWidth = navRef.current ? navRef.current.offsetWidth : 0;
      let availableWidth = navWidth;
      const moreButtonWidth = 100; // Approximate width of the "More" button
      let count = 0;

      navItems.forEach((item, index) => {
        const itemWidth = 100; // Approximate width of each nav item
        if (availableWidth - itemWidth > moreButtonWidth) {
          availableWidth -= itemWidth;
          count++;
        }
      });

      setVisibleItemsCount(count);
    };

    window.addEventListener('resize', updateVisibleItemsCount);
    updateVisibleItemsCount(); // Initial calculation

    return () => window.removeEventListener('resize', updateVisibleItemsCount);
  }, [navItems]);

  const visibleItems = navItems.slice(0, visibleItemsCount);
  const dropdownItems = navItems.slice(visibleItemsCount);

  return (
    <nav ref={navRef} className="flex items-center justify-between bg-grey-100 text-sm">
      <div className="flex space-x-2">
        {visibleItems.map((item, index) => (
          <button
            key={index}
            onClick={() => onNavItemSelect(item.label)}
            className="block px-4 py-2 nav-link text-gray-800 hover:underline decoration-blue-500 decoration-2 underline-offset-[12px] hover:font-semibold hover:text-slate-400 text-sm"
          >
            {item.label}
          </button>
        ))}
      
      </div>
    </nav>
  );
};

export default Navigation;
