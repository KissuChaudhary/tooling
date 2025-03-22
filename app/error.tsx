// app/error.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message') || 'An unexpected error occurred';

  useEffect(() => {
    console.error('Error:', message);
  }, [message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">Something went wrong!</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{message}</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
}