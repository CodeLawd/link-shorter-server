export interface UrlEntry {
  originalUrl: string;
  shortPath: string;
  createdAt: string;
  visitCount: number;
  lastVisited: string | null;
}

export interface EncodeResponse {
  shortUrl: string;
}

export interface DecodeResponse {
  url: string;
}
