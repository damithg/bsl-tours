import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useCurrency, Currency } from '../contexts/CurrencyContext';

export function CurrencySelector() {
  const { currency, setCurrency, currencies } = useCurrency();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (selected: Currency) => {
    setCurrency(selected);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="flex items-center">
          {currency.flag && (
            <div className="mr-1.5 h-4 w-6 overflow-hidden rounded shadow">
              <img src={currency.flag} alt={currency.code} className="h-full w-full object-cover" />
            </div>
          )}
          <span>{currency.code}</span>
        </span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ul
            className="py-1 max-h-60 overflow-auto"
            role="listbox"
            aria-labelledby="currency-selector"
          >
            {currencies.map((option) => (
              <li
                key={option.code}
                className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  currency.code === option.code ? 'bg-gray-50 text-primary' : 'text-gray-700'
                }`}
                role="option"
                aria-selected={currency.code === option.code}
                onClick={() => handleSelect(option)}
              >
                {option.flag && (
                  <div className="h-4 w-6 overflow-hidden rounded shadow">
                    <img src={option.flag} alt={option.code} className="h-full w-full object-cover" />
                  </div>
                )}
                <span className="font-medium">{option.code}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}