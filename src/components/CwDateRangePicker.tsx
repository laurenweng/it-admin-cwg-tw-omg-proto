import { useState, useRef, useEffect } from "react";
import svgPaths from "../imports/svg-y9qoi4ez0u";

// 日期範圍
export interface DateRange {
  start: Date | null;
  end: Date | null;
}

// 日期範圍選擇器 Props
export interface CwDateRangePickerProps {
  /** 選中的日期範圍 */
  value?: DateRange;
  /** 日期範圍變更回調 */
  onChange?: (range: DateRange) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** placeholder 文字 */
  placeholder?: string;
  /** 日曆彈出方向 */
  direction?: 'top' | 'bottom';
  /** 自訂類名 */
  className?: string;
}

// 月份名稱
const MONTH_NAMES = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
const WEEKDAY_NAMES = ['日', '一', '二', '三', '四', '五', '六'];

// 日曆圖標
function CalendarIcon() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center relative shrink-0 size-[18px]">
      <div className="relative shrink-0 size-[12px]">
        <div className="absolute inset-[-5.556%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g>
              <path d={svgPaths.p19cd9af2} stroke="var(--stroke-0, #7C808C)" strokeWidth="1.33333" />
              <path d={svgPaths.p1f60f500} fill="var(--fill-0, #7C808C)" />
              <path d="M3.66667 1V3M10.3333 1V3" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeWidth="1.33333" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

// 左箭頭圖標
function LeftArrowIcon() {
  return (
    <div className="relative shrink-0 size-[23.99px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d={svgPaths.p2d947e00} stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
      </svg>
    </div>
  );
}

// 右箭頭圖標
function RightArrowIcon() {
  return (
    <div className="h-[23.99px] relative shrink-0 w-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d={svgPaths.p248cbb20} stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99929" />
      </svg>
    </div>
  );
}

// 獲取某月的天數
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// 獲取某月第一天是星期幾（0-6）
function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

// 格式化日期為 YYYY-MM-DD
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 檢查兩個日期是否是同一天
function isSameDay(date1: Date | null, date2: Date | null): boolean {
  if (!date1 || !date2) return false;
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}

// 檢查日期是否在範圍內
function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const time = date.getTime();
  return time > start.getTime() && time < end.getTime();
}

/**
 * CwDateRangePicker 元件
 * 
 * 日期範圍選擇器元件，用於選擇開始和結束日期。
 * 
 * @example
 * ```tsx
 * const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
 * 
 * <CwDateRangePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 *   placeholder="請選擇日期範圍"
 * />
 * ```
 */
export function CwDateRangePicker({
  value,
  onChange,
  disabled = false,
  placeholder = '請選擇日期',
  direction = 'bottom',
  className = '',
}: CwDateRangePickerProps) {
  // 確保 value 始終有效
  const safeValue = value || { start: null, end: null };
  
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(safeValue.start ? safeValue.start.getMonth() : new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(safeValue.start ? safeValue.start.getFullYear() : new Date().getFullYear());
  const [selectingEnd, setSelectingEnd] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const today = new Date();

  // 點擊外部關閉日曆
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectingEnd(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // 切換月份
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // 選擇日期
  const handleDateClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    
    if (!selectingEnd) {
      // 選擇開始日期
      onChange?.({ start: newDate, end: null });
      setSelectingEnd(true);
    } else {
      // 選擇結束日期
      if (safeValue.start && newDate < safeValue.start) {
        // 如果結束日期早於開始日期，交換它們
        onChange?.({ start: newDate, end: safeValue.start });
      } else {
        onChange?.({ start: safeValue.start, end: newDate });
      }
      setSelectingEnd(false);
      setIsOpen(false);
    }
  };

  // 渲染日曆
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days: (number | null)[] = [];

    // 填充空白
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // 填充日期
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    // 分組為週
    const weeks: (number | null)[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks.map((week, weekIndex) => (
      <div key={weekIndex} className="flex items-start justify-start relative shrink-0 w-full">
        {week.map((day, dayIndex) => {
          if (day === null) {
            return (
              <div key={dayIndex} className="w-[33.14px] min-h-[32px] shrink-0" />
            );
          }

          const date = new Date(currentYear, currentMonth, day);
          const isStart = safeValue.start && isSameDay(date, safeValue.start);
          const isEnd = safeValue.end && isSameDay(date, safeValue.end);
          const inRange = safeValue.start && safeValue.end && isInRange(date, safeValue.start, safeValue.end);
          const isToday = isSameDay(date, today);

          return (
            <div key={dayIndex} className="content-stretch flex items-center justify-center min-h-[32px] w-[33.14px] relative shrink-0">
              {/* 範圍背景 */}
              {inRange && (
                <div className="absolute bg-[#d1ebff] h-[28px] inset-0" />
              )}
              {isStart && safeValue.end && (
                <div className="absolute bg-[#d1ebff] h-[28px] left-[16.57px] right-0 top-[1.93px]" />
              )}
              {isEnd && safeValue.start && (
                <div className="absolute bg-[#d1ebff] h-[28px] left-0 right-[16.57px] top-[1.93px]" />
              )}
              
              {/* 選中背景 */}
              {(isStart || isEnd) && (
                <div className="absolute inset-0 overflow-clip">
                  <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[33.14px]">
                    <div className="bg-[#0078d4] rounded-[9999px] shrink-0 size-[28px]" />
                  </div>
                </div>
              )}
              
              {/* 今天邊框 */}
              {isToday && !isStart && !isEnd && (
                <div className="absolute inset-0 overflow-clip">
                  <div className="absolute bottom-[0.01px] box-border content-stretch flex items-center justify-center left-0 pb-[2px] pt-[1.99px] px-0 top-0 w-[33.14px]">
                    <div className="bg-white relative rounded-[9999px] shrink-0 size-[28px]">
                      <div aria-hidden="true" className="absolute border border-[#0078d4] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                    </div>
                  </div>
                </div>
              )}
              
              <button
                onClick={() => handleDateClick(day)}
                className={`box-border content-stretch flex items-center justify-center pb-[0.72px] pt-0 px-0 relative rounded-[9999px] shrink-0 size-[28px] hover:bg-[#f4f4f4] transition-colors z-10 ${
                  (isStart || isEnd) ? 'bg-[#0078d4]' : ''
                }`}
              >
                <div className={`flex flex-col justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap ${
                  (isStart || isEnd) ? "font-['Roboto'] font-bold text-white" : 
                  isToday ? "font-['Roboto'] font-bold text-[#0078d4]" :
                  "font-['Roboto'] font-medium text-[#1c1c1c]"
                }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                  <p className="leading-[28px] whitespace-pre">{day}</p>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    ));
  };

  const displayValue = () => {
    if (safeValue.start && safeValue.end) {
      return `${formatDate(safeValue.start)} ~ ${formatDate(safeValue.end)}`;
    } else if (safeValue.start) {
      return formatDate(safeValue.start);
    }
    return placeholder;
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* 日曆面板 */}
      {isOpen && (
        <div 
          className={`bg-white content-stretch flex flex-col items-start absolute rounded-[8px] shrink-0 w-[250px] shadow-lg z-[3200] ${
            direction === 'top' ? 'bottom-[calc(100%+8px)]' : 'top-[calc(100%+8px)]'
          }`}
        >
          <div aria-hidden="true" className="absolute border border-slate-300 border-solid inset-0 pointer-events-none rounded-[8px]" />
          
          {/* 箭頭指示 */}
          <div className={`absolute flex h-[16.971px] items-center justify-center left-[16px] w-[16.971px] ${
            direction === 'top' ? 'bottom-[-8px]' : 'top-[-8px]'
          }`}>
            <div className={`flex-none ${direction === 'top' ? 'rotate-[225deg]' : 'rotate-[45deg]'}`}>
              <div className="bg-white relative size-[12px]">
                <div aria-hidden="true" className="absolute border-[1px_0px_0px_1px] border-slate-300 border-solid inset-0 pointer-events-none" />
              </div>
            </div>
          </div>
          
          {/* 月份年份導航 */}
          <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pt-[10px] px-0 right-0 top-0">
            <div className="h-[30px] relative shrink-0 w-full">
              <div className="flex flex-row items-center size-full">
                <div className="box-border content-stretch flex gap-[174px] h-[30px] items-center px-[10px] py-0 relative w-full">
                  <button
                    onClick={handlePrevMonth}
                    className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px] hover:bg-[#f4f4f4] transition-colors"
                  >
                    <LeftArrowIcon />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="content-stretch flex h-[30px] items-center justify-center relative rounded-[3.5px] shrink-0 w-[28px] hover:bg-[#f4f4f4] transition-colors"
                  >
                    <RightArrowIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 日曆內容 */}
          <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full">
            <div className="box-border content-stretch flex flex-col gap-[2.42px] items-center min-w-[250px] pb-0 pt-[11.665px] px-0 relative shrink-0 w-full">
              {/* 月份年份標題 */}
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-[90.13px]">
                <div className="relative rounded-[3.5px] shrink-0 w-full">
                  <div className="flex flex-row items-center size-full">
                    <div className="box-border content-stretch flex items-center px-[8px] py-0 relative w-full">
                      <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0">
                        <p className="font-['Noto_Sans_TC'] font-medium leading-[25.2px] relative shrink-0 text-[#1c1c1c] text-[18px] text-center w-full">
                          {MONTH_NAMES[currentMonth]} {currentYear}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 日曆網格 */}
              <div className="min-w-[232px] relative shrink-0 w-full">
                <div className="min-w-inherit size-full">
                  <div className="box-border content-stretch flex flex-col items-start min-w-inherit p-[6px] relative w-full">
                    {/* 星期標題 */}
                    <div className="flex items-start justify-start relative shrink-0 w-full">
                      {WEEKDAY_NAMES.map((day, index) => (
                        <div key={index} className="box-border flex flex-col items-center px-0 py-[8px] relative shrink-0 w-[33.14px]">
                          <p className="font-['Noto_Sans_TC'] font-bold leading-[14px] relative shrink-0 text-[#7c808c] text-[14px] text-center text-nowrap whitespace-pre">
                            {day}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    {/* 日期網格 */}
                    {renderCalendar()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 輸入框 */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`h-[35px] relative rounded-[var(--radius)] shrink-0 w-full ${
          disabled ? 'bg-[#e9ebf2] cursor-not-allowed' : 'bg-white cursor-pointer'
        }`}
      >
        <div 
          aria-hidden="true" 
          className={`absolute border border-solid inset-0 pointer-events-none rounded-[var(--radius)] ${
            isOpen && !disabled ? 'border-[#0078d4] shadow-[0px_0px_4px_0px_#01579b]' : 'border-[#c4c9d3]' // 改為淡灰色，與 table 外框線一致
          }`}
        />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[4px] h-[35px] items-center justify-center px-[12px] py-0 relative w-full">
            <p className={`basis-0 font-['Noto_Sans_TC'] font-[350] grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[14px] text-left ${
              safeValue.start ? 'text-[#1c1c1c]' : 'text-[#cdcdcd]'
            }`}>
              {displayValue()}
            </p>
            {!disabled && <CalendarIcon />}
            {disabled && (
              <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[18px]">
                <div className="relative shrink-0 size-[12px]">
                  <div className="absolute inset-[-5.556%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                      <g>
                        <path d={svgPaths.p19cd9af2} stroke="var(--stroke-0, #7C808C)" strokeWidth="1.33333" />
                        <path d={svgPaths.p1f60f500} fill="var(--fill-0, #7C808C)" />
                        <path d="M3.66667 1V3M10.3333 1V3" stroke="var(--stroke-0, #7C808C)" strokeLinecap="round" strokeWidth="1.33333" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </button>
    </div>
  );
}

CwDateRangePicker.displayName = 'CwDateRangePicker';