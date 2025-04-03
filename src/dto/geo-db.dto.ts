export interface GeoDBCity {
    id: number;
    wikiDataId: string;
    type: string;
    city: string;
    name: string;
    country: string;
    countryCode: string;
    region: string;
    regionCode: string;
    regionWdId: string;
    latitude: number;
    longitude: number;
    population: number;
}

/**
 * Response metadata
 */
export interface GeoDBMetadata {
    currentOffset: number;
    totalCount: number;
}

/**
 * Complete API response structure
 */
export interface GeoDBCityResponse {
    data: GeoDBCity[];
    metadata: GeoDBMetadata;
}

/**
 * Pagination parameters for requests
 */
export interface GeoDBPaginationParams {
    offset: number;
    limit: number;
    namePrefix: string;
}

/**
 * Geo DB context dto
 */
export interface GeoDBContextValue {
    query: string;
    setQuery: (q: string) => void;
    cities: GeoDBCityResponse | null;
    setCities: (res: GeoDBCityResponse | null) => void;
    loading: boolean;
    setLoading: (val: boolean) => void;
    error: string | null;
    setError: (e: string | null) => void;
}