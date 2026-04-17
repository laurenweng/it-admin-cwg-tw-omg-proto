import { InputHTMLAttributes, forwardRef } from "react";

/**
 * CwRadio 元件屬性
 */
export interface CwRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** 單選框標籤文字 */
  label?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 錯誤訊息（顯示時會套用錯誤樣式） */
  error?: string;
  /** 自定義樣式類名 */
  className?: string;
}

/**
 * CwRadio 元件
 * 
 * 單選框元件，用於在一組選項中僅允許選擇一個項目。
 * 
 * **使用規則**：
 * - 僅允許單選，建議 2-5 個選項
 * - 需搭配清楚的 label 文字描述選項內容
 * - 禁止與 Checkbox 混用在同一組選單中
 * - 超過 5 個選項時應改用 Select 或其他元件
 * 
 * **狀態**：
 * - **未選中**：白色背景，灰色邊框
 * - **選中**：白色背景，灰色邊框，內部深色圓點
 * - **禁用**：淺灰色背景，淺灰色邊框，文字變淺
 * - **錯誤**：淺紅色背景，紅色邊框，顯示錯誤訊息
 * 
 * @example
 * ```tsx
 * const [selected, setSelected] = useState('option1');
 * 
 * <div className="space-y-2">
 *   <CwRadio 
 *     label="選項 1" 
 *     name="demo" 
 *     value="option1"
 *     checked={selected === 'option1'}
 *     onChange={(e) => setSelected(e.target.value)}
 *   />
 *   <CwRadio 
 *     label="選項 2" 
 *     name="demo" 
 *     value="option2"
 *     checked={selected === 'option2'}
 *     onChange={(e) => setSelected(e.target.value)}
 *   />
 * </div>
 * ```
 */
export const CwRadio = forwardRef<HTMLInputElement, CwRadioProps>(
  ({ label, disabled = false, error, className = "", ...props }, ref) => {
    const hasError = !!error;

    return (
      <div className={`content-stretch flex flex-col gap-[2px] items-start ${className}`}>
        <label className="content-stretch flex gap-[8px] items-center cursor-pointer">
          <div className="relative shrink-0">
            {/* 隱藏的原生 input */}
            <input
              ref={ref}
              type="radio"
              disabled={disabled}
              className="sr-only peer"
              {...props}
            />
            
            {/* 自定義單選框外觀 */}
            <div 
              className={`
                relative rounded-[10px] shrink-0 size-[20px] transition-colors
                ${disabled 
                  ? 'bg-[#e9ebf2]' 
                  : hasError 
                    ? 'bg-[#fff6f4]' 
                    : 'bg-[#f4f4f4]'
                }
              `}
            >
              {/* 邊框 */}
              <div 
                aria-hidden="true" 
                className={`
                  absolute border border-solid inset-0 pointer-events-none rounded-[10px] transition-colors
                  ${disabled 
                    ? 'border-[#c4c9d3]' 
                    : hasError 
                      ? 'border-[#c00000]' 
                      : 'border-[#7c808c]'
                  }
                `}
              />
              
              {/* 選中時的內部圓點 */}
              <div 
                className={`
                  absolute bg-[#555555] left-1/2 rounded-[5px] size-[10px] top-1/2 
                  translate-x-[-50%] translate-y-[-50%] transition-opacity
                  ${props.checked ? 'opacity-100' : 'opacity-0'}
                `}
              />
            </div>
          </div>
          
          {/* 標籤文字 */}
          {label && (
            <span 
              className={`
                font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[19.6px] 
                text-[14px] transition-colors
                ${disabled ? 'text-[#7c808c]' : 'text-[#1c1c1c]'}
              `}
            >
              {label}
            </span>
          )}
        </label>
        
        {/* 錯誤訊息 */}
        {error && (
          <p className="font-['Noto_Sans_TC',_sans-serif] font-[350] leading-[16.8px] text-[#c00000] text-[12px] ml-[28px]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

CwRadio.displayName = "CwRadio";
