import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api"; // Axios instance
import { toast } from "react-toastify";
const isLoggedIn = !!localStorage.getItem("token");

const Home = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to shorten URLs.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/url/shorten",
        { originalUrl: url },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShortenedUrl(res.data.shortenedUrl);
      toast.success("URL shortened successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container" style={{marginTop:"17vh"}}>
      <div className="text-center mb-4">
        <h2>
          Welcome to <span className="text-primary">URL Shortener</span>
        </h2>
        <p className="lead">
          Easily shorten your long URLs and share them with ease.
        </p>
      </div>

      {/* Shorten URL Form */}
      <div className="card shadow mb-5">
        <div className="card-body">
          <h5 className="card-title">Create Short URL</h5>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="urlInput" className="form-label">
                Enter your URL
              </label>
              <input
                type="url"
                className="form-control"
                id="urlInput"
                placeholder="https://example.com/your-long-url"
                value={url}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Shorten URL
            </button>
          </form>

          {shortenedUrl && (
            <div className="mt-4">
              <p>
                <strong>Your Shortened URL:</strong>
              </p>
              <a
                href={shortenedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-success fw-bold"
              >
                {shortenedUrl}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <i className="bi bi-link-45deg display-4 text-primary"></i>
              <h5 className="card-title mt-3">Easy to Use</h5>
              <p className="card-text">
                Just paste your link and get a shortened version instantly.
              </p>
              <a title={isLoggedIn ? "You're already logged in" : "Login to use this feature"}
                href={isLoggedIn ? "#" : "/login"}
                className={`btn btn-${
                  isLoggedIn ? "secondary disabled" : "outline-primary"
                }`}
              >
                {isLoggedIn ? "Logged In" : "Login to Start"}
              </a>{" "}
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <i className="bi bi-bar-chart-line-fill display-4 text-success"></i>
              <h5 className="card-title mt-3">Track Analytics</h5>
              <p className="card-text">
                Get real-time click stats and performance insights (coming
                soon).
              </p>
              <a title={isLoggedIn ? "You're already logged in" : "Login to use this feature"}

                href={isLoggedIn ? "/dashboard" : "/login"}
                className="btn btn-outline-success"
              >
                {isLoggedIn ? "Go to Dashboard" : "Login to Track"}
              </a>{" "}
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <i className="bi bi-lock-fill display-4 text-danger"></i>
              <h5 className="card-title mt-3">Secure Access</h5>
              <p className="card-text">
                Login required to manage and access your shortened URLs.
              </p>
              <a title={isLoggedIn ? "You're already logged in" : "Login to use this feature"}
                href={isLoggedIn ? "/dashboard" : "/login"}
                className="btn btn-outline-danger"
              >
                {isLoggedIn ? "Go to Dashboard" : "Login to Access"}
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
