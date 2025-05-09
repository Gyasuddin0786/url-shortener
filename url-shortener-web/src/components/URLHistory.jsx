import { useEffect, useState } from 'react';
import axios from '../services/api';

const History = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    axios.get('history') // GET request to fetch user's URL history
      .then(res => setUrls(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <div className="d-flex">
        <div className="container mt-4">
          <h3>My URL History</h3>
          {urls.length === 0 ? (
            <p>No shortened URLs found.</p>
          ) : (
            <table className="table table-bordered mt-3">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Original URL</th>
                  <th>Short URL</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td><a href={item.originalUrl} target="_blank" rel="noopener noreferrer">{item.originalUrl}</a></td>
                    <td><a href={item.shortUrl} target="_blank" rel="noopener noreferrer">{item.shortUrl}</a></td>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default History;
