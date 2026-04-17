import { forwardRef, InputHTMLAttributes } from "react";
import svgPaths from "../imports/svg-495l9f1hqz";

export interface CwCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** 標籤文字 */
  label?: string;
  /** 是否為部分選擇狀態（用於層級結構的全選/部分選） */
  indeterminate?: boolean;
  /** 錯誤訊息 */
  error?: string;
  /** 自定義類名 */
  className?: string;
}

/**
 * CwCheckbox 元件
 * 
 * 用於多選場景，支援基本勾選、部分選擇（indeterminate）、禁用和錯誤狀態。
 * 在有層級結構的選項中，需明確運用全選與部分選擇的狀態差異。
 * 
 * 設計規範：
 * - 尺寸：20px × 20px
 * - 圓角：5px
 * - 未勾選：白色背景，灰色邊框 (#7c808c)
 * - 勾選：藍色背景和邊框 (#01579B)，白色勾勾圖標
 * - 部分選擇：藍色背景和邊框 (#01579B)，白色橫線
 * - 禁用：灰色背景 (#f4f4f4)，淺灰色邊框 (#cdcdcd)
 * - 錯誤：淺紅色背景 (#fff6f4)，紅色邊框 (#c00000)
 * 
 * 注意事項：
 * - 可多選，需顯示全選/部分選
 * - 禁止與 Radio 混用
 * - 在層級結構中使用 indeterminate 屬性表示部分選擇
 */
export const CwCheckbox = forwardRef<HTMLInputElement, CwCheckboxProps>(
  (
    {
      label,
      indeterminate = false,
      error,
      disabled,
      checked,
      className = '',
      ...props
    },
    ref
  ) => {
    // 決定背景顏色
    const bgColor = disabled 
      ? 'bg-[#f4f4f4]' 
      : error 
      ? 'bg-[#fff6f4]' 
      : checked || indeterminate 
      ? 'bg-[#01579b]' 
      : 'bg-white';
    
    // 決定邊框顏色
    const borderColor = disabled
      ? 'border-[#cdcdcd]'
      : error
      ? 'border-[#c00000]'
      : checked || indeterminate
      ? 'border-[#01579b]'
      : 'border-[#7c808c]';
    
    // 決定文字顏色
    const textColor = disabled ? 'text-[#7c808c]' : error ? 'text-[#1c1c1c]' : 'text-[#1c1c1c]';

    return (
      <div className={`content-stretch flex flex-col gap-[4px] items-start ${className}`}>
        <div className="content-stretch flex gap-[8px] items-center">
          {/* Checkbox 容器 */}
          <div className="relative shrink-0 size-[20px]">
            {/* 隱藏的原生 checkbox */}
            <input
              ref={ref}
              type="checkbox"
              disabled={disabled}
              checked={checked}
              className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
              {...props}
            />
            
            {/* 自定義外觀 */}
            <div className={`${bgColor} relative rounded-[5px] size-[20px] transition-colors`}>
              <div 
                aria-hidden="true" 
                className={`absolute ${borderColor} border border-solid inset-0 pointer-events-none rounded-[5px] transition-colors`} 
              />
              
              {/* 勾選圖標 */}
              {checked && !indeterminate && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <path 
                      d={svgPaths.pf9cce00} 
                      fill="white"
                    />
                  </svg>
                </div>
              )}
              
              {/* 部分選擇橫線 */}
              {indeterminate && (
                <div className="absolute bg-white h-[2px] left-[3px] top-[9px] w-[14px]" />
              )}
            </div>
          </div>
          
          {/* 標籤文字 */}
          {label && (
            <div 
              className={`flex flex-col justify-center leading-[0] relative shrink-0 ${textColor} text-nowrap`}
              style={{
                fontFamily: 'var(--font-noto-sans-tc)',
                fontSize: 'var(--text-base)',
                fontWeight: '350'
              }}
            >
              <p 
                className="leading-[19.6px] whitespace-pre"
                style={{
                  fontFamily: 'var(--font-noto-sans-tc)',
                  fontSize: 'var(--text-base)',
                  fontWeight: '350'
                }}
              >
                {label}
              </p>
            </div>
          )}
        </div>
        
        {/* 錯誤訊息 */}
        {error && (
          <p 
            className="h-[16.8px] leading-[16.8px] relative shrink-0 text-[#c00000] w-full"
            style={{
              fontFamily: 'var(--font-noto-sans-tc)',
              fontSize: 'var(--text-sm)',
              fontWeight: '350'
            }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

CwCheckbox.displayName = 'CwCheckbox';

export default CwCheckbox;