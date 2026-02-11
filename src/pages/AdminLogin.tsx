import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ADMIN_ID = "admin@123";
const ADMIN_PASSWORD = "Akshat#4678";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 200));

    if (formData.email === ADMIN_ID && formData.password === ADMIN_PASSWORD) {
      localStorage.setItem("techmasterai_admin", "true");
      localStorage.setItem(
        "techmasterai_user",
        JSON.stringify({ name: "Admin", email: formData.email })
      );
      import("@/lib/activityTracker").then(({ recordActivity }) =>
        recordActivity("admin_login", "Admin panel access")
      );
      toast.success("Welcome, Admin!");
      navigate("/admin", { replace: true });
    } else {
      toast.error("Invalid admin credentials");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-cyan-400">Admin Panel</h1>
          <p className="text-sm text-gray-400 mt-1">Enter admin ID and password</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Admin ID</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Admin ID"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            {isLoading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500">
          <Link to="/" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
