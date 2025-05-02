"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEncodeUrl } from "@/services/api";

interface ShortenFormProps {
  onSuccess?: () => void;
}

interface FormValues {
  url: string;
}

export default function ShortenForm({ onSuccess }: ShortenFormProps) {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const encodeMutation = useEncodeUrl();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    encodeMutation.mutate(data.url, {
      onSuccess: (result) => {
        setShortUrl(result);
        if (onSuccess) {
          onSuccess();
        }
        reset();
      },
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 border border-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-2"
      >
        <div className="relative flex-grow">
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
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              ></path>
            </svg>
          </div>
          <input
            id="url"
            type="text"
            placeholder="Enter your long URL here..."
            className={`w-full px-10 py-3 border text-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none ${
              errors.url ? "border-red-500" : "border-gray-300"
            }`}
            {...register("url", {
              required: "URL is required",
              pattern: {
                value: /^https?:\/\/.+/i,
                message:
                  "Please enter a valid URL starting with http:// or https://",
              },
            })}
          />
        </div>
        <button
          type="submit"
          disabled={encodeMutation.isPending}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 disabled:opacity-50 whitespace-nowrap"
        >
          {encodeMutation.isPending ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {encodeMutation.isError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
          Failed to shorten URL. Please try again.
        </div>
      )}

      {shortUrl && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Your shortened URL:
          </h3>
          <div className="flex items-center">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 p-2 text-black bg-white border border-gray-300 rounded-l-md text-sm"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(shortUrl);
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-r-md text-sm transition duration-300"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
