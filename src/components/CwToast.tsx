import { useEffect } from 'react';
import svgPaths from '../imports/svg-b4we9etxmv';

export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'question';

export interface CwToastProps {
  /** Toast 類型 */
  type: ToastType;
  /** 訊息內容 */
  message: string;
  /** 是否顯示關閉按鈕（預設 false） */
  closable?: boolean;
  /** 關閉回調 */
  onClose?: () => void;
  /** 自動關閉時間（毫秒），設為 0 則不自動關閉（預設 3000） */
  duration?: number;
  /** 是否顯示（用於控制顯示/隱藏） */
  visible?: boolean;
}

// Toast 類型對應的顏色
const typeColors: Record<ToastType, string> = {
  info: '#01579b',
  success: '#7cb342',
  warning: '#e79f2b',
  error: '#c00000',
  question: '#7ac29a',
};

// Toast 類型對應的圖標路徑
const typeIcons: Record<ToastType, string> = {
  info: svgPaths.p3401cb00,
  success: svgPaths.p279a9600,
  warning: svgPaths.pd7a6c80,
  error: svgPaths.p352b8d00,
  question: svgPaths.p20b2100,
};

export function CwToast({
  type,
  message,
  closable = false,
  onClose,
  duration = 3000,
  visible = true,
}: CwToastProps) {
  useEffect(() => {
    if (!visible) return;
    
    // 自動關閉
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  const bgColor = typeColors[type];
  const iconPath = typeIcons[type];

  return (
    <div 
      className="fixed left-1/2 -translate-x-1/2 box-border content-stretch flex gap-[20px] items-center max-w-[460px] min-h-[40px] rounded-[4px] z-[2000]"
      style={{ 
        backgroundColor: bgColor,
        top: '70px',
        paddingLeft: '20px',
        paddingRight: closable ? '5px' : '20px',
        paddingTop: '5px',
        paddingBottom: '5px',
      }}
    >
      {/* 圖標與訊息 */}
      <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
        {/* 圖標 */}
        <div className="relative shrink-0 size-[20px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={iconPath} fill="white" />
          </svg>
        </div>
        {/* 訊息文字 */}
        <p 
          className="font-['Noto_Sans_TC',_sans-serif] font-medium leading-[19.6px] relative shrink-0 text-[14px] text-white whitespace-pre-wrap break-words"
        >
          {message}
        </p>
      </div>

      {/* 關閉按鈕 */}
      {closable && onClose && (
        <button
          onClick={onClose}
          className="relative shrink-0 size-[30px] flex items-center justify-center cursor-pointer bg-transparent border-none p-0 hover:opacity-80 transition-opacity"
          aria-label="關閉"
        >
          <div className="size-[20px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p3fbfa100} fill="#CDCDCD" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}

CwToast.displayName = 'CwToast';