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
        className="flex items-center gap-1.5 rounded-md py-2.5 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors h-10"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2">
          {currency.flag ? (
            <img 
              src={currency.flag} 
              alt={currency.code}
              className="h-4 w-5 object-contain rounded-sm"
              onError={(e) => {
                // If the image fails to load, set a default content
                const target = e.target as HTMLImageElement;
                target.style.width = '20px';
                target.style.height = '16px';
                target.style.display = 'flex';
                target.style.alignItems = 'center';
                target.style.justifyContent = 'center';
                target.style.background = '#f1f5f9';
                target.style.borderRadius = '2px';
                target.alt = currency.code.substring(0, 2);
              }}
            />
          ) : (
            <span className="h-4 w-5 flex items-center justify-center bg-gray-100 rounded-sm text-[10px] font-bold">
              {currency.code.substring(0, 2)}
            </span>
          )}
          <span className="font-medium">{currency.code}</span>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-gray-500 ml-0.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ul
            className="py-1 max-h-60 overflow-auto"
            role="listbox"
            aria-labelledby="currency-selector"
          >
            {currencies.map((option) => (
              <li
                key={option.code}
                className={`flex items-center px-3 py-3 text-sm cursor-pointer transition-colors
                  ${currency.code === option.code 
                    ? 'bg-gray-50 text-primary font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
                role="option"
                aria-selected={currency.code === option.code}
                onClick={() => handleSelect(option)}
              >
                <div className="flex items-center gap-2 w-full justify-start">
                  {option.flag ? (
                    <img 
                      src={option.flag} 
                      alt={option.code}
                      className="h-4 w-5 object-contain rounded-sm"
                      onError={(e) => {
                        // If the image fails to load, set a default content
                        const target = e.target as HTMLImageElement;
                        target.style.width = '20px';
                        target.style.height = '16px';
                        target.style.display = 'flex';
                        target.style.alignItems = 'center';
                        target.style.justifyContent = 'center';
                        target.style.background = '#f1f5f9';
                        target.style.borderRadius = '2px';
                        target.alt = option.code.substring(0, 2);
                      }}
                    />
                  ) : (
                    <span className="h-4 w-5 flex items-center justify-center bg-gray-100 rounded-sm text-[10px] font-bold">
                      {option.code.substring(0, 2)}
                    </span>
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