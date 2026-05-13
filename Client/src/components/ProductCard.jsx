import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl"
    >
      <div className="relative overflow-hidden rounded-3xl bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700 shadow-sm">
            {product.category || "General"}
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{product.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">
            {product.description || "Premium pharma product for curated care."}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-4">
          <p className="text-lg font-bold text-slate-900">₹{product.price?.toFixed(2) ?? "0.00"}</p>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 shadow-sm">
            {product.category || "All"}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;
