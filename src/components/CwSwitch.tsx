import React from 'react';

export interface CwSwitchProps {
  /** 是否開啟 */
  checked?: boolean;
  /** 變更回調 */
  onChange?: (checked: boolean) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否錯誤狀態 */
  error?: boolean;
  /** 錯誤訊息 */
  errorMessage?: string;
  /** 標籤文字 */
  label?: string;
  /** 標籤位置 */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
}

export const CwSwitch: React.FC<CwSwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  error = false,
  errorMessage,
  label,
  labelPosition = 'top',
}) => {
  const handleClick = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  // 背景顏色
  const getBackgroundColor = () => {
    if (error && !checked) return '#FFF6F4';
    if (error && checked) return '#C00000';
    if (checked) return '#01579B';
    return '#C4C9D3';
  };

  // 邊框顏色
  const getBorderColor = () => {
    if (error && !checked) return '#C00000';
    return 'transparent';
  };

  // 圓點位置
  const circlePosition = checked ? 33 : 11;

  // Switch 元素
  const switchElement = (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`h-[22px] w-[44px] relative shrink-0 transition-opacity ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
        aria-checked={checked}
        role="switch"
        aria-label={label}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 44 22"
        >
          <g>
            {/* 背景軌道 */}
            {error && !checked ? (
              <g>
                <mask fill="white" id={`path-mask-${Math.random()}`}>
                  <path d="M33.4785 0L34.0195 0.0146484C39.579 0.309182 44 5.11466 44 11C44 16.8853 39.579 21.6908 34.0195 21.9854L33.4785 22H10.5215C4.71061 21.9999 0 17.075 0 11C0 4.92496 4.71061 0.000144408 10.5215 0H33.4785Z" />
                </mask>
                <path
                  d="M33.4785 0L34.0195 0.0146484C39.579 0.309182 44 5.11466 44 11C44 16.8853 39.579 21.6908 34.0195 21.9854L33.4785 22H10.5215C4.71061 21.9999 0 17.075 0 11C0 4.92496 4.71061 0.000144408 10.5215 0H33.4785Z"
                  fill={getBackgroundColor()}
                />
                <path
                  d="M33.4785 0L33.5056 -0.999634L33.4921 -1H33.4785V0ZM34.0195 0.0146484L34.0724 -0.983951L34.0595 -0.984635L34.0466 -0.984985L34.0195 0.0146484ZM34.0195 21.9854L34.0466 22.985L34.0595 22.9846L34.0724 22.984L34.0195 21.9854ZM33.4785 22V23H33.4921L33.5056 22.9996L33.4785 22ZM10.5215 22L10.5215 23H10.5215V22ZM10.5215 0L10.5215 -1L10.5215 -1L10.5215 0ZM33.4785 0L33.4514 0.999634L33.9925 1.01428L34.0195 0.0146484L34.0466 -0.984985L33.5056 -0.999634L33.4785 0ZM34.0195 0.0146484L33.9666 1.01325C38.9596 1.27777 43 5.61015 43 11H44H45C45 4.61917 40.1983 -0.659409 34.0724 -0.983951L34.0195 0.0146484ZM44 11H43C43 16.3898 38.9596 20.7222 33.9666 20.9868L34.0195 21.9854L34.0724 22.984C40.1983 22.6594 45 17.3808 45 11H44ZM34.0195 21.9854L33.9925 20.9857L33.4514 21.0004L33.4785 22L33.5056 22.9996L34.0466 22.985L34.0195 21.9854ZM33.4785 22V21H10.5215V22V23H33.4785V22ZM10.5215 22L10.5215 21C5.30433 20.9999 1 16.5651 1 11H0H-1C-1 17.585 4.11688 22.9998 10.5215 23L10.5215 22ZM0 11H1C1 5.43488 5.30433 1.00013 10.5215 1L10.5215 0L10.5215 -1C4.11688 -0.999841 -1 4.41504 -1 11H0ZM10.5215 0V1H33.4785V0V-1H10.5215V0Z"
                  fill={getBorderColor()}
                  mask={`url(#path-mask-${Math.random()})`}
                />
              </g>
            ) : (
              <path
                d="M33.4785 0L34.0195 0.0146484C39.579 0.309182 44 5.11466 44 11C44 16.8853 39.579 21.6908 34.0195 21.9854L33.4785 22H10.5215C4.71061 21.9999 0 17.075 0 11C0 4.92496 4.71061 0.000144408 10.5215 0H33.4785Z"
                fill={getBackgroundColor()}
              />
            )}
            
            {/* 圓點 */}
            <g filter={`url(#filter-shadow-${Math.random()})`}>
              <circle
                cx={circlePosition}
                cy="11"
                fill="white"
                r="9"
                className="transition-all duration-200"
              />
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="22"
              id={`filter-shadow-${Math.random()}`}
              width="22"
              x={checked ? "23" : "1"}
              y="0"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dx="1" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
              />
              <feBlend
                in2="BackgroundImageFix"
                mode="normal"
                result="effect1_dropShadow"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow"
                mode="normal"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </button>
      
      {/* 錯誤訊息 */}
      {error && errorMessage && (
        <p className="text-[#c00000] text-[12px] mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );

  // 如果沒有 label，直接返回 switch
  if (!label) {
    return switchElement;
  }

  // 根據 labelPosition 決定佈局
  const isVertical = labelPosition === 'top' || labelPosition === 'bottom';
  const isReverse = labelPosition === 'right' || labelPosition === 'bottom';

  return (
    <div
      className={`flex ${isVertical ? 'flex-col' : 'flex-row'} ${
        isReverse ? (isVertical ? 'flex-col-reverse' : 'flex-row-reverse') : ''
      } ${isVertical ? 'gap-1' : 'gap-3'} items-start`}
    >
      {label && (
        <label
          className={`text-[#1c1c1c] cursor-pointer ${
            disabled ? 'opacity-50' : ''
          }`}
          style={{ fontSize: 'var(--text-base)' }}
          onClick={handleClick}
        >
          {label}
        </label>
      )}
      {switchElement}
    </div>
  );
};