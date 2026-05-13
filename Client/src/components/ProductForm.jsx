import { useMemo } from "react";

const ProductForm = ({
  values,
  onChange,
  onFileChange,
  onSubmit,
  onCancel,
  isSaving,
  formError,
}) => {
  const previewUrl = useMemo(() => {
    if (values.imagePreview) return values.imagePreview;
    if (values.imageUrl) return values.imageUrl;
    return null;
  }, [values.imagePreview, values.imageUrl]);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {formError && (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Product Name
          <input
            name="name"
            value={values.name}
            onChange={onChange}
            required
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Category
          <select
            name="category"
            value={values.category}
            onChange={onChange}
            required
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
          >
            <option value="HUMAN">Human</option>
            <option value="VETERINARY">Veterinary</option>
          </select>
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Price
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={values.price}
            onChange={onChange}
            required
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-slate-800">
          Image Upload
          <input
            type="file"
            name="image"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={onFileChange}
            className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm font-semibold text-slate-800">
        Description
        <textarea
          name="description"
          value={values.description}
          onChange={onChange}
          rows={4}
          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        />
      </label>

      {previewUrl && (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="mb-3 text-sm font-semibold text-slate-700">Image preview</p>
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full rounded-3xl object-cover"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-3xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSaving ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
