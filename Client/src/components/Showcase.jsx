import { useEffect, useState } from "react";

import { ArrowUpRight, Sparkles } from "lucide-react";

import { getProducts } from "../api/productApi";

const Showcase = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await getProducts({
          limit: 12,
        });

        setProducts(response.data.data || []);
      } catch (err) {
        console.error(
          "Failed to fetch products",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fbf8] via-[#fcfcfa] to-[#f7faf7] py-20 sm:py-24 lg:py-28 px-4 sm:px-6">
      {/* BACKGROUND GLOW */}
      <div className="absolute -top-32 -left-32 w-[340px] h-[340px] rounded-full bg-[radial-gradient(circle,rgba(76,175,80,0.14)_0%,transparent_72%)] blur-2xl"></div>

      <div className="absolute -bottom-32 -right-32 w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(255,152,0,0.14)_0%,transparent_72%)] blur-2xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md border border-[#4caf50]/10 rounded-full px-5 py-2 shadow-sm">
            <Sparkles
              size={16}
              className="text-[#4caf50]"
            />

            <p className="uppercase tracking-[0.25em] text-[#4caf50] text-[11px] sm:text-xs font-bold">
              Trusted Healthcare
            </p>
          </div>

          <h2 className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#1b5e20] leading-[1.05]">
            <span>
              Featured
            </span>

            <span className="text-transparent [-webkit-text-stroke:1.5px_#ff9800] leading-none">
              Products
            </span>
          </h2>

          <p className="mt-6 sm:mt-7 text-[#5f6f5f] max-w-2xl mx-auto leading-7 sm:leading-8 text-base sm:text-lg">
            Discover trusted pharma and healthcare
            products crafted for quality, wellness, and
            innovation across human and veterinary care.
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-[30px] overflow-hidden border border-[#4caf50]/10 shadow-sm animate-pulse"
              >
                <div className="h-[260px] bg-slate-200"></div>

                <div className="p-6 space-y-4">
                  <div className="h-6 bg-slate-200 rounded-full w-2/3"></div>

                  <div className="h-4 bg-slate-200 rounded-full"></div>

                  <div className="h-4 bg-slate-200 rounded-full w-5/6"></div>

                  <div className="pt-3 flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-3 w-20 bg-slate-200 rounded-full"></div>

                      <div className="h-4 w-24 bg-slate-200 rounded-full"></div>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-slate-200"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-md rounded-[36px] p-10 sm:p-14 text-center border border-[#4caf50]/10 shadow-sm">
            <div className="w-20 h-20 rounded-3xl bg-[#4caf50]/10 flex items-center justify-center mx-auto">
              <Sparkles
                size={34}
                className="text-[#4caf50]"
              />
            </div>

            <h3 className="mt-7 text-3xl font-black text-[#1b5e20]">
              No Products Available
            </h3>

            <p className="mt-4 text-[#5f6f5f] max-w-lg mx-auto leading-7">
              Products added from the admin dashboard
              will automatically appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white/95 backdrop-blur-sm rounded-[32px] overflow-hidden border border-[#4caf50]/10 hover:border-[#4caf50]/20 shadow-sm hover:shadow-[0_24px_60px_rgba(27,94,32,0.12)] transition-all duration-500 hover:-translate-y-2"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden h-[260px] sm:h-[280px] bg-gradient-to-br from-[#f5faf5] to-[#eef6ee]">
                  <img
                    src={`${API_BASE}/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent"></div>

                  {/* CATEGORY BADGE */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-[#1b5e20] px-4 py-2 rounded-full text-xs font-bold shadow-lg border border-white/30">
                      {product.category}
                    </span>
                  </div>

                  {/* TOP RIGHT ICON */}
                  <div className="absolute top-4 right-4 w-11 h-11 rounded-2xl bg-white/85 backdrop-blur-md flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition duration-300">
                    <ArrowUpRight
                      size={18}
                      className="text-[#1b5e20]"
                    />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 sm:p-7">
                  <div className="min-h-[92px]">
                    <h3 className="text-2xl font-black text-[#162516] leading-tight">
                      {product.name}
                    </h3>

                    <p className="mt-3 text-[#5f6f5f] leading-7 text-sm sm:text-base break-words">
                      {product.slug}
                    </p>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-7 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-[#4caf50] font-bold">
                        Category
                      </p>

                      <p className="mt-2 text-sm font-semibold text-[#1b1b1b]">
                        {product.category}
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 bg-[#4caf50]/20 blur-xl rounded-full"></div>

                      <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4caf50]/15 to-[#4caf50]/5 border border-[#4caf50]/10 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-[#4caf50] shadow-[0_0_18px_rgba(76,175,80,0.55)]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* HOVER BORDER */}
                <div className="absolute inset-0 rounded-[32px] border border-transparent group-hover:border-[#4caf50]/15 pointer-events-none transition duration-500"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Showcase;