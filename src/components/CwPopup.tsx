import React, { useEffect } from 'react';
import { X, Info, CheckCircle2, AlertTriangle, XCircle, HelpCircle } from 'lucide-react';
import { CwButton } from './CwButton';

// 圖標類型對應
const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  question: HelpCircle,
};

export interface CwPopupButton {
  label: string;
  variant?: 'primary' | 'secondary' | 'destructive' | 'info';
  appearance?: 'filled' | 'outlined';
  onClick: () => void;
}

export interface CwPopupProps {
  /** 是否顯示 Popup */
  open: boolean;
  /** 關閉 Popup 的回調 */
  onClose: () => void;
  /** Popup 標題 */
  title?: string;
  /** Popup 內容 */
  children: React.ReactNode;
  /** Popup 類型（影響圖標） */
  type?: 'info' | 'success' | 'warning' | 'error' | 'question';
  /** 是否可點擊 mask 關閉（預設 true） */
  closableByMask?: boolean;
  /** 是否顯示 Header（預設 true） */
  showHeader?: boolean;
  /** 是否顯示 Footer（預設 true） */
  showFooter?: boolean;
  /** Footer 按鈕配置 */
  buttons?: CwPopupButton[];
  /** Popup 尺寸（預設 md） */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fit';
  /** 內容區域最大高度（預設 646px） */
  maxHeight?: string;
  /** 是否啟用滾動漸變效果 */
  scrollGradient?: boolean;
  /** 是否上下左右置中（預設 false，距離頂部 70px） */
  centered?: boolean;
}

export const CwPopup: React.FC<CwPopupProps> = ({
  open,
  onClose,
  title = '標題',
  children,
  type,
  closableByMask = true,
  showHeader = true,
  showFooter = true,
  buttons = [],
  size = 'md',
  maxHeight = '646px',
  scrollGradient = false,
  centered = false,
}) => {
  // 根據尺寸設定寬度
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { width: '400px', minWidth: '400px', maxWidth: '400px' };
      case 'md':
        return { width: '800px', minWidth: '400px', maxWidth: '800px' };
      case 'lg':
        return { width: '976px', minWidth: '400px', maxWidth: '976px' };
      case 'xl':
        return { width: '1080px', minWidth: '400px', maxWidth: '1080px' };
      case 'fit':
        return { width: '80%', minWidth: '400px', maxWidth: '80%' };
      default:
        return { width: '800px', minWidth: '400px', maxWidth: '800px' };
    }
  };

  const sizeStyles = getSizeStyles();
  // 阻止背景滾動
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // ESC 鍵關閉
  useEffect(() => {
    if (!open || !closableByMask) return;
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, closableByMask, onClose]);

  if (!open) return null;

  const Icon = type ? iconMap[type] : null;

  // 點擊 mask 關閉
  const handleMaskClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closableByMask) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[4000] flex justify-center p-4 ${centered ? 'items-center' : 'items-start pt-[70px]'}`}
      style={{ 
        background: 'rgba(0, 0, 0, 0.5)',
      }}
      onClick={handleMaskClick}
    >
      <div
        className="bg-white flex flex-col rounded-[var(--radius-card)] relative"
        style={{
          width: sizeStyles.width,
          minWidth: sizeStyles.minWidth,
          maxWidth: sizeStyles.maxWidth,
          maxHeight: centered ? 'calc(100vh - 80px)' : 'calc(100vh - 140px)', // centered: 40px top + 40px bottom, default: 70px top + 70px bottom
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - 固定在頂部 */}
        {showHeader && (
          <div className="relative shrink-0 w-full border-b border-[#c4c9d3]">
            <div className="flex flex-row items-center justify-between px-[20px] py-[14px]">
              <h3 className="flex-1" style={{ fontSize: 'var(--text-lg)' }}>
                {title}
              </h3>
              <button
                onClick={onClose}
                className="shrink-0 size-[30px] flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                aria-label="關閉"
              >
                <X size={20} className="text-[#7c808c]" />
              </button>
            </div>
          </div>
        )}

        {/* Body - 可滾動區域，使用 flex-1 和 overflow-y-auto */}
        <div className="relative flex-1 overflow-y-auto overflow-x-hidden min-h-0">
          {scrollGradient && (
            <>
              {/* Top Gradient */}
              <div className="sticky top-0 h-[15px] pointer-events-none z-10 bg-gradient-to-b from-black/20 to-transparent" />
            </>
          )}
          
          <div className={`${scrollGradient ? 'pb-0 pt-[25px]' : 'py-[25px]'} px-[40px]`}>
            {type && Icon && (
              <div className="flex items-start gap-[10px]">
                <Icon size={20} className="shrink-0 mt-0.5" />
                <div className="flex-1">{children}</div>
              </div>
            )}
            {!type && children}
          </div>

          {scrollGradient && (
            <>
              {/* Bottom Gradient */}
              <div className="sticky bottom-0 h-[15px] pointer-events-none z-10 bg-gradient-to-t from-black/20 to-transparent" />
            </>
          )}
        </div>

        {/* Footer - 固定在底部，不滾動 */}
        {showFooter && buttons.length > 0 && (
          <div className="relative shrink-0 w-full border-t border-[#c4c9d3]">
            <div className="flex gap-[10px] items-center justify-center px-[40px] py-[20px]">
              {buttons.map((button, index) => (
                <CwButton
                  key={index}
                  variant={button.variant || 'primary'}
                  appearance={button.appearance || 'outlined'}
                  onClick={button.onClick}
                >
                  {button.label}
                </CwButton>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};