"use client";

import type { Pipeline } from "@/lib/types";

interface Props {
  pipeline: Pipeline;
  onClick?: (pipeline: Pipeline) => void;
}

export function PipelineCard({ pipeline, onClick }: Props) {
  const isBeta = pipeline.stability === "beta";

  return (
    <div
      className="pipeline-card relative bg-white rounded-2xl border border-gray-100 shadow-sm cursor-pointer overflow-hidden group"
      style={{ "--card-color": pipeline.color } as React.CSSProperties}
      onClick={() => onClick?.(pipeline)}
    >
      {/* 頂部色條 */}
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: pipeline.color }}
      />

      <div className="p-5">
        {/* Emoji + 標題列 */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{ backgroundColor: pipeline.colorLight }}
            >
              {pipeline.emoji}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base leading-tight">
                {pipeline.name}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">{pipeline.nameEn}</p>
            </div>
          </div>

          {/* 穩定度徽章 */}
          <span
            className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
              isBeta
                ? "bg-amber-50 text-amber-600 border border-amber-200"
                : "bg-green-50 text-green-600 border border-green-200"
            }`}
          >
            {pipeline.stableLabel}
          </span>
        </div>

        {/* 描述 */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">
          {pipeline.description}
        </p>

        {/* 用途標籤 */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pipeline.useCases.slice(0, 3).map((uc) => (
            <span
              key={uc}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: pipeline.colorLight,
                color: pipeline.color,
              }}
            >
              {uc}
            </span>
          ))}
        </div>

        {/* 底部資訊列 */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          {/* 階段數 */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>{pipeline.stageCount} 個階段</span>
          </div>

          {/* 費用提示 */}
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{pipeline.costHint}</span>
          </div>

          {/* 參考影片支援 */}
          {pipeline.referenceVideo && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
              <span>支援參考影片</span>
            </div>
          )}
        </div>
      </div>

      {/* hover 啟動箭頭 */}
      <div
        className="absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0"
        style={{ backgroundColor: pipeline.color }}
      >
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
