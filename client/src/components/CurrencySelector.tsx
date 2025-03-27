import React, { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCurrency, Currency } from '../contexts/CurrencyContext';

export function CurrencySelector() {
  const { currency, setCurrency, currencies } = useCurrency();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (selected: Currency) => {
    setCurrency(selected);
    setIsOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-md py-1.5 px-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2">
          {currency.flag && (
            <img 
              src={currency.flag} 
              alt={currency.code} 
              className="h-4 w-5 object-cover rounded-[1px]" 
            />
          )}
          <span className="font-medium">{currency.code}</span>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-gray-500 ml-0.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1">
          <div className="text-xs text-gray-500 uppercase px-3 py-1 border-b">Select currency</div>
          <ul
            className="py-1 max-h-60 overflow-auto"
            role="listbox"
            aria-labelledby="currency-selector"
          >
            {currencies.map((option) => (
              <li
                key={option.code}
                className={`flex items-center px-3 py-2 text-sm cursor-pointer transition-colors
                  ${currency.code === option.code 
                    ? 'bg-gray-50 text-primary font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
                role="option"
                aria-selected={currency.code === option.code}
                onClick={() => handleSelect(option)}
              >
                <div className="flex items-center gap-2">
                  {option.flag && (
                    <img 
                      src={option.flag} 
                      alt={option.code} 
                      className="h-4 w-5 object-cover rounded-[1px]" 
                    />
                  )}
                  <span className="font-medium">{option.code}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}