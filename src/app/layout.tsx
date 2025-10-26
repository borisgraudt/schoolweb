import type { Metadata } from "next";
import CookieConsent from '@/components/CookieConsent';
import ConditionalAnalytics from '@/components/ConditionalAnalytics';
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://aethr.ru'),
  title: "Досугово-развивающий центр 'Школа Неордината' — Москва",
  description: "Пространство знаний, диалога и самовыражения. Развитие для тех, кто думает и выбирает. Классы 5-11.",
  keywords: "досугово-развивающий центр Неордината, развивающий центр Москва, образовательный центр, проектная деятельность",
  authors: [{ name: "aethr", url: "https://github.com/borisgraudt" }],
  openGraph: {
    title: "Досугово-развивающий центр 'Школа Неордината'",
    description: "Развитие, которое учит думать, выбирать и осознавать себя",
    url: "https://aethr.ru",
    siteName: "Школа Неордината",
    locale: "ru_RU",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preload" href="/images/event1.jpg" as="image" />
        <link rel="preload" href="/images/maria.png" as="image" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <style dangerouslySetInnerHTML={{
          __html: `
            .font-body { font-family: Helvetica, Arial, sans-serif; }
            .min-h-screen { min-height: 100vh; }
            .bg-white { background-color: #ffffff; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-center { justify-content: center; }
            .text-center { text-align: center; }
            .animate-spin { animation: spin 1s linear infinite; }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          `
        }} />
      </head>
      <body className="font-body">
        {children}
        <ConditionalAnalytics />
        <CookieConsent />
      </body>
    </html>
  );
}
