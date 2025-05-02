"use client";

import { useState, useMemo } from "react";
import { useUrlsList } from "@/services/api";
import Link from "next/link";
import ShortLink from "./ShortLink";

export default function UrlList() {
  const { data: urls = [], isLoading, error } = useUrlsList();
  const [searchQuery, setSearchQuery] = useState("");

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

  const getShortUrl = (shortPath: string) => {
    return `short.est/${shortPath}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800">
          Your Shortened Links
        </h2>

        <Link
          href="/my-links"
          className="mt-4 md:mt-0 text-orange-500 hover:text-orange-600 transition font-medium text-sm"
        >
          View All Links →
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading URLs...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          Failed to load URLs. Please try again later.
        </div>
      ) : urls.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No URLs have been shortened yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredUrls.slice(0, 3).map((url) => (
            <div
              key={url.shortPath}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 text-purple-600 text-xs font-semibold rounded-full px-3 py-1">
                  {url.visitCount} {url.visitCount === 1 ? "visit" : "visits"}
                </div>
                <div className="text-xs text-gray-500">
                  Created {formatDate(url.createdAt)}
                </div>
              </div>

              <div className="mb-3 truncate text-sm text-gray-500">
                <a
                  href={url.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 hover:underline"
                  title={url.originalUrl}
                >
                  {url.originalUrl}
                </a>
              </div>

              <div className="flex items-center">
                <input
                  type="text"
                  value={getShortUrl(url.shortPath)}
                  readOnly
                  className="flex-1 p-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-l-md text-sm"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(getShortUrl(url.shortPath));
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-r-md text-sm transition"
                >
                  Copy
                </button>
              </div>

              <div className="mt-3 text-center">
                <ShortLink
                  shortPath={url.shortPath}
                  displayText="Open link"
                  className="text-sm text-purple-600 hover:text-purple-800 hover:underline"
                  openInNewTab={true}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
