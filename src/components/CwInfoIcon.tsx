import { Info } from 'lucide-react';
import { useState } from 'react';
import { CwTooltip } from './CwTooltip';
import { CwPopup } from './CwPopup';

export interface CwInfoIconProps {
  /** Tooltip 提示文字（hover 時顯示） */
  tooltipContent?: string;
  /** Popup 標題 */
  popupTitle?: string;
  /** Popup 內容 */
  popupContent?: React.ReactNode;
  /** 是否顯示為藍色背景樣式 */
  variant?: 'default' | 'primary';
  /** 是否禁用 */
  disabled?: boolean;
}

export function CwInfoIcon({ 
  tooltipContent, 
  popupTitle,
  popupContent,
  variant = 'default',
  disabled = false 
}: CwInfoIconProps) {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && popupContent) {
      setShowPopup(true);
    }
  };

  const iconElement = (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center transition-all ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${
        variant === 'primary' 
          ? 'w-[18px] h-[18px] rounded-full bg-[#d1ebff] hover:bg-[#b3d9ff]' 
          : 'w-[14px] h-[14px]'
      }`}
      style={{
        border: 'none',
        padding: 0,
      }}
    >
      <Info 
        className={variant === 'primary' ? 'w-[10px] h-[10px] text-[#01579b]' : 'w-[14px] h-[14px] text-[#01579b]'} 
      />
    </button>
  );

  return (
    <>
      {tooltipContent ? (
        <CwTooltip content={tooltipContent} disabled={disabled}>
          {iconElement}
        </CwTooltip>
      ) : (
        iconElement
      )}

      {popupContent && (
        <CwPopup
          open={showPopup}
          onClose={() => setShowPopup(false)}
          title={popupTitle}
          size="md"
          closableByMask={true}
        >
          {popupContent}
        </CwPopup>
      )}
    </>
  );
}
