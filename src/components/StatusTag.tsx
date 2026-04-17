import React from 'react';

export interface StatusTagProps {
  /** 標籤文字 */
  children: React.ReactNode;
  /** 標籤顏色變體 */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  /** 自定義類名 */
  className?: string;
}

/**
 * StatusTag 元件
 * 
 * 用於表格中顯示狀態標籤，不帶關閉按鈕的簡單標籤元件。
 * 可透過不同顏色變體凸顯標記差異。
 * 
 * @example
 * ```tsx
 * <StatusTag variant="success">啟用</StatusTag>
 * <StatusTag variant="error">停用</StatusTag>
 * <StatusTag variant="warning">審核中</StatusTag>
 * ```
 */
export function StatusTag({ 
  children, 
  variant = 'default',
  className = '' 
}: StatusTagProps) {
  // 根據變體選擇顏色
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#d1ebff] text-[#01579b]';
      case 'success':
        return 'bg-[#e8f5e9] text-[#568b53]';
      case 'warning':
        return 'bg-[#fff4e5] text-[#f57c00]';
      case 'error':
        return 'bg-[#fff6f4] text-[#c00000]';
      case 'info':
        return 'bg-[#e3f2fd] text-[#01579b]';
      case 'default':
      default:
        return 'bg-[#e9ebf2] text-[#1c1c1c]';
    }
  };

  return (
    <span
      className={`inline-flex items-center h-[20px] px-[4px] py-[2px] rounded-[5px] whitespace-nowrap ${getVariantStyles()} ${className}`}
    >
      <span className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[14px] text-[12px]">
        {children}
      </span>
    </span>
  );
}

StatusTag.displayName = 'StatusTag';