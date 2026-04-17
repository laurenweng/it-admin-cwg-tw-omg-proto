import React from 'react';
import svgPaths from '../imports/svg-c4w9ma63ko';

interface CwTagProps {
  /** 標籤文字 */
  label: string;
  /** 是否顯示關閉按鈕 */
  closable?: boolean;
  /** 點擊關閉按鈕的回調 */
  onClose?: () => void;
  /** 自定義類名 */
  className?: string;
}

/**
 * CwTag 元件
 * 
 * 用於顯示標籤，常用於多選輸入框中顯示已選擇的項目。
 * 可選擇是否顯示關閉按鈕以取消選取。
 * 
 * 樣式規範：
 * - 背景色：#e9ebf2
 * - 高度：20px
 * - padding：4px 水平，2px 垂直
 * - 圓角：5px
 * - 文字：Noto Sans TC，14px，font-weight normal
 * - 關閉按鈕：14px X 圖標
 * 
 * @param label - 標籤顯示的文字
 * @param closable - 是否顯示關閉按鈕，預設為 true
 * @param onClose - 點擊關閉按鈕時的回調函數
 * @param className - 額外的 CSS 類名
 */
export function CwTag({ 
  label, 
  closable = true, 
  onClose,
  className = '' 
}: CwTagProps) {
  return (
    <div 
      className={`inline-flex items-center gap-[2px] h-[20px] px-[4px] py-[2px] bg-[#e9ebf2] rounded-[5px] ${className}`}
    >
      <span
        className="text-foreground whitespace-nowrap leading-[13px]"
        style={{
          fontFamily: 'var(--font-noto-sans-tc)',
          fontSize: 'var(--text-base)',
          fontWeight: 'var(--font-weight-normal)'
        }}
      >
        {label}
      </span>
      
      {closable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          className="flex items-center justify-center shrink-0 size-[14px] hover:opacity-70 transition-opacity"
          aria-label="移除標籤"
          type="button"
        >
          <svg 
            className="block size-full" 
            fill="none" 
            preserveAspectRatio="none" 
            viewBox="0 0 14 14"
          >
            <path 
              d={svgPaths.p720f380} 
              stroke="#C4C9D3" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1.5625" 
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default CwTag;