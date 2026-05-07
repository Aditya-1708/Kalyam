import { useCallback, useEffect, useState } from 'react';
import { deleteMedicine, getMedicines } from '../api/medicineApi';

export const useMedicines = (target) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10, pages: 0 });

  const fetchMedicines = useCallback(async (searchTerm = debouncedSearch, pageNum = page) => {
    setLoading(true);
    try {
      const response = await getMedicines({ search: searchTerm, target, page: pageNum, limit: 10 });
      setData(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.error('Error fetching medicines:', error);
      setData([]);
      setMeta({ total: 0, page: 1, limit: 10, pages: 0 });
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, page, target]);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch !== '' || page !== 1) {
      fetchMedicines(debouncedSearch, page);
    }
  }, [debouncedSearch, page, fetchMedicines]);

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedicine(id);
      fetchMedicines(debouncedSearch, page);
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  return {
    data,
    loading,
    search,
    page,
    meta,
    handleSearch,
    handlePageChange,
    handleDelete,
    refreshMedicines: fetchMedicines,
  };
};