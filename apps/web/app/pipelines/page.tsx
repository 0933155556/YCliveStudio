"use client";

import { useState } from "react";
import { pipelines } from "@/lib/pipelines";
import { PipelineCard } from "@/components/PipelineCard";
import type { Pipeline } from "@/lib/types";

const CATEGORIES = [
  { id: "all",            label: "全部",      emoji: "🎯" },
  { id: "production",     label: "穩定版",    emoji: "✅" },
  { id: "generated",      label: "AI 生成",   emoji: "🤖" },
  { id: "animation",      label: "動畫",      emoji: "✨" },
  { id: "cinematic",      label: "電影感",    emoji: "🎥" },
  { id: "custom",         label: "自訂工具",  emoji: "🔧" },
  { id: "screen_recording", label: "螢幕錄影", emoji: "💻" },
  { id: "talking_head",   label: "人物影片",  emoji: "🗣️" },
  { id: "documentary",    label: "紀錄片",    emoji: "🎞️" },
  { id: "hybrid",         label: "混合素材",  emoji: "🔀" },
];

export default function PipelinesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery]   = useState("");
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);

  // 篩選邏輯
  const filtered = pipelines.filter((p) => {
    const matchesFilter =
      activeFilter === "all"
        ? true
        : activeFilter === "production"
        ? p.stability === "production"
        : p.category === activeFilter;

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      p.name.includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.description.includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      p.useCases.some((u) => u.includes(q));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* 頁面標題 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🎬 選擇生產線
        </h1>
        <p className="text-gray-500 text-base">
          12 條 AI 影片生產線，從構想到成品一步到位。選擇最適合您的生產線開始製作。
        </p>
      </div>

      {/* 搜尋列 */}
      <div className="relative mb-6 max-w-md">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="搜尋生產線、用途、關鍵字..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* 分類篩選器 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
              activeFilter === cat.id
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
            {cat.id === "all" && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ml-0.5 ${
                activeFilter === "all" ? "bg-indigo-500" : "bg-gray-100 text-gray-500"
              }`}>
                {pipelines.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 統計列 */}
      <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
        <span>
          顯示 <span className="font-semibold text-gray-900">{filtered.length}</span> / {pipelines.length} 條生產線
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block"/>
          穩定版：{pipelines.filter(p => p.stability === "production").length} 條
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"/>
          測試版：{pipelines.filter(p => p.stability === "beta").length} 條
        </span>
      </div>

      {/* 生產線網格 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((pipeline) => (
            <PipelineCard
              key={pipeline.id}
              pipeline={pipeline}
              onClick={setSelectedPipeline}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg font-medium">找不到符合的生產線</p>
          <p className="text-sm mt-1">試試其他關鍵字或清除篩選條件</p>
          <button
            onClick={() => { setSearchQuery(""); setActiveFilter("all"); }}
            className="mt-4 px-4 py-2 text-sm text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            清除所有篩選
          </button>
        </div>
      )}

      {/* 生產線詳情彈窗 */}
      {selectedPipeline && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setSelectedPipeline(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 彈窗頂部 */}
            <div
              className="p-6 rounded-t-2xl"
              style={{ backgroundColor: selectedPipeline.colorLight }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{selectedPipeline.emoji}</div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {selectedPipeline.name}
                    </h2>
                    <p className="text-sm text-gray-500">{selectedPipeline.nameEn}</p>
                    <span
                      className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                        selectedPipeline.stability === "beta"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {selectedPipeline.stableLabel}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPipeline(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl font-light w-8 h-8 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* 描述 */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  生產線說明
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selectedPipeline.description}
                </p>
              </div>

              {/* 適用場景 */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  適用場景
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPipeline.useCases.map((uc) => (
                    <span
                      key={uc}
                      className="text-sm px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: selectedPipeline.colorLight,
                        color: selectedPipeline.color,
                      }}
                    >
                      {uc}
                    </span>
                  ))}
                </div>
              </div>

              {/* 製作階段 */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  製作流程（{selectedPipeline.stageCount} 個階段）
                </h3>
                <div className="flex flex-wrap items-center gap-1.5">
                  {selectedPipeline.stages.map((stage, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium text-white"
                        style={{ backgroundColor: selectedPipeline.color }}
                      >
                        {stage}
                      </span>
                      {i < selectedPipeline.stages.length - 1 && (
                        <span className="text-gray-300 text-xs">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 費用 & 功能 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">費用估算</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedPipeline.budgetUSD
                      ? `$${selectedPipeline.budgetUSD.toFixed(2)} USD 起`
                      : selectedPipeline.costHint}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">參考影片</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedPipeline.referenceVideo ? "✅ 支援上傳" : "不需要"}
                  </p>
                </div>
              </div>

              {/* 啟動按鈕 */}
              <button
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: selectedPipeline.color }}
                onClick={() => {
                  // Phase 2: 跳轉到專案建立頁
                  alert(`🚀 啟動「${selectedPipeline.name}」生產線\n（Phase 2 功能開發中）`);
                }}
              >
                <span>🚀</span>
                <span>啟動此生產線</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
