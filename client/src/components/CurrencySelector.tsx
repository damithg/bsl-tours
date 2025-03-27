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
          {currency.flag && <span className="mr-1.5 text-base">{currency.flag}</span>}
          <span>{currency.code}</span>
        </span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-60 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ul
            className="py-1 max-h-60 overflow-auto"
            role="listbox"
            aria-labelledby="currency-selector"
          >
            {currencies.map((option) => (
              <li
                key={option.code}
                className={`flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  currency.code === option.code ? 'bg-gray-50 text-primary' : 'text-gray-700'
                }`}
                role="option"
                aria-selected={currency.code === option.code}
                onClick={() => handleSelect(option)}
              >
                {option.flag && <span className="flex-shrink-0 text-lg mr-2">{option.flag}</span>}
                <span className="font-medium mr-2">{option.code}</span>
                <span className="ml-auto text-gray-500">{option.symbol}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}