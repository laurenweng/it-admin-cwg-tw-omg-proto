import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CwBreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (href: string, index: number) => void;
}

/**
 * CwBreadcrumbs 元件
 * 
 * 功能：
 * - 顯示當前頁面的導航路徑
 * - 最後一層標示為當前位置，不可點擊
 * - 中間層級的文字可點擊，幫助使用者返回上一階層
 * - 最多支援 5 層階層
 * 
 * @param items - 麵包屑項目陣列，每個項目包含 label 和可選的 href
 * @param onNavigate - 點擊麵包屑時的回調函數
 */
export function CwBreadcrumbs({ items, onNavigate }: CwBreadcrumbsProps) {
  // 安全檢查：如果沒有項目則不顯示
  if (!items || items.length === 0) {
    return null;
  }

  // 限制最多 5 層
  const displayItems = items.slice(0, 5);
  const lastIndex = displayItems.length - 1;

  const handleClick = (item: BreadcrumbItem, index: number) => {
    if (index < lastIndex && item.href && onNavigate) {
      onNavigate(item.href, index);
    }
  };

  return (
    <nav className="flex items-center gap-[5.6px]" aria-label="麵包屑導航">
      {displayItems.map((item, index) => {
        const isLast = index === lastIndex;
        const isClickable = !isLast && item.href;

        return (
          <React.Fragment key={index}>
            {/* 麵包屑項目 */}
            <div className="flex items-center">
              {isClickable ? (
                <button
                  onClick={() => handleClick(item, index)}
                  className="relative flex items-center justify-center gap-[10px] border-b-[0.8px] border-transparent hover:border-border transition-colors"
                  aria-current={isLast ? 'page' : undefined}
                >
                  <span
                    className="text-border whitespace-nowrap"
                    style={{ 
                      fontSize: 'var(--text-base)',
                      fontFamily: 'var(--font-noto-sans-tc)',
                      fontWeight: '350',
                      lineHeight: '20px'
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              ) : (
                <div
                  className="flex items-center justify-center gap-[10px]"
                  aria-current={isLast ? 'page' : undefined}
                >
                  <span
                    className={isLast ? "text-foreground whitespace-nowrap" : "text-border whitespace-nowrap"}
                    style={{ 
                      fontSize: 'var(--text-base)',
                      fontFamily: 'var(--font-noto-sans-tc)',
                      fontWeight: '350',
                      lineHeight: '20px'
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              )}
            </div>

            {/* 分隔符號 */}
            {index < lastIndex && (
              <span
                className="text-border"
                style={{ 
                  fontSize: '12.6px',
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: '400',
                  lineHeight: 'normal'
                }}
                aria-hidden="true"
              >
                /
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default CwBreadcrumbs;