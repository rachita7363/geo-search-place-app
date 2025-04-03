// components/pagination/Pagination.tsx
import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import './pagination.css';

const Pagination: React.FC = () => {
  const { 
    cities, 
    limit, 
    setLimit, 
    setOffset,
  } = useGlobalContext();

  if (!cities?.metadata) return null;

  const { currentOffset, totalCount } = cities.metadata;
  const totalPages = Math.ceil(totalCount / limit);
  const currentPage = Math.floor(currentOffset / limit) + 1;

  const handlePageChange = (newPage: number) => {
    const newOffset = (newPage - 1) * limit;
    setOffset(newOffset);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    setOffset(0); // Reset to first page when changing limit
  };

  return (
    <div className="pagination-container">
      <div className="page-indicator">
        Page {currentPage} of {totalPages}
      </div>

      <div className="navigation-controls">
        <button
          className="nav-btn"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          className="nav-btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <div className="current-page">
          {currentPage}
        </div>
        
        <button
          className="nav-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          className="nav-btn"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>

      <div className="limit-selector">
        <select 
          value={limit} 
          onChange={handleLimitChange}
          className="limit-dropdown"
        >
          {[5, 6, 7, 8, 9, 10].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;