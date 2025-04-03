// context/GlobalContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { GeoDBCityResponse } from '../dto/geo-db.dto';

interface GeoDBContextValue {
  query: string;
  setQuery: (q: string) => void;
  cities: GeoDBCityResponse | null;
  setCities: (res: GeoDBCityResponse | null) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
  error: string | null;
  setError: (e: string | null) => void;
  limit: number;
  setLimit: (l: number) => void;
  offset: number;
  setOffset: (o: number) => void;
}

const GlobalContext = createContext<GeoDBContextValue | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<GeoDBCityResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  return (
    <GlobalContext.Provider value={{ 
      query, setQuery, 
      cities, setCities, 
      loading, setLoading, 
      error, setError,
      limit, setLimit,
      offset, setOffset
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error('useGlobalContext must be used within a GlobalProvider');
  return context;
};
