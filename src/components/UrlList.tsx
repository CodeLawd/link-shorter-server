import { useState, useEffect, useMemo } from "react";
import { UrlEntry } from "@/types/url";
import { api } from "@/services/api";

export default function UrlList() {
  const [urls, setUrls] = useState<UrlEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUrls = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.listUrls();
      setUrls(data);
    } catch (err) {
      setError("Failed to load URLs. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const filteredUrls = useMemo(() => {
    if (!searchQuery || searchQuery.length < 3) {
      return urls;
    }

    const normalizedQuery = searchQuery.toLowerCase();
    return urls.filter((url) =>
      url.originalUrl.toLowerCase().includes(normalizedQuery)
    );
  }, [urls, searchQuery]);

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "Never";

    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">All Shortened URLs</h2>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search for URLs..."
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            minLength={3}
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            {searchQuery.length}/3
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading URLs...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      ) : filteredUrls.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">
            {searchQuery && searchQuery.length >= 3
              ? "No URLs matching your search"
              : "No URLs have been shortened yet"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">
                  Original URL
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">
                  Short URL
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">
                  Created
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">
                  Visits
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider">
                  Last Visit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUrls.map((url) => (
                <tr key={url.shortPath} className="hover:bg-gray-50">
                  <td className="py-3 px-4 truncate max-w-xs">
                    {url.originalUrl}
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={`http://short.est/${url.shortPath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      short.est/{url.shortPath}
                    </a>
                  </td>
                  <td className="py-3 px-4">{formatDate(url.createdAt)}</td>
                  <td className="py-3 px-4">{url.visitCount}</td>
                  <td className="py-3 px-4">{formatDate(url.lastVisited)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
