"use client"
import { createContext, useState, ReactNode } from 'react';

interface CityContextType {
  selectedCity: string | null;
  setSelectedCity: (city: string) => void;
}

export const CityContext = createContext<CityContextType>({
  selectedCity: null,
  setSelectedCity: () => {},
});

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  console.log('CityProvider Selected City:', selectedCity)

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};
