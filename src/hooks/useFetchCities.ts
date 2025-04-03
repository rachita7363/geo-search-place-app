import { useEffect, useState } from 'react';
import { GeoDBService } from '../dto/geo-db.service';
import { GeoDBCityResponse, GeoDBPaginationParams } from '../dto/geo-db.dto';

const apiKey = '1f45305bf4msha8fef00a74fb0a2p12c332jsn801ec531d2eb'; 
const geoDBService = new GeoDBService(apiKey);

const useFetchCities = (query: string, limit: number = 10, offset: number = 0) => {
  console.log(query, limit, offset);
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
        console.log("query", query);
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
