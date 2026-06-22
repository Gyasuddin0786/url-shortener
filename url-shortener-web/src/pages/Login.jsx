import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../services/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

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
    try {
      const res = await axios.post("https://url-shortener-1-b5ok.onrender.com", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="container d-flex justify-content-center" style={{ marginTop: "20vh" }}>
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={login}>
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="btn btn-success w-100">Login</button>
        </form>
        <p className="mt-3 text-center">
          Don’t have an account? <Link to="/signup">Signup here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
