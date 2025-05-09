import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = dark
      ? "bg-dark text-light"
      : "bg-light text-dark";
  }, [dark]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        dark ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } shadow-sm fixed-top`}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          URL Shortener
        </a>

        <div className="d-flex align-items-center">
          {/* Theme Toggle Button */}
          <button
            className="btn btn-outline-light me-2"
            onClick={() => setDark(!dark)}
            title="Toggle Theme"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {/* Profile Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-outline-light dropdown-toggle"
              type="button"
              id="dropdownProfile"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              👤
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownProfile"
            >
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/dashboard")}
                >
                  📊 Dashboard
                </button>
              </li>
              <li>
                <hr className="dropdown-divider mb-0 mt-0" />
              </li>

              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/history")}
                >
                  📜 History
                </button>
              </li>
              <li>
                <hr className="dropdown-divider mb-0 mt-0" />
              </li>

              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/profile")}
                >
                  👤 Profile
                </button>
              </li>
              <li>
                <hr className="dropdown-divider mb-0 mt-0" />
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
