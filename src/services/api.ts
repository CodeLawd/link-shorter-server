import axios from "axios";
import { UrlEntry, EncodeResponse, DecodeResponse } from "@/types/url";
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";

const API_BASE_URL = "http://localhost:8000";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// API endpoints
export const apiEndpoints = {
  encode: `${API_BASE_URL}/api/encode`,
  decode: `${API_BASE_URL}/api/decode`,
  statistics: (shortPath: string) =>
    `${API_BASE_URL}/api/statistic/${shortPath}`,
  list: `${API_BASE_URL}/api/list`,
};

// Core API functions
async function encodeUrl(url: string): Promise<string> {
  const response = await axiosClient.post<EncodeResponse>("/api/encode", {
    url,
  });
  return response.data.shortUrl;
}

async function decodeUrl(shortUrl: string): Promise<string> {
  const response = await axiosClient.post<DecodeResponse>("/api/decode", {
    shortUrl,
  });
  return response.data.url;
}

async function getStatistics(shortPath: string): Promise<UrlEntry> {
  const response = await axiosClient.get<UrlEntry>(
    `/api/statistic/${shortPath}`
  );
  return response.data;
}

async function listUrls(): Promise<UrlEntry[]> {
  const response = await axiosClient.get<UrlEntry[]>("/api/list");
  return response.data;
}

// React Query hooks
export const useEncodeUrl = () => {
  return useMutation({
    mutationFn: encodeUrl,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
  });
};

export const useDecodeUrl = () => {
  return useMutation({
    mutationFn: decodeUrl,
  });
};

export const useUrlStatistics = (shortPath: string) => {
  return useQuery({
    queryKey: ["url", shortPath],
    queryFn: () => getStatistics(shortPath),
    enabled: !!shortPath,
  });
};

export const useUrlsList = () => {
  return useQuery({
    queryKey: ["urls"],
    queryFn: listUrls,
  });
};

// Original API for backward compatibility
export const api = {
  encodeUrl,
  decodeUrl,
  getStatistics,
  listUrls,
};
