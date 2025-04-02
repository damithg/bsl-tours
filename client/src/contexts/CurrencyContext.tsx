import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define currency types
export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Exchange rate relative to USD
  flag?: string; // Flag emoji or image URL
}

// Default supported currencies - USD must be the first item for default fallback
export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1, flag: '/images/flags/us.svg' },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.93, flag: '/images/flags/eu.svg' },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79, flag: '/images/flags/gb.svg' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.53, flag: '/images/flags/au.svg' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.38, flag: '/images/flags/ca.svg' },
];

interface FormatPriceOptions {
  currency?: string;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  currencies: Currency[];
  formatPrice: (price: number, options?: FormatPriceOptions) => string;
}

// Create context with default values
const CurrencyContext = createContext<CurrencyContextType>({
  currency: SUPPORTED_CURRENCIES[0],
  setCurrency: () => {},
  currencies: SUPPORTED_CURRENCIES,
  formatPrice: () => '',
});

// Context provider component
interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
  // Try to get saved currency from localStorage or detect from browser locale
  const getSavedCurrency = (): Currency => {
    // First check localStorage
    if (typeof window !== 'undefined') {
      const savedCurrency = localStorage.getItem('currency');
      if (savedCurrency) {
        try {
          return JSON.parse(savedCurrency);
        } catch (e) {
          // Fall through to locale detection
        }
      }
      
      // Try to detect from browser locale
      try {
        const userLocale = navigator.language || 'en-US';
        
        // Get currency code from locale
        let localeCurrency: string | undefined;
        
        if (userLocale.startsWith('en-GB')) localeCurrency = 'GBP';
        else if (userLocale.includes('US')) localeCurrency = 'USD';
        else if (userLocale.includes('AU')) localeCurrency = 'AUD';
        else if (userLocale.includes('CA')) localeCurrency = 'CAD';
        else if (/^(fr|de|it|es|nl|pt|fi)/i.test(userLocale)) localeCurrency = 'EUR';
        
        // Find matching currency in supported currencies
        if (localeCurrency) {
          const matchedCurrency = SUPPORTED_CURRENCIES.find(c => c.code === localeCurrency);
          if (matchedCurrency) return matchedCurrency;
        }
      } catch (e) {
        console.error('Error detecting locale currency:', e);
      }
    }
    
    // Default to USD if nothing else works
    return SUPPORTED_CURRENCIES[0];
  };

  const [currency, setCurrency] = useState<Currency>(getSavedCurrency());
  const [currencies] = useState<Currency[]>(SUPPORTED_CURRENCIES);

  // Save currency preference to localStorage
  useEffect(() => {
    localStorage.setItem('currency', JSON.stringify(currency));
  }, [currency]);

  // Format price based on current currency
  const formatPrice = (price: number, options?: FormatPriceOptions): string => {
    if (!price) return `${currency.symbol}0`;
    
    // Determine which currency to use (default to the user's selected currency)
    const sourceCurrency = options?.currency || 'USD';
    
    // If source currency is the same as display currency, no conversion needed
    let convertedPrice = price;
    
    // Only convert if source currency is USD and display currency is different
    if (sourceCurrency === 'USD' && currency.code !== 'USD') {
      convertedPrice = price * currency.rate;
    }
    // For other currency conversions, we would need exchange rates between them
    // This is simplified for now assuming source is USD
    
    // Format based on currency
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(convertedPrice);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom hook for using the currency context
export const useCurrency = () => useContext(CurrencyContext);

export default CurrencyContext;