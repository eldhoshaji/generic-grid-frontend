'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /users when the page loads
    router.push('/users');
  }, [router]);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Redirecting...</h1>
    </main>
  );
}
