"use client";

import { useState, useMemo } from "react";
import { useUrlsList, api } from "@/services/api";

export default function MyLinksPage() {
  const { data: urls = [], isLoading, error } = useUrlsList();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUrls = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) {
      return urls;
    }

    const normalizedQuery = searchQuery.toLowerCase();
    return urls.filter(
      (url) =>
        url.originalUrl.toLowerCase().includes(normalizedQuery) ||
        url.shortPath.toLowerCase().includes(normalizedQuery)
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

  // Helper to generate the short URL for display and clipboard
  const getShortUrl = (shortPath: string) => {
    return `short.est/${shortPath}`;
  };

  const handleOpenShortLink = async (shortPath: string) => {
    try {
      const url = await api.visitUrl(shortPath);
      window.open(url, "_blank");
    } catch (err) {
      alert("This short link doesn't exist or has been removed.");
    }
  };

  return (
    <main className="flex-grow py-12 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Shortened Links
        </h1>

        {/* Search bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for URLs or short codes..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-black focus:border-purple-500 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Links list */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading URLs...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-100 text-red-700 rounded-md">
            Failed to load URLs. Please try again later.
          </div>
        ) : filteredUrls.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-gray-500">
              {searchQuery && searchQuery.length >= 2
                ? "No URLs matching your search"
                : "No URLs have been shortened yet"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-100">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase text-xs tracking-wider">
                    Original URL
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase text-xs tracking-wider">
                    Short URL
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase text-xs tracking-wider">
                    Created
                  </th>
                  <th className="py-3 px-4 text-center font-medium text-gray-600 uppercase text-xs tracking-wider">
                    Visits
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase text-xs tracking-wider">
                    Last Visit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUrls.map((url) => (
                  <tr
                    key={url.shortPath}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                      <a
                        href={url.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 hover:underline"
                        title={url.originalUrl}
                      >
                        {url.originalUrl}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenShortLink(url.shortPath)}
                          className="text-purple-600 hover:text-purple-800 hover:underline"
                        >
                          {getShortUrl(url.shortPath)}
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              getShortUrl(url.shortPath)
                            );
                          }}
                          className="text-gray-500 hover:text-gray-700"
                          title="Copy to clipboard"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                      {formatDate(url.createdAt)}
                    </td>
                    <td className="py-3 px-4 text-sm text-center font-medium text-purple-600 whitespace-nowrap">
                      {url.visitCount}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">
                      {formatDate(url.lastVisited)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
