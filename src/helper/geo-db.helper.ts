// geo-db.helpers.ts
import { GeoDBCityResponse } from '../dto/geo-db.dto';

/**
 * Extracts pagination information from response
 */
export function getPagination(response: GeoDBCityResponse): {
  currentOffset: number;
  totalCount: number;
  hasMore: boolean;
} {
  return {
    currentOffset: response.metadata.currentOffset,
    totalCount: response.metadata.totalCount,
    hasMore: response.metadata.currentOffset + response.data.length < response.metadata.totalCount,
  };
}