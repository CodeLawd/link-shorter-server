export default function ApiDocsPage() {
  return (
    <main className="flex-grow py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          API Documentation
        </h1>

        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            LinkShortner provides a simple RESTful API that allows you to
            create, retrieve, and manage shortened URLs programmatically.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Base URL</h2>
            <div className="bg-gray-100 text-black p-4 rounded-md mb-4">
              <code className="text-purple-600">http://localhost:8000/api</code>
            </div>
            <p className="text-gray-600">
              All API endpoints are relative to this base URL.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Authentication
            </h2>
            <p className="text-gray-600 mb-4">
              Currently, the API is open and does not require authentication. In
              a production environment, you would want to secure your API with
              an API key or other authentication method.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Endpoints</h2>

            <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
              <div className="bg-gray-50 border-b border-gray-200 p-4">
                <div className="flex items-center">
                  <span className="bg-green-500 text-white text-xs font-bold py-1 px-2 rounded mr-3">
                    POST
                  </span>
                  <code className="text-purple-600 font-semibold">/encode</code>
                </div>
                <p className="mt-2 text-gray-600">Create a shortened URL</p>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Request Body
                </h4>
                <pre className="bg-gray-100 text-black p-3 rounded-md text-sm mb-4">
                  {`{
"url": "https://example.com/very/long/url/that/needs/shortening"
}`}
                </pre>

                <h4 className="font-semibold text-gray-800 mb-2">Response</h4>
                <pre className="bg-gray-100 text-black p-3 rounded-md text-sm">
                  {`{
"shortUrl": "http://short.est/abc123"
}`}
                </pre>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
              <div className="bg-gray-50 border-b border-gray-200 p-4">
                <div className="flex items-center">
                  <span className="bg-green-500 text-white text-xs font-bold py-1 px-2 rounded mr-3">
                    POST
                  </span>
                  <code className="text-purple-600 font-semibold">/decode</code>
                </div>
                <p className="mt-2 text-gray-600">
                  Get the original URL from a shortened URL
                </p>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Request Body
                </h4>
                <pre className="bg-gray-100 text-black p-3 rounded-md text-sm mb-4">
                  {`{
"shortUrl": "http://short.est/abc123"
}`}
                </pre>

                <h4 className="font-semibold text-gray-800 mb-2">Response</h4>
                <pre className="bg-gray-100 text-black p-3 rounded-md text-sm">
                  {`{
"url": "https://example.com/very/long/url/that/needs/shortening"
}`}
                </pre>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
              <div className="bg-gray-50 border-b border-gray-200 p-4">
                <div className="flex items-center">
                  <span className="bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded mr-3">
                    GET
                  </span>
                  <code className="text-purple-600 font-semibold">
                    /statistic/{"{shortPath}"}
                  </code>
                </div>
                <p className="mt-2 text-gray-600">
                  Get statistics for a specific shortened URL
                </p>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Response</h4>
                <pre className="bg-gray-100 text-black p-3 rounded-md text-sm">
                  {`{
"originalUrl": "https://example.com/very/long/url/that/needs/shortening",
"shortPath": "abc123",
"createdAt": "2023-07-15T10:30:00Z",
"visitCount": 42,
"lastVisited": "2023-07-16T15:45:30Z"
}`}
                </pre>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 p-4">
                <div className="flex items-center">
                  <span className="bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded mr-3">
                    GET
                  </span>
                  <code className="text-purple-600 font-semibold">/list</code>
                </div>
                <p className="mt-2 text-gray-600">
                  Get a list of all shortened URLs
                </p>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Response</h4>
                <pre className="bg-gray-100 text-black p-3 rounded-md text-sm">
                  {`[
{
"originalUrl": "https://example.com/very/long/url/that/needs/shortening",
"shortPath": "abc123",
"createdAt": "2023-07-15T10:30:00Z",
"visitCount": 42,
"lastVisited": "2023-07-16T15:45:30Z"
},
{
"originalUrl": "https://another-example.com/long/url",
"shortPath": "def456",
"createdAt": "2023-07-14T09:20:00Z",
"visitCount": 17,
"lastVisited": "2023-07-16T12:30:15Z"
}
]`}
                </pre>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Rate Limiting
            </h2>
            <p className="text-gray-600">
              The API has a rate limit of 100 requests per minute per IP
              address. If you exceed this limit, you will receive a 429 Too Many
              Requests response.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
