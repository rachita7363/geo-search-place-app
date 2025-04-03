import React, { useEffect, useRef, useState } from 'react';
import './search-input.css';
import { useGlobalContext } from '../../context/GlobalContext';
import useDebounce from '../../hooks/useDebounce';

const SearchInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setQuery } = useGlobalContext();

  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Only update global context after debounce
  useEffect(() => {
    console.log('debouncedInput:', debouncedInput);
    setQuery(debouncedInput);
  }, [debouncedInput]);

  return (
    <div className="search-container">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search places..."
        className="search-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <span className="search-shortcut">Ctrl + /</span>
    </div>
  );
};

export default SearchInput;
