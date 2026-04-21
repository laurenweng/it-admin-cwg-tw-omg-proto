import { forwardRef, ButtonHTMLAttributes, ReactNode, cloneElement, isValidElement } from "react";
import svgPaths from "../imports/svg-wu5dv0rbyr";

export interface CwButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按鈕變體 */
  variant?: 'primary' | 'destructive' | 'success' | 'secondary' | 'info' | 'disabled';
  /** 按鈕樣式 */
  appearance?: 'filled' | 'outlined';
  /** 按鈕尺寸：m（預設）/ s */
  size?: 'm' | 's';
  /** 左側圖標 */
  leftIcon?: ReactNode;
  /** 右側圖標 */
  rightIcon?: ReactNode;
  /** 是否只顯示圖標 */
  iconOnly?: boolean;
  /** 子元素 */
  children?: ReactNode;
}

// 加號圖標
export function PlusIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="CwIcon">
          <path d={svgPaths.p2f64c1f0} fill={color} id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export const CwButton = forwardRef<HTMLButtonElement, CwButtonProps>(
  (
    {
      variant = 'primary',
      appearance = 'filled',
      size = 'm',
      leftIcon,
      rightIcon,
      iconOnly = false,
      disabled,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    // 顏色配置
    const colorConfig = {
      primary: {
        bg: '#01579b',
        border: '#01579b',
        text: 'white',
        outlinedText: '#01579b'
      },
      destructive: {
        bg: '#c00000',
        border: '#c00000',
        text: 'white',
        outlinedText: '#c00000'
      },
      success: {
        bg: '#7ac29a',
        border: '#7ac29a',
        text: 'white',
        outlinedText: '#7ac29a'
      },
      secondary: {
        bg: '#1c1c1c',
        border: '#1c1c1c',
        text: 'white',
        outlinedText: '#1c1c1c'
      },
      info: {
        bg: '#57a6bd',
        border: '#57a6bd',
        text: 'white',
        outlinedText: '#57a6bd'
      },
      disabled: {
        bg: '#cdcdcd',
        border: '#cdcdcd',
        text: 'white',
        outlinedText: '#cdcdcd'
      }
    };

    const colors = colorConfig[disabled ? 'disabled' : variant];
    const isFilled = appearance === 'filled';

    // 尺寸配置
    const sizeConfig = {
      m: {
        height:   'h-[38px] min-h-[38px]',
        minWidth: 'min-w-[100px]',
        padding:  'px-[15px] py-[5px]',
        fontSize: 'text-[14px]',
        iconSize: 14,
      },
      s: {
        height:   'h-[28px] min-h-[28px]',
        minWidth: 'min-w-[56px]',
        padding:  'px-[4px] py-[4px]',
        fontSize: 'text-[12px]',
        iconSize: 12,
      },
    };
    const sz = sizeConfig[size];
    
    // 背景色
    const bgColor = isFilled ? colors.bg : 'transparent';
    
    // 文字顏色
    const textColor = isFilled ? colors.text : colors.outlinedText;

    // 處理 icon 顏色和尺寸 - 讓 icon 繼承文字顏色並統一尺寸為 14px
    const renderIcon = (icon: ReactNode) => {
      if (!icon) return null;
      
      // 如果是 React 元素，嘗試注入 color 或 style
      if (isValidElement(icon)) {
        // 檢查是否是 PlusIcon 或其他接受 color prop 的元件
        if (icon.type === PlusIcon || (icon.props && 'color' in icon.props)) {
          return cloneElement(icon as any, { color: textColor });
        }
        // 對於 lucide-react 圖標，使用 style 來設置顏色和尺寸
        return cloneElement(icon as any, { 
          size: sz.iconSize,
          strokeWidth: 2,
          style: { color: textColor, ...((icon.props as any)?.style || {}) }
        });
      }
      
      return icon;
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`box-border content-stretch flex ${iconOnly ? '' : 'gap-[4px]'} ${sz.height} items-center justify-center ${sz.minWidth} ${sz.padding} rounded-[4px] relative transition-opacity ${disabled ? 'cursor-not-allowed' : 'hover:opacity-90'} ${className}`}
        style={{ backgroundColor: bgColor, color: textColor }}
        {...props}
      >
        <div 
          aria-hidden="true" 
          className="absolute border border-solid inset-0 pointer-events-none rounded-[4px]"
          style={{ borderColor: colors.border }}
        />
        
        {leftIcon && <div className="shrink-0">{renderIcon(leftIcon)}</div>}
        
        {!iconOnly && children && (
          <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
            <div className={`flex flex-col font-['Noto_Sans_TC',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 ${sz.fontSize} text-center text-nowrap`} style={{ color: textColor }}>
              <p className="leading-[1.4] whitespace-pre">{children}</p>
            </div>
          </div>
        )}
        
        {rightIcon && <div className="shrink-0">{renderIcon(rightIcon)}</div>}
      </button>
    );
  }
);

CwButton.displayName = 'CwButton';

export default CwButton;