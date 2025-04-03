import React from 'react';
import './table.css';
import { useGlobalContext } from '../../context/GlobalContext';
import { GeoDBCity } from '../../dto/geo-db.dto';
import Spinner from '../spinner/Spinner';

const Table: React.FC = () => {
  const { cities, loading, error } = useGlobalContext();

  if (loading) {
    return (
      <div className="custom-table-wrapper centered">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="custom-table-wrapper centered error-text">
        {error}
      </div>
    );
  }

  return (
    <div className="custom-table-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>City</th>
            <th>Country</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody>
          {cities?.data && cities.data.length > 0 ? (
            cities.data.map((city: GeoDBCity) => (
              <tr key={city.id}>
                <td>{city.id}</td>
                <td>{city.city}</td>
                <td>{city.country}</td>
                <td><img src={`https://flagsapi.com/${city.countryCode}/shiny/24.png`}/></td>
              </tr>
            ))
          ) : (
            <tr>
            <td colSpan={4}>
              <div className="no-results-wrapper">No matching cities found</div>
            </td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
