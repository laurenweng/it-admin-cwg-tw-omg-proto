import { forwardRef, ButtonHTMLAttributes, useState } from "react";
import svgPaths from "../imports/svg-werpgt9qjc";

export interface CwRoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按鈕圖標類型 */
  icon: 'refresh' | 'view' | 'edit' | 'search' | 'delete' | 'send';
  /** 是否為危險操作 */
  destructive?: boolean;
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
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // 預設顏色
    const defaultColor = '#7c808c';
    
    // Hover 顏色
    const hoverColor = destructive ? '#b33c12' : '#01579b';
    
    // 禁用顏色
    const disabledColor = '#cdcdcd';
    
    // 當前顏色
    const currentColor = disabled ? disabledColor : (isHovered ? hoverColor : defaultColor);
    
    // 選擇圖標組件
    const renderIcon = () => {
      switch (icon) {
        case 'refresh':
          return <RefreshIcon color={currentColor} />;
        case 'view':
          return <ViewIcon color={currentColor} />;
        case 'edit':
          return <EditIcon color={currentColor} />;
        case 'search':
          return <SearchIcon color={currentColor} />;
        case 'delete':
          return <DeleteIcon color={currentColor} />;
        case 'send':
          return <SendIcon color={currentColor} />;
        default:
          return null;
      }
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => !disabled && setIsHovered(false)}
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
    );
  }
);

CwRoundButton.displayName = 'CwRoundButton';

export default CwRoundButton;

// 匯出圖標組件供外部使用
export { RefreshIcon, ViewIcon, EditIcon, SearchIcon, DeleteIcon };