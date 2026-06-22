import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../services/api';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

 const signup = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('https://url-shortener-1-b5ok.onrender.com', form);
    localStorage.setItem('token', res.data.token);
    toast.success('Signup successful! Redirecting to login...');
    setTimeout(() => navigate('/login'), 1500);
  } catch (err) {
    toast.error(err.response?.data?.message || 'Signup failed!');
  }
};


  return (
    <div className="container d-flex justify-content-center" style={{ marginTop: '20vh' }}>
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Signup</h2>
        <form onSubmit={signup}>
          <input type="text" className="form-control mb-2" placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input type="email" className="form-control mb-2" placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input type="password" className="form-control mb-3" placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button className="btn btn-success w-100">Signup</button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
