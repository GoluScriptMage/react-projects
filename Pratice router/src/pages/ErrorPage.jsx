import React from "react";

const ErrorPage = () => {
  return (
    <section className="w-full min-h-[60vh] flex items-center justify-center bg-gray-950 text-gray-300 px-6">
      <div className="max-w-lg text-center">
        <h1 className="text-6xl font-bold tracking-tight text-white">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-white">Page Not Found</h2>
        <p className="mt-4 text-sm text-gray-400 leading-relaxed">
          The page you were looking for doesn’t exist or may have been moved.
          Double‑check the URL or return to the homepage.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            className="rounded bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Go Home
          </a>
          <a
            href={typeof window !== 'undefined' ? window.location.href : '#'}
            className="rounded bg-gray-800 px-5 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700"
          >
            Current URL
          </a>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
