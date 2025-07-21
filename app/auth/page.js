'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500 text-lg">
        Checking session...
      </div>
    );
  }

  if (session) {
    router.push('/');
    return null;
  }

  return (
    <main className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back 👋</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1 mb-6">Sign in to continue</p>

        <button
          onClick={() => signIn('google')}
          className="flex items-center justify-center gap-3 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
        >
          <Image
            src="/google.png"
            alt="Google icon"
            width={20}
            height={20}
          />
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
