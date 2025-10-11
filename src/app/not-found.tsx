import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div className="max-w-2xl w-full text-center">
        <div className="border-4 border-black p-12">
          <h1 className="text-9xl font-bold mb-4">404</h1>
          <div className="text-sm uppercase tracking-widest mb-8 text-gray-500">Страница не найдена</div>
          <p className="text-lg mb-12 leading-relaxed">
            К сожалению, запрашиваемая страница не существует или была перемещена.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-12 py-4 text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            На главную
          </Link>
        </div>
      </div>
    </main>
  );
}
