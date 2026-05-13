import { AnimatePresence, motion } from "framer-motion";
import Cropper from "react-easy-crop";

import {
  ChevronLeft,
  ChevronRight,
  Edit3,
  Package,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../../api/productApi";

const initialForm = {
  name: "",
  category: "HUMAN",
  imageFile: null,
  imagePreview: "",
};

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, pages: 1 });
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL;

  const handleImageCrop = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setShowCropper(true);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
    return new Promise((resolve) => {
      canvas.toBlob((file) => {
        resolve(file);
      }, "image/jpeg");
    });
  };

  const handleCropSave = async () => {
    try {
      const croppedImage = await getCroppedImg(selectedImage, croppedAreaPixels);
      const croppedFile = new File([croppedImage], "cropped.jpeg", {
        type: "image/jpeg",
      });
      setForm((prev) => ({
        ...prev,
        imageFile: croppedFile,
        imagePreview: URL.createObjectURL(croppedImage),
      }));
      setShowCropper(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = { page, limit: 10 };
      if (search) params.search = search;
      if (category !== "ALL") params.category = category;
      const response = await getProducts(params);
      setProducts(response.data.data || []);
      setMeta({
        total: response.data.meta?.total || 0,
        pages: response.data.meta?.pages || 1,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, category]);

  const stats = useMemo(() => ({
    total: products.length,
    human: products.filter((p) => p.category === "HUMAN").length,
    veterinary: products.filter((p) => p.category === "VETERINARY").length,
  }), [products]);

  const openCreateModal = () => {
    setEditingProduct(null);
    setForm(initialForm);
    setProductModalOpen(true);
  };

  const closeModal = () => {
    setProductModalOpen(false);
    setEditingProduct(null);
    setForm(initialForm);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      if (form.imageFile) formData.append("image", form.imageFile);
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      closeModal();
      fetchProducts();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name || "",
      category: product.category || "HUMAN",
      imageFile: null,
      imagePreview: product.image ? `${API_BASE}/${product.image}` : "",
    });
    setProductModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full min-h-0 space-y-5 md:space-y-7 xl:space-y-8 px-0">

      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="uppercase tracking-[0.25em] text-xs sm:text-sm text-emerald-600 font-medium">
            Products
          </p>
          <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-slate-900 mt-1.5 leading-tight truncate">
            Product Management
          </h1>
        </div>
        <button
          onClick={openCreateModal}
          aria-label="Add new product"
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-95 transition-all text-white px-5 py-3 rounded-2xl font-semibold shadow-md text-sm sm:text-base w-full sm:w-auto shrink-0"
        >
          <Plus size={18} aria-hidden="true" />
          Add Product
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
        {[
          { label: "Total Products", value: stats.total },
          { label: "Human Products", value: stats.human },
          { label: "Veterinary Products", value: stats.veterinary },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-white rounded-[24px] p-5 md:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-slate-500 uppercase text-xs sm:text-sm font-medium tracking-wide">
              {label}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-slate-900">
              {value}
            </h2>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-[24px] p-4 md:p-5 border border-slate-200 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 py-3 w-full lg:max-w-md focus-within:ring-2 focus-within:ring-emerald-400 focus-within:border-emerald-400 transition-all bg-slate-50">
            <Search size={17} className="text-slate-400 shrink-0" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products"
              className="w-full outline-none bg-transparent text-sm text-slate-700 placeholder:text-slate-400"
            />
          </label>

          <div className="flex flex-wrap gap-2 sm:gap-3" role="group" aria-label="Filter by category">
            {["ALL", "HUMAN", "VETERINARY"].map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={`flex-1 sm:flex-none min-w-[80px] px-4 py-2.5 rounded-2xl font-semibold transition-all text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1 active:scale-95 ${
                  category === item
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left" style={{ minWidth: "640px" }}>
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                <th className="py-4 px-5 md:px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Product
                </th>
                <th className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Category
                </th>
                <th className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Created
                </th>
                <th className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
                      <span className="text-sm text-slate-400 font-medium">Loading products...</span>
                    </div>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Package size={36} className="text-slate-300" aria-hidden="true" />
                      <p className="text-slate-400 font-medium text-sm">No products found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-4 px-5 md:px-6">
                      <div className="flex items-center gap-3 md:gap-4">
                        <img
                          src={`${API_BASE}/${product.image}`}
                          alt={product.name}
                          className="w-12 h-12 md:w-14 md:h-14 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-100"
                        />
                        <div className="min-w-0">
                          <h3 className="font-semibold text-slate-800 text-sm md:text-base truncate max-w-[160px] md:max-w-[240px]">
                            {product.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-400 truncate max-w-[160px] md:max-w-[240px]">
                            {product.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                          product.category === "HUMAN"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-violet-100 text-violet-700"
                        }`}
                      >
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-500 whitespace-nowrap">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          aria-label={`Edit ${product.name}`}
                          className="bg-slate-900 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-1 active:scale-95 text-white p-2.5 rounded-xl transition-all"
                        >
                          <Edit3 size={15} aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          aria-label={`Delete ${product.name}`}
                          className="bg-rose-500 hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-1 active:scale-95 text-white p-2.5 rounded-xl transition-all"
                        >
                          <Trash2 size={15} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-5 md:px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <p className="text-xs sm:text-sm text-slate-500">
            <span className="font-semibold text-slate-700">{meta.total}</span> products found
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              aria-label="Previous page"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-slate-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-95 transition-all"
            >
              <ChevronLeft size={17} aria-hidden="true" />
            </button>
            <span className="text-sm font-medium text-slate-600 px-2">
              {page} / {meta.pages}
            </span>
            <button
              disabled={page === meta.pages}
              onClick={() => setPage((prev) => prev + 1)}
              aria-label="Next page"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-slate-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-95 transition-all"
            >
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {productModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label={editingProduct ? "Edit Product" : "Create Product"}
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <div className="min-h-screen w-full flex items-start justify-center p-3 sm:p-5 md:p-8 md:items-center">
              <motion.div
                initial={{ y: 48, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 48, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-white rounded-[24px] md:rounded-[32px] w-full max-w-2xl my-4 shadow-2xl border border-slate-100 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-5 sm:p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-6 md:mb-8">
                    <div className="min-w-0">
                      <p className="uppercase tracking-[0.25em] text-xs sm:text-sm text-emerald-600 font-medium">
                        Product Form
                      </p>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-1.5 text-slate-900 leading-tight">
                        {editingProduct ? "Edit Product" : "Create Product"}
                      </h2>
                    </div>
                    <button
                      onClick={closeModal}
                      aria-label="Close modal"
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 active:scale-95"
                    >
                      <X size={18} aria-hidden="true" />
                    </button>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5"
                  >
                    <div className="sm:col-span-1">
                      <label htmlFor="product-name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                        Product Name
                      </label>
                      <input
                        id="product-name"
                        type="text"
                        name="name"
                        placeholder="e.g. Amoxicillin 500mg"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="border border-slate-200 rounded-2xl px-4 py-3.5 w-full text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all bg-slate-50"
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="product-category" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                        Category
                      </label>
                      <select
                        id="product-category"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="border border-slate-200 rounded-2xl px-4 py-3.5 w-full text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all bg-slate-50 appearance-none cursor-pointer"
                      >
                        <option value="HUMAN">HUMAN</option>
                        <option value="VETERINARY">VETERINARY</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                        Product Image
                      </label>
                      <label
                        className="border-2 border-dashed border-slate-200 rounded-2xl px-4 py-4 flex items-center justify-between cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400"
                        aria-label="Upload product image"
                      >
                        <span className="text-sm text-slate-500 group-hover:text-emerald-600 transition-colors truncate pr-3">
                          {form.imageFile ? form.imageFile.name : "Click to upload image"}
                        </span>
                        <Package size={18} className="text-slate-400 group-hover:text-emerald-500 shrink-0 transition-colors" aria-hidden="true" />
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleImageCrop}
                          aria-label="Product image file input"
                        />
                      </label>
                    </div>

                    {form.imagePreview && (
                      <div className="sm:col-span-2">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                          Preview
                        </p>
                        <div className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                          <img
                            src={form.imagePreview}
                            alt="Product preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 font-semibold text-slate-700 text-sm transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 shadow-sm"
                      >
                        {saving
                          ? "Saving..."
                          : editingProduct
                          ? "Update Product"
                          : "Create Product"}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CROPPER MODAL */}
      <AnimatePresence>
        {showCropper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Crop product image"
          >
            <div className="min-h-screen w-full flex items-start justify-center p-3 sm:p-5 md:p-8 md:items-center">
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-white rounded-[24px] md:rounded-[32px] w-full max-w-3xl my-4 shadow-2xl overflow-hidden border border-slate-100"
              >
                <div className="p-5 sm:p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4 mb-5 md:mb-6">
                    <div className="min-w-0">
                      <p className="uppercase tracking-[0.25em] text-xs sm:text-sm text-emerald-600 font-medium">
                        Crop Image
                      </p>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-1.5 text-slate-900 leading-tight">
                        Adjust Product Image
                      </h2>
                    </div>
                    <button
                      onClick={() => setShowCropper(false)}
                      aria-label="Close crop modal"
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 active:scale-95"
                    >
                      <X size={18} aria-hidden="true" />
                    </button>
                  </div>

                  <div
                    className="relative w-full bg-black rounded-2xl overflow-hidden"
                    style={{ height: "clamp(240px, 45vw, 480px)" }}
                  >
                    <Cropper
                      image={selectedImage}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>

                  <div className="mt-5 md:mt-6">
                    <label htmlFor="zoom-slider" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                      Zoom
                    </label>
                    <input
                      id="zoom-slider"
                      type="range"
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      aria-label="Adjust zoom"
                      className="w-full accent-emerald-600 cursor-pointer h-2 rounded-full"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>1×</span>
                      <span>3×</span>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 md:mt-7">
                    <button
                      onClick={() => setShowCropper(false)}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 font-semibold text-slate-700 text-sm transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCropSave}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 shadow-sm"
                    >
                      Save Crop
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsSection;