import { useNavigate } from "react-router-dom";
import { useMedicines } from "../hooks/useMedicines";
import Reveal from "./Reveal";

const HumanProducts = () => {
  const navigate = useNavigate();

  const {
    data,
    loading,
    search,
    page,
    meta,
    handleSearch,
    handlePageChange,
    handleDelete,
  } = useMedicines("HUMAN");

  const handlePrevPage = () => {
    if (page > 1) handlePageChange(page - 1);
  };

  const handleNextPage = () => {
    if (page < (meta?.pages || 1)) {
      handlePageChange(page + 1);
    }
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header + Switch */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <Reveal>
            <h1 className="text-4xl font-bold">
              Human Pharmaceutical Products
            </h1>
          </Reveal>

          {/* Switch Button */}
          <button
            onClick={() => navigate("/products/veterinary")}
            className="px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition"
          >
            Switch to Veterinary →
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by brand, therapy, or SKU..."
          className="mb-8 w-full p-4 border rounded-xl"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {/* Table */}
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full text-left border-collapse">
            {/* Header */}
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-4 text-sm font-semibold w-12">#</th>
                <th className="p-4 text-sm font-semibold">Brand</th>
                <th className="p-4 text-sm font-semibold">SKU</th>
                <th className="p-4 text-sm font-semibold">Strength</th>
                <th className="p-4 text-sm font-semibold">Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-muted">
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-muted">
                    No medicines found
                  </td>
                </tr>
              ) : (
                data.map((medicine, i) => (
                  <tr
                    key={medicine.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* Row Number */}
                    <td className="p-4 text-muted font-medium">
                      {(page - 1) * (meta?.limit || 10) + i + 1}
                    </td>

                    <td className="p-4 font-semibold text-ink">
                      {medicine.brand}
                    </td>

                    <td className="p-4 text-ink">{medicine.sku}</td>

                    <td className="p-4 text-muted">
                      {medicine.strength}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(medicine.id)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta?.pages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition"
            >
              Prev
            </button>

            <span className="text-sm text-muted">
              Page {page} of {meta?.pages || 1}
            </span>

            <button
              onClick={handleNextPage}
              disabled={page === (meta?.pages || 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition"
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