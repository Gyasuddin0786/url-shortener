import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div
      className="bg-white shadow p-3"
      style={{ width: '220px', minHeight: '100vh' }}
    >
      <h5 className="mb-4">Dashboard</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            to="/shorten"
            className={`nav-link ${pathname === '/shorten' ? 'active text-primary' : 'text-dark'}`}
          >
            🔗 Shorten URL
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/history"
            className={`nav-link ${pathname === '/history' ? 'active text-primary' : 'text-dark'}`}
          >
            📜 History
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/features"
            className={`nav-link ${pathname === '/features' ? 'active text-primary' : 'text-dark'}`}
          >
            ⚙️ Features
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
