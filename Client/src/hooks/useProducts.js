import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../api/productApi";

export const useProducts = (initialCategory = "All") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10, pages: 0 });
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(
    async (searchValue = debouncedSearch, pageNumber = page, categoryValue = category) => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          search: searchValue || undefined,
          page: pageNumber,
          limit: 10,
          category: categoryValue && categoryValue !== "All" ? categoryValue : undefined,
        };

        const response = await getProducts(params);
        setData(response.data.data || []);
        setMeta(response.data.meta || { total: 0, page: 1, limit: 10, pages: 0 });
        return response;
      } catch (fetchError) {
        console.error("Error fetching products:", fetchError);
        setData([]);
        setMeta({ total: 0, page: 1, limit: 10, pages: 0 });
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    },
    [category, debouncedSearch, page]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch !== "" || page !== 1 || category !== initialCategory) {
      fetchProducts(debouncedSearch, page, category);
    }
  }, [debouncedSearch, page, category, fetchProducts, initialCategory]);

  return {
    data,
    loading,
    error,
    search,
    setSearch,
    category,
    setCategory,
    page,
    setPage,
    meta,
    refreshProducts: fetchProducts,
  };
};
