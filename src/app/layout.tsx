import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LinkShortner - URL Shortener",
  description: "A simple tool to shorten long URLs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            {children}
            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
