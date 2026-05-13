import { useEffect, useState } from "react";

import { getMedicines } from "../api/medicineApi";

import Reveal from "./Reveal";

const HumanProducts = () => {
  const [medicines, setMedicines] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,
  });

  const fetchMedicines = async (currentSearch = search, currentPage = page) => {
    try {
      setLoading(true);

      const response = await getMedicines({
        search: currentSearch,
        page: currentPage,
        limit: 10,
        target: "HUMAN",
      });

      setMedicines(response.data?.data || []);

      setMeta(
        response.data?.meta || {
          total: 0,
          page: 1,
          limit: 10,
          pages: 1,
        },
      );
    } catch (error) {
      console.error("Failed to fetch medicines:", error);

      setMedicines([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines(search, page);
  }, [search, page]);

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <Reveal>
          <div className="mb-10">
            <p className="uppercase tracking-[0.3em] text-sm text-green-600">
              Healthcare
            </p>

            <h1 className="text-4xl font-bold text-gray-900 mt-3">
              Human Medicines
            </h1>
          </div>
        </Reveal>

        <div className="flex justify-end mb-8">
          <button
            onClick={() => (window.location.href = "/products/veterinary")}
            className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold transition"
          >
            Go to Veterinary Medicines →{" "}
          </button>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search medicines..."
          className="mb-8 w-full p-4 border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {/* TABLE */}
        <div className="overflow-x-auto border border-gray-200 rounded-3xl">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-5 text-sm font-semibold text-gray-700">
                  Brand
                </th>

                <th className="px-6 py-5 text-sm font-semibold text-gray-700">
                  SKU
                </th>

                <th className="px-6 py-5 text-sm font-semibold text-gray-700">
                  Strength
                </th>

                <th className="px-6 py-5 text-sm font-semibold text-gray-700">
                  Therapy Area
                </th>

                <th className="px-6 py-5 text-sm font-semibold text-gray-700">
                  Target
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : medicines.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-gray-500">
                    No medicines found
                  </td>
                </tr>
              ) : (
                medicines.map((medicine) => (
                  <tr
                    key={medicine.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-5 font-semibold text-gray-900">
                      {medicine.brand}
                    </td>

                    <td className="px-6 py-5 text-gray-600">{medicine.sku}</td>

                    <td className="px-6 py-5 text-gray-600">
                      {medicine.strength}
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {medicine.threapyArea || "-"}
                    </td>

                    <td className="px-6 py-5">
                      <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        {medicine.target}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {meta.pages > 1 && (
          <div className="flex justify-center items-center mt-10 gap-4">
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
              className="px-5 py-2 rounded-xl bg-green-600 text-white disabled:bg-gray-300"
            >
              Prev
            </button>

            <span className="text-sm text-gray-600">
              Page {page} of {meta.pages}
            </span>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === meta.pages}
              className="px-5 py-2 rounded-xl bg-green-600 text-white disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HumanProducts;
