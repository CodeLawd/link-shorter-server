"use client";

import { useState } from "react";
import { useVisitUrl } from "@/services/api";

interface ShortLinkProps {
  shortPath: string;
  displayText?: string;
  className?: string;
  openInNewTab?: boolean;
}

export default function ShortLink({
  shortPath,
  displayText,
  className = "",
  openInNewTab = true,
}: ShortLinkProps) {
  const visitUrlMutation = useVisitUrl();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // The display text defaults to the short URL format if not provided
  const linkText = displayText || `short.est/${shortPath}`;

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const originalUrl = await visitUrlMutation.mutateAsync(shortPath);

      if (openInNewTab) {
        window.open(originalUrl, "_blank");
      } else {
        window.location.href = originalUrl;
      }
    } catch (err) {
      console.error("Error visiting short link:", err);
      setError("This link is not available or has been removed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <a
        href={`/${shortPath}`}
        onClick={handleClick}
        className={`${className} ${isLoading ? "opacity-50 cursor-wait" : ""}`}
        aria-disabled={isLoading}
      >
        {linkText}
      </a>
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </>
  );
}
