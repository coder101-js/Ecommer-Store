'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
    <main className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-black dark:to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white dark:bg-neutral-900 shadow-2xl rounded-2xl p-10 w-full max-w-sm text-center border dark:border-neutral-800"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">
          Sign in to access your account
        </p>

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.03 }}
          onClick={() => signIn('google')}
          className="flex items-center justify-center gap-3 w-full py-2.5 px-5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-base font-medium text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
        >
          <Image
            src="/google.png"
            alt="Google icon"
            width={35}
            height={35}
          />
          Continue with Google
        </motion.button>
      </motion.div>
    </main>
  );
}
