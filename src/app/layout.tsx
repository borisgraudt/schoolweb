import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Неордината — Альтернативная школа в Москве",
  description: "Пространство знаний, диалога и самовыражения. Образование для тех, кто думает и выбирает. Классы 5-11.",
  keywords: "школа Неордината, альтернативная школа Москва, частная школа, проектная деятельность",
  authors: [{ name: "aethr", url: "https://github.com/borisgraudt" }],
  openGraph: {
    title: "Неордината — Альтернативная школа",
    description: "Образование, которое учит думать, выбирать и осознавать себя",
    url: "https://aethr.ru",
    siteName: "Неордината",
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
