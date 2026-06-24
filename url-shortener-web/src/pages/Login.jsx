import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios, { BASE_URL } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("prefill");
    if (saved) {
      const { email, password } = JSON.parse(saved);
      setForm({ email, password });
      localStorage.removeItem("prefill");
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      setLoading(false);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow rounded p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={login}>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded mb-4"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            className="w-full px-4 py-2 border rounded mb-4"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <LoadingSpinner size={18} text="Logging in..." /> : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account? <Link to="/signup" className="text-blue-600">Signup here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
