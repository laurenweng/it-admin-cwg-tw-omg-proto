import { ReactNode, useEffect, useState, useRef } from 'react';
import svgPaths from '../imports/svg-xmyjr9hq1k';

interface CwDrawerProps {
  /**
   * 是否顯示 Drawer
   */
  open: boolean;
  /**
   * 關閉 Drawer 的回調函數
   */
  onClose: () => void;
  /**
   * Drawer 標題（可選）
   */
  title?: string;
  /**
   * Drawer 內容
   */
  children: ReactNode;
  /**
   * 是否顯示上一筆按鈕
   */
  showPrevious?: boolean;
  /**
   * 是否顯示下一筆按鈕
   */
  showNext?: boolean;
  /**
   * 上一筆按鈕點擊回調
   */
  onPrevious?: () => void;
  /**
   * 下一筆按鈕點擊回調
   */
  onNext?: () => void;
  /**
   * 禁用上一筆按鈕
   */
  disablePrevious?: boolean;
  /**
   * 禁用下一筆按鈕
   */
  disableNext?: boolean;
  /**
   * 初始寬度（預設 400px）
   */
  initialWidth?: number;
  /**
   * 最小寬度（預設 300px）
   */
  minWidth?: number;
  /**
   * 最大寬度（預設 800px）
   */
  maxWidth?: number;
  /**
   * 是否可調整大小（預設 true）
   */
  resizable?: boolean;
  /**
   * 點擊遮罩是否關閉（預設 true）
   */
  closableByMask?: boolean;
}

/**
 * CwDrawer 抽屜元件
 * 
 * 從畫面右側滑出的懸浮元件，用於呈現補充內容或可編輯內容
 * 
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 * 
 * <CwDrawer
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="會員詳情"
 *   showPrevious
 *   showNext
 *   onPrevious={handlePrevious}
 *   onNext={handleNext}
 * >
 *   <div>內容...</div>
 * </CwDrawer>
 * ```
 */
export function CwDrawer({
  open,
  onClose,
  title,
  children,
  showPrevious = false,
  showNext = false,
  onPrevious,
  onNext,
  disablePrevious = false,
  disableNext = false,
  initialWidth = 400,
  minWidth = 300,
  maxWidth = 800,
  resizable = true,
  closableByMask = true,
}: CwDrawerProps) {
  const [width, setWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // 防止背景滾動
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // 調整大小功能
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!resizable) return;
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, minWidth, maxWidth]);

  // 點擊遮罩關閉
  const handleMaskClick = (e: React.MouseEvent) => {
    if (closableByMask && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <>
      {/* 遮罩 */}
      <div
        className="fixed left-0 top-0 w-screen h-screen bg-black/40 transition-opacity duration-300"
        style={{ zIndex: 1200 }}
        onClick={handleMaskClick}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed right-0 top-0 w-full bg-white shadow-2xl transition-transform duration-300"
        style={{
          height: '100vh',
          width: `${width}px`,
          zIndex: 1201,
          borderRadius: 'var(--radius-drawer) 0 0 var(--radius-drawer)',
        }}
      >
        {/* 可調整大小的拖動條 */}
        {resizable && (
          <div
            className="absolute left-0 top-0 h-full w-1 cursor-ew-resize hover:bg-primary/20 transition-colors"
            onMouseDown={handleMouseDown}
            style={{ zIndex: 10 }}
          />
        )}

        {/* 內容區域 */}
        <div className="flex flex-col h-full">
          {/* 頂部操作區 */}
          <div className="flex-none px-[21px] pt-[20px] pb-0">
            <div className="flex gap-[5px] items-center pb-[20px]">
              {/* 關閉按鈕 */}
              <button
                onClick={onClose}
                className="flex items-center justify-center size-[26px] rounded-[var(--radius)] hover:bg-muted/10 transition-colors"
                aria-label="關閉"
              >
                <div className="relative size-[14px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <g clipPath="url(#clip0_25_20835)">
                      <path d={svgPaths.p1f94f780} fill="#7C808C" stroke="#7C808C" strokeWidth="0.54413" />
                    </g>
                    <defs>
                      <clipPath id="clip0_25_20835">
                        <rect fill="white" height="14" width="14" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </button>

              {/* 上一筆按鈕 */}
              {showPrevious && (
                <button
                  onClick={onPrevious}
                  disabled={disablePrevious}
                  className="flex items-center justify-center size-[26px] rounded-[var(--radius)] hover:bg-muted/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="上一筆"
                >
                  <div className="relative size-[20px]">
                    <div className="absolute flex inset-[30%_15%_30.62%_17.47%] items-center justify-center">
                      <div className="flex-none h-[13.505px] rotate-[90deg] w-[7.877px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
                          <g>
                            <path d={svgPaths.p124c5e80} fill={disablePrevious ? "#CDCDCD" : "#1C1C1C"} />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              )}

              {/* 下一筆按鈕 */}
              {showNext && (
                <button
                  onClick={onNext}
                  disabled={disableNext}
                  className="flex items-center justify-center size-[26px] rounded-[var(--radius)] hover:bg-muted/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="下一筆"
                >
                  <div className="relative size-[20px]">
                    <div className="absolute flex inset-[30.62%_17.47%_30%_15%] items-center justify-center">
                      <div className="flex-none h-[13.505px] rotate-[270deg] w-[7.877px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
                          <g>
                            <path d={svgPaths.p124c5e80} fill={disableNext ? "#CDCDCD" : "#1C1C1C"} />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* 主要內容區 */}
          <div className="flex-1 overflow-auto px-[20px] pb-[24px]">
            {title && (
              <h3 className="mb-[20px]">{title}</h3>
            )}
            {children}
          </div>
        </div>

        {/* 左側邊框 */}
        <div
          className="absolute left-0 top-0 h-full w-px bg-border/10 pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </>
  );
}
