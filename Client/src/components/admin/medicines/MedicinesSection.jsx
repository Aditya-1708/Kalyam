import { useEffect, useState } from "react";
import {
  createMedicine,
  deleteMedicine,
  getMedicines,
  updateMedicine,
} from "../../../api/medicineApi";

const initialForm = {
  brand: "",
  sku: "",
  strength: "",
  threapyArea: "",
  target: "HUMAN",
};

const MedicinesSection = () => {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMedicines = async () => {
    try {
      setLoading(true);

      const response = await getMedicines();

      setMedicines(response.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateMedicine(editing.id, form);
      } else {
        await createMedicine(form);
      }

      resetForm();
      fetchMedicines();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (medicine) => {
    setEditing(medicine);

    setForm({
      brand: medicine.brand,
      sku: medicine.sku,
      strength: medicine.strength,
      threapyArea: medicine.threapyArea,
      target: medicine.target,
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this medicine?");

    if (!confirmed) return;

    try {
      await deleteMedicine(id);

      fetchMedicines();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="uppercase text-sm tracking-[0.3em] text-emerald-600">
          Medicines
        </p>

        <h1 className="text-4xl font-bold text-slate-900 mt-2">
          Medicines Management
        </h1>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-200">
        <h2 className="text-2xl font-semibold mb-6">
          {editing ? "Edit Medicine" : "Add Medicine"}
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            required
            className="border rounded-2xl px-4 py-3"
          />

          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={form.sku}
            onChange={handleChange}
            required
            className="border rounded-2xl px-4 py-3"
          />

          <input
            type="text"
            name="strength"
            placeholder="Strength"
            value={form.strength}
            onChange={handleChange}
            required
            className="border rounded-2xl px-4 py-3"
          />

          <input
            type="text"
            name="threapyArea"
            placeholder="Therapy Area"
            value={form.threapyArea}
            onChange={handleChange}
            className="border rounded-2xl px-4 py-3"
          />

          <select
            name="target"
            value={form.target}
            onChange={handleChange}
            className="border rounded-2xl px-4 py-3"
          >
            <option value="HUMAN">HUMAN</option>
            <option value="ANIMAL">ANIMAL</option>
          </select>

          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl px-4 py-3 font-semibold"
          >
            {editing ? "Update Medicine" : "Create Medicine"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-200 overflow-auto">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="py-4">Brand</th>
              <th>SKU</th>
              <th>Strength</th>
              <th>Therapy Area</th>
              <th>Target</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-10 text-center">
                  Loading...
                </td>
              </tr>
            ) : medicines.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-10 text-center">
                  No medicines found
                </td>
              </tr>
            ) : (
              medicines.map((medicine) => (
                <tr key={medicine.id} className="border-b hover:bg-slate-50">
                  <td className="py-4 font-medium">{medicine.brand}</td>

                  <td>{medicine.sku}</td>

                  <td>{medicine.strength}</td>

                  <td>{medicine.threapyArea}</td>

                  <td>{medicine.target}</td>

                  <td>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(medicine)}
                        className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(medicine.id)}
                        className="bg-rose-500 text-white px-4 py-2 rounded-xl text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicinesSection;
