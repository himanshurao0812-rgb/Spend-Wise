import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

// Metadata for rendering (symbol, locale)
const CURRENCY_META = {
  INR: { symbol: '₹', locale: 'en-IN' },
  USD: { symbol: '$', locale: 'en-US' },
  EUR: { symbol: '€', locale: 'en-IE' },
  GBP: { symbol: '£', locale: 'en-GB' },
  CAD: { symbol: 'CA$', locale: 'en-CA' },
  AUD: { symbol: 'A$', locale: 'en-AU' },
  JPY: { symbol: '¥', locale: 'ja-JP' },
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('INR');
  const [rates, setRates] = useState({
    INR: 1,
    USD: 1 / 83, // initial fallback
    EUR: 1 / 90,
    GBP: 1 / 105,
  });

  useEffect(() => {
    // Fetch live currency rates relative to INR
    fetch('https://open.er-api.com/v6/latest/INR')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rates) {
          // Filter rates to only show currencies defined in CURRENCY_META
          const liveRates = {};
          Object.keys(CURRENCY_META).forEach((key) => {
            if (data.rates[key]) {
              liveRates[key] = data.rates[key];
            }
          });
          setRates(liveRates);
        }
      })
      .catch((err) => console.error("Error fetching rates:", err));
  }, []);

  const formatMoney = (amount) => {
    const rate = rates[currency] || 1;
    const meta = CURRENCY_META[currency] || CURRENCY_META['INR'];
    const converted = amount * rate;
    
    return (
      meta.symbol +
      converted.toLocaleString(meta.locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatMoney, ObjectKeys: Object.keys(rates) }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
