import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/services/api";

interface ShortenFormProps {
  onSuccess?: () => void;
}

interface FormValues {
  url: string;
}

export default function ShortenForm({ onSuccess }: ShortenFormProps) {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      setShortUrl(null);

      const result = await api.encodeUrl(data.url);
      setShortUrl(result);

      if (onSuccess) {
        onSuccess();
      }

      // Reset form
      reset();
    } catch (err) {
      setError("Failed to shorten URL. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Shorten Your URL</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Enter a long URL
          </label>
          <input
            id="url"
            type="text"
            placeholder="https://example.com/very/long/url"
            className={`w-full px-4 py-2 border text-black rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${
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
          {errors.url && (
            <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
        >
          {isLoading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {shortUrl && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Your shortened URL:
          </h3>
          <div className="flex items-center">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 p-2 bg-white border border-gray-300 rounded-l-md text-sm"
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
