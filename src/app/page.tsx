"use client";

import ShortenForm from "@/components/ShortenForm";
import UrlList from "@/components/UrlList";
import { useState } from "react";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    // Trigger refresh of UrlList when a new URL is shortened
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-purple-600 mb-6">
            Shorten Your Links with LinkShortner
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Create short, memorable links that redirect to your long URLs. Track
            visits and manage all your links in one place.
          </p>

          <ShortenForm onSuccess={handleSuccess} />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full h-14 w-14 flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Paste your long URL
              </h3>
              <p className="text-gray-600">
                Enter the lengthy URL you want to shorten in our easy-to-use
                form.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full h-14 w-14 flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Get your short link
              </h3>
              <p className="text-gray-600">
                Our system instantly creates a short, shareable link for your
                URL.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full h-14 w-14 flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Track and manage
              </h3>
              <p className="text-gray-600">
                View statistics and manage all your shortened links in one
                place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Links Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto" key={refreshKey}>
          <UrlList />
        </div>
      </section>
    </main>
  );
}
