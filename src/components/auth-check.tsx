'use client';

import { useAuth } from '@/app/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthCheck({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return <>{user ? children : null}</>;
}