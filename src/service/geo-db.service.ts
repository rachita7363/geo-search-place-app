import { GeoDBCityResponse, GeoDBPaginationParams } from "../dto/geo-db.dto";

const BASE_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

export class GeoDBService {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Makes a request to the GeoDB API
   * @param endpoint API endpoint
   * @param params Query parameters
   * @returns Promise with typed response
   */
  private async request<T>(
    endpoint: string,
    params: Record<string, string | number> = {}
  ): Promise<T> {

    try {
      const queryString = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>)
      ).toString();

      const url = `${BASE_URL}${endpoint}?${queryString}`;

      const response = await fetch(url, {
        headers: {
          'x-rapidapi-key': this.apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          throw new Error('API rate limit exceeded. Please wait a moment and try again.');
        }
        throw new Error(errorData.message || `API Error: ${response.statusText}`);
      }

      return await response.json() as T;
    } catch (error) {
      console.error('GeoDB API request failed:', error);
      throw error;
    }
  }

  /**
   * Search for cities by name prefix
   * @param params Search parameters
   * @returns Promise with city response
   */
  public async searchCitiesAPI(
    params: GeoDBPaginationParams
  ): Promise<GeoDBCityResponse> {
    return this.request<GeoDBCityResponse>('/cities', {
      namePrefix: params.namePrefix || '',
      limit: params.limit || 5,
      offset: params.offset || 0,
    });
  }
}