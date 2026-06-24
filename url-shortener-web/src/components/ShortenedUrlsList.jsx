/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const ShortenedUrlsList = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of shortened URLs from the backend
    const fetchUrls = async () => {
      try {
        const response = await api.get('/url/list');
        setUrls(response.data || []);
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
      setLoading(false);
    };
    
    fetchUrls();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-xl font-semibold mb-4">Your Shortened URLs</h2>
      {loading ? (
        <div className="py-8">
          <LoadingSpinner text="Loading your URLs..." />
        </div>
      ) : urls.length === 0 ? (
        <div className="py-8 text-gray-600">No shortened URLs found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Original URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shortened URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {urls.map((url, index) => (
                <tr key={url._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-600 break-words"><a href={url.originalUrl} target="_blank" rel="noreferrer">{url.originalUrl}</a></td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-600 break-words"><a href={url.shortenedUrl} target="_blank" rel="noreferrer">{url.shortenedUrl}</a></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => deleteUrl(url._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// deleteUrl handler
async function deleteUrl(id) {
  try {
    await api.delete(`/url/${id}`);
    // remove from DOM by reloading or better approach is lifting state; keep simple: reload
    window.location.reload();
  } catch (err) {
    console.error('Failed to delete URL', err);
  }
}

export default ShortenedUrlsList;
