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
        className="flex items-center gap-1.5 rounded-md py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors h-10 border border-gray-100 shadow-sm"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2">
          {currency.flag ? (
            <div className="h-4 w-6 overflow-hidden flex items-center justify-center rounded-sm shadow-sm">
              <img 
                src={currency.flag} 
                alt={currency.code}
                className="h-full w-full object-cover"
                onError={(e) => {
                  // If the image fails to load, set a default content
                  const target = e.target as HTMLImageElement;
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add('bg-gray-100');
                    parent.textContent = currency.code.substring(0, 2);
                    parent.style.fontSize = '10px';
                    parent.style.fontWeight = 'bold';
                    parent.style.display = 'flex';
                    parent.style.alignItems = 'center';
                    parent.style.justifyContent = 'center';
                  }
                }}
              />
            </div>
          ) : (
            <div className="h-4 w-6 flex items-center justify-center bg-gray-100 rounded-sm text-[10px] font-bold shadow-sm">
              {currency.code.substring(0, 2)}
            </div>
          )}
          <span className="font-medium">{currency.code}</span>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-gray-500 ml-0.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ul
            className="py-0.5 max-h-60 overflow-auto"
            role="listbox"
            aria-labelledby="currency-selector"
          >
            {currencies.map((option) => (
              <li
                key={option.code}
                className={`flex items-center px-3 py-2.5 text-sm cursor-pointer transition-colors
                  ${currency.code === option.code 
                    ? 'bg-gray-50 text-primary font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
                role="option"
                aria-selected={currency.code === option.code}
                onClick={() => handleSelect(option)}
              >
                <div className="flex items-center gap-2.5 w-full justify-start">
                  {option.flag ? (
                    <div className="h-4 w-6 overflow-hidden flex items-center justify-center rounded-sm shadow-sm">
                      <img 
                        src={option.flag} 
                        alt={option.code}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          // If the image fails to load, set a default content
                          const target = e.target as HTMLImageElement;
                          const parent = target.parentElement;
                          if (parent) {
                            parent.classList.add('bg-gray-100');
                            parent.textContent = option.code.substring(0, 2);
                            parent.style.fontSize = '10px';
                            parent.style.fontWeight = 'bold';
                            parent.style.display = 'flex';
                            parent.style.alignItems = 'center';
                            parent.style.justifyContent = 'center';
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-4 w-6 flex items-center justify-center bg-gray-100 rounded-sm text-[10px] font-bold shadow-sm">
                      {option.code.substring(0, 2)}
                    </div>
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