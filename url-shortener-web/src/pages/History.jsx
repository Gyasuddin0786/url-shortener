import { useEffect, useState } from "react";
import axios from "../services/api";

const History = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is in localStorage
        const res = await axios.get("/url/history", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        });
        setUrls(res.data); // Store the response data in state
      } catch (err) {
        console.error("Error fetching URL history:", err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="container" style={{ marginTop: "20vh" }}>
      <h3>My URL History</h3>
      {urls.length === 0 ? (
        <p>No shortened URLs found.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Sr No.</th>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <a
                    href={item.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.originalUrl}
                  </a>
                </td>
                <td>
                  <a
                    href={item.shortenedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.shortenedUrl}
                  </a>
                </td>
                <td>{new Date(item.createdAt).toLocaleString()}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
