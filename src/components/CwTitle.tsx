import React from 'react';
import { CwBreadcrumbs, BreadcrumbItem } from './CwBreadcrumbs';

interface CwTitleProps {
  /** 頁面標題 */
  title: string;
  /** 麵包屑導航項目 */
  breadcrumbs?: BreadcrumbItem[];
  /** 麵包屑點擊回調 */
  onBreadcrumbNavigate?: (href: string, index: number) => void;
}

/**
 * CwTitle 元件
 * 
 * 頁面標題元件，出現在每一頁內容區域的上方。
 * 由標題文字與 CwBreadcrumbs 元件組成。
 * 
 * 佈局：
 * - 標題文字在左側
 * - CwBreadcrumbs 在右側
 * - 兩者之間使用 justify-between 對齊
 * 
 * @param title - 頁面標題文字
 * @param breadcrumbs - 麵包屑導航項目陣列
 * @param onBreadcrumbNavigate - 麵包屑點擊時的回調函數
 */
export function CwTitle({ 
  title, 
  breadcrumbs, 
  onBreadcrumbNavigate 
}: CwTitleProps) {
  return (
    <div 
      className="flex items-center justify-between w-full"
      style={{
        paddingTop: '10px',
        paddingBottom: '10px'
      }}
    >
      {/* 頁面標題 */}
      <h2 
        className="text-foreground"
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-medium)',
          lineHeight: 'normal'
        }}
      >
        {title}
      </h2>

      {/* 麵包屑導航 */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <CwBreadcrumbs 
          items={breadcrumbs} 
          onNavigate={onBreadcrumbNavigate} 
        />
      )}
    </div>
  );
}

export default CwTitle;