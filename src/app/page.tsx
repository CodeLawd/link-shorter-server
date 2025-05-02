"use client";

import { useState } from "react";
import ShortenForm from "@/components/ShortenForm";
import UrlList from "@/components/UrlList";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    // Trigger refresh of UrlList when a new URL is shortened
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            URL Shortener
          </h1>
          <p className="text-lg text-gray-600">
            Shorten your long URLs into easy-to-share links
          </p>
        </header>

        <div className="mb-16">
          <ShortenForm onSuccess={handleSuccess} />
        </div>

        <div key={refreshKey}>
          <UrlList />
        </div>
      </div>
    </main>
  );
}
