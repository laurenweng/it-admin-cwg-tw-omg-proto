import { forwardRef, TextareaHTMLAttributes, ReactNode } from "react";

export interface CwTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** 標籤文字 */
  label?: ReactNode;
  /** 錯誤訊息，顯示時會改變樣式 */
  error?: string;
  /** 文字區域寬度 */
  width?: string;
}

export const CwTextarea = forwardRef<HTMLTextAreaElement, CwTextareaProps>(
  (
    {
      label,
      error,
      width = "100%",
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-2" style={{ width }}>
        {label && (
          <label className="block text-[#1c1c1c] font-['Noto_Sans_TC'] text-[14px] font-[350]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          disabled={disabled}
          className={`
            min-h-[100px] px-3 py-2 
            border rounded-[4px]
            font-['Noto_Sans_TC'] text-[14px] font-[350]
            resize-y
            focus:outline-none
            transition-colors
            ${
              error
                ? "border-[#c00000] bg-[#fff6f4] text-[#1c1c1c]"
                : disabled
                ? "border-[#c4c9d3] bg-[#e9ebf2] text-[#7c808c] cursor-not-allowed"
                : "border-[#c4c9d3] bg-white text-[#1c1c1c] focus:border-[#0078d4] focus:ring-1 focus:ring-[#0078d4]" // 改為淡灰色，與 table 外框線一致
            }
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="text-[#c00000] font-['Noto_Sans_TC'] text-[12px] font-[350]">
            {error}
          </span>
        )}
      </div>
    );
  }
);

CwTextarea.displayName = "CwTextarea";