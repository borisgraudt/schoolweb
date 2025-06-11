'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bauhaus-light text-bauhaus-green p-4">
      <h2 className="text-4xl font-bold mb-4">Что-то пошло не так!</h2>
      <p className="text-lg mb-6">Произошла непредвиденная ошибка. Пожалуйста, попробуйте снова.</p>
      <button
        className="bg-bauhaus-red text-bauhaus-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Попробовать снова
      </button>
      <p className="mt-4 text-sm text-gray-500">Ошибка: {error.message}</p>
    </div>
  );
} 