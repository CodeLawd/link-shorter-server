import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white py-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 text-purple-500 font-semibold">
              <div className="bg-purple-500 rounded-full p-1.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.2 7.8C12.7817 7.8 12.3765 7.97124 12.0827 8.26498C11.789 8.55871 11.6177 8.96392 11.6177 9.38224C11.6177 9.80057 11.789 10.2058 12.0827 10.4995C12.3765 10.7932 12.7817 10.9645 13.2 10.9645C13.6183 10.9645 14.0235 10.7932 14.3173 10.4995C14.611 10.2058 14.7823 9.80057 14.7823 9.38224C14.7823 8.96392 14.611 8.55871 14.3173 8.26498C14.0235 7.97124 13.6183 7.8 13.2 7.8Z"
                    fill="white"
                  />
                  <path
                    d="M20.4 9.6C20.4 10.6 19.8 11.4 19 11.7V14.4C19 17.4 15.4 20.4 12 20.4C8.6 20.4 5 17.4 5 14.4V11.7C4.2 11.4 3.6 10.6 3.6 9.6C3.6 8.5 4.5 7.6 5.6 7.6C5.8 5.7 7.5 4.2 9.6 4.2C10.8 4.2 11.8 4.5 12.6 5.3H12.8C13.4 5.3 14 5.5 14.5 5.9C15 6.3 15.3 6.8 15.5 7.3C16.1 7.3 16.6 7.6 17 7.9C17.7 8.6 18.4 9.8 18.4 10.9V11.6C19.5 11.5 20.4 10.6 20.4 9.6Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="text-xl">LinkShortner</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              A simple, fast URL shortener service
            </p>
          </div>

          <div className="flex gap-6">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Home
            </Link>
            <Link
              href="/my-links"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              My Links
            </Link>
            <Link
              href="/api-docs"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              API Docs
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} LinkShortner. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
