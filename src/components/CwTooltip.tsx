import React, { useState, useRef, useEffect, ReactNode } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface CwTooltipProps {
  /** 提示文字內容 */
  content: string;
  /** Tooltip 出現位置（預設：top） */
  placement?: TooltipPlacement;
  /** 觸發元素 */
  children: ReactNode;
  /** 是否禁用 Tooltip */
  disabled?: boolean;
}

/**
 * CwTooltip 元件
 * 
 * 用於補充資訊的提示元件，滑鼠 hover 後顯示。
 * 
 * @example
 * ```tsx
 * <CwTooltip content="檢視">
 *   <CwRoundButton icon="view" />
 * </CwTooltip>
 * 
 * <CwTooltip content="這是一個較長的提示文字" placement="bottom">
 *   <button>Hover me</button>
 * </CwTooltip>
 * ```
 */
export function CwTooltip({
  content,
  placement = 'top',
  children,
  disabled = false,
}: CwTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) return;

    const updatePosition = () => {
      const triggerRect = triggerRef.current!.getBoundingClientRect();
      const tooltipRect = tooltipRef.current!.getBoundingClientRect();
      const spacing = 10; // 與觸發元素的間距

      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - spacing;
          left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
          break;
        case 'bottom':
          top = triggerRect.bottom + spacing;
          left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
          left = triggerRect.left - tooltipRect.width - spacing;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
          left = triggerRect.right + spacing;
          break;
      }

      // 確保 Tooltip 不超出視窗邊界
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // 水平邊界檢查
      if (left < 8) {
        left = 8;
      } else if (left + tooltipRect.width > viewportWidth - 8) {
        left = viewportWidth - tooltipRect.width - 8;
      }

      // 垂直邊界檢查
      if (top < 8) {
        top = 8;
      } else if (top + tooltipRect.height > viewportHeight - 8) {
        top = viewportHeight - tooltipRect.height - 8;
      }

      setPosition({ top, left });
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isVisible, placement]);

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  // 箭頭位置樣式
  const getArrowStyle = () => {
    switch (placement) {
      case 'top':
        // 箭頭向下指（Tooltip 在上方）
        return {
          container: 'absolute h-[6px] left-1/2 -translate-x-1/2 -bottom-[6px] w-[12px]',
          border: 'border-[6px_6px_0px_6px] border-solid border-b-transparent border-l-transparent border-r-transparent border-t-[rgba(28,28,28,0.8)]',
        };
      case 'bottom':
        // 箭頭向上指（Tooltip 在下方）
        return {
          container: 'absolute h-[6px] left-1/2 -translate-x-1/2 -top-[6px] w-[12px]',
          border: 'border-[0px_6px_6px_6px] border-solid border-t-transparent border-l-transparent border-r-transparent border-b-[rgba(28,28,28,0.8)]',
        };
      case 'left':
        // 箭頭向右指（Tooltip 在左側）
        return {
          container: 'absolute h-[12px] top-1/2 -translate-y-1/2 -right-[6px] w-[6px]',
          border: 'border-[6px_0px_6px_6px] border-solid border-t-transparent border-b-transparent border-r-transparent border-l-[rgba(28,28,28,0.8)]',
        };
      case 'right':
        // 箭頭向左指（Tooltip 在右側）
        return {
          container: 'absolute h-[12px] top-1/2 -translate-y-1/2 -left-[6px] w-[6px]',
          border: 'border-[6px_6px_6px_0px] border-solid border-t-transparent border-b-transparent border-l-transparent border-r-[rgba(28,28,28,0.8)]',
        };
    }
  };

  const arrowStyle = getArrowStyle();

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex"
      >
        {children}
      </div>

      {isVisible && !disabled && (
        <div
          ref={tooltipRef}
          className="fixed z-[3000] bg-[rgba(28,28,28,0.8)] rounded-[4px] px-[5px] py-[2px] max-w-[150px] pointer-events-none"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          {/* 文字內容 */}
          <div className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] text-[14px] text-white">
            {content}
          </div>

          {/* 箭頭 */}
          <div className={arrowStyle.container}>
            <div 
              aria-hidden="true" 
              className={`absolute inset-0 pointer-events-none ${arrowStyle.border}`}
            />
          </div>
        </div>
      )}
    </>
  );
}

CwTooltip.displayName = 'CwTooltip';
