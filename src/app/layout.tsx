import type { Metadata } from "next";
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
      <body className="font-body">{children}</body>
    </html>
  );
}
