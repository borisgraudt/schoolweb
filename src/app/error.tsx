'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service (future: Sentry)
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <html lang="ru">
      <body className="min-h-screen bg-white flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full text-center"
        >
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
            className="inline-block mb-8 p-8 border-4 border-black"
          >
            <svg
              className="w-24 h-24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </motion.div>

          {/* Error Message */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-4 uppercase tracking-tight"
          >
            Что-то пошло не так
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 mb-8 max-w-md mx-auto"
          >
            Произошла непредвиденная ошибка. Попробуйте обновить страницу или вернуться на главную.
          </motion.p>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8 p-4 border-2 border-red-500 bg-red-50 text-left overflow-auto max-h-40"
            >
              <p className="text-sm font-mono text-red-800 break-all">
                {error.message}
              </p>
            </motion.div>
          )}

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={reset}
              className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors border-4 border-black"
            >
              Попробовать снова
            </button>
            <Link
              href="/"
              className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors border-4 border-black"
            >
              На главную
            </Link>
          </motion.div>

          {/* Contact */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-sm text-gray-500"
          >
            Если проблема повторяется, свяжитесь с нами:{' '}
            <a
              href="mailto:neordinata@ya.ru"
              className="underline hover:no-underline"
            >
              neordinata@ya.ru
            </a>
          </motion.p>
        </motion.div>
      </body>
    </html>
  );
}
