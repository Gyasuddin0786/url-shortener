import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios, { BASE_URL } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

 const signup = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await axios.post(`${BASE_URL}/auth/signup`, form);
    localStorage.setItem('token', res.data.token);
    toast.success('Signup successful! Redirecting to login...');
    setLoading(false);
    setTimeout(() => navigate('/login'), 1500);
  } catch (err) {
    toast.error(err.response?.data?.message || 'Signup failed!');
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow rounded p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>
        <form onSubmit={signup}>
          <input type="text" className="w-full px-4 py-2 border rounded mb-3" placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input type="email" className="w-full px-4 py-2 border rounded mb-3" placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input type="password" className="w-full px-4 py-2 border rounded mb-4" placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center" disabled={loading}>
            {loading ? <LoadingSpinner size={18} text="Signing up..." /> : 'Signup'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
