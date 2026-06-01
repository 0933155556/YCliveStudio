import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YClive Studio — AI 影片製作平台",
  description: "YClive 團隊專屬的中文 AI 影片製作協作平台，12 條生產線一鍵啟動",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="h-full">
      <body className="min-h-full flex flex-col bg-[#f8f9fc] text-[#1a1a2e]">
        {/* 頂部導航 */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎬</span>
              <span className="font-bold text-lg tracking-tight text-indigo-600">
                YClive Studio
              </span>
              <span className="text-xs text-gray-400 hidden sm:block ml-1">
                AI 影片製作平台
              </span>
            </div>
            <nav className="flex items-center gap-6 text-sm text-gray-500">
              <a href="/pipelines" className="hover:text-indigo-600 transition-colors font-medium">
                生產線
              </a>
              <a href="/projects" className="hover:text-indigo-600 transition-colors">
                我的專案
              </a>
              <a href="/prompts" className="hover:text-indigo-600 transition-colors">
                提示詞庫
              </a>
              <a href="/docs" className="hover:text-indigo-600 transition-colors">
                說明文件
              </a>
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold text-sm cursor-pointer hover:bg-indigo-200 transition-colors">
                Y
              </div>
            </nav>
          </div>
        </header>

        {/* 主要內容 */}
        <main className="flex-1">{children}</main>

        {/* 底部 */}
        <footer className="border-t border-gray-100 bg-white py-4 text-center text-xs text-gray-400">
          YClive Studio © 2026 · 基於{" "}
          <a
            href="https://github.com/calesthio/OpenMontage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline"
          >
            OpenMontage
          </a>{" "}
          開源引擎
        </footer>
      </body>
    </html>
  );
}
