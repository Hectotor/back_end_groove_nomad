'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers la page de connexion
    router.push('/auth/signin');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirection vers la page de connexion...</p>
    </div>
  );
}
