import { forwardRef, useState, InputHTMLAttributes, ReactNode } from "react";
import svgPaths from "../imports/svg-mg2bqh6wyq";
import { CwTag } from "./CwTag";

export interface CwInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 標籤文字 */
  label?: string;
  /** 顯示必填紅色 * */
  required?: boolean;
  /** 錯誤訊息，顯示時會改變樣式 */
  error?: string;
  /** 左側圖標 */
  leftIcon?: ReactNode;
  /** 右側圖標或動作按鈕 */
  rightIcon?: ReactNode;
  /** 清除按鈕 */
  clearable?: boolean;
  /** 清除回調 */
  onClear?: () => void;
  /** 文字對齊方式 */
  textAlign?: 'left' | 'right' | 'center';
  /** 輸入框寬度 */
  width?: string;
  /** 是否為搜尋狀態（會在 placeholder 左邊顯示搜尋 icon） */
  isSearch?: boolean;
}

// 搜尋圖標
function SearchIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]">
      <div className="absolute left-1/2 size-[14px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <g clipPath="url(#clip0_search)">
            <path d={svgPaths.p125fe80} fill="#C4C9D3" />
          </g>
          <defs>
            <clipPath id="clip0_search">
              <rect fill="white" height="14" width="14" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

// 清除圖標
function CloseIcon({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="overflow-clip relative shrink-0 size-[20px] hover:opacity-80 transition-opacity"
      aria-label="清除"
    >
      <div className="absolute bg-[#cdcdcd] left-1/2 rounded-[9px] size-[18px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
        <div className="absolute h-[14px] left-[3.75px] top-1/2 translate-y-[-50%] w-[10.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <path d={svgPaths.p18a65c00} fill="white" />
          </svg>
        </div>
      </div>
    </button>
  );
}

// 複製圖標
export function CopyIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]">
      <div className="absolute content-stretch flex flex-col items-start left-0 top-0">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          <div className="content-stretch flex items-center relative shrink-0 w-full">
            <div className="relative shrink-0 size-[14px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                <path d={svgPaths.p1aad8f00} fill="#01579B" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 外部連結圖標
export function ExternalLinkIcon() {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <path d={svgPaths.p29d45300} fill="#01579B" />
      </svg>
    </div>
  );
}

export const CwInput = forwardRef<HTMLInputElement, CwInputProps>(
  (
    {
      label,
      required,
      error,
      leftIcon,
      rightIcon,
      clearable,
      onClear,
      disabled,
      placeholder,
      value,
      textAlign = 'left',
      width = '100%',
      className = '',
      isSearch = false,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== undefined && value !== '' && value !== null;
    const showClearButton = clearable && hasValue && !disabled;

    // 決定背景顏色
    const bgColor = disabled ? 'bg-[#e9ebf2]' : error ? 'bg-[#fff6f4]' : 'bg-white';
    
    // 決定邊框顏色和陰影
    const borderStyle = error
      ? 'border-[#c00000]'
      : isFocused
      ? 'border-[#0078d4] shadow-[0px_0px_4px_0px_#01579b]'
      : 'border-[#c4c9d3]'; // 改為淡灰色，與 table 外框線一致
    
    // 決定文字顏色
    const textColor = disabled ? 'text-[#7c808c]' : 'text-[#1c1c1c]';
    
    // placeholder 顏色
    const placeholderColor = 'placeholder:text-[#cdcdcd]';

    // 文字對齊
    const textAlignClass = textAlign === 'right' ? 'text-right' : textAlign === 'center' ? 'text-center' : '';

    // 如果是搜尋狀態且沒有自定義 leftIcon，使用搜尋 icon
    const displayLeftIcon = isSearch && !leftIcon ? <SearchIcon /> : leftIcon;

    const handleClear = () => {
      if (onClear) {
        onClear();
      }
    };

    return (
      <div className="content-stretch flex flex-col gap-1 items-start" style={{ width }}>
        {/* 標籤 */}
        {label && (
          <label className="block text-foreground" style={{
            fontFamily: 'var(--font-noto-sans-tc)',
            fontSize: 'var(--text-base)',
            fontWeight: 350
          }}>
            {label}{required && <span className="text-[#c00000] ml-[2px]">*</span>}
          </label>
        )}
        
        {/* 輸入框容器 */}
        <div className={`${bgColor} box-border content-stretch flex gap-[10px] h-[35px] items-center justify-center px-[12px] py-0 relative rounded-[4px] w-full ${className}`}>
          <div aria-hidden="true" className={`absolute ${borderStyle} border border-solid inset-0 pointer-events-none rounded-[4px] transition-all`} />
          
          {/* 內容區域 */}
          <div className="basis-0 content-stretch flex gap-[4px] grow items-center min-h-px min-w-px relative shrink-0">
            {/* 左側圖標 */}
            {displayLeftIcon && <div className="shrink-0">{displayLeftIcon}</div>}
            
            {/* 輸入框 */}
            <input
              ref={ref}
              disabled={disabled}
              placeholder={placeholder}
              value={value}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`basis-0 font-['Noto_Sans_TC',_sans-serif] font-[350] grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[14px] bg-transparent border-0 outline-none ${textColor} ${placeholderColor} ${textAlignClass} ${disabled ? 'cursor-not-allowed' : ''}`}
              {...props}
            />
            
            {/* 右側清除按鈕 */}
            {showClearButton && <CloseIcon onClick={handleClear} />}
            
            {/* 右側圖標 */}
            {rightIcon && <div className="shrink-0">{rightIcon}</div>}
          </div>
        </div>
        
        {/* 錯誤訊息 */}
        {error && (
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[2px] py-0 relative w-full">
                <p className="basis-0 font-['Noto_Sans_TC',_sans-serif] font-[350] grow h-[16.8px] leading-[16.8px] min-h-px min-w-px relative shrink-0 text-[#c00000] text-[12px]">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

CwInput.displayName = 'CwInput';

// 多選輸入框 Props
export interface CwInputWithTagsProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /** 標籤文字 */
  label?: string;
  /** 已選擇的標籤列表 */
  tags: string[];
  /** 移除標籤的回調 */
  onRemoveTag: (index: number) => void;
  /** 輸入值 */
  value: string;
  /** 輸入變更回調 */
  onChange: (value: string) => void;
  /** 按下 Enter 或選擇項目時的回調 */
  onAddTag?: (value: string) => void;
  /** 錯誤訊息 */
  error?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** placeholder */
  placeholder?: string;
  /** 輸入框寬度 */
  width?: string;
  /** 是否顯示清除全部按鈕 */
  clearable?: boolean;
  /** 清除全部標籤的回調 */
  onClearAll?: () => void;
}

/**
 * CwInputWithTags 元件
 * 
 * 支援多選的輸入框，顯示已選擇的標籤。
 * 用於需要選擇多個項目的場景，如社工選擇、標籤管理等。
 */
export function CwInputWithTags({
  label,
  tags,
  onRemoveTag,
  value,
  onChange,
  onAddTag,
  error,
  disabled,
  placeholder,
  width = '100%',
  clearable,
  onClearAll,
  ...props
}: CwInputWithTagsProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== undefined && value !== '';
  const hasTags = tags.length > 0;
  const showClearButton = clearable && (hasValue || hasTags) && !disabled;

  // 決定背景顏色
  const bgColor = disabled ? 'bg-[#e9ebf2]' : error ? 'bg-[#fff6f4]' : 'bg-white';
  
  // 決定邊框顏色和陰影
  const borderStyle = error
    ? 'border-[#c00000]'
    : isFocused
    ? 'border-[#0078d4] shadow-[0px_0px_4px_0px_#01579b]'
    : 'border-[#c4c9d3]'; // 改為淡灰色，與 table 外框線一致

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim() && onAddTag) {
      e.preventDefault();
      onAddTag(value.trim());
    }
    if (props.onKeyDown) {
      props.onKeyDown(e);
    }
  };

  const handleClear = () => {
    if (onClearAll) {
      onClearAll();
    }
    onChange('');
  };

  return (
    <div className="content-stretch flex flex-col gap-1 items-start" style={{ width }}>
      {/* 標籤 */}
      {label && (
        <label className="block text-foreground" style={{ 
          fontFamily: 'var(--font-noto-sans-tc)', 
          fontSize: 'var(--text-base)', 
          fontWeight: 350 
        }}>
          {label}
        </label>
      )}
      
      {/* 輸入框容器 */}
      <div className={`${bgColor} box-border content-stretch flex flex-wrap gap-[6px] min-h-[35px] items-center px-[12px] py-[6px] relative rounded-[4px] w-full`}>
        <div aria-hidden="true" className={`absolute ${borderStyle} border border-solid inset-0 pointer-events-none rounded-[4px] transition-all`} />
        
        {/* 標籤列表 */}
        {hasTags && (
          <div className="flex flex-wrap gap-[6px] items-center">
            {tags.map((tag, index) => (
              <CwTag
                key={index}
                label={tag}
                onClose={() => onRemoveTag(index)}
                closable={!disabled}
              />
            ))}
          </div>
        )}
        
        {/* 輸入框 */}
        <input
          disabled={disabled}
          placeholder={hasTags ? '' : placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          className={`flex-1 min-w-[100px] font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[normal] text-[14px] bg-transparent border-0 outline-none ${disabled ? 'text-[#7c808c] cursor-not-allowed' : 'text-[#1c1c1c]'} placeholder:text-[#cdcdcd]`}
          {...props}
        />
        
        {/* 右側清除按鈕 */}
        {showClearButton && (
          <div className="ml-auto">
            <CloseIcon onClick={handleClear} />
          </div>
        )}
      </div>
      
      {/* 錯誤訊息 */}
      {error && (
        <div className="relative shrink-0 w-full">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[2px] py-0 relative w-full">
              <p className="basis-0 font-['Noto_Sans_TC',_sans-serif] font-[350] grow h-[16.8px] leading-[16.8px] min-h-px min-w-px relative shrink-0 text-[#c00000] text-[12px]">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 預設導出帶有常用圖標的版本
export default CwInput;

// 匯出常用圖標供外部使用
export { SearchIcon, CloseIcon };