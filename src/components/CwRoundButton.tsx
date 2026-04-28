import { forwardRef, ButtonHTMLAttributes, useState } from "react";
import svgPaths from "../imports/svg-werpgt9qjc";

export interface CwRoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按鈕圖標類型 */
  icon: 'refresh' | 'view' | 'edit' | 'search' | 'delete' | 'send';
  /** 是否為危險操作 */
  destructive?: boolean;
  /** 刪除確認說明文字（icon="delete" 時有效，不填使用預設文字） */
  confirmMessage?: string;
}

// 刷新圖標
function RefreshIcon({ color }: { color: string }) {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="CwIcon">
          <path d={svgPaths.p2f870800} fill={color} id="Vector" />
        </g>
      </svg>
    </div>
  );
}

// 查看圖標
function ViewIcon({ color }: { color: string }) {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_view)" id="CwIcon">
          <path d={svgPaths.p49a46f0} fill={color} id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_view">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

// 編輯圖標
function EditIcon({ color }: { color: string }) {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]">
      <div className="absolute left-1/2 size-[14px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <g id="Component 1">
            <path d={svgPaths.p16034800} fill={color} id="Vector" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// 搜尋圖標
function SearchIcon({ color }: { color: string }) {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_search)" id="CwIcon">
          <path d={svgPaths.pf6c2180} fill={color} id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_search">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

// 刪除圖標
function DeleteIcon({ color }: { color: string }) {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="CwIcon">
          <path d={svgPaths.p350e4130} fill={color} id="Vector" />
        </g>
      </svg>
    </div>
  );
}

// 發送圖標
function SendIcon({ color }: { color: string }) {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="CwIcon">
          <path d="M13 1L6 8M13 1L9 13L6 8M13 1L1 5L6 8" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

export const CwRoundButton = forwardRef<HTMLButtonElement, CwRoundButtonProps>(
  (
    {
      icon,
      destructive = false,
      confirmMessage,
      className = '',
      disabled,
      onClick,
      title,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const isDelete = icon === 'delete';

    // 預設顏色：delete 一律紅色，其他灰色
    const defaultColor = isDelete ? '#991b1b' : '#7c808c';
    const hoverColor = isDelete ? '#dc2626' : (destructive ? '#b33c12' : '#01579b');
    const disabledColor = '#cdcdcd';
    const currentColor = disabled ? disabledColor : (isHovered ? hoverColor : defaultColor);

    const renderIcon = () => {
      switch (icon) {
        case 'refresh': return <RefreshIcon color={currentColor} />;
        case 'view':    return <ViewIcon color={currentColor} />;
        case 'edit':    return <EditIcon color={currentColor} />;
        case 'search':  return <SearchIcon color={currentColor} />;
        case 'delete':  return <DeleteIcon color={currentColor} />;
        case 'send':    return <SendIcon color={currentColor} />;
        default:        return null;
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDelete && onClick) {
        e.stopPropagation();
        setShowConfirm(true);
      } else if (onClick) {
        onClick(e);
      }
    };

    const handleConfirm = () => {
      setShowConfirm(false);
      // 建立一個合成事件替代，直接呼叫 handler
      onClick?.({} as React.MouseEvent<HTMLButtonElement>);
    };

    return (
      <>
        <button
          ref={ref}
          disabled={disabled}
          title={title}
          onMouseEnter={() => !disabled && setIsHovered(true)}
          onMouseLeave={() => !disabled && setIsHovered(false)}
          onClick={handleClick}
          className={`bg-white box-border content-stretch flex items-center justify-center p-[2px] rounded-[20px] size-[30px] relative transition-all ${
            disabled ? 'cursor-not-allowed opacity-60' : 'hover:shadow-[0px_1px_4px_0px_rgba(35,26,0,0.2)] cursor-pointer'
          } ${className}`}
          {...props}
        >
          <div
            aria-hidden="true"
            className="absolute border border-[#c4c9d3] border-solid inset-0 pointer-events-none rounded-[20px]"
          />
          {renderIcon()}
        </button>

        {showConfirm && (
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/30"
            onClick={(e) => { e.stopPropagation(); setShowConfirm(false); }}
          >
            <div
              className="bg-white rounded-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] w-[360px] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e5e7eb]">
                <span
                  className="font-['Noto_Sans_TC',_sans-serif] text-[16px] text-[#1c1c1c]"
                  style={{ fontWeight: 700 }}
                >
                  確認刪除
                </span>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#f3f4f6] text-[#7c808c]"
                >
                  ✕
                </button>
              </div>
              <div className="px-[24px] py-[20px]">
                <p
                  className="font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#374151]"
                  style={{ fontWeight: 350 }}
                >
                  {confirmMessage ?? '確定要刪除此項目嗎？'}
                </p>
                <p
                  className="font-['Noto_Sans_TC',_sans-serif] text-[12px] text-[#9ca3af] mt-[6px]"
                  style={{ fontWeight: 350 }}
                >
                  此操作無法復原。
                </p>
              </div>
              <div className="flex justify-end gap-[8px] px-[24px] py-[16px] border-t border-[#e5e7eb] bg-[#f9fafb]">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="h-[34px] px-[16px] rounded-[4px] border border-[#c4c9d3] bg-white font-['Noto_Sans_TC',_sans-serif] text-[14px] text-[#374151] hover:bg-[#f3f4f6] transition-colors cursor-pointer"
                  style={{ fontWeight: 500 }}
                >
                  取消
                </button>
                <button
                  onClick={handleConfirm}
                  className="h-[34px] px-[16px] rounded-[4px] bg-[#dc2626] font-['Noto_Sans_TC',_sans-serif] text-[14px] text-white hover:bg-[#b91c1c] transition-colors cursor-pointer"
                  style={{ fontWeight: 500 }}
                >
                  確認刪除
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

CwRoundButton.displayName = 'CwRoundButton';

export default CwRoundButton;

// 匯出圖標組件供外部使用
export { RefreshIcon, ViewIcon, EditIcon, SearchIcon, DeleteIcon };
