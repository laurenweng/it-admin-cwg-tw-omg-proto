import imgImage from "figma:asset/f75db175b92e7a875504f15622cffaa8ab456505.png";

export interface CwEmptyStateProps {
  /** 空狀態文字（預設：沒有資料） */
  text?: string;
}

/**
 * CwEmptyState 元件
 * 
 * 用於顯示無資料時的視覺提示，包含圖像和文字。
 * 
 * @example
 * ```tsx
 * <CwEmptyState text="查詢無結果" />
 * ```
 */
export function CwEmptyState({ text = "沒有資料" }: CwEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {/* 圖像容器 */}
      <div className="overflow-clip relative shrink-0 size-[100px]">
        <div 
          className="absolute h-[91px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px]" 
          style={{ top: "calc(50% - 0.5px)" }}
        >
          <img 
            alt="空狀態圖示" 
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
            src={imgImage}
            style={{ objectPosition: '50% 50%' }}
          />
        </div>
      </div>
      
      {/* 文字 */}
      <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[normal] text-[#1c1c1c] text-[14px] text-center">
        {text}
      </p>
    </div>
  );
}

CwEmptyState.displayName = 'CwEmptyState';
