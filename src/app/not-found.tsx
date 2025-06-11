import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bauhaus-light text-bauhaus-green p-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Страница не найдена</h2>
      <p className="text-lg mb-8 text-gray-600">К сожалению, мы не смогли найти страницу, которую вы ищете.</p>
      <Link href="/" className="bg-bauhaus-green text-bauhaus-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors">
        Вернуться на Главную
      </Link>
    </div>
  );
} 