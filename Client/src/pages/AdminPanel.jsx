import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createAdminUser,
  deleteUser as deleteAdminUser,
  getAdminUsers,
} from "../api/authApi";
import { createMedicine, updateMedicine } from "../api/medicineApi";
import { useAuth } from "../context/AuthContext";
import { useMedicines } from "../hooks/useMedicines";

const initialMedicineForm = {
  brand: "",
  sku: "",
  strength: "",
  threapyArea: "",
  target: "HUMAN",
};

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const {
    data: medicines,
    loading: medsLoading,
    handleDelete: deleteMedicine,
    refreshMedicines,
  } = useMedicines();
  const [activeTab, setActiveTab] = useState("medicines");
  const [adminUsers, setAdminUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [error, setError] = useState("");
  const [medicineForm, setMedicineForm] = useState(initialMedicineForm);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [savingMedicine, setSavingMedicine] = useState(false);
  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ADMIN",
  });
  const [creatingAdmin, setCreatingAdmin] = useState(false);

  useEffect(() => {
    if (activeTab === "users") {
      fetchAdminUsers();
    }
  }, [activeTab]);

  const fetchAdminUsers = async () => {
    setUsersLoading(true);
    try {
      const response = await getAdminUsers();
      setAdminUsers(response.data.users);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setUsersLoading(false);
    }
  };

  const resetMedicineForm = () => {
    setEditingMedicine(null);
    setMedicineForm(initialMedicineForm);
    setError("");
  };

  const handleMedicineChange = (e) => {
    const { name, value } = e.target;
    setMedicineForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditMedicine = (medicine) => {
    setEditingMedicine(medicine);
    setMedicineForm({
      brand: medicine.brand || "",
      sku: medicine.sku || "",
      strength: medicine.strength || "",
      threapyArea: medicine.threapyArea || "",
      target: medicine.target || "HUMAN",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMedicineSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSavingMedicine(true);

    try {
      if (editingMedicine) {
        await updateMedicine(editingMedicine.id, medicineForm);
      } else {
        await createMedicine(medicineForm);
      }
      resetMedicineForm();
      refreshMedicines();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save medicine");
      console.error(err);
    } finally {
      setSavingMedicine(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteAdminUser(id);
        fetchAdminUsers();
      } catch (err) {
        setError("Failed to delete user");
        console.error(err);
      }
    }
  };

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setError("");
    setCreatingAdmin(true);

    try {
      await createAdminUser(adminForm);
      setAdminForm({ name: "", email: "", password: "", role: "ADMIN" });
      fetchAdminUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create admin");
      console.error(err);
    } finally {
      setCreatingAdmin(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-600">
              Welcome, {user?.name || user?.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-3 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveTab("medicines")}
            className={`px-4 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === "medicines"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Medicines
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === "users"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Admin Users
          </button>
        </div>

        {activeTab === "medicines" && (
          <section className="space-y-8">
            <div className="bg-white rounded-3xl shadow p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Manage Medicines
                  </h2>
                  <p className="text-sm text-gray-600">
                    Create or edit medicines directly from the admin panel.
                  </p>
                </div>
                <button
                  onClick={resetMedicineForm}
                  className="inline-flex items-center justify-center rounded-full border border-blue-600 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100 transition"
                >
                  {editingMedicine ? "Add New Medicine" : "Reset Form"}
                </button>
              </div>

              <form
                onSubmit={handleMedicineSubmit}
                className="mt-6 grid gap-4 md:grid-cols-2"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Brand
                  </label>
                  <input
                    name="brand"
                    value={medicineForm.brand}
                    onChange={handleMedicineChange}
                    required
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SKU
                  </label>
                  <input
                    name="sku"
                    value={medicineForm.sku}
                    onChange={handleMedicineChange}
                    required
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Strength
                  </label>
                  <input
                    name="strength"
                    value={medicineForm.strength}
                    onChange={handleMedicineChange}
                    required
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Target
                  </label>
                  <select
                    name="target"
                    value={medicineForm.target}
                    onChange={handleMedicineChange}
                    required
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="HUMAN">HUMAN</option>
                    <option value="ANIMAL">ANIMAL</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Therapy Area
                  </label>
                  <input
                    name="threapyArea"
                    value={medicineForm.threapyArea}
                    onChange={handleMedicineChange}
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div className="md:col-span-2 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={savingMedicine}
                    className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {savingMedicine
                      ? "Saving..."
                      : editingMedicine
                        ? "Update Medicine"
                        : "Create Medicine"}
                  </button>
                  {editingMedicine && (
                    <button
                      type="button"
                      onClick={resetMedicineForm}
                      className="rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-3xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-900 text-white">
                    <tr>
                      <th className="p-4 text-left text-sm font-semibold">
                        Brand
                      </th>
                      <th className="p-4 text-left text-sm font-semibold">
                        SKU
                      </th>
                      <th className="p-4 text-left text-sm font-semibold">
                        Strength
                      </th>
                      <th className="p-4 text-left text-sm font-semibold">
                        Target
                      </th>
                      <th className="p-4 text-left text-sm font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {medsLoading ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="p-4 text-center text-gray-600"
                        >
                          Loading...
                        </td>
                      </tr>
                    ) : medicines.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="p-4 text-center text-gray-600"
                        >
                          No medicines found
                        </td>
                      </tr>
                    ) : (
                      medicines.map((med) => (
                        <tr
                          key={med.id}
                          className="border-t hover:bg-gray-50 transition"
                        >
                          <td className="p-4 font-semibold text-gray-900">
                            {med.brand}
                          </td>
                          <td className="p-4 text-gray-700">{med.sku}</td>
                          <td className="p-4 text-gray-700 text-sm">
                            {med.strength}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                med.target === "HUMAN"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {med.target}
                            </span>
                          </td>
                          <td className="p-4 flex flex-wrap gap-2">
                            <button
                              onClick={() => handleEditMedicine(med)}
                              className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold rounded transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteMedicine(med.id)}
                              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded transition"
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
            </div>
          </section>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Admin Users
                  </h2>
                  <p className="text-sm text-gray-600">
                    Create and manage administrator accounts.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleCreateAdmin}
                className="mt-6 grid gap-4 md:grid-cols-2"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    name="name"
                    value={adminForm.name}
                    onChange={handleAdminChange}
                    required
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={adminForm.email}
                    onChange={handleAdminChange}
                    required
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>

                  <input
                    name="password"
                    type="password"
                    value={adminForm.password}
                    onChange={handleAdminChange}
                    required
                    className="w-full rounded-2xl border border-gray-300 px-4 py-3
    focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>

                  <input
                    name="confirmPassword"
                    type="password"
                    value={adminForm.confirmPassword}
                    onChange={handleAdminChange}
                    required
                    className={`w-full rounded-2xl border px-4 py-3 focus:outline-none focus:ring-2
    ${
      adminForm.confirmPassword &&
      adminForm.password !== adminForm.confirmPassword
        ? "border-red-500 focus:ring-red-100"
        : "border-gray-300 focus:ring-blue-100 focus:border-blue-500"
    }`}
                  />

                  {adminForm.confirmPassword &&
                    adminForm.password !== adminForm.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        Passwords do not match
                      </p>
                    )}

                  {adminForm.confirmPassword &&
                    adminForm.password === adminForm.confirmPassword && (
                      <p className="text-green-600 text-sm mt-1">
                        Passwords match
                      </p>
                    )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    name="role"
                    value={adminForm.role}
                    onChange={handleAdminChange}
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="USER">USER</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={
                      creatingAdmin ||
                      adminForm.password !== adminForm.confirmPassword
                    }
                    className="rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 transition disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {creatingAdmin ? "Creating..." : "Create Admin"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setAdminForm({
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        role: "ADMIN",
                      })
                    }
                    className="rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-green-800 text-white">
                    <tr>
                      <th className="p-4 text-left text-sm font-semibold">
                        Name
                      </th>
                      <th className="p-4 text-left text-sm font-semibold">
                        Email
                      </th>
                      <th className="p-4 text-left text-sm font-semibold">
                        Role
                      </th>
                      <th className="p-4 text-left text-sm font-semibold">
                        Created
                      </th>
                      <th className="p-4 text-left text-sm font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersLoading ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="p-4 text-center text-gray-600"
                        >
                          Loading...
                        </td>
                      </tr>
                    ) : adminUsers.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="p-4 text-center text-gray-600"
                        >
                          No users found
                        </td>
                      </tr>
                    ) : (
                      adminUsers.map((admin) => (
                        <tr
                          key={admin.id}
                          className="border-t hover:bg-gray-50 transition"
                        >
                          <td className="p-4 font-semibold text-gray-900">
                            {admin.name || "N/A"}
                          </td>
                          <td className="p-4 text-gray-700">{admin.email}</td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                admin.role === "ADMIN"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {admin.role}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-gray-600">
                            {new Date(admin.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            {admin.id !== user?.id && (
                              <button
                                onClick={() => handleDeleteUser(admin.id)}
                                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded transition"
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
