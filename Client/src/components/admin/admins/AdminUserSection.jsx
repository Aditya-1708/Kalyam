import { useEffect, useState } from "react";
import {
  createAdminUser,
  deleteUser,
  getAdminUsers,
} from "../../../api/authApi";

const AdminUsersSection = () => {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ADMIN",
  });

  const fetchUsers = async () => {
    try {
      const response = await getAdminUsers();

      setUsers(response.data.users || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createAdminUser(form);

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "ADMIN",
      });

      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this admin?");

    if (!confirmed) return;

    try {
      await deleteUser(id);

      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="uppercase text-sm tracking-[0.3em] text-emerald-600">
          Admin Users
        </p>

        <h1 className="text-4xl font-bold mt-2">Admin Management</h1>
      </div>

      <div className="bg-white rounded-[32px] p-6 border border-slate-200">
        <h2 className="text-2xl font-semibold mb-6">Create Admin User</h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded-2xl px-4 py-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border rounded-2xl px-4 py-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border rounded-2xl px-4 py-3"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="border rounded-2xl px-4 py-3"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border rounded-2xl px-4 py-3"
          >
            <option value="ADMIN">ADMIN</option>

            <option value="USER">USER</option>
          </select>

          <button
            type="submit"
            className="bg-emerald-600 text-white rounded-2xl px-4 py-3 font-semibold"
          >
            Create Admin
          </button>
        </form>
      </div>

      <div className="bg-white rounded-[32px] p-6 border border-slate-200 overflow-auto">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="py-4">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-slate-50">
                <td className="py-4">{user.name}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-rose-500 text-white px-4 py-2 rounded-xl text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersSection;
