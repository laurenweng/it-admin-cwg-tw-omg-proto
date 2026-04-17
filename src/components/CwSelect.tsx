import { useState, useRef, useEffect, ReactNode } from 'react';
import svgPaths from '../imports/svg-e8xhuxlo53';

export interface CwSelectOption {
  /**
   * 選項值
   */
  value: string;
  /**
   * 選項顯示文字
   */
  label: string;
  /**
   * 是否禁用此選項
   */
  disabled?: boolean;
  /**
   * 額外搜尋文字（searchable 時也會比對此欄位）
   */
  searchValue?: string;
}

interface CwSelectProps {
  /**
   * 選項列表
   */
  options: CwSelectOption[];
  /**
   * 當前選中的值（單選）或值陣列（多選）
   */
  value?: string | string[];
  /**
   * 值改變回調
   */
  onChange?: (value: string | string[]) => void;
  /**
   * 提示文字
   */
  placeholder?: string;
  /**
   * 標籤文字
   */
  label?: string;
  /**
   * 是否多選
   */
  multiple?: boolean;
  /**
   * 是否可搜尋
   */
  searchable?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否顯示錯誤狀態
   */
  error?: boolean;
  /**
   * 錯誤訊息
   */
  errorMessage?: string;
  /**
   * 是否可清除
   */
  clearable?: boolean;
  /**
   * 寬度
   */
  width?: string;
  /**
   * 自訂選項渲染（下拉列表用）
   */
  renderOption?: (option: CwSelectOption) => ReactNode;
}

/**
 * CwSelect 下拉選擇元件
 * 
 * 支援單選、多選、搜尋和清除功能
 * 
 * @example
 * ```tsx
 * // 單選
 * <CwSelect
 *   options={[
 *     { value: '1', label: '選項一' },
 *     { value: '2', label: '選項二' }
 *   ]}
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 *   placeholder="請選擇"
 *   clearable
 * />
 * 
 * // 多選
 * <CwSelect
 *   options={options}
 *   value={selectedValues}
 *   onChange={setSelectedValues}
 *   placeholder="請選擇多個項目"
 *   multiple
 *   clearable
 * />
 * 
 * // 可搜尋
 * <CwSelect
 *   options={options}
 *   value={value}
 *   onChange={setValue}
 *   searchable
 *   placeholder="搜尋並選擇"
 * />
 * ```
 */
export function CwSelect({
  options,
  value,
  onChange,
  placeholder = '請選擇',
  label,
  multiple = false,
  searchable = false,
  disabled = false,
  error = false,
  errorMessage,
  clearable = false,
  width = '100%',
  renderOption,
}: CwSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 計算下拉選單位置
  const updateDropdownPosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
      });
    }
  };

  // 開啟下拉選單時更新位置
  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition();
      
      // 監聽滾動和視窗大小變化
      const handleUpdate = () => updateDropdownPosition();
      window.addEventListener('scroll', handleUpdate, true);
      window.addEventListener('resize', handleUpdate);
      
      return () => {
        window.removeEventListener('scroll', handleUpdate, true);
        window.removeEventListener('resize', handleUpdate);
      };
    }
  }, [isOpen]);

  // 點擊外部關閉下拉選單
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 過濾選項（搜尋功能）
  const filteredOptions = searchable && searchTerm
    ? options.filter(option => {
        const term = searchTerm.toLowerCase();
        return (
          option.label.toLowerCase().includes(term) ||
          (option.searchValue?.toLowerCase().includes(term) ?? false)
        );
      })
    : options;

  // 獲取選中的選項
  const getSelectedOptions = () => {
    if (!value) return [];
    const values = Array.isArray(value) ? value : [value];
    return options.filter(option => values.includes(option.value));
  };

  // 獲取顯示文字
  const getDisplayText = () => {
    const selectedOptions = getSelectedOptions();
    if (selectedOptions.length === 0) return '';
    if (multiple) {
      return `已選擇 ${selectedOptions.length} 項`;
    }
    return selectedOptions[0].label;
  };

  // 處理選項點擊
  const handleOptionClick = (optionValue: string) => {
    if (disabled) return;

    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      onChange?.(newValues);
    } else {
      onChange?.(optionValue);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  // 處理清除
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(multiple ? [] : '');
  };

  // 移除 tag
  const handleRemoveTag = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    
    const currentValues = Array.isArray(value) ? value : [];
    const newValues = currentValues.filter(v => v !== optionValue);
    onChange?.(newValues);
  };

  // 處理輸入框點擊
  const handleInputClick = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (searchable && !isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  // 檢查選項是否被選中
  const isOptionSelected = (optionValue: string) => {
    if (!value) return false;
    const values = Array.isArray(value) ? value : [value];
    return values.includes(optionValue);
  };

  const selectedOptions = getSelectedOptions();
  const displayText = getDisplayText();
  const hasValue = multiple ? selectedOptions.length > 0 : !!value;
  const showClearButton = clearable && hasValue && !disabled;

  return (
    <div className="flex flex-col gap-1" style={{ width }}>
      {/* Label */}
      {label && (
        <label
          className="text-foreground"
          style={{
            fontFamily: 'var(--font-noto-sans-tc)',
            fontSize: 'var(--text-base)',
            fontWeight: 350,
          }}
        >
          {label}
        </label>
      )}

      {/* Select Container */}
      <div className="relative" ref={containerRef}>
        {/* Input Box */}
        <div
          className={`bg-white box-border h-[35px] rounded-[var(--radius)] cursor-pointer transition-colors ${
            disabled ? 'bg-[#e9ebf2] cursor-not-allowed' : ''
          } ${error ? 'bg-[#fff6f4]' : ''}`}
          onClick={handleInputClick}
        >
          <div
            aria-hidden="true"
            className={`absolute border border-solid inset-0 pointer-events-none rounded-[var(--radius)] transition-all ${
              error
                ? 'border-[#c00000]'
                : isOpen && !disabled
                ? 'border-[#0078d4] shadow-[0px_0px_4px_0px_#01579b]'
                : 'border-[#c4c9d3]' // 改為淡灰色，與 table 外框線一致
            }`}
          />

          <div className="flex items-center justify-between h-full pl-[12px] pr-[14px]">
            {/* Content - 使用 basis-0 grow 填滿空間 */}
            <div className="basis-0 grow min-h-px min-w-px flex items-center overflow-hidden">
              {multiple && selectedOptions.length > 0 ? (
                // 多選 Tags
                <div className="flex items-center gap-[4px] flex-wrap">
                  {selectedOptions.map((option) => (
                    <div
                      key={option.value}
                      className="bg-[#e9ebf2] box-border flex gap-[2px] h-[20px] items-center px-[4px] py-[2px] rounded-[5px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p
                        className="leading-[13px] text-[#1c1c1c] whitespace-nowrap"
                        style={{
                          fontFamily: 'var(--font-noto-sans-tc)',
                          fontSize: '14px',
                          fontWeight: 'normal',
                        }}
                      >
                        {option.label}
                      </p>
                      {!disabled && (
                        <button
                          onClick={(e) => handleRemoveTag(option.value, e)}
                          className="flex items-center justify-center"
                        >
                          <div className="relative size-[14px]">
                            <svg
                              className="block size-full"
                              fill="none"
                              preserveAspectRatio="none"
                              viewBox="0 0 14 14"
                            >
                              <path
                                d={svgPaths.p720f380}
                                stroke="#C4C9D3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5625"
                              />
                            </svg>
                          </div>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : searchable && isOpen ? (
                // 搜尋輸入框
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={placeholder}
                  className="w-full bg-transparent outline-none"
                  style={{
                    fontFamily: 'var(--font-noto-sans-tc)',
                    fontSize: '14px',
                    fontWeight: 350,
                    color: '#1c1c1c',
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                // 顯示文字
                <p
                  className={displayText ? 'text-[#1c1c1c]' : 'text-[#cdcdcd]'}
                  style={{
                    fontFamily: 'var(--font-noto-sans-tc)',
                    fontSize: '14px',
                    fontWeight: 350,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {displayText || placeholder}
                </p>
              )}
            </div>

            {/* Icons - 固定在最右側 */}
            <div className="flex items-center shrink-0">
              {showClearButton ? (
                /* Clear Button - 有清除按鈕時不顯示箭頭 */
                <button
                  onClick={handleClear}
                  className="flex items-center justify-center size-[18px] hover:opacity-70"
                >
                  <div className="relative size-[14px]">
                    <div className="absolute bg-[#cdcdcd] rounded-[7px] size-[14px]">
                      <div className="absolute h-[10.889px] left-[2.92px] top-1/2 translate-y-[-50%] w-[8.167px]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 9 11"
                        >
                          <path d={svgPaths.p37567200} fill="white" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              ) : (
                /* Dropdown Arrow - 沒有清除按鈕時顯示箭頭，且不旋轉 */
                <div className="relative shrink-0 size-[12px]">
                  <div className="overflow-clip size-[12px]">
                    <div className="absolute left-1/2 size-[12px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 12 12"
                      >
                        <path d={svgPaths.p3d0f1180} fill="#1C1C1C" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dropdown Menu - 使用 fixed 定位避免被 popup 的 overflow 裁切 */}
        {isOpen && !disabled && (
          <div 
            className="fixed bg-white rounded-[var(--radius)] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] py-[4px] z-[3200] max-h-[280px] overflow-y-auto"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
            }}
          >
            {filteredOptions.length === 0 ? (
              <div className="px-[12px] py-[10px] text-center">
                <p
                  className="text-[#7c808c]"
                  style={{
                    fontFamily: 'var(--font-noto-sans-tc)',
                    fontSize: '14px',
                    fontWeight: 350,
                  }}
                >
                  {searchable && searchTerm ? '找不到符合的選項' : '沒有選項'}
                </p>
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = isOptionSelected(option.value);
                const isDisabled = option.disabled;

                return (
                  <button
                    key={option.value}
                    className={`w-full px-[12px] py-[6px] flex items-center gap-[4px] transition-colors text-left ${
                      isDisabled
                        ? 'bg-[#e9ebf2] cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#c6dff3]'
                        : 'hover:bg-[#e6f7ff]'
                    }`}
                    style={{ minHeight: '35px' }}
                    onClick={() => !isDisabled && handleOptionClick(option.value)}
                    disabled={isDisabled}
                  >
                    {renderOption ? (
                      <div className="basis-0 grow min-w-0">{renderOption(option)}</div>
                    ) : (
                      <p
                        className={`basis-0 grow min-h-px min-w-px text-left ${
                          isDisabled ? 'text-[#7c808c]' : 'text-[#1c1c1c]'
                        }`}
                        style={{
                          fontFamily: 'var(--font-noto-sans-tc)',
                          fontSize: '14px',
                          fontWeight: 350,
                        }}
                      >
                        {option.label}
                      </p>
                    )}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && errorMessage && (
        <p
          className="text-[#c00000]"
          style={{
            fontFamily: 'var(--font-noto-sans-tc)',
            fontSize: '12px',
            fontWeight: 'normal',
          }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}