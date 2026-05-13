import { useEffect, useState } from "react";

import { getProducts } from "../api/productApi";

const Showcase = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const API_BASE =
    import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts =
      async () => {
        try {
          setLoading(true);

          const response =
            await getProducts({
              limit: 12,
            });

          setProducts(
            response.data.data || []
          );
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
    <section className="relative overflow-hidden bg-[#fafaf7] py-24 px-6">
      {/* BACKGROUND */}
      <div className="absolute -top-20 -left-20 w-[320px] h-[320px] rounded-full bg-[radial-gradient(circle,rgba(76,175,80,0.12)_0%,transparent_70%)]"></div>

      <div className="absolute -bottom-20 -right-20 w-[320px] h-[320px] rounded-full bg-[radial-gradient(circle,rgba(255,152,0,0.12)_0%,transparent_70%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-[1px] bg-[#4caf50]/40"></div>

            <p className="uppercase tracking-[0.25em] text-[#4caf50] text-xs font-semibold">
              Trusted Healthcare
            </p>

            <div className="w-10 h-[1px] bg-[#4caf50]/40"></div>
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-[#1b5e20] leading-tight">
            Featured{" "}
            <span className="text-transparent [webkit-text-stroke:1.5px_#ff9800]">
              Products
            </span>
          </h2>

          <p className="mt-6 text-[#5f6f5f] max-w-2xl mx-auto leading-8 text-lg">
            Discover trusted pharmaceutical and healthcare
            products crafted for quality, wellness, and
            innovation.
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-[28px] overflow-hidden border border-[#4caf50]/10 animate-pulse"
              >
                <div className="h-[260px] bg-slate-200"></div>

                <div className="p-6 space-y-3">
                  <div className="h-6 bg-slate-200 rounded-full"></div>

                  <div className="h-4 bg-slate-200 rounded-full w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-[32px] p-14 text-center border border-[#4caf50]/10">
            <h3 className="text-3xl font-bold text-[#1b5e20]">
              No Products Available
            </h3>

            <p className="mt-4 text-[#5f6f5f]">
              Products will appear here once added from the
              admin dashboard.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-[30px] overflow-hidden border border-[#4caf50]/10 hover:-translate-y-3 hover:shadow-[0_24px_48px_rgba(27,94,32,0.12)] transition-all duration-500"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden h-[280px] bg-[#f4f7f4]">
                  <img
                    src={`${API_BASE}/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-[#1b5e20] px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-7">
                  <h3 className="text-2xl font-bold text-[#1a2e1a]">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-[#5f6f5f] leading-7">
                    {product.slug}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#4caf50] font-semibold">
                        Category
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#1b1b1b]">
                        {product.category}
                      </p>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-[#4caf50]/10 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-[#4caf50]"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Showcase;