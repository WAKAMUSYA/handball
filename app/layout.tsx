import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "NT Handball",
  description: "ハンドボールのためのサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col font-sans">
        <header className="bg-primary text-white shadow-md sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold tracking-tight">
              NT Handball
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <Link href="/handball-board" className="hover:text-blue-200 transition">戦術ボード</Link>
              <Link href="/textbook" className="hover:text-blue-200 transition">ハンドボールの教科書</Link>
              <Link href="/glossary" className="hover:text-blue-200 transition">用語集</Link>
              <Link href="/training" className="hover:text-blue-200 transition">練習メニュー</Link>
            </nav>
          </div>
          {/* Mobile nav simple scroll row */}
          <div className="md:hidden overflow-x-auto bg-blue-800 text-sm whitespace-nowrap scrollbar-hide">
            <div className="flex px-4 py-2 gap-4">
              <Link href="/handball-board" className="hover:text-blue-200 transition">戦術ボード</Link>
              <Link href="/textbook" className="hover:text-blue-200 transition">ハンドボールの教科書</Link>
              <Link href="/glossary" className="hover:text-blue-200 transition">用語集</Link>
              <Link href="/training" className="hover:text-blue-200 transition">練習メニュー</Link>
            </div>
          </div>
        </header>
        <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
        <footer className="bg-slate-100 text-center py-6 text-slate-500 text-sm mt-8 border-t border-slate-200">
          &copy; {new Date().getFullYear()} N High School Handball Club. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
