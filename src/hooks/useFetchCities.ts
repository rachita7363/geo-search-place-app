import { useEffect, useState } from 'react';
import { GeoDBCityResponse, GeoDBPaginationParams } from '../dto/geo-db.dto';
import { GeoDBService } from '../service/geo-db.service';

const apiKey = import.meta.env.VITE_GEO_DB_API_KEY || '';

const geoDBService = new GeoDBService(apiKey);

const useFetchCities = (query: string, limit: number = 10, offset: number = 0) => {
  const [results, setResults] = useState<GeoDBCityResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setResults(null);
    }

    const fetchCities = async () => {
      setLoading(true);
      setError(null);
      try {
        const params: GeoDBPaginationParams = {
          namePrefix: query,
          limit,
          offset,
        };
        const data = await geoDBService.searchCitiesAPI(params);
        setResults(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching cities');
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [query, limit, offset]);

  return { results, loading, error };
};

export default useFetchCities;
