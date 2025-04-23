'use client';
// pages/_app.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/post'); 
  }, [router]);

  return null; 
}
