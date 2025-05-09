/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShortenedUrlsList = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    // Fetch the list of shortened URLs from the backend
    const fetchUrls = async () => {
      try {
        const response = await axios.get('/url/list', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Assume JWT is stored in localStorage
          },
        });
        setUrls(response.data);
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };
    
    fetchUrls();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Your Shortened URLs</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sr.</th>
            <th scope="col">Original URL</th>
            <th scope="col">Shortened URL</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.length === 0 ? (
            <tr>
              <td colSpan="4">No shortened URLs found.</td>
            </tr>
          ) : (
            urls.map((url, index) => (
              <tr key={url._id}>
                <th scope="row">{index + 1}</th>
                <td>{url.originalUrl}</td>
                <td>
                  <a href={url.shortenedUrl} target="_blank" rel="noopener noreferrer">
                    {url.shortenedUrl}
                  </a>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteUrl(url._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShortenedUrlsList;
