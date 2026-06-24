import { useEffect, useState } from "react";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
const History = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/url/history');
        setUrls(res.data || []);
      } catch (err) {
        console.error('Error fetching URL history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-semibold mb-4">My URL History</h3>
      {loading ? (
        <div className="py-8"><LoadingSpinner text="Loading history..." /></div>
      ) : urls.length === 0 ? (
        <p className="text-gray-600">No shortened URLs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Original URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Short URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {urls.map((item, index) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap break-words"><a className="text-blue-600" href={item.originalUrl} target="_blank" rel="noreferrer">{item.originalUrl}</a></td>
                  <td className="px-6 py-4 whitespace-nowrap break-words"><a className="text-blue-600" href={item.shortenedUrl} target="_blank" rel="noreferrer">{item.shortenedUrl}</a></td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
