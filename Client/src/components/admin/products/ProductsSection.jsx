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

  const [meta, setMeta] = useState({
    total: 0,
    pages: 1,
  });

  const [productModalOpen, setProductModalOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(initialForm);

  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });

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
      pixelCrop.height,
    );

    return new Promise((resolve) => {
      canvas.toBlob((file) => {
        resolve(file);
      }, "image/jpeg");
    });
  };

  const handleCropSave = async () => {
    try {
      const croppedImage = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
      );

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

      const params = {
        page,
        limit: 10,
      };

      if (search) {
        params.search = search;
      }

      if (category !== "ALL") {
        params.category = category;
      }

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

  const stats = useMemo(() => {
    return {
      total: products.length,

      human: products.filter((p) => p.category === "HUMAN").length,

      veterinary: products.filter((p) => p.category === "VETERINARY").length,
    };
  }, [products]);

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
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("name", form.name);

      formData.append("category", form.category);

      if (form.imageFile) {
        formData.append("image", form.imageFile);
      }

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
    <div className="space-y-6 md:space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="uppercase tracking-[0.3em] text-sm text-emerald-600">
            Products
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            Product Management
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 transition text-white px-5 py-3 rounded-2xl font-semibold shadow-lg"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <div className="bg-white rounded-[28px] p-5 md:p-6 border border-slate-200 shadow-sm">
          <p className="text-slate-500 uppercase text-sm">Total Products</p>

          <h2 className="text-4xl font-bold mt-4">{stats.total}</h2>
        </div>

        <div className="bg-white rounded-[28px] p-5 md:p-6 border border-slate-200 shadow-sm">
          <p className="text-slate-500 uppercase text-sm">Human Products</p>

          <h2 className="text-4xl font-bold mt-4">{stats.human}</h2>
        </div>

        <div className="bg-white rounded-[28px] p-5 md:p-6 border border-slate-200 shadow-sm">
          <p className="text-slate-500 uppercase text-sm">
            Veterinary Products
          </p>

          <h2 className="text-4xl font-bold mt-4">{stats.veterinary}</h2>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-[28px] p-4 md:p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 border rounded-2xl px-4 py-3 w-full lg:max-w-md">
            <Search size={18} className="text-slate-500" />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {["ALL", "HUMAN", "VETERINARY"].map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`flex-1 sm:flex-none px-4 py-3 rounded-2xl font-semibold transition text-sm md:text-base ${
                  category === item
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[28px] p-4 md:p-6 border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left min-w-[700px] md:min-w-[900px]">
          <thead className="border-b">
            <tr>
              <th className="py-4">Product</th>

              <th>Category</th>

              <th>Created</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="py-10 text-center">
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-10 text-center">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="py-5">
                    <div className="flex items-center gap-3 md:gap-4">
                      <img
                        src={`${API_BASE}/${product.image}`}
                        alt={product.name}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl object-cover border shrink-0"
                      />

                      <div>
                        <h3 className="font-semibold">{product.name}</h3>

                        <p className="text-sm text-slate-500">{product.slug}</p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-semibold ${
                        product.category === "HUMAN"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-violet-100 text-violet-700"
                      }`}
                    >
                      {product.category}
                    </span>
                  </td>

                  <td>{new Date(product.createdAt).toLocaleDateString()}</td>

                  <td>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl"
                      >
                        <Edit3 size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-rose-500 text-white p-2.5 md:p-3 rounded-xl"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mt-8">
          <p className="text-sm text-slate-500">{meta.total} products found</p>

          <div className="flex gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="w-12 h-12 rounded-2xl border flex items-center justify-center disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              disabled={page === meta.pages}
              onClick={() => setPage((prev) => prev + 1)}
              className="w-12 h-12 rounded-2xl border flex items-center justify-center disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* PRODUCT MODAL */}
      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {productModalOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-50 bg-black/50 overflow-y-auto"
          >
            <div className="min-h-screen w-full flex items-start md:items-center justify-center p-3 sm:p-4 md:p-6">
              <motion.div
                initial={{
                  y: 60,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: 60,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="bg-white rounded-[24px] md:rounded-[36px] w-full max-w-3xl p-4 sm:p-5 md:p-8 my-6 overflow-hidden shadow-2xl"
              >
                <div className="flex items-start justify-between gap-4 mb-6 md:mb-8">
                  <div>
                    <p className="uppercase tracking-[0.3em] text-xs sm:text-sm text-emerald-600">
                      Product Form
                    </p>

                    <h2 className="text-2xl md:text-3xl font-bold mt-2">
                      {editingProduct ? "Edit Product" : "Create Product"}
                    </h2>
                  </div>

                  <button
                    onClick={closeModal}
                    className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="border rounded-2xl px-4 py-4 w-full"
                  />

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="border rounded-2xl px-4 py-4 w-full"
                  >
                    <option value="HUMAN">HUMAN</option>

                    <option value="VETERINARY">VETERINARY</option>
                  </select>

                  <label className="border rounded-2xl px-4 py-4 flex items-center justify-between cursor-pointer md:col-span-2 overflow-hidden">
                    <span className="truncate">Upload Product Image</span>

                    <Package size={18} className="shrink-0" />

                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageCrop}
                    />
                  </label>

                  {form.imagePreview && (
                    <div className="md:col-span-2">
                      <img
                        src={form.imagePreview}
                        alt="Preview"
                        className="w-full max-w-[220px] h-[220px] object-cover rounded-3xl border"
                      />
                    </div>
                  )}

                  <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-200 font-semibold"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                    >
                      {saving
                        ? "Saving..."
                        : editingProduct
                          ? "Update Product"
                          : "Create Product"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CROPPER MODAL */}
      {/* CROPPER MODAL */}
      <AnimatePresence>
        {showCropper && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[100] bg-black/80 overflow-y-auto"
          >
            <div className="min-h-screen w-full flex items-start md:items-center justify-center p-3 sm:p-4 md:p-6">
              <motion.div
                initial={{
                  scale: 0.9,
                }}
                animate={{
                  scale: 1,
                }}
                exit={{
                  scale: 0.9,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="bg-white rounded-[24px] md:rounded-[32px] w-full max-w-4xl p-4 md:p-6 my-6 shadow-2xl"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="uppercase tracking-[0.3em] text-xs sm:text-sm text-emerald-600">
                      Crop Image
                    </p>

                    <h2 className="text-2xl md:text-3xl font-bold mt-2">
                      Adjust Product Image
                    </h2>
                  </div>

                  <button
                    onClick={() => setShowCropper(false)}
                    className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="relative w-full h-[280px] sm:h-[360px] md:h-[500px] bg-black rounded-3xl overflow-hidden">
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

                <div className="mt-6">
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
                  <button
                    onClick={() => setShowCropper(false)}
                    className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-200 font-semibold"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleCropSave}
                    className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                  >
                    Save Crop
                  </button>
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
