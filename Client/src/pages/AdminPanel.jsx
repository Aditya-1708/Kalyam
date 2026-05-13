import { useState } from "react";
import { Pill, Package, ShieldCheck, LogOut } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import MedicinesSection from "../components/admin/medicines/MedicinesSection";
import ProductsSection from "../components/admin/products/ProductsSection";
import AdminUsersSection from "../components/admin/admins/AdminUserSection";

const sidebarItems = [
  {
    label: "Medicines",
    value: "medicines",
    icon: Pill,
  },
  {
    label: "Products",
    value: "products",
    icon: Package,
  },
  {
    label: "Admin Users",
    value: "admins",
    icon: ShieldCheck,
  },
];

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("medicines");

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* SIDEBAR */}
      <aside className="w-[280px] bg-slate-950 text-white flex flex-col justify-between p-6 sticky top-0 h-screen">
        <div>
          <div className="mb-10">
            <p className="text-emerald-400 uppercase tracking-[0.3em] text-xs">
              Pharma Admin
            </p>

            <h1 className="text-3xl font-bold mt-2">Dashboard</h1>
          </div>

          <div className="space-y-3">
            {sidebarItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.value}
                  onClick={() => setActiveSection(item.value)}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 ${
                    activeSection === item.value
                      ? "bg-emerald-600 text-white"
                      : "bg-white/5 hover:bg-white/10 text-slate-300"
                  }`}
                >
                  <Icon size={20} />

                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* USER */}
        <div className="border-t border-white/10 pt-6">
          <div className="mb-4">
            <p className="text-sm text-slate-400">Logged in as</p>

            <h3 className="font-semibold text-lg">
              {user?.name || user?.email}
            </h3>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 transition px-4 py-3 rounded-2xl font-semibold"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* MEDICINES */}
          {activeSection === "medicines" && <MedicinesSection />}

          {/* PRODUCTS */}
          {activeSection === "products" && <ProductsSection />}

          {/* ADMINS */}
          {activeSection === "admins" && <AdminUsersSection />}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
