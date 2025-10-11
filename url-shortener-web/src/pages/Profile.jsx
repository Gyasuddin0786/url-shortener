import { useEffect, useState } from 'react';
import axios from '../services/api';
import {BASE_URL} from '../services/api';
const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .get(`${BASE_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProfile(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching profile:', err);
          setError('Failed to fetch profile.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container d-flex justify-content-center" style={{marginTop:"20vh"}}>
      <div className="card shadow p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="card-title text-center mb-4">Profile</h3>
        <div className="card-body">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
