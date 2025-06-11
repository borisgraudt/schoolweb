import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Школа Неордината - Современная Школа",
  description: "Инновационное образование в стиле Баухауз",
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
