'use client';

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-black focus:text-white focus:font-bold focus:uppercase focus:tracking-widest focus:border-4 focus:border-white"
    >
      Перейти к основному содержимому
    </a>
  );
}

