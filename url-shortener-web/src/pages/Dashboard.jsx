import { useState, useEffect } from 'react';
import axios from '../services/api';
import {BASE_URL} from '../services/api';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/url/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Failed to load stats', err);
      }
    };

    fetchStats();
  }, []);

  const pieChartData = stats && {
    labels: ['Shortened URLs', 'Remaining (max 100)'],
    datasets: [
      {
        data: [stats.total, Math.max(0, 100 - stats.total)],
        backgroundColor: ['#4CAF50', '#FFC107'],
        hoverOffset: 4,
      },
    ],
  };

  const barChartData = stats && {
    labels: ['Today', 'Yesterday', 'This Week', 'Last Week'],
    datasets: [
      {
        label: 'URLs Created',
        data: [stats.today, stats.yesterday, stats.thisWeek, stats.lastWeek],
        backgroundColor: '#2196F3',
        borderColor: '#1976D2',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container" style={{marginTop:"14vh"}}>
      <h3>Dashboard - URL Stats</h3>

      {stats ? (
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="card shadow-sm p-3">
              <h5 className="text-center">Pie Chart - URL Statistics</h5>
              <div style={{ height: '300px' }}>
                <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm p-3">
              <h5 className="text-center">Bar Chart - URL Creation Stats</h5>
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                  },
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading statistics...</p>
      )}
    </div>
  );
};

export default Dashboard;
