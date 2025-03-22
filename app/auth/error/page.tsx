// app/auth/error/page.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function AuthError() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const next = searchParams.get('next') || '/';

  return (
    <>
      <head>
        <meta name="robots" content="noindex" />
      </head>
      <div className="max-w-md mx-auto p-4 mt-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="text-gray-600 mb-4">There was an error during authentication. Please try again.</p>
        <Button onClick={() => router.push(next)} className="bg-black text-white hover:bg-gray-800">
          Try Again
        </Button>
      </div>
    </>
  );
}