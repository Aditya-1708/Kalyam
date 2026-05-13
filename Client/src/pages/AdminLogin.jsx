import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/panel");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    setLoading(true);

    try {
      await loginAdmin(email.trim().toLowerCase(), password.trim());

      // wait for cookie verification
      await login();

      navigate("/admin/panel");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );

      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4 py-10 overflow-hidden relative">
  {/* Background Glow */}
  <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-emerald-500/20 blur-3xl rounded-full"></div>

  <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-blue-500/20 blur-3xl rounded-full"></div>

  {/* Login Card */}
  <div className="relative z-10 w-full max-w-md">
    <div className="bg-white/95 backdrop-blur-xl rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-white/30 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-100 flex items-center justify-center mb-5">
          <ShieldCheck
            size={32}
            className="text-emerald-600"
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Admin Portal
        </h1>

        <p className="text-slate-500 text-sm mt-3 leading-6">
          Authorized personnel only. Please sign in to
          continue.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
          <p className="text-rose-700 text-sm font-medium">
            {error}
          </p>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Email Address
          </label>

          <input
            id="email"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="w-full px-4 py-4 rounded-2xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            className="w-full px-4 py-4 rounded-2xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-semibold py-4 rounded-2xl transition duration-200 flex items-center justify-center gap-3 shadow-lg"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>

              <span>
                Signing In...
              </span>
            </>
          ) : (
            <>
              <ShieldCheck
                size={18}
              />

              <span>
                Sign In
              </span>
            </>
          )}
        </button>

        {/* Home Button */}
        <Link
          to="/"
          className="w-full flex items-center justify-center gap-2 border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold py-4 rounded-2xl transition"
        >
          <ArrowLeft size={18} />

          <span>
            Return to Homepage
          </span>
        </Link>
      </form>

      {/* Footer */}
      <div className="pt-5 border-t border-slate-200 text-center">
        <p className="text-xs text-slate-500 leading-6">
          🔒 This area is restricted to authorized
          administrators only.
        </p>
      </div>
    </div>
  </div>
</div>
  );
};

export default AdminLogin;
