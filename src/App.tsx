import { useEffect } from "react";
import "./App.css";
import SearchInput from "./components/search-input/SearchInput";
import { GlobalProvider, useGlobalContext } from "./context/GlobalContext";
import useFetchCities from "./hooks/useFetchCities";
import Table from "./components/table/Table";
import Pagination from "./components/pagination/Pagination";

const AppContent = () => {
  const {
    query,
    limit,
    offset,
    setCities,
    setLoading,
    setError,
  } = useGlobalContext();
  const {
    results,
    loading: fetchLoading,
    error: fetchError,
  } = useFetchCities(query, limit, offset);

  useEffect(() => {
    setCities(results);
  }, [results, setCities]);

  useEffect(() => {
    setLoading(fetchLoading);
  }, [fetchLoading, setLoading]);

  useEffect(() => {
    setError(fetchError);
  }, [fetchError, setError]);
  return (
    <div className="app-container">
      <div className="search-bar-container">
        <SearchInput />
      </div>

      <div className="table-container">
        <Table />
      </div>

      <div className="pagination-container">
        <Pagination />
      </div>
    </div>
  );
};

function App() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  );
}

export default App;
