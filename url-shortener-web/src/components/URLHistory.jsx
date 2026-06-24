import { useEffect, useState } from 'react';
import api from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const History = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/history')
      .then(res => setUrls(res.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">My URL History</h3>
          <p className="text-gray-600 mb-6">Your saved shortened URLs are shown here. Scroll to view all past links.</p>

          {loading ? (
            <div className="py-10 flex justify-center"><LoadingSpinner text="Loading history..." /></div>
          ) : urls.length === 0 ? (
            <div className="py-10 text-center text-gray-600">No shortened URLs found. Create your first short link from the home page.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">#</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Original URL</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Short URL</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Created At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {urls.map((item, index) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm text-gray-700">{index + 1}</td>
                      <td className="px-4 py-4 text-sm text-blue-600 break-words"><a href={item.originalUrl} target="_blank" rel="noopener noreferrer">{item.originalUrl}</a></td>
                      <td className="px-4 py-4 text-sm text-blue-600 break-words"><a href={item.shortUrl} target="_blank" rel="noopener noreferrer">{item.shortUrl}</a></td>
                      <td className="px-4 py-4 text-sm text-gray-600">{new Date(item.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
